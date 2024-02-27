const axios = require('axios');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const cron = require('node-cron');
const Task = require("../models/Task.js");
const User = require("../models/User.js");


const NEWS_API_KEY = "27df3cb829584967b560725662dc7f47";
const CLIENT_ID = "163704062926-2pd439sqp1tb994gjs952sus6rned822.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//046biN9SWiyMfCgYIARAAGAQSNwF-L9IrHvb3AdMh1c0r1UskXs2JKB3_05I58Jr9v_MmVoLq4P7p2-HByazITmDgSwpEGEl0Lrs";
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN});

exports.getArticles = async (req, res) => {
    const lang = req.cookies.lang || "en";
    const keyword = req.query.keyword || lang === "en" ? "Time Management" : "Tайм-менеджмент";
    try {
        const articles = await getArticlesByKeyword(keyword, lang);
        res.render('articles', {user: req.session.user, lang, articles: articles, keyword: keyword});
    } catch (error) {
        console.error('Error getting articles:', error);
        res.status(500).json({ error: 'There was an error getting the articles' });
    }
};


exports.sendMail = async (task) =>{
    try {
        const user = await User.findById(task.user); // Find user by task and get user's email
        if (!user) {
            throw new Error('User not found for the task.');
        }

        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'batyrhan22.11@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'TASK MANAGEMENT WEB APP 📧 <batyrhan22.11@gmail.com>',
            to: user.email, // Send email to user's email address
            subject: `TASK MANAGEMENT WEB APP 📧: Your deadline for task ${task.description} has been expired`,
            text: `TASK MANAGEMENT WEB APP 📧: Your deadline for task ${task.description} has been expired`,
            html: `TASK MANAGEMENT WEB APP 📧: Your deadline for task ${task.description} has been expired`
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

// Scheduled task to check for expired deadlines
cron.schedule('* * * * *', async () => {
    try {
        const currentDate = new Date();
        const expiredTasks = await Task.find({ deadline: { $lt: currentDate }, status: 'not_completed' });

        for (const task of expiredTasks) {
            await exports.sendMail(task); // Pass task to sendMail function
            task.status = 'expired'; // Update task status to "expired"
            await task.save(); 
        }
    } catch (error) {
        console.error('Error executing scheduled task:', error);
    }
});



// Function to get articles by keyword from the newsAPI

async function getArticlesByKeyword(keyword, lang) {
    const fromDate = getFromDate();
    
    let response, data = null;

    try {
        response = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&searchIn=title&from=${fromDate}&language=${lang}&sortBy=popularity&apiKey=${NEWS_API_KEY}`);
        data = response.data;
    } catch (error){
        console.error(`Error making HTTPS request to newsAPI: ${error.message}`);
        return null;
    }

    const articles = data.articles.slice(0, 10);
    if (!articles) {
      articles = null;
    }

    return articles;
}

// Function to format the date to the format required by the API

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getFromDate() {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
    const fromDate = formatDate(lastMonthDate);

    return fromDate;
}