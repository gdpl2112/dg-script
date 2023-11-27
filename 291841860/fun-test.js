var allTestFun = {};

allTestFun.parseKuaishou = function (url) {
    context.send("正在解析\n" + url)

    function urlParamToJson(url) {
        if (!url) {
            return {};
        }
        var arr0 = url.substring(url.indexOf('?') + 1)
            .trim()
            .split('&');
        var map = utils.newObject("java.util.LinkedHashMap")
        for (e in arr0) {
            var kv = arr0[e].split("=")
            map.put(kv[0], kv[1])
        }
        return map;
    }

    var url = "https://v.kuaishou.com/bALwEe"
    var doc0 = utils.newObject("org.jsoup.helper.HttpConnection").url(url)
        .userAgent("AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67").get();
    url = doc0.location();
    var argsMap = urlParamToJson(url)
    var reference = JSON.parse("{\"fid\": \"1594993299\",\"shareToken\": \"X-3GwNT63firZ17y\",\"shareObjectId\": \"5188991314621742263\",\"shareMethod\": \"TOKEN\",\"shareId\": \"17695659181273\",\"shareResourceType\": \"PHOTO_OTHER\",\"shareChannel\": \"share_copylink\",\"kpn\": \"NEBULA\",\"subBiz\": \"BROWSE_SLIDE_PHOTO\",\"env\": \"SHARE_VIEWER_ENV_TX_TRICK\",\"h5Domain\": \"kphm5nf3.m.chenzhongtech.com\",\"photoId\": \"3xa7scwmmezphd2\",\"isLongVideo\": false}");
    var data = utils.newObject("com.alibaba.fastjson.JSONObject")

    var keys = Object.keys(reference);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var value = argsMap.getOrDefault(key, reference[key])
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
    builder.append(context.uploadImage(result.photo.coverUrls[1].url))
        .append(result.shareInfo.shareTitle).append("\n图集数量:" + result.atlas.list.length + "/正在发送,请稍等..");
    context.send(builder.build())
}
//fun-23/11/27-3