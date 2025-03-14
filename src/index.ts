import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import { setupSwaggerDocs } from "./swagger/swagger";


const app = express();
const PORT = 3000;

app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/api", router);



setupSwaggerDocs(app);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
  console.log('Swagger documentation is available at http://localhost:3000/api-docs');
});
