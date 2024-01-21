importJ("com.alibaba.fastjson.JSON");
importJ("com.alibaba.fastjson.JSONArray");
importJ("com.alibaba.fastjson.JSONObject");
importJ("io.github.kloping.date.DateUtils");
importJ("io.github.kloping.file.FileUtils");
importJ("io.github.kloping.kzero.utils.ImageDrawerUtils");
importJ("io.github.kloping.rand.RandomUtils");

importJ("javax.imageio.ImageIO");
importJ("java.awt");
importJ("java.awt.image.BufferedImage");
importJ("java.io.File");
importJ("java.io.IOException");
importJ("java.net.URL");
importJ("java.lang.System");
importJ("java.lang.String");
importJ("io.github.kloping.qqbot.entities.ex.Image")
importJ("org.jsoup.Jsoup")

var cookie = "clientType=9; uin=o3474006766; openid=2CD620FEB4A9D3E49E7D9B5C64C389C8; appid=100543809; acctype=qc; access_token=55858D1029271CA050EA80418194CB5C; userId=1751cccc-88fc-4baa-9171-9f99fcfabecb; accountType=5; tid=10E830A814B13055D6E4EE359A3A7DD4B102B6202CA3B424A87B4D5A86239255229FB824EF52A43BADA3EA12026FE974FB0FB686D4121481B3B6B72159B156492533F6A597E559897DCF36B4B09F00B1B6B0C3C1248974E0ED8A16828A174BAF338F58338D021035352ACF09D43F51E8C781722C9510C7378847CBB721CE5872B8057A04B46DBE7E934AAF49ABE1B74F850A1750A846451ED54D7EA3B7E493F4EF143B928DF31A509BF37EB6FF672A85;";

var acc = null
if (context.getSender().getId() == 3474006766)
    acc = "v3_L2oLQSUhifayFgyV3KiPKPuD6cjLWgQ6amKI2cT8u4ynJ4fZaeqcoPeh3vngzy0XbmSV7H1WqdJFFqdmbwq6X2X1be08kcLl29Tbk5vTRAwkXoL21jkaGu2nl-3Wc8vK";
else if (context.getSender().getId() == 3528641250)
    acc = "v3_V_UPY2Eu3LohOExdaW-ITh12DCQ_MOBxpLu2EhJfHUDYhKK44te7YH6sAbdXDkjdVA04C9_XrH6tOTvl7UuHAQ2NigukP8MnJGEaDdRYTAWZR6BLjalyXuS7qix9lM2q"
else if (context.getSender().getId() == 1379257977)
    acc = "v3_k7moq2VuRUTgS4zuDjRRv3mUlxMVug7PdTz9-h6UejvooYaK9AnA_xcl1nldZPq3v0AMYH_Xl7AiWCnz68bPBv5FMRZt4YKYLsFqHBtqCtnZ6ts_YpffYVWEa38xW7gC"
else if (context.getSender().getId() == 2898304046)
    acc = "v3_Uw-d4YhAUkC_0OrfnUmjt8fq0nx8kLtpMgYy-71h-dSj0CWteN7sp9bAklKr1L2ghTMvtxIYPJw34585eYg1BtkdiIHwF_irgRs4xX_sJQrMiCyMBXWbhiPEIaJpHuHU"
else {
    context.send("未查询到绑定的id")
    throw new SyntaxError("id未绑定")
}
context.send("绑定id查询成功;正在绘图请稍等")
var c = Jsoup.connect("https://mlol.qt.qq.com/go/jgame/get_battle_list")
    .userAgent("QTL/10.4.5.11065 Channel/3  Mozilla/5.0 (Linux; Android 7.1.2; PEGT10 Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/537.36")
    .header("Cookie", cookie)
    .header("Content-Type", "application/json")
    .header("Host", "mlol.qt.qq.com")
    .header("Connection", "Keep-Alive")
    .header("Accept-Encoding", "gzip");
var doc0 = c.requestBody(String.format("{\"scene\": \"%s\", \"filter\": \"\"}", acc))
    .ignoreContentType(true)
    .post();
var json = doc0.body().text();

var image = ImageDrawerUtils.readImage("/root/projects/bot01/images/info_bg.jpg", 825, 1100);
image = ImageDrawerUtils.putImage(image, ImageDrawerUtils.roundImage(ImageDrawerUtils.readImage(new URL("https://q.qlogo.cn/g?b=qq&nk="+context.getSender().getId()+"&s=640"), 182, 182), 999), 321, 28);

var jsonObject = JSON.parseObject(json);

var g2 = image.getGraphics();

var x = 15;
var y = 230;
for each (var o0 in jsonObject.getJSONObject("data").getJSONArray("battle_list")) {
    var joe =   o0;
    g2.setColor(ImageDrawerUtils.WHITE_A35);
    g2.fillRoundRect(x, y, 760, 80, 20, 20);
    g2.setFont(ImageDrawerUtils.SMALL_FONT46);
    var rank = joe.getJSONObject("specific_user_battle").getInteger("ranking");
    if (rank == 1) g2.setColor(ImageDrawerUtils.RED_A90);
    else if (rank == 2) g2.setColor(ImageDrawerUtils.BLUE_A75);
    else if (rank == 3) g2.setColor(ImageDrawerUtils.ORIGIN_A75);
    else if (rank == 4) g2.setColor(ImageDrawerUtils.YELLOW_A75);
    else g2.setColor(ImageDrawerUtils.BLACK_A75);
    g2.drawString("#" + rank, x + 10, y + 40);
    g2.setFont(ImageDrawerUtils.SMALL_FONT20);
    var pieceList = joe.getJSONObject("specific_user_battle").getJSONArray("piece_list");
    g2.drawString(pieceList.size()+"人口", x + 2, y + 70);
    x += 65;
    var pn = 0;
    for each (var o1 in  pieceList) {
        try {
            var piece =  o1;
            var p0 = ImageDrawerUtils.readImage(new URL(piece.getString("full_picture")), 60, 60);
            g2.drawImage(p0, x, y + 8, null);
            var px = x;
            for each (var e0 in piece.getJSONArray("equip_list")) {
                var equip =   e0;
                try {
                    var eq0 = ImageDrawerUtils.readImage(new URL(equip.getString("full_picture")), 20, 20);
                    g2.drawImage(eq0, px, y + 68, null);
                } catch (e) {
                    System.err.println(e.getMessage());
                }
                px += 21;
            }
            x = x + 65;
        } catch (e) {
            System.err.println(e.getMessage());
        }
        pn++;
        if (pn >= 8) break;
    }
    g2.setColor(ImageDrawerUtils.BLACK_A85);
    g2.setFont(ImageDrawerUtils.SMALL_FONT22);
    g2.drawString(joe.getString("set_name"), 650, y + 27);
    g2.drawString(joe.getString("game_match_type_name"), 650, y + 49);
    var t0 = joe.getLongValue("end_time") * 1000;
    t0 = System.currentTimeMillis() - t0;
    var ti0 = null;
    if (t0 < 3600000) {
        ti0 = DateUtils.getTimeTipsMinutes(System.currentTimeMillis() + t0);
    } else ti0 = DateUtils.getTimeTipsDays(System.currentTimeMillis() + t0);
    g2.drawString(ti0 + "前", 650, y + 69);
    x = 15;
    y = y + 86;
}

var file = null;
ImageIO.write(image, "jpg", file = new File("./temp/temp.jpg"));
context.send("<pic:" + file.getPath() + ">")