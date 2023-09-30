if (context.getType() === "group") {
    if (msg.startsWith("解析快手图集")) {
        if (context.getType() === "group") {
            var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
            var urls = msg.match(reg)
            if (urls !== null) {
                context.send("正在解析...\n请稍等")
                var u0 = encodeURI(urls[0]);
                var arr = JSON.parse(utils.requestGet("http://kloping.top/api/search/parseImgs?url=" + u0 + "&type=ks"))
                var builder = context.forwardBuilder();
                for (var i = 0; i < arr.length; i++) {
                    var e = arr[i];
                    builder.add(context.getBot().getId(), "AI", context.uploadImage(e))
                }
                context.send(builder.build())
            } else {
                context.send("未发现链接")
            }
        } else {
            context.send("命令仅适用群聊")
        }
    }
    //====================解析结束
    if (msg.startsWith("百度")) {
        var end = encodeURI(msg.substring(2));
        context.send("https://m.baidu.com/s?word=" + end);
    }
    //================百度结束
}




//杂项开关
function get_group_state() {
    var get_group = utils.get("group_state")
    if (get_group == null) {
        var group_state = utils.requestGet("http://kloping.top/get?pwd=dg-189696825&key=group_state")
        utils.set("group_state", group_state)
        return utils.get("group_state")
    } else {
        return get_group
    }
}

//获取时间
function getTime() {
    var timestamp = Date.now()
    var time = new Date(timestamp)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var seconds = time.getSeconds()
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
}



//功能性admin用法
if (context.getType() == "group" || context.getType() == "friend") {
    if (context.getSender().getId() == context.getBot().getId()) {
        var okv = msg.split(" ")
        switch (okv[0]) {
            case "开启杂项":
                if (get_group_state() == "false" || get_group_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-189696825&key=group_state&value=true")
                    utils.set("group_state", "true")
                    context.send("正在开启...")
                } else {
                    context.send("已开启")
                }
                break

            case "关闭杂项":
                if (get_group_state() == "true" || get_group_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-189696825&key=group_state&value=false")
                    utils.set("group_state", "false")
                    context.send("正在关闭...")
                } else {
                    context.send("已关闭")
                }
                break
        }
    }
}


if (get_group_state() == "true") {
    //获取禁言事件
    if (context.getType() == "MemberMuteEvent") {
        event.getGroup().sendMessage(context.newPlainText(event.getMember().getNick() + "\(" + event.getMember().getId() + "\)" + "禁止说话" + event.getDurationSeconds() + "秒"))
    }

    //获取禁言事件
    if (context.getType() == "MemberUnmuteEvent") {
        var out = context.deSerialize("<at:" + at + ">\n被解除禁言了")
        event.getGroup().sendMessage(out)
    }

    //获取Bot被禁言，在群181214190中提示
    if (context.getType() == "BotMuteEvent") {
        var bemute = context.getBot().getGroup(Number(181214190))
        bemute.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + event.getGroup().getName() + "”（"
            + event.getGroup().getId() + "）中被禁言" + "\n禁言时长为：" + event.getDurationSeconds() + "秒" +
            "\n操作者为：" + event.getOperator().getNameCard() + "（" + event.getOperator().getId() + "）"))
    }

    //如果Bot被提到，则转发至群
    if (msg.indexOf("<at:" + context.getBot().getId() + ">") >= 0) {
        var group = context.getBot().getGroup(Number(181214190))
        var tg = context.getSubject()
        var sn = context.getSender().getNameCard()
        var time = getTime()
        if (sn === null || sn === "") {
            sn = context.getSender().getNick()
        }
        group.sendMessage(time)
        group.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "”（" + tg.getId() + "）中被"
            + sn + "（" + context.getSender().getId() + "）提到"))
        group.sendMessage(context.deSerialize(("该消息为:\n" + msg)))
    }
}


//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

if (context.getType() == "NudgeEvent") {
    if (event.getFrom().getId() !== event.getBot().getId() && event.getTarget().getId() == event.getBot().getId()) {
        var r0 = randomNum(1, 3)
        switch (r0) {
            case 1:
                event.getSubject().sendMessage(context.newPlainText("反击三连!!"))
                event.getFrom().nudge().sendTo(event.getSubject())
                event.getFrom().nudge().sendTo(event.getSubject())
                event.getFrom().nudge().sendTo(event.getSubject())
                break;
            case 2:
                event.getSubject().sendMessage(context.newPlainText("啊，被戳洗了"))
                break;
            case 3:
                event.getSubject().sendMessage(context.newPlainText("直接嘎了"))
                break;
        }
    }
}