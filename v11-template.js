// 更新时间 2025/07/30.11
if (typeof subType !== 'undefined') {
    if (subType === "profile_like") {
        var f = bot.getFriend(event.getOperatorId())
        f.sendMessage("收到你的点赞了")
    } else if (subType === "send_liked") {
        var f = bot.getFriend(event.getOperatorId())
        if (event.ok) {
            f.sendMessage("点赞成功")
        } else {
            f.sendMessage("点赞失败")
        }
    }else if (subType === "group_sign"){
        var g = bot.getGroup(event.getGid())
        g.sendMessage("该群打卡成功")
    }
}
