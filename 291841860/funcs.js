function parseVideoOrGallery(result, context, utils) {
    if (result.code === 200) {
        var data = result.data
        if (data.type.indexOf("图") >= 0) {
            var builder = context.builder();
            builder.append(context.uploadImage(data.cover))
                .append("\n作者: ").append(data.author).append("\n")
                .append("💟: ").append(data.like.toString()).append("\n")
                .append(data.title).append("\n图集数量:" + data.images.length + "/正在发送,请稍等..");
            context.send(builder.build())
            var arr = data.images
            var builder = context.forwardBuilder();
            builder.add(context.getBot().getId(), "AI:", context.newPlainText("音频直链: " + data.music.url))
            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                builder.add(context.getBot().getId(), "AI", context.uploadImage(e))
            }
            context.send(builder.build())
        } else {
            var builder = context.builder();
            builder.append(context.uploadImage(data.cover))
                .append("作者: ").append(data.author).append("\n")
                .append("💟: ").append(data.like.toString()).append("\n")
                .append(data.title);
            context.send(builder.build())
            context.send(context.forwardBuilder()
                .add(context.getBot().getId(), "AI:", context.newPlainText("视频直链: " + data.url))
                .add(context.getBot().getId(), "AI:", context.newPlainText("音频直链: " + data.music.url))
                .build())
        }
    } else context.send("解析失败!\ncode:" + result.code)
}

function isStartOrEndWith(msg, key) {
    return (msg.startsWith(key) || msg.endsWith(key))
}

function sendToText(out, context) {
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
        context.send(out)
    }
}

