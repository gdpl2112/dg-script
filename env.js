class Context {
    getBot();
    //发送消息
    send(str);

    builder();

    forwardBuilder();

    getSender();

    getSubject();

    getMessageChainById(id);

    createMusicShare(kind, title, summer, jumUrl, picUrl, url);

    uploadImage(url);

    newPlainText(text);

    deSerialize(msg);
    //判断环境 常为 friend 或者 group
    getType();
}

class Utils {
    //获得指定密文数据返回字符串
    requestGet(url);

    requestPost(url, data);

    queryUrlFromId(id);

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

    executeSql(sql);

    executeSelectList(sql);

    executeSelectOne(sql);
}

//消息体
var msg = "";
var context = new Context();
var utils = new Utils();
var event;