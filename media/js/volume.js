//接收session获取到集群名字
let clusterName = JSON.parse(sessionStorage.getItem('session')).clusterName;

$('.clusterNameSet').text(clusterName);

//获取该集群下的所有服务器
function getAllServers() {
    let arr = [];
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/cluster/servers",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'clustername': clusterName},
        async: false,
        success: function (data) {
            for (let key in data) {
                arr.push(data[key])
            }
        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
    return arr.join();
}

//获取该集群下的所有卷
function getAllVolumes() {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/getmsg",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'clusterName': clusterName},
        async: false,
        success: function (data) {
            if (data) {
            }
            else {
                data = [];
            }

            let str = "";
            for (let key in data) {
                let volumeName = data[key]['name'];
                let sstr = "";
                if (key === "0") {
                    sstr = "border-top:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:70px;"
                }
                else {
                    sstr = "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:70px;"
                }
                let statusStr = '';
                if (data[key]['status'] === "OFFLINE") {
                    str += "<tr class=\"trDatabase\">\n" +
                        "<td style=" + sstr + "  title=\"" + volumeName + "\"><i class=\"fa fa-database tdDatabase\"></i>" + volumeName + "</td>\n" +
                        "<td style=" + sstr + ">\n" + "<span class='label label-success startVolume'>启动</span>" +
                        "<span class=\"label label-default myLabel disabled\" title='启动后才能挂载'>挂载</span><span class=\"label label-danger myLabel removeVolume\">删除</span>\n" +
                        "</td>\n" +
                        "</tr>";
                }
                else {
                    str += "<tr class=\"trDatabase\">\n" +
                        "<td style=" + sstr + " title=\"" + volumeName + "\"><i class=\"fa fa-database tdDatabase\"></i>" + volumeName + "</td>\n" +
                        "<td style=" + sstr + ">\n" + "<span class='label label-warning stopVolume'>停止</span>" +
                        "<span class=\"label label-info myLabel mount\">挂载</span><span class=\"label label-default myLabel disabled\" title='先停止才能进行删除'>删除</span>\n" +
                        "</td>\n" +
                        "</tr>";
                }

            }
            $('#sample_1_tbody').html(str);
            let $alert = $('#noDatabase');
            data.length !== 0 ? $alert.hide() : $alert.show()
        },
        error: function (data) {
            if (JSON.parse(data.responseText).message === "Could not open JPA EntityManager for transaction; nested exception is javax.persistence.PersistenceException: org.hibernate.exception.JDBCConnectionException: Unable to acquire JDBC Connection") {
                alert('数据库连接失败')
            }
            else {
                alert('出现了非数据库连接错误' + JSON.parse(data.responseText).message)
            }
        }
    });
}

getAllVolumes();

