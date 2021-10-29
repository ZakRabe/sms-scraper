const http = require("http");
const url = "http://thexlofts.com/";
/** String to find in the page */
const needle = "No units available";
/** SMS Recipient */
const to= "TO_NUMBER",
/** Delay - 24hrs */
const delay = 1000 * 60 * 60 * 24;
/** Twilio */
const from = 'TWILIO_NUMBER'
const accountSid = "accountSid";
const authToken = "authToken";
const client = require("twilio")(accountSid, authToken);

const sendText = (body) => {
    console.log(`SMS to ${to}`)
  client.messages
    .create({
      body,
      from,
      to,
    })
    .then((message) => console.log("sent", message.sid))
    .catch((err) => console.log(err));
  
};

const main = () => {
  console.log(new Date().toDateString());
  console.log(`Loading ${url}`);
  http
    .get(url, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // response complete
      resp.on("end", () => {
        const found = !data.includes(needle);
        const body = `Did I find "${needle}" on ${url} Today?? ${found ? "YES!!!!!!" : "NO!"}`;
        console.log(body);
        sendText(body);
      });
    })
    .on("error", console.error);
};

const testDelay = 1000 * 10;
main();
setInterval(main, delay);