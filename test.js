//程序验证
//msg=.禁言 123456 1秒
if (context.getType() == "group") {
    if (msg.startsWith(".禁言")) {
        var timeA = msg.substring(3).trim()
        var time = timeA.split(" ")
        //time=[123456,1秒]   str数组 元素均为str
        var qid = time[0]
        //qid=123456
        if (time[0] !== null) {
            //逻辑错误
            if (time[1] !== null) {
                //1秒 != null
                if (msg.endsWith("秒") || msg.endsWith("s") || msg.endsWith(" ")) {
                    //如果符合条件=============================↓↓↓↓↓↓↓ time[1] = 1秒
                    // "1秒" 无法 转Number 所有返回null (报错原因)
                    context.getSubject().get(qid).mute(Number(time[1]))
                }
                if (msg.endsWith("分") || msg.endsWith("m")) {
                    var timeM = Number(time[1] * 60)
                    //==========↑↑↑↑↑↑与上一样  str 不可与数字运算符运算
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
    
    var sn = context.getSender().getNameCard()
    if (sn === null || sn === "") {
        sn = context.getSender().getNick()
    }
    
    group.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "”（" + tg.getId() + "）中被"
        + sn + "（" + context.getSender().getId() + "）提到"))
    group.sendMessage("该消息为:\n" + msg)
}
//=======================================如果Bot被提到，则转发至群
//===============================问题是 如果namecard不为null 他也不会get namecard