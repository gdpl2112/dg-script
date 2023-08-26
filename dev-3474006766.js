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
                    var ksetOut = utils.requestGet("http://kloping.top/put?pwd=dg-3474006766&key="+okv[1]+"&value="+okv[2])
                    context.send("set success : " + old)
                }
               break
        }
    }
}
/*
function getAtId(inStr) {
    var i1 = inStr.indexOf("<")
    var i2 = inStr.indexOf(">")
    if (i1 <= 0 || i2 <= 0) return null
    var at0 = inStr.substring(i1 + 1, i2)
    var args = at0.split(":")
    if (args[0] !== "at") {
        return null
    } else return Number(args[1])
}

if (context.getType() == "group" || context.getType() == "friend") {
    if (msg.startsWith("读")) {
        if (context.getSender().getId() == 2898304046) {
            var repeat = msg.substring(1)
            context.getSubject().sendMessage(repeat)
        }
    } else if (msg.startsWith("禁言")) {
        var qid = getAtId(msg)
        if (qid == null) {
            context.send("未发现AT")
        } else {
            context.getSubject().get(qid).mute(1)
        }
    }
})*/
//======================复述结束