//获取标签页初始位置;
if(document.URL.indexOf("page")!=-1){
    var page;
    var page_ = document.URL.split("?")[1];
    page = page_.split("=")[1];
//标签页跳转
    switch (page){
        case "2":
            $(".changecss").eq(1).click();
            $("#sample_1").find("th").eq(9).css("width", "9%");
            $("#sample_1").find("th").eq(8).css("width", "6%");
            $("#sample_3").find("th").eq(8).css("width", "9%");
            $("#sample_3").find("th").eq(7).css("width", "6%");
            $("#sample_2").find("th").eq(7).css("width", "6%");
            $("#sample_2").find("th").eq(8).css("width", "9%");
            break;
        case "3":
            $(".changecss").eq(2).click();
            $("#sample_1").find("th").eq(9).css("width", "9%");
            $("#sample_1").find("th").eq(8).css("width", "6%");
            $("#sample_3").find("th").eq(8).css("width", "9%");
            $("#sample_3").find("th").eq(7).css("width", "6%");
            $("#sample_2").find("th").eq(7).css("width", "6%");
            $("#sample_2").find("th").eq(8).css("width", "9%");
            break;
    }
}
//将1-7字符串变为相应正确时间方法
function changeDate(date){
    var arr = date.split(",");
    var string_ = "";
    if(arr[arr.length-1]==1){
        arr[arr.length-1]=8;
    }
    for(var i=0;i<arr.length;i++){
        string_ = string_+(arr[i]-1) + ","
    }
    var string = string_.substring(0,string_.length-1);
    return string;
    }
