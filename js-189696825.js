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

function onMsgEvent(msg, event) {
    if (event.class.getSimpleName() === "GroupMessageSyncEvent") {
        if (msg.startsWith("撤回")) {
            var bot = event.getBot()
            var bid = bot.getId()
            // var sid = event.getSender().getId()
            var k = true
            // var k = sid == bid
            // log.log("撤回权限: " + k)
            if (k) {
                var gid = event.getSubject().getId()
                var msq = event.getSource().getIds()[0];
                // 获取msg所有数字
                var tid = msg.match(/\d+/g).join("");
                log.log(bid + "->即将撤回:" + tid)
                var dataAll = bot.executeAction("get_group_msg_history", "{\n" +
                    "  \"group_id\": \"" + gid + "\",\n" +
                    "  \"message_seq\": \"" + msq + "\",\n" +
                    "  \"count\": 100,\n" +
                    "  \"reverseOrder\": true\n" +
                    "}")
                var dataPack = JSON.parse(dataAll)
                var data = dataPack.data
                var msgs = data.messages
                msgs.reverse()
                var rc = 0
                for (var i = 0; i < msgs.length; i++) {
                    var msg0 = msgs[i]
                    if (msg0.user_id == tid) {
                        var res = bot.executeAction("delete_msg", "{\"message_id\": \"" + msg0.message_seq + "\"}")
                        var resd = JSON.parse(res)
                        if (resd.status === "ok") {
                            rc++
                            log.log("撤回成功:rc=" + rc)
                        }
                    }
                    if (rc >= 20) break;
                }
            }
        }
    }
}

function onSendLiked(event) {
    // if (event.ok) {
    //     var f0 = bot.getFriend(event.operatorId);
    //     if (f0 != null)
    //         f0.sendMessage("[自动回复] '小祁'已经成功给你点赞啦!")
    // }
}