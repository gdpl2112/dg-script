if (msg.startsWith(".kget")) {
    var kgetOut = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=" + msg.substring(5).trim())
    if (kgetOut.length > 0) {
        context.send("get!\n" + kgetOut)
    } else {
        context.send("get null")
    }
}
//=======================================get kloping

if (msg.startsWith(".kload")) {
    var ksetData = msg.substring(6)
    var ksetDataOut = msg.split(" ")
    if (ksetDataOut[0].length == 0) {
        context.send("key null")
    } else if (ksetDataOut[1].length == 0) {
        context.send("value null")
    } else {
        var saveLoad = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=pic")
        var ksetOut = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=" + ksetDataOut[0] + "&value=" + "<Pic:" + ksetDataOut[1] + ">")
        var ksetOut = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=pic" + "&value=" + ksetDataOut[0])
        context.send("set ok")
    }
}
//============================================upload picture to kloping

if (msg == ".klist") {
    var klist = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=pic")
    context.send(klist)
}
//list kloping saved pic

if (msg.startsWith("kdelall")) {
    var delName = msg.substring(7).trim()
    if (delName.length == 0) {
        context.send("请输入key")
    } else {
        var delAllData = utils.requestGet("http://kloping.top/del?pwd=" + msg.substring(7).trim() + "&key=")
        context.send("delall ok")
    }
}
//del kloping key all


//======功能是upload以后 发送kload 上传<pic+url> 并记录图片的key在key=pic里 发送klist获取key=pic