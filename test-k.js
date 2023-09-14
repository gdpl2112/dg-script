//检测API开关状态
function get_api_state() {
    var get_api = utils.get("api_state")
    if (get_api = null) {
        var api_now_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=api_state")
        utils.set("api_state", api_now_state)
        return get_api
    } else {
        return get_api
    }
}


//--------------------------------------------------------------------------------------------------------------------------------------------
if (context.getType() == "group" || context.getType() == "friend") {
    if (context.getSender().getId() == 2898304046) {
        var okv = msg.split(" ")
        switch (okv[0]) {
            case "关闭api":
                if (get_api_state() == true || get_api_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=api_state&value=" + Boolean(false))
                    context.send("正在关闭api...")
                } else {
                    context.send("已关闭api")
                }
                break
            case "开启api":
                if (get_api_state() == false || get_api_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=api_state&value=" + Boolean(true))
                    context.send("正在开启api...")
                } else {
                    context.send("已开启api")
                }
                break
        }
    }
}

if (context.getType() == "group" || context.getType() == "friend") {
    if (get_api_state() == true) {
        if (msg.startsWith("喜报")) {
            context.send(context.uploadImage("https://api.andeer.top/API/img_xibao.php?data=" + msg.substring(2)));
        }
        //====================喜报结束

        if (msg.startsWith("甘雨抱抱你")) {
            var id = getAtId(msg)
            context.send(context.uploadImage("https://api.andeer.top/API/img_love.php?qq=" + id));
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
    }
    //=================网易云热评结束
}