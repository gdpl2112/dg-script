// 这里是 测试中 在编写的脚本
if (msg.startsWith("创建变量")) {
    var create = msg.split(" ")
    if (create[1].length == 0) {
        context.send("请输入需创建的变量名！")
    } else if (create[2].length == 0) {
        context.send("请输入变量值！")
    } else if (create[2] !== true || create[2] !== false) {
        context.send("请输入boolean！")
    } else {
        context.set(create[1], create[2])
        context.send(create[1] + " 创建完成")
    }
}

if (context.getType() === "group") {
    if (msg === "do") {
        utils.set("do", true)
        context.send("就绪")
    } else {
        var dd = utils.get("do");
        if (dd != null && dd) {
            context.send(msg)
            utils.set("do", false)
        }
    }
}