function checkbox($dom) {
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
    //选中th中的checkbox后td中的checkbox改变checked状态
    jQuery($dom).change(function () {
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

//点击添加卷清空
$('#addServerModalbtn').click(function () {
    $("input[name='volumeName']").val('')
});

//获取所有块信息
function getAllBricks(servername) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/server/gedetail",
        data: {'servername': servername, 'details': true},
        async: false,
        success: function (data) {
            let str = "";
            for (let key in data) {
                let servername = data[key]['name'];
                for (let key2 in data[key]['disks']) {
                    let mountPoint1 = data[key]['disks'][key2]['mountPoint'];
                    let space1 = ((data[key]['disks'][key2]['space']) / 1024).toFixed(1) +'(GB)';
                    let spaceInUse1 = (((data[key]['disks'][key2]['space']) - (data[key]['disks'][key2]['spaceInUse'])) / 1024).toFixed(1)+'(GB)';
                    let name1 = data[key]['disks'][key2]['name'];
                    let fsType1 = data[key]['disks'][key2]['fsType'];
                    if (fsType1 !== "swap") {
                        if (mountPoint1 && mountPoint1 !== "/" && mountPoint1 !== "/boot") {
                            str += "<tr><td><input type='checkbox' class='checkboxes' value=''></td><td>" + servername + "</td><td>" + name1 + "</td><td>" + mountPoint1 + "</td><td>" + spaceInUse1 + "</td><td>" + space1 + "</td></tr>"
                        }
                        /*   else{
                                   str += "<tr><td><input type='checkbox' class='checkboxes' value='' disabled></td><td>" + servername + "</td><td>" + name + "</td><td>" + mountPoint + "</td><td>" + spaceInUse + "</td><td>" + space + "</td></tr>"
                               }*/
                    }
                    for (let key3 in data[key]['disks'][key2]['partitions']) {
                        let mountPoint = data[key]['disks'][key2]['partitions'][key3]['mountPoint'];
                        let space = ((data[key]['disks'][key2]['partitions'][key3]['space']) / 1024).toFixed(1)+ "(GB)";
                        let spaceInUse = (((data[key]['disks'][key2]['partitions'][key3]['space']) - (data[key]['disks'][key2]['partitions'][key3]['spaceInUse'])) / 1024).toFixed(1)+ "(GB)";
                        let name = data[key]['disks'][key2]['partitions'][key3]['name'];
                        let fsType = data[key]['disks'][key2]['partitions'][key3]['fsType'];
                        if (fsType !== "swap") {
                            if (mountPoint && mountPoint !== "/" && mountPoint !== "/boot") {
                                str += "<tr><td><input type='checkbox' class='checkboxes' value=''></td><td>" + servername + "</td><td>" + name + "</td><td>" + mountPoint + "</td><td>" + spaceInUse + "</td><td>" + space + "</td></tr>"
                            }
                            /*   else{
                                       str += "<tr><td><input type='checkbox' class='checkboxes' value='' disabled></td><td>" + servername + "</td><td>" + name + "</td><td>" + mountPoint + "</td><td>" + spaceInUse + "</td><td>" + space + "</td></tr>"
                                   }*/
                        }
                    }
                }
            }
            if(str){
                $('#sample_2_tbody').html(str);
                checkbox($('#sample_2 .group-checkable'));
                $('#sample_6_tbody').html(str);
                $('.alertBrick').hide();
                $('.brickMessage').show();
            }
            else{
                $('.alertBrick').show();
                $('.brickMessage').hide();
            }

        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

//点击选择块弹出模态框
$('#chooseBrick').click(function () {
    if ($('#sample_2_tbody').children('tr').length === 0) {
        getAllBricks(getAllServers());
    }
    $('#brickModal').modal('show');
    return false
});

//点击添加块弹出模态框
$('#addBricks').click(function () {
   /* if ($('#sample_6_tbody').children('tr').length === 0) {

    }*/
    getAllBricks(getAllServers());
    $('#sample_6_tbody').find('.checkboxes').attr('disabled',false);
    //遍历排除已经存在的块
    $('#sample_3_tbody').children('tr').each(function () {
        let servername = $(this).children('td').eq(2).text();
        let path = $(this).children('td').eq(3).text().substring(0, $(this).children('td').eq(3).text().lastIndexOf('/'));
        let str = servername + ',' + path;
        $('#sample_6_tbody').children('tr').each(function () {
            let str2 = $(this).children('td').eq(1).text() + ',' + $(this).children('td').eq(3).text();
            if (str === str2) {
                console.log(1111);
                $(this).children('td').eq(0).find("input[type='checkbox']").attr('disabled', true)
            }

        })
    });
    checkbox($('#sample_6 .group-checkable'));
    $('#addBrickModal').modal('show');
    return false
});

//确定添加块
$('#addBrickModalSubmit').click(function () {
    let volumeName = $('.eee').children('td').eq(0).text();
    let arr = [];
    $('#sample_6_tbody').find("input[type='checkbox']:checked").each(function () {
        let $tr = $(this).parent().parent().parent().parent('tr');
        let servername = $tr.children('td').eq(1).text();
        let partitionName = $tr.children('td').eq(2).text();
        let dir = $tr.children('td').eq(3).text();
        arr.push(servername + ":" + dir + "/" + volumeName)
    });
    let length = arr.length;
    let volumeType = $('#tdVolumeType').text();
    let bricks = arr.join();
    if((volumeType === '复制卷'||volumeType==='分布式复制卷')&& length%Number($('#tdReplicaCount').text())!==0){
        $.confirm({
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn-danger',
            confirmButton: '确认',
            cancelButton: '取消',
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '错误！',
            content: '块的数量必须是'+$('#tdReplicaCount').text()+'的倍数（3秒后消失）',
            autoClose: '确认|3000',
            buttons: {
                确认: function () {

                },
            }
        });
    }
    else if((volumeType === '分片卷'||volumeType==='分布式分片卷')&& length%Number($('#tdStripeCount').text())!==0){
        $.confirm({
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn-danger',
            confirmButton: '确认',
            cancelButton: '取消',
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '错误！',
            content: '块的数量必须是'+$('#tdStripeCount').text()+'的倍数（3秒后消失）',
            autoClose: '确认|3000',
            buttons: {
                确认: function () {

                },
            }
        });
    }
    else{
        addBricks(clusterName, volumeName, bricks)
    }
});

//定义一个全局变量用于获取选择好的块
let choosedBricks;
let arr2;
//选择块点击确定，确定对应块
$('#brickModalSubmit').click(function () {
    let arr = [];
    arr2 = [];
    $('#sample_2_tbody').find("input[type='checkbox']:checked").each(function () {
        let $tr = $(this).parent().parent().parent().parent('tr');
        let servername = $tr.children('td').eq(1).text();
        let partitionName = $tr.children('td').eq(2).text();
        let dir = $tr.children('td').eq(3).text();
        arr.push(servername + ":" + dir + '/');
        arr2.push(servername)
    });
    let length = $('#sample_2_tbody').find("input[type='checkbox']:checked").length;
    let volumeType = $("select[name='volumeType']").val();
    //判断是否有重复的服务器
    if((Array.from(new Set(arr2))).length !== arr2.length&&$("input[name='force']").prop('checked')===false&&volumeType!=='DISTRIBUTE'){
    $('.forceAlert').show();
    }
    else{
        $('.forceAlert').hide();
    }
    if (length > 0) {
        if(volumeType==="DISTRIBUTE"&&length===1){
            $('#numOfChooseBrick').html("（已选择<font class='rightChoose'>" + length + "</font>块）");
        }
        else if(volumeType!=="DISTRIBUTE"&&length===1){
            $('#numOfChooseBrick').html("（已选择<font class='wrongChoose'>" + length + "</font>块）<font color='red'>请至少选择两块!</font>");
        }
        else{
            $('#numOfChooseBrick').html("（已选择<font class='rightChoose'>" + length + "</font>块）");
        }
    }
    else {
        $('#numOfChooseBrick').html("（<font style='color: red;'>未选择</font>）");
    }

    $('#brickModal').modal('hide');
    $('.numMessage').each(function () {
        let this_ = $(this);
       if(this_.parent().parent().css('display')==='block'){
           this_.change();
           return false;
       }
    });

    choosedBricks = arr;
});

//强制执行选择框改变提醒消失
$("input[name='force']").change(function () {
    let $forceAlert = $('.forceAlert');
    //判断是否有重复的服务器
    if((Array.from(new Set(arr2))).length !== arr2.length && $("select[name='volumeType']")!=='DISTRIBUTE'){
        if($(this).prop('checked')===true){
            $forceAlert.hide();
        }
        else{
            $forceAlert.show();
        }
    }
});

//卷类型不同出现不同数量选择
$("select[name='volumeType']").change(function () {
    let volumeType = $(this).val();
    let $num1 = $('#num1');
    let $num2 = $('#num2');
    let length = $('#sample_2_tbody').find("input[type='checkbox']:checked").length;
    if (length > 0) {
        if(volumeType==="DISTRIBUTE"&&length===1){
            $('#numOfChooseBrick').html("（已选择<font class='rightChoose'>" + length + "</font>块）");
        }
        else if(volumeType!=="DISTRIBUTE"&&length===1){
            $('#numOfChooseBrick').html("（已选择<font class='wrongChoose'>" + length + "</font>块）<font color='red'>请至少选择两块!</font>");
        }
        else{
            $('#numOfChooseBrick').html("（已选择<font class='rightChoose'>" + length + "</font>块）");
        }
    }
    else {
        $('#numOfChooseBrick').html("（<font style='color: red;'>未选择</font>）");
    }
    switch (volumeType) {
        case "DISTRIBUTED_REPLICATE":
            $num1.show();
            $num2.hide();
            break;
        case "DISTRIBUTED_STRIPE":
            $num1.hide();
            $num2.show();
            break;
        case "STRIPE":
            $num1.hide();
            $num2.hide();
            break;
        default:
            $num1.hide();
            $num2.hide();
    }
    $('#brickModalSubmit').click();
});

//判断是否为中文字符
function isChinese(str) {
    if (/^[\u3220-\uFA29]+$/.test(str)) {
        return true;
    } else {
        return false;
    }
}

//防止重复命名卷和中文名卷
$("input[name='volumeName']").blur(function () {
    let volumeName = $(this).val();
    volumeName   =   volumeName.replace(/^\s+|\s+$/g,"");
    let $volumeNameMessage = $('#volumeNameMessage');
    let $showhelp = $('#showhelp');
    if (isChinese(volumeName)) {
        $volumeNameMessage.show();
        $showhelp.hide();
    }
    else {
        $('#sample_1_tbody').find('.trDatabase').each(function () {
            if (volumeName === $(this).children('td').eq(0).text()) {
                $volumeNameMessage.show();
                $showhelp.hide();
                return false
            }
            else {
                $volumeNameMessage.hide();
                $showhelp.show()
            }
        })
    }

});


//冗余或者分片的验证
$('.numMessage').change(function () {
  let num = Number($(this).val());
  let length = Number($('.rightChoose').text());
  if(num){
      if(length%num===0&&length!==num){
          $(this).siblings('.numAlert').hide();
          $(this).siblings('.normalAlert').show();
      }
      else{
          $(this).siblings('.numAlert').show();
          $(this).siblings('.normalAlert').hide();
      }
  }
  else{
      $(this).siblings('.numAlert').show();
      $(this).siblings('.normalAlert').hide();
  }

});

//添加卷
$('#modal-form-2').submit(function () {
    let volumeType = $("select[name='volumeType']").val();
    let status;
    if(volumeType === "DISTRIBUTED_REPLICATE"&&$('#num1').find('.numAlert').css('display')=== 'block'){
     status = 1
    }
    else if(volumeType === "DISTRIBUTED_STRIPE"&&$('#num2').find('.numAlert').css('display')=== 'block'){
        status = 1
    }
    else{
        status = 0
    }
    if ($('#numOfChooseBrick').text() === "（未选择）" || $('#volumeNameMessage').css('display') === 'block'||$('.wrongChoose').length!==0||status===1||$('.forceAlert').css('display')!=='none') {
        $.confirm({
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn-danger',
            confirmButton: '确认',
            cancelButton: '取消',
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '错误！',
            content: '您的操作有误，请按要求填写完毕！（5秒后消失）',
            autoClose: '确认|5000',
            buttons: {
                确认: function () {

                },
            }
        });
        return false
    }
    else {
        let nfs = $("select[name='nfs2']").val();
        nfs === "1"?nfs=true:nfs=false;
        let volumeName = $("input[name='volumeName']").val();
        let volumeType = $("select[name='volumeType']").val();
        let replicaCount;
        let stripeCount;
        let bricks;
        let options = '';
        let force;
        $("input[name='force']").prop('checked') ? force = true : force = false;
        switch (volumeType) {
            case "DISTRIBUTED_REPLICATE":
                replicaCount = $("#replicaCount").val();
                break;
            case "DISTRIBUTED_STRIPE":
                stripeCount = $("#stripeCount").val();
                break;
            case "STRIPE":
                stripeCount = $(".rightChoose").text();
                break;
            case "REPLICATE":
                replicaCount = $(".rightChoose").text();
                break;
        }
        let arr = [];
        for (let key in choosedBricks) {
            arr.push(choosedBricks[key] + volumeName)
        }
        bricks = arr.join();
        let data = {
            'clusterName': clusterName,
            'volumeName': volumeName,
            'volumeType': volumeType,
            'transportType': 'ETHERNET',
            'replicaCount': replicaCount,
            'stripeCount': stripeCount,
            'bricks': bricks,
            'options': options,
            'force': force,
            'nfs':nfs
        };
        $('#addServerModal').modal('hide');
        $('.tog').show();
        $.ajax({
            cache: true,
            type: "get",
            url: "http://" + localhost_ + "/volume/create",
            data: data,
            async: true,
            success: function (data) {
                $('.tog').hide();
                if (data.isSuccess === false) {
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '失败！',
                        content: data.Msg + '（此确认框会在3秒后消失）',
                        autoClose: '确认|3000',
                        buttons: {
                            确认: function () {
                            },
                        }
                    });
                }
                else {
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '成功！',
                        content: '成功添加卷（此确认框会在3秒后消失）',
                        autoClose: '确认|3000',
                        buttons: {
                            确认: function () {
                                let volumeName2 ;
                                if($('.eee').length!==0){
                                     volumeName2 = $('.eee').children('td').eq(0).text()
                                }
                                getAllVolumes();
                                if(volumeName2){
                                    $('#sample_1_tbody').find('.trDatabase').each(function () {
                                        if (volumeName2 === $(this).children('td').eq(0).text()) {
                                            $(this).click();
                                            return false
                                        }
                                    })
                                }
                            },
                        }
                    });
                }

            },
            error: function (data) {
                $('.tog').hide();
                let message = JSON.parse(data.responseText).message;
                if (JSON.parse(data.responseText).exception === 'java.lang.RuntimeException') {
                    alert('后台出错：运行时异常，创建卷失败')
                }
                else {
                    alert('后台报错')
                }

            }
        });
    }

    return false
});

