//data name
//pwd=dg-2898304046 key=api_state 储存本地"api_state"
//pwd=dg-2898304046 key=update_log 储存本地异步"update_state"
//pwd=dg-2898304046 key=group_state 储存本地"group_state"
//pwd=dg-2898304046 key=manage_state 储存本地"manage_state"
//pwd=dg-2898304046 key=nudge_state 储存本地"nudge_state"
//pwd=dg-2898304046 key=fool_state 储存本地"fool_state""
//pwd=dg-2898304046-bottle key=bottleId value=bottleMessage 储存本地"bottle_state"

//本地异步"setLog_state"

//pwd=dg-2898304046-admin key=adminId 储存本地"admin"+senderId


if (msg == "date") {
    context.send(getTime())
}

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
    if (context.getType() == "group" || context.getType() == "friend") {
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
}

//检测Bot杂项开关
function get_group_state() {
    var get_group = utils.get("group_state")
    if (get_group == null) {
        var group_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=group_state")
        utils.set("group_state", group_state)
        var get_group_state = utils.get("group_state")
        return get_group_state
    } else {
        return get_group
    }
}

//群管开关
function get_manage_state() {
    var get_manage = utils.get("manage_state")
    if (get_manage == null) {
        var manage_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=manage_state")
        utils.set("manage_state", manage_state)
        var get_mange_state = utils.get("manage_state")
        return get_mange_state
    } else {
        return get_manage
    }
}

//拍一拍开关
function get_nudge_state() {
    var get_nudge = utils.get("nudge_state")
    if (get_nudge == null) {
        var nudge_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=nudge_state")
        utils.set("nudge_state", nudge_state)
        var get_nudge_state = utils.get("nudge_state")
        return get_nudge_state
    } else {
        return get_nudge
    }
}

//傻瓜功能开关
function get_fool_state() {
    var get_fool = utils.get("fool_state")
    if (get_fool == null) {
        var fool_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=fool_state")
        utils.set("fool_state", fool_state)
        var get_fool_state = utils.get("fool_state")
        return get_fool_state
    } else {
        return get_fool
    }
}

//getGroupList
function getGroup() {
    var groupList = context.getBot().getGroups()
    return groupList
}

//getFriendList
function getFriend() {
    var friendList = context.getBot().getFriends()
    return friendList
}

//object of api
function getApiObject(str) {
    var id = msg.substring(str)
    var at = getAtId(msg)
    if (at !== null) {
        return at
    } else if (id !== null) {
        return id
    } else {
        return null
    }
}

