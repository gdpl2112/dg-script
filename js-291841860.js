function onMsgEvent(msg, event) {
    if (msg.startsWith("天气")) {
        var name = msg.substring(2)
        name = name.trim()
        if (name === "") {
            event.getSubject().sendMessage("请输入城市名称!")
        } else {
            var out0 = utils.requestGet("https://www.hhlqilongzhu.cn/api/juhe_tianqi.php?n=1&type=zgtq&msg=" + name + "")
            var out1 = JSON.parse(out0)
            var m0 = utils.deSerialize("<at:" + event.getSender().getId() + ">\n" + out1.name + "\n" + out1.data + "\n" + out1.shzs)
            event.getSubject().sendMessage(m0)
        }
    } else if (msg.startsWith("未来天气")) {
        var name = msg.substring(4)
        name = name.trim()
        if (name === "") {
            event.getSubject().sendMessage("请输入城市名称!")
        } else {
            name = encodeURI(name)
            var m0 = utils.deSerialize("<at:" + event.getSender().getId() + ">\n" +
                "<pic:https://kloping.top/api/ex/fwea?name=" + name + ">")
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
            event.getSubject().sendMessage(out1.name + "\n级别: " + out1.level + "\n短时天气:\n\t" + out1.intro)
        }
    } else if (msg.startsWith("歌词")) {
        var name = msg.substring(2)
        name = name.trim()
        if (name === "") {
            event.getSubject().sendMessage("请携带歌名")
        } else {
            var out0 = utils.requestGet("https://www.hhlqilongzhu.cn/api/dg_geci.php?msg=" + name + "&n=1&type=1")
            var lrc = out0.toString();
            event.getSubject().sendMessage(lrc.trim())
        }
    } else if (msg.startsWith("还有几天")) {
        var out0 = utils.requestGet("https://api.52vmy.cn/api/wl/day/world")
        var out1 = JSON.parse(out0)
        var end = "<世界倒数日>\n";
        var index = 1;
        for (var i = 0; i < out1.info.length; i++) {
            end += index + ". " + out1.info[i].desc + "\n"
            index++;
        }
        event.getSubject().sendMessage(end.trim())
    } else if (msg.equals("懒羊羊唱歌")) {
        var out0 = utils.requestGet("https://www.hhlqilongzhu.cn/api/MP4_lanyangyang.php?type=text")
        event.getSubject().sendMessage("请点击播放:\n" + out0)
    } else if (msg.equals("测试")) {
        tsign0();
    }

    if (event.getSubject().getId() == 167146116) {
        // 忽略大小写
        if (msg.toLowerCase().startsWith("nfl账号")) {
            utils.requestGet("http://117.72.126.37:29992/api/logall/report-accounts")
        }else if (msg.toLowerCase().startsWith("nfl利润")) {
            utils.requestGet("http://117.72.126.37:29992/api/logall/report-profit")
        }
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

function fourKfc() {
    var gid = 278681553
    var out0 = utils.requestGet("https://tools.mgtv100.com/external/v1/pear/kfc")
    var out1 = JSON.parse(out0)
    var group = bot.getGroup(gid)
    group.sendMessage(out1.data)
}

function tsign0() {
    var gid = 278681553
    bot.executeAction("send_group_sign", "{\"group_id\": \"" + gid + "\"}")
    bot.getGroup(gid).sendMessage("今日已打卡!")
}