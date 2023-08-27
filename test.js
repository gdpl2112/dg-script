if (context.getType() == "group") {
    if (msg.startsWith("kick")) {
        var kickA = msg.substring(4)
        if (kickA == "<at:" + context.getSubject().getId()+">") {
            var kickId = parseFloat(kickA)
            context.getSubject().get(kickId).kick()
        }
    }
}
//=====================无报错 但不实施