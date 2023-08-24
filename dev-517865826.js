if (context.getType() == "group" || context.getType() == "friend") {
    if (context.getSender().getId() == 517865826) {
        if (msg.startsWith("汐发送私信")) {
            context.send("已发送")
            var message = msg.substring(5)
            context.getSender().sendMessage(message)
        }
        //==================发送私信结束

        if (msg.startsWith("汐复述")) {
            context.send("ok")
            var repeat = msg.substring(3)
            context.getSubject().sendMessage(repeat)
        }
        //======================复述结束

        if (msg.startsWith("汐传话")) {
            context.send("正在发送...请稍后")
            var args = msg.split(" ")
            var tar = context.getBot().getFriend(Number(args[1]));
            tar.sendMessage(args[2])
            context.send("发送完成")
        }
        //=============================传话结束

        if (msg.startsWith("汐群传话")) {
            context.send("正在发送...请稍后")
            var args = msg.split(" ")
            var tar = context.getBot().getGroup(Number(args[1]));
            tar.sendMessage(args[2])
            context.send("发送完成")
        }
        //=============================群传话结束

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
    }
}