var GroupMessageEvent = Java.type("net.mamoe.mirai.event.events.GroupMessageEvent")
var FriendMessageEvent = Java.type("net.mamoe.mirai.event.events.FriendMessageEvent")

// 基础配置模版

// 所有消息事件入口
// msg string类型
// event java事件对象
// utils 工具
function onMsgEvent(msg, event) {
    log.log("收到消息 %s", msg)
    if (msg === "test") {
        if (event instanceof GroupMessageEvent) {
            var strCls = Java.type("java.lang.String")
            var sMsg = strCls.format("群消息 测试成功 <at:%s>", event.getSender().getId());
            var m0 = utils.deSerialize(sMsg)
            event.getSubject().sendMessage(m0)
        } else if (event instanceof FriendMessageEvent) {
            event.getSubject().sendMessage("好友消息 测试成功")
        } else {
            event.getSubject().sendMessage(event.class.getSimpleName() + ".消息测试成功")
        }
    }
}

// 所有机器人事件入口
// event java事件对象
function onBotEvent(event) {

}

// 被点赞事件入口
// event 包含字段 selfId,operatorId,times
// utils 工具
// bot 对象
function onProfileLike(event) {

}

// 点赞发送事件入口
// event 包含事件 selfId,operatorId,times ## Boolean ok; 是否成功 失败时原因 可能 不是好友 请求失败 或 点赞上限
// 其余同上

function onSendLiked(event) {

}

// 群签到事件入口
// event 字段 gid,selfId #Boolean ok;
function onGroupSign(event) {

}