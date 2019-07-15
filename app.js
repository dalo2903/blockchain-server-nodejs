const express = require("express"),
  body_parser = require("body-parser"),
  app = express().use(body_parser.json()); // creates express http server


app.listen(process.env.PORT || 80, () => console.log("webhook is listening"));
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;
  console.log(body);

  // Check the webhook event is from a Page subscription
  if (body) {
    console.log(body);
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint
app.get("/webhook", (req, res) => {
  /** UPDATE YOUR VERIFY TOKEN **/
  let body = req.body;
  console.log(body);
  const VERIFY_TOKEN = "secretsecretsecret";

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

function handleMessageV2(sender_psid, received_message) {
  let response;
  if (received_message.text) {
    //var res = chatResponse.run(received_message.text).then();
    chatResponse
      .run(received_message.text)
      .then(res => {
        response = {
          text: res.rep
        };
      })
      .catch(err => {
        console.log(err);
      });
  }
}

