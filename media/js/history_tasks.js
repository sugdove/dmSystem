/**
 * Created by suge on 2017/8/14.
 */
//历史恢复任务
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getRePlanHis",
    dataType: "json",
    async: false,
    success: function (data2) {
        if(data2.res==0){
            var data = data2.info;
            var length = data.length;
            var string = "";
            for (var i = 0; i < length; i++) {
                var id = data[i].id;
                var bkid = data[i].bkid;
                var vcid = data[i].vcid;
                var vmid = data[i].vmid;
                var vmname = data[i].vmname;
                var bktype = data[i].bktype;
                var strategy = data[i].strategy;
                var runstate = data[i].runstate;
                var starttime = data[i].starttime;
                var endtime = data[i].endtime;
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
                string += "<tr><td><input type='checkbox' class='checkboxes' value='' name=''></td><td>" + id + "</td><td>" + vmid + "</td><td>" + vmname + "</td><td>" + bktype + "</td><td>" + strategy + "</td><td>" + runstate + "</td><td>" + starttime + "</td><td>" + endtime + "</td></tr>"
            }
            $("#v_tbody").html(string);


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
        }
        else if(data2.res==-1){
            alert("后台报错:"+data2.err)
        }


    },


    error: function (data) {

        alert("ajax调用失败");

    }

});
//获取历史备份任务
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getBkPlanHis",
    dataType: "json",
    async: false,
    success: function (data2) {
        if(data2.res==0){
            var data = data2.info;
            var length = data.length;
            var string = "";
            console.table(data)
            for (var i = 0; i < length; i++) {
                var id = data[i].id;
                var bkid = data[i].bkid;
                var vcid = data[i].vcid;
                var vmid = data[i].vmid;
                var vmname = data[i].vmname;
                var bktype = data[i].bktype;
                var strategy = data[i].strategy;
                var runstate = data[i].runstate;
                var starttime = data[i].starttime;
                var endtime = data[i].endtime;
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
               var runstatestr;
                switch (runstate) {
                    case "0":
                        runstatestr = "<span class='label label-success'>成功</span>";
                        break;
                    case "1":
                        runstatestr = "<span class='label label-info'>运行中</span>";
                        break;
                    case "2":
                        runstatestr = "<span class='label label-warning'>失败</span>";
                        break;
                }
                if(runstate!=="3"){
                    if(runstate==="1"){
                        string += "<tr><td><input type='checkbox' class='checkboxes' value='"+id+"' name='bkid' disabled></td><td>" + id + "</td><td>" + vmid + "</td><td>" + vmname + "</td><td>" + bktype + "</td><td>" + strategy + "</td><td>" + runstatestr + "</td><td>" + starttime + "</td><td>" + endtime + "</td></tr>"
                    }
                    else{
                        string += "<tr><td><input type='checkbox' class='checkboxes' value='"+id+"' name='bkid'></td><td>" + id + "</td><td>" + vmid + "</td><td>" + vmname + "</td><td>" + bktype + "</td><td>" + strategy + "</td><td>" + runstatestr + "</td><td>" + starttime + "</td><td>" + endtime + "</td></tr>"
                    }
                }
            }
            $("#v_tbody_2").html(string);

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
                    {"bSortable": false, "aTargets": [0]}
                ],
                "aaSorting": [[7, 'desc']],
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
        }
        else if(data2.res==-1){
            alert("后台报错："+data2.err)
        }

    }
});
//删除历史备份任务
$("#bk_plan_delete_2").click(function () {
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
                            cache:true,
                            url:"http://" + localhost + "/delPlanHis",
                            type:"post",
                            data:{str:str},
                            dataType:"json",
                            async:false,
                            success:function (data) {
                                if (data.res == 0) {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton: '确认',
                                        cancelButton: '取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '删除成功！',
                                        content: '历史备份任务成功删除！（此确认框会在2秒后消失）',
                                        autoClose: '确定|2000',
                                        buttons: {
                                            确定: function () {
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

                            }
                        });
                    }
                },
                否: function () {
                }
            }
        });
    }
});
//删除历史恢复任务
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
                       /* $.ajax({
                            cache:true,
                            url:"http://" + localhost + "/delPlanHis",
                            type:"post",
                            data:{str:str},
                            dataType:"json",
                            async:false,
                            success:function (data) {
                                if (data.res == 0) {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton: '确认',
                                        cancelButton: '取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '删除成功！',
                                        content: '历史备份任务成功删除！（此确认框会在2秒后消失）',
                                        autoClose: '确定|2000',
                                        buttons: {
                                            确定: function () {
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

                            }
                        });*/
                    }
                },
                否: function () {
                }
            }
        });
    }
});