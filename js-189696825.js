function onBotEvent(event, utils) {
    if (event.class.getSimpleName() === "NudgeEvent") {
        var bid = event.getBot().getId()
        var tid = event.getTarget().getId()
        var fid = event.getFrom().getId()
        if (fid === bid) return;
        if (tid === bid) {
            var bot = event.getBot()
            if (event.getSubject() instanceof Java.type('net.mamoe.mirai.contact.Group')) {
                bot.executeAction("group_poke", "{\"user_id\": " + event.getFrom().getId() + ",\"group_id\": " + event.getSubject().getId() + "}");
            }
        }
    }
}
