import { connect } from "mongoose";
import { MONGO_PASSWORD, MONGO_USERNAME } from "./config";

export const connectToMongoWithRetry = () => {
  const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zzgyrjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  connect(mongoURL)
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectToMongoWithRetry, 5000);
    });
};