//获取所有按策略备份计划
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getAutoBkPlane",
    dataType: "json",
    async: false,
    //数据处理
    success: function (data_1) {
        if (data_1.res == 0) {
            var data = data_1.info;
            var length = data.length;
            var i = 0;
            var json = {};
            for (i; i < length; i++) {
                var obj = data[i];
                var tempArr = json[obj['strategy']];
                if (!tempArr) {
                    tempArr = [];
                    json[obj['strategy']] = tempArr;
                }
                tempArr.push(obj);
            }
            var details_tr = [];
            for (var k in json) {
                var obj2 = {};
                var length = json[k].length;
                var data1 = json[k][0];
                var Strategy = data1.strategy;
                var VirtCentType = data1.virtcenttype;
                var creatime = data1.creatime;
                var StrategyStatus =data1.strategystatus;
                var vmname = data1.vmname;
                var vcip = data1.vcip;
                var DelData = data1.deldata;
                var DelType = data1.deltype;
                var isorder = data1.isorder;
                switch (isorder) {
                    case "0":
                        isorder = "<span class='label label-warning'>不按顺序</span>";
                        break;
                    case "1":
                        isorder = "<span class='label label-success'>顺序备份</span>";
                        break;
                }
                switch (DelType) {
                    case "1":
                        DelType = "天";
                        break;
                    case "2":
                        DelType = "个";
                        break;
                }

                var vcStorepath = data1.vcStorepath;
                if (VirtCentType == 0 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-warning'>未启动</span></td><td><span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span></td></tr>"
                }
                if (VirtCentType == 0 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-success'>已启动</span></td><td><span class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</span></td></tr>"
                }
                if (VirtCentType == 0 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='laber laber-danger'>已停止</span></td><td><span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-warning'>未启动</span></td><td><span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-success'>已启动</span></td><td><span class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</span></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-danger'>已停止</span></td><td><span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-warning'>未启动</span></td><td><span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-success'>已启动</span></td><td><span class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</span></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>"+isorder+"</td><td><span class='label label-danger'>已停止</span></td><td><span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span></td></tr>"
                }
                var details = "<tr class='details details_tr'><td class='details' colspan='9'><table><tbody><tr><td>虚拟机名称:</td><td>" + vmname + "</td></tr><tr><td>保留方式:</td><td>按" + DelType + "数保留" + DelData + DelType + "</td></tr>";
                for (var c = 0; c < length; c++) {
                    var data = json[k][c];
                    var bktype = data.bktype;
                    var exetype = data.exetype;
                    var exedate = data.exedate;
                    var exetime = data.exetime;
                    var bkid = (data.bkid).replace(/^0+/,"");
                    if (bktype == 1) {
                        if (exetype == 1) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>全量策略:</td><td><span>每天</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                        if (exetype == 2) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>全量策略:</td><td><span>每周</span><span>" + changeDate(exedate) + "</span><span>,</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                        if (exetype == 3) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>全量策略:</td><td><span>每月</span><span>" + exedate + "</span><span>,</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                    }
                    if (bktype == 2) {
                        if (exetype == 1) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>增量策略:</td><td><span>每天</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                        if (exetype == 2) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>增量策略:</td><td><span>每周</span><span>" + changeDate(exedate) + "</span><span>,</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                        if (exetype == 3) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>增量策略:</td><td><span>每月</span><span>" + exedate + "</span><span>,</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                    }
                    if (bktype == 3) {
                        if (exetype == 1) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>磁盘全量策略:</td><td><span>每天</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                        if (exetype == 2) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>磁盘全量策略:</td><td><span>每周</span><span>" + changeDate(exedate) + "</span><span>,</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                        if (exetype == 3) {
                            details += "<tr><td class='bkid_1'>" + bkid + "</td><td>磁盘全量策略:</td><td><span>每月</span><span>" + exedate + "</span><span>,</span><span>" + exetime + "</span><span class='label label-warning cchange'>修改</span><span class='label label-success cstart'>启动</span></td></tr>"
                        }
                    }
                }
                details += "</tbody></table></td></tr>";
                obj2[Strategy] = details;

                details_tr.push(obj2);
                $("#v_tbody_2").append(table)
            }
            //改变checkbox样式
            if (!jQuery().uniform) {
                return;
            }
            var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
            if (test.size() > 0) {
                test.each(function () {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            }
            //初始化dataTable
            $('#sample_2').dataTable({
                "aoColumnDefs": [
                    {"bSortable": false, "aTargets": [0, 1]}
                ],
                "aaSorting": [[2, 'asc']],
                "aLengthMenu": [
                    [7, 14, -1],
                    [7, 14, "All"] // change per page values here
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
            //选中th中的checkbox后td中的checkbox改变checked状态
            jQuery('#sample_2 .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked && $(this).prop("disabled") == false) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                });
                jQuery.uniform.update(set);
            });
            //点击+append区域
            $("#v_tbody_2").on("click", ".row-details-close", function () {
                var name = $(this).parent("td").parent("tr").find("td").eq(2).text();
                for (var i = 0; i < details_tr.length; i++) {
                    for (var k in details_tr[i]) {
                        if (k == name) {
                            var obj = details_tr[i][name];
                            $(this).parent("td").parent("tr").after(details_tr[i][name])
                        }
                    }
                }
                $(this).attr("class", "row-details row-details-open");
            });
            //点击-remove区域
            $("#v_tbody_2").on("click", ".row-details-open", function () {
                $(this).attr("class", "row-details row-details-close");
                $(this).parent("td").parent("tr").next(".details_tr").remove();
            });
            //鼠标在区域内出现修改按钮
            $("#v_tbody_2").on("mouseover", ".details_tr", function () {
                //$(this).find(".cchange").show();
                $(this).find(".cstart").show();
            });
            //鼠标在区域外修改按钮消失
            $("#v_tbody_2").on("mouseout", ".details_tr", function () {
                // $(this).find(".cchange").hide();
                $(this).find(".cstart").hide();
            });
            /*  for(var i=0;i<details_tr.length;i++){
                  $("#v_tbody_2").find(".appendtr").eq(i).after(details_tr[i])
              }*/
            //操作主入口
            //删除按策略备份
            $("body").on("click", "#bk_plan_delete_2", function () {
                if($("#v_tbody_2").find("input[type='checkbox']:checked").length===0){
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '操作错误！',
                        content: '请选择至少一条数据！（此确认框会在3秒后消失）',
                        autoClose: '确定|3000',
                        buttons: {
                            确定: function () {
                            }
                        }
                    });
                }
                else{
                    var tr = $("#v_tbody_2").find("input[type='checkbox']:checked").parent().parent().parent().parent("tr");
                    var string="";
                    $("#v_tbody_2").find("input[type='checkbox']:checked").each(function(){
                        string+=($(this).val())+","
                    });
                    string = string.substring(0,string.length-1);
                    var str_ = {strategy:string};
                    var str = JSON.stringify(str_);
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '删除？',
                        content: '确认是否删除（此确认框会在8秒后消失）',
                        autoClose: '否|8000',
                        buttons: {
                            deleteUser: {
                                text: '是',
                                action: function () {
                                    $.ajax({
                                        cache: true,
                                        url: "http://" + localhost + "/deleteStrategyPlane",
                                        type: "post",
                                        async: false,
                                        dataType:"json",
                                        data:{str:str},
                                        success: function (data) {
                                            if (data.res == 0) {
                                                $.confirm({
                                                    confirmButtonClass: 'btn btn-info',
                                                    cancelButtonClass: 'btn-danger',
                                                    confirmButton: '确认',
                                                    cancelButton: '取消',
                                                    animation: 'zoom',
                                                    closeAnimation: 'rotateXR',
                                                    title: '删除成功！',
                                                    content: '策略备份任务删除成功！（此确认框会在3秒后消失）',
                                                    autoClose: '确认|3000',
                                                    buttons: {
                                                        确认: function () {
                                                            tr.each(function () {
                                                                $("#sample_2").DataTable().row($(this)).remove().draw(false);
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                            else if (data.res == -1) {
                                                alert("后台报错："+data.err)
                                            }

                                        },
                                        error: function (data) {
                                            alert("ajax调用失败")
                                        }
                                    })
                                }
                            },
                            否: function () {

                            },
                        }
                    });
                }

            });
            //启动


            $("body").on("click", ".start1", function () {
                var Strateg = $(this).parent().parent("tr").find("input[type='checkbox']").val();
                var this_ = $(this).parent().parent("tr").children("td");
                var str__1={
                    strategy:Strateg
                };
                var str = JSON.stringify(str__1);
                $.ajax({
                    cache: true,
                    url: "http://" + localhost + "/StartStrateg",
                    type: "post",
                    async: false,
                    data: {str: str},
                    dataType:"json",
                    success: function (data) {
                        if(data.res==0){
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '启动成功！',
                                content: '该策略备份任务启动成功！（此确认框会在3秒后消失）',
                                autoClose: '确认|3000',
                                buttons: {
                                    确认: function () {
                                        this_.eq(8).children("span").text("已启动");
                                        this_.eq(8).children("span").attr("class","label label-success");
                                        this_.eq(9).html("<span class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</span>")
                                    }
                                }
                            });
                        }
                        else if (data.res == -1) {
                            alert("后台报错："+data.err)
                        }

                    },
                    error: function (data) {
                        alert("ajax调用失败")
                    }
                })
            });
            //停止
            $("body").on("click", ".stop1", function () {
                var Strateg = $(this).parent().parent().find("input[type='checkbox']").val();
                var this_ = $(this).parent().parent("tr").children("td");
                var str__1={
                    strategy:Strateg
                };
                var str = JSON.stringify(str__1);
                $.ajax({
                    cache: true,
                    url: "http://" + localhost + "/StopStrateg",
                    type: "post",
                    async: false,
                    data: {str: str},
                    dataType:"json",
                    success: function (data) {
                        if(data.res==0){
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '停止成功！',
                                content: '该策略备份任务停止成功！（此确认框会在3秒后消失）',
                                autoClose: '确认|3000',
                                buttons: {
                                    确认: function () {
                                        this_.eq(8).children("span").text("未启动");
                                        this_.eq(8).children("span").attr("class","label label-warning");
                                        this_.eq(9).html("<span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span>")
                                    }
                                }
                            });
                        }
                        else if (data.res == -1) {
                            alert("后台报错："+data.err)
                        }

                    },
                    error: function (data) {
                        alert("ajax调用失败")
                    }
                })

            });
            //启动策略
            $("body").on("click", ".cstart", function () {
                var id = $(this).parent().parent("tr").find(".bkid_1").text();
                var str__1={
                    "id":id
                };
                var str = JSON.stringify(str__1);
                $.ajax({
                    cache: true,
                    url: "http://" + localhost + "/execuPlane",
                    type: "post",
                    async: false,
                    data: {str: str},
                    dataType:"json",
                    success: function (data) {
                        if(data.res==0){
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '策略启动成功！',
                                content: '该策略备份任务启动成功！（此确认框会在3秒后消失）',
                                autoClose: '确认|3000',
                                buttons: {
                                    确认: function () {
                                        //   window.location.reload();
                                    }
                                }
                            });
                        }
                        else if (data.res == -1) {
                            alert("后台报错："+data.err)
                        }

                    },
                    error: function (data) {
                        alert("ajax调用失败")
                    }
                })

            });


            //修改策略
            $("body").on("click", ".cchange", function () {
                $("#myModal").modal("show");

            })

        }


    }
});
//获取所有手动备份计划
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getManualPlane",
    dataType: "json",
    async: false,
    success: function (data1) {

        if (data1.res == 0) {
            var data = data1.info;
            var length = data.length;
            var i = 0;
            for (i; i < length; i++) {
                var bkid = (data[i].bkid).replace(/^0+/,"");
                var msg = data[i].msg;
                var vmidset = data[i].vmid;
                var vcid = data[i].vcid;
                var vmnameset = data[i].vmname;
                var bktype = data[i].bktype;
                var threadnum = data[i].threadnum;
                var exetime = data[i].exetime;
                var exestatus = data[i].exestatus;
                var vcip = data[i].vcip;
                var vcStorepath = data[i].vcStorepath;
                //    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                $("#v_tbody").append("<tr class='odd gradeX'><td class='sorting_1'><input type='checkbox' name='bkid' class='checkboxes' value='" + bkid + "'></td><td>" + bkid + "</td><td class='hidden-480 vcid_show' title='IP地址：" + vcip + "  备份路径：" + vcStorepath + "'>" + vcid + "</td><td class='hidden-480'>" + vmidset + "</td><td class='hidden-480'>" + vmnameset + "</td><td>" + bktype + "</td><td>手动执行</td><td><span class='btn btn yellow pad run'><i class='fa fa-play-circle-o'></i> 执行</span></td></tr>")
            }
            $("#v_tbody tr").each(function () {
                if ($(this).find("td").eq(5).text() == "1") {
                    $(this).find("td").eq(5).text("全量备份")
                }
                if ($(this).find("td").eq(5).text() == "2") {
                    $(this).find("td").eq(5).text("增量备份")
                }
                if ($(this).find("td").eq(5).text() == "3") {
                    $(this).find("td").eq(5).text("全磁盘备份")
                }
            });
            if (!jQuery().uniform) {
                return;
            }
            var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
            if (test.size() > 0) {
                test.each(function () {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            }
            //初始化datatable
            $('#sample_1').dataTable({
                "aoColumnDefs": [
                    {"orderable": false, "aTargets": [0]}// 制定列不参与排序
                ],
                "aLengthMenu": [
                    [7, 14, -1],
                    [7, 14, "All"] // change per page values here
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
                },
                "aaSorting": [[1, "asc"]]//默认第几个排序
            });
            //点击th里checkbox后td里的checkbox改变
            jQuery('#sample_1 .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                });
                jQuery.uniform.update(set);
            });
            //删除手动备份计划
            $("#bk_plan_delete").click(function () {
                if($("#v_tbody").find("input[type='checkbox']:checked").length===0){
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '操作错误！',
                        content: '请选择至少一条数据！（此确认框会在3秒后消失）',
                        autoClose: '确定|3000',
                        buttons: {
                            确定: function () {
                            }
                        }
                    });
                }
                else{
                    var tr = $("#v_tbody").find("input[type='checkbox']:checked").parent().parent().parent().parent("tr");
                    var string="";
                    $("#v_tbody").find("input[type='checkbox']:checked").each(function(){
                        string+=($(this).val())+","
                    });
                    string = string.substring(0,string.length-1);
                    var str_ = {bkid:string};
                    var str = JSON.stringify(str_);
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '删除？',
                        content: '确认是否删除（此确认框会在8秒后消失）',
                        autoClose: '否|8000',
                        buttons: {
                            deleteUser: {
                                text: '是',
                                action: function () {
                                    $.ajax({
                                        url: "http://" + localhost + "/deleteManuaPlane",
                                        cache: true,
                                        type: "post",
                                        data: {str:str},
                                        dataType:"json",
                                        async: false,
                                        success: function (data) {
                                            if (data.res == 0) {
                                                $.confirm({
                                                    confirmButtonClass: 'btn btn-info',
                                                    cancelButtonClass: 'btn-danger',
                                                    confirmButton: '确认',
                                                    cancelButton: '取消',
                                                    animation: 'zoom',
                                                    closeAnimation: 'rotateXR',
                                                    title: '删除成功！',
                                                    content: '备份计划成功删除！（此确认框会在3秒后消失）',
                                                    autoClose: '确定|3000',
                                                    buttons: {
                                                        确定: function () {
                                                            tr.each(function () {
                                                                $("#sample_1").DataTable().row($(this)).remove().draw(false);
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                            else if (data.res == -1) {
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
            //同步执行
            $("body").on("click", ".run", function () {
                var id = $(this).parent().parent("tr").find("td").eq(1).text();
                var this_ = $(this).parent().parent("tr").children("td");
                var str_ = {
                    "id": id
                };
                var str = JSON.stringify(str_);
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '手动执行？',
                    content: '确认是否手动执行（此确认框会在8秒后消失）',
                    autoClose: '否|8000',
                    buttons: {
                        deleteUser: {
                            text: '是',
                            action: function () {
                                $.ajax({
                                    url: "http://" + localhost + "/execuPlane",
                                    cache: true,
                                    type: "post",
                                    data: {"str": str},
                                    dataType:"json",
                                    async: false,
                                    success: function (data) {
                                        if (data.res == 0) {
                                            $.confirm({
                                                confirmButtonClass: 'btn btn-info',
                                                cancelButtonClass: 'btn-danger',
                                                confirmButton: '确认',
                                                cancelButton: '取消',
                                                animation: 'zoom',
                                                closeAnimation: 'rotateXR',
                                                title: '操作成功！',
                                                content: '备份计划已启动！（此确认框会在3秒后消失）',
                                                autoClose: '返回|3000',
                                                buttons: {
                                                    返回: function () {
                                                     window.location.href="all_task.html?page=2";
                                                     /*this_.eq(8).children("span").text("进行中");
                                                     this_.eq(8).children("span").attr("class","label label-success");
                                                     this_.eq(9).html("<span class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</span>")*/
                                                    }
                                                }
                                            });
                                        }
                                        else if (data.res == -1) {
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
            })
        }
        else if (data1.res == -1) {
           alert("后台报错："+data1.err)
        }

    },


    error: function (data) {

        alert("ajax调用失败");

    }

});
//获取所有瞬时恢复任务信息
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getMomentRe",
    dataType:"json",
    async: false,
    success: function (data2) {
        if(data2.res==0){
            var data = data2.info;
            var length = data.length;
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var Strategy = data[i].Strategy;
                var vmname = data[i].vmname;
                var NFSIp = data[i].NFSIp;
                var restorip = data[i].restorip;
                var renum_ = data[i].renum;
                var StrategyStatus = data[i].StrategyStatus;
                var backuppath = data[i].backuppath;
                var renum = backuppath + "_" + renum_;
                var vcid = data[i].vcid;
                var vmnewname = data[i].vmnewname;
                var detailid = data[i].detailid;
                switch (StrategyStatus) {
                    case "0":
                        StrategyStatus = "<span class='label label-warning'>未启动</span>";
                        $("#v_tbody_3").append("<tr><td><input type='checkbox' class='checkboxes' name='momentreid' value='" + id + "'></td><td>" + id + "</td><td><a class='Strategy'>" + Strategy + "</a></td><td>" + vmname + "</td><td>" + NFSIp + "</td><td>" + restorip + "</td><td>" + renum + "</td><td>" + StrategyStatus + "</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu' data-vmnewname='" + vmnewname + "' data-vcid='" + vcid + "' data-detailid='" + detailid + "' data-id='" + id + "'><li><a href='javascript:void(0)' class='start2'><i class='fa fa-fw fa-play-circle-o'></i>启&nbsp&nbsp动</a></li></ul></div></td></tr>");
                        break;
                    case "1":
                        StrategyStatus = "<span class='label label-success'>已启动</span>";
                        $("#v_tbody_3").append("<tr><td><input type='checkbox' class='checkboxes' name='momentreid' value='" + id + "'></td><td>" + id + "</td><td><a class='Strategy'>" + Strategy + "</a></td><td>" + vmname + "</td><td>" + NFSIp + "</td><td>" + restorip + "</td><td>" + renum + "</td><td>" + StrategyStatus + "</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu' data-vmnewname='" + vmnewname + "' data-vcid='" + vcid + "' data-detailid='" + detailid + "' data-id='" + id + "'><li><a href='javascript:void(0)' class='stop2'><i class='fa fa-fw fa-stop-circle-o'></i>停&nbsp&nbsp止</a></li><li><a href='javascript:void(0)' class='move' ><i class='fa fa-fw fa-share'></i>迁&nbsp&nbsp移</a></li></ul></div></td></tr>");
                        break;
                }
            }
            //瞬时恢复任务删除
            $("body").on("click", "#bk_plan_delete_3", function () {
                if($("#v_tbody_3").find("input[type='checkbox']:checked").length===0){
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '操作错误！',
                        content: '请选择至少一条数据！（此确认框会在3秒后消失）',
                        autoClose: '确定|3000',
                        buttons: {
                            确定: function () {
                            }
                        }
                    });
                }
                else{

                }

            });
            //瞬时恢复任务启动
            $("body").on("click", ".start2", function () {
                var momentreid = $(this).parent().parent().parent().parent().parent("tr").find("input[type='checkbox']").val();
                var this_ = $(this).parent().parent().parent().parent().parent("tr").children("td");
                var str_ = {
                    momentreid: momentreid
                };
                var str = JSON.stringify(str_);
                $.ajax({
                    cache: true,
                    url: "http://" + localhost + "/momentrerun",
                    type: "post",
                    async: false,
                    dataType:"json",
                    data: {str:str},
                    success: function (data) {
                        $.confirm({
                            confirmButtonClass: 'btn btn-info',
                            cancelButtonClass: 'btn-danger',
                            confirmButton: '确认',
                            cancelButton: '取消',
                            animation: 'zoom',
                            closeAnimation: 'rotateXR',
                            title: '启动成功！',
                            content: '该瞬时恢复任务启动成功！（此确认框会在3秒后消失）',
                            autoClose: '确认|3000',
                            buttons: {
                                确认: function () {
                                    window.location.href="all_task.html?page=3";
                                    /*this_.eq(7).children("span").text("已启动");
                                    this_.eq(7).children("span").attr("class","label label-success");
                                    this_.eq(8).find("ul").html("<li><a href='javascript:void(0)' class='stop2'><i class='fa fa-fw fa-stop-circle-o'></i>停&nbsp&nbsp止</a></li><li><a href='javascript:void(0)' class='move' ><i class='fa fa-fw fa-share'></i>迁&nbsp&nbsp移</a></li>")*/
                                }
                            }
                        });
                    },
                    error: function (data) {
                        alert("ajax调用失败")
                    }
                })
            });
            //瞬时恢复任务停止
            $("body").on("click", ".stop2", function () {
                var momentreid = $(this).parent().parent().parent().parent().parent("tr").find("input[type='checkbox']").val();
                var str_ =  {
                    momentreid: momentreid
                };
                var str = JSON.stringify(str_);
                $.ajax({
                    cache: true,
                    url: "http://" + localhost + "/momentrestop",
                    type: "post",
                    async: false,
                    dataType:"json",
                    data: {str:str},
                    success: function (data) {
                        if(data.res==0){
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '停止成功！',
                                content: '该瞬时恢复任务停止成功！（此确认框会在3秒后消失）',
                                autoClose: '确认|3000',
                                buttons: {
                                    确认: function () {
                                        window.location.href="all_task.html?page=3";
                                       /* this_.eq(7).children("span").text("未启动");
                                        this_.eq(7).children("span").attr("class","label label-warning");
                                        this_.eq(8).find("ul").html("<li><a href='javascript:void(0)' class='start2'><i class='fa fa-fw fa-play-circle-o'></i>启&nbsp&nbsp动</a></li>")*/
                                    }
                                }
                            });
                        }
                        else if (data.res == -1) {
                            alert("后台报错："+data.err)
                        }

                    },
                    error: function (data) {
                        alert("ajax调用失败")
                    }
                })

            });
            //瞬时恢复任务迁移跳转页面并传值
            $("body").on("click", ".move", function () {
                var vcid = $(this).parent().parent("ul").data("vcid");
                var vmnewname = $(this).parent().parent("ul").data("vmnewname");
                var detailid = $(this).parent().parent("ul").data("detailid");
                var id = $(this).parent().parent("ul").data("id");
                var vm_move_data = {
                    vcid:vcid,
                    vmnewname:vmnewname,
                    detailid:detailid,
                    id:id
                };
                $.cookie("vm_move_data",JSON.stringify(vm_move_data));
                window.location.href = "vm_move.html";
            });
            //改变checkbox样式
            if (!jQuery().uniform) {
                return;
            }
            var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
            if (test.size() > 0) {
                test.each(function () {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            }
            //初始化dataTable
            $('#sample_3').dataTable({
                "aoColumnDefs": [
                    {"bSortable": false, "aTargets": [0]}
                ],
                "aaSorting": [[1, 'asc']],
                "aLengthMenu": [
                    [7, 14, -1],
                    [7, 14, "All"] // change per page values here
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
            //选中th中的checkbox后td中的checkbox改变checked状态
            jQuery('#sample_3 .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked && $(this).prop("disabled") == false) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                });
                jQuery.uniform.update(set);
            });


        }
        else if (data2.res == -1) {
            alert("后台报错："+data2.err)
        }
      }
});
//点击策略名称超链接到瞬时恢复任务的日志详情并传递相应参数
$("body").on("click", ".Strategy", function () {
    var id = $(this).parent().parent().children("td").eq(1).text();
    $.cookie("StrategyId",id);
    window.location.href = "task_details_in.html"
});
$("body").on("click",".changecss",function () {
    $("#sample_1").find("th").eq(9).css("width", "9%");
    $("#sample_1").find("th").eq(8).css("width", "6%");
    $("#sample_3").find("th").eq(8).css("width", "9%");
    $("#sample_3").find("th").eq(7).css("width", "6%");
    $("#sample_2").find("th").eq(7).css("width", "6%");
    $("#sample_2").find("th").eq(8).css("width", "9%");
});

//*******************************************************以下是模态框部分****************************************************************
function modal() {
    $(".panel-heading").click(function () {
        if ($(this).next(".panel-body").css("display") == "none") {
            $(".panel-body").slideUp();
            $(this).next(".panel-body").slideDown();
            $(".panel-heading-a").addClass("collapsed");
            $(this).children(".panel-heading-a").removeClass("collapsed")
        }
        else {
            $(this).next(".panel-body").slideUp();
            $(this).children(".panel-heading-a").addClass("collapsed")
        }
    });
//磁盘全量备份标签页
    $("#everyday").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyweek_show").hide();
        $("#everymonth_show").hide();
        $("#everyday_show").fadeIn();
    });
    $("#everyweek").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyday_show").hide();
        $("#everymonth_show").hide();
        $("#everyweek_show").fadeIn();

    });
    $("#everymonth").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyweek_show").hide();
        $("#everyday_show").hide();
        $("#everymonth_show").fadeIn();
    });
//增量备份标签页
    $("#everyday_1").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyweek_show_1").hide();
        $("#everymonth_show_1").hide();
        $("#everyday_show_1").fadeIn();
    });
    $("#everyweek_1").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyday_show_1").hide();
        $("#everymonth_show_1").hide();
        $("#everyweek_show_1").fadeIn();

    });
    $("#everymonth_1").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyweek_show_1").hide();
        $("#everyday_show_1").hide();
        $("#everymonth_show_1").fadeIn();
    });
//全量备份标签页
    $("#everyday_2").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyweek_show_2").hide();
        $("#everymonth_show_2").hide();
        $("#everyday_show_2").fadeIn();
    });
    $("#everyweek_2").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyday_show_2").hide();
        $("#everymonth_show_2").hide();
        $("#everyweek_show_2").fadeIn();

    });
    $("#everymonth_2").click(function () {
        $(this).parent("li").parent("ul").find("li").attr("class", "");
        $(this).parent("li").attr("class", "active");
        $("#everyweek_show_2").hide();
        $("#everyday_show_2").hide();
        $("#everymonth_show_2").fadeIn();
    });
//通过选择的是策略备份还是手动备份在最后的确认配置页面进行不同的展示
    $(".button-next").click(function () {
        //策略备份
        if ($("#backup_way").val() == 0) {
            $("#name1").show();
            $("#name2").hide();
            $("#backup_strategy_1").hide();
            $("#backup_strategy_2").show();
            $("#name3").show();
            $("#name4").hide();
            var a = "";
            $("#backup_1").find(".panel-heading").each(function () {
                if ($(this).find(".celue").text() != "") {
                    var backup_way = $(this).find(".panel-heading-a").text();
                    var celue1 = $(this).find(".celue").text();
                    var celue = celue1.substring(1, 3);
                    var time = $(this).find(".time").val();
                    var date = $(this).find(".date").val();
                    var all = backup_way + ":" + celue + date + "," + time;
                    a = a + all + ";"
                }
            });
            var b = a.substring(0, a.length - 1);
            $("#bktype-f23").val(b);
        }
        //手动备份
        else if ($("#backup_way").val() == 1) {
            $("#backup_strategy_1").show();
            $("#backup_strategy_2").hide();
            $("#name2").show();
            $("#name1").hide();
            $("#name3").hide();
            $("#name4").show();

        }

    });
//点击确定的样式
    $(".day").click(function () {
        var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
        var this_body = $(this).parent().parent().parent(".tab-pane ");
        var time = this_body.find(".timepicker1").val();
        panel_heading.find(".celue").html("(每天策略)");
        panel_heading.find(".time").val(time);
        panel_heading.next(".panel-body").slideUp();
        panel_heading.find(".panel-heading-a").addClass("collapsed");
    });
    $(".week").click(function () {
        var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
        var this_body = $(this).parent().parent().parent(".tab-pane ");
        if (this_body.find("input[type='checkbox']:checked").length == 0) {
            this_body.find(".alert-danger").remove();
            this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每周的策略</div>")
        }
        else {
            var time = this_body.find(".timepicker1").val();
            var date1 = "";
            this_body.find("input[type='checkbox']").each(function () {
                if ($(this).prop("checked") == true) {
                    date1 = date1 + $(this).val() + ","
                }
            });
            var date = date1.substring(0, date1.length - 1);
            this_body.find(".alert-danger").remove();
            panel_heading.find(".celue").html("(每周策略)");
            panel_heading.find(".time").val(time);
            panel_heading.find(".date").val(date);
            panel_heading.next(".panel-body").slideUp();
            panel_heading.find(".panel-heading-a").addClass("collapsed");
        }

    });
    $(".month").click(function () {
        var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
        var this_body = $(this).parent().parent().parent(".tab-pane ");
        if (this_body.find("input[type='checkbox']:checked").length == 0) {
            this_body.find(".alert-danger").remove();
            this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每月的策略</div>")
        }
        else {
            var time = this_body.find(".timepicker1").val();
            var date1 = "";
            this_body.find("input[type='checkbox']").each(function () {
                if ($(this).prop("checked") == true) {
                    date1 = date1 + $(this).val() + ","
                }
            });
            var date = date1.substring(0, date1.length - 1);
            this_body.find(".alert-danger").remove();
            panel_heading.find(".time").val(time);
            panel_heading.find(".celue").html("(每月策略)");
            panel_heading.find(".date").val(date);
            panel_heading.next(".panel-body").slideUp();
            panel_heading.find(".panel-heading-a").addClass("collapsed");
        }
    });
//增量点击确定样式
    $(".z-day").click(function () {
        var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
        var this_body = $(this).parent().parent().parent(".tab-pane ");
        var time = this_body.find(".timepicker1").val();
        if ($(".celue").eq(0).text() == "") {
            $.confirm({
                confirmButtonClass: 'btn btn-info',
                cancelButtonClass: 'btn-danger',
                confirmButton: '确认',
                cancelButton: '取消',
                animation: 'zoom',
                closeAnimation: 'rotateXR',
                title: '操作错误！',
                content: '选择增量备份前必须有全量备份（此确认框会在3秒后消失）',
                autoClose: '确认|3000',
                buttons: {
                    确认: function () {

                    }
                }
            });
        }
        else {
            panel_heading.find(".celue").html("(每天策略)");
            panel_heading.find(".time").val(time);
            panel_heading.next(".panel-body").slideUp();
            panel_heading.find(".panel-heading-a").addClass("collapsed");
        }
    });
    $(".z-week").click(function () {
        var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
        var this_body = $(this).parent().parent().parent(".tab-pane ");
        if (this_body.find("input[type='checkbox']:checked").length == 0) {
            this_body.find(".alert-danger").remove();
            this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每周的策略</div>")
        }
        else {
            if ($(".celue").eq(0).text() == "") {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '操作错误！',
                    content: '选择增量备份前必须有全量备份（此确认框会在3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {

                        }
                    }
                });
            }
            else {

                var time = this_body.find(".timepicker1").val();
                var date1 = "";
                this_body.find("input[type='checkbox']").each(function () {
                    if ($(this).prop("checked") == true) {
                        date1 = date1 + $(this).val() + ","
                    }
                });
                var date = date1.substring(0, date1.length - 1);
                this_body.find(".alert-danger").remove();
                panel_heading.find(".celue").html("(每周策略)");
                panel_heading.find(".time").val(time);
                panel_heading.find(".date").val(date);
                panel_heading.next(".panel-body").slideUp();
                panel_heading.find(".panel-heading-a").addClass("collapsed");
            }
        }
    });
    $(".z-month").click(function () {
        var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
        var this_body = $(this).parent().parent().parent(".tab-pane ");
        if (this_body.find("input[type='checkbox']:checked").length == 0) {
            this_body.find(".alert-danger").remove();
            this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每月的策略</div>")
        }
        else {
            if ($(".celue").eq(0).text() == "") {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '操作错误！',
                    content: '选择增量备份前必须有全量备份（此确认框会在3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {

                        }
                    }
                });
            }
            else {
                var time = this_body.find(".timepicker1").val();
                var date1 = "";
                this_body.find("input[type='checkbox']").each(function () {
                    if ($(this).prop("checked") == true) {
                        date1 = date1 + $(this).val() + ","
                    }
                });
                var date = date1.substring(0, date1.length - 1);
                this_body.find(".alert-danger").remove();
                panel_heading.find(".time").val(time);
                panel_heading.find(".celue").html("(每月策略)");
                panel_heading.find(".date").val(date);
                panel_heading.next(".panel-body").slideUp();
                panel_heading.find(".panel-heading-a").addClass("collapsed");
            }
        }
    });

    $(".b2").click(function () {
        var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
        panel_heading.find(".celue").html("");
        panel_heading.find(".time").val("");
        panel_heading.find(".date").val("");
    });

    $('.timepicker1').timepicker({
        showMeridian: false
    });

    $(function () {
        $("[data-toggle='popover']").popover();
    });
}

modal();