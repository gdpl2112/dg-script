//dg-2898304046-player_state 玩家注册状态
//dg-2898304046-player_name 玩家name
//dg-2898304046-player_gender 玩家性别
//dg-2898304046-player_strength 玩家数值


if (msg == "cache") {
    utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-player_state&key=")
    utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-player_name&key=")
    utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-player_gender&key=")
    utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-player_strength&key=")
    context.send("clear all")
}


if (msg.startsWith("注册")) {
    var playerId = context.getSender().getId()
    var player_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-player_state&key=" + playerId)
    if (player_state == "true") {
        context.send("您已注册，请发送个人信息查看")
    } else {
        var player_regist = msg.substring(2).trim()
        var player_regist_information = player_regist.split(" ")
        var beginStrength = Math.floor(Math.random() * (100 - 10 + 1)) + 10
        var player_name = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-player_name&key=" + playerId + "&value=" + player_regist_information[0])
        var player_gender = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-player_gender&key=" + playerId + "&value=" + player_regist_information[1])
        var player_beginStrength = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-player_strength&key=" + playerId + "&value=" + beginStrength)
        context.send("注册成功！\n您的昵称为：" + player_regist_information[0] + "\n您的性别为：" + player_regist_information[1] + "\n您的战力为：" + beginStrength)
        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-player_state&key=" + context.getSender().getId() + "&value=true")
    }
}

if (msg == "打坐") {
    var playerId = context.getSender().getId()
    var getPlayerStrength = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-player_strength&key=" + playerId)
    var deltaPlayerStrength = Math.floor(Math.random() * (200 - -100 + 1)) + -100
    var endPlayerStrength = Number(getPlayerStrength) + Number(deltaPlayerStrength)
    var playerStrength = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-player_strength&key=" + playerId + "&value=" + endPlayerStrength)
    context.send("您增加了" + endPlayerStrength + "点战力")
}

if (msg = "个人信息") {
    var playerId = context.getSender().getId()
    var subject = context.getSubject()
    var state = utils.requestGet("http://kloping.top/geet?pwd=dg-2898304046-player_state&key=" + playerId)
    if (state = "true") {
        var name = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-player_name&key=" + playerId)
        var gender = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-player_gender&key=" + playerId)
        var strength = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-player_strength&key=" + playerId)
        context.send("您的昵称：" + name + "\n您的性别：" + gender + "\n您的战力:" + strength)
    } else {
        context.send("请发送注册+（空格）+昵称+（空格）+性别 进行注册")
    }
}