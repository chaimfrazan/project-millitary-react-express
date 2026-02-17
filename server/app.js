import express from 'express'
import complaints from "./src/routes/complaints.routes.js";
import { getDb, initMongoDb } from "./src/db/connect.js";

const app = express()
const port = process.env.PORT || 3000


app.use(express.json());


app.use(async (req, res, next) => {
    req.mongoConn = await getDb();
    next();
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.get("/", async (req, res) => {
    res.json({
        message: "Welcome to MongoDB Todo List API",
        version: "1.0.0",
    });
});

app.use("/", complaints);

app.listen(port, async () => {
    await initMongoDb();
    console.log(`Server is running on port ${port}...`);
});
