import { useEffect, useState } from 'react';
import { get } from "../services";
import { message } from 'antd';
import useAbortController from './useAbortController';

export interface PropsUseGet {
	url: string;
	wait?: boolean;
	mergeResponse?: boolean;
}

const useGet = <T extends {}>({ url, wait, mergeResponse }: PropsUseGet) => {
	const abortController = useAbortController();
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState<T>();

	useEffect(() => {
		if (wait || !url) return;

		const init = async () => {
			setLoading(true);

			try {
				const _response = await get<T>(url, abortController.current!);

				setResponse(r =>
					mergeResponse
						? ({ list: [...(r as any)?.list || [], ...(_response as any)?.list], total: (_response as any)?.total }) as any as T
						: _response
				);
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
				setLoading(false);
			}
		};

		init();
	}, [url, wait, mergeResponse, abortController]);

	return { loading, response, setResponse };
};

export default useGet;
