/**
 * Created by suge on 2017/9/13.
 */
//获取页面跳转传过来的vcid和vmnewname
var vm_move_data =$.cookie("vm_move_data");
if(vm_move_data){
    vm_move_data = JSON.parse(vm_move_data);
}
var vcid = vm_move_data.vcid;
var vmnewname = vm_move_data.vmnewname;
var detailid = vm_move_data.detailid;
var id = vm_move_data.id;

//宿主机第一层vcIp的展现
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getVcentListbyMomentRe",
    dataType: "json",
    async: false,
    success: function (data2) {
        if(data2.res==0){
            var data = data2.info;
            var length = data.length;
            for (var i = 0; i < length; i++) {
                var vcip = data[i].vcip;
                var vcuser = data[i].vcuser;
                var vcpasswd = data[i].vcpasswd;
                var vcid = data[i].vcid;
                $("#tree_2").append("<li><a href='javascript:void(0)' data-role='branch'  class='tree-toggle closed vcip' data-toggle='branch' data-value='Bootstrap_Tree'><span class='vmware'></span>" + vcip + "</a><input type='text' class='vcuser hide' value='" + vcuser + "'><input type='text' class='vcpasswd hide' value='" + vcpasswd + "'><input type='text' class='vcid hide' value='" + vcid + "'></li>")
            }
        }
        else if(data2.res==-1){
            alert("后台报错："+data2.err)
        }

    }
});
//点击-时收起
$("body").on("click", ".tree-toggle", function () {
    $(this).addClass("closed");
    $(this).parent("li").children("ul").removeClass("in");
});
//点击+是展开
$("body").on("click", ".closed", function () {
    $(this).removeClass("closed");
    $(this).parent("li").children("ul").addClass("in");
});
//点击vcip获取host列表
$("body").on("click", ".vcip", function () {
    var ip = $(this).text();
    var this_1 = $(this);
    var this_ = $(this).parent("li");
    var vcuser = $(this).parent("li").children(".vcuser").val();
    var vcpasswd = $(this).parent("li").children(".vcpasswd").val();
    $(".vmnewname").html(vmnewname);
    $("#vmnewname").val(vmnewname);
    var str_ = {"Ip": ip, "Username": vcuser, "PassWord": vcpasswd};
    var str = JSON.stringify(str_);
    if (this_.children("ul").length == 0) {
        $(".spinner").show();
        $(".black_overlay").show();
        $.ajax({
            cache: true,
            type: "post",
            url: "http://" + localhost + "/getEsxiIpListMomentRe",
            dataType: "json",
            data: {str:str},
            async: true,
            success: function (data2) {
                if(data2.res==0){
                    var data = data2.info;
                    $(".spinner").hide();
                    $(".black_overlay").hide();
                    var length = data.length;
                    var string = "<ul class='branch in'>";
                    for (var i = 0; i < length; i++) {
                        string += "<li><a href='javascript:void(0)' data-role='leaf' class='host_' data-value='Bootstrap_Tree'><span class='host'></span>" + data[i] + "</a></li>";
                    }
                    string += "</ul>";
                    this_.append(string)
                }
                else if(data2.res==-1){
                    alert("后台报错："+data2.err)
                }

            }
        })
    }

});
//标签页效果
$("#tab_1_").click(function () {
    $(this).parent("li").removeClass("active");
    $("#tab_2_").parent("li").removeClass("active");
    $(this).parent("li").addClass("active");
    $("#tab_1").fadeIn();
    $("#tab_2").hide();
});
$("#tab_2_").click(function () {
    $(this).parent("li").removeClass("active");
    $("#tab_1_").parent("li").removeClass("active");
    $(this).parent("li").addClass("active");
    $("#tab_1").hide();
    $("#tab_2").fadeIn();
});
//点击host效果
$("body").on("click", ".host_", function () {
    $(".host_").removeClass("eee");
    $(this).addClass("eee");
    $("#backup_2").show();
    var Ip = $(".iframe2").find(".eee").parent().parent().parent().children(".vcip").text();
    var Username = $(".iframe2").find(".eee").parent().parent().parent().children(".vcuser").val();
    var PassWord = $(".iframe2").find(".eee").parent().parent().parent().children(".vcpasswd").val();
    var TarIp = $(".iframe2").find(".eee").text();
    var name = $("#tab1").find($("input[type='radio']:checked")).parent().parent("ul").parent("li").children("a").text();
    var name2 = name + "/" + name + ".vmdk";
    var str_ = {"Ip": Ip, "Username": Username, "PassWord": PassWord, "TarIp": TarIp};
    var str =JSON.stringify(str_);
    $.ajax({
        cache: true,
        type: "post",
        url: "http://" + localhost + "/getDatastoreNameList",
        dataType:"json",
        data: {str:str},
        async: false,
        success: function (data2) {
            if(data2.res==0){
                var data = data2.info;
                var length = data.length;
                var string = "";
                for (var i = 0; i < length; i++) {
                    var data_ = "[" + data[i] + "]";

                    string += "<option value='" + data[i] + "'><i class='fa hostcluster icon-default'></i>" + data[i] + "</option>"

                }
                $("#store").html(string)
            }
            else if(data2.res==-1){
                alert("后台报错："+data2.err);
            }
        }
    });
});

