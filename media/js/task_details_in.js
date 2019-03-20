/**
 * Created by suge on 2017/8/22.
 */
//获取页面传过来的id
var id = $.cookie("StrategyId");
var NFSIp;
var restorip;
var vmnewname;
var StrategyStatus;
var detailid;
//ajax获取该备份id具体信息
var str_ = {"momentreid":id};
var str = JSON.stringify(str_);
$.ajax({
   cache:true,
    url:"http://" + localhost + "/momentredetails",
    type:"post",
    data:{str:str},
    dataType:"json",
    async:false,
    success:function(data2){
       if(data2.res==0){
           var data = data2.info;
           console.log(data);
           NFSIp = data[0].NFSIp;
           restorip = data[0].restorip;
           vmnewname = data[0].vmnewname;
           StrategyStatus = data[0].StrategyStatus;
           detailid = data[0].detailid;

       }
       else if(data2.res==-1){
           alert("后台报错："+data2.err)
       }

    }
});
//将具体信息展现在页面上
$(".NFSIp").html(NFSIp);
$(".restorip").html(restorip);
$(".vmnewname").html(vmnewname);
//未启动状态下的页面
if(StrategyStatus==0){
$("#st_stop").show();
}
//已启动状态下的页面
else if(StrategyStatus==1){
    $("#st_start").show();
}
//*****************************************************以下为websocket显示日志部分****************************************************************
var websocket = null;
//判断当前浏览器是否支持websocket
if ('WebSocket' in window) {
    websocket = new WebSocket("ws://"+localhost+"/WebSocketLog/"+id+"/readmomentLog");
}
else {
    alert('当前浏览器不支持WebSocket');
}
//调用websocket反回的信息，将日志信息展现在页面上
websocket.onmessage = function (event){
    var log_= event.data;
    var log = log_.substring(6,log_.length);
    var state = log_.substring(0,4);
    switch (state){
        case "SEVE":
            $("#run_log").prepend("<li><div class='task_li'><div class='label  label-success label1'><i class='fa fa-check fa-fw'></i></div>&nbsp"+log.substring(2,log.length)+"</div></li>");
            break;
        case "WARN":
            $("#run_log").prepend("<li><div class='task_li'><div class='label  label-warning label1'><i class='fa fa-bell-o fa-fw'></i></div>&nbsp"+log.substring(3,log.length)+"</div></li>");
            break;
        case "ERRO":
            $("#run_log").prepend("<li><div class='task_li'><div class='label  label-danger label1'><i class='fa fa-remove fa-fw'></i></div>&nbsp"+log+"</div></li>");
            break;
    }


};
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
window.onbeforeunload = function () {
    closeWebSocket();
};
//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}
