var express = require('express');
const axios = require('axios');
const {getRepository} = require("typeorm");
var router = express.Router();
const User = require("../src/entity/User");
const {v4: uuidv4} = require('uuid');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const userUrl = process.env.USER_URL;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.redirect('/');
});


router.post('/logout', async function (req, res, next) {
    // 检查是否存在cookie
    if (req.cookies) {
        // 遍历所有cookie
        for (const cookie in req.cookies) {
            // 对每个cookie调用clearCookie来删除
            res.clearCookie(cookie);
        }
    }
    res.json({message: "Logout Success", code: 0});
});

router.post('/delete', async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({message: "No token provided", code: 1});
    }

    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {token: token}});
        if (!user) {
            return res.status(400).json({message: "User not found", code: 1});
        }

        await userRepository.remove(user);
        if (req.cookies) {
            // 遍历所有cookie
            for (const cookie in req.cookies) {
                // 对每个cookie调用clearCookie来删除
                res.clearCookie(cookie);
            }
        }
        res.json({message: "User deleted successfully", code: 0});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(400).json({message: "Internal Server Error", code: 1});
    }
});

router.post('/edit-username', async function (req, res, next) {
    const token = req.cookies.token;
    const newUserName = req.body.username;

    if (!token || !newUserName) {
        return res.status(400).json({message: "Token and new user name are required", code: 1});
    }

    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({token: token});
        if (!user) {
            return res.status(400).json({message: "User not found", code: 1});
        }

        user.user_name = newUserName;
        await userRepository.save(user);
        res.cookie('username', newUserName);
        res.json({message: "User name updated successfully", code: 0});
    } catch (error) {
        console.error("Error updating user name:", error);
        res.status(400).json({message: "Internal Server Error", code: 1});
    }
});

router.get('/callback', async function (req, res, next) {
    const code = req.query.code; // GitHub callbacks typically pass code as a query parameter
    try {
        // go to github authentication
        const accessToken = await fetchGithubAccessToken(code);
        const userInfo = await getUserInfoFromGithub(accessToken);

        const userRepository = getRepository(User);
        const token = uuidv4().replace(/\-/g, '')
        // Find Users by ID
        let user = await userRepository.findOne({uid: userInfo.id});
        if (user) {
            // update the ctime
            await userRepository.save(user);
        } else {
            user = userRepository.create({
                uid: userInfo.id,
                user_name: userInfo.login || "Anonymous-visitors",
                token: token,
            });
            await userRepository.save(user);
        }
        res.cookie('username', user.user_name, {httpOnly: true});
        res.cookie('token', user.token, {httpOnly: true});
        res.redirect('/home');
    } catch (error) {
        console.error("Error fetching GitHub access token:", error);
        res.status(400).json({message: "Internal Server Error", code: 1});
    }
});

const oauthConfig = {
    github: {
        clientId: clientId,
        clientSecret: clientSecret,
        accessTokenUrl: 'https://github.com/login/oauth/access_token'
    }
};

async function getUserInfoFromGithub(accessToken) {
    try {
        console.info("Fetching GitHub user info...");
        const response = await axios.get(userUrl, {
            headers: {
                Authorization: `token ${accessToken}`
            }
        });

        // Returns parsed user information directly
        return response.data;
    } catch (error) {
        console.error("Error fetching GitHub user info:", error);
        throw error;
    }
}

async function fetchGithubAccessToken(code) {
    const githubConfig = oauthConfig.github;

    if (!githubConfig.clientId || !githubConfig.clientSecret || !githubConfig.accessTokenUrl) {
        throw new Error("GitHub OAuth configuration is missing");
    }

    const params = {
        client_id: githubConfig.clientId,
        client_secret: githubConfig.clientSecret,
        code: code
    };

    try {
        console.info("Fetching GitHub access token...");
        const response = await axios.post(githubConfig.accessTokenUrl, params, {
            headers: {
                Accept: 'application/json'
            }
        });

        const accessToken = response.data.access_token;
        if (!accessToken) {
            throw new Error("Failed to obtain access token");
        }

        return accessToken;
    } catch (error) {
        console.error("Error fetching GitHub access token:", error);
        throw error;
    }
}

module.exports = router;
