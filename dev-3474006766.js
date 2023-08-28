if (context.getType() == "group") {
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
                    context.send("set success : " + kgetOut)
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
        }
    }
}

//完善
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

function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end)
    else return null
}

function getAllNumber(str, df) {
    var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var out = ""
    for (var i = 0; i < str.length; i++) {
        var e = str[i]
        if (ns.includes(e)) {
            out = out + e
        }
    }
    if (out.length > 0) {
        return Number(out)
    } else {
        return df
    }
}

if (context.getType() == "group" || context.getType() == "friend") {
    if (msg.startsWith("上传") || msg.startsWith("upload")) {
        var iid = getFormatValue("pic", msg)
        if (iid == null) {
            context.send("未发现图片")
        } else {
            var iurl = utils.queryUrlFromId(iid)
            iurl = encodeURI(iurl)
            var out = utils.requestGet("http://kloping.top/transImg?type=url&url=" + iurl)
            context.send("upload finish: " + out)
        }
    }
}


if (context.getType() == "group") {
    if (msg.startsWith(".禁言")) {
        var qid = getAtId(msg)
        if (qid == null) {
            var b = getAllNumber(msg.replace(qid, ""), 1)
            if (msg.endsWith("秒") || msg.endsWith("s") || msg.endsWith(" ")) {
                context.getSubject().get(qid).mute(b)
            } else if (msg.endsWith("分") || msg.endsWith("m")) {
                var timeM = Number(b * 60)
                context.getSubject().get(qid).mute(timeM)
            } else if (msg.endsWith("小时") || msg.endsWith("h")) {
                var timeH = Number(b * 3600)
                context.getSubject().get(qid).mute(timeH)
            }
        } else {
            context.send("未发现at")
        }
    }
}
//===============================================================禁言结束