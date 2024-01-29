importJ("com.alibaba.fastjson.JSON");

var urlReg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

if (context.getType() === "group" || context.getType() === "friend") {
    var tid = context.getSubject().getId();
    if (msg.startsWith("/")) {
        debugLog("command start")
        if (context.getSender().getId() == 3474006766) {
            var okv = msg.split(" ");
            switch (okv[0]) {
                case "/set":
                    if (okv.length !== 3) {
                        context.send("args size less 3")
                    } else {
                        var old = utils.set(okv[1], okv[2])
                        context.send("set success and old: " + old)
                    }
                    break;
                case "/get":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var v0 = utils.get(okv[1])
                        sendToText("key: " + okv[1] + "\nvalue: " + v0, context)
                    }
                    break;
                case "/del":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var v0 = utils.del(okv[1])
                        context.send("del success! key: " + okv[1] + "\nvalue: " + v0)
                    }
                    break;
                case "/clear":
                    var n = utils.clear();
                    context.send("clear success and clear numbers: " + n)
                    break;
                case "/list":
                    var a = utils.list()
                    context.send(context.newPlainText(a.toString()))
                    break
                case "/kset":
                    if (okv.length !== 3) {
                        context.send("args size less 3")
                    } else {
                        var ksetOut = utils.requestGet("http://localhost/put?pwd=dg-3474006766&key=" + okv[1] + "&value=" + okv[2])
                        sendToText("set success : " + ksetOut, context)
                    }
                    break
                case "/kget":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var kgetOut = utils.requestGet("http://localhost/get?pwd=dg-3474006766&key=" + okv[1])
                        sendToText("get success : " + kgetOut, context)
                    }
                    break
                case "/kdel":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var kdelOut = utils.requestGet("http://localhost/del?pwd=dg-3474006766&key=" + okv[1])
                        context.send("del state : " + kdelOut + "! key:" + okv[1])
                    }
                    break
                case "/req-get":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var out = utils.requestGet(okv[1])
                        context.send("out :\n" + out)
                    }
                    break
                case "/adds":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var out = utils.requestGet("http://localhost/get?pwd=r&key=songs")
                        var arr = JSON.parse(out)
                        arr.push(okv[1])
                        var out = JSON.toJSONString(arr);
                        utils.requestGet("http://localhost/put?pwd=r&key=songs&value=" + out)
                        context.send("out :\n" + out)
                    }
                    break
                case "/eval":
                    eval(msg.substring(5).trim())
                    break
                case "/repeat":
                    if (okv.length !== 2) context.send("args size less 2")
                    context.send(okv[1])
                    break
                case "/version":
                    context.send(JSON.toJSONString(version))
                    break
            }
        }
    } else if (msg === "aiclear") {
        context.send(utils.requestGet(getAiUrl() + "/clear?id=3474006766"))
    } else if (msg.indexOf("kuaishou") > 0) {
        var urls = msg.match(urlReg)
        if (urls !== null) {
            var k0 = utils.get("pks0")
            if (k0 == null || k0) {
                utils.set("pks0", false)
                parseKuaishou(urls[0], context, utils);
                utils.set("pks0", true)
            } else {
                context.send("解析进行中...\n请等待解析结束后重试")
            }
        } else context.send("未发现链接")
    } else if (msg.indexOf("douyin") > 0) {
        var urls = msg.match(urlReg)
        if (urls !== null) {
            var url = urls[0];
            context.send("正在解析\n" + url)
            var result = JSON.parse(utils.requestGet("https://api.mu-jie.cc/douyin?url=" + url))
            parseVideoOrGallery(result, context, utils)
        } else context.send("未发现链接")
    } else if (msg.indexOf("https://www.bilibili.com/video/") >= 0) {
        var urls = msg.match(urlReg)
        if (urls !== null) {
            var url = urls[0];
            var e0 = url.indexOf("?");
            e0 = e0 > 0 ? e0 : url.length
            url = "https://api.xingzhige.com/API/b_parse/?url=" + url.substring(0, e0);
            var result = JSON.parse(utils.requestGet(url))

            context.send(context.forwardBuilder().add(context.getBot().getId(), "AI:", context.newPlainText("视频直链:" + result.data.video.url)).build())

            context.send(context.builder()
                .append(result.data.video.desc).append(context.uploadImage(result.data.video.fm))
                .append(context.newPlainText("BVID: " + result.data.bvid + " FROM: " + result.data.owner.name + "\n" + result.data.video.title))
                .append("\n=================\n").append("SOURCE: ").append("https://www.bilibili.com/video/" + result.data.bvid).build())
        }
    } else if (msg.startsWith("点歌")) {
        var name = msg.substring(2)
        var out = utils.requestGet("http://ovoa.cc/api/QQmusic.php?msg=" + encodeURI(name) + "&n=1&type=JSON")
        var jo = JSON.parse(out)
        if (jo.data != null)
            context.send("<music:QQMusic," + jo.data.songname + "," + jo.data.name + ",http://kloping.top/," + jo.data.cover + "," + jo.data.src + ">")
    } else if (msg.startsWith("ai:")) {
        sendToText(utils.requestGet(getAiUrl() + "?req=" + msg.substring(3) + "&id=3474006766"), context)
    } else if (msg.startsWith("gsai:")) {
        var jo = JSON.parse(utils.requestGet("https://api.lolimi.cn/API/AI/ys3.5.php?msg=" + msg.substring(3) + "&speaker=纳西妲"))
        context.send("<audio:" + jo.music + ">")
        sendToText(jo.msg, context)
    } else if (msg.startsWith("AI:")) {
        sendToText(utils.requestGet(getAiUrl() + "?req=" + encodeURI(msg.substring(3)) + "&id=3474006766"), context)
    } else if (msg.startsWith("翻译")) {
        context.send(utils.requestGet("http://ovoa.cc/api/ydfy.php?msg=" + msg.substring(2) + "&type=text&end="))
    }
}

if (context.getType() === "NudgeEvent") {
    var bid = event.getBot().getId()
    if (event.getFrom() === event.getBot()) {
        //主动戳出 不做处理
    } else if (event.getTarget().getId() === bid) {
        var r0 = utils.get("nc0")
        if (r0 == null) r0 = 1; else if (r0 > 4) r0 = 1;
        switch (r0) {
            case 1:
                event.getSubject().sendMessage(context.newPlainText("(T＿T)"))
                break;
            case 2:
                event.getSubject().sendMessage(context.newPlainText("有事么?￣へ￣"))
                break;
            case 3:
                event.getSubject().sendMessage(context.newPlainText("阿巴阿巴?(〃'▽'〃)"))
                break;
            case 4:
                event.getSubject().sendMessage(context.newPlainText("(｡ŏ_ŏ)走开"))
                break;
        }
        utils.set("nc0", r0 + 1)
        if (getRandomInt(1, 5) == 1) event.getFrom().nudge().sendTo(event.getSubject());
    }
}
version.dev = "24/1/29-0"