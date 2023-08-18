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

    getType();

    requestGet(url);

    requestPost(url, data);

    get(key);

    set(key, value);

    clear();

    del(key);
}

var msg = "";
var context = new Context();
