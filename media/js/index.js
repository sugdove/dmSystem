var CPU;
var MEM;
var DISK;
//获取最上面一排的数据
/*$.ajax({
    cache: true,
    type: "post",
    url:"media/json/getAllInfo.json",
    //"http://" + localhost + "/getAllInfo",
    dataType: "json",
    async: false,
    success: function (data2) {
        if (data2.res == 0) {
            var data = data2.info;
            var RunTime = parseInt(data.RunTime);
            var PlanTotalNum = data.PlanTotalNum;
            var StrategyRunNum = data.StrategyRunNum;
            var version = data.version;
            if (PlanTotalNum == null) {
                PlanTotalNum = 0
            }
            var length = data.disksizefree.length;
            if (length > 3) {
                $("#number").attr("data-toggle", "modal").attr("data-target", "#myModal")
            }
            var allDisk = 0;
            var str = "";
            var str2 = "";
            for (var i = 0; i < length; i++) {
                for (var key in data.disksizefree[i]) {
                    var disksizefree = parseFloat(data.disksizefree[i][key].substring(0, data.disksizefree[i][key].length - 2)) / 1024;
                    var disksizefree_ = disksizefree.toFixed(1) + "GB";
                    if (i < 3) {
                        str = str + "路径" + ":" + key + ":" + disksizefree_ + "\n";
                    }
                    allDisk = disksizefree + allDisk;
                    str2 += "<tr><td>" + key + "</td><td>" + disksizefree_.substring(0, disksizefree_.length - 2) + "</td></tr>"
                }
            }
            if (allDisk < 1024) {
                allDisk = allDisk.toFixed(1);
            }
            else if (allDisk >= 1024 && allDisk < 1048576) {
                allDisk = (allDisk / 1024).toFixed(1);
                $("#size").text("TB")
            }
            else if (allDisk >= 1048576 && allDisk < 1073741824) {
                allDisk = (allDisk / 1048576).toFixed(1);
                $("#size").text("PB")
            }
            $("#diskTab").html(str2);
            $("#number").attr("title", str);
            $("#counter1").html(RunTime);
            $("#counter2").html(allDisk);
            $("#counter3").html(PlanTotalNum);
            $("#counter4").html(StrategyRunNum);
            $("#version_type").html("版本号:" + version);
            //初始化dataTable
            $('#sample_2').dataTable({
                "aoColumnDefs": [
                    {"bSortable": false}
                ],
                "aLengthMenu": [
                    [7, -1],
                    [7, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 7,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                language: {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                }
            });
        }
        else if (data2.res == -1) {
            alert("后台报错:" + data2.err)
        }

    }
});*/
//获取受保护和未受保护的虚拟机
/*$.ajax({
    cache: true,
    url:"media/json/getVmbkAndAll.json",
    //"http://" + localhost + "/getVmbkAndAll",
    type: "post",
    dataType: "json",
    async: false,
    success: function (data2) {
        if (data2.res == 0) {
            var data = data2.info;
            var All = data.All;
            if (All != 0) {
                var Isbk = data.Isbk;
                var nobk = All - Isbk;

                var mychart = echarts.init(document.getElementById("backup_counts"));
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ["#428bca", "#45b6af"],
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'center',
                        data: ['未受保护的虚拟机', '受保护的虚拟机']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: false, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'red'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1548
                                    }
                                }
                            },
                            saveAsImage: {show: false}
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: '受保护情况',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '40%'],
                            data: [

                                {value: nobk, name: '未受保护的虚拟机'},
                                {value: Isbk, name: '受保护的虚拟机'}

                            ]
                        }
                    ]
                };

                mychart.setOption(option);
            }
            else {
                $(".zzq").show();
            }
        }
        else if (data2.res == -1) {
            alert("后台报错：" + data2.err);
        }

    }
});*/
//数字效果插件初始化
$('.counter').countUp();
//验证是否进行了配置，如果没有配置，则跳转到配置页面
/*$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/mysqlConfExist",
    dataType: "json",
    async: false,
    success: function (data) {
        if (data.res == -1) {
            $.confirm({
                confirmButtonClass: 'btn btn-info',
                cancelButtonClass: 'btn-danger',
                confirmButton: '确认',
                cancelButton: '取消',
                animation: 'zoom',
                closeAnimation: 'rotateXR',
                title: '没有进行系统配置！',
                content: '即将跳转到配置管理界面（此确认框会在3秒后消失）',
                autoClose: '确认|3000',
                buttons: {
                    确认: function () {
                        window.location.href = "pzmanager.html"
                    }
                }
            });
        }
    }
});*/
//主机概况展现层
/*$.ajax({
    cache: true,
    type: "post",
    url:"media/json/getHostInfo.json",
    //"http://" + localhost + "/getHostInfo",
    dataType: "json",
    async: false,
    success: function (data2) {
        if (data2.res == 0) {
            var data = data2.info;
            var length = data.length;
            var CPU_model = data[0].CPU_model;
            var physical_CPU = data[1].physical_CPU;
            var logical_CPUs = data[2].logical_CPUs;
            var Memory_Toal = data[3].Memory_Toal;
            var Memory_Used = data[4].Memory_Used;
            var Memory_Free = data[5].Memory_Free;
            var Disks = data[6].Disks;
            $("#cpu_model").text(CPU_model);
            $("#p_cpu").text(physical_CPU);
            $("#l_cpu").text(logical_CPUs);
            $("#t_memory").text(Memory_Toal);
            $("#u_memory").text(Memory_Used);
            $("#f_memory").text(Memory_Free);
            $("#disk_num").text(Disks);
            var Amount_Disks = data[7].Amount_Disks;
            var Amount_Disks_length = data[7].Amount_Disks.length+1;
            var tr = "<td rowspan='"+Amount_Disks_length+"' style='vertical-align:middle !important;'>磁盘信息</td>";
            $("#disk_info").html(tr);
            var tr_ = "";
            for (var key in Amount_Disks) {
                for(var key_ in Amount_Disks[key]){
                    var value = Amount_Disks[key][key_];
                    msg = key_+":"+value;
                    tr_ += "<tr><td>"+msg+"</td></tr>";
                }
            }
            $("#ComputerTab").append(tr_);

        }
        else if (data2.res == -1) {
            alert("后台报错：" + data2.err)
        }
    }
});*/
//历史任务展现层
var str_ = {
    "num": 15
};
var str = JSON.stringify(str_);
/*$.ajax({
    cache: true,
    type: "get",
    url:"media/json/getAllPlanHis.json",
    //"http://" + localhost + "/getAllPlanHis",
    dataType: "json",
    data: {str: str},
    async: false,
    success: function (data2) {
        if (data2.res == 0) {
            var data = data2.info;
            var length = data.length;
            for (var i = 0; i < length; i++) {
                var strategy = data[i].strategy;
                var vmname = data[i].vmname;
                var bktype = data[i].bktype;
                var runstate = data[i].runstate;
                switch (bktype) {
                    case "1":
                        bktype = "全量备份";
                        break;
                    case "2":
                        bktype = "增量备份";
                        break;
                    case "3":
                        bktype = "磁盘全量备份";
                        break;
                    case "4":
                        bktype = "恢复";
                        break;
                }
                switch (runstate) {
                    case "0":
                        runstate = "<span class='label label-success'>成功</span>";
                        break;
                    case "1":
                        runstate = "<span class='label label-info'>运行中</span>";
                        break;
                    case "2":
                        runstate = "<span class='label label-warning'>失败</span>";
                        break;
                }
                var string1 = "&nbsp" + strategy + "备份任务" + "\"" + vmname + "\"" + bktype + "&nbsp" + runstate;
                $(".history_tasks").prepend("<li><div class='task_li'><div class='label  label-success label1'><i class='fa fa-desktop'></i></div><span>" + string1 + "</span><!--<div class='date'>19小时前</div>--></div></li>");
            }
        }
        else if (data2.res == -1) {
            alert("后台报错：" + data2.err)
        }
    }
});*/
//*****************************************************以下为websocket显示日志部分****************************************************************
//无集群选中时websocket推送
var websocket = null;
function webSocket() {

 //判断当前浏览器是否支持websocket
     if ('WebSocket' in window) {
         websocket = new WebSocket("ws://" + localhost_ + "/WebSocketLog/allserver/detail")
     }
     else {
         alert('当前浏览器不支持WebSocket');
     }
 //调用websocket反回的信息，将日志信息展现在页面上
     websocket.onmessage = function (event) {
         var data = JSON.parse(event.data);
         let addcpuUsage = 0;
         let addmemoryInUse = 0;
         for(let key in data){
          addcpuUsage += data[key]['cpuUsage'];
          addmemoryInUse += data[key]['memoryInUse']
         }
         CPU = Math.ceil(addcpuUsage);
         MEM = Math.ceil(addmemoryInUse);
         console.log(data);
         console.log(CPU);
         console.log(MEM);
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
         closeWebSocket();
     };

 //关闭WebSocket连接
     function closeWebSocket() {
         websocket.close();
     }
}
webSocket();
//选中集群时
var websocket2 = null;
function webSocket2(servers) {

    //判断当前浏览器是否支持websocket
    if ('WebSocket' in window) {
        websocket2 = new WebSocket("ws://" + localhost_ + "/WebSocketLog/allserver/detail/"+servers)
    }
    else {
        alert('当前浏览器不支持WebSocket');
    }
    //调用websocket反回的信息，将日志信息展现在页面上
    websocket2.onmessage = function (event) {
        var data = JSON.parse(event.data);
        let addcpuUsage = 0;
        let addmemoryInUse = 0;
        for(let key in data){
            addcpuUsage += data[key]['cpuUsage'];
            addmemoryInUse += data[key]['memoryInUse']
        }
        CPU = Math.ceil(addcpuUsage);
        MEM = Math.ceil(addmemoryInUse);
        console.log(data);
        console.log(CPU);
        console.log(MEM);
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
function CPU_SHOW() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    function activeLastPointToolip(chart) {
        var points = chart.series[0].points;
        chart.tooltip.refresh(points[points.length - 1]);
    }

    $('#highchart_1').highcharts({
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
                        var x = (new Date()).getTime(); // current time
                        var y =CPU;
                        //console.log("CPU:" + CPU + "%");
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
function MEM_SHOW() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    function activeLastPointToolip(chart) {
        var points = chart.series[0].points;
        chart.tooltip.refresh(points[points.length - 1]);
    }

    $('#highchart_2').highcharts({
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

CPU_SHOW();
MEM_SHOW();
//*****************************************************以下为新项目部分****************************************************************
//获取所有可用服务器http://192.168.24.232:8081/server/getall
let sample_1 = $('#sample_1');
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
//获取所有集群
function getAllCluster(){
    $.ajax({
        cache: true,
        type: "get",
        url:"http://"+localhost_+"/cluster/findall",
        //"http://" + localhost + "/getAllPlanHis",
        dataType: "json",
        async: false,
        success: function (data) {
            let str="";
            for(let key in data){
                let clustername =  data[key]['clustername'];
                let servers =  data[key]['servers'];
                str += "<tr class=\"trDatabase\">\n" +
                    "<td><i class=\"fa fa-database tdDatabase\"></i>"+clustername+"</td>\n" +
                    "<td>\n" +
                    "<span class=\"label label-info myLabel appendCluster\" >附加</span>\n" +
                    "<span class=\"label label-danger myLabel removeCluster\">删除</span>\n" +
                    "</td>\n" +
                    "</tr>";

            }
            $('#sample_1_tbody').html(str);
            let $alert = $('#noDatabase');
            data.length===0?$alert.show():$alert.hide()
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
getAllCluster();
//查找所有任务
function getAllTasks(){
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/task/getall",
        async: false,
        success: function (data) {
                var length = data.length;
                for (var i = 0; i < length; i++) {
                    var operation = data[i].operation;
                    var status = data[i].status;
                    var starttime = data[i].starttime;
                    var endtime = data[i].endtime;
                    switch (status) {
                        case "success":
                            status = "<span class='label label-success' style='margin-left: 3px; '>成功</span>";
                            break;
                        case "fail":
                            status = "<span class='label label-danger'  style='margin-left: 3px; '>失败</span>";
                            break;
                    }
                    var string1 = "&nbsp"+"任务" + "\"" + operation + "\"" + "&nbsp" + starttime  + "&nbsp到&nbsp" + endtime +status;
                    $(".history_tasks").prepend("<li><div class='task_li'><div class='label  label-success label1'><i class='fa fa-desktop'></i></div><span>" + string1 + "</span><!--<div class='date'>19小时前</div>--></div></li>");
                }
        },
        error: function (data) {
            if(JSON.parse(data.responseText).message==="Could not open JPA EntityManager for transaction; nested exception is javax.persistence.PersistenceException: org.hibernate.exception.JDBCConnectionException: Unable to acquire JDBC Connection" || JSON.parse(data.responseText).message ==="Could not open JPA EntityManager for transaction; nested exception is org.hibernate.exception.JDBCConnectionException: Unable to acquire JDBC Connection"){
                alert('数据库连接失败')
            }
            else{
                alert('出现了非数据库连接错误:'+JSON.parse(data.responseText).message)
            }
        }
    });
}
getAllTasks();
//判断是否存在session,存在则直接选中集群
JSON.parse(sessionStorage.getItem('session'))!==null?$('.trDatabase').each(function () {if(JSON.parse(sessionStorage.getItem('session')).clusterName===$(this).children('td').eq(0).text())$(this).addClass('eee')}):false;
//点击选中集群
sample_1.on('click','.trDatabase',function (e) {
    e.stopPropagation();
    $('.trDatabase').removeClass('eee');
    $(this).addClass('eee');
    let clustername = $(this).children('td').eq(0).text();
    $.ajax({
        cache: true,
        type: "get",
        url:"http://"+localhost_+"/cluster/servers",
        //"http://" + localhost + "/getAllPlanHis",
        data:{'clustername':clustername},
        async: false,
        success: function (data) {
            console.log(data);
            let servers;
            if(data){
                if(websocket2){
                    websocket2.close();
                }
                websocket.close();
                servers =  data.join(',');
                webSocket2(servers);
            }
            else{

            }

        },
        error:function (data) {
            alert('发生错误:'+JSON.parse(data.responseText).message)
        }
    });


});
let clusterName;
//点击附加
sample_1.on('click','.appendCluster',function (e) {
    e.stopPropagation();
     clusterName = $(this).parent().parent().children('td').eq(0).text();
     $('#addServerModal').modal('show');
});
//删除集群
sample_1.on('click','.removeCluster',function (e) {
    e.stopPropagation();
    let clustername = $(this).parent().parent().children('td').eq(0).text();
    $.confirm({
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn-danger',
        confirmButton: '确认',
        cancelButton: '取消',
        animation: 'zoom',
        closeAnimation: 'rotateXR',
        title: '删除？',
        content: '是否删除该集群（8秒后消失）',
        autoClose: '否|8000',
        buttons: {
            deleteUser: {
                text: '是',
                action: function () {
                    $('.tog').show();
                    $.ajax({
                        cache: true,
                        type: "get",
                        url:"http://"+localhost_+"/cluster/delete",
                        //"http://" + localhost + "/getAllPlanHis",
                        data:{'clusternames':clustername},
                        async: true,
                        success: function (data) {
                            if(clustername===$('.eee').children('td').eq('0').text()){
                                websocket2.close();
                                webSocket();
                            }
                            getAllCluster();
                            $('.tog').hide();
                        },
                        error:function (data) {
                            $('.tog').hide();
                            alert('发生错误:'+JSON.parse(data.responseText).message)
                        }
                    });
                }
            },
            否: function () {

            },
        }
    });
});
//添加集群
$('#addCluster').click(function () {
    let clustername = $.trim($("input[name='clustername']").val());
    let status = 0;
    $('#sample_1_tbody').find('.trDatabase').each(function () {
       if(clustername ===  $(this).children('td').eq(0).text()){
           $.confirm({
               confirmButtonClass: 'btn btn-info',
               cancelButtonClass: 'btn-danger',
               confirmButton:'确认',
               cancelButton:'取消',
               animation: 'zoom',
               closeAnimation: 'rotateXR',
               title: '错误！',
               content: '集群名称已存在（3秒后消失）',
               autoClose: '确认|3000',
               buttons: {
                   确认: function () {
                       $('#addClusterModal').modal('hide');
                   },
               }
           });
          status = 1;
          return false
       }
    });
    if(status === 0){
        $('#addClusterModal').modal('hide');
        $('.tog').show();
        $.ajax({
            cache: true,
            type: "get",
            url:"http://"+localhost_+"/cluster/add",
            //"http://" + localhost + "/getAllPlanHis",
            data:$('#modal-form').serialize(),
            async: true,
            success: function (data) {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton:'确认',
                    cancelButton:'取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '成功！',
                    content: '成功添加集群（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                            getAllCluster();
                            $('.tog').hide();
                        },
                    }
                });
            },
            error:function (data) {
                $('.tog').hide();
                alert('发生错误:'+JSON.parse(data.responseText).message)
            }
        });
    }
    return false

});
//添加服务器
$('#addServer').click(function () {
    let serverName = $("input[name='serverName']").val();
    $('#addServerModal').modal('hide');
    $('.tog').show();
    $.ajax({
        cache: true,
        type: "get",
        url:"http://"+localhost_+"/cluster/addserver",
        //"http://" + localhost + "/getAllPlanHis",
        data:{'serverName':serverName,'clusterName':clusterName},
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
                    content: '成功添加集群（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                        },
                    }
                });
            }

        },
        error:function (data) {
            $('.tog').hide();
            alert('发生错误:'+JSON.parse(data.responseText).message)
        }
    });
    return false

});
//点击左侧栏跳转
$('.index_href').click(function () {
    let $eee = $('.eee');
    let clusterName = $eee.children('td').eq(0).text();
    let href = $(this).data('href');
   if($eee.length===0)return false;
   else{
       let session = {
           'clusterName':clusterName
       };
       sessionStorage.setItem('session',JSON.stringify(session));
       window.location.href=href;
   }
});


