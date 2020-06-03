const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')
const JSZip = require("jszip");
const express = require('express')
const app = express()
const zip = new JSZip();

let count = 0;

;(async () => {
    async function browserGo(bookSeqList){
        let result = []
        const browser = await puppeteer.launch({ 
            headless: false, 
            devtools: true, 
            defaultViewport: {
                width: 375,
                height: 812,
                isMobile: true
            },
        });
        const page = await browser.newPage();
    
        await page.goto(`http://127.0.0.1:8080/demo/epub.html?book_seq=${bookSeqList[count]}`);

        const observer = {
            isPageComplete : ''
        }
        let observerTarget = ''

        Object.defineProperty(observer, 'isPageComplete', {
            get(){
                return observerTarget
            },
            set(value){
                observerTarget = value

                result = {
                    book_seq: bookSeqList[count],
                    data: observer.isPageComplete
                }
                const dir = `../meta`
                if(!fs.existsSync(dir)){
                    fs.mkdirSync(dir)
                }

                zip.file(`${bookSeqList[count]}/meta.json`, JSON.stringify(result, null, '\t'))
                .generateNodeStream()
                .pipe(fs.createWriteStream(path.join(__dirname, `../meta/${bookSeqList[count]}.zip`)))
                .on('finish', function () {
                    console.log("out.zip written.");
                });

                count += 1
                browser.close()

                if(bookSeqList.length <= count) {
                    console.log(`book crawling succeed ${bookSeqList[count - 1]}`)
                    return
                }
                console.log(bookSeqList[count - 1])
                browserGo(bookSeqList)
            }
        })

        observer.isPageComplete = await page.evaluate((bookSeqList, count, result) => {
            return new Promise(resolve => {
                const BASE_URL = `../demo/samples/${bookSeqList[count]}/OEBPS`
                
                function isString (value) {
                    return typeof value === 'string'
                }
                function request (options) {
                    if (isString(options)) {
                        options = {
                        url: options
                        }
                    }
                    
                    return new Promise((resolve, reject) => {
                        let xhr = new XMLHttpRequest()
                        xhr.open(options.method || 'GET', options.url)
                    
                        if (options.headers) {
                        Object.keys(options.headers).forEach(key => {
                            xhr.setRequestHeader(key, options.headers[key])
                        })
                        }
                    
                        xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(xhr.response)
                        } else {
                            reject(xhr.statusText)
                        }
                        }
                        xhr.onerror = () => reject(xhr.statusText)
                        xhr.send(options.body)
                    })
                }
            
                return request(`../demo/samples/${bookSeqList[count]}/OEBPS/content.opf`)
                    .then(async (xml) => {
                        const parser = new window.DOMParser()
                        const observer = {
                            isEnd : false
                        }
                        let observerTarget = false

                        book.on('load', () => {
                            const state = {
                                mediaType : null,
                                data : []
                            }

                            const getSmilFileList = () => {
                                const packageDocument = parser.parseFromString(xml, 'text/xml')
                                const elesm = Array.from(new Set(xml.match(/[A-Z|a-z|0-9|\_|\-]+\.+smil/g)))
                                let result = []
                                packageDocument.querySelectorAll('item[media-type]').forEach(tag => {
                                    if(tag.getAttribute('media-type').includes('audio') || tag.getAttribute('media-type').includes('media')){
                                        state.mediaType = tag.getAttribute('media-type')
                                    }
                                })
                                elesm.forEach(file => {
                                    result.push({
                                        refines: file
                                    })
                                })
                                return result
                            }
        
                            const smilFileList = getSmilFileList().map((smilFile) => {
                                const filePath = `${BASE_URL}/Misc/${smilFile.refines}`;
                                const openSmil = () => {
                                    return request(filePath)
                                        .then(smil => {
                                            const packageDocument = parser.parseFromString(smil, 'application/xhtml+xml')
                                            const srcList = Array.from(packageDocument.querySelectorAll('par')).map(par => {
                                                const textSrcMatchList = par.querySelector('text').getAttribute('src').match(/(.+\#)(.+)/)
                                                const audioEle = par.querySelector('audio')
                                                const audioEleSrc = audioEle.getAttribute('src')
                                                const hmsToSecondsOnly = (hms) => {
                                                    const a = hms.split(':');
                                                    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                                                  }
                                                const mediaStartTime = hmsToSecondsOnly(audioEle.getAttribute('clipBegin'));
                                                const mediaEndTime = hmsToSecondsOnly(audioEle.getAttribute('clipEnd'));

                                                state.data.push({
                                                    id : null,
                                                    svgid : null,
                                                    mediaPath : audioEleSrc,
                                                    mediaName : audioEleSrc.match(/[a-z|0-9]+.mp+[0-9]/)[0],
                                                    mediaStartTime,
                                                    mediaEndTime,
                                                    mediaType : state.mediaType
                                                })
                                                return {
                                                    book_seq : bookSeqList[count],
                                                    text: {
                                                        url : textSrcMatchList[1].replace('..', '').replace('#', ''),
                                                        id : textSrcMatchList[2]
                                                    },
                                                    audio: {
                                                        mediaPath : audioEleSrc,
                                                        mediaName : audioEleSrc.match(/[a-z|0-9]+.mp+[0-9]/)[0],
                                                        mediaStartTime,
                                                        mediaEndTime
                                                    }
                                                }
                                            })
                                            return srcList
                                        })
                                }
                                return openSmil()
                            })

                            const audioParser = async () => {
                                return Promise.all(smilFileList)
                                    .then(fileList => {
                                        return fileList.flat().map(file => {
                                            const filePath = `${BASE_URL}/${file.text.url}`
                                            return request(filePath)
                                                .then(xhtml => {
                                                    const parser = new window.DOMParser()
                                                    const packageDocument = parser.parseFromString(xhtml, 'application/xhtml+xml')
                                                    const idEle = packageDocument.querySelector(`#${file.text.id}`)
                                                    return idEle
                                                })
                                        })
                                    })
                                    .then(result => {
                                        return Promise.all(result)
                                            .then(responseList => {
                                                return responseList.map((node) => {
                                                    if(!node) return;
                                                    const id = node.getAttribute('id')
                                                    return book.epubCfi.chromiumFromNode(id)
                                                })
                                            })
                                    })
                                    .then(fromNodeList => {
                                        fromNodeList.forEach((fromNode, i) => {
                                            fromNode.id = null,
                                            fromNode.svgid = null,
                                            fromNode.mediaPath = state.data[i].mediaPath,
                                            fromNode.mediaName = state.data[i].mediaName,
                                            fromNode.mediaStartTime = state.data[i].mediaStartTime,
                                            fromNode.mediaEndTime = state.data[i].mediaEndTime,
                                            fromNode.mediaType = state.mediaType
                                        })
                                        return fromNodeList
                                    })
                                    .then(async (response) => {
                                        result = response
                                        observer.isEnd = bookSeqList[count]
                                        return Promise.resolve(bookSeqList[count])
                                    })
                            }

                            return audioParser()
                        })

                        Object.defineProperty(observer, 'isEnd', {
                            get(){
                                return observerTarget
                            },
                            set(value){
                                observerTarget = value
                                console.log(JSON.stringify(result))
                                resolve(value)
                            }
                        })
                    })
                    .catch(err => {
                        console.log('request catch: ', err)
                    })
            })
            .then(response => {
                return result
            })
        }, bookSeqList, count, result)
    }

    browserGo([339323])
  })();

app.listen(4000, () => {
    console.log('audio server connected');
})