import express from "express";
import { PORT } from "./config/config";
import { connectToMongoWithRetry } from "./config/mongo";
import authRouter from "./routes/authRoutes";
import taskRouter from "./routes/taskRoutes";

connectToMongoWithRetry();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    hello: "world",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: `, PORT);
});
