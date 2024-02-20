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
    if (ns == -1) return context.getSender().getId(); else return ns
}

//https://q2.qlogo.cn/headimg_dl?dst_uin=3474006766&spec=640
if (context.getType() === "group") {
    var u0 = null
    if (msg == "菜单") {
        var fb = context.forwardBuilder()
        fb.add(context.getBot().getId(), "AI", context.newPlainText("管理: [念] [开] [关] [加词] [查词]"))
        fb.add(context.getBot().getId(), "AI",
            context.newPlainText("表情包:[好看] [撕] [激动] [恐龙] [加框] [高质量] [举] [单身狗证] [羡慕] [狗] [妻子] [干嘛] [画家] [朋友说(文字)] [要亲亲] [鲁迅说(文字)] [想] [赞] [老实点] [踢人] [捅] [加载] [屏幕] [爬] [牵] [冰淇淋] [素描] [求婚] [感动哭了] [想看] [悲报(文字)] [喜报(文字)] [需要] [甘雨爱心] [听音乐]"))
        fb.add(context.getBot().getId(), "AI",
            context.newPlainText("动:[垃圾] [等等我] [纳西妲咬] [砸] [墓碑] [画] [磕电脑] [拳击] [可达鸭] [击剑] [亲亲] [摸] [摇啊摇] [吃] [鸡腿舞] [招财猫] [一起笑] [打年糕] [贴贴] [看这个] [咬] [顶球] [拍瓜] [抓] [膜拜] [捣] [吃掉] [掀墙纸] [可莉吃]"))
        context.send(fb.build())
    } else if (msg.startsWith("捅")) {
        u0 = "http://kloping.top/api/image/tong?q1=" + context.getSender().getId() + "&q2=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("想")) {
        u0 = "https://api.andeer.top/API/img_miss.php?bqq=" + context.getSender().getId() + "&cqq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("亲亲")) {
        u0 = "https://api.andeer.top/API/img_kiss.php?bqq=" + context.getSender().getId() + "&cqq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("击剑")) {
        u0 = "https://api.andeer.top/API/gif_beat_j.php?bqq=" + context.getSender().getId() + "&cqq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("可达鸭")) {
        u0 = "https://api.andeer.top/API/gif_duck.php?bqq=" + context.getSender().getId() + "&cqq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("牵")) {
        u0 = "https://api.pearktrue.cn/api/qqbqb/qian/qian.php?qq1=" + context.getSender().getId() + "&qq2=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("妻子")) {
        u0 = "https://api.andeer.top/API/img_wife.php?bqq=" + context.getSender().getId() + "&cqq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("素描")) {
        u0 = "https://api.xingzhige.com/API/xian/?url=https%3A%2F%2Fq2.qlogo.cn%2Fheadimg_dl%3Fdst_uin%3D" + getAllNumberOrSelfId(msg) + "%26spec%3D640"
    } else if (msg.startsWith("悲报")) {
        u0 = "https://api.andeer.top/API/img_beibao.php?data=" + encodeURI(msg.substring(2).trim())
    } else if (msg.startsWith("喜报")) {
        u0 = "https://api.andeer.top/API/img_xibao.php?data=" + encodeURI(msg.substring(2).trim())
    } else if (msg.startsWith("鲁迅说")) {
        u0 = "https://api.andeer.top/API/img_luxun.php?text=" + encodeURI(msg.substring(2).trim())
    } else if (msg.startsWith("朋友说")) {
        var n1 = getAllNumberOrSelfId(msg);
        u0 = "https://api.andeer.top/API/img_say.php?qq=" + n1 + "&text=" + encodeURI(msg.substring(3).trim().replace("<at:" + n1 + ">", ""))
    } //以上特殊 多
    else if (msg.startsWith("垃圾")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=43&qq=" + getAllNumberOrSelfId(msg);
    }else if (msg.startsWith("等等我")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=25&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("纳西妲咬")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=18&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("砸")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=49&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("好看")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=106&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("墓碑")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=112&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("撕")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=111&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("画")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=19&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("磕电脑")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=23&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("激动")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=15&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("恐龙")) {
        u0 = "https://api.lolimi.cn/API/preview/api.php?&type=31&qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("加框")) {
        u0 = "https://api.wxsszs.cn/api/tksc.php?qq=" + getAllNumberOrSelfId(msg);
    }else if (msg.startsWith("高质量")) {
        u0 = "https://api.andeer.top/API/gzl.php?qq=" + getAllNumberOrSelfId(msg);
    }else if (msg.startsWith("举")) {
        u0 = "https://api.andeer.top/API/ju.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("单身狗证")) {
        u0 = "https://api.andeer.top/API/dsg.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("羡慕")) {
        u0 = "https://api.andeer.top/API/xianmu.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("抱")) {
        u0 = "https://api.andeer.top/API/bao.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("狗")) {
        u0 = "https://api.andeer.top/API/dog.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("拳击")) {
        u0 = "https://api.andeer.top/API/gif_beat.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("干嘛")) {
        u0 = "https://api.andeer.top/API/img_whyat.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("摇啊摇")) {
        u0 = "http://kloping.top/api/image/yao2yao?qid=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("画家")) {
        u0 = "https://api.andeer.top/API/img_painter.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("要亲亲")) {
        u0 = "https://api.andeer.top/API/img_kiss_1.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("赞")) {
        u0 = "https://api.andeer.top/API/img_good.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("老实点")) {
        u0 = "https://api.andeer.top/API/img_lsd.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("踢人")) {
        u0 = "https://api.andeer.top/API/img_tr.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("摸")) {
        u0 = "https://api.andeer.top/API/gif_mo.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("加载")) {
        u0 = "https://api.andeer.top/API/img_loading.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("屏幕")) {
        u0 = "https://api.andeer.top/API/img_screen.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("可莉吃")) {
        u0 = "https://api.andeer.top/API/gif_klee_eat.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("掀墙纸")) {
        u0 = "https://api.andeer.top/API/gif_wallpaper.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("听音乐")) {
        u0 = "https://api.andeer.top/API/img_listen_music.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("需要")) {
        u0 = "https://api.andeer.top/API/img_need.php?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("吃")) {
        u0 = "https://api.xingzhige.com/API/chi/?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("爬")) {
        u0 = "https://api.xingzhige.com/API/pa/?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("冰淇淋")) {
        u0 = "https://api.xingzhige.com/API/bql/?qq=" + getAllNumberOrSelfId(msg);
    } else if (msg.startsWith("鸡腿舞")) {
        u0 = "https://api.xingzhige.com/API/DanceChickenLeg/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("招财猫")) {
        u0 = "https://api.xingzhige.com/API/FortuneCat/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("一起笑")) {
        u0 = "https://api.xingzhige.com/API/LaughTogether/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("打年糕")) {
        u0 = "https://api.xingzhige.com/API/pound/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("贴贴")) {
        u0 = "https://api.xingzhige.com/API/baororo/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("看这个")) {
        u0 = "https://api.xingzhige.com/API/Lookatthis/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("咬")) {
        u0 = "https://api.xingzhige.com/API/bite/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("顶球")) {
        u0 = "https://api.xingzhige.com/API/dingqiu/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("抓")) {
        u0 = "https://api.xingzhige.com/API/grab/?qq=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("求婚")) {
        u0 = "https://api.lolimi.cn/API/face_propose/?QQ=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("感动哭了")) {
        u0 = "https://api.lolimi.cn/API/face_touch/?QQ=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("膜拜")) {
        u0 = "https://api.lolimi.cn/API/face_worship/?QQ=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("想看")) {
        u0 = "https://api.lolimi.cn/API/face_thsee/?QQ=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("捣")) {
        u0 = "https://api.lolimi.cn/API/face_pound/?QQ=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("吃掉")) {
        u0 = "https://api.lolimi.cn/API/face_bite/?QQ=" + getAllNumberOrSelfId(msg)
    } else if (msg.startsWith("甘雨爱心")) {
        u0 = "https://api.andeer.top/API/img_love.php?qq=" + getAllNumberOrSelfId(msg)
    }
    if (u0 != null) context.send(context.uploadImage(u0))
}
