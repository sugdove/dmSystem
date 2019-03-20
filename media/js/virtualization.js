//接收session获取到集群名字
let clusterName = JSON.parse(sessionStorage.getItem('session')).clusterName;

$('.clusterNameSet').text(clusterName);

//获取该集群下的所有服务器
function getAllServers() {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/cluster/servers",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'clustername': clusterName},
        async: false,
        success: function (data) {
            let str = "";
            for (let key in data) {
                let servername = data[key];
                let sstr = "";
                if (key === "0") {
                    sstr = 'border-top:none;'
                }
                str += "<tr class=\"trDatabase\">\n" +
                    "<td style=" + sstr + "  title="+servername+" class='overhide'><i class=\"fa fa-database tdDatabase\"></i>" + servername + "</td>\n" +
                    "<td style=" + sstr + ">\n" +
                    "<span class=\"label label-danger myLabel removeServer\">删除</span>\n" +
                    "</td>\n" +
                    "</tr>";

            }
            $('#sample_1_tbody').html(str);
            let $alert = $('#noDatabase');
            data ? $alert.hide() : $alert.show()
        },
        error: function (data) {
            if(JSON.parse(data.responseText).message==="Could not open JPA EntityManager for transaction; nested exception is javax.persistence.PersistenceException: org.hibernate.exception.JDBCConnectionException: Unable to acquire JDBC Connection"){
                alert('数据库连接失败')
            }
            else{
                alert('出现了非数据库连接错误'+JSON.parse(data.responseText).message)
            }
        }
    });
}
getAllServers();
function ifUndefined(param){
    if(param){
        return param
    }
    else{
        return ''
    }

}
//赋值某该服务器部分信息(websocket)
function getDetils(servername){
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/server/gedetail",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'servername': servername,'details':true},
        async: false,
        success: function (data) {
            //总览服务器信息部分
            data = data[0];
            $('#severname').text(data['name']);
            $('#numOfCPUs').text(data['numOfCPUs']);
            let status = data['status'];
            status==="OFFLINE"?status="<span class='label label-danger'>不在线</span>":status="<span class='label label-success'>在线</span>";
            $('#status').html(status);
            //服务器磁盘部分
            let str = "";
            str +="<tr><td>"+data['name']+"</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                //磁盘部分
            for(let key in data['disks']){
                let status = data['disks'][key]['status'];
                status!=="UNINITIALIZED"?status="<span class='label label-success'>已初始化</span>":status="<span class='label label-danger'>未初始化</span>";
                str+="<tr><td></td><td>"+data['disks'][key]['name']+"</td><td></td><td></td><td></td><td></td><td>"+((data['disks'][key]['space'])/1024).toFixed(1)+"</td><td>"+((data['disks'][key]['spaceInUse'])/1024).toFixed(1)+"</td><td>"+status+"</td><td>"+data['disks'][key]['type']+"</td><td>"+ifUndefined(data['disks'][key]['description'])+"</td></tr>";
                //分区部分
                if(data['disks'][key]['partitions']){
                    for(let key2 in data['disks'][key]['partitions']){
                        let status = data['disks'][key]['partitions'][key2]['status'];
                        status!=="UNINITIALIZED"?status="<span class='label label-success'>已初始化</span>":status="<span class='label label-danger'>未初始化</span>";
                            str+="<tr><td></td><td></td><td >"+data['disks'][key]['partitions'][key2]['name']+"</td><td></td><td></td><td></td><td>"+((data['disks'][key]['partitions'][key2]['space'])/1024).toFixed(1)+"</td><td>"+((data['disks'][key]['partitions'][key2]['spaceInUse'])/1024).toFixed(1)+"</td><td>"+status+"</td><td>"+data['disks'][key]['partitions'][key2]['type']+"</td><td>"+ifUndefined(data['disks'][key]['partitions'][key2]['description'])+"</td></tr>";
                    }
                }
            }

            $('#servers-disk-tab').html(str);
            //网络接口部分
            let str2 = "";
            for(let key in data['networkInterfaces']){
                let networkInterfaces =  data['networkInterfaces'][key]['speed'];
                if(networkInterfaces){}else{networkInterfaces=0}
                str2 +="<tr><td>"+data['networkInterfaces'][key]['name']+"</td><td>"+data['networkInterfaces'][key]['ipAddress']+"</td><td>"+data['networkInterfaces'][key]['model']+"</td><td>"+data['networkInterfaces'][key]['hwAddr']+"</td><td>"+data['networkInterfaces'][key]['netMask']+"</td><td>"+networkInterfaces+ "KB/S" +"</td></tr>"
            }
            $('#networkInterfaceTbody').html(str2);
        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}
let sample_1 = $('#sample_1');
//添加服务器
$('#addServer').click(function () {
    let serverName = $("input[name='serverName']").val();
    $('#addServerModal').modal('hide');
    $('.tog').show();
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/cluster/addserver",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'serverName': serverName, 'clusterName': clusterName},
        async: true,
        success: function (data) {
            $('.tog').hide();
            if (data.isSuccess === false) {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '失败！',
                    content: data.Msg + '（此确认框会在3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                        },
                    }
                });
            }
            else {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '成功！',
                    content: '成功添加集群（此确认框会在3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                            getAllServers();
                        },
                    }
                });
            }

        },
        error: function (data) {
            $('.tog').hide();
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
    return false

});
//删除服务器
sample_1.on('click', '.removeServer', function (e) {
    e.stopPropagation();
    let serverName = $(this).parent().parent().children('td').eq(0).text();
    let $thistr = $(this).parent().parent('tr');
    $.confirm({
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn-danger',
        confirmButton: '确认',
        cancelButton: '取消',
        animation: 'zoom',
        closeAnimation: 'rotateXR',
        title: '删除？',
        content: '是否删除该服务器（8秒后消失）',
        autoClose: '否|8000',
        buttons: {
            deleteUser: {
                text: '是',
                action: function () {
                    $('.tog').show();
                    $.ajax({
                        cache: true,
                        type: "get",
                        url: "http://" + localhost_ + "/cluster/deleteserver",
                        //"http://" + localhost + "/getAllPlanHis",
                        data: {'clusterName': clusterName, 'serverName': serverName},
                        async: true,
                        success: function (data) {
                            $('.tog').hide();
                            if(data.isSuccess===false){
                                $.confirm({
                                    confirmButtonClass: 'btn btn-info',
                                    cancelButtonClass: 'btn-danger',
                                    confirmButton:'确认',
                                    cancelButton:'取消',
                                    animation: 'zoom',
                                    closeAnimation: 'rotateXR',
                                    title: '失败！',
                                    content: data.Msg+'（3秒后消失）',
                                    autoClose: '确认|3000',
                                    buttons: {
                                        确认: function () {
                                        },
                                    }
                                });
                            }
                            else{
                                $.confirm({
                                    confirmButtonClass: 'btn btn-info',
                                    cancelButtonClass: 'btn-danger',
                                    confirmButton:'确认',
                                    cancelButton:'取消',
                                    animation: 'zoom',
                                    closeAnimation: 'rotateXR',
                                    title: '成功！',
                                    content: '成功删除服务器（3秒后消失）',
                                    autoClose: '确认|3000',
                                    buttons: {
                                        确认: function () {
                                            if($('.eee').children('td').eq(0).text()===serverName){
                                                websocket2.close();
                                                $('.messageContent').hide();
                                                $('#alert-info').show();
                                            }
                                            $thistr.remove();
                                        },
                                    }
                                });
                            }

                        },
                        error: function (data) {
                            $('.tog').hide();
                            alert('发生错误:' + JSON.parse(data.responseText).message)
                        }
                    });
                }
            },
            否: function () {

            },
        }
    });
});
//点击选中服务器
sample_1.on('click', '.trDatabase', function (e) {

    e.stopPropagation();
    let servername = $(this).children('td').eq(0).text();
    if ($(this).hasClass('eee')) {

    }
    else {
        if (websocket2) {
            websocket2.close();
        }
        $('.trDatabase').removeClass('eee');
        $(this).addClass('eee');
        $('.messageContent').show();
        $('#alert-info').hide();
        getDetils(servername);
        webSocket2(servername);

    }




});
CPU_SHOW();
MEM_SHOW();
DISK_SHOW();
var websocket2 = null;
var CPU;
var MEM;
var DISK;
var chart1;
var chart2;
var chart3;

