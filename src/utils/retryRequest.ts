import axios from 'axios';
// @ts-ignore
import retry from "async-retry";


export const retryRequest = async (url: string , data :Record<string, unknown>) => {

    return await retry(
        async (bail: (arg0: Error) => void)=>{
            try {
                const res = await axios.post(url, data);
                return res.data;

            }catch (e:any){
                if(e.res && e.res.status >= 400 && e.res.status < 500) bail(new Error('retryable error'))
                throw e
            }
        },
        { retries: 3 ,
        minTimeout: 300000 }
    )
}