if (context.getType() === "group") {
    var og = utils.get("og")
    if (og != null && og == context.getSubject().getId()) {
        if (!msg.startsWith("#")) {
            context.send(utils.requestGet("https://api.lolimi.cn/API/AI/gpt4o.php?msg=" + msg))
            throw new Error("exit")
        }
    }
}

function parseVideoOrGallery(result, context, utils) {
    if (result.code === 200) {
        if (result.viedo == null) {
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
            builder.append(context.uploadImage(result.cover))
                .append(result.title);
            context.send(builder.build())
            context.send(context.forwardBuilder()
                .add(context.getBot().getId(), "AI:", context.newPlainText("视频直链: " + result.viedo))
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
    var reference = JSON.parse("{\"fid\": \"1594993299\",\"shareToken\": \"X-3GwNT63firZ17y\",\"shareObjectId\": \"5188991314621742263\",\"shareMethod\": \"TOKEN\",\"shareId\": \"17695659181273\",\"shareResourceType\": \"PHOTO_OTHER\",\"shareChannel\": \"share_copylink\",\"kpn\": \"NEBULA\",\"subBiz\": \"BROWSE_SLIDE_PHOTO\",\"env\": \"SHARE_VIEWER_ENV_TX_TRICK\",\"h5Domain\": \"kphm5nf3.m.chenzhongtech.com\",\"photoId\": \"3xa7scwmmezphd2\",\"isLongVideo\": false}");
    var data = utils.newObject("com.alibaba.fastjson.JSONObject")

    for each(var key in  reference.keySet()){
        var value = argsMap.getOrDefault(key, reference.getString(key))
        data.put(key, value.toString());
    }

    var cookies = utils.newObject("java.lang.StringBuilder")

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

    var result = JSON.parse(response.body().text())


    var builder = context.builder();
    builder.append(context.uploadImage(result.photo.coverUrls[0].url))
        .append(result.shareInfo.shareTitle)
        .append("作者").append(result.photo.userName).append("/").append(result.photo.userSex)
        .append("\n粉丝:").append(result.counts.fanCount.toString())
        .append("\n💗 ").append(result.photo.likeCount.toString())
        .append("\n👁︎︎ ").append(result.photo.viewCount.toString())
        .append("\n✉️ ").append(result.photo.commentCount.toString())

    var author = null;
    if (result.shareUserPhotos.length > 0) {
        author = context.forwardBuilder()
        author.add(context.getBot().getId(), "AI", context.uploadImage(result.shareUserPhotos[0].headUrl))
        author.add(context.getBot().getId(), "AI", context.newPlainText("sharer," + result.shareUserPhotos[0].userName + "/" + result.shareUserPhotos[0].userSex))
    }

    if (result.atlas == null) {
        builder.append("\n视频时长:" + (result.photo.duration / 1000));
        context.send(builder.build())

        var de0 = context.forwardBuilder();
        de0.add(context.getBot().getId(), "AI", context.newPlainText("视频直链: " + result.photo.mainMvUrls[0].url))
        try {
            de0.add(context.getBot().getId(), "AI", context.newPlainText("音频直链: " + result.photo.soundTrack.audioUrls[0].url))
        } catch (e) {
            context.getBot().getGroup(589925182).sendMessage(context.newPlainText(e.toString()))
        }
        context.send(de0.build())
    } else {
        builder.append("\n图集数量:" + result.atlas.list.length + "/正在发送,请稍等...");
        context.send(builder.build())

        var fbuilder = context.forwardBuilder();
        if (author != null) fbuilder.add(context.getBot().getId(), "AI", author.build())
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
version.fun = "24/6/23"

var urlReg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

if (context.getType() === "group" || context.getType() === "friend") {
    var tid = context.getSubject().getId();
    if (msg.startsWith("/")) {
        if (context.getSender().getId() == 3474006766) {
            var okv = msg.split(" ");
            switch (okv[0]) {
                case "/open":
                    utils.set("og", context.getSubject().getId())
                    context.send("ok")
                    break;
                case "/over":
                    context.send("out:" + utils.del("og"))
                    break;
                case "/clear":
                    var n = utils.clear();
                    context.send("clear success and clear numbers: " + n)
                    break;
                case "/req-get":
                    if (okv.length !== 2) {
                        context.send("args size less 2")
                    } else {
                        var out = utils.requestGet(okv[1])
                        context.send("out :\n" + out)
                    }
                    break
                case "/eval":
                    eval(msg.substring(5).trim())
                    break
                case "/repeat":
                    if (okv.length !== 2) context.send("args size less 2")
                    context.send(okv[1])
                    break
                case "/version":
                    context.send(JSON.toJSONString(version))
                    break
            }
        }
    } else if (msg === "aiclear") {
        context.send(utils.requestGet(getAiUrl() + "/clear?id=3474006766"))
    } else if (msg.indexOf("kuaishou") > 0) {
        var urls = msg.match(urlReg)
        if (urls !== null) {
            var k0 = utils.get("pks0")
            if (k0 == null || k0) {
                utils.set("pks0", false)
                parseKuaishou(urls[0], context, utils);
                utils.set("pks0", true)
            } else context.send("解析进行中...\n请等待解析结束后重试")
        } else context.send("未发现链接")
    } else if (msg.indexOf("douyin") > 0) {
        var urls = msg.match(urlReg)
        if (urls !== null) {
            var url = urls[0];
            context.send("正在解析\n" + url)
            var result = JSON.parse(utils.requestGet("https://api.linhun.vip/api/xbys?apiKey=1da8c6a17d1eb611cfcbd058be3dc9ac&url=" + url))
            parseVideoOrGallery(result, context, utils)
        } else context.send("未发现链接")
    } else if (msg.indexOf("https://www.bilibili.com/video/") >= 0) {
        var urls = msg.match(urlReg)
        if (urls !== null) {
            var url = urls[0];
            var e0 = url.indexOf("?");
            e0 = e0 > 0 ? e0 : url.length
            url = "https://api.xingzhige.com/API/b_parse/?url=" + url.substring(0, e0);
            var result = JSON.parse(utils.requestGet(url))
            context.send(context.forwardBuilder().add(context.getBot().getId(), "AI:", context.newPlainText("视频直链:" + result.data.video.url)).build())
            context.send(context.builder()
                .append(result.data.video.desc).append(context.uploadImage(result.data.video.fm))
                .append(context.newPlainText("BVID: " + result.data.bvid + " FROM: " + result.data.owner.name + "\n" + result.data.video.title))
                .append("\n=================\n").append("SOURCE: ").append("https://www.bilibili.com/video/" + result.data.bvid).build())
        }
    } else if (msg.startsWith("翻译")) {
        var jo = JSON.parse(utils.requestGet("https://api.pearktrue.cn/api/translate/?type=AUTO&text=" + msg.substring(2)))
        context.send(jo.data);
    } else if (msg.startsWith("画")) {
        var args = encodeURI(msg.substring(1))
        context.send(context.uploadImage("https://ai.cloudroo.top/draw/?t=" + args))
    } else if (msg.startsWith("表情包搜索")) {
        var name = msg.substring(5)
        var arr = JSON.parse(utils.requestGet("https://api.tangdouz.com/a/biaoq.php?return=json&nr=" + name))
        var fbuilder = context.forwardBuilder();
        for (var i = 0; i < arr.length; i++) {
            var e = arr[i];
            try {
                fbuilder.add(context.getBot().getId(), "AI", context.uploadImage(e.getString("thumbSrc")))
            } catch (ex) {
                fbuilder.add(context.getBot().getId(), "AI", context.newPlainText("[图片加载失败]"))
            }
        }
        context.send(fbuilder.build())
    } else if (msg == "查铲铲" || msg == "查金铲铲" || msg == "查金铲") {
        var s0 = utils.get("select0")
        if (s0 == null) {
            s0 = utils.requestGet("https://mirror.ghproxy.com/https://raw.githubusercontent.com/gdpl2112/dg-script/master/291841860/select0.js")
            utils.set("select0", s0)
        }
        eval(s0)
    }
}

if (context.getType() === "NudgeEvent") {
    var bid = event.getBot().getId()
    if (event.getFrom() === event.getBot()) {
        //主动戳出 不做处理
    } else if (event.getTarget().getId() === bid) {
        var r0 = utils.get("nc0")
        if (r0 == null) r0 = 1; else if (r0 > 4) r0 = 1;
        switch (r0) {
            case 1:
                event.getSubject().sendMessage(context.newPlainText("(T＿T)"))
                break;
            case 2:
                event.getSubject().sendMessage(context.newPlainText("有事么?￣へ￣"))
                break;
            case 3:
                event.getSubject().sendMessage(context.newPlainText("阿巴阿巴?(〃'▽'〃)"))
                break;
            case 4:
                event.getSubject().sendMessage(context.newPlainText("(｡ŏ_ŏ)走开"))
                break;
        }
        utils.set("nc0", r0 + 1)
        if (getRandomInt(1, 5) == 1) event.getFrom().nudge().sendTo(event.getSubject());
    }
}