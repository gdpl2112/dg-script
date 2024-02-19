//获取消息中的全部数字
function getAllNumber(str) {
    var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var out = ""
    for (var i = 0; i < str.length; i++) {
        var e = str[i]
        if (ns.indexOf(e) >= 0) {
            out = out + e
        }
    }
    if (out.length > 0) {
        return Number(out)
    } else {
        return -1
    }
}

//获取消息中的全部数字
function getAllNumberOrSelfId(str) {
    var ns = getAllNumber(str)
    if (ns == -1) return context.getSender().getId();
    else return ns
}

//https://q2.qlogo.cn/headimg_dl?dst_uin=3474006766&spec=640
if (context.getType() === "group") {
    if (msg.startsWith("我要头衔")) {
        var group = context.getSubject()
        var ms = group.getBotAsMember();
        var mt = group.get(context.getSender().getId());
        if (ms.getPermission().getLevel() == 2) {
            mt.setSpecialTitle(msg.substring(4));
        }
    } else if (msg == "菜单" || msg == "妤菜单") {
        context.send("功能:[点歌 (歌名)] [酷狗点歌 (歌名)] [网易点歌 (歌名)]\n娱乐: [答案之书]\n表情包: [吃] [爬] [牵] [冰淇淋] [素描]" +
            "\n动: [鸡腿舞] [招财猫] [一起笑] [打年糕] [抱] [看这个] [咬] [顶球]")
        // var fb = context.forwardBuilder()
        //         fb.add(context.getBot().getId(), "AI", "功能:[点歌 (歌名)] [酷狗点歌 (歌名)] [网易点歌 (歌名)]")
        //         fb.add(context.getBot().getId(), "AI", "娱乐: [答案之书]\n表情包: [吃] [爬] [牵] [冰淇淋] [素描]")
        //         fb.add(context.getBot().getId(), "AI", "动: [鸡腿舞] [招财猫] [一起笑] [打年糕] [抱] [看这个] [咬] [顶球]")
        //         context.send(fb.build())
    } else if (msg.startsWith("吃")) {
        var u0 = "https://api.xingzhige.com/API/chi/?qq=" + getAllNumberOrSelfId(msg);
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("爬")) {
        var u0 = "https://api.xingzhige.com/API/pa/?qq=" + getAllNumberOrSelfId(msg);
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("牵")) {
        var u0 = "https://api.pearktrue.cn/api/qqbqb/qian/qian.php?qq1=" + context.getSender().getId() + "&qq2=" + getAllNumberOrSelfId(msg);
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("冰淇淋")) {
        var u0 = "https://api.xingzhige.com/API/bql/?qq=" + getAllNumberOrSelfId(msg);
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("素描")) {
        var u0 = "https://api.xingzhige.com/API/xian/?url=https%3A%2F%2Fq2.qlogo.cn%2Fheadimg_dl%3Fdst_uin%3D" + getAllNumberOrSelfId(msg) + "%26spec%3D640"
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("鸡腿舞")) {
        var u0 = "https://api.xingzhige.com/API/DanceChickenLeg/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("招财猫")) {
        var u0 = "https://api.xingzhige.com/API/FortuneCat/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("一起笑")) {
        var u0 = "https://api.xingzhige.com/API/LaughTogether/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("打年糕")) {
        var u0 = "https://api.xingzhige.com/API/pound/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("抱")) {
        var u0 = "https://api.xingzhige.com/API/baororo/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("看这个")) {
        var u0 = "https://api.xingzhige.com/API/Lookatthis/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    } else if (msg.startsWith("咬")) {
        var u0 = "https://api.xingzhige.com/API/bite/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    }else if (msg.startsWith("顶球")) {
        var u0 = "https://api.xingzhige.com/API/dingqiu/?qq=" + getAllNumberOrSelfId(msg)
        context.send(context.uploadImage(u0))
    }
}
