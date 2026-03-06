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
    } else if (msg.equals("流量余额")) {
        try {
            var url = "https://sub.sslinks.co.in/api/v1/4ad6c50676e948e3af19d622c2915174/c1bf9124e8a24f70bf3d46c092f32fe1/752fc9d9915b4?token=f6c713ea766c7ba8b190326596c831c7";
            var out0 = httpGetText(url);
            if (out0 == null || out0.toString().trim() === "") {
                event.getSubject().sendMessage("获取失败: 返回为空")
                return;
            }

            var base64Text = out0.toString();
            base64Text = base64Text.replace(/^\uFEFF/, "");
            base64Text = base64Text.replace(/\s+/g, "").trim();
            base64Text = base64Text.replace(/-/g, "+").replace(/_/g, "/");
            if (base64Text.length % 4 !== 0) {
                var pad = 4 - (base64Text.length % 4);
                for (var p = 0; p < pad; p++) base64Text += "=";
            }

            var decoded;
            try {
                var Base64 = Java.type("java.util.Base64");
                var bytes = Base64.getDecoder().decode(base64Text);
                decoded = new java.lang.String(bytes, "UTF-8");
            } catch (e0) {
                var raw = out0.toString();
                raw = raw.replace(/\r/g, "").replace(/\n/g, " ");
                if (raw.length > 120) raw = raw.substring(0, 120) + "...";
                event.getSubject().sendMessage("解码失败: Base64\n返回: " + raw)
                return;
            }

            var lines = decoded.split(/\r?\n/);
            var trafficLine = null;
            var expireLine = null;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (line == null) continue;
                line = line.trim();
                if (line === "") continue;
                try {
                    line = decodeURIComponent(line);
                } catch (e1) {
                }
                var idx = line.indexOf("#Traffic:");
                if (idx >= 0 && trafficLine == null) trafficLine = line.substring(idx);
                idx = line.indexOf("#Expire:");
                if (idx >= 0 && expireLine == null) expireLine = line.substring(idx);
            }

            var reply = "";
            if (trafficLine != null) reply += trafficLine + "\n";
            if (expireLine != null) reply += expireLine + "\n";
            reply = reply.trim();
            if (reply === "") {
                event.getSubject().sendMessage("未找到流量/到期信息")
            } else {
                event.getSubject().sendMessage(reply)
            }
        } catch (e) {
            event.getSubject().sendMessage("获取流量余额失败")
        }
    } else if (msg.equals("测试")) {
        tsign0();
    }

    if (event.getSubject().getId() == 167146116) {
        // 忽略大小写
        if (msg.toLowerCase().startsWith("nfl账号")) {
            utils.requestGet("http://117.72.126.37:29992/api/logall/report-accounts")
        } else if (msg.toLowerCase().startsWith("nfl利润")) {
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

function httpGetText(url) {
    var URL = Java.type("java.net.URL");
    var BufferedReader = Java.type("java.io.BufferedReader");
    var InputStreamReader = Java.type("java.io.InputStreamReader");
    var StringBuilder = Java.type("java.lang.StringBuilder");
    var conn = new URL(url).openConnection();
    conn.setRequestMethod("GET");
    conn.setConnectTimeout(10000);
    conn.setReadTimeout(15000);
    conn.setRequestProperty("User-Agent", "Mozilla/5.0");
    conn.setRequestProperty("Accept", "*/*");
    var code = conn.getResponseCode();
    var isr;
    if (code >= 200 && code < 400) {
        isr = new InputStreamReader(conn.getInputStream(), "UTF-8");
    } else {
        var es = conn.getErrorStream();
        if (es == null) return "";
        isr = new InputStreamReader(es, "UTF-8");
    }
    var br = new BufferedReader(isr);
    var sb = new StringBuilder();
    var line;
    while ((line = br.readLine()) != null) {
        sb.append(line).append("\n");
    }
    br.close();
    return sb.toString();
}