//获取卷信息
function getDetils(volumeName) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/onevolume",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'volumeName': volumeName, 'clusterName': clusterName},
        async: false,
        success: function (data) {
            //块信息部分
            let str1 = '';
            for (let key in data['bricks']) {
                let serverName = data['bricks'][key]['serverName'];
                let brickDirectory = data['bricks'][key]['brickDirectory'];
                let name = data['bricks'][key]['name'];
                let status = data['bricks'][key]['status'];
                status === 'OFFLINE' ? status = '<span class="label label-danger">不在线</span>' : status = '<span class="label label-success">在线</span>';
                str1 += "<tr><td><input type='checkbox' value='" + name + "' class='checkboxes'></td><td>" + name + "</td><td>" + serverName + "</td><td>" + brickDirectory + "</td></tr>"
            }
            $('#sample_3_tbody').html(str1);
            checkbox($('#sample_3 .group-checkable'));
            //卷选项部分
            let str2 = '';
            let options = data['options']['options'];
            for (let key in options) {
                str2 += "<tr><td><input type='checkbox' class='checkboxes' value=''></td><td>" + options[key]['key'] + "</td><td>" + options[key]['value'] + "</td></tr>"
            }
            $('#sample_4_tbody').html(str2);
            checkbox($('#sample_4 .group-checkable'));
            //卷总览部分
            let volumeType = data['volumeType'];
            switch (volumeType) {
                case "DISTRIBUTE":
                    volumeType = "分布式卷";
                    break;
                case "REPLICATE":
                    volumeType = "复制卷";
                    break;
                case "DISTRIBUTED_REPLICATE":
                    volumeType = "分布式复制卷";
                    break;
                case "STRIPE":
                    volumeType = "分片卷";
                    break;
                case "DISTRIBUTED_STRIPE":
                    volumeType = "分布式分片卷";
                    break;
            }
          /*  if(volumeType === "复制卷" &&  data['replicaCount']>0){
                volumeType = "分布式复制卷";
            }
            else if(volumeType === "分片卷" &&  data['stripeCount']>0){
                volumeType = "分布式分片卷";
            }*/
            let status = data['status'];
            status === "ONLINE" ? status = "<span class='label label-success'>在线</span>" : status = "<span class='label label-danger'>不在线</span>";
            let str3 = '<tr><td>名称</td><td>' + data['name'] + '</td></tr><tr><td>nas协议</td><td>' + data['nasProtocols'].join() + '</td></tr><tr><td>运输类型</td><td>' + data['transportType'] + '</td></tr><tr><td>卷类型</td><td id="tdVolumeType">' + volumeType + '</td></tr><tr><td>冗余数量</td><td id="tdReplicaCount">' + data['replicaCount'] + '</td></tr><tr><td>分片数量</td><td id="tdStripeCount">' + data['stripeCount'] + '</td></tr><tr><td>状态</td><td>' + status + '</td></tr>\n';
            $('#sample_5_tbody').html(str3)
        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

let sample_1 = $('#sample_1');

//点击选中卷
sample_1.on('click', '.trDatabase', function (e) {
    e.stopPropagation();
    let volumeName = $(this).children('td').eq(0).text();
    if ($(this).hasClass('eee')) {

    }
    else {
        /* if (websocket2) {
             websocket2.close();
         }*/
        getDetils(volumeName);
        $('.messageContent').show();
        $('#alert-info').hide();
        //webSocket2(servername);
        $('.trDatabase').removeClass('eee');
        $(this).addClass('eee');
    }


});

//删除卷
sample_1.on('click', '.removeVolume', function (e) {
    e.stopPropagation();
    let volumeName = $(this).parent().parent().children('td').eq(0).text();
    $.confirm({
        animation: 'zoom',
        closeAnimation: 'rotateXR',
        title: '提示',
        content: '' +
        '<input type="checkbox" name="deleteData" class="checkbox confirm-checkbox" style="margin-top: -2px;">  是否删除卷中数据',
        autoClose: '取消|8000',
        buttons: {
            deleteUser: {
                text: '删除',
                btnClass: 'btn-red',
                action: function () {
                    let boolean = this.$content.find('.confirm-checkbox').prop('checked');
                    $('.tog').show();
                    $.ajax({
                        cache: true,
                        type: "get",
                        url: "http://" + localhost_ + "/volume/delete",
                        //"http://" + localhost + "/getAllPlanHis",
                        data: {'clusterName': clusterName, 'volumeName': volumeName, "deleteData": boolean},
                        async: true,
                        success: function (data) {
                            $('.tog').hide();
                            if (data.isSuccess === false) {
                                $.confirm({
                                    confirmButtonClass: 'btn btn-info',
                                    cancelButtonClass: 'btn-danger',
                                    confirmButton: '确认',
                                    cancelButton: '取消',
                                    animation: 'zoom',
                                    closeAnimation: 'rotateXR',
                                    title: '失败！',
                                    content: data.Msg + '（3秒后消失）',
                                    autoClose: '确认|3000',
                                    buttons: {
                                        确认: function () {
                                        },
                                    }
                                });
                            }
                            else {
                                $.confirm({
                                    confirmButtonClass: 'btn btn-info',
                                    cancelButtonClass: 'btn-danger',
                                    confirmButton: '确认',
                                    cancelButton: '取消',
                                    animation: 'zoom',
                                    closeAnimation: 'rotateXR',
                                    title: '成功！',
                                    content: '成功删除卷（3秒后消失）',
                                    autoClose: '确认|3000',
                                    buttons: {
                                        确认: function () {
                                            $('#alert-info').show();
                                            $('.messageContent').hide();
                                            getAllVolumes();
                                        },
                                    }
                                });
                            }

                        },
                        error: function (data) {
                            $('.tog').hide();
                            alert('发生错误:' + JSON.parse(data.responseText).message)
                        }
                    });
                }
            },
            取消: function () {

            },
        }
    });
});

//启动卷
sample_1.on('click', '.startVolume', function (e) {
    e.stopPropagation();
    let volumeName = $(this).parent().parent().children('td').eq(0).text();
    $.confirm({
        animation: 'zoom',
        closeAnimation: 'rotateXR',
        title: '提示',
        content: '' +
        '<input type="checkbox" name="deleteData" class="checkbox confirm-checkbox" style="margin-top: -2px;">  是否强制启动',
        autoClose: '取消|8000',
        buttons: {
            deleteUser: {
                text: '启动',
                btnClass: 'btn-blue',
                action: function () {
                    let boolean = this.$content.find('.confirm-checkbox').prop('checked');
                    startOrStopVolume(clusterName, volumeName, 'start', boolean)
                }
            },
            取消: function () {

            },
        }
    });
});

//停止卷
sample_1.on('click', '.stopVolume', function (e) {
    e.stopPropagation();
    let volumeName = $(this).parent().parent().children('td').eq(0).text();
    $.confirm({
        animation: 'zoom',
        closeAnimation: 'rotateXR',
        title: '提示',
        content: '' +
        '<input type="checkbox" name="deleteData" class="checkbox confirm-checkbox" style="margin-top: -2px;">  是否强制停止',
        autoClose: '取消|8000',
        buttons: {
            deleteUser: {
                text: '停止',
                btnClass: 'btn-warning',
                action: function () {
                    let boolean = this.$content.find('.confirm-checkbox').prop('checked');
                    startOrStopVolume(clusterName, volumeName, 'stop', boolean)
                }
            },
            取消: function () {

            },
        }
    });
});

//删除块
$('#removeBricks').click(function () {
    let volumeName = $('.eee').children('td').eq(0).text();
    let arr = [];
    $('#sample_3_tbody').find("input[type='checkbox']:checked").each(function () {
        arr.push($(this).val())
    });
    if (arr.length === 0) {
        $.confirm({
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '操作错误！',
            content: '未选择块（3秒后消失）',
            autoClose: '确认|3000',
            buttons: {
                确认: function () {

                },
            }
        });
    }
    else {
        $.confirm({
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '删除？',
            content: '' +
            '<input type="checkbox" name="deleteData" id="rbDeleteData" class="checkbox confirm-checkbox" style="margin-top: -2px;">  是否删除块中的数据',
            autoClose: '否|8000',
            buttons: {
                deleteUser: {
                    text: '是',
                    btnClass: 'btn-blue',
                    action: function () {
                        let deleteData = this.$content.find('#rbDeleteData').prop('checked');
                        removeBricks(arr.join(), deleteData, volumeName, clusterName)
                    }
                },
                否: function () {

                },
            }
        });
    }

});

//启动或者停止卷
function startOrStopVolume(clusterName, volumeName, operation, force) {
    force = force || false;
    $('.tog').show();
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/operation",
        data: {'clusterName': clusterName, 'volumeName': volumeName, "operation": operation, "force": force},
        async: true,
        success: function (data) {
            $('.tog').hide();
            if (data.isSuccess === false) {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '失败！',
                    content: data.Msg + '（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                        },
                    }
                });
            }
            else {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '成功！',
                    content: data.Msg + '（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                            getAllVolumes();
                            $('#sample_1_tbody').find('.trDatabase').each(function () {
                                if (volumeName === $(this).children('td').eq(0).text()) {
                                    $(this).addClass('eee');
                                    return false
                                }
                            })
                        },
                    }
                });
            }

        },
        error: function (data) {
            $('.tog').hide();
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

//获取卷属性
function getVolumeAttributes(clusterName) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/getoptions",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'clusterName': clusterName},
        async: false,
        success: function (data) {

        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });

}

