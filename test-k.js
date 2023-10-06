if (get_manage_state() == "true") {
    if (get_admin() == "true") {
        //禁言
        if (msg.startsWith("默禁言")) {
            var qid = getAtId(msg)
            if (qid == null) {
                context.send("未发现at")
            } else {
                var b = getAllNumber(msg.replace(qid, ""))
                if (msg.endsWith("秒") || msg.endsWith("s") || msg.endsWith(" ")) {
                    context.getSubject().get(qid).mute(b)
                } else if (msg.endsWith("分") || msg.endsWith("m")) {
                    var timeM = Number(b * 60)
                    context.getSubject().get(qid).mute(timeM)
                } else if (msg.endsWith("小时") || msg.endsWith("h")) {
                    var timeH = Number(b * 3600)
                    context.getSubject().get(qid).mute(timeH)
                }
            }
        }

        //解除禁言
        if (msg.startsWith("默解除禁言")) {
            var qid = getAtId(msg)
            if (qid !== null) {
                context.getSubject().get(qid).unmute()
            }
        }
    }
}