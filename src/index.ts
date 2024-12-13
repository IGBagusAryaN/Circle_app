import express, { Request, Response } from 'express';
import router from './routes/v2/index.route';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Typescript Express app listening on port ${port}`);
});
