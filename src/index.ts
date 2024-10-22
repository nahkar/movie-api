import cors from 'cors';
import express from 'express';

import router from './routes';

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
