/*用于获取用户信息*/
var Username = $.cookie("username");
//
$(".username").html(Username);

/*attr("href","http://" + localhost + "/logout");*/
$(".logout").click(function () {
    $.ajax({
        url: "http://" + localhost + "/logout",
        type: "post",
        async: false,
        success: function (data) {
            window.location.href = local_out;
        }
    });
});

$(".return_main").click(function () {
    window.location.href = local_url;
});

$('.version_message').click(function () {
    if($("#version_message_modal").length<1){
        $.ajax({
            cache: true,
            type: "post",
            url: "http://" + localhost + "/getAllInfo",
            dataType: "json",
            async: false,
            success: function (data2) {
                if (data2.res == 0) {
                    let data = data2.info;
                    let version = data.version;

                    let version_message_modal = "<!-- 模态框（Modal） -->\n" +
                        "<div class=\"modal fade in hide\" id=\"version_message_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"version_message_modalModalLabel\" aria-hidden=\"true\">\n" +
                        "    <div class=\"modal-dialog\">\n" +
                        "        <div class=\"modal-content\">\n" +
                        "            <div class=\"modal-header\">\n" +
                        "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n" +
                        "                <h4 class=\"modal-title\" id=\"version_message_modalModalLabel\">DSG虚拟化备份</h4>\n" +
                        "            </div>\n" +
                        "            <div class=\"modal-body\"><div class='container-fluid'><br><p><b>系统版本:</b>" + version + "</p><br><p><b>web版本:</b>" + web_version + "</p><br><p class='text-info'>欢迎使用!</p></div></div>\n" +
                        "            <div class=\"modal-footer\">\n" +
                        "                <button type=\"button\" class=\"btn btn-primary\" data-dismiss='modal'>确定</button>\n" +
                        "            </div>\n" +
                        "        </div><!-- /.modal-content -->\n" +
                        "    </div><!-- /.modal-dialog -->\n" +
                        "</div>\n" +
                        "<!-- /.modal -->"

                    $('body').append(version_message_modal);
                }
                else if (data2.res == -1) {
                    alert("后台报错:" + data2.err)
                }

            }
        });
    }
    $('#version_message_modal').modal('show')
});