//getRandomNumber
function getRandomNumber(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

//getGroupMember
function getGroupMember() {
    if (context.getType() == "group") {
        var groupMembers = context.getSubject().getMembers()
        return groupMembers
    }
}

//============================================================================================================================================
//菜单
if (context.getType() == "group" || context.getType() == "friend") {
    if (msg == "默的菜单") {
        var menu = utils.requestGet("http://kloping.top/temp/2023/10/12/4f4476aa-4513-4ab1-8d3d-4a842d4c4438.jpg")
        context.send("<at:" + context.getSender().getId() + ">\n" + menu)
    }
}

//功能性admin用法
if (context.getType() == "group" || context.getType() == "friend") {
    if (get_admin() == "true") {
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

            case "开启杂项":
                if (get_group_state() == "false" || get_group_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=group_state&value=true")
                    utils.set("group_state", "true")
                    context.send("正在开启杂项...")
                } else {
                    context.send("杂项已开启")
                }
                break

            case "关闭杂项":
                if (get_group_state() == "true" || get_group_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=group_state&value=false")
                    utils.set("group_state", "false")
                    context.send("正在关闭杂项...")
                } else {
                    context.send("杂项已关闭")
                }
                break

            case "默开":
                if (get_manage_state() == "false" || get_manage_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=manage_state&value=true")
                    utils.set("manage_state", "true")
                    context.send("正在开启...")
                } else {
                    context.send("已开启")
                }
                break

            case "默关":
                if (get_manage_state() == "true" || get_manage_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=manage_state&value=false")
                    utils.set("manage_state", "false")
                    context.send("正在关闭...")
                } else {
                    context.send("已关闭")
                }
                break

            case "开启戳一戳":
                if (get_nudge_state() == "false" || get_nudge_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=nudge_state&value=true")
                    utils.set("nudge_state", "true")
                    context.send("正在开启戳一戳...")
                } else {
                    context.send("已开启戳一戳")
                }
                break

            case "关闭戳一戳":
                if (get_nudge_state() == "true" || get_nudge_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=nudge_state&value=false")
                    utils.set("nudge_state", "false")
                    context.send("正在关闭戳一戳...")
                } else {
                    context.send("已关闭戳一戳")
                }
                break

            case "开启傻瓜功能":
                if (get_fool_state() == "false" || get_fool_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=fool_state&value=true")
                    utils.set("fool_state", "true")
                    context.send("正在开启傻瓜功能...")
                } else {
                    context.send("已开启傻瓜功能")
                }
                break

            case "关闭傻瓜功能":
                if (get_fool_state() == "true" || get_fool_state() == null) {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=fool_state&value=false")
                    utils.set("fool_state", "false")
                    context.send("正在关闭傻瓜功能...")
                } else {
                    context.send("已关闭傻瓜功能")
                }
                break

            case ".state":
                var api = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=api_state")
                var group_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=group_state")
                var manage_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=manage_state")
                var nudge_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=nudge_state")
                var fool_state = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=fool_state")
                var botImage = context.getBot().getAvatarUrl()
                context.send("<at:" + context.getSender().getId() + ">"
                    + "\napi状态为:" + api
                    + "\n杂项状态为:" + group_state
                    + "\n群管状态为:" + manage_state
                    + "\n戳一戳状态为:" + nudge_state
                    + "\n傻瓜功能状态为:" + fool_state)
                break

            case ".log":
                var log = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046&key=update_log")
                context.send("更新日志:\n" + log)
                break

            case ".clear":
                var number = utils.clear()
                context.send("clear all" + "\nclear number:" + number)
                break

            case ".list":
                var listA = utils.list()
                context.send(context.newPlainText(listA.toString()))
                break
        }
    }
}


