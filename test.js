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
//======================================禁言报错为 mute不对





if (msg.indexOf("<at:" + context.getBot().getId() + ">") >= 0) {
    var group = context.getBot().getGroup(Number(868060057))
    var tg = context.getSubject()
    if (context.getSender().getNameCard !== null) {
        group.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "”（" + tg.getId() + "）中被" + context.getSender().getNameCard() + "（" + context.getSender().getId() + "）提到"))
        group.sendMessage("该消息为:\n" + msg)
    } else if (context.getSender().getNameCard == null) {
        group.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "”（" + tg.getId() + "）中被" + context.getSender().getNick() + "（" + context.getSender().getId() + "）提到"))
        group.sendMessage("该消息为:\n" + msg)
    }
}
//=======================================如果Bot被提到，则转发至群
//===============================问题是 如果namecard不为null 他也不会get namecard