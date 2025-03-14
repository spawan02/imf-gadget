import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(cors());
dotenv.config();
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});
