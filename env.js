class Context {
    getBot();

    //发送消息
    send(str);

    //消息构造者
    builder();

    //转发消息构造者其添加函数为add(id,name,msg)
    forwardBuilder();

    //发送者一般为成员
    getSender();

    //发送环境一般为对象类型为群聊或好友
    getSubject();

    //从消息id中获得message chain
    getMessageChainById(id);

    //创建音乐分享消息
    createMusicShare(kind, title, summer, jumUrl, picUrl, url);

    //上传为图片
    uploadImage(url);

    //创造一个纯文本消息
    newPlainText(text);

    deSerialize(msg);

    //判断环境 常为 friend 或者 group
    getType();
}

class Utils {
    //获得网址数据返回字符串
    requestGet(url);

    //通过post方式获取网络数据
    requestPost(url, data);

    //从图片id中获得图片url
    queryUrlFromId(id);

    //将文本转为可发送的对象
    serialize(msg);

    //获取内存中的变量
    get(key);

    //向内存在设置变量
    set(key, value);

    //删除内存在的变量
    del(key);

    //清除内存中所有变量
    clear();
    //列出内存在所有变量
    list();

    newObject(name, args);
    //执行一句sql
    executeSql(sql);
    //执行一句查询sql返回list
    executeSelectList(sql);
    //执行一句查询sql返回一个对象
    executeSelectOne(sql);
}
//消息体
var msg = "";
//context的实例
var context = new Context();
//utils的实例
var utils = new Utils();
//event仅特殊情况不为null
var event;