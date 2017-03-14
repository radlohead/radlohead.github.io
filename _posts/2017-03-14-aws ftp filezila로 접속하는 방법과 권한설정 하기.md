---
layout: post
title: aws ftp filezila로 접속하는 방법과 권한설정 하기
category: front-end
tags:
  - front-end
  - javascript
  - react
  - webpack
  - npm
  - ajax
  - babel
  - json
  - node
  - handlebars
  - D3
  - sass
  - jasmine
  - aws
comments: true
images:
  title: 
---

## 서론  
aws는 아마존 웹서비스(Amazone Web Services)의 줄임말을 의미 합니다. 호스팅서비스 같은
개념으로 생각하면 되는데 국내에 있는 여러 호스팅업체보다 비용적인 측면이나 트래픽관리 부분에서
aws는 장점들이 매우 많이 있다.


<!--more-->

## 설명
아마존 웹서비스는 요금정책이 매우 합리적이라 할 수 있는데 사용한 만큼만 내면 된다. 그리고 사용을
안할 경우에는 중지해서 비용을 절약할 수 있다. 그리고 트래픽에서도 어느정도 자유롭다. 특정 시즌에만
트래픽이 많이 발생되는 사이트라면 aws가 경제적이라 할 수 있다.

금일 포스팅에서는 아마존에서 ec2우분투서버를 생성한 이 후부터 진행되니 참고하시기 바란다.
ec2우분투서버를 생성했다고 가정하고 파일질라 ftp 프로그램을 설치하자 

![key설정]({{site.url}}/content/images/2017-3-14-img01.png)
위의 이미지처럼 sftp메뉴에 들어가서 aws키를 등록하고 
![key설정]({{site.url}}/content/images/2017-3-14-img04.png)
위의 이미지처럼 설정을 하자 host에는 ip를 입력하면 된다. 이 부분에서 헤맸었는데
id에 대한 부분이 설명이 되어 있지 않았었는데 우분투서버는 ubuntu라고 입력하면 된다.
pw는 비워두자 입력한 key가 비밀번호를 대체할 것이다.
성공했다면 아래와 같은 화면이 뜰 것이다.

![key설정]({{site.url}}/content/images/2017-3-14-img02.png)
![key설정]({{site.url}}/content/images/2017-3-14-img03.png)
사용하지 않을때에는 terminate를 시켜서 삭제를 하도록 하자 stop을 해도 사용하고 있는
용량에 대해서는 청구가 된다고 한다.

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
