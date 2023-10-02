if (msg == "abcd") {
    var members = getGroupMember()
    var member = members.split(",")
    var i = 0
    while (i < 10) {
        var qq = getAllNumber(member[i])
        i++
        context.send(qq)
    }
}