var express = require('express');
var router = express.Router();
const {getRepository} = require("typeorm");
const axios = require('axios');
const User = require('../src/entity/User');
const QARecord = require('../src/entity/QARecord');
const DailyCheck = require('../src/entity/DailyCheck');
const qa_token = process.env.QA_TOKEN;
router.get('/do', async function (req, res, next) {
    try {
        const content = req.query.content;
        if (!content || content.length > 200) {
            res.json({code: 0, data: "Sorry, Content length can't exceeds 200 characters", message: "success"});
            return
        }

        const token = req.cookies.token;
        if (!token) {
            res.json({code: 0, data: "Please login again first", message: "success"});
            return
        }
        const user = await getRepository(User).findOne({token: token});
        if (!user) {
            res.json({code: 0, data: "Please login again first", message: "success"});
            return
        }

        const uid = user.token;
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const dailyCheck = await getRepository(DailyCheck).findOne({uid: uid, check_date: today});
        const limit = dailyCheck ? 10 : 5;

        const countTodayQA = await getRepository(QARecord).count({uid: uid, date: today});
        if (countTodayQA >= limit) {
            res.json({
                code: 0,
                data: "Sorry, Your daily limit exceeded, Please Check in to get more, or try again tomorrow!",
                message: "success"
            });
            return
        }

        let data = JSON.stringify({
            "token": qa_token,
            "content": `执行询问-${content}`,
            "at_receiver": "",
            "_is_self": false,
            "_is_group": false,
            "type": 1,
            "id": 123,
            "ts": 123,
            "sign": 34,
            "xml": "13",
            "sender": "wxid_d9m1pewt13dr22",
            "roomid": "13243",
            "thumb": 123,
            "extra": 123
        });

        let config = {
            method: 'post',
            url: 'http://notice.someget.cn/get-chat',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);
        console.log('get-chat result', response)
        if (!response.data || typeof response.data !== 'object') {
            throw new Error("Failed to get response from external API");
        }

        const result = response.data.data || response.data.message;
        qaRecord = await getRepository(QARecord).create({uid: uid, question: content, answer: result, date: today});
        getRepository(QARecord).save(qaRecord);
        res.json({code: 0, data: result, message: "success"});
    } catch (error) {
        res.status(400).json({code: 1, message: error.message});
    }
});

router.post('/check-in', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.json({code: 1, data: "", message: "Please login again first"});
            return
        }
        const user = await getRepository(User).findOne({token: token});
        if (!user) {
            res.json({code: 1, data: "", message: "Please login again first"});
            return
        }
        const uid = user.token;
        const today = new Date();
        const checkDate = today.toISOString().slice(0, 10).replace(/-/g, '');

        // 检查是否已经签到
        const existingCheck = await getRepository(DailyCheck).findOne({uid: uid, check_date: checkDate});
        if (existingCheck) {
            return res.json({code: 1, message: 'Sorry, Already checked in today'});
        }

        // 创建新的签到记录
        const newCheck = getRepository(DailyCheck).create({
            uid: uid,
            check_date: checkDate
        });

        await getRepository(DailyCheck).save(newCheck);

        res.json({code: 0, message: 'Check-in successful'});
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(400).json({code: 1, message: 'Internal server error'});
    }
});


module.exports = router;
