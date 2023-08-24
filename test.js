if (context.getType() == "MemberMuteEvent") {
    event.getGroup().sendMessage(context.newPlainText(event.getMember().getNick() + "\(" + event.getMember().getId() + "\)" + "禁止说话" + event.getDurationSeconds() + "秒"))
}

if (context.getType() == "MemberUnmuteEvent") {
    var at = event.getMember().getId()
    //var atA = context.deSerialize("<at:" + at + ">")
    //==== context.deSerialize 返回的对象是Message 不能拼接字符串
    //event.getGroup().sendMessage(atA + "被解除禁言了")
    var out = context.deSerialize("<at:" + at + ">\n被解除禁言了")
    event.getGroup().sendMessage(out)
}
//========================================获取禁言事件

if (context.getType() == "BotMuteEvent") {
    var bemute = context.getBot().getGroup(Number(868060057))
    bemute.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + event.getGroup().getName() + "”（" + event.getGroup().getId() + "）中被禁言" + "\n禁言时长为：" + event.getDurationSeconds() + "秒" + "\n操作者为" + event.getGroup().getMember().getName() + "（" + event.getGroup().getMember().getId() + "）"))
}
//=========================================获取Bot被禁言，在群868060057中提示