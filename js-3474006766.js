function generateCaptcha(length) {
    // 定义可用字符集（排除易混淆字符如 0/O, 1/I/l）
    var chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
    var captcha = '';

    for (var i = 0; i < length; i++) {
        // 随机选择字符
        var randomIndex = Math.floor(Math.random() * chars.length);
        captcha += chars[randomIndex];
    }

    return captcha;
}

function generateWeaInfos(location) {
    var out0 = utils.requestGet("https://v.api.aa1.cn/api/api-tianqi-3/index.php?type=1&msg=" + encodeURI(location))
    var out1 = JSON.parse(out0)
    var data = out1.data
    var sb0 = "\'" + location + "\'天气:"
    sb0 += "\n" + data[0].riqi + ",温度: " + data[0].wendu + "," + data[0].tianqi + "," + data[0].fengdu + ",空气质量:" + data[0].pm
    sb0 += "\n" + data[1].riqi + ",温度: " + data[1].wendu + "," + data[1].tianqi + "," + data[1].fengdu + ",空气质量:" + data[1].pm
    sb0 += "\n" + data[2].riqi + ",温度: " + data[2].wendu + "," + data[2].tianqi + "," + data[2].fengdu + ",空气质量:" + data[2].pm
    return sb0
}

function mo1() {
    var sss = generateCaptcha(6)
    bot.getFriend(2898304046).sendMessage("您今晚的验证码是: " + sss)
}

function mo0() {
    var sss = generateWeaInfos("宝山区")
    bot.getFriend(2898304046).sendMessage(sss)
}


