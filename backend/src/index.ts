import express from 'express';
import { PORT } from './config/config';
import { connectToMongoWithRetry } from './config/mongo';

connectToMongoWithRetry();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({
        hello: "world" 
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port: `, PORT);
});