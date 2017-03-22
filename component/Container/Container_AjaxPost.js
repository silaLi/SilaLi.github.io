Container('ajaxPost', function(url, data, callBack, async){
    type = 'POST';
    async = async === true ? true : false;
    callBack = typeof callBack === 'function' ? callBack : empty;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!xmlhttp) {
        return 'not support ajax';
    }
    data = Container('ajaxData')(data);

    xmlhttp.onreadystatechange = readystatechange

    if (type === 'POST') {
        xmlhttp.open(type, url, async);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
    }

    function empty(){}
    function readystatechange() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                requesttxt = window.decodeURIComponent(xmlhttp.responseText)
                callBack(requesttxt)
            }
        }
    }
})
Container('ajaxData', function(data){
    var dataArr = [];
    for(var key in data){
        dataArr.push(key + '=' + data[key]);
    }
    return dataArr.join('&');
});