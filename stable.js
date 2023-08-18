// 这里是 已存在 且无bug的 稳定脚本

if (msg.startsWith("解析快手图集")) {
    if (context.getType() === "group") {
        var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        var urls = msg.match(reg)
        if (urls !== null) {
            context.send("正在解析...\n请稍等")
            var u0 = encodeURI(urls[0]);
            var arr = JSON.parse(context.requestGet("http://kloping.top/api/search/parseImgs?url=" + u0 + "&type=ks"))
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

if (msg.startsWith("酷狗点歌")) {
    var json = context.requestGet("http://kloping.top/api/search/song?keyword=" + msg.substring(4) + "&type=kugou");
    var jo = JSON.parse(json)
    if (jo.data !== null && jo.data.length > 0) {
        var sd = jo.data[0]
        if (sd.songUrl !== null && sd.songUrl.trim() !== "") {
            context.send(context.createMusicShare("KugouMusic", sd.media_name, sd.author_name, "http://kloping.top", sd.imgUrl, sd.songUrl))
        } else {
            context.send("歌曲链接获取失败")
        }
    } else {
        context.send("获取失败")
    }
}
//==============kugou点歌结束


if (msg.startsWith("网易点歌")) {
    var json = context.requestGet("http://kloping.top/api/search/song?keyword=" + msg.substring(4) + "&type=wy");
    var jo = JSON.parse(json)
    if (jo.data !== null && jo.data.length > 0) {
        var sd = jo.data[0]
        if (sd.songUrl !== null && sd.songUrl.trim() !== "") {
            context.send(context.createMusicShare("NeteaseCloudMusic", sd.media_name, sd.author_name, "http://kloping.top", sd.imgUrl, sd.songUrl))
        } else {
            context.send("歌曲链接获取失败")
        }
    } else {
        context.send("获取失败")
    }
}
//============网易点歌结束

