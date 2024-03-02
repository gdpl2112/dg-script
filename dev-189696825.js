if (context.getType() === "group") {
    if (msg.startsWith("我要头衔")) {
        var group = context.getSubject()
        var ms = group.getBotAsMember();
        var mt = group.get(context.getSender().getId());
        if (ms.getPermission().getLevel() == 2) {
            mt.setSpecialTitle(msg.substring(4));
        }
    }
}