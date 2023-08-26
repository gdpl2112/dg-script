var index = utils.get("index0")
if (index == null) index = 0
var jsAll = utils.get("jsAll")
if (index++ % 30 === 0 || jsAll == null) {
    //https://raw.njuu.cf/gdpl2112/dg-script/master/dev-3474006766.js
    jsAll = utils.requestGet("https://raw.kgithub.com/gdpl2112/dg-script/master/dev-3474006766.js")
    utils.set("jsAll", jsAll)
}
utils.set("index0", index)
if (jsAll != null && jsAll !== "") {
    eval(jsAll);
}