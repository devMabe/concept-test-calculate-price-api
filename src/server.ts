import express from "express";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

export async function bootStrap() {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
