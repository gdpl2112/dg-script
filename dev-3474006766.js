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
            case "/test":
                var out = utils.requestPost("http://114.55.64.112:8080/parsor9/robot", "{app_id:51,client_id:'123456',session_id:'1695308740617',intent_update:'',query:'" + okv[1] + "'}")
                context.send(out)
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
    if (msg.startsWith("解析ks")) {
        gotoParseImages()
    } else if (msg.indexOf("【快手") > 0 || msg.indexOf("复制打开抖音") > 0) {
        var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        var urls = msg.match(reg)
        if (urls !== null) {
            var u0 = encodeURI(urls[0]);
            var jo = JSON.parse(utils.requestGet("https://xiaoapi.cn/API/zs_dspjx.php?url=" + u0))
            var end = jo.url;
            if (end == null) end = jo.video
            if (end == null || end.length == 0) {
                gotoParseImages()
            } else {
                context.send("解析结果: " + end)
            }
        } else {
            context.send("未发现链接")
        }
    }
    //解析结束
    if (msg.startsWith("语音合成")) {
        var okv = msg.split(" ");
        var name = okv[1];
        var guzi = okv[2];
        var json1 = utils.requestGet("https://api.pearktrue.cn/api/genshinimpactaudio/?text=" + guzi + "&speaker=" + name)
        var d0 = JSON.parse(json1)
        context.send("<audio:http://kloping.top/api/mp32amr?url=" + d0.audiourl + ">")
        //context.send("<audio:" + d0.audiourl + ">")
    }
    if (msg.startsWith("捅")) {
        var aid = getAtId(msg)
        if (aid != null) {
            context.send("<pic:" + utils.requestGet("http://kloping.top/api/image/tong?q1=" + context.getSender().getId() + "&q2=" + aid) + ">")
        }
    } else if (msg.startsWith("摇")) {
        context.send("<pic:" + utils.requestGet("http://kloping.top/api/image/yao2yao?qid=" + context.getSender().getId() + ">"))
    } else if (msg.trim() === ("锤") || msg.trim() === ("捶")) {
        context.send("<pic:" + "https://api.andeer.top/API/gif_thump.php?qq=" + context.getSender().getId() + ">")
    }
}

function gotoParseImages() {
    var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    var urls = msg.match(reg)
    if (urls !== null) {
        context.send("正在解析...\n请稍等")
        var u0 = encodeURI(urls[0]);
        var jo0 = JSON.parse(utils.requestGet("https://api.pearktrue.cn/api/tuji/api.php?url=" + u0))
        if (jo0 == null) {
            context.send("解析失败!")
        } else {
            context.send("解析成功!\n数量:" + jo0.count + "\n正在发送,请稍等..")
            var arr = jo0.images
            var builder = context.forwardBuilder();
            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                builder.add(context.getBot().getId(), "AI", context.uploadImage(e))
            }
            context.send(builder.build())
        }
    } else {
        context.send("未发现链接")
    }
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

if (context.getType() == "NudgeEvent") {
    var bid = event.getBot().getId();
    if (event.getFrom().getId() !== bid && event.getTarget().getId() === bid) {
        var r0 = randomNum(1, 3)
        switch (r0) {
            case 1:
                event.getSubject().sendMessage(context.newPlainText("反击!"))
                event.getFrom().nudge().sendTo(event.getSubject())
                break;
            case 2:
                event.getSubject().sendMessage(context.newPlainText("你干嘛~"))
                break;
            case 3:
                event.getSubject().sendMessage(context.newPlainText("阿巴阿巴?"))
                break;
        }
    }
}
//23/9/30-1