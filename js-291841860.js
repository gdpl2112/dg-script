function onMsgEvent(msg, event) {
    if (msg.startsWith("天气")) {
        var name = msg.substring(2)
        name = name.trim()
        if (name === "") {
            event.getSubject().sendMessage("请输入城市名称!")
        } else {
            var out0 = utils.requestGet("https://www.hhlqilongzhu.cn/api/juhe_tianqi.php?msg=" + name + "&n=1&type=zgtq")
            var out1 = JSON.parse(out0)
            var m0 = utils.deSerialize("<at:" + event.getSender().getId() + ">\n" + out1.name + "\n" + out1.data + "\n" + out1.shzs)
            event.getSubject().sendMessage(m0)
        }
    } else if (msg.startsWith("短时预报")) {
        var name = msg.substring(4)
        name = name.trim()
        if (name === "") {
            event.getSubject().sendMessage("请输入城市名称!")
        } else {
            var out0 = utils.requestGet("https://kloping.top/api/get/shortWeather?address=" + name)
            var out1 = JSON.parse(out0)
            event.getSubject().sendMessage(name + "天气:\n\t" + out1.intro)
        }
    }
}

function onBotEvent(event) {

}

function onProfileLike(event) {
    bot.getFriend(event.operatorId).sendMessage("感谢你的点赞!")
}

function onSendLiked(event) {
    if (event.ok) {
        bot.getFriend(event.operatorId).sendMessage("成功给你回赞啦!")
    }
}

function onGroupSign(event) {
    bot.getGroup(event.gid).sendMessage("今日已打卡!")
}

function dayyan() {
    dayyanNow(278681553)
}

function dayyanNow(gid) {
    var out0 = utils.requestGet("https://kloping.top/api/get/dayYan")
    var out1 = JSON.parse(out0)
    var group = bot.getGroup(gid)
    group.sendMessage("<<每日一言>>\n" +
        "-------\n" +
        "\" " + out1.line + " \"\n" +
        "-------\n" +
        "from. <" + out1.from + ">\n日期: " + out1.date)
}

function tsign0() {
    var gid = 278681553
    bot.executeAction("send_group_sign", "{\"group_id\": \"" + gid + "\"}")
    bot.getGroup(gid).sendMessage("今日已打卡!")
}