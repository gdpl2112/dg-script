if (utils.getType() === "group") {
  if (msg.startsWith("解析快手图集")) {
        if (utils.getType() === "group") {
            var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
            var urls = msg.match(reg)
            if (urls !== null) {
                context.send("正在解析...\n请稍等")
                var u0 = encodeURI(urls[0]);
                var arr = JSON.parse(utils.requestGet("http://kloping.top/api/search/parseImgs?url=" + u0 + "&type=ks"))
                var builder = context.forwardBuilder();
                for (var i = 0; i < arr.length; i++) {
                    var e = arr[i];
                    builder.add(utils.getBot().getId(), "AI", context.uploadImage(e))
                }
                context.send(builder.build())
            } else {
                context.send("未发现链接")
            }
        } else {
            context.send("命令仅适用群聊")
        }
    }
    //====================解析结束
    if (msg.startsWith("百度")) {
        var end = encodeURI(msg.substring(2));
        context.send("https://m.baidu.com/s?word=" + end);
    }
    //================百度结束
    if (msg.startsWith("网易云热评")) {
        var review = JSON.parse(utils.requestGet("https://api.andeer.top/API/wangyi.php" + msg.substring(5)));
        context.send(review.data);
    }
    //=================网易云热评结束
    if (msg.startsWith("甘雨抱抱你")) {
        context.send(context.uploadImage("https://api.andeer.top/API/img_love.php?qq=" + msg.substring(5)));
    }
    //====================甘雨抱抱你结束
    if (msg.startsWith("发送私信")) {
        context.send("已发送")
        var message = msg.substring(4)
        utils.getSender().sendMessage(message)
    }
    //======================发送私信结束
    if (msg.startsWith("跟我说")) {
        context.send("ok")
        var repeat = msg.substring(2)
        utils.getSubject().sendMessage(repeat)
    }
    //======================复述结束
    if (msg.startsWith("传话")) {
        context.send("正在发送...请稍后")
        var args = msg.split(" ")
        var tar = utils.getBot().getFriend(Number(args[1]));
        tar.sendMessage(args[2])
        context.send("发送完成")
    }
    //=============================传话结束
    if (msg.startsWith("群传话")) {
        context.send("正在发送...请稍后")
        var args = msg.split(" ")
        var tar = utils.getBot().getGroup(Number(args[1]));
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
        } else if (utils.get(del) == null) {
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
    var upm = utils.get("upm")
    if (upm !== null && msg == upm) {
        context.send(msg);
    } else {
        utils.set("upm", msg)
    }
    //====================================跟读结束
    var get_state = utils.get("state")
    if (get_state !== null || get_state == true) {
        var message = context.msg
        var constructionA = utils.get("construction")
        constructionA.add(utils.getBot().getId(), "AI", message)
        if (msg == "完成") {
            context.send(construction.build())
            utils.set("state", false)
        }
    } else if (msg == "创建聊天记录") {
        utils.set("state", true)
        context.send("请输入消息")
        var construct = context.forwardBuilder()
        var construction = utils.set("construct", null)
    }
}