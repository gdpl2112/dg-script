if (context.getType() == "group") {
    if (context.getSender().getId() == 3474006766) {
        var okv = msg.split(" ");
        switch (okv[0]) {
            case "/set":
                if (okv.length !== 3) {
                    context.send("args size less 3")
                } else {
                    var old = utils.set(okv[1], okv[2])
                    context.send("set success and old: " + old)
                }
                break;
            case "/get":
                if (okv.length !== 2) {
                    context.send("args size less 2")
                } else {
                    var v0 = utils.get(okv[1])
                    context.send("key: " + okv[1] + "\nvalue: " + v0)
                }
                break;
            case "/del":
                if (okv.length !== 2) {
                    context.send("args size less 2")
                } else {
                    var v0 = utils.del(okv[1])
                    context.send("del success! key: " + okv[1] + "\nvalue: " + v0)
                }
                break;
            case "/clear":
                var n = utils.clear();
                context.send("clear success and clear numbers: " + n)
                break;
            case "/list":
                var a = utils.list()
                context.send(context.newPlainText(a.toString()))
                break
            case "/kset":
                if (okv.length !== 3) {
                    context.send("args size less 3")
                } else {
                    var ksetOut = utils.requestGet("http://kloping.top/put?pwd=dg-3474006766&key=" + okv[1] + "&value=" + okv[2])
                    context.send("set success : " + ksetOut)
                }
                break
            case "/kget":
                if (okv.length !== 2) {
                    context.send("args size less 2")
                } else {
                    var kgetOut = utils.requestGet("http://kloping.top/get?pwd=dg-3474006766&key=" + okv[1])
                    context.send("get success : " + kgetOut)
                }
                break
            case "/kdel":
                if (okv.length !== 2) {
                    context.send("args size less 2")
                } else {
                    var kdelOut = utils.requestGet("http://kloping.top/del?pwd=dg-3474006766&key=" + okv[1])
                    context.send("del state : " + kdelOut + "! key:" + okv[1])
                }
                break
            case "/exec":
                if (msg.length > 5) {
                    var out = utils.requestGet("http://kloping.top/exec?pwd=4432120&line=" + msg.substring(5))
                    var outo = JSON.parse(out)
                    if (outo.err.length > 0)
                        context.send("err:\n" + outo.err)
                    if (outo.in.length > 0)
                        context.send("out:\n" + outo.in)
                }
                break
        }
    }
}
//完善
function getFormatValue(fk, inStr) {
    var i1 = inStr.indexOf("<")
    var i2 = inStr.indexOf(">")
    if (i1 < 0 || i2 <= 0) return null
    var format0 = inStr.substring(i1 + 1, i2)
    var args = format0.split(":")
    if (args[0] !== fk) {
        if (i2 <= inStr.length) {
            return getFormatValue(fk, inStr.substring(i2 + 1))
        } else {
            return null
        }
    } else {
        return args[1]
    }
}

function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end); else return null
}

var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function getAllNumber(str) {
    var out = ""
    for (var i = 0; i < str.length; i++) {
        var e = str[i]
        if (ns.indexOf(e) > 0) {
            out = out + e
        }
    }
    if (out.length > 0) {
        return Number(out)
    } else {
        return -1
    }
}

function getTextFromOcr(url) {
    var json = utils.requestGet("http://kloping.top/api/ocr?url=" + url)
    var jo = JSON.parse(json)
    return jo.data.ParsedText
}

function isStartOrEndWith(msg, key) {
    return (msg.startsWith(key) || msg.endsWith(key))
}

function getImageUrlAll(msg) {
    var iid = getFormatValue("pic", msg)
    if (iid == null) {
        var msgId = getFormatValue("qr", msg)
        if (msgId === null) {
            return null
        } else {
            var msgc = context.getMessageChainById(msgId)
            var msgcs = utils.serialize(msgc)
            iid = getFormatValue("pic", msgcs)
            if (iid == null) {
                return null
            } else {
                return utils.queryUrlFromId(iid)
            }
        }
    } else {
        return utils.queryUrlFromId(iid)
    }
}

if (context.getType() === "group" || context.getType() === "friend") {
    if (context.getSender().getId() == context.getBot().getId()) {
        if (isStartOrEndWith(msg, "上传") || isStartOrEndWith(msg, "upload")) {
            var iurl = getImageUrlAll(msg)
            if (iurl != null) {
                iurl = encodeURI(iurl)
                var out = utils.requestGet("http://kloping.top/transImg?type=url&url=" + iurl)
                context.send("upload finish: " + out)
            } else {
                context.send("未发现图片")
            }
        }
        //上传结束
        if (isStartOrEndWith(msg, "query")) {
            var iurl = getImageUrlAll(msg)
            if (iurl != null) {
                context.send(iurl)
            } else {
                context.send("未发现图片")
            }
        }
        //查询
        if (isStartOrEndWith(msg, "识别")) {
            var iurl = getImageUrlAll(msg)
            if (iurl != null) {
                iurl = encodeURI(iurl)
                var out = getTextFromOcr(iurl)
                if (out != null)
                    context.send(out)
                else
                    context.send("识别失败")
            } else {
                context.send("未发现图片")
            }
        }
        //识别
    }
    //查询
    if (msg.startsWith("解析ks") || msg.indexOf("【快手") > 0) {
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
    }
    //解析结束
    /*
    var point_state = utils.get("point_state")
    if (point_state != null && point_state) {
        var gid = utils.get("point_gid")
        var qid = utils.get("point_qid")
        if (context.getSender().getId() == qid) {
            var st0 = getAllNumber(msg)
            if (st0 == null) {
                utils.set("point_state", false)
                context.send("已取消!")
            } else {
                var st = st0 - 1
                var datas = utils.get("point_datas")
                var data = datas[st]
                context.send("<Music:QQMusic," + data.media_name + "," + data.author_name + "," + "http://47.100.93.243:34740/," + data.imgUrl + "," + data.songUrl + ">")
                utils.set("point_state", false)
            }
        }
    } else if (msg.startsWith("酷狗点歌")) {
        var name = msg.substring(4)
        var e0 = utils.requestGet("http://kloping.top/api/search/song?keyword=" + name + "&type=kugou&n=5")
        var jo = JSON.parse(e0)
        var datas = jo.data
        var tips = "输入序号以选择"
        for (var i = 0; i < datas.length; i++) {
            var d0 = datas[i]
            tips = tips + "\n" + (i + 1) + "," + d0.author_name + " - " + d0.media_name
        }
        context.send(tips)
        utils.set("point_state", true)
        utils.set("point_datas", datas)
        utils.set("point_gid", context.getSubject().getId())
        utils.set("point_qid", context.getSender().getId())
    }
    //点歌结束 */
    if (msg.startsWith("语音合成")) {
        var okv = msg.split(" ");
        var name = okv[1];
        var guzi = okv[2];
        var json1 = utils.requestGet("https://api.pearktrue.cn/api/genshinimpactaudio/?text=" + guzi + "&speaker=" + name)
        var d0 = JSON.parse(json1)
        context.send("<audio:http://kloping.top/api/mp32amr?url=" + d0.audiourl + ">")
        //context.send("<audio:" + d0.audiourl + ">")
    }
}
//23/9/17-1