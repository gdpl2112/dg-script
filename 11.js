if (msg !== null) {
    var fA = msg
    if (F1 !== null) {
        var fB = msg
        context.set(F1,fB)
        if (F == F1) {
            context.send(F1)
        } else {
            context.set(F, null)
        }
    } else {
        context.set(F, fA)
    }
}