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
//===========================获取指定格式值 目前仅支持获取第一个出现的格式元素

function getAtId(inStr) {
    var end = getFormatValue("at", inStr)
    if (end !== null) return Number(end)
    else return null
}
//================================获取at格式值并返回Number 或 null

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
//==============================获取消息中的全部数字

if (context.getSender().getId() == "2898304046" || context.getSender().getId() == "3474006766") {
    if (msg.startsWith("setAdmin")) {
        var adminId = getAtId(msg)
        var admin = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-admin&key=admin")
        var setAdmin = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-admin&key=admin&value=" + admin + "，" + adminId)
    }
    if (msg == "刷新admin") {
        var getadmin = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-admin&key=admin")
        var getAdmin = utils.set(admin, getadmin)
        var flushAdmin = utils.get("getAdmin")
        context.send("当前admin为：" + flushAdmin)
    }
}

if (context.getType() == "group" || context.getType() == "friend") {
    var followAdmin = utils.get("admin")
    var sender = context.getSender().getId()
    if (sender = followAdmin.indexOf(followAdmin)) {
        if (msg.startsWith("发送私信")) {
            context.send("已发送")
            var message = msg.substring(4)
            context.getSender().sendMessage(message)
        }
        //==================发送私信结束

        if (msg.startsWith("复述")) {
            context.send("ok")
            var repeat = msg.substring(2)
            context.getSubject().sendMessage(repeat)
        }
        //======================复述结束

        if (msg.startsWith("传话")) {
            context.send("正在发送...请稍后")
            var args = msg.split(" ")
            var tar = context.getBot().getFriend(Number(args[1]));
            tar.sendMessage(args[2])
            context.send("发送完成")
        }
        //=============================传话结束

        if (msg.startsWith("群传话")) {
            context.send("正在发送...请稍后")
            var args = msg.split(" ")
            var tar = context.getBot().getGroup(Number(args[1]));
            tar.sendMessage(args[2])
            context.send("发送完成")
        }
        //=============================群传话结束

        if (msg == ".clear") {
            var number = utils.clear()
            context.send("clear all" + "\nclear number:" + number)
        }
        //==============================清除所有变量完成

        if (msg.startsWith(".del")) {
            var del = msg.substring(4)
            if (del.length == 0) {
                context.send("请输入变量名！")
            } else if (utils.get(del) == null) {
                context.send("未找到该变量！")
            } else {
                context.delName = utils.del(del)
                context.send("del " + delName)
            }
        }
        //=================================删除变量完成

        if (msg.startsWith(".set")) {
            var createA = msg.substring(4).trim()
            var create = createA.split(" ")
            if (create[0].length == 0) {
                context.send("请输入需创建的变量名！")
            } else if (create[1].length == 0) {
                context.send("请输入变量值！")
            } else {
                utils.set(create[0], create[1])
                context.send("set key：" + create[0] + "\n   value：" + create[1])
            }
        }
        //===================================创建变量结束

        if (msg.startsWith(".get")) {
            var name = msg.substring(4).trim()
            if (name.length == 0) {
                context.send(请输入变量名)
            } else {
                var value = utils.get(name)
                context.send(name + " : " + value)
            }
        }
        //=====================================获取变量结束

        if (msg == ".list") {
            var listA = utils.list()
            context.send(context.newPlainText(listA.toString()))
        }
        //=====================================列出变量结束

        if (msg.startsWith(".kpic")) {
            var kgetOut = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=" + msg.substring(5).trim())
            if (kgetOut == null) {
                context.send("get null")
            } else {
                context.send("get!\n" + kgetOut)
            }
        }
        //=======================================get kloping

        if (msg.startsWith(".kloadpic")) {
            var ksetData = msg.substring(9).trim()
            var ksetDataOut = ksetData.split(" ")
            if (ksetDataOut.length < 2) {
                context.send("key null or value null")
            } else {
                var saveLoad = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=pic")
                var ksetOut = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=" + ksetDataOut[0] + "&value=" + "<pic:" + ksetDataOut[1] + ">")
                var klist = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=pic" + "&value=" + saveLoad + "," + ksetDataOut[0])
                context.send("kload ok")
            }
        }
        //============================================upload picture to kloping

        if (msg == ".klistpic") {
            var klist = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=pic")
            if (klist !== null) {
                context.send(klist)
            } else {
                context.send("pic null")
            }
        }
        //======================================list kloping saved pic

        if (msg.startsWith(".kdelall")) {
            var delName = msg.substring(8).trim()
            if (delName.length == 0) {
                context.send("请输入key")
            } else {
                var getDelAllData = utils.requestGet("http://kloping.top/get?pwd=" + delName + "&key=")
                if (getDelAllData !== null) {
                    var delAllData = utils.requestGet("http://kloping.top/del?pwd=" + delName + "&key=")
                    context.send("kdel " + delName + " all")
                } else {
                    context.send("pwd null")
                }
            }
        }

        if (msg.startsWith(".kdelone")) {
            var delName = msg.substring(8).trim()
            var delNameA = delName.split(" ")
            if (delNameA < 2) {
                context.send("请输入pwd or 请输入key")
            } else {
                var getDelData = utils.requestGet("http://kloping.top/get?pwd=" + delName[0] + "&key=" + delName[1])
                if (getDelData !== null) {
                    var delData = utils.requestGet("http://kloping.top/del?pwd=" + delNameA[0] + "&key=" + delNameA[1])
                    context.send("kdel " + delNameA[1] + " ok")
                } else {
                    context.send("key null")
                }
            }
        }
        //================================================del kloping key all(x)
    }
}

