let node = $environment.params;
let opts = {
    policy: node
};
let myRequest = {
    url: "https://ipinfo.io/json?token=fa5efe047d9b4f",
    opts: opts
};
const TIMEOUT = 4000;
function fetchWithTimeout(request, timeout) {
    return Promise.race([
        $task.fetch(request),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("请求超时")), timeout)
        )
    ]);
}
let countryMap = {
  "HK": "香港",
  "US": "美国",
  "JP": "日本",
  "TW": "台湾",
  "DE": "德国",
  "FR": "法国",
  "GB": "英国",
  "TH": "泰国",
  "VN": "越南",
  "SG": "新加坡",
  "KR": "韩国",
  "IT": "意大利",
  "ES": "西班牙",
  "RU": "俄罗斯",
  "IN": "印度",
  "BR": "巴西",
  "CA": "加拿大",
  "AU": "澳大利亚",
  "MX": "墨西哥",
  "MY": "马来西亚",
  "PH": "菲律宾",
  "ID": "印尼",
  "TR": "土耳其",
  "SA": "沙特阿拉伯",
  "AE": "阿联酋",
  "CH": "瑞士",
  "SE": "瑞典",
  "NO": "挪威",
  "FI": "芬兰",
  "NL": "荷兰",
  "BE": "比利时",
  "PL": "波兰",
  "AR": "阿根廷",
  "CL": "智利",
  "ZA": "南非",
  "EG": "埃及",
  "NZ": "新西兰",
  "DK": "丹麦",
  "AT": "奥地利",
  "IE": "爱尔兰",
  "PT": "葡萄牙",
  "GR": "希腊",
  "HU": "匈牙利",
  "CZ": "捷克",
  "RO": "罗马尼亚",
  "UA": "乌克兰",
  "IL": "以色列",
  "IR": "伊朗",
  "PK": "巴基斯坦",
  "BD": "孟加拉国",
  "NG": "尼日利亚",
  "KE": "肯尼亚",
  "CO": "哥伦比亚",
  "PE": "秘鲁",
  "CU": "古巴"
};
fetchWithTimeout(myRequest, TIMEOUT)
    .then(response => {
        if (response.statusCode !== 200) {
            $done({
                title: "IP信息查询",
                htmlMessage: `失败状态码：${response.statusCode}`
            });
            return;
        }
        let data = JSON.parse(response.body);
        let ip = data.ip;
        let org = data.org.replace(/^AS\d+\s*/, "");
        let loc = data.loc.replace(",", "-");
        let countryText = `${countryMap[data.country] || data.country}-${data.country}`;
        let htmlMessage = `
            <div style="font-family: -apple-system; font-size: 13px; text-align: left; line-height: 1.9;">
                <b>所在地：</b> ${countryText} <br>
                <b>IP地址：</b> ${ip} <br>
                <b>运营商：</b> ${org} <br>
                <b>经纬度：</b> ${loc} <br>
                <b>选择的：</b> ${node} <br>
                </div>`;
        $done({
            title: "IP信息查询",
            htmlMessage: htmlMessage
        });
    })
    .catch(err => {
        $done({
            title: "IP信息查询",
            htmlMessage: `<b>失败：</b> ${err.message}`
        });
    });
