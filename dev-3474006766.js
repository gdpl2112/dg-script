if (context.getType() === "group") msg = msg.trim()
//完善
function getFormatValue(fk, inStr) {
    var i1 = inStr.indexOf("<")
    var i2 = inStr.indexOf(">")
    if (i1 < 0 || i2 <= 0) return null
    var format0 = inStr.substring(i1 + 1, i2)
    var args = format0.split(":")
    if (args[0] !== fk) {
        if (i2 <= inStr.length) return getFormatValue(fk, inStr.substring(i2 + 1))
        else return null
    } else return args[1]
}

function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end); else return null
}

function getTextFromOcr(url) {
    var json = utils.requestGet("http://kloping.top/api/ocr?url=" + url)
    var jo = JSON.parse(json)
    return jo.data.ParsedText
}

function isStartOrEndWith(msg, key) {
    return (msg.startsWith(key) || msg.endsWith(key))
}

function getImageUrlAll(msg) {
    var iid = getFormatValue("pic", msg)
    if (iid == null) {
        var msgId = getFormatValue("qr", msg)
        if (msgId === null) {
            return null
        } else {
            var msgc = context.getMessageChainById(msgId)
            var msgcs = utils.serialize(msgc)
            iid = getFormatValue("pic", msgcs)
            if (iid == null) {
                return null
            } else {
                return utils.queryUrlFromId(iid)
            }
        }
    } else {
        return utils.queryUrlFromId(iid)
    }
}

function sendToText(out) {
    var max = 600
    out = out.toString()
    if (out.length >= max) {
        var builder = context.forwardBuilder()
        while (out.length >= max) {
            var e = out.substring(0, max)
            out = out.substring(max)
            builder.add(context.getBot().getId(), "AI", context.newPlainText(e.trim()))
        }
        if (out.length > 0) builder.add(context.getBot().getId(), "AI", context.newPlainText(out.trim()))
        context.send(builder.build())
    } else {
        context.send(context.newPlainText(out))
    }
}

function debugLog(msg) {
    context.getBot().getGroup(696516964).sendMessage(context.newPlainText(msg))
}

if (context.getType() == "group") {
    var sid = context.getSender().getId();
    var tid = context.getSubject().getId();
    // utils.executeSql("CREATE TABLE IF NOT EXISTS `msg_list` (`sid` BIGINT NOT NULL,`tid` BIGINT NOT NULL,`msg` VARCHAR(1024) NOT NULL,`time` VARCHAR(255) NOT NULL)")
    utils.executeSql("INSERT INTO `msg_list` (`sid`, `tid`, `msg`, `time`) VALUES (" + sid + ", " + tid + ", '" + msg + "', '" + new Date().getTime() + "');")
    if (tid == 868060057 || tid == 696516964) {
        if (msg == "扫码帮助") {
            context.send("不填就是群的可选，1为qun.qq.com，2为vip.qq.com，3为qzone.qq.com，4为huifu.qq.com，5为id.qq.com，6为docs.qq.com，7为connect.qq.com")
        } else if (msg.startsWith("扫码登录")) {
            var result0 = JSON.parse(utils.requestGet("http://api.wuxixindong.cn/api/qqrcode.php?type=" + msg.substring(4)))
            utils.set(sid, result0.qrsig)
            context.send("<pic:" + result0.url + ">")
        } else if (msg == "完成" || msg == "ok") {
            var qrsig = utils.get(sid)
            if (qrsig != null) {
                var result1 = JSON.parse(utils.requestGet("https://api.wuxixindong.cn/api/qqrcode.php?qrsig=" + qrsig))
                context.send(result1.text + "\n" + JSON.stringify(result1.data))
            }
        }
    }
    if (sid == 3474006766) {
        if (msg.startsWith("/")) {
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
                        context.send("key: " + okv[1] + "\nvalue: " + v0)
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
                        var ksetOut = utils.requestGet("http://kloping.top/put?pwd=dg-3474006766&key=" + okv[1] + "&value=" + okv[2])
                        context.send("set success : " + ksetOut)
                    }
                    break
                case "/kget":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var kgetOut = utils.requestGet("http://kloping.top/get?pwd=dg-3474006766&key=" + okv[1])
                        context.send("get success : " + kgetOut)
                    }
                    break
                case "/kdel":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var kdelOut = utils.requestGet("http://kloping.top/del?pwd=dg-3474006766&key=" + okv[1])
                        context.send("del state : " + kdelOut + "! key:" + okv[1])
                    }
                    break
                case "/open":
                    context.send(utils.executeSql("UPDATE 'mk' SET 'k'=0 WHERE `tid`=" + tid))
                    break
                case "/close":
                    context.send(utils.executeSql("UPDATE 'mk' SET 'k'=1 WHERE `tid`=" + tid))
                    break
                case "/req-get":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var out = utils.requestGet(okv[1])
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
                case "/sql":
                    context.send(utils.executeSql(msg.substring(4)))
                    break
                case "/sqls":
                    sendToText(utils.executeSelectList(msg.substring(5)))
                    break
                case "/sqlso":
                    sendToText(utils.executeSelectOne(msg.substring(6)))
                    break
                case "/test":
                    break
            }
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAiUrl() {
    return "http://kloping.top/api/ai"
}

