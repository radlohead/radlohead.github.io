$.ajax({
    type:"GET",
    url:"data3.xml",
    success:function(xml){
        const header = xml.querySelector('header');
        const caption = header.querySelector('description').innerHTML;
        const columns = header.querySelector('columns').innerHTML;
        const body = xml.querySelector('body');
        const items = body.querySelectorAll('item');
        let column = columns.split(',');
        let indsLclsCd = [];
        let indsLclsNm = [];
        let indsMclsCd = [];
        let indsMclsNm = [];
        let indsSclsCd = [];
        let indsSclsNm = [];
        let stdrDt = [];

        function func(arr, str) {
            for(let i=0; i < items.length; i++) {
                arr.push(items[i].querySelector(str).innerHTML);
            }
        }
        func(indsLclsCd, 'indsLclsCd');
        func(indsLclsNm, 'indsLclsNm');
        func(indsMclsCd, 'indsMclsCd');
        func(indsMclsNm, 'indsMclsNm');
        func(indsSclsCd, 'indsSclsCd');
        func(indsSclsNm, 'indsSclsNm');
        func(stdrDt, 'stdrDt');

        const doc = document;
        const root = doc.querySelector('#root');
        const table = doc.createElement('table');
        const title = doc.createElement('caption');

        title.innerHTML = caption;
        table.appendChild(title);

        const tr = doc.createElement('tr');
        for(let i=0; i < 7; i++) {
            const th = doc.createElement('th');
            th.innerHTML = column[i];
            tr.appendChild(th);
        }
        table.appendChild(tr);
        for(let i=0; i < items.length; i++) {
            const tr = doc.createElement('tr');
            const td = doc.createElement('td');
            const td2 = doc.createElement('td');
            const td3 = doc.createElement('td');
            const td4 = doc.createElement('td');
            const td5 = doc.createElement('td');
            const td6 = doc.createElement('td');
            const td7 = doc.createElement('td');
            td.innerHTML = indsLclsCd[i];
            td2.innerHTML = indsLclsNm[i];
            td3.innerHTML = indsMclsCd[i];
            td4.innerHTML = indsMclsNm[i];
            td5.innerHTML = indsSclsCd[i];
            td6.innerHTML = indsSclsNm[i];
            td7.innerHTML = stdrDt[i];
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            table.appendChild(tr);
        }

        root.appendChild(table);
    }
});