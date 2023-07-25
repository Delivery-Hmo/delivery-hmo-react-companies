import { useMemo, useState } from 'react';
import { Empty, Table as TableAnt } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useGet from '../../hooks/useGet';
import SearchTable from '../searchTable';
import TableActionsButtons from "./tableActionsButtons";
import { patch } from "../../services";
import useAbortController from "../../hooks/useAbortController";

interface Props<T> {
	columns: ColumnsType<T>;
	url: string;
	wait?: boolean;
	placeholderSearch?: string;
	pathEdit: string;
	urlDisabled: string;
}

export interface Get<T> {
	total: number;
	list: Array<T>;
}

const { PRESENTED_IMAGE_SIMPLE } = Empty;

const Table = <T extends {}>({ url: urlProp, columns: columnsProp, wait, placeholderSearch, pathEdit, urlDisabled }: Props<T>) => {
	const abortController = useAbortController();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState("");

	const url = useMemo(() => `${urlProp}?page=${page}&limit=${limit}&search=${search}`, [urlProp, page, limit, search]);
	const { loading, response } = useGet<Get<T>>(url, urlProp === "" || wait);

	const columns = useMemo<ColumnsType<T>>(() => {
		return [
			...columnsProp.map(c => ({ ...c, width: c.width || 150 })),
			{
				title: 'Acciones',
				key: 'actions',
				fixed: 'right',
				width: 100,
				render: (_, record: T) => {
					const r = record as T & { id: string };

					return (
						<TableActionsButtons
							record={record}
							onDeleted={() => setPage(1)}
							fun={() => patch(urlDisabled, { id: r.id }, abortController.current!)}
							pathEdit={pathEdit}
						/>
					)
				},
			}
		];
	}, [columnsProp, urlDisabled, pathEdit, abortController]);

	return (
		<div>
			<SearchTable
				onSearch={(value) => {
					setSearch(value);
					setPage(1);
				}}
				placeholder={placeholderSearch}
			/>
			<TableAnt
				sticky
				scroll={{ x: 400 }}
				columns={columns}
				dataSource={response?.list}
				loading={loading}
				locale={{ emptyText: <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin registros.' /> }}
				rowKey="id"
				pagination={{
					total: response?.total,
					pageSize: limit,
					current: page,
					onChange: (_page: number, pageSize: number) => {
						setPage(_page);
						setLimit(pageSize);
					},
					showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} de ${total} registros.`,
					locale: { items_per_page: '/ página' },
					showSizeChanger: true
				}}
			/>
		</div>
	)
}

export default Table;