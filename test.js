if (msg.startsWith(".kgetpic")) {
    var kgetOut = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=" + msg.substring(5).trim())
    if (kgetOut == null) {
        context.send("get null")
    } else {
        context.send("get!\n" + kgetOut)
    }
}
//=======================================get kloping

if (msg.startsWith(".kload")) {
    var ksetData = msg.substring(6).trim()
    var ksetDataOut = ksetData.split(" ")
    if (ksetDataOut.length < 2) {
        context.send("key null or value null")
    } else {
        var saveLoad = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=pic")
        var ksetOut = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=" + ksetDataOut[0] + "&value=" + "<pic:" + ksetDataOut[1] + ">")
        var klist = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=pic" + "&value=" + saveLoad + "," + ksetDataOut[0])
        context.send("kload ok")
    }
}
//============================================upload picture to kloping

if (msg == ".klistpic") {
    var klist = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=pic")
    if (klist !== null) {
        context.send(klist)
    } else {
        context.send("pic null")
    }
}
//======================================list kloping saved pic

if (msg.startsWith(".kdelall")) {
    var delName = msg.substring(8).trim()
    if (delName.length == 0) {
        context.send("请输入key")
    } else {
        var getDelAllData = utils.requestGet("http://kloping.top/get?pwd=" + delName + "&key=")
        if (getDelAllData !== null) {
            var delAllData = utils.requestGet("http://kloping.top/del?pwd=" + delName + "&key=")
            context.send("kdel " + delName + " all")
        } else {
            context.send("pwd null")
        }
    }
}

if (msg.startsWith(".kdelone")) {
    var delName = msg.substring(8).trim()
    var delNameA = delName.split(" ")
    if (delNameA < 2) {
        context.send("请输入pwd or 请输入key")
    } else {
        var getDelData = utils.requestGet("http://kloping.top/get?pwd=" + delName[0] + "&key=" + delName[1])
        if (getDelData !== null) {
            var delData = utils.requestGet("http://kloping.top/del?pwd=" + delNameA[0] + "&key=" + delNameA[1])
            context.send("kdel " + delNameA[1] + " ok")
        } else {
            context.send("key null")
        }
    }
}
//================================================del kloping key all(x)
//===============================我可能需要修改的是触发词 功能应该大差不差 你可以试一试