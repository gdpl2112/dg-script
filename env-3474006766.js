
//https://raw.github.com/gdpl2112/dg-script/master/dev-3474006766.js

//https://raw.njuu.cf/gdpl2112/dg-script/master/dev-3474006766.js
//https://raw.kgithub.com/gdpl2112/dg-script/master/dev-3474006766.js
//https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-3474006766.js
//=========以上镜像==以下加速
//https://ghproxy.com/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-3474006766.js
//https://gh.api.99988866.xyz/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-3474006766.js
//可能危险 !!!
//!!! https://github.moeyy.xyz/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-3474006766.js
//!!! https://ghps.cc/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-3474006766.js


var url = "https://gh.api.99988866.xyz/https://raw.githubusercontent.com/gdpl2112/dg-script/master/dev-3474006766.js"

if (context.getType() === "group") {
    if (msg === "update") {
        var jsAll = utils.requestGet(url)
        utils.clear()
        utils.set("jsAll", jsAll)
        var ss = jsAll.split("\n")
        context.send(ss[ss.length - 1])
    } else {
        work()
    }
} else {
    work()
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