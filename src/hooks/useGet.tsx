import { useEffect, useState } from 'react';
import { get } from "../services";
import { message } from 'antd';
import { sleep } from '../utils/functions';

const useGet = <T extends {}>(url: string, wait?: boolean) => {
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState<T>();

	useEffect(() => {
		if (wait || !url) return;

		const controller = new AbortController();

		const init = async () => {
			setLoading(true);

			try {
				const _response = await get<T>(url, controller);

				setResponse(_response);
			} catch (error) {
				console.log(error);

				if (error instanceof Error) {
					message.error(error.message, 4);
					return;
				}

				if (typeof error === "string") {
					message.error(error, 4);
				}
			} finally {
				await sleep(500);
				setLoading(false);
			}
		}

		init();

		return () => {
			if (process.env.NODE_ENV !== "development") controller.abort();
		}
	}, [url, wait]);

	return { loading, response };
}

export default useGet;