var kick_state = utils.get("kicker_state")
if (kick_state !== null || kick_state == true) {
    var qunid2 = utils.get("qunid1")
    var tid2 = utils.get("tid1")
    var tips = msg
    context.getSubject(qunid2).get(tid2).kick(tips)
    utils.set("kicker_state", false)
} else if (msg.startsWith("kick")) {
    var tid = getAtId(msg)
    var qunid = context.getSubject()
    if (tid == null) {
        context.send("未发现at")
    } else {
        utils.set("kicker_state", true)
        utils.set("tid1", tid)
        utils.set("qunid1",qunid)
        context.send("请输入踢出原因")
    }
}
//============================================kick结束