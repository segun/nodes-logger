const express = require("express");
const cors = require("cors");
const sendMessage = require("./slack");

const app = express();
const port = process.env.PORT || 31337;

// Enable CORS for all routes
app.use(
    cors({
        origin: "*", // Be careful: this allows requests from any origin
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json({ limit: '100mb' })); // Set limit to 10 MB
app.use(express.urlencoded({ limit: '100mb', extended: true })); // For URL-encoded data

// Route to handle logging
app.options("/log", cors()); // Handle preflight requests

app.post("/log", (req, res) => {
    // Get the body of the request
    const logData = req.body;
    // Pretty print the received data    
    console.log("Received log data:");
    console.log("-------------------");
    console.log(JSON.stringify(logData, null, 2));
    console.log("-------------------");
    res.status(200).json({
        status: "success",
        message: "Log data received and printed",
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Log server running on port ${port}`);
    console.log(`Endpoint: POST http://localhost:${port}/log`);
});
