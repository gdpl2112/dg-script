if (msg.indexOf("<at:" + context.getBot().getId() + ">") >= 0) {
    var group = context.getBot().getGroup(Number(868060057))
    var tg = context.getSubject()
    var sn = context.getSender().getNameCard()
    if (sn === null || sn === "") {
        sn = context.getSender().getNick()
    }
    group.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "”（" + tg.getId() + "）中被"
        + sn + "（" + context.getSender().getId() + "）提到"))
    group.sendMessage(context.deSerialize(("该消息为:\n" + msg)))
}
//=======================================如果Bot被提到，则转发至群
//=======================================if msg检测到图片 则将jpg转化为图片发出 但是报错