//异步&Bot专用===================================================================================================================================
if (context.getType() == "group" || context.getType() == "friend") {
    if (context.getSender().getId() == context.getBot().getId()) {
        //更新日志
        var update_state = utils.get("update_state")
        var time = getTime()
        if (update_state == true) {
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

        //setLog
        var setLog_state = utils.get("setLog_state")
        if (setLog_state == true) {
            var qid2 = utils.get("qid1")
            var qid = context.getSubject().getId()
            if (qid == qid2) {
                var newLog = msg
                if (newLog == "null") {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=update_log&value=")
                    context.send("已清空更新日志")
                    utils.set("setLog_state", false)
                } else {
                    utils.requestGet("http://kloping.top/put?pwd=dg-2898304046&key=update_log&value=" + newLog)
                    context.send("修改成功")
                    utils.set("setLog_state", false)
                }
            }
        } else if (msg == ".setLog") {
            context.send("开始修改更新日志 请输入")
            var qid1 = context.getSubject().getId()
            utils.set("qid1", qid1)
            utils.set("setLog_state", true)
        }

        //setAdmin
        if (msg.startsWith(".setAdmin")) {
            var getAdminId = getApiObject(9)
            if (msg.length <= 9) {
                context.send("未检测到at")
            } else {
                var admin_state = utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-admin&key=" + getAdminId + "&value=true")
                utils.set("admin" + getAdminId, "true")
                context.send("已设置" + context.getSubject().get(getAdminId).getNick() + "(" + getAdminId + ")为管理")
            }
        }

        //unAdmin
        if (msg.startsWith(".unAdmin")) {
            var getAdminId = getApiObject(8)
            if (msg.length <= 8) {
                context.send("未检测到at")
            } else {
                utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-admin&key=" + getAdminId)
                utils.del("admin" + getAdminId)
                context.send("已取消" + context.getSubject().get(getAdminId).getNick() + "(" + getAdminId + ")的管理")
            }
        }

        //clear wifeList
        if (msg == ".delwife") {
            utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-husband&key=")
            utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-wife&key=")
            context.send("delwife ok")
        }

        //clear favorability
        if (msg.startsWith(".delfavor")) {
            var object = getApiObject(9)
            if (object.length > 0) {
                utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-favorability&key=" + object)
                context.send("del " + object + " favor ok")
            } else {
                utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-favorability&key=")
                context.send("delfavor ok")
            }
        }

        //clear name
        if (msg.startsWith(".delname")) {
            var object = getApiObject(8)
            if (object.length > 0) {
                utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-name&key=" + object)
                context.send("del " + object + " name ok")
            } else {
                utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-name&key=")
                context.send("delname ok")
            }
        }

        //del point bottle
        if (msg.startsWith(".delbottle")) {
            var bottleId = msg.substring(10).trim()
            if (bottleId.length <= 0) {
                utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-bottle&key=")
                context.send("del bottle ok")
            } else {
                utils.requestGet("http://kloping.top/del?pwd=dg-2898304046-name&key=" + bottleId)
                context.send("del id:" + " bottle ok")
            }
        }

        //list bottle
        if (msg == ".listbottle") {
            var bottleList = utils.requestGet("http://kloping.top/list?pwd=dg-2898304046-bottle")
            context.send(context.newPlainText(bottleList.toString()))
        }
    }
}


//api调用=========================================================================================================================
if (context.getType() == "group" || context.getType() == "friend") {
    if (get_api_state() == "true") {
        //甘雨抱抱你
        if (msg.startsWith("甘雨抱抱你")) {
            var object = getApiObject(5)
            context.send(context.uploadImage("https://api.andeer.top/API/img_love.php?qq=" + object))
        }

        //贴贴
        if (msg.startsWith("贴贴")) {
            var object = getApiObject(2)
            context.send(context.uploadImage("https://api.xingzhige.com/API/baororo/?qq=" + object))
        }

        //顶
        if (msg.startsWith("顶")) {
            var object = getApiObject(1)
            context.send(context.uploadImage("https://api.xingzhige.com/API/dingqiu/?qq=" + object))
        }

        //咬
        if (msg.startsWith("咬")) {
            var object = getApiObject(1)
            context.send(context.uploadImage("https://api.xingzhige.com/API/bite/?qq=" + object))
        }

        //拍
        if (msg.startsWith("拍")) {
            var object = getApiObject(1)
            context.send(context.uploadImage("https://api.xingzhige.com/API/grab/?qq=" + object))
        }

        //百度
        if (msg.startsWith("百度")) {
            var end = encodeURI(msg.substring(2));
            context.send("https://m.baidu.com/s?word=" + end);
        }

        //网易云热评
        if (msg.startsWith("网易云热评")) {
            var review = JSON.parse(utils.requestGet("https://api.andeer.top/API/wangyi.php" + msg.substring(5)));
            context.send(review.data);
        }

        //setu
        if (msg == "setu") {
            var parse = JSON.parse(utils.requestGet("https://api.lolicon.app/setu/v2"))
            var url = parse.data[0].urls.original
            context.send(context.uploadImage(url))
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

        //漂流瓶
        var bottle_state = utils.get("bottle_state")
        if (bottle_state == true) {
            var gid2 = utils.get("gid1")
            var qid2 = utils.get("qid1")
            var gid = context.getSubject().getId()
            var qid = context.getSender().getId()
            if (gid == gid2) {
                if (qid == qid2) {
                    //获取bottle内容
                    var bottleMessage = msg
                    //获取当前群名
                    var groupName = context.getBot().getGroup(gid2).getName()
                    //获取发送者名字
                    var senderName = context.getSender().getNick()
                    //获取发送者id
                    var senderId = context.getSender().getId()
                    //构建bottle内容
                    var setBottleMessage = "你捡到了一个来自群\"" + groupName + "\"(" + gid2 + ")的瓶子\n内容为:"
                        + msg +
                        "\n丢取的人是:" + senderName + "(" + senderId + ")"
                    //获取当前bottle序号
                    var getBottleNumber = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-bottle&key=number")
                    //如果序号为空 则设置value=0
                    if (getBottleNumber == null) {
                        utils.set("bottle_state", false)
                        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-bottle&key=number&value=0")
                        //并将序号key=0 的消息存入
                        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-bottle&key=0&value=" + setBottleMessage)
                        context.send("你的瓶子已扔向大海啦")
                    } else {
                        utils.set("bottle_state", false)
                        var bottleNumber = Number(getBottleNumber) + 1
                        context.send(bottleNumber)
                        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-bottle&key=number&value=" + bottleNumber)
                        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-bottle&key=" + bottleNumber + "&value=" + setBottleMessage)
                        context.send("你的瓶子已扔向大海啦")
                    }
                }
            }
        } else if (msg == "扔瓶子") {
            var name = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-name&key=" + context.getSender().getId())
            if (name == null) {
                var name = context.getSender().getNick()
                context.send("请" + name + "快写下自己想说的话吧")
                var gid1 = context.getSubject().getId()
                var qid1 = context.getSender().getId()
                utils.set("gid1", gid1)
                utils.set("qid1", qid1)
                utils.set("bottle_state", true)
            } else {
                context.send("请" + name + "快写下自己想说的话吧")
                var gid1 = context.getSubject().getId()
                var qid1 = context.getSender().getId()
                utils.set("gid1", gid1)
                utils.set("qid1", qid1)
                utils.set("bottle_state", true)
            }
        }

        if (msg == "捡瓶子") {
            var getBottleNumber = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-bottle&key=number")
            var getRandomBottle = getRandomNumber(0, getBottleNumber)
            if (getBottleNumber == null) {
                context.send("当前还没有瓶子哦 赶快扔一个吧")
            } else {
                var bottle = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-bottle&key=" + getRandomBottle)
                context.send("<at:" + context.getSender().getId() + ">\n" + bottle)
            }
        }
    }
}

//杂项开关=======================================================================================================================================
if (get_group_state() == "true") {
    //获取禁言事件
    if (context.getType() == "MemberMuteEvent") {
        event.getGroup().sendMessage(context.newPlainText(event.getMember().getNick() + "\(" + event.getMember().getId() + "\)" + "禁止说话" + event.getDurationSeconds() + "秒"))
    }

    //获取禁言事件
    if (context.getType() == "MemberUnmuteEvent") {
        var at = event.getMember().getId()
        var out = context.deSerialize("<at:" + at + ">\n被解除禁言了")
        event.getGroup().sendMessage(out)
    }

    //获取Bot被禁言，在群704114206中提示
    if (context.getType() == "BotMuteEvent") {
        var bemute = context.getBot().getGroup(Number(704114206))
        bemute.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + event.getGroup().getName() + "”（"
            + event.getGroup().getId() + "）中被禁言" + "\n禁言时长为：" + event.getDurationSeconds() + "秒" +
            "\n操作者为：" + event.getOperator().getNameCard() + "（" + event.getOperator().getId() + "）"))
    }

    //如果Bot被提到，则转发至群
    if (msg.indexOf("<at:" + context.getBot().getId() + ">") >= 0) {
        var group = context.getBot().getGroup(Number(704114206))
        var tg = context.getSubject()
        var sn = context.getSender().getNameCard()
        var time = getTime()
        if (sn === null || sn === "") {
            sn = context.getSender().getNick()
        }
        group.sendMessage(time)
        group.sendMessage(context.newPlainText("Bot（" + context.getBot().getId() + "）在群“" + tg.getName() + "”（" + tg.getId() + "）中被"
            + sn + "（" + context.getSender().getId() + "）提到"))
        group.sendMessage(context.deSerialize(("该消息为:\n" + msg)))
    }
}

