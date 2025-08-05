function getRandomNumber(minNum, maxNum) {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

function onBotEvent(event) {
    if (event.class.getSimpleName() === "NudgeEvent") {
        var bid = event.getBot().getId()
        var tid = event.getTarget().getId()
        var fid = event.getFrom().getId()
        if (fid === bid) return;
        if (tid === bid) {
            var randomReply = getRandomNumber(1, 5)
            switch (randomReply) {
                case 1:
                    event.getSubject().sendMessage("不要再戳辣>ᯅ<在戳就坏惹！")
                    break
                case 2:
                    event.getSubject().sendMessage("戳戳戳！就知道戳！服啦")
                    break
                case 3:
                    event.getSubject().sendMessage("戳我是想我的意思嘛~嘻嘻")
                    break
                case 4:
                    event.getSubject().sendMessage("反击!")
                    var bot = event.getBot()
                    if (event.getSubject() instanceof Java.type('net.mamoe.mirai.contact.Group')) {
                        bot.executeAction("group_poke", "{\"user_id\": " + event.getFrom().getId() + ",\"group_id\": " + event.getSubject().getId() + "}");
                    } else {
                        bot.executeAction("friend_poke", "{\"user_id\": " + event.getFrom().getId() + "}");
                    }
                    break
                case 5:
                    event.getSubject().sendMessage("偷偷摸摸的ヾ(ﾟ∀ﾟゞ)系不系暗恋窝鸭")
                    break
            }
        }
    }
}
