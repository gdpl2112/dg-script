// 基础 环境
var utils = Java.type('io.github.gdpl2112.dg_bot.service.script.ScriptUtils');

var messageEvent = Java.type('net.mamoe.mirai.event.events.MessageEvent');
onMsgEvent("测试", messageEvent, utils)

var botEvent = Java.type('net.mamoe.mirai.event.events.BotEvent');
onBotEvent(botEvent, utils)

var bot = Java.type('net.mamoe.mirai.Bot');

var event0 = Java.type('io.github.gdpl2112.dg_bot.events.ProfileLikeEvent');
onProfileLike(event0, utils, bot)

var event1 = Java.type('io.github.gdpl2112.dg_bot.events.SendLikedEvent');
onSendLiked(event1, utils, bot)

var event2 = Java.type('io.github.gdpl2112.dg_bot.events.GroupSignEvent');
onGroupSign(event2, utils, bot)
