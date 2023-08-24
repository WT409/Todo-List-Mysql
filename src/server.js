import express from 'express';
import router from './router/router.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(PORT, () => console.log(`Running in port: http://localhost/${PORT}`));