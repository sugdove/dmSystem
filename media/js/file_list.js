/**
 * Created by suge on 2017/5/31.
 */
//获取文件列表
$.ajax({
    cache: true,
    type: "post",
    url: "http://" + localhost + "/getFileList?Path=",
    dataType: "json",
    async: false,
    success: function (data) {
        var length = data.length;
        var i = 0;
        for (i; i < length; i++) {
            if (data[i].Type == "folder") {
                var name = data[i].Name;
                var index = name.lastIndexOf("\/");
                var folder_name = name.substring(index + 1, name.length);
                $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + name + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='" + folder_name + "'>" + folder_name + "</div></div>")
            }
        }
        var t = 0;
        for (t; t < length; t++) {
            if (data[t].Type == "file") {
                var name2 = data[t].Name;
                var index2 = name2.lastIndexOf("\/");
                var file_name = name2.substring(index2 + 1, name2.length);
                $("#file-list-div").append("<form action='http://" + localhost + "/download' method='post' ><div class='contain-file-div file11'><input type='text' name='filePath' value='" + name2 + "' style='display: none'><input type='text' name='fileName' value='" + file_name + "' style='display: none'><div class='contain-text-div'></div> <div class='file-name-div' title='" + file_name + "'>" + file_name + "</div></div></form>")
            }
        }
    }
});
//回到文件初始页面
$("#base_catalog").click(function () {
    $.ajax({
        cache: true,
        type: "post",
        url: "http://" + localhost + "/getFileList?Path=",
        dataType: "json",
        async: false,
        success: function (data) {
            $("#file-list-div").find(".contain-file-div").remove();
            var length = data.length;
            var i = 0;
            for (i; i < length; i++) {
                if (data[i].Type == "folder") {
                    var name = data[i].Name;
                    var index = name.lastIndexOf("\/");
                    var folder_name = name.substring(index + 1, name.length);
                    $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + name + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='" + folder_name + "'>" + folder_name + "</div></div>")
                }
            }
            var t = 0;
            for (t; t < length; t++) {
                if (data[t].Type == "file") {
                    var name2 = data[t].Name;
                    var index2 = name2.lastIndexOf("\/");
                    var file_name = name2.substring(index2 + 1, name2.length);
                    $("#file-list-div").append("<form action='http://" + localhost + "/download' method='post' ><div class='contain-file-div file11'><input type='text' name='filePath' value='" + name2 + "' style='display: none'><input type='text' name='fileName' value='" + file_name + "' style='display: none'><div class='contain-text-div'></div> <div class='file-name-div' title='" + file_name + "'>" + file_name + "</div></div></form>")
                }
            }
        }
    });
});
//页面进行刷新跳转等操作进行磁盘卸载
$(window).unload(function () {
    $.ajax({
        cache: true,
        type: "post",
        url: "http://" + localhost + "/umountDisk",
        async: false,
        success: function (data) {
            console.log("卸载成功");
        }
    });

});
//点击文件夹进入下层文件
$("body").on("click", ".folder11", function () {
    var path = $(this).find("input[type='text']").val();
    var index = path.lastIndexOf("\/");
    var folder_name_2 = path.substring(0, index);
    $.ajax({
        cache: true,
        type: "post",
        url: "http://" + localhost + "/getFileList",
        data: {"Path": path},
        dataType: "json",
        async: false,
        success: function (data) {

            $("#file-list-div").find(".contain-file-div").remove();
            $("#file-list-div").find("form").remove();
            if ((folder_name_2) != "/mnt") {
                $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + folder_name_2 + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='返回上一级'>../</div></div>")
            }
            var length = data.length;
            var i = 0;
            for (i; i < length; i++) {
                if (data[i].Type == "folder") {
                    var name = data[i].Name;
                    var index = name.lastIndexOf("\/");
                    var folder_name = name.substring(index + 1, name.length);
                    $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + name + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='" + folder_name + "'>" + folder_name + "</div></div>")
                }
            }
            var t = 0;
            for (t; t < length; t++) {
                if (data[t].Type == "file") {
                    var name2 = data[t].Name;
                    var index2 = name2.lastIndexOf("\/");
                    var file_name = name2.substring(index2 + 1, name2.length);
                    $("#file-list-div").append("<form action='http://" + localhost + "/download' method='post'><div class='contain-file-div file11'><input type='text' name='filePath' value='" + name2 + "' style='display: none'><input type='text' name='fileName' value='" + file_name + "' style='display: none'><div class='contain-text-div'></div> <div class='file-name-div' title='" + file_name + "'>" + file_name + "</div></div></form>")
                }
            }
        }
    })
});
//点击文件进行恢复操作
$("body").on("click", '.file11', function () {
    var this_ = this;
    var file_name = $(this).find(".file-name-div").text();
    var path = $(this).find("input[type='text']").val();
    $.confirm({
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn-danger',
        confirmButton: '确认',
        cancelButton: '取消',
        animation: 'zoom',
        closeAnimation: 'rotateXR',
        title: '恢复？',
        content: '确认是否恢复（此确认框会在8秒后消失）',
        autoClose: '否|8000',
        buttons: {
            deleteUser: {
                text: '是',
                action: function () {
                    $(this_).parent().submit();
                }
            },
            否: function () {

            },
        }
    });

});