//群管功能========================================================================================================================================
if (get_manage_state() == "true") {
    if (get_admin() == "true") {
        //禁言
        if (msg.startsWith("默禁言")) {
            var qid = getAtId(msg)
            if (qid == null) {
                context.send("未发现at")
            } else {
                var b = getAllNumber(msg.replace(qid, ""))
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

        //解除禁言
        if (msg.startsWith("默解除禁言")) {
            var qid = getAtId(msg)
            if (qid !== null) {
                context.getSubject().get(qid).unmute()
            }
        }
    }
}

//戳一戳回复=====================================================================================================================================
if (get_nudge_state() == "true") {
    if (context.getType() == "NudgeEvent") {
        if (event.getFrom().getId() !== event.getBot().getId() && event.getTarget().getId() == event.getBot().getId()) {
            var randomReply = getRandomNumber(1, 5)
            switch (randomReply) {
                case 1:
                    event.getSubject().sendMessage(context.newPlainText("不要再戳辣>ᯅ<在戳就坏惹！"))
                    break
                case 2:
                    event.getSubject().sendMessage(context.newPlainText("戳戳戳！就知道戳！服啦"))
                    break
                case 3:
                    event.getSubject().sendMessage(context.newPlainText("戳我是想我的意思嘛~嘻嘻"))
                    break
                case 4:
                    event.getSubject().sendMessage(context.newPlainText("反击!"))
                    event.getFrom().nudge().sendTo(event.getSubject())
                    break
                case 5:
                    event.getSubject().sendMessage(context.newPlainText("偷偷摸摸的ヾ(ﾟ∀ﾟゞ)系不系暗恋窝鸭"))
                    break
            }
        }
    }
    if (msg.startsWith("戳")) {
        var beNudge = getApiObject(1)
        var group = context.getSubject()
        var member = group.get(beNudge)
        member.nudge().sendTo(group)
        event.getSubject().sendMessage(context.newPlainText("戳戳你的awa"))
    }
}


if (context.getType() == "group") {
    //dg-2898304046-wife key=husband value=wife
    //dg-2898304046-husband key=wife value=husband
    if (msg == "娶群友") {
        //获取群内成员并分组
        var getMemberList = getGroupMember()
        var memberListString = getMemberList.toString()
        var memberList = memberListString.split(",")
        //获取群人数
        var memberMax = context.getSubject().getMembers().size()
        //随机获取群友
        var i = getRandomNumber(0, memberMax)
        //获取群友qq号
        var wife = memberList[i].replace(/[^\d]/g, "")
        var husband = context.getSender().getId()
        //获取群友头像
        var wifeImage = context.getSubject().get(wife).getAvatarUrl()
        var husbandImage = context.getSubject().get(husband).getAvatarUrl()
        //获取群友名字
        var wifeName = context.getSubject().get(wife).getNick()
        var husbandName = context.getSubject().get(husband).getNick()


        //储存
        //检测是否有老婆
        var married = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-wife&key=" + husband)
        //检测是否有老公
        var beMarried = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-husband&key=" + husband)
        if (married == null) {
            if (beMarried == null) {
                //将发送者存为老公
                utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-wife&key=" + husband + "&value=" + wife)
                //将获取的群友存为老婆
                utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-husband&key=" + wife + "&value=" + husband)
                context.send("<at:" + context.getSender().getId() + ">\n"
                    + "今天你的群友老婆是\n"
                    + "<pic:" + wifeImage + ">\n"
                    + wifeName + "(" + wife + ")")
            } else if (context.getSubject().get(beMarried) == null) {
                context.send("< at:" + context.getSender().getId() + " >\n你今日已被娶 你的群友老公在别的群哦 找错地方啦")
            } else {
                //获取已存老公头像
                var beWifeImage = context.getSubject().get(beMarried).getAvatarUrl()
                //获取已存老公名字
                var beWifeName = context.getSubject().get(beMarried).getNick()

                context.send("<at:" + context.getSender().getId() + ">\n"
                    + "今天你已被娶\n群友老公是\n"
                    + "<pic:" + beWifeImage + ">\n"
                    + beWifeName + "(" + beMarried + ")")
            }
        } else if (context.getSubject().get(married) == null) {
            context.send("<at:" + context.getSender().getId() + ">\n你今天已经有群友老婆啦 去别的群把他找回来吧")
        } else {
            //获取已存老婆头像
            var beHusbandImage = context.getSubject().get(married).getAvatarUrl()
            //获取已存老婆名字
            var beHusbandName = context.getSubject().get(married).getNick()

            context.send("<at:" + context.getSender().getId() + ">\n"
                + "太贪心啦！你今天已经拥有一个老婆了！\n今天你的群友老婆是\n"
                + "<pic:" + beHusbandImage + ">\n"
                + beHusbandName + "(" + married + ")")
        }
    }

    if (msg == "重娶群友") {
        //获取群内成员并分组
        var getMemberList = getGroupMember()
        var memberListString = getMemberList.toString()
        var memberList = memberListString.split(",")
        //获取群人数
        var memberMax = context.getSubject().getMembers().size()
        //随机获取群友
        var i = getRandomNumber(0, memberMax)
        //获取群友qq号
        var wife = memberList[i].replace(/[^\d]/g, "")
        var husband = context.getSender().getId()
        //获取群友头像
        var wifeImage = context.getSubject().get(wife).getAvatarUrl()
        var husbandImage = context.getSubject().get(husband).getAvatarUrl()
        //获取群友名字
        var wifeName = context.getSubject().get(wife).getNick()
        var husbandName = context.getSubject().get(husband).getNick()

        //将发送者存为老公
        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-wife&key=" + husband + "&value=" + wife)
        //将获取的群友存为老婆
        utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-husband&key=" + wife + "&value=" + husband)
        context.send("<at:" + context.getSender().getId() + ">\n"
            + "今天你的群友老婆是\n"
            + "<pic:" + wifeImage + ">\n"
            + wifeName + "(" + wife + ")")
    }
}

//pwd=dg-2898304046-setname key=qid value=name
//pwd=dg-2898304046-favorability key=qid value=value
if (context.getType() == "group") {
    if (get_fool_state() == "true") {
        var isRun = getRandomNumber(1, 2)
        //设置名字
        //查看档案
        //获取at 加好感度
        if (msg.startsWith("默默以后请叫我")) {
            var name = msg.substring(7)
            utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-name&key=" + context.getSender().getId() + "&value=" + name)
            context.send("okk 默默知道啦 以后就称呼你为" + name + "了")
        } else if (msg == "默默查看我的档案") {
            var image = context.getSender().getAvatarUrl()
            var name = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-name&key=" + context.getSender().getId())
            var favor = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-favorability&key=" + context.getSender().getId())
            if (favor == null) {
                var favor = "0"
                context.send("<pic:" + image + ">" + "\n<at:" + context.getSender().getId() + ">\n" + "你的称呼为:" + name + "\n当前好感度为:" + favor)
            } else {
                context.send("<pic:" + image + ">" + "\n<at:" + context.getSender().getId() + ">\n" + "你的称呼为:" + name + "\n当前好感度为:" + favor)
            }
        } else if (isRun == 1) {
            if (msg.indexOf("<at:" + context.getBot().getId() + ">") >= 0 || msg.indexOf("默默") >= 0) {
                var name = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-name&key=" + context.getSender().getId())
                var favorability = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-favorability&key=" + context.getSender().getId())
                var addRandomFavor = getRandomNumber(1, 5)
                var addFavor = Number(Number(favorability) + Number(addRandomFavor))
                utils.requestGet("http://kloping.top/put?pwd=dg-2898304046-favorability&key=" + context.getSender().getId() + "&value=" + addFavor)
                if (name == null) {
                    var name = context.getSender().getNick()
                    context.send("感谢" + name + "陪默默聊天 好感度+" + addRandomFavor)
                } else {
                    context.send("感谢" + name + "陪默默聊天 好感度+" + addRandomFavor)
                }
            }
        }

        //获取设置名字
        if (msg == "默默我是谁") {
            var name = utils.requestGet("http://kloping.top/get?pwd=dg-2898304046-name&key=" + context.getSender().getId())
            if (name == null) {
                var name = context.getSender().getNick()
                context.send("这个默默知道！你是" + name)
            } else {
                context.send("这个默默知道！你是" + name)
            }
        }
    }
}








if (context.getType() == "MemberJoinRequestEvent") {
    var joinMessage = event.getMessage()
    var joinId = event.getFromId()
    var joinNick = event.fromNick()
    var invitorId = event.getInvitorId()
    event.sendMessage(context.newPlainText("有一个新的成员要入群啦！\n他的名字叫:" + joinNick + "(" + joinId + ")\n邀请者为:" + getInvitorId))
}