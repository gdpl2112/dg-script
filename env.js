// 环境脚本
class Context {
    getBot();

    send(str);

    builder();

    forwardBuilder();

    getSender();

    getSubject();

    createMusicShare(kind, title, summer, jumUrl, picUrl, url);

    uploadImage(url);

    newPlainText(text);

    deSerialize(msg);

    getType();
}

class Utils {

    requestGet(url);

    requestPost(url, data);

    get(key);

    set(key, value);

    del(key);

    clear();

    list();
}

var msg = "";
var context = new Context();
var utils = new Utils();