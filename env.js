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

    executeSql(sql);

    executeSelectList(sql);

    executeSelectOne(sql);
}

var msg = "";
var context = new Context();
var utils = new Utils();
var event;