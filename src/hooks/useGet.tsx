import { useEffect, useState } from 'react';
import { get } from "../services";
import { message } from 'antd';
import { sleep } from '../utils/functions';
import useAbortController from "./useAbortController";

const useGet = <T extends {}>(url: string, wait?: boolean) => {
	const abortController = useAbortController();
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState<T>();

	useEffect(() => {
		if (wait || !url) return;

		const init = async () => {
			setLoading(true);

			try {
				const _response = await get<T>(url, abortController);

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
	}, [url, wait, abortController]);

	return { loading, response };
}

export default useGet;