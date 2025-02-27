const axios = require("axios");

const sendMessage = (message) => {
    const webhookUrl =
        "https://hooks.slack.com/services/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";
    return axios.post(webhookUrl, {
        text: message,
    });
};

module.exports = sendMessage;