function webSocket2(servers) {

    //判断当前浏览器是否支持websocket
    if ('WebSocket' in window) {
        websocket2 = new WebSocket("ws://" + localhost_ + "/WebSocketLog/allserver/detail/" + servers)
    }
    else {
        alert('当前浏览器不支持WebSocket');
    }
    //调用websocket反回的信息，将日志信息展现在页面上
    websocket2.onmessage = function (event) {
        var data = JSON.parse(event.data);
        let addcpuUsage = 0;
        let addmemoryInUse = 0;
        let adddisk = 0;
        for (let key in data) {
            addcpuUsage += data[key]['cpuUsage'];
            addmemoryInUse += data[key]['memoryInUse'];
            for (let key2 in data[key]['disks']) {
                adddisk += data[key]['disks'][key2]['spaceInUse']
            }
        }
        CPU = Math.ceil(addcpuUsage);
        MEM = Math.ceil(addmemoryInUse);
        DISK = Math.ceil(adddisk);
        console.log(data);
        console.log(CPU);
        console.log(MEM);
        console.log(DISK);
        //CPU:0.75,MEM:2071.0234375,TOL:7547.62890625
        /* CPU = parseFloat(data.split(",")[0].split(":")[1]).toFixed(1);
         MEM = (parseFloat(data.split(",")[1].split(":")[1])).toFixed(1);
         TOL = (parseFloat(data.split(",")[2].split(":")[1])).toFixed(1);
         console.log(CPU)
         console.log(MEM)
         console.log(TOL)*/
    };
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
    window.onbeforeunload = function () {
        closeWebSocket2();
    };

    //关闭WebSocket连接
    function closeWebSocket2() {
        websocket2.close();
    }
}

