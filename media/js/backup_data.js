/**
 * Created by suge on 2017/7/3.
 */
//时间格式化方法,time为秒数
function parseTime(time) {
    let timestr = "";
    if(time>=3600&&time/3600<10){
        timestr += "0"+parseInt(time/3600)+":"
    }
    else if(time<3600){
        timestr +="00:"
    }
    else if(time/3600>=10){
        timestr += parseInt(time/3600)+":"
    }
    if(time%3600/60<10&&time%3600>=60){
        timestr += "0"+parseInt(time%3600/60)+":"
    }
    else if(time%3600<60){
        timestr +="00:"
    }
    else if(time%3600/60>=10){
        timestr += parseInt(time%3600/60)+":"
    }
    if(time%3600%60>=0&&time%3600%60<10){
        timestr += "0"+time%3600%60
    }
    else if(time%3600%60>=10){
        timestr += time%3600%60
    }
    return timestr;
}

//初始化datatable
$('#sample_1').dataTable({
    "aoColumnDefs": [
        {"orderable": false, "aTargets": [0, 1, 2, 3]}// 制定列不参与排序
    ],
    "aLengthMenu": [
        [5, 15, 20, -1],
        [5, 15, 20, "All"] // change per page values here
    ],
    // set the initial value
    "iDisplayLength": 5,
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
$("body").on("click", ".tree-toggle", function () {
    $(this).addClass("closed");
    $(this).next("ul").removeClass("in");
});
$("body").on("click", ".closed", function () {
    $(this).removeClass("closed");
    $(this).next("ul").addClass("in");
});
var resArr_ = [];
$("body").on("click", ".vmid", function () {
    $("#sample_1").dataTable().fnDestroy();
    $("#data_tbody").find("tr").remove();
    $(".vmid").removeClass("www");
    $(".vmid").removeClass("eee");
    $(this).addClass("eee");
    $("#sample_1_thead").find("th").eq(0).css("width", "5%");
    $("#sample_1_thead").find("th").eq(4).css("width", "10%");
    $("#sample_1_thead").find("th").eq(5).css("width", "10%");
    $("#sample_1_thead").find("th").eq(6).css("width", "13%");
    var strategy = $(this).parent().parent().parent().children(".two").text();
    var VmName = $(this).text();
    $(".alert-info").hide();
    $("#table_div").show();
    $(".alert-danger").show();
    $("#data_tbody").children("tr").remove();
    var str_ = {"VmName": VmName, "strategy": strategy};
    var str  =JSON.stringify(str_);
    $.ajax({
        cache: true,
        url: "http://" + localhost + "/getVersionByVmName",
        data: {str:str},
        dataType:"json",
        type: "post",
        async: false,
        success: function (data2) {
            if(data2.res==0){
                var data = data2.info;
                var resJson={};
                var resArr = [];
                for(var i=0;i<data.length;i++){
                    var key=data[i]['vmFullNum'];
                    if(!resJson[key]){
                        var cc=[];
                        resArr.push(cc);
                        resJson[key]=cc;
                    }
                    resJson[key].push(data[i]);
                }

                resArr_ = resArr;
                console.log(resArr)
                var length = resArr.length;
                for (var i = 0; i < length; i++) {
                    var starttime = resArr[i][0].starttime;
                    var endtime = resArr[i][0].endtime;
                    var costtime;
                    if(endtime==="0"){
                        costtime = "<span class='label label-warning'>未完成备份</span>"
                    }
                    else {
                        costtime = Date.parse(new Date(endtime))/1000-Date.parse(new Date(starttime))/1000;
                        costtime = parseTime(costtime);
                    }
                    var vmbktype = resArr[i][0].vmbktype;
                    var bkstatus = parseInt(resArr[i][0].bkstatus);
                    var id = parseInt(resArr[i][0].id);
                    var vmFullNum = parseInt(resArr[i][0].vmFullNum);
                    var disksize = parseFloat(((resArr[i][0].backupsize / 1024) / 1024) / 1024).toFixed(1) + "(GB)";
                    var c = i + 1;
                    var string;
                    if(resArr[i].length<=1){
                        string = ""
                    }
                    else{
                        string = "<span class='row-details row-details-close'></span>"
                    }
                    switch (bkstatus) {
                        case 0:
                            bkstatus = "<span class='label label-success'>备份成功</span>";
                            break;
                        case 1:
                            bkstatus = "<span class='label label-info'>备份中</span>";
                            break;
                        case 2:
                            bkstatus = "<span class='label label-warning'>备份失败</span>";
                            break;
                        case 3:
                            bkstatus = "<span class='label label-default'>已经删除</span>";
                            break;
                    }
                    switch (vmbktype) {
                        case "1":
                            $("#data_tbody").append("<tr  class='bk1'><td>"+string+"</td><td data-vmFullNum='"+vmFullNum+"'>" + c + "</td><td>" + starttime + "</td><td><span class='id hide'>" + id + "</span>全量备份点</td><td>" + disksize + "</td><td>"+costtime+"</td><td>" + bkstatus + "</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='delete1'><i class='fa fa-remove'></i>删&nbsp&nbsp除<span class='hide vnnum'>" + vmFullNum + "</span></a></li></ul></div></td></tr>");
                            break;
                        case "2":
                            $("#data_tbody").append("<tr  class='bk2'><td>"+string+"</td><td data-vmFullNum='"+vmFullNum+"'>" + c + "</td><td><span class='hide vnnum_'>" + vmFullNum + "</span>" + starttime + "</td><td><span class='id hide'>" + id + "</span>增量备份点</td><td>" + disksize + "</td><td>"+costtime+"</td><td>" + bkstatus + "</td><td><div class='ccc'></div></td></tr>");
                            break;
                        case "3":
                            $("#data_tbody").append("<tr class='bk3'><td>"+string+"</td><td data-vmFullNum='"+vmFullNum+"'>" + c + "</td><td>" + starttime + "</td><td ><span class='id hide'>" + id + "</span>磁盘全量备份点</td><td>" + disksize + "</td><td>"+costtime+"</td><td>" + bkstatus + "</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='delete1'><i class='fa fa-remove'></i>删&nbsp&nbsp除</a></li></ul></div></td></tr>");
                            break;
                    }

                }
                $('#sample_1').dataTable({
                    "aoColumnDefs": [
                        {"orderable": false, "aTargets": [0, 1, 2, 3, 4 ,5]}// 制定列不参与排序
                    ],
                    "aLengthMenu": [
                        [5, 10],
                        [5, 10] // change per page values here
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

        },
        error: function (data) {
            alert("ajax调用失败");
        }
    });

});
//点击+append区域
$("#data_tbody").on("click", ".row-details-close", function () {
    var name = parseInt($(this).parent("td").parent("tr").find("td").eq(1).text()-1);
    var len = resArr_[name].length;
    var string_ = "";
    for (var i = 1; i < len; i++) {
        var starttime = resArr_[name][i].starttime;
        var endtime = resArr_[name][i].endtime;
        var costtime;
        if(endtime==="0"){
            costtime = "<span class='label label-warning'>未完成备份</span>"
        }
        else {
            costtime = Date.parse(new Date(endtime))/1000-Date.parse(new Date(starttime))/1000;
            costtime = parseTime(costtime);
        }
        var vmbktype = resArr_[name][i].vmbktype;
        var bkstatus = parseInt(resArr_[name][i].bkstatus);
        var id = parseInt(resArr_[name][i].id);
        var vmFullNum = parseInt(resArr_[name][i].vmFullNum);
        var disksize = parseFloat(((resArr_[name][i].backupsize / 1024) / 1024) / 1024).toFixed(1) + "(GB)";
        switch (bkstatus) {
            case 0:
                bkstatus = "<span class='label label-success'>备份成功</span>";
                break;
            case 1:
                bkstatus = "<span class='label label-info'>备份中</span>";
                break;
            case 2:
                bkstatus = "<span class='label label-warning'>备份失败</span>";
                break;
            case 3:
                bkstatus = "<span class='label label-default'>已经删除</span>";
                break;
        }
        switch (vmbktype) {
            case "1":
                string_+="<tr  class='bk1'><td></td><td data-vmFullNum='"+vmFullNum+"'></td><td>" + starttime + "</td><td><span class='id hide'>" + id + "</span>全量备份点</td><td>" + disksize + "</td><td>"+costtime+"</td><td>" + bkstatus + "</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='delete1'><i class='fa fa-remove'></i>删&nbsp&nbsp除<span class='hide vnnum'>" + vmFullNum + "</span></a></li></ul></div></td></tr>";
                break;
            case "2":
                string_+="<tr  class='bk2'><td></td><td data-vmFullNum='"+vmFullNum+"'></td><td><span class='hide vnnum_'>" + vmFullNum + "</span>" + starttime + "</td><td><span class='id hide'>" + id + "</span>增量备份点</td><td>" + disksize + "</td><td>"+costtime+"</td><td>" + bkstatus + "</td><td><div class='ccc'></div></td></tr>";
                break;
            case "3":
                string_+="<tr class='bk3'><td></td><td data-vmFullNum='"+vmFullNum+"'></td><td>" + starttime + "</td><td ><span class='id hide'>" + id + "</span>磁盘全量备份点</td><td>" + disksize + "</td><td>"+costtime+"</td><td>" + bkstatus + "</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='delete1'><i class='fa fa-remove'></i>删&nbsp&nbsp除</a></li></ul></div></td></tr>";
                break;
        }
    }
    $(this).parent("td").parent("tr").after(string_);
    $(this).attr("class", "row-details row-details-open");
});
//点击-remove区域
$("#data_tbody").on("click", ".row-details-open", function () {
    var vmfullnum = $(this).parent("td").parent("tr").find("td").eq(1).data("vmfullnum");
    $(this).attr("class", "row-details row-details-close");
    $(this).parent("td").parent("tr").nextAll("tr").each(function () {
        if ($(this).find("td").eq(1).data("vmfullnum") == vmfullnum) {
            $(this).remove();
        }
    });
});
$("#vmware").click(function () {
            $.ajax({
                cache: true,
                url: "http://" + localhost + "/getVirtCentBaseInfo",
                type: "post",
                dataType: "json",
                async: false,
                success: function (data2) {
                    if(data2.res==0){
                        var data = data2.info;
                        var string = "";
                        for(var temp in data){
                            for (var k in data[temp]) {
                                var length = data[temp][k].length;
                                var vcStorepath ="备份路径:"+ data[temp][k][length-1].vcStorepath;
                                //k为第一层
                                string += "<li><a href='javascript:void(0)' data-role='branch' class='tree-toggle closed overTextHide' data-toggle='branch' data-value='Bootstrap_Tree' title='"+vcStorepath+"'><span class='ip'></span>" + k + "</a><ul class='branch'>";
                                var a = data[temp][k];
                                for (var i = 0; i < length - 1; i++) {
                                    var b = a[i];
                                    for (var n in b) {
                                        //n为第二层
                                        var length2 = b[n].length;
                                        if (length2 >= 1) {
                                            string += "<li><a href='javascript:void(0)' class='tree-toggle closed two overTextHide' data-toggle='branch' data-value='Bootstrap_Tree' title='"+n+"'><span class='flag'></span>" + n + "</a> <ul class='two-level branch'>";

                                            for (var l = 0; l < length2; l++) {
                                                //b[l]为第三层
                                                string += "<li class='p10'><a href='javascript:void(0)' data-role='leaf' class='vmid overTextHide' title='"+b[n][l]+"'><span class='vm'></span>" + b[n][l] + "</a></li>"
                                            }
                                            string += "</li></ul>"
                                        }

                                    }
                                }
                                string += "</li></ul>"
                            }
                        }
                        $("#tree_node").html(string);
                        var $tree = $("#tree_1");
                        $tree.find(".search-target").remove();
                        $tree.prepend("<input type='text' placeholder='search' class='search-target'>");
                        $tree.keyup(function () {
                            var val = $(".search-target").val();
                            if(val===""){
                                val="\0";
                            }
                            $(".vmid").each(function () {
                                var this_ =$(this);
                                var str = this_.text();
                                this_.removeClass("www");
                                if(str.indexOf(val)!==-1){
                                    $(this).addClass("www");
                                    if($(this).parent().parent().parent().children("a").hasClass("closed")){
                                        $(this).parent().parent().parent().children("a").click();
                                    }
                                    else if($(this).parent().parent().parent().parent().parent().children("a").hasClass("closed")){
                                        $(this).parent().parent().parent().parent().parent().children("a").click();

                                    }
                                }
                            });
                            $(".two-level").each(function () {
                                var num = 0;
                                num+=$(this).find(".eee").length;
                                num+=$(this).find(".www").length;
                                if(num===0&&!$(this).parent().children("a").hasClass("closed")){
                                    $(this).parent().children("a").click();
                                }
                            })

                        });
                    }
                else if(data2.res==-1){
                    alert("后台报错："+data2.err)
                    }
                }
            });
});
$("body").on("click", ".delete1", function () {
    var this_ = $(this).parent().parent().parent().parent().parent("tr");
    var id = this_.find(".id").text();
    var vmnum = $(this).find(".vnnum").text();
    var str_ = {"id": id};
    var str  = JSON.stringify(str_);
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
                                url: "http://" + localhost + "/deleteVersion",
                                data: {str:str},
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
                                            title: '删除成功！',
                                            content: '备份点删除成功（此确认框会在3秒后消失）',
                                            autoClose: '确认|3000',
                                            buttons: {
                                                确认: function () {
                                                    var Dtable = $('#sample_1').DataTable();
                                                    var row1 = this_;
                                                    Dtable.row(row1).remove().draw(false);

                                                    $("#sample_1").find(".vnnum_").each(function () {
                                                        if ($(this).text() == vmnum) {
                                                            var row2 = $(this).parent().parent("tr");
                                                            Dtable.row(row2).remove().draw(false);
                                                        }
                                                    });
                                                    var vmfullnum = this_.find("td").eq(1).data("vmfullnum");
                                                    this_.nextAll("tr").each(function () {
                                                        if ($(this).find("td").eq(1).data("vmfullnum") == vmfullnum) {
                                                            $(this).remove();
                                                        }
                                                    })
                                                    if ($("#data_tbody").find("tr").eq(0).children("td").text() == "表中数据为空" && $("#tree_1").find(".eee").parent().parent("ul").children("li").length > 1) {
                                                        $("#tree_1").find(".eee").remove();
                                                    }
                                                    if ($("#data_tbody").find("tr").eq(0).children("td").text() == "表中数据为空" && $("#tree_1").find(".eee").parent().parent("ul").children("li").length == 1) {
                                                        $("#tree_1").find(".eee").parent().parent().parent("li").remove();
                                                    }
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
});