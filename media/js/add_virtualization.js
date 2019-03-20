/**
 * Created by suge on 2017/7/27.
 */
var FormValidation = function () {
    return {
        //main function to initiate the module
        init: function () {
            $.validator.addMethod("ip",function(value,element,params){
                var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                if(reg.test(value)){
                    return true;
                }else{
                    return false;
                }
            },"请输入一个IP地址，例192.168.4.36");
            $.validator.addMethod("backpath",function(value,element,params){
                var reg= /^[a-zA-Z]:\/+$/;
                var reg2=/\/.+$/;
                if(reg.test(value)||reg2.test(value)){
                    return true;
                }else{
                    return false;
                }
            },"请输入备份路径，例c:\\a");
            // for more info visit the official plugin documentation:
            // http://docs.jquery.com/Plugins/Validation

            var form1 = $('#add_virtcenter');
            var error1 = $('.alert-error', form1);
            var success1 = $('.alert-success', form1);

            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                    VirtType:{
                        required: true
                    },
                    IP: {
                        required: true,
                        ip:true
                    },
                    User: {
                        required: true
                    },
                    Password: {
                        required: true


                    },
                    BackupPath: {
                        required: true,
                        backpath:true
                    }
                },
                messages: {
                    IP: {
                        required: "请输入IP"
                    },
                    User: {
                        required: "请输入用户名",
                        minlength: "用户名长度不能小于 5 ",
                        maxlength: "用户名长度不能大于 13 "
                    },
                    Password: {
                        required: "请输入密码",
                        minlength: "密码长度不能小于 5 ",
                        maxlength: "密码长度不能大于 13 "
                    },
                    BackupPath: {
                        required: "请输入备份路径"
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
                    label
                        .addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                        .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
                },

                submitHandler: function (form) {
                    success1.show();
                    error1.hide();
                            $.ajax({
                                cache: true,
                                type: "post",
                                url: "http://"+localhost+"/addVerCent",
                                dataType:"json",
                                data:{str:(JSON.stringify(serializeJson($("#add_virtcenter").serializeArray())))},
                                async: false,
                                success: function (data) {
                                    if(data.res==0){
                                        $.confirm({
                                            confirmButtonClass: 'btn btn-info',
                                            cancelButtonClass: 'btn-danger',
                                            confirmButton:'确认',
                                            cancelButton:'取消',
                                            animation: 'zoom',
                                            closeAnimation: 'rotateXR',
                                            title: '添加成功！',
                                            content: '虚拟机添加成功（3秒后跳转到虚拟化管理中心界面）',
                                            autoClose: '确认|3000',
                                            buttons: {
                                                确认: function () {
                                                    window.location.href="virtualization.html";
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
            });

        }

    };

}();