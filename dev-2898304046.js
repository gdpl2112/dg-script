if (context.getType() == "group" || context.getType() == "friend") {
    if (msg.startsWith("喜报")) {
        context.send(context.uploadImage("https://api.andeer.top/API/img_xibao.php?data=" + msg.substring(2)));
    }
    //====================喜报结束


    if (msg.startsWith("甘雨抱抱你")) {
        context.send(context.uploadImage("https://api.andeer.top/API/img_love.php?qq=" + msg.substring(5)));
    }
    //====================甘雨抱抱你结束


    if (msg.startsWith("百度")) {
        var end = encodeURI(msg.substring(2));
        context.send("https://m.baidu.com/s?word=" + end);
    }
    //================百度结束


    if (msg.startsWith("网易云热评")) {
        var review = JSON.parse(context.requestGet("https://api.andeer.top/API/wangyi.php" + msg.substring(5)));
        context.send(review.data);
    }
    //=================网易云热评结束

    var upm = utils.get("upm")
    if (upm !== null && msg == upm) {
        context.send(msg);
    } else {
        utils.set("upm", msg)
    }
    //=====================================跟读结束

    if (context.getSender().getId() == 2898304046) {
        if (msg.startsWith("发送私信")) {
            context.send("已发送")
            var message = msg.substring(4)
            context.getSender().sendMessage(message)
        }
        //==================发送私信结束

        if (msg.startsWith("复述")) {
            context.send("ok")
            var repeat = msg.substring(2)
            context.getSubject().sendMessage(repeat)
        }
        //======================复述结束

        if (msg.startsWith("传话")) {
            context.send("正在发送...请稍后")
            var args = msg.split(" ")
            var tar = context.getBot().getFriend(Number(args[1]));
            tar.sendMessage(args[2])
            context.send("发送完成")
        }
        //=============================传话结束

        if (msg.startsWith("群传话")) {
            context.send("正在发送...请稍后")
            var args = msg.split(" ")
            var tar = context.getBot().getGroup(Number(args[1]));
            tar.sendMessage(args[2])
            context.send("发送完成")
        }
        //=============================群传话结束

        if (msg == "clear") {
            utils.clear()
            context.send("清除完成")
        }
        //==============================清除所有变量完成

        if (msg.startsWith("del")) {
            var del = msg.substring(3)
            if (del.length == 0) {
                context.send("请输入变量名！")
            } else if (context.get(del) == null) {
                context.send("未找到该变量！")
            } else {
                utils.del(del)
                context.send("删除完成！")
            }
        }
        //=================================删除变量完成

        if (msg.startsWith("set")) {
            var createA = msg.substring(3).trim()
            var create = createA.split(" ")
            if (create[0].length == 0) {
                context.send("请输入需创建的变量名！")
            } else if (create[1].length == 0) {
                context.send("请输入变量值！")
            } else {
                utils.set(create[0], create[1])
                context.send("创建成功")
            }
        }
        //===================================创建变量结束

        if (msg.startsWith("get")) {
            var name = msg.substring(3).trim()
            if (name.length == 0) {
                context.send(请输入变量名)
            } else {
                var value = utils.get(name)
                context.send(name + " : " + value)
            }
        }
        //=====================================获取变量结束

        if (msg == "list") {
            var listA = utils.list()
            context.send(context.newPlainText(listA.toString()))
        }
        //=====================================列出变量结束
    }
}

if (context.getType() == "MemberMuteEvent") {
    event.getGroup().sendMessage(context.newPlainText(event.getMember().getNick() + "被禁言了"))
}

if (context.getType() == "MemberUnmuteEvent") {
    event.getGroup().sendMessage(context.newPlainText(event.getMember().getNick() + "被解除禁言了"))
}

