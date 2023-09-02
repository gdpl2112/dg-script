
if (context.getSender().getId() == 2898304046 || context.getSender().getId() == 3474006766) {
    if (msg.startsWith("setAdmin")) {
        var adminId = getAtId(msg)
        var admin = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=admin")
        var setAdmin = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=admin&value=" + admin + "，" + adminId)
    }
    if (msg == "刷新admin") {
        var getadmin = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=admin")
        var getAdmin = utils.set(admin, getadmin)
    }
}

if (context.getType() == "group" || context.getType() == "friend") {
    var followAdmin = utils.get("admin")
    var sender = context.getSender().getId()
    if (sender = followAdmin.indexOf(followAdmin)) { }
}