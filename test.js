
var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  
function getAllNumber(str) {
    var out = ""
    for (var i = 0; i < str.length; i++) {
        var e = str[i]
        if (ns.indexOf(e)>0) {
            out = out + e
        }
    }
    if (out.length > 0) {
        return Number(out)
    } else {
        return -1
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