/*****************************validation表单验证和方法提交******************************/
function validation() {
    $.validator.addMethod("ip", function (value, element, params) {
        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (value) {

        }
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    }, "请输入一个IP地址，例192.168.23.50");
    var form1 = $('#add_virtcenter');
    var error1 = $('.alert-error', form1);
    var success1 = $('.alert-success', form1);
//调用validate进行表单验证
    form1.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",
        rules: {
            vm_name_: {
                required: true
            }
        },
        messages: {
            vm_name_: {
                required: "虚拟机名不能为空"
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            success1.hide();
            error1.show();
            App.scrollTo(error1, -200);
        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                .closest('.help-inline').removeClass('ok'); // display OK icon
            $(element)
                .closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change dony by hightlight
            $(element)
                .closest('.control-group').removeClass('error'); // set error class to the control group
        },

        success: function (label) {
            label.addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
        },
        //提交表单方法
        submitHandler: function (form) {
            success1.show();
            error1.hide();

            var zz_ = $("#tree_2").find(".eee").parent().parent().parent().children(".vcip").text();
            var esxiIp_ = $("#tree_2").find(".eee").text();
            var esxiIp;
            var Username = $(".iframe2").find(".eee").parent().parent().parent().children(".vcuser").val();
            var PassWord = $(".iframe2").find(".eee").parent().parent().parent().children(".vcpasswd").val();
            if (esxiIp_ == "localhost.localdomain") {
                esxiIp = zz_
            }
            else {
                esxiIp = esxiIp_
            }
            var mountip = $("#mountip").val();
            var Strategy = $("#Strategy").val();
            var datastorename = $("#store").val();
            var flag = $("#flag").val();
            var string_ = {
                "id": id,
                "detailid": detailid,
                "restorip": esxiIp,
                "datastorename": datastorename,
                "vmnewname": vmnewname,
                "vcid": vcid
            };
            var string = JSON.stringify(string_);
            $.confirm({
                confirmButtonClass: 'btn btn-info',
                cancelButtonClass: 'btn-danger',
                confirmButton: '确认',
                cancelButton: '取消',
                animation: 'zoom',
                closeAnimation: 'rotateXR',
                title: '恢复？',
                content: '确认是否进行恢复（此确认框会在8秒后消失）',
                autoClose: '否|8000',
                buttons: {
                    deleteUser: {
                        text: '是',
                        action: function () {
                                    $.ajax({
                                        cache: true,
                                        type: "post",
                                        url: "http://" + localhost + "/momentremove",
                                        data: {"str": string},
                                        dataType:"json",
                                        async: false,
                                        success: function (data) {
                                            if(data.res==0){
                                                $.confirm({
                                                    confirmButtonClass: 'btn btn-info',
                                                    cancelButtonClass: 'btn-danger',
                                                    confirmButton: '确认',
                                                    cancelButton: '取消',
                                                    animation: 'zoom',
                                                    closeAnimation: 'rotateXR',
                                                    title: '操作成功！',
                                                    content: '虚拟机恢复任务已提交（此确认框会在3秒后消失）',
                                                    autoClose: '确认|3000',
                                                    buttons: {
                                                        确认: function () {
                                                            window.location.href = "all_task.html";
                                                        }
                                                    }
                                                });
                                            }
                                            else if(data.res==-1){
                                                alert("后台报错："+data.err)
                                            }

                                        }
                                    })
                        }
                    },
                    否: function () {

                    }
                }
            });
        }
    });
}

validation();

