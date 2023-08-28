if (context.getType() == "group") {
    if (msg.startsWith(".禁言")) {
        var timeA = msg.substring(3).trim()
        var time = timeA.split(" ")
        var qid = Number(time[0])
        if (time[0].length !== 0) {
            if (time[1].length !== 0) {
                if (msg.endsWith("秒") || msg.endsWith("s") || msg.endsWith(" ")) {
                    var second = parseFloat(time[1])
                    context.getSubject().get(qid).mute(Number(second))
                }
                if (msg.endsWith("分") || msg.endsWith("m")) {
                    var minute = parseFloat(time[1])
                    var timeM = Number(minute * 60)
                    context.getSubject().get(qid).mute(Number(timeM))
                }
                if (msg.endsWith("小时") || msg.endsWith("h")) {
                    var hour = parseFloat(time[1])
                    var timeH = Number(hour * 3600)
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