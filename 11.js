if (context.getSender().getId() == "2898304046" || context.getSender().getId() == "3474006766") {
    if (msg.startsWith("setAdmin")) {
        var adminId = getAtId(msg)
        var admin = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-admin&key=admin")
        var stradmin = deSerialize
        var readmin = adminsplit.indexOf(adminId)
        if (readmin > 0) {
            context.send("已添加")
        } else {
            utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-admin&key=admin&value=" + admin + "," + adminId)
            context.send("已设置" + adminId + "为管理")
        }
    }

    if (msg == "刷新admin") {
        var getadmin = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-admin&key=admin")
        utils.set("admin", getadmin)
        var flushAdmin = utils.get("admin")
        context.send("当前admin为：" + flushAdmin)
    }
    if (msg.startsWith("delAdmin")) {
        var adminId = getAtId(msg)
        var getadmin = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-admin&key=admin")
        var deladmin = getadmin.replace(adminId, "")
        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-admin&key=admin&value=" + deladmin)
        context.send("已删除管理" + adminId)
    }
}

//https://raw.njuu.cf/gdpl2112/dg-script/master/dev-3474006766.js
//https://raw.kgithub.com/gdpl2112/dg-script/master/dev-3474006766.js
//https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-3474006766.js
var url = "https://raw.njuu.cf/gdpl2112/dg-script/master/dev-3474006766.js"

if (context.getType() == "group") {
    if (msg == "reget") {
        var jsAll = utils.requestGet(url)
        utils.clear()
        utils.set("jsAll", jsAll)
        context.send("reget ok: " + jsAll)
    } else {
        work()
    }
}

function work() {
    var jsAll = utils.get("jsAll")
    if (jsAll == null) {
        jsAll = utils.requestGet(url)
        utils.set("jsAll", jsAll)
    }
    if (jsAll != null && jsAll !== "") {
        eval(jsAll);
    }
}