function onBotEvent(event) {
    if (event.class.getSimpleName() === "NudgeEvent") {
        var bid = event.getBot().getId()
        var tid = event.getTarget().getId()
        var fid = event.getFrom().getId()
        if (fid === bid) return;
        if (tid === bid) {
            var bot = event.getBot()
            if (event.getSubject() instanceof Java.type('net.mamoe.mirai.contact.Group')) {
                bot.executeAction("group_poke", "{\"user_id\": " + fid + ",\"group_id\": " + event.getSubject().getId() + "}");
            }
        }
    }
}

function onSendLiked(event) {
    if (event.ok) {
        var f0 = bot.getFriend(event.operatorId);
        if (f0 != null)
            f0.sendMessage("[自动回复] '小祁'已经成功给你点赞啦!")
    }
}