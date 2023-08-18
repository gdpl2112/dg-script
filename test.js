// 这里是 测试中 在编写的脚本

var point_state_str = "point-state"
var point_name_str = "point-name"
var point_qid_str = "point-qid"

var point_state = context.get(point_state_str)

if (point_state != null && point_state) {
    var point_qid = context.get(point_qid_str)
    if (point_qid == null || point_qid <= 0) {
        context.del(point_state_str)
        context.del(point_name_str)
        context.del(point_qid_str)
    } else if (point_qid == context.getSender().getId()) {
        var name = context.get(point_name_str)
        if (msg.trim() === "1") {
            context.send("酷狗点歌" + name)
        } else if (msg.trim() === "2") {
            context.send("网易点歌" + name)
        } else {
            context.send("已取消")
        }
        context.set(point_state_str, false)
    }
} else if (msg.startsWith("点歌")) {
    if (msg.trim().length === 2) {
        context.send("歌名不可为空!")
    } else {
        context.send("输入序号选择\n1.酷狗点歌\n2.网易点歌\n其他取消")
        context.set(point_state_str, true)
        context.set(point_qid_str, context.getSender().getId())
        context.set(point_name_str, msg.substring(2).trim())
    }
}