//获取指定格式值 目前仅支持获取第一个出现的格式元素
function getFormatValue(fk, inStr) {
    var i1 = inStr.indexOf("<")
    var i2 = inStr.indexOf(">")
    if (i1 <= 0 || i2 <= 0) return null
    var at0 = inStr.substring(i1 + 1, i2)
    var args = at0.split(":")
    if (args[0] !== fk) {
        return null
    } else return args[1]
}

//获取at格式值并返回Number 或 null
function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end)
    else return null
}

if (context.getType() == "group") {
    if (msg.startsWith("kick")) {
        var tid = getAtId(msg)
        if (tid == null) {
            context.send("未发现AT")
        } else {
            context.send("尝试kick")
            context.getSubject().get(tid).kick("tips")
        }
    }
}
//=====================无报错 但不实施