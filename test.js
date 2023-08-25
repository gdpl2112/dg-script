if (msg.indexOf("<at:" + context.getBot().getId() + ">")){
    var beAt = context.getBot().getGroup(Number(868060057))
    beAt.sendMessage(
        context.newPlainText(
            "Bot（"+context.getBot().getId()+"）在群“"+context.getBot().getGroup().getName()+"“（"+context.getBot().getGroup().getId()+"）中被提到"
            )
        )
    beAt.send("该消息为\n"+msg)
}