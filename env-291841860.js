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
        updateEnv()
        updateFunc()
    } else if (msg === "update1") {
        updateEnv()
    } else if (msg === "update2") {
        updateFunc()
    } else if (msg === "version") {
        var jsAll = utils.get("jsAll")
        var ss = jsAll.split("\n")
        context.send(context.newPlainText(ss[ss.length - 1]))
    } else work()
} else {
    work()
}

function updateEnv() {
    var jsAll = utils.requestGet("https://raw.njuu.cf/gdpl2112/dg-script/master/dev-291841860.js")
    utils.set("jsAll", jsAll)
    var ss = jsAll.split("\n")
    context.send(context.newPlainText(ss[ss.length - 1]))
}

function updateFunc() {
    var fun_all = utils.requestGet("https://raw.njuu.cf/gdpl2112/dg-script/master/291841860/funcs.js")
    utils.set("fun_all", fun_all)
    var ss = fun_all.split("\n")
    context.send(context.newPlainText(ss[ss.length - 1]))
}

function work() {
    var jsAll = utils.get("jsAll")
    if (jsAll == null) {
        jsAll = utils.requestGet(url)
        utils.set("jsAll", jsAll)
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