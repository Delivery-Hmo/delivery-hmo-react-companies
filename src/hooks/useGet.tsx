import { useEffect, useState } from 'react';
import { get } from "../services";
import { message } from 'antd';
import { sleep } from '../utils/functions';
import useAbortController from './useAbortController';

const useGet = <T extends {}>(url: string, wait?: boolean, mergeResponse?: boolean) => {
	const abortController = useAbortController();
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState<T>();

	useEffect(() => {
		if (wait || abortController.current) return;

		const init = async () => {
			setLoading(true);

			abortController.current = new AbortController();

			try {
				const _response = await get<T>(url, abortController.current) as any;

				setResponse(r => mergeResponse ? ({ list: [...(r as any)?.list || [], ...(_response as any)?.list], total: (_response as any)?.total }) as any as T : _response);
			} catch (error) {
				if (typeof error === "string") {
					message.error(error as string, 4);
					return;
				}

				console.log(error);
			} finally {
				abortController.current = undefined;
				await sleep(500);
				setLoading(false);
			}
		}

		init();

	}, [url, wait, mergeResponse, abortController]);

	return { loading, response }
}

export default useGet;