//设置卷属性
function setVolumeAttributes(clusterName, volumeName, key, value) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/setoption",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'clusterName': clusterName, 'volumeName': volumeName, 'key': key, 'value': value},
        async: false,
        success: function (data) {

        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

//还原卷属性
function revertVolumeAttributes(clusterName, volumeName) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/resetoption",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'clusterName': clusterName, 'volumeName': volumeName},
        async: false,
        success: function (data) {

        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

//添加brick
function addBricks(clusterName, volumeName, bricks) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/addbricks",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'clusterName': clusterName, 'volumeName': volumeName, 'bricks': bricks},
        async: false,
        success: function (data) {
            if (data.isSuccess === false) {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '失败！',
                    content: data.Msg + '（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                        },
                    }
                });
            }
            else {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '成功！',
                    content: data.Msg + '（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                            getDetils(volumeName);
                            $('#addBrickModal').modal('hide')
                        },
                    }
                });
            }
        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

//删除brick
function removeBricks(bricks, deleteData, volumeName, clusterName) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/volume/deletebricks",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'bricks': bricks, 'deleteData': deleteData, 'clusterName': clusterName, 'volumeName': volumeName},
        async: false,
        success: function (data) {
            if (data.isSuccess === false) {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '失败！',
                    content: data.Msg + '（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                        },
                    }
                });
            }
            else {
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton: '确认',
                    cancelButton: '取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '成功！',
                    content: data.Msg + '（3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                            getDetils(volumeName);
                        },
                    }
                });
            }
        },
        error: function (data) {       //xhr:XMLHttpRequest对象  errorText:错误信息  erroType：（可选）捕获的异常对象
            alert('发生错误：' + JSON.parse(data.responseText).message);
        }
    });
}

