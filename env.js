// 环境脚本

class Context {
    getBot();

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

    getType();
}

class Utils {

    requestGet(url);

    requestPost(url, data);

    queryUrlFromId(id);

    serialize(msg);

    get(key);

    set(key, value);

    del(key);

    clear();

    list();

    newObject(name, args);
}

var msg = "";
var context = new Context();
var utils = new Utils();