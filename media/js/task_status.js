/**
 * Created by suge on 2017/6/30.
 */
//获取标签页初始位置;
if (document.URL.indexOf("page") != -1) {
    var page;
    var page_ = document.URL.split("?")[1];
    page = page_.split("=")[1];
//标签页跳转
    switch (page) {
        case "2":
            $("#stop").click();
            break;
    }
}

//将1-7字符串变为相应正确时间方法
function changeDate(date) {
    var arr = date.split(",");
    var string_ = "";
    if (arr[arr.length - 1] == 1) {
        arr[arr.length - 1] = 8;
    }
    for (var i = 0; i < arr.length; i++) {
        string_ = string_ + (arr[i] - 1) + ","
    }
    var string = string_.substring(0, string_.length - 1);
    return string
}

//获取状态为停止的任务
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getAutoBkPlaneByStatusStop",
    dataType: "json",
    async: true,
    success: function (data2) {
        if (data2.res == 0) {
            var data = data2.info;
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
                var StrategyStatus = data1.strategystatus;
                var vmname = data1.vmname;
                var vcip = data1.vcip;
                var vcStorepath = data1.vcStorepath;
                var isorder = data1.isorder;
                switch (isorder) {
                    case "0":
                        isorder = "<span class='label label-warning'>不按顺序</span>";
                        break;
                    case "1":
                        isorder = "<span class='label label-success'>顺序备份</span>";
                        break;
                }
                if (VirtCentType == 0 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-warning'>未启动</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 0 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-success'>已启动</span></td><td><button type='button' class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</button></td></tr>"
                }
                if (VirtCentType == 0 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='laber laber-danger'>已停止</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-warning'>未启动</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-success'>已启动</span></td><td><button type='button' class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</button></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-danger'>已停止</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-warning'>未启动</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-success'>已启动</span></td><td><button type='button' class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</button></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-danger'>已停止</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                var details = "<tr class='details details_tr'><td class='details' colspan='9'><table><tbody><tr><td>虚拟机名称:</td><td>" + vmname + "</td></tr>";
                for (var c = 0; c < length; c++) {
                    var data = json[k][c];
                    var bktype = data.bktype;
                    var exetype = data.exetype;
                    var exedate = data.exedate;
                    var exetime = data.exetime;
                    var bkid = parseInt(data.bkid);

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
                $("#v_tbody").append(table)
            }

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

            $('#sample_1').dataTable({
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

            jQuery('#sample_1 .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked & $(this).prop("disabled") == false) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                });
                jQuery.uniform.update(set);
            });

            $("#v_tbody").on("click", ".row-details-close", function () {
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
            $("#v_tbody").on("click", ".row-details-open", function () {
                $(this).attr("class", "row-details row-details-close");
                $(this).parent("td").parent("tr").next(".details_tr").remove();
            });
            $("#v_tbody").on("mouseover", ".details_tr", function () {
                $(this).find(".cstart").show();
            });
            $("#v_tbody").on("mouseout", ".details_tr", function () {
                $(this).find(".cstart").hide();
            });
        }
        else if (data2.res == -1) {
            alert("后台报错：" + data2.err)
        }

    },


    error: function (data) {

        alert("ajax调用失败");

    }

});
//获取状态为已启动的任务
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getAutoBkPlaneByStatusRun",
    dataType: "json",
    async: false,
    success: function (data2) {
        if (data2.res == 0) {
            var data = data2.info;
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
                var StrategyStatus = data1.strategystatus;
                var vmname = data1.vmname;
                var vcip = data1.vcip;
                var vcStorepath = data1.vcStorepath;
                var isorder = data1.isorder;
                switch (isorder) {
                    case "0":
                        isorder = "<span class='label label-warning'>不按顺序</span>";
                        break;
                    case "1":
                        isorder = "<span class='label label-success'>顺序备份</span>";
                        break;
                }
                if (VirtCentType == 0 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-warning'>未启动</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动<</button></td></tr>"
                }
                if (VirtCentType == 0 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-success'>已启动</span></td><td><button type='button' class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</button></td></tr>"
                }
                if (VirtCentType == 0 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='laber laber-danger'>已停止</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-warning'>未启动</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-success'>已启动</span></td><td><button type='button' class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</button></td></tr>"
                }
                if (VirtCentType == 1 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-danger'>已停止</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 0) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-warning'>未启动</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 1) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-success'>已启动</span></td><td><button type='button' class='btn btn red stop1'><i class='fa fa-stop-circle-o'></i>停止</button></td></tr>"
                }
                if (VirtCentType == 2 && StrategyStatus == 2) {
                    var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Hyper-V</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td>" + isorder + "</td><td><span class='label label-danger'>已停止</span></td><td><button type='button' class='btn btn yellow pad start1'><i class='fa fa-play-circle-o'></i>启动</button></td></tr>"
                }
                var details = "<tr class='details details_tr'><td class='details' colspan='9'><table><tbody><tr><td>虚拟机名称:</td><td>" + vmname + "</td></tr>";
                for (var c = 0; c < length; c++) {
                    var data = json[k][c];
                    var bktype = data.bktype;
                    var exetype = data.exetype;
                    var exedate = data.exedate;
                    var exetime = data.exetime;
                    var bkid = parseInt(data.bkid);

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

            jQuery('#sample_2 .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked & $(this).prop("disabled") == false) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                });
                jQuery.uniform.update(set);
            });
            console.log(details_tr)

            $("#v_tbody_2").on("click", ".row-details-close", function () {
                var name = $(this).parent("td").parent("tr").find("td").eq(2).text();
                for (var i = 0; i < details_tr.length; i++) {
                    for (var k in details_tr[i]) {
                        if (k == name) {
                            var obj = details_tr[i][name];
                            console.log(obj);
                            $(this).parent("td").parent("tr").after(details_tr[i][name])
                        }
                    }
                }
                $(this).attr("class", "row-details row-details-open");
            });
            $("#v_tbody_2").on("click", ".row-details-open", function () {
                $(this).attr("class", "row-details row-details-close");
                $(this).parent("td").parent("tr").next(".details_tr").remove();
            });
            $("#v_tbody_2").on("mouseover", ".details_tr", function () {
                $(this).find(".cstart").show();
            });
            $("#v_tbody_2").on("mouseout", ".details_tr", function () {
                $(this).find(".cstart").hide();
            });
        }
        else if (data2.res == -1) {
            alert("后台报错：" + data2.err)
        }
    }
});
$(".hide1").click(function () {
    $("#span1").show();
    $("#span2").hide();
});
$(".hide2").click(function () {
    $("#span2").show();
    $("#span1").hide();
});
$("#stop").click(function () {
    $("#sample_1").find("th").eq(8).css("width", "9%");
    $("#sample_1").find("th").eq(7).css("width", "5%");
    $("#sample_1").find("th").eq(1).css("width", "1%");
});
$("#stop_").click(function () {
    $("#sample_2").find("th").eq(8).css("width", "9%");
    $("#sample_2").find("th").eq(7).css("width", "5%");
    $("#sample_2").find("th").eq(1).css("width", "1%");
});
//操作主入口
//删除未启动
$("body").on("click", "#bk_plan_delete", function () {
    if($("#v_tbody").find("input[type='checkbox']:checked").length<1){
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
        var string = "";
        $("#v_tbody").find("input[type='checkbox']:checked").each(function () {
            string += ($(this).val()) + ","
        });
        string = string.substring(0, string.length - 1);
        var str_ = {strategy: string};
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
                            dataType: "json",
                            data: {str: str},
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
                                                    $("#sample_1").DataTable().row($(this)).remove().draw(false);
                                                });
                                            }
                                        }
                                    });
                                }
                                else if (data.res == -1) {
                                    alert("后台报错" + data.err)
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
    var str_ = {strategy: Strateg};
    var str = JSON.stringify(str_);
    $.ajax({
        cache: true,
        url: "http://" + localhost + "/StartStrateg",
        type: "post",
        async: false,
        dataType: "json",
        data: {str: str},
        success: function (data) {
            if (data.res == 0) {
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
                            window.location.href = "task_status.html?page=2"
                        }
                    }
                });
            }
            else if (data.res == -1) {
                alert("后台报错：" + data.err)
            }

        },
        error: function (data) {
            alert("ajax调用失败")
        }
    })
});
//停止
$("body").on("click", ".stop1", function () {
    var Strateg = $(this).parent().parent("tr").find("input[type='checkbox']").val();
    var str_ = {strategy: Strateg};
    var str = JSON.stringify(str_);
    $.ajax({
        cache: true,
        url: "http://" + localhost + "/StopStrateg",
        type: "post",
        async: false,
        dataType: "json",
        data: {str: str},
        success: function (data) {
            if (data.res == 0) {
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
                            window.location.href = "task_status.html";
                        }
                    }
                });
            }
            else if (data.res == -1) {
                alert("后台报错：" + data.err)
            }

        },
        error: function (data) {
            alert("ajax调用失败")
        }
    })
});
//策略启动
$("body").on("click", ".cstart", function () {
    var id = $(this).parent().parent("tr").find(".bkid_1").text();
    var str_ = {id: id};
    var str = JSON.stringify(str_);
    $.ajax({
        cache: true,
        url: "http://" + localhost + "/execuPlane",
        type: "post",
        async: false,
        dataType: "json",
        data: {str: str},
        success: function (data) {
            if (data.res == 0) {
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
                            window.location.reload();
                        }
                    }
                });
            }
            else if (data.res == -1) {
                alert("后台报错：" + data.err)
            }
        },
        error: function (data) {
            alert("ajax调用失败")
        }
    })
});
//点击修改
$("body").on("click", ".cchange", function () {
    $("#myModal").modal("show");
});

//模态框相关js
function modal() {
    //修改策略(模态框)
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

                    },
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

                        },
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
//点击取消时的样式
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
