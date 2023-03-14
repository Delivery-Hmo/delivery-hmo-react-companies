import { useEffect, useState } from 'react';
import { Empty, Table as TableAnt } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useGet from '../../hooks/useGet';
import SearchTable from '../searchTable';

interface Props<T> {
	columns: ColumnsType<T> | undefined;
	url: string;
	page: number;
	wait?: boolean;
	placeholderSearch?: string;
}

interface Get<T> {
	total: number;
	list: Array<T>;
}

const { PRESENTED_IMAGE_SIMPLE } = Empty;

const Table = <T extends {}>({ url: urlProp, columns, wait, placeholderSearch, page: pageProp }: Props<T>) => {
	const [url, setUrl] = useState(`${urlProp}?page=1&limit=10`);
  const { loading, response } = useGet<Get<T>>(url, wait);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if(!pageProp) return;
		
		setUrl(`${urlProp}?page=${pageProp}&limit=${limit}&search=${search}`);
		setPage(pageProp);
	}, [urlProp, pageProp, limit, search])
	
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