//CPU使用率
Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

function CPU_SHOW(){
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'highchart_1',
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        let x = (new Date()).getTime(); // current time
                        let y = CPU;
                        series.addPoint([x, y], true, true);
                    }, 5000);

                }
            }
        },
        credits: {enabled: false},//不显示LOGO
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: ''
            },
            //Y轴单位
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2) + "%";
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'CPU使用率',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: null,
                        y: null
                    });
                }
                return data;
            }())
        }]
    });
}

//内存使用率
function MEM_SHOW(){
    chart2 = $('#highchart_2').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = MEM;
                        series.addPoint([x, y], true, true);
                    }, 5000);
                }
            }
        },
        title: {
            text: ''
        },
        //去掉highchart水印
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            //Y轴单位
            labels: {
                formatter: function () {
                    return this.value + 'MB';
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2) + "MB";
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '内存使用率',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: null,
                        y: null
                    });
                }
                return data;
            }())
        }]
    });
}

//磁盘使用率
function DISK_SHOW(){
    chart3 = $('#highchart_3').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = DISK;
                        //console.log("MEM:" + MEM + "MB");
                        series.addPoint([x, y], true, true);
                    }, 5000);
                }
            }
        },
        title: {
            text: ''
        },
        //去掉highchart水印
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            //Y轴单位
            labels: {
                formatter: function () {
                    return this.value + 'MB';
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2) + "MB";
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '内存使用率',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: null,
                        y: null
                    });
                }
                return data;
            }())
        }]
    });
}

function getAllServerUseful(){
    $.ajax({
        cache: true,
        type: "get",
        url:"http://"+localhost_+"/server/getall",
        //"http://" + localhost + "/getAllPlanHis",
        dataType: "json",
        async: false,
        success: function (data) {
            let str = '可用服务器:';
            let arr = [];
            for(let key in data){
                arr.push(key)
            }
            str = str + arr.join() + '.';
            $('.useful').html(str)
        },
        error:function (data) {
            if(JSON.parse(data.responseText).message==="Could not open JPA EntityManager for transaction; nested exception is javax.persistence.PersistenceException: org.hibernate.exception.JDBCConnectionException: Unable to acquire JDBC Connection"){
                alert('数据库连接失败')
            }
            else{
                alert('出现了非数据库连接错误'+JSON.parse(data.responseText).message)
            }
        }
    });
}
getAllServerUseful();