if (context.getType() === "group" || context.getType() === "friend") {
    if (context.getSender().getId() == context.getBot().getId() || context.getSender().getId() == 2898304046) {
        if (isStartOrEndWith(msg, "上传") || isStartOrEndWith(msg, "upload")) {
            var iurl = getImageUrlAll(msg)
            if (iurl != null) {
                iurl = encodeURI(iurl)
                var out = utils.requestGet("http://kloping.top/transImg?type=url&url=" + iurl)
                context.send("upload finish: " + out)
            } else context.send("未发现图片")
        } else if (isStartOrEndWith(msg, "query")) {
            var iurl = getImageUrlAll(msg)
            if (iurl != null)
                context.send(iurl)
            else
                context.send("未发现图片")
        } else if (isStartOrEndWith(msg, "识别")) {
            var iurl = getImageUrlAll(msg)
            if (iurl != null) {
                iurl = encodeURI(iurl)
                var out = getTextFromOcr(iurl)
                if (out != null) {
                    context.send(out)
                } else context.send("识别失败")
            } else context.send("未发现图片")
        } else if (msg === "aiclear") {
            context.send(utils.requestGet(getAiUrl() + "/clear?id=3474006766"))
        }
    }
    var tid = context.getSubject().getId();
    // utils.executeSql("CREATE TABLE IF NOT EXISTS `mk` (`tid` BIGINT NOT NULL,  `k` TINYINT NOT NULL DEFAULT '0')")
    var k = utils.executeSelectOne("SELECT k FROM `mk` WHERE `tid`=" + tid)
    // debugLog(tid + " out: " + k)
    if (k === null) {
        utils.executeSql("INSERT INTO `mk` (`tid`) VALUES (" + tid + ");")
        k = {"k": 0}
    }
    if (k.k !== 0) throw SyntaxError("end")
    if (msg.indexOf("douyin") > 0 || msg.indexOf("kuaishou") > 0) {
        var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        var urls = msg.match(reg)
        if (urls !== null) {
            var url = urls[0];
            var result = JSON.parse(utils.requestGet("https://api.xtaoa.com/api/video_v1.php?url=" + url))
            if (result.code == 200) {
                if (result.type == "图集") {
                    context.send("解析成功!\n数量:" + result.images.length + "\n正在发送,请稍等..")
                    var arr = result.images
                    var builder = context.forwardBuilder();
                    for (var i = 0; i < arr.length; i++) {
                        var e = arr[i];
                        if (e.endsWith(".webp")) e = e.replace(".webp", ".jpg")
                        builder.add(context.getBot().getId(), "AI", context.uploadImage(e))
                    }
                    context.send(builder.build())
                } else {
                    context.send("作者: " + result.name + "\n" + result.desc)
                    context.send(context.forwardBuilder().add(context.getBot().getId(), "AI:", context.newPlainText("视频直链: " + result.video)).build())
                }
            } else context.send("解析失败!\ncode:" + result.code)
        } else context.send("未发现链接")
    } else if (msg.indexOf("https://www.bilibili.com/video/") >= 0) {
        var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        var urls = msg.match(reg)
        if (urls !== null) {
            var url = urls[0];
            var e0 = url.indexOf("?");
            e0 = e0 > 0 ? e0 : url.length
            url = "https://api.xingzhige.com/API/b_parse/?url=" + url.substring(0, e0);
            var result = JSON.parse(utils.requestGet(url))
            var builder = context.builder()
            builder
                .append(context.newPlainText(result.data.video.desc))
                .append(context.uploadImage(result.data.video.fm))
                .append(context.newPlainText("BVID: " + result.data.bvid + " FROM: " + result.data.owner.name + "\n" + result.data.video.title))
                .append("\n=================\n")
                .append("SOURCE: ").append("https://www.bilibili.com/video/" + result.data.bvid)
            context.send(builder.build())
            context.send(context.forwardBuilder().add(context.getBot().getId(), "AI:", context.newPlainText("视频直链:" + result.data.video.url)).build())
        }
    } else if (msg.startsWith("语音合成")) {
        var okv = msg.split(" ");
        var u0 = "http://ovoa.cc/api/yuanshen.php?message=" + okv[2] + "&key=123456&figure=" + okv[1];
        var json1 = utils.requestGet(u0)
        var d0 = JSON.parse(json1)
        // context.send("<audio:http://kloping.top/api/mp32amr?url=" + d0.url + ">")
        context.send("<audio:" + d0.url + ">")
    } else if (msg.startsWith("点歌")) {
        var name = msg.substring(2)
        var out = utils.requestGet("https://xiaoapi.cn/API/yy.php?type=qq&msg=" + name + "&n=1")
        var outs = out.split("\n")
        context.send("<Music:QQMusic," + outs[1].substring(3) + "," + outs[2].substring(3) + ",http://47.100.93.243:34740/," + outs[0].substring(3) + "," + outs[3].substring(5) + ">")
    } else if (msg.startsWith("ai:")) {
        sendToText(utils.requestGet(getAiUrl() + "?req=" + msg.substring(3) + "&id=3474006766"))
    } else if (msg.startsWith("gsai:")) {
        var jo = JSON.parse(utils.requestGet("https://api.lolimi.cn/API/AI/ys3.5.php?msg=" + msg.substring(3) + "&speaker=纳西妲"))
        context.send("<audio:http://kloping.top/api/mp32amr?url=" + jo.music + ">")
        sendToText(jo.msg)
    } else if (msg.startsWith("AI:")) {
        sendToText(utils.requestGet(getAiUrl() + "?req=" + encodeURI(msg.substring(3)) + "&id=3474006766"))
    } else if (msg.startsWith("翻译")) {
        context.send(utils.requestGet("http://ovoa.cc/api/ydfy.php?msg=" + msg.substring(2) + "&type=text&end="))
    } else if (msg.startsWith("捅")) {
        var aid = getAtId(msg)
        if (aid != null) context.send("<pic:" + utils.requestGet("http://kloping.top/api/image/tong?q1=" + context.getSender().getId() + "&q2=" + aid) + ">")
    } else if (msg.startsWith("摇")) {
        context.send("<pic:" + utils.requestGet("http://kloping.top/api/image/yao2yao?qid=" + context.getSender().getId() + ">"))
    } else if (msg === ("锤") || msg === ("捶")) {
        context.send("<pic:https://api.andeer.top/API/gif_thump.php?qq=" + context.getSender().getId() + ">")
    } else if (msg === ("趴")) {
        context.send("<pic:https://api.xingzhige.com/API/grab/?qq=" + context.getSender().getId() + ">")
    } else if (msg === ("贴")) {
        context.send("<pic:https://api.xingzhige.com/API/baororo/?qq=" + context.getSender().getId() + ">")
    } else if (msg === ("打")) {
        context.send("<pic:https://api.xingzhige.com/API/pound/?qq=" + context.getSender().getId() + ">")
    } else if (msg === "喵") {
        var senderId = context.getSender().getId();
        var imageUrl = "https://api.xingzhige.com/API/FortuneCat/?qq=" + senderId;
        context.send(context.uploadImage(imageUrl));
    } else if (msg.endsWith("发病")) {
        var out = utils.requestGet("https://api.lolimi.cn/API/fabing/fb.php?name=" + msg.replace("发病", ""));
        var jo = JSON.parse(out)
        context.send(jo.data)
    } else if (msg == "柴郡") {
        context.send(context.forwardBuilder()
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/chaiq/c.php"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/chaiq/c.php"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/chaiq/c.php"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/chaiq/c.php"))
            .build())
    } else if (msg == "原神壁纸") {
        context.send(context.forwardBuilder()
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/yuan/?type=image"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/yuan/?type=image"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/yuan/?type=image"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/yuan/?type=image"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/yuan/?type=image"))
            .add(context.getBot().getId(), "AI:", context.uploadImage("https://api.lolimi.cn/API/yuan/?type=image"))
            .build())
    } else if (msg == "涩图" || msg == "来点涩图") {
        context.send("<pic:https://api.anosu.top/img?sort=setu>")
    } else if (msg == "涩图r18") {
        //未成年不许看
        var u0 = utils.get("r18-u0")
        if (u0 == null) {
            u0 = utils.requestGet("https://api.lolimi.cn/API/sho_u/?msg=呜啊啊呜啊呜呜～啊～啊呜～呜呜～～～～嗷～呜呜呜～啊～嗷嗷嗷～啊呜啊～啊啊嗷嗷啊啊啊啊啊啊嗷呜呜～啊嗷～嗷嗷呜嗷嗷～嗷呜呜呜嗷啊呜～呜啊呜嗷嗷呜啊～啊呜～嗷呜啊～～啊呜～嗷啊啊嗷～～～嗷呜嗷嗷嗷～啊呜&format=1")
            utils.set("r18-u0", JSON.parse(u0).data.Message)
        }
        context.getSender().sendMessage(context.forwardBuilder()
            .add(context.getBot().getId(), "AI:", utils.requestGet("http://kloping.top/transImg?type=url&url=" + u0))
            .build())
    }
}

if (context.getType() == "NudgeEvent") {
    var bid = event.getBot().getId()
    if (event.getFrom() == event.getBot()) {
        //主动戳出 不做处理
    } else if (event.getTarget().getId() == bid) {
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
//23/10/20-12.02