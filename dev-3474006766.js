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

function getFormatValue(fk, inStr) {
    var i1 = inStr.indexOf("<")
    var i2 = inStr.indexOf(">")
    if (i1 <= 0 || i2 <= 0) return null
    var at0 = inStr.substring(i1 + 1, i2)
    var args = at0.split(":")
    if (args[0] !== fk) {
        return null
    } else return args[1]
}


function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end)
    else return null
}

if (context.getType() == "group" || context.getType() == "friend") {
    if (msg.startsWith("上传") || msg.startsWith("upload")) {
        var iid = getFormatValue("pic", msg)
        if (iid == null) {
            context.send("未发现图片")
        } else {
            var iurl = utils.queryUrlFromId(iid)
            iurl = encodeURI(iurl)
            //var out = utils.requestGet("http://kloping.top/transImg2?url=" + iurl)
            var out = utils.requestGet("https://api.uomg.com/api/image.baidu?imgurl=" + iurl)
            context.send("upload finish: " + out)
        }
    }
}