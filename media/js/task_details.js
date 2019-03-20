/**
 * Created by suge on 2017/8/21.
 */
/**************/
var logData = $.cookie("logData");
if(logData){
    logData = JSON.parse(logData);
}
console.log(logData);
var id = logData.id;
var status = logData.status;
console.log(id);
console.log(status);
var time = "";
var value = "开始";
var websocket = null;
//判断当前浏览器是否支持websocket
if ('WebSocket' in window) {
    websocket = new WebSocket("ws://" + localhost + "/WebSocketLog/" + id + "/readvmbkLog")
}
else {
    alert('当前浏览器不支持WebSocket');
}

Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

function activeLastPointToolip(chart) {
    var points = chart.series[0].points;
    chart.tooltip.refresh(points[points.length - 1]);
}
//初始化highCharts
$('#ec_1').highcharts({
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {
                // set up the updating of the chart each second
                var series = this.series[0],
                    chart = this;
                if (status == 1) {
                    setInterval(function () {
                        var x = (new Date()).getTime()// current time
                        if (value == "开始") {
                            value = 0;
                        }
                        else if (value == "结束") {
                            value = "";
                        }
                        var y = value;
                        series.addPoint([x, y], true, true);
                    }, 3000);
                }

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
        labels: {
            formatter: function () {
                return this.value + "lb/s"
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
                Highcharts.numberFormat(this.y, 2) + "kb/s";
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '任务流量',
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
//调用websocket反回的信息
websocket.onmessage = function (event) {
    console.log(event.data);
    var log_ = event.data;
    var log = log_.substring(6, log_.length);
    var state = log_.substring(0, 4);
    var state2 = log_.substring(0, 1);
    //判断是否需要显示流量数据(send方法发送数据)
    if (status == 1) {
        //显示任务流量
        if (state2 == "#") {
            var time_ = new Date().getTime();
            console.log(parseFloat(log_.substring(1, log_.length)));
            value = parseFloat(log_.substring(1, log_.length));
        }
        else if (log_.indexOf("任务结束") != -1) {
            value = "结束";
        }
    }
    if (log_.indexOf("开始备份磁盘数据") != -1) {
        websocket.send(log_.substring(log_.length - 1, log_.length));
    }
    //显示运行日志
    switch (state) {
        case "SEVE":
            $("#run_log").prepend("<li><div class='task_li'><div class='label  label-success label1'><i class='fa fa-check fa-fw'></i></div>&nbsp" + log.substring(2, log.length) + "</div></li>");
            break;
        case "WARN":
            $("#run_log").prepend("<li><div class='task_li'><div class='label  label-warning label1'><i class='fa fa-bell-o fa-fw'></i></div>&nbsp" + log.substring(3, log.length) + "</div></li>");
            break;
        case "ERRO":
            $("#run_log").prepend("<li><div class='task_li'><div class='label  label-danger label1'><i class='fa fa-remove fa-fw'></i></div>&nbsp" + log + "</div></li>");
            break;
    }


};
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}

//任务流量echart图
