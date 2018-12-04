/*!
 * qcloudsms_js
 *
 * @module sms
 *
 */

"use strict";

/**
 * Module dependencies.
 * @ignore
 */

var url = require("url");
var util = require("./util");


/**
 * Module exports
 * @ignore
 */
exports.SmsSingleSender = SmsSingleSender;
exports.SmsMultiSender = SmsMultiSender;
exports.SmsStatusPuller = SmsStatusPuller;
exports.SmsMobileStatusPuller = SmsMobileStatusPuller;


/**
 * SmsSingleSender
 *
 * @param  {string}  appid  - sdk appid
 * @param  {string}  appkey - sdk appkey
 * @constructor
 */
function addTemplate(appid, appkey) {
    this.appid = appid;
    this.appkey = appkey;
    this.url = "https://yun.tim.qq.com/v5/tlssmssvr/add_template";
};

/**
 * 添加短信（或语音）模板。
 *
 * @param  {string}    remark - 模板备注，比如申请原因，使用场景等
 * @param  {number}    international - 0表示国内短信，1表示海外短信，默认为0
 * @param  {string}    text - 模板内容
 * @param  {string}    title - 模板名称
 * @param  {number}    type - 短信类型，Enum{0：普通短信, 1：营销短信}
 * @public
 */
addTemlate.prototype.add = function(remark, international, text, title, type,callback) {
    var reqUrl = url.parse(this.url);
    var random = util.getRandom();
    var now = util.getCurrentTime();
    var options = {
        host: reqUrl.host,
        path: reqUrl.path + "?sdkappid=" + this.appid + "&random=" + random,
        method: "POST",  
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            sig: util.calculateSignature(this.appkey, random, now, [phoneNumber]),
            time: now,
            
            remark:!remark ? "" : remark + "",
            international: !international ? 0 : international,
            text:text,
            title:!title ? "" : title + "",
            type:parseInt(type)
        }
    };

    return util.request(options, callback,true);
};


/**
 * modTemplate
 *
 * @param  {string}  appid  - sdk appid
 * @param  {string}  appkey - sdk appkey
 * @constructor
 */
function modTemplate(appid, appkey) {
    this.appid = appid;
    this.appkey = appkey;
    this.url = "https://yun.tim.qq.com/v5/tlssmssvr/mod_template";
};

/**
 * 修改短信模板
 *
 * @param  {string}    remark - 新的模板备注，比如申请原因，使用场景等
 * @param  {number}    international - 0表示国内短信，1表示海外短信，默认为0
 * @param  {string}     text - 新的模板内容
 * @param  {string}    title - 新的模板名称
 * @param  {number}    tpl_id - 待修改的模板的模板 id
 * @param  {number}    type - 短信类型，Enum{0：普通短信, 1：营销短信}
 * @public
 */
modTemplate.prototype.modify = function(msgType, nationCode, phoneNumbers, msg, extend,  ext,tpl_id,callback) {
    var reqUrl = url.parse(this.url);
    var random = util.getRandom();
    var now = util.getCurrentTime();
    var options = {
        host: reqUrl.host,
        path: reqUrl.path + "?sdkappid=" + this.appid + "&random=" + random,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            text: text,
            sig: util.calculateSignature(this.appkey, random, now, phoneNumbers),
            time: now,
            title:!title ? "" : title + "",
            remark:!remark ? "" : remark + "",
            international: !international ? 0 : international,
            type:parseInt(type),
            tpl_id:tpl_id
        }
    };

     return util.request(options, callback,true);
};



/**
 * delTemplate
 *
 * @param  {string}  appid  - sdk appid
 * @param  {string}  appkey - sdk appkey
 * @constructor
 */
function delTemplate(appid, appkey) {
    this.appid = appid;
    this.appkey = appkey;
    this.url = "https://yun.tim.qq.com/v5/tlssmssvr/del_template";
};

/**
 * 删除短信模板
 * @param  {array}    tpl_id - 删除短信（或语音）模板。
 * @public
 */
delTemplate.prototype.delete = function(tpl_id,callback) {
    var reqUrl = url.parse(this.url);
    var random = util.getRandom();
    var now = util.getCurrentTime();
    var options = {
        host: reqUrl.host,
        path: reqUrl.path + "?sdkappid=" + this.appid + "&random=" + random,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            sig: util.calculateSignature(this.appkey, random, now, phoneNumbers),
            time: now,
            tpl_id:tpl_id
        }
    };

     return util.request(options, callback,true);
};


/**
 * getTemplate
 *
 * @param  {string}  appid  - sdk appid
 * @param  {string}  appkey - sdk appkey
 * @constructor
 */
function getTemplate(appid, appkey) {
    this.appid = appid;
    this.appkey = appkey;
    this.url = "https://yun.tim.qq.com/v5/tlssmssvr/get_template";
};

/**
 * 短信模板状态查询
 * @param  {array}    tpl_id - 待查询的模板 id 数组，与 tpl_page 字段不能同时出现。
 * @param  {object}    tpl_page - 分页查询全量模版信息，与 tpl_id 字段不能同时出现（应答包的 total 字段为模版总条数）
 * @public
 */
getTemplate.prototype.get = function(tpl_id,tpl_page) {
    var reqUrl = url.parse(this.url);
    var random = util.getRandom();
    var now = util.getCurrentTime();
    var options = {
        host: reqUrl.host,
        path: reqUrl.path + "?sdkappid=" + this.appid + "&random=" + random,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            sig: util.calculateSignature(this.appkey, random, now, phoneNumbers),
            time: now,
        }
    };
        if(tpl_id){
        options.body.tpl_id=tpl_id
        }else{
         options.body.tpl_page=tpl_page
        }
     return util.request(options, callback,true);
};

