import { useEffect, useState } from 'react';
import { get } from "../services";
import { message } from 'antd';
import { sleep } from '../utils/functions';

const useGet = <T extends {}>(url: string, wait?: boolean) => {
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState<T>();

	useEffect(() => {
		if(wait) return;

		const controller = new AbortController();

		const init = async () => {
			setLoading(true);

			try {
				const _response = await get<T>(url, controller);

				setResponse(_response);
			} catch (error) {
				if(typeof error === "string") {
					message.error(error as string, 4);
					return;
				}

				console.log(error);
			} finally {
				await sleep(500);
				setLoading(false);
			}
		}

		init();

		return () => {
			controller.abort();
		}
	}, [url, wait]);
	
	return { loading, response }
}

export default useGet;