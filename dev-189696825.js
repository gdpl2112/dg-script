if (context.getType() === "group") {
    if (msg.startsWith("解析快手图集")) {
        if (context.getType() === "group") {
            var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
            var urls = msg.match(reg)
            if (urls !== null) {
                context.send("正在解析...\n请稍等")
                var u0 = encodeURI(urls[0]);
                var arr = JSON.parse(utils.requestGet("http://kloping.top/api/search/parseImgs?url=" + u0 + "&type=ks"))
                var builder = context.forwardBuilder();
                for (var i = 0; i < arr.length; i++) {
                    var e = arr[i];
                    builder.add(context.getBot().getId(), "AI", context.uploadImage(e))
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
}