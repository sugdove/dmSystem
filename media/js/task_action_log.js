/**
 * Created by suge on 2017/7/3.
 */
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
    "aaSorting": [[0, "asc"]]//默认第几个排序
});
$("body").on("click", ".tree-toggle", function () {
    $(this).addClass("closed");
    $(this).next("ul").removeClass("in");
});
$("body").on("click", ".closed", function () {
    $(this).removeClass("closed");
    $(this).next("ul").addClass("in");
});
//点击vmid获取右边table
var resArr_ = [];
$("body").on("click", ".vmid", function () {
    $("#sample_1").dataTable().fnDestroy();
    $(".vmid").removeClass("eee");
    $(this).addClass("eee");
    $("#sample_1_thead").find("th").eq(0).css("width", "5%");
    $("#sample_1_thead").find("th").eq(4).css("width", "10%");
    $("#sample_1_thead").find("th").eq(5).css("width", "11%");
    var strategy = $(this).parent().parent().parent().children(".two").text();
    var VmName = $(this).text();
    $(".alert-info").hide();
    $("#table_div").show();
    $(".alert-danger").show();
    $("#data_tbody").children("tr").remove();
    var str_ = {"VmName": VmName, "strategy": strategy};
    var str = JSON.stringify(str_);
    $.ajax({
        cache: true,
        url: "http://" + localhost + "/getLogVersionByVmName",
        data: {str: str},
        dataType: "json",
        type: "post",
        async: false,
        success: function (data2) {
            if (data2.res == 0) {
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
             /*   for(var key in resArr){
                    for(var key2 in resArr[key]){}
                    if(resArr[key][key2]["vmbktype"]!=="1"&&"2"&&"3"){
                        var arr = [];
                        arr.push(resArr[key][key2]);
                        resArr.push(arr);
                        resArr[key].splice(key2,1);

                    }
                }*/
                resArr_ = resArr;
                console.log(resArr);
                var length = resArr.length;
                for (var i = 0; i < length; i++) {
                    var starttime = resArr[i][0].starttime;
                    var vmbktype = resArr[i][0].vmbktype;
                    var bkstatus = parseInt(resArr[i][0].bkstatus);
                    var id = parseInt(resArr[i][0].id);
                    var vmFullNum = parseInt(resArr[i][0].vmFullNum);
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
                            $("#data_tbody").append("<tr  class='bk1'><td>"+string+"</td><td data-vmFullNum='"+vmFullNum+"'>" + c + "</td><td>" + starttime + "</td><td><span class='id hide'>" + id + "</span>全量备份点</td><td>" + bkstatus + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>");
                            break;
                        case "2":
                            $("#data_tbody").append("<tr  class='bk2'><td>"+string+"</td><td data-vmFullNum='"+vmFullNum+"'>" + c + "</td><td><span class='hide vnnum_'>" + vmFullNum + "</span>" + starttime + "</td><td><span class='id hide'>" + id + "</span>增量备份点</td><td>" + bkstatus + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>");
                            break;
                        case "3":
                            $("#data_tbody").append("<tr  class='bk3'><td>"+string+"</td><td data-vmFullNum='"+vmFullNum+"'>" + c + "</td><td>" + starttime + "</td><td ><span class='id hide'>" + id + "</span>磁盘全量备份点</td><td>" + bkstatus + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>");
                            break;
                        case "7":
                            $("#data_tbody").append("<tr  class='bk3'><td>"+string+"</td><td data-vmFullNum='"+vmFullNum+"'>" + c + "</td><td>" + starttime + "</td><td ><span class='id hide'>" + id + "</span>虚拟机恢复</td><td>" + bkstatus.replace(/备份/g, "恢复") + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>");
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
            else if (data2.res == -1) {
                alert("后台报错：" + data2.err)
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
        var vmbktype = resArr_[name][i].vmbktype;
        var bkstatus = parseInt(resArr_[name][i].bkstatus);
        var id = parseInt(resArr_[name][i].id);
        var vmFullNum = parseInt(resArr_[name][i].vmFullNum);
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
                string_+="<tr  class='bk1'><td></td><td data-vmFullNum='"+vmFullNum+"'></td><td>" + starttime + "</td><td><span class='id hide'>" + id + "</span>全量备份点</td><td>" + bkstatus + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>";
                break;
            case "2":
                string_+="<tr  class='bk2'><td></td><td data-vmFullNum='"+vmFullNum+"'></td><td><span class='hide vnnum_'>" + vmFullNum + "</span>" + starttime + "</td><td><span class='id hide'>" + id + "</span>增量备份点</td><td>" + bkstatus + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>";
                break;
            case "3":
                string_+="<tr  class='bk3'><td></td><td data-vmFullNum='"+vmFullNum+"'></td><td>" + starttime + "</td><td ><span class='id hide'>" + id + "</span>磁盘全量备份点</td><td>" + bkstatus + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>";
                break;
            case "7":
                string_+="<tr  class='bk3'><td></td><td data-vmFullNum='"+vmFullNum+"'></td><td>" + starttime + "</td><td ><span class='id hide'>" + id + "</span>虚拟机恢复</td><td>" + bkstatus.replace(/备份/g, "恢复") + "</td><td><a href='javascript:void(0)' class='a_'>查看详情</a></td></tr>";
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
//点击最下层vmWare获取相关信息
$("body").on("click", "#vmware", function () {
    $.ajax({
        cache: true,
        url: "http://" + localhost + "/getLogWebBaseInfo",
        type: "post",
        dataType: "json",
        async: false,
        success: function (data2) {
            if (data2.res == 0) {
                var data = data2.info;
                var string = "";
                for(var temp in data){
                    for (var k in data[temp]) {
                        var length = data[temp][k].length;
                        var vcStorepath ="备份路径:"+ data[temp][k][length-1].vcStorepath;
                        //k为第一层
                        string += "<li><a href='javascript:void(0)' data-role='branch' class='tree-toggle closed' data-toggle='branch' data-value='Bootstrap_Tree' title='"+vcStorepath+"'><span class='ip'></span>" + k + "</a><ul class='branch'>";
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
            else if (data2.res == -1) {
                alert("后台报错：" + data2.err)
            }
        }
    });
});
//点击查看详情跳转
$("body").on("click", ".a_", function () {
    var id = $(this).parent("td").parent("tr").find(".id").text();
    var status = $(this).parent("td").parent("tr").children("td").eq(4).text();
    switch (status) {
        case "备份成功"||"恢复成功":
            status = 0;
            break;
        case "备份中"||"恢复中":
            status = 1;
            break;
        case "备份失败"||"恢复失败":
            status = 2;
            break;
        case "已经删除":
            status = 3;
            break;
    }
    //将多个值存放在对象中
    var logData = {
        id:id,
        status:status
    };
//将这个对象保存在cookie,它的键是对象名称，值为JSON.stirng()，目的是将这个对象解析为字符串，因为cookie的键与值都是字符串
    $.cookie("logData",JSON.stringify(logData));
    window.location.href = "task_details.html";
});