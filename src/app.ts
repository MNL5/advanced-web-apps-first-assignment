import appStart from "./server";
const port = process.env.PORT;

appStart().then((app) => {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});