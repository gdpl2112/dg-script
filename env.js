class ScriptUtils {
    /**
     * get 请求
     *
     * @param url
     * @return
     */
    requestGet(url);

    /**
     * post 请求
     *
     * @param url
     * @return
     */
    requestPost(url, data);


    /**
     * 查询image url 通过image id
     *
     * @param imageId
     * @return
     */
    queryUrlFromId(imageId);

    /**
     * 正向解析mes为定制string
     *
     * @param chain
     * @return
     */
    serialize(chain);

    /**
     * 反向解析msg为MessageChain
     *
     * @param msg
     * @return MessageChain
     */
    deSerialize(msg);


    /**
     * 获取变量
     *
     * @param name
     * @return Object
     */
    get(name);

    /**
     * 设置变量
     *
     * @param name
     * @param value Object
     * @return Object
     */
    set(name, value);

    /**
     * 清除当前账号的所有变量
     *
     * @return Integer
     */
    clear();

    /**
     * 删除指定变量
     *
     * @param name
     * @return Object
     */
    del(name);

    /**
     * 列出当前bot所有变量
     *
     * @return List<Map.Entry<String, Object>>
     */
    list();

    /**
     * js 创建Java的对象
     *
     * @param name 类全名 如: java.util.HashMap
     * @param args 参数可选
     * @param <T>
     * @return
     */
    newObject(name, args);

    /**
     * 基于自己bot执行一句sql
     * (通用 只返回 Boolean)
     *
     * @param sql
     * @return     boolean
     */
    executeSql(sql);

    /**
     * 执行一句查询sql 返回 list obj
     *
     * @param sql
     * @return List<Object>
     */
    executeSelectList(sql);

    /**
     * 执行一句查询sql 返回 单个对象
     *
     * @param sql
     * @return
     */
    executeSelectOne(sql);
}

class Logger {
    /**
     * 打印日志
     *
     * @param msg
     */
    log(msg);

    /**
     * 打印日志
     *
     * @param msg
     */
    log(msg, args);
}

var log = new Logger()
var logger = log
// 基础 环境
var utils = new ScriptUtils()

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

dayyan(bot, utils)