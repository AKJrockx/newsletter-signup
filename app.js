const https = require("https");
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const { options } = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.floatingFirstName;
    const lastName = req.body.floatingLastName;
    const email = req.body.floatingEmail;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/888a09367a";
    const options = {
        method: "POST",
        auth: "ashish1:72c23b7c6e28f8cb4771de2f66b8ca31-us14",
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server 3000 up and running...")
});


// API key
// 72c23b7c6e28f8cb4771de2f66b8ca31-us14

// Audiaence ID
// 888a09367a 