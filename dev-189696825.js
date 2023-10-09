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
    if (msg.startsWith("妤百度")) {
        var end = encodeURI(msg.substring(2));
        context.send("https://m.baidu.com/s?word=" + end);
    }
    //================百度结束

    //甘雨抱抱你
    if (msg.startsWith("甘雨抱抱你")) {
        var object = getApiObject(5)
        context.send(context.uploadImage("https://api.andeer.top/API/img_love.php?qq=" + object))
    }

    //贴贴
    if (msg.startsWith("贴贴")) {
        var object = getApiObject(2)
        context.send(context.uploadImage("https://api.xingzhige.com/API/baororo/?qq=" + object))
    }

    //顶
    if (msg.startsWith("顶")) {
        var object = getApiObject(1)
        context.send(context.uploadImage("https://api.xingzhige.com/API/dingqiu/?qq=" + object))
    }

    //咬
    if (msg.startsWith("咬")) {
        var object = getApiObject(1)
        context.send(context.uploadImage("https://api.xingzhige.com/API/bite/?qq=" + object))
    }

    //拍
    if (msg.startsWith("拍")) {
        var object = getApiObject(1)
        context.send(context.uploadImage("https://api.xingzhige.com/API/grab/?qq=" + object))
    }
}




//杂项开关
function get_group_state() {
    var get_group = utils.get("group_state")
    if (get_group == null) {
        var group_state = utils.requestGet("http://kloping.top/get?pwd=dg-189696825&key=group_state")
        utils.set("group_state", group_state)
        var get_group_state = utils.get("group_state")
        return get_group_state
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

//object of api
function getApiObject(str) {
    var id = msg.substring(str)
    var at = getAtId(msg)
    if (at !== null) {
        return at
    } else if (id !== null) {
        return id
    } else {
        return -1
    }
}

//获取指定格式值 目前仅支持获取第一个出现的格式元素
function getFormatValue(fk, inStr) {
    var i1 = inStr.indexOf("<")
    var i2 = inStr.indexOf(">")
    if (i1 < 0 || i2 <= 0) return null
    var format0 = inStr.substring(i1 + 1, i2)
    var args = format0.split(":")
    if (args[0] !== fk) {
        if (i2 <= inStr.length) {
            return getFormatValue(fk, inStr.substring(i2 + 1))
        } else {
            return null
        }
    } else {
        return args[1]
    }
}

//获取at格式值并返回Number 或 null
function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end)
    else return null
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



//getRandomNumber
function getRandomNumber(minNum, maxNum) {
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
        var randomReply = getRandomNumber(1, 2)
        switch (randomReply) {
            case 1:
                event.getSubject().sendMessage(context.newPlainText("粗来惹，粗来惹⸝⸝ ᷇࿀ ᷆⸝⸝不要再戳了"))
                break
            case 2:
                event.getSubject().sendMessage(context.newPlainText(" 反击 𓂃 ꙳ ⋆ "))
                event.getFrom().nudge().sendTo(event.getSubject())
        }
    }
}



if (msg == "妤菜单") {
    context.send("<at:" + context.getSender().getId() + ">"
        + "\n【api功能】\n百度+\n解析快手图集+url\n\n【表情包】\n甘雨抱抱你+qid/@\n贴贴+qid/@\n顶+qid/@\n咬+qid/@\n拍+qid/@\n牵+qid/@")
}