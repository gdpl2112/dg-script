//data name
//pwd=dg-2898304046 key=api_state 储存本地"api_state"
//pwd=dg-2898304046-admin key=adminId 储存本地"admin"+senderId
//pwd=dg-2898304046 key=update_log 储存本地异步"update_state"



//function
//获取指定格式值 目前仅支持获取第一个出现的格式元素
function getFormatValue(fk, inStr) {
    var i1 = inStr.indexOf("<")
    var i2 = inStr.indexOf(">")
    if (i1 < 0 || i2 <= 0) return null
    var format0 = inStr.substring(i1 + 1, i2)
    var args = format0.split(":")
    if (args[0] !== fk) {
        if (i2 <= inStr.length) {
            return getFormatValue(fk, inStr.substring(i2 + 1))
        } else {
            return null
        }
    } else {
        return args[1]
    }
}

//获取at格式值并返回Number 或 null
function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end)
    else return null
}

//获取消息中的全部数字
function getAllNumber(str) {
    var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var out = ""
    for (var i = 0; i < str.length; i++) {
        var e = str[i]
        if (ns.indexOf(e) > 0) {
            out = out + e
        }
    }
    if (out.length > 0) {
        return Number(out)
    } else {
        return -1
    }
}

//获取时间
function getTime() {
    var timestamp = Date.now()
    var time = new Date(timestamp)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var seconds = time.getSeconds()
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
}

//检测API开关状态
function get_api_state() {
    var get_api = utils.get("api_state")
    if (get_api == null) {
        var api_now_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=api_state")
        utils.set("api_state", api_now_state)
        var get_api1 = utils.get("api_state")
        return get_api1
    } else {
        return get_api
    }
}
//检测admin标签
function get_admin() {
    var senderId = context.getSender().getId()
    var get_admin_state = utils.get("admin" + senderId)
    if (get_admin_state == null) {
        var admin_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-admin&key=" + senderId)
        if (admin_state !== null) {
            utils.set("admin" + senderId, admin_state)
            return admin_state
        } else {
            utils.set("admin" + senderId, "false")
            return "false"
        }
    } else {
        return get_admin_state
    }
}


//============================================================================================================================================
//功能性用法
if (context.getType() == "group" || context.getType() == "friend") {
    if (context.getSender().getId() == 2898304046) {
        var okv = msg.split(" ")
        switch (okv[0]) {
            case "关闭api":
                if (get_api_state() == "true" || get_api_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=api_state&value=false")
                    utils.set("api_state", "false")
                    context.send("正在关闭api...")
                } else {
                    context.send("已关闭api")
                }
                break
            case "开启api":
                if (get_api_state() == "false" || get_api_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=api_state&value=true")
                    utils.set("api_state", "true")
                    context.send("正在开启api...")
                } else {
                    context.send("已开启api")
                }
                break
            case "setAdmin":
                if (okv.length < 2) {
                    context.send("未检测到at")
                } else {
                    var getAdminId = getAtId(msg)
                    var admin_state = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-admin&key=" + getAdminId + "&value=true")
                    utils.set("admin" + getAdminId, admin_state)
                    context.send("已设置" + context.getSender().getNick() + "(" + getAdminId + ")为管理")
                }
                break
            case "unAdmin":
                if (okv.length < 2) {
                    context.send("未检测到at")
                } else {
                    var getAdminId = getAtId(msg)
                    utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-admin&key=" + getAdminId)
                    utils.del("admin" + getAdminId)
                    context.send("已取消" + context.getSender().getNick() + "(" + getAdminId + ")的管理")
                }
                break
            case "当前状态":
                var api = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=api_state")
                var botImage = context.getSender().getAvatarUrl()
                context.send("<pic:" + botImage + ">"
                    + "\napi状态为:" + api)
                break
            case "log":
                var log = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=update_log")
                context.send("更新日志:\n" + log)
                break
        }
    }
}


//异步============================================================================================================================================
//更新日志
if (context.getType() == "group" || context.getType() == "friend") {
    if (context.getSender().getId() == 2898304046) {
        var update_state = utils.get("update_state")
        var time = getTime()
        if (update_state == true || update_state !== null) {
            var qid2 = utils.get("qid1")
            var qid = context.getSubject().getId()
            if (qid == qid2) {
                var log = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=update_log")
                var newLog = msg
                if (log !== null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=update_log&value=" + log + "\n" + time + " " + newLog)
                    context.send("更新成功")
                    utils.set("update_state", false)
                } else {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=update_log&value=" + time + " " + newLog)
                    context.send("更新成功")
                    utils.set("update_state", false)
                }
            }
        } else if (msg == ".update") {
            context.send("启动更新日志 请输入")
            var qid1 = context.getSubject().getId()
            utils.set("qid1", qid1)
            utils.set("update_state", true)
        }
    }
}

//=========================================================================================================================api
if (context.getType() == "group" || context.getType() == "friend") {
    if (get_api_state() == "true") {
        //喜报  
        if (msg.startsWith("喜报")) {
            context.send(context.uploadImage("https://api.andeer.top/API/img_xibao.php?data=" + msg.substring(2)));
        }

        //甘雨抱抱你
        if (msg.startsWith("甘雨抱抱你")) {
            var id = getAtId(msg)
            context.send(context.uploadImage("https://api.andeer.top/API/img_love.php?qq=" + id));
        }

        //百度
        if (msg.startsWith("百度")) {
            var end = encodeURI(msg.substring(2));
            context.send("https://m.baidu.com/s?word=" + end);
        }

        //网易云热评
        if (msg.startsWith("网易云热评")) {
            var review = JSON.parse(context.requestGet("https://api.andeer.top/API/wangyi.php" + msg.substring(5)));
            context.send(review.data);
        }

        //解方程
        if (msg.startsWith("解方程")) {
            var getNumberA = msg.substring(3).trim()
            var getNumber = getNumberA.split(" ")
            var unsq = Number(getNumber[1] * getNumber[1] - 4 * getNumber[0] * getNumber[2])
            var sq = Math.sqrt(unsq)
            var fz1 = Number((-getNumber[1]) + sq)
            var fz2 = Number((-getNumber[1]) - sq)
            var fm1 = Number(2 * getNumber[0])
            var result1 = Number(fz1 / fm1)
            var result2 = Number(fz2 / fm1)
            if (getNumber[0] == 0) {
                var result3 = Number(getNumber[2] / (-getNumber[1]))
                context.send(getNumber[1] + "X+" + getNumber[2] + "=0")
                context.send("X=" + result3)
                if (getNumber[1] == 0) {
                    context.send("请输入未知数系数")
                }
            } else {
                if (unsq >= 0) {
                    context.send(getNumber[0] + "XX+" + getNumber[1] + "X+" + getNumber[2] + "=0")
                    context.send("X1=" + result1 + "\nX2=" + result2)
                }
                if (unsq < 0) {
                    context.send("该方程无解")
                }
            }
        }
    }
}


if (context.getType() == "group" || context.getType() == "friend") {
    if (get_admin() == "true") {
        if (msg == ".clear") {
            var number = utils.clear()
            context.send("clear all" + "\nclear number:" + number)
        }

        if (msg == ".list") {
            var listA = utils.list()
            context.send(context.newPlainText(listA.toString()))
        }
    }
}