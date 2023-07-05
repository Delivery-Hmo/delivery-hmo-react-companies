import { useEffect, useMemo, useState } from 'react';
import { Empty, Table as TableAnt } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useGet from '../../hooks/useGet';
import SearchTable from '../searchTable';
import TableActionsButtons from "./tableActionsButtons";
import { patch } from "../../services";

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
	const [url, setUrl] = useState(`${urlProp}?page=1&limit=10`);
	const { loading, response } = useGet<Get<T>>(url, wait);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState("");

	useEffect(() => {
		setUrl(urlProp);
	}, [urlProp]);
 
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
							onDeleted={() => setUrl(`${urlProp}?page=1&limit=${limit}&search=${search}`)}
							fun={() => patch(urlDisabled, { id: r.id })}
							pathEdit={pathEdit}
						/>
					)
				},
			}
		];
	}, [columnsProp, urlDisabled, pathEdit, limit, search, urlProp]);

	return (
		<div>
			<SearchTable
				onSearch={(value) => {
					setSearch(value);
					setPage(1);
					setUrl(`${urlProp}?page=1&limit=${limit}&search=${value}`);
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
						setUrl(`${urlProp}?page=${_page}&limit=${pageSize}&search=${search}`);
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