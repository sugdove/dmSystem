/**
 * Created by suge on 2017/7/24.
 */

//定义一个dbtype全局变量用于获取初始禁止还是开启的状态
var dbtype;
//将已配置的虚拟机的信息放在表单上
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/mysqlConfRead",
    async: false,
    dataType: "json",
    success: function (data2) {
        if (data2.res == 0) {
            var data = data2.info;
            if (data != null) {
                if(data.dbtype=="sqlite"){
                   dbtype = 1;
                }
                else if(data.dbtype=="mysql"){
                    $("#ip").val(data.dbip);
                    $("#port").val(data.dbport);
                    $("#user").val(data.dbuser);
                    $("#paw").val(data.dbpasswd);
                    dbtype = 0;
                }
            }
        }
        else if (data2.res == -1) {
            alert("后台报错：" + data2.err)
        }

    }
});
if(dbtype==1){
    $("#dbtype").attr("checked",false);
    $("input[type='text']").attr("disabled",true);
    $("input[type='password']").attr("disabled",true);
    $("#dbtype").val("sqlite");
}
else if(dbtype==0){
    $("#dbtype").attr("checked",true);
    $("input[type='text']").attr("disabled",false);
    $("input[type='password']").attr("disabled",false);
    $("#dbtype").val("mysql");
}
(function () {
    //初始化bootstrap-switch
    $("#dbtype").bootstrapSwitch({
        onText: "启动",
        offText: "禁止",
        size: "small",
        onSwitchChange: function (event, state) {
            if (state == true) {
                $("#dbtype").val("mysql");
                $("input[type='text']").attr("disabled",false);
                $("input[type='password']").attr("disabled",false);
            } else {
                $("#dbtype").val("sqlite");
                $("input[type='text']").attr("disabled",true);
                $("input[type='password']").attr("disabled",true);
            }
        }
    });
    $("#stop").click(function () {
        $('[name="dbtype"]').bootstrapSwitch('state', false); // 关闭按钮
    });
    $("#start").click(function () {
        $('[name="dbtype"]').bootstrapSwitch('state', true); // 打开按钮
    });
}());