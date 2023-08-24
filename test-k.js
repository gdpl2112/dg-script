// 同步github方法 修改网址 设置脚本
var index = utils.get("index0")
if (index == null) index = 0
var jsAll = utils.get("jsAll")
if (index++ % 30 || jsAll == null) {
    //====================================qq-id=保证github仓库存在该文件==============↓↓↓↓↓↓↓↓↓↓=
    jsAll = utils.requestGet("https://raw.kgithub.com/gdpl2112/dg-script/master/dev-3474006766.js")
    utils.set("jsAll", jsAll)
}
utils.set("index0", index)
if (jsAll != null) {
    eval(jsAll);
}
