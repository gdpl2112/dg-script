var allFuns = {};

allFuns.parseVideoOrGallery = function (result) {
    if (result.code === 200) {
        var data = result.data
        if (result.msg.indexOf("图集") >= 0) {
            var builder = context.builder();
            builder.append(context.uploadImage(data.cover))
                .append("\n作者: ").append(data.author).append("\n")
                .append(data.title).append("\n图集数量:" + data.count + "/正在发送,请稍等..");
            context.send(builder.build())
            var arr = result.image
            var builder = context.forwardBuilder();
            builder.add(context.getBot().getId(), "AI:", context.newPlainText("音频直链: " + result.music.musicBgm))
            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                builder.add(context.getBot().getId(), "AI", context.uploadImage(e))
            }
            context.send(builder.build())
        } else {
            var builder = context.builder();
            builder.append(context.uploadImage(data.cover))
                .append("作者: ").append(data.author).append("\n")
                .append(data.title);
            context.send(builder.build())
            context.send(context.forwardBuilder()
                .add(context.getBot().getId(), "AI:", context.newPlainText("视频直链: " + result.data.url))
                .add(context.getBot().getId(), "AI:", context.newPlainText("音频直链: " + result.music.musicBgm))
                .build())
        }
    } else context.send("解析失败!\ncode:" + result.code)
}

allFuns.isStartOrEndWith = function (msg, key) {
    return (msg.startsWith(key) || msg.endsWith(key))
}

allFuns.sendToText = function (out) {
    var max = 600
    out = out.toString()
    debugLog("will send text of length: " + out.length)
    if (out.length >= max) {
        var builder = context.forwardBuilder()
        while (out.length >= max) {
            var e = out.substring(0, max)
            out = out.substring(max)
            builder.add(context.getBot().getId(), "AI", context.newPlainText(e.trim()))
        }
        if (out.length > 0) builder.add(context.getBot().getId(), "AI", context.newPlainText(out.trim()))
        context.send(builder.build())
    } else {
        context.send(context.newPlainText(out))
    }
}

allFuns.debugLog = function (msg) {
    context.getBot().getGroup(589925182).sendMessage(context.newPlainText(msg))
}

allFuns.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

allFuns.getAiUrl = function () {
    return "http://localhost/api/ai"
}
//fun-23/11/27-2