
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

if (context.getType() == "group") {
    if (msg.startsWith(".禁言")) {
        var timeA = msg.substring(3).trim()
        var time = timeA.split(" ")
        var qid = Number(time[0])
        if (time[0].length !== 0) {
            if (time[1].length !== 0) {
                var b = getAllNumber(time[1], 1)
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
                context.send("未检测到时长")
            }
        } else {
            context.send("未发现at")
        }
    }
}
//===============================================================禁言结束