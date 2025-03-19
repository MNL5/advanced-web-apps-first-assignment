import fs from "fs";
import https from "https";
import appStart from "./server";
const port = process.env.PORT;

appStart().then((app) => {
  if (process.env.NODE_ENV != "production") {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } else {
    const prop = {
      key: fs.readFileSync("../client-key.pem"),
      cert: fs.readFileSync("../client-cert.pem"),
    };
    https.createServer(prop, app).listen(port);
  }
});
