if (context.getType() == "group") {
    if (msg.startsWith(".禁言")) {
        var timeA = msg.substring(3).trim()
        var time = timeA.split(" ")
        var qid = time[0]
        if (time[0] !== null) {
            if (time[1] !== null) {
                if (msg.endsWith("秒") || msg.endsWith("s") || msg.endsWith(" ")) {
                    context.getSubject().get(qid).mute(Number(time[1]))
                }
                if (msg.endsWith("分") || msg.endsWith("m")) {
                    var timeM = Number(time[1] * 60)
                    context.getSubject().get(qid).mute(timeM)
                }
                if (msg.endsWith("小时") || msg.endsWith("h")) {
                    var timeH = Number(time[1] * 3600)
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