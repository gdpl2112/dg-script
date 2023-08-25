if (msg.indexOf("<at:" + context.getBot().getId() + ">") >= 0) {
    var group = context.getBot().getGroup(Number(868060057))
    var tg = context.getSubject()
    group.sendMessage(
        context.newPlainText(
            "Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "“（" + tg.getId() + "）中被提到"
        )
    )
    group.sendMessage("该消息为\n" + msg)
}