if (msg.indexOf("<at:" + context.getBot().getId() + ">")){
    var group = context.getBot().getGroup(Number(868060057))
    group.sendMessage(
        context.newPlainText(
            "Bot（"+context.getBot().getId()+"）在群“"+context.getBot().getGroup().getName()+"“（"+context.getBot().getGroup().getId()+"）中被提到"
            )
        )
    group.sendMessage("该消息为\n"+msg)
}