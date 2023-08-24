var index = utils.get("index0")
if (index == null) index = 0
var jsAll = utils.get("jsAll")
if (index++ % 20 || jsAll == null) {
    jsAll = utils.requestGet("https://raw.njuu.cf/gdpl2112/dg-script/master/dev-3474006766.js")
    utils.set("jsAll", jsAll)
}
utils.set("index0", index)
if (jsAll != null) {
    eval(jsAll);
}
