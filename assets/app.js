$.ajax({
    type:"GET",
    url:"data.xml",
    success:function(xml){
        const doc = document;
        const header = xml.querySelector('header');
        const caption = header.querySelector('description').innerHTML;
        const columns = header.querySelector('columns').innerHTML;
        const body = xml.querySelector('body');
        const items = body.querySelectorAll('item');
        const root = doc.querySelector('#root');
        const table = doc.createElement('table');
        const title = doc.createElement('caption');
        const tr = doc.createElement('tr');
        let column = columns.split(',');
        let totalColumn = [];

        title.innerHTML = caption;
        table.appendChild(title);
        function getText(target, i) {
            return target.map(v => {
                return items[i].querySelector(v).innerHTML
            });
        }
        function func(tagNames) {
            for(let i=0; i < items.length; i++) {
                totalColumn.push(getText(tagNames, i));
            }
        }
        func(['indsLclsCd', 'indsLclsNm', 'stdrDt']);

        for(let i=0; i < column.length; i++) {
            const th = doc.createElement('th');
            th.innerHTML = column[i];
            tr.appendChild(th);
        }
        table.appendChild(tr);

        totalColumn.reduce((table,  data) => {
            const tr = doc.createElement('tr');
            for(let i=0; i<3; i++) {
                const td = doc.createElement('td');
                td.innerHTML = data[i];
                tr.appendChild(td);
            }
            table.appendChild(tr);
            return table;
        }, table);

        root.appendChild(table);
    }
});