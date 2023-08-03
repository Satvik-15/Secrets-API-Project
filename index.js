import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// For using statis files.
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render(
      "index.ejs",
      {
        secret: JSON.stringify(result.data.secret),
        user: JSON.stringify(result.data.username),
      },
      console.log(result) // View All the stored items in const result
    );
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    res.status("500");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
