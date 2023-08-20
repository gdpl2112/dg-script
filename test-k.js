if (context.getSender().getId() == 3474006766) {
    var okv = msg.split(" ");
    switch (okv[0]) {
        case "set":
            if (okv.length !== 3) {
                context.send("args size less 3")
            } else {
                var old = context.set(okv[1], okv[2])
                context.send("set success and old: " + old)
            }
            break;
        case "get":
            if (okv.length !== 2) {
                context.send("args size less 2")
            } else {
                var v0 = context.get(okv[1])
                context.send("key: " + okv[1] + "\nvalue: " + v0)
            }
            break;
        case "del":
            if (okv.length !== 2) {
                context.send("args size less 2")
            } else {
                var v0 = context.del(okv[1])
                context.send("del success! key: " + okv[1] + "\nvalue: " + v0)
            }
            break;
        case "clear":
            var n = context.clear();
            context.send("clear success and clear numbers: " + n)
            break;
    }
}