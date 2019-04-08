// 1. 많은 OS에서 rendering thread가 다른 thread에 비해 우선 순위를 가지는 경우가 있습니다. 이유는 무엇일까요? (간단히 답해주시면 됩니다)
A: rendering thread가 단일 thread라서 우선 순위를 가진다고 생각합니다.

// 2. ECMAScript가 변수 스코프의 측면에서 다른 언어와 다른 점은 무엇일까요? 하나만 들어주세요. (간단히 답해주시면 됩니다)
A: ES5이하에서는 함수 단위 스코프였고 ES6+부터는 블록 단위 스코프입니다. java를 예로 들면 java는 블록 단위 스코프인데 javascript는 두개 다 해당이 됩니다.

// 3. 다음과 같은 파일명이 문자열 배열의 형태로 주어졌을 때, 특정 "날짜"의 범위 (예: 2018-08-01 ~ 2018-08-30)에 해당하는 파일명만을 추출하는 코드를 작성해 보세요.
// 날짜 범위는 최소값, 최대값 두 개의 변수로 주어지며, 변수명, 작성 언어는 자유입니다. 또한, 배열의 최소 갯수는 1이며,
// 최대 갯수는 사용하는 언어의  정수(Integer)값의 최대치를 따른다고 가정합니다. 파일명은 "speech_회원번호_날짜_시간.mp3" 의 형식을 따릅니다.

// 샘플데이터
const arr = [
    'speech_01_20180902_100501.mp3',
    'speech_131_20180731_100501.mp3',
    'speech_1331_20180831_200501.mp3',
    'speech_131_20180811_100501.mp3',
    'speech_1241_20180802_100501.mp3'
]

// arr에 있는 샘플데이터에서 speech_회원번호_ 이러한 형태를 제거한 나머지 값
const dateTimeFormList = terms => {
    return arr.map(file => file.substr(file.match(terms)[0].length, 19))
}

// speech와 회원번호를 제거한 값을 오름차순으로 정렬
const dateTimeFormListSort = dateTimeFormList(/speech_+[0-9]+_/g).sort()

// 첫번째인자에 가공한 데이터와 두번째 인자에 날짜를 매개변수로 받아서 조건에 맞는 index값을 리턴
const dateTimeFormListFindIndex = (dateTimeFormSortList, targetDate) => {
    const result = dateTimeFormSortList.findIndex(v => {
        return v.substr(0, 8) >= targetDate.replace(/-/g, '')
    })

    return result
}

// 날짜에 해당하는 index값을 리턴하는 함수를 이용해 가공된 데이터를 원하는 조건에 부합하는 부분만 리턴
const targetDateTimeFormListSort = (startDate, endDate) => {
    const startIndex = dateTimeFormListFindIndex(
        dateTimeFormListSort,
        startDate
    )
    const endIndex = dateTimeFormListFindIndex(dateTimeFormListSort, endDate)

    return dateTimeFormListSort.slice(startIndex, endIndex)
}

// 가공된 데이터만 가지고 있기때문에 원래의 배열과 데이터를 비교해서 일치하는 원래의 배열을 리턴
const getData = (startDate, endDate) => {
    const targetDateList = targetDateTimeFormListSort(startDate, endDate)
    const result = targetDateList.map(v => {
        return arr.filter((date, i) => date.includes(v)).join('')
    })

    return result
}

// 실행 코드
getData('2018-08-01', '2018-08-30')

// 4. 게시판에 페이지 번호를 표시하려 한다고 가정합니다. 페이지 번호와 한 페이지에 표시할 게시물의 갯수등이 주어졌을 때,
// 페이지 번호 표시에 필요한 정보를 산출하는 코드를 작성해주세요. 사용 언어는 자유입니다.

// DB query 등을 통해 얻어진, 요청받은 페이지 내의 게시물의 갯수. (갯수 >= 0)
const result_count = 275

// 한 페이지 내에 표시되는 게시물 갯수의 최대값
const lines_per_page = 10

// 한 번에 표시되는 페이지 번호의 "최대값" ( 예를 들어,  << [1] [2] [3] [4] [5] [6] [7] [8] [9] [10] >> 과 같이 한 번에 최대 10개의 페이지를 표시한다면 10.  )
const pages_per_section = 10

// 전체 페이지 갯수
const totalPage = Math.ceil(result_count / lines_per_page)

// 전체 페이지를 배열로 출력
const page = Array(totalPage)
    .fill(null)
    .map((v, i) => i + 1)

// 유저가 바라보는 페이지 노출 번호
while (page.length > pages_per_section) page.splice(0, pages_per_section)

// 유저가 바라보는 페이지 노출 번호 2중 배열로 출력
const result = page.map(v => [v])
