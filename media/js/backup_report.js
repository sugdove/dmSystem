/**
 * Created by suge on 2017/7/12.
 */
//数据获取后的页面展示和数据处理相关js
$.ajax({
    cache: true,
    url: "http://" + localhost + "/getVmlistAll",
    dataType: "json",
    type: "get",
    async: false,
    success: function (data2) {
        if(data2.res==0){
            //处理json数据
            var data = data2.info;
            var length_ = data.length;
            var t = 0;
            var json = {};
            for (t; t < length_; t++) {
                var obj = data[t];
                var tempArr = json[obj['vmname']];
                if (!tempArr) {
                    tempArr = [];
                    json[obj['vmname']] = tempArr;
                }
                tempArr.push(obj);
            }
            var length = data.length;
            var tbody = "";
            var i = 0;

            for (var k in json) {
                var num = ++i;
                var length2 = json[k].length;
                var vmname = json[k][0].vmname;
                var Strategy = json[k][0].strategy;
                var creatime = json[k][0].creatime;
                var bktype = json[k][0].bktype;
                var RunNum = json[k][0].RunNum;
                var isbackup = json[k][0].isbk;
                var vcid = json[k][0].vcid;
                var vmid = json[k][0].vmid;
                var vcip = json[k][0].vcip;
                var VirCenType = json[k][0].VirCenType;
                var VirCenType_;
                switch (VirCenType){
                    case "0":
                        VirCenType_ = "VMware vSphere";
                        break;
                    case "1":
                        VirCenType_ = "Citrix XenServer";
                        break;
                    case "2":
                        VirCenType_ = "Hyper-V";
                        break;
                }

                var string;
                if (length2 == 1) {
                    string = ""
                }
                else {
                    string = "<span class='row-details row-details-close'></span>"
                }

                if (creatime == null) {
                    creatime = "----"
                }
                switch (bktype) {
                    case null:
                        bktype = "--";
                        break;
                    case "1":
                        bktype = "全量备份";
                        break;
                    case "2":
                        bktype = "增量备份";
                        break;
                    case "3":
                        bktype = "磁盘全量备份";
                        break;
                }
                if (Strategy == null) {
                    Strategy = "--"
                }
                if (RunNum == null) {
                    RunNum = "--"
                }
                switch (isbackup) {
                    case "0":
                        tbody += "<tr><td style='width:3.5%'>" + string + "</td><td>" + num + "</td><td>" + vmname + "</td><td>"+VirCenType_+"</td><td>" + Strategy + "</td><td>" + creatime + "</td><td>" + bktype + "</td><td>" + RunNum + "</td><td><span class='label label-danger'>未备份</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><!--<li><a href='javascript:void(0)'  data-toggle='modal' data-target='#myModal' class='change'><i class='fa fa-plus'></i>添加到备份任务</a></li>--><li><a href='javascript:void(0)'   class='oneway' data-vcid='" + vcid + "' data-vmid='" + vmid + "' data-vmname='" + vmname + "' data-vircentype='"+VirCenType+"' data-vcip='"+vcip+"'><i class='fa fa-share'></i>创建新备份任务</a></li></ul></div></td></tr>";
                        break;
                    case "1":
                        tbody += "<tr><td style='width:3.5%'>" + string + "</td><td>" + num + "</td><td>" + vmname + "</td><td>"+VirCenType_+"</td><td>" + Strategy + "</td><td>" + creatime + "</td><td>" + bktype + "</td><td>" + RunNum + "</td><td><span class='label label-success'>备份计划中</span></td><td><div class='ccc'></div></td></tr>";
                        break;

                }

            }
            $("#v_tbody").html(tbody);
            //点击+append区域
            $("#v_tbody").on("click", ".row-details-close", function () {

                /*         var datatable = $("#sample_1");
                         alert(datatable.rows.length)*/
                var name = $(this).parent("td").parent("tr").find("td").eq(2).text();
                var len = json[name].length;
                var string_ = "";
                for (var i = 1; i < len; i++) {
                    var vmname = json[name][i].vmname;
                    var Strategy = json[name][i].strategy;
                    var creatime = json[name][i].creatime;
                    var bktype = json[name][i].bktype;
                    var RunNum = json[name][i].RunNum;
                    var isbackup = json[name][i].isbk;
                    var VirCenType = json[name][i].VirCenType;
                    var VirCenType_;
                    switch (VirCenType){
                        case "0":
                            VirCenType_ = "VMware vSphere";
                            break;
                        case "1":
                            VirCenType_ = "Citrix XenServer";
                            break;
                        case "2":
                            VirCenType_ = "Hyper-V";
                            break;
                    }
                    if (creatime == null) {
                        creatime = "----"
                    }
                    switch (bktype) {
                        case null:
                            bktype = "--";
                            break;
                        case "1":
                            bktype = "全量备份";
                            break;
                        case "2":
                            bktype = "增量备份";
                            break;
                        case "3":
                            bktype = "磁盘全量备份";
                            break;
                    }
                    if (Strategy == null) {
                        Strategy = "--"
                    }
                    if (RunNum == null) {
                        RunNum = "--"
                    }
                    switch (isbackup) {
                        case "0":
                            string_ += "<tr class='green'><td></td><td></td><td>" + vmname + "</td><td>"+VirCenType_+"</td><td>" + Strategy + "</td><td>" + creatime + "</td><td>" + bktype + "</td><td>" + RunNum + "</td><td><span class='label label-danger'>未备份</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><!--<li><a href='javascript:void(0)'  data-toggle='modal' data-target='#myModal' class='change'><i class='fa fa-plus'></i>添加到备份任务</a></li>--><li><a href='javascript:void(0)'   class='oneway'><i class='fa fa-share'></i>创建新备份任务</a></li></ul></div></td></tr>";
                            break;
                        case "1":
                            string_ += "<tr class='green'><td></td><td></td><td>" + vmname + "</td><td>"+VirCenType_+"</td><td>" + Strategy + "</td><td>" + creatime + "</td><td>" + bktype + "</td><td>" + RunNum + "</td><td><span class='label label-success'>备份计划中</span></td><td><div class='ccc'></div></td></tr>";
                            break;
                    }
                }
                $(this).parent("td").parent("tr").after(string_);
                $(this).attr("class", "row-details row-details-open");
            });
            //点击-remove区域
            $("#v_tbody").on("click", ".row-details-open", function () {
                var name = $(this).parent("td").parent("tr").find("td").eq(2).text();
                $(this).attr("class", "row-details row-details-close");
                var length = json[name].length;
                $(this).parent("td").parent("tr").nextAll("tr").each(function () {
                    if ($(this).find("td").eq(2).text() == name) {
                        $(this).remove();
                    }
                });
            });
            //初始化dataTable
            $('#sample_1').dataTable({
                "aLengthMenu": [
                    [5, 10],
                    [5, 10] // change per page values here
                ],
                "aoColumnDefs": [
                    {"orderable": false, "aTargets": [0]}// 制定列不参与排序
                ],
                // set the initial value
                "iDisplayLength": 10,
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
        }
        else if(data2.res==-1){
            alert("后台报错："+data2.err)
        }
    }
});
//翻页时改变将-变为+ （有bug未解决）
$(document).ready(function () {
    $("#sample_1_paginate").find("li").click(function () {
        $("#v_tbody").find(".row-details-open").attr("class", "row-details row-details-close")
    });
});
//点击创建新备份任务跳转到跳转备份页面backup_href并传值
$("body").on("click", ".oneway", function () {
    var vcid = $(this).data("vcid");
    var vmid = $(this).data("vmid");
    var vmname = $(this).data("vmname");
    var vircentype = $(this).data("vircentype");
    var vcip = $(this).data("vcip");
    var backup_data = {
        vcid:vcid,
        vmid:vmid,
        vmname:vmname,
        vircentype:vircentype,
        vcip:vcip
    };
    $.cookie("backup_data",JSON.stringify(backup_data));
    window.location.href = "backup_href.html";
});