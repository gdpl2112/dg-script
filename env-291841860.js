//https://raw.github.com/gdpl2112/dg-script/master/dev-291841860.js

//https://raw.njuu.cf/gdpl2112/dg-script/master/dev-291841860.js
//https://raw.kgithub.com/gdpl2112/dg-script/master/dev-291841860.js
//https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-291841860.js
//=========以上镜像==以下加速
//https://ghproxy.com/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-291841860.js
//https://gh.api.99988866.xyz/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-291841860.js
//可能危险 !!!
//!!! https://github.moeyy.xyz/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-291841860.js
//!!! https://ghps.cc/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-291841860.js

if (context.getType() === "group") {
    if (msg === "update") {
        updateJsAll(true)
    } else if (msg === "update0") {
        updateJsAll(false)
    } else if (msg === "newEnv") {
        utils.newGlobal()
        context.send("OK!")
    } else work()
} else {
    work()
}

function updateJsAll(k) {
    if (k) load("https://mirror.ghproxy.com/https://raw.githubusercontent.com/gdpl2112/dg-script/master/291841860/funcs.js")
    var UrlUtils = Java.type("io.github.kloping.url.UrlUtils")
    var jsAll = UrlUtils.getStringFromHttpUrl("https://mirror.ghproxy.com/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-291841860.js").trim()
    utils.set("jsAll", jsAll)
    var lins = jsAll.split("\n")
    context.send(lins[lins.length - 1])
    return jsAll
}

function work() {
    var jsAll = utils.get("jsAll")
    if (jsAll == null) {
        jsAll = updateJsAll(true)
    }
    if (jsAll != null && jsAll !== "") {
        eval(jsAll);
        // try {
        // } catch (e) {
        //     context.getBot().getGroup(589925182).sendMessage(context.newPlainText(e.toString()))
        // }
    }
}