//删除任务
function deleteTasks(ids) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/task/delete",
        //"http://" + localhost + "/getAllPlanHis",
        data: {'ids': ids},
        async: false,
        success: function (data) {

        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

/**
 * 挂载卷相关方法
 */

/*let aaaa = "<tr class=\"trDatabase\">\n" +
    "<td   title=\"ssssssssss\"><i class=\"fa fa-database tdDatabase\"></i>ssssssssss</td>\n" +
    "<td >\n" + "<span class='label label-success startVolume'>启动</span>" +
    "<span class=\"label label-info myLabel mount\">挂载</span><span class=\"label label-danger myLabel removeVolume\">删除</span>\n" +
    "</td>\n" +
    "</tr>";
$('#sample_1_tbody').html(aaaa)*/

let volumeName ;

//点击挂载弹出模态框
sample_1.on('click','.mount',function (e) {
    if($('#mountServerName').find('option').length===0){
        getAllBricks2(getAllServers2());
    }
    e.stopPropagation();
    volumeName = $(this).parent('td').parent('tr').children('td').eq(0).text();
    $('#numOfChooseBrick2').html('（<font style=\'color: red;\'>未选择</font>）')
    $('.ChooseVolumeName').text(":"+volumeName);
    $('#mountModal').modal('show');

});
//获取挂载服务器
function getAllBricks2(servername) {
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/client/gedetail",
        data: {'servername': servername, 'details': true},
        async: false,
        success: function (data) {
            let str2 = "";
            let str = "";
            for (let key in data) {
                let servername = data[key]['name'];
                let arr = []; //zzz
                for (let key2 in data[key]['disks']) {
                    let mountPoint1 = data[key]['disks'][key2]['mountPoint'];
                    let space1 = ((data[key]['disks'][key2]['space']) / 1024).toFixed(1)  + "(GB)";
                    let spaceInUse1 = (((data[key]['disks'][key2]['space']) - (data[key]['disks'][key2]['spaceInUse'])) / 1024).toFixed(1) +"(GB)";
                    let name1 = data[key]['disks'][key2]['name'];
                    let fsType1 = data[key]['disks'][key2]['fsType'];
                    if (fsType1 !== "swap") {
                        if (mountPoint1 && mountPoint1 !== "/" && mountPoint1 !== "/boot") {
                            arr.push(mountPoint1);
                            str += "<tr><td><input type='radio' value='' name='mountBrick'></td><td>" + servername + "</td><td>" + name1 + "</td><td>" + mountPoint1 + "</td><td>" + spaceInUse1 + "</td><td>" + space1 + "</td></tr>"
                        }
                        /*   else{
                                   str += "<tr><td><input type='checkbox' class='checkboxes' value='' disabled></td><td>" + servername + "</td><td>" + name + "</td><td>" + mountPoint + "</td><td>" + spaceInUse + "</td><td>" + space + "</td></tr>"
                               }*/
                    }
                    for (let key3 in data[key]['disks'][key2]['partitions']) {
                        let mountPoint = data[key]['disks'][key2]['partitions'][key3]['mountPoint'];
                        let space = ((data[key]['disks'][key2]['partitions'][key3]['space']) / 1024).toFixed(1) + "(GB)";
                        let spaceInUse = (((data[key]['disks'][key2]['partitions'][key3]['space']) - (data[key]['disks'][key2]['partitions'][key3]['spaceInUse'])) / 1024).toFixed(1) + "(GB)";
                        let name = data[key]['disks'][key2]['partitions'][key3]['name'];
                        let fsType = data[key]['disks'][key2]['partitions'][key3]['fsType'];
                        if (fsType !== "swap") {
                            if (mountPoint) {
                                arr.push(mountPoint);
                                str += "<tr><td><input type='radio'  value='' name='mountBrick'></td><td>" + servername + "</td><td>" + name + "</td><td>" + mountPoint + "</td><td>" + spaceInUse + "</td><td>" + space + "</td></tr>"
                            }
                            /*   else{
                                       str += "<tr><td><input type='checkbox' class='checkboxes' value='' disabled></td><td>" + servername + "</td><td>" + name + "</td><td>" + mountPoint + "</td><td>" + spaceInUse + "</td><td>" + space + "</td></tr>"
                                   }*/
                        }
                    }
                }
                dir = arr.join();
                str2 += `<option value="${servername}" data-dir="${dir}">${servername}</option>`
            }
            $('#mountServerName').html(str2);
            if(str){
                $('#sample_7_tbody').html(str);
                $('.alertBrick2').hide();
                $('.brickMessage2').show();
            }
            else{
                $('.alertBrick2').show();
                $('.brickMessage2').hide();
            }

        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
}

//获取客户端所有服务器
function getAllServers2() {
    let arr = [];
    $.ajax({
        cache: true,
        type: "get",
        url: "http://" + localhost_ + "/client/getall",
        //"http://" + localhost + "/getAllPlanHis",
        async: false,
        success: function (data) {
            for (let key in data) {
                arr.push(key)
            }
        },
        error: function (data) {
            alert('发生错误:' + JSON.parse(data.responseText).message)
        }
    });
    return arr.join();
}

//点击选择目录弹出模态框
$('#chooseBrick2').click(function () {
    getAllBricks2(getAllServers2());
    $('#numOfChooseBrick2').html('（<font style=\'color: red;\'>未选择</font>）')
    $('#mountBrickModal').modal('show');
    return false
});

//定义一个全局变量用于获取选择好的块（挂载块）
let mountServer;
let mountPoint;
let arr2_;

//选择块点击确定，确定对应块
$('#mountBrickModalSubmit').click(function () {
    let arr = [];
    arr2_ = [];
        let $tr =  $('#sample_7_tbody').find("input[type='radio']:checked").parent().parent('tr');
         mountServer = $tr.children('td').eq(1).text();
         mountPoint = $tr.children('td').eq(3).text();
        arr2_.push(mountServer)
    let length = $('#sample_7_tbody').find("input[type='radio']:checked").length;
    //判断是否有重复的服务器
    /*if((Array.from(new Set(arr2))).length !== arr2.length){
        $('.forceAlert').show();
    }
    else{
        $('.forceAlert').hide();
    }*/
    if (length > 0) {
     /*   if(volumeType==="DISTRIBUTE"&&length===1){
            $('#numOfChooseBrick').html("（已选择<font class='rightChoose2'>" + length + "</font>块）");
        }
        else if(volumeType!=="DISTRIBUTE"&&length===1){
            $('#numOfChooseBrick').html("（已选择<font class='wrongChoose2'>" + length + "</font>块）<font color='red'>请至少选择两块!</font>");
        }
        else{
            $('#numOfChooseBrick').html("（已选择<font class='rightChoose2'>" + length + "</font>块）");
        }*/
        $('#numOfChooseBrick2').html("（已选择<font class='rightChoose2'>" + length + "</font>个）");
    }
    else {
        $('#numOfChooseBrick').html("（<font style='color: red;'>未选择</font>）");
    }

    $('#mountBrickModal').modal('hide');
});

//挂载提交
$('#mountForm').submit(function () {
    let arr = $('#mountServerName').find('option:selected').data('dir').split(',');
    let value = $.trim($('#MyDir').val());
    let nfs = $("select[name='nfs']").val();
    let mountServer = $('#mountServerName').val();
    nfs === "1"?nfs=true:nfs=false;
    let data = {
        'clustername': clusterName,
        'volumeName': volumeName,
        'mountServer': mountServer,
        'mountPoint': value,
        'nfs':nfs
    };
    //该服务器已存在目录，提醒用户是否覆盖
    if (arr.indexOf(value)!==-1) {
        $.confirm({
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn-danger',
            confirmButton: '确认',
            cancelButton: '取消',
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '提醒！',
            content: '该服务器已存在此目录，是否确定覆盖？',
            autoClose: '否|8000',
            buttons: {
                deleteUser: {
                    text: '是',
                    action: function () {
                        $('#mountModal').modal('hide');
                        $('.tog').show();
                        $.ajax({
                            cache: true,
                            type: "get",
                            url: "http://" + localhost_ + "/client/mountVolume",
                            data: data,
                            async: true,
                            success: function (data) {
                                $('.tog').hide();
                                if (data.isSuccess === false) {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton: '确认',
                                        cancelButton: '取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '失败！',
                                        content: data.Msg + '（此确认框会在3秒后消失）',
                                        autoClose: '确认|3000',
                                        buttons: {
                                            确认: function () {
                                            },
                                        }
                                    });
                                }
                                else {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton: '确认',
                                        cancelButton: '取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '成功！',
                                        content: '成功挂载卷（此确认框会在3秒后消失）',
                                        autoClose: '确认|3000',
                                        buttons: {
                                            确认: function () {
                                            },
                                        }
                                    });
                                }

                            },
                            error: function (data) {
                                $('.tog').hide();
                                let message = JSON.parse(data.responseText).message;
                                if (JSON.parse(data.responseText).exception === 'java.lang.RuntimeException') {
                                    alert('后台出错：运行时异常，挂载卷失败')
                                }
                                else {
                                    alert('后台报错')
                                }

                            }
                        })
                    }
                },
                否: function () {

                },
            }
        });

    }
    else if(value===""||$('.dirAlert').css('display')!=="none"){
        $.confirm({
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn-danger',
            confirmButton:'确认',
            cancelButton:'取消',
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '操作错误！',
            content: '目录填写错误（此确认框会在5秒后消失）',
            autoClose: '确认|5000',
            buttons: {
                确认: function () {

                },
            }
        });

    }
    else {
        $('#mountModal').modal('hide');
        $('.tog').show();
        $.ajax({
            cache: true,
            type: "get",
            url: "http://" + localhost_ + "/client/mountVolume",
            data: data,
            async: true,
            success: function (data) {
                $('.tog').hide();
                if (data.isSuccess === false) {
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '失败！',
                        content: data.Msg + '（此确认框会在3秒后消失）',
                        autoClose: '确认|3000',
                        buttons: {
                            确认: function () {
                            },
                        }
                    });
                }
                else {
                    $.confirm({
                        confirmButtonClass: 'btn btn-info',
                        cancelButtonClass: 'btn-danger',
                        confirmButton: '确认',
                        cancelButton: '取消',
                        animation: 'zoom',
                        closeAnimation: 'rotateXR',
                        title: '成功！',
                        content: '成功挂载卷（此确认框会在3秒后消失）',
                        autoClose: '确认|3000',
                        buttons: {
                            确认: function () {
                            },
                        }
                    });
                }

            },
            error: function (data) {
                $('.tog').hide();
                let message = JSON.parse(data.responseText).message;
                if (JSON.parse(data.responseText).exception === 'java.lang.RuntimeException') {
                    alert('后台出错：运行时异常，挂载卷失败')
                }
                else {
                    alert('后台报错')
                }

            }
        });
    }
    return false//阻止保单的默认刷新

});

$('#MyDir').blur(function () {
    let value = $(this).val();
    //该服务器已存在目录，提醒用户是否覆盖
    if(/^(\/\w+)+$/.test(value)){
        $('.dirAlert').hide()
    }
    else{
        $('.dirAlert').show()
    }

})