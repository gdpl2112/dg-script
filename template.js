
//获取指定格式 值
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

//获取at格式id
function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end); else return null
}

var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

//获取指定str中所有阿拉伯数字
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

//orc识别图片(url) 返回文本
function getTextFromOcr(url) {
    var json = utils.requestGet("http://kloping.top/api/ocr?url=" + url)
    var jo = JSON.parse(json)
    return jo.data.ParsedText
}

//start or end with
function isStartOrEndWith(msg, key) {
    return (msg.startsWith(key) || msg.endsWith(key))
}

//从msg中各种方式获取img url
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

//从msg中获取 at格式或数字格式的群成员对象 获取失败返回null
function getMemberObjFromMsgAtOrNumber(group, msg) {
    var qid = -1
    var at = getAtId(msg)
    if (at == null) {
        qid = getAllNumber(msg)
    } else qid = at
    if (qid == -1) return null
    return group.get(qid);
}

//============以上介是实用方法===============
//============以下是各种实例

if (context.getType() == "group") {
    switch (msg) {
        case "超级表情测试":
            context.send(context.toSuperFace(338))
            break
        case "戳自己":
            var group = context.getSubject()
            var member = group.getBotAsMember()
            member.nudge().sendTo(group)
            break
    }
}
