
// @ts-ignore
import express, { Request, Response } from 'express';
// @ts-ignore
import mongoose from 'mongoose';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import {RequestLog} from "./models/RequestLog";
// @ts-ignore
import {retryRequest} from "./utils/retryRequest";



// @ts-ignore
mongoose.connect('mongodb://127.0.0.1:27017/retryApp', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(express.json());


app.post('/api/retry', async (req: Request, res: Response) => {
    const {body} = req;
    const url = 'https://jsonplaceholder.typicode.com/todos/1';


    try{
        const retryResponse = await retryRequest(url, body);

        const log = new RequestLog({body,response:retryResponse})

        await log.save();

        // @ts-ignore
        res.status(204).send()
    }catch (e:any){
        fs.appendFileSync('error.logs', `${new Date().toISOString()} - ${e.message}\n`);



        const log = new RequestLog({ body, error: e.message });
        await log.save();

        // @ts-ignore
        res.status(500).json({ error: 'failed to process the request.' });
    }
})


const PORT = 3008

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})