function debugLog(msg) {
    context.getBot().getGroup(470084160).sendMessage(context.newPlainText(msg))
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAiUrl() {
    return "http://localhost/api/ai"
}

function urlParamToJson(url) {
    if (!url) {
        return {};
    }
    var arr0 = url.substring(url.indexOf('?') + 1)
        .trim()
        .split('&');
    var map = new java.util.LinkedHashMap()
    for (e in arr0) {
        var kv = arr0[e].split("=")
        map.put(kv[0], kv[1])
    }
    return map;
}

function parseKuaishou(url, context, utils) {
    context.send("正在解析\n" + url)

    var doc0 = utils.newObject("org.jsoup.helper.HttpConnection").url(url)
        .userAgent("AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67").get();

    url = doc0.location();
    var argsMap = urlParamToJson(url)
    var reference = JSON.parseObject("{\"fid\": \"1594993299\",\"shareToken\": \"X-3GwNT63firZ17y\",\"shareObjectId\": \"5188991314621742263\",\"shareMethod\": \"TOKEN\",\"shareId\": \"17695659181273\",\"shareResourceType\": \"PHOTO_OTHER\",\"shareChannel\": \"share_copylink\",\"kpn\": \"NEBULA\",\"subBiz\": \"BROWSE_SLIDE_PHOTO\",\"env\": \"SHARE_VIEWER_ENV_TX_TRICK\",\"h5Domain\": \"kphm5nf3.m.chenzhongtech.com\",\"photoId\": \"3xa7scwmmezphd2\",\"isLongVideo\": false}");
    var data = utils.newObject("com.alibaba.fastjson.JSONObject")

    for each(var key in  reference.keySet()){
        var value = argsMap.getOrDefault(key, reference.getString(key))
        data.put(key, value.toString());
    }

    var cookies = new java.lang.StringBuilder()

    var iterator = doc0.connection().response().cookies().entrySet().iterator();
    while (iterator.hasNext()) {
        var kv = iterator.next();
        cookies.append(" ").append(kv.getKey()).append("=").append(kv.getValue()).append(";");
    }

    var response = utils.newObject("org.jsoup.helper.HttpConnection")
        .url("https://kphm5nf3.m.chenzhongtech.com/rest/wd/photo/info?kpn=NEBULA&captchaToken=&")
        .userAgent("AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67")
        .header("Accept", "*/*")
        .header("Accept-Encoding", "gzip, deflate, br")
        .header("Accept-Language", "zh-CN,zh;q=0.9")
        .header("Connection", "keep-alive")
        .header("Content-Type", "application/json")
        .header("Cookie", cookies.toString().trim())
        .header("Host", "kphm5nf3.m.chenzhongtech.com")
        .header("Origin", "https://kphm5nf3.m.chenzhongtech.com")
        .header("Referer", url)
        .ignoreContentType(true)
        .requestBody(data.toString())
        .post();

    var result = JSON.parseObject(response.body().text())


    var builder = context.builder();
    builder.append(context.uploadImage(result.photo.coverUrls[0].url))
        .append(result.shareInfo.shareTitle)
        .append("作者").append(result.photo.userName).append("/").append(result.photo.userSex)
        .append("\n粉丝:").append(result.counts.fanCount.toString())
        .append("\n💗 ").append(result.photo.likeCount.toString())
        .append("\n👁︎︎ ").append(result.photo.viewCount.toString())
        .append("\n✉️ ").append(result.photo.commentCount.toString())

    var author = context.forwardBuilder()
    author.add(context.getBot().getId(), "AI", context.uploadImage(result.shareUserPhotos[0].headUrl))
    author.add(context.getBot().getId(), "AI",context.newPlainText("sharer,"+result.shareUserPhotos[0].userName+"/"+result.shareUserPhotos[0].userSex))

       // context.builder().append()
            // .append(result.shareUserPhotos[0].userName)
            // .append("/").append(result.shareUserPhotos[0].kwaiId)
            // .append("/").append(result.shareUserPhotos[0].userSex)
            // .append(context.uploadImage(result.shareUserPhotos[0].headUrl)).build()
    // )

    // for (var i = 0; i < result.shareUserPhotos.length; i++) {
    //     try {
    //         var data0 = result.shareUserPhotos[i]
    //         var b0 =
    //             context.builder().append(context.uploadImage(data0.coverUrls[0].url))
    //                 .append(data0.caption).append("作者").append(data0.userName).append("/").append(data0.userSex)
    //                 .append("\n💗 ").append(data0.likeCount.toString())
    //                 .append("\n👁︎ ").append(data0.viewCount.toString())
    //                 .append("\n✉️ ").append(data0.commentCount.toString());
    //         if (data0.mainMvUrls.length > 0) b0.append("\n直链: ").append(data0.mainMvUrls[0].url)
    //         else b0.append("[图集]")
    //         author.add(context.getBot().getId(), "AI", b0.build())
    //     } catch (e) {
    //         debugLog(e.toString())
    //     }
    // }

    if (result.atlas == null) {
        builder.append("\n视频时长:" + (result.photo.duration / 1000));
        context.send(builder.build())

        context.send(context.forwardBuilder()
            .add(context.getBot().getId(), "AI", context.newPlainText("视频直链: " + result.mp4Url))
            .add(context.getBot().getId(), "AI", author.build())
            .build())
    } else {
        builder.append("\n图集数量:" + result.atlas.list.length + "/正在发送,请稍等...");
        context.send(builder.build())

        var fbuilder = context.forwardBuilder();
        fbuilder.add(context.getBot().getId(), "AI", author.build())
        fbuilder.add(context.getBot().getId(), "AI", context.newPlainText("音频直链: https://" + result.atlas.musicCdnList[0].cdn + result.atlas.music))
        var arr = result.atlas.list
        var host = "https://" + result.atlas.cdn[0]
        for (var i = 0; i < arr.length; i++) {
            var e = arr[i];
            try {
                fbuilder.add(context.getBot().getId(), "AI", context.uploadImage(host + e))
            } catch (ex) {
                fbuilder.add(context.getBot().getId(), "AI", context.newPlainText("[图片加载失败;" + host + e + "]"))
            }
        }
        context.send(fbuilder.build())

    }
}
var version = {}
version.fun = "23/12/8-1"