if (context.getType() == "group" || context.getType() == "friend") {
    if (msg.startsWith(".上传") || msg.startsWith(".upload")) {
        var iid = getFormatValue("pic", msg)
        if (iid == null) {
            context.send("未发现图片")
        } else {
            var iurl = utils.queryUrlFromId(iid)
            iurl = encodeURI(iurl)
            var out = utils.requestGet("http://kloping.top/transImg?type=url&url=" + iurl)
            context.send("upload finish: " + out)
        }
    }
    if (msg.startsWith("喜报")) {
        context.send(context.uploadImage("https://api.andeer.top/API/img_xibao.php?data=" + msg.substring(2)));
    }
    //====================喜报结束

    if (msg.startsWith("甘雨抱抱你")) {
        context.send(context.uploadImage("https://api.andeer.top/API/img_love.php?qq=" + msg.substring(5)));
    }
    //====================甘雨抱抱你结束

    if (msg.startsWith("百度")) {
        var end = encodeURI(msg.substring(2));
        context.send("https://m.baidu.com/s?word=" + end);
    }
    //================百度结束

    if (msg.startsWith("网易云热评")) {
        var review = JSON.parse(context.requestGet("https://api.andeer.top/API/wangyi.php" + msg.substring(5)));
        context.send(review.data);
    }
    //=================网易云热评结束

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
    //====================================解方程结束
}
//======================================function


if (context.getType() == "MemberMuteEvent") {
    event.getGroup().sendMessage(context.newPlainText(event.getMember().getNick() + "\(" + event.getMember().getId() + "\)" + "禁止说话" + event.getDurationSeconds() + "秒"))
}

if (context.getType() == "MemberUnmuteEvent") {
    var at = event.getMember().getId()
    //var atA = context.deSerialize("<at:" + at + ">")
    //==== context.deSerialize 返回的对象是Message 不能拼接字符串
    //event.getGroup().sendMessage(atA + "被解除禁言了")
    var out = context.deSerialize("<at:" + at + ">\n被解除禁言了")
    event.getGroup().sendMessage(out)
}
//========================================获取禁言事件

if (context.getType() == "BotMuteEvent") {
    var bemute = context.getBot().getGroup(Number(868060057))
    bemute.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + event.getGroup().getName() + "”（"
        + event.getGroup().getId() + "）中被禁言" + "\n禁言时长为：" + event.getDurationSeconds() + "秒" +
        "\n操作者为：" + event.getOperator().getNameCard() + "（" + event.getOperator().getId() + "）"))
}
//=========================================获取Bot被禁言，在群868060057中提示

if (msg.indexOf("<at:" + context.getBot().getId() + ">") >= 0) {
    var group = context.getBot().getGroup(Number(868060057))
    var tg = context.getSubject()
    var sn = context.getSender().getNameCard()
    if (sn === null || sn === "") {
        sn = context.getSender().getNick()
    }
    group.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "”（" + tg.getId() + "）中被"
        + sn + "（" + context.getSender().getId() + "）提到"))
    group.sendMessage(context.deSerialize(("该消息为:\n" + msg)))
}
//=======================================如果Bot被提到，则转发至群

if (context.getType() == "group") {
    if (context.getSender().getId() == 2898304046) {
        if (msg.startsWith(".禁言")) {
            var qid = getAtId(msg)
            if (qid == null) {
                context.send("未发现at")
            } else {
                var b = getAllNumber(msg.replace(qid, ""), 1)
                if (msg.endsWith("秒") || msg.endsWith("s") || msg.endsWith(" ")) {
                    context.getSubject().get(qid).mute(b)
                } else if (msg.endsWith("分") || msg.endsWith("m")) {
                    var timeM = Number(b * 60)
                    context.getSubject().get(qid).mute(timeM)
                } else if (msg.endsWith("小时") || msg.endsWith("h")) {
                    var timeH = Number(b * 3600)
                    context.getSubject().get(qid).mute(timeH)
                }
            }
        }
    }
}
//===============================================================禁言结束

if (context.getType() == "group") {
    if (context.getSender().getId() == 2898304046) {
        if (msg.startsWith("解除禁言")) {
            var qid = getAtId(msg)
            if (qid !== null) {
                context.getSubject().get(qid).unmute()
            }
        }
    }
}
//==========================================================解除禁言结束

if (context.getType() == "group") {
    if (context.getSender().getId() == 2898304046) {
        var kick_state = utils.get("kicker_state")
        if (kick_state !== null || kick_state == true) {
            var qunid2 = utils.get("qunid1")
            var qunid = context.getSubject().getId()
            if (qunid == qunid2) {
                var tid2 = utils.get("tid1")
                var tips = msg
                context.getSubject(qunid2).get(tid2).kick(tips)
                utils.set("kicker_state", false)
            }
        } else if (msg.startsWith("kick")) {
            var tid = getAtId(msg)
            var qunid = context.getSubject().getId()
            if (tid == null) {
                context.send("未发现at")
            } else {
                utils.set("kicker_state", true)
                utils.set("tid1", tid)
                utils.set("qunid1", qunid)
                context.send("请输入踢出原因")
            }
        }
    }
}
//============================================kick结束