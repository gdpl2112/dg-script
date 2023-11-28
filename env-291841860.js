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
        updateJsAll()
    } else if (msg === "newEnv") {
        utils.newGlobal()
        context.send("OK!")
    } else work()
} else {
    work()
}

function updateJsAll() {
    load("https://raw.njuu.cf/gdpl2112/dg-script/master/291841860/funcs.js")
    var UrlUtils = Java.type("io.github.kloping.url.UrlUtils")
    var jsAll = UrlUtils.getStringFromHttpUrl("https://raw.njuu.cf/gdpl2112/dg-script/master/dev-291841860.js").trim()
    utils.set("jsAll", jsAll)
    var lins = jsAll.split("\n")
    context.send(lins[lins.length - 1])
    return jsAll
}

function work() {
    var jsAll = utils.get("jsAll")
    if (jsAll == null) {
        jsAll = updateJsAll()
    }
    if (jsAll != null && jsAll !== "") {
        try {
            eval(jsAll);
        } catch (e) {
            if (e instanceof SyntaxError) {
            } else {
                context.getBot().getGroup(589925182).sendMessage(context.newPlainText(e.toString()))
            }
        }
    }
}