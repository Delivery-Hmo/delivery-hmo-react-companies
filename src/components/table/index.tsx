import { Empty, Table as TableAnt } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useGet from '../../hooks/useGet';
import { useState } from 'react';
import SearchTable from '../searchTable';

interface Props<T> {
	columns: ColumnsType<T> | undefined;
	url: string;
	wait?: boolean;
	placeholderSearch?: string;
}

interface Get<T> {
	total: number;
	list: Array<T>
}

const { PRESENTED_IMAGE_SIMPLE } = Empty;

const Table = <T extends {}>({ url: urlParam, columns, wait, placeholderSearch }: Props<T>) => {
	const [url, setUrl] = useState(urlParam);
  const { loading, response } = useGet<Get<T>>(url, wait);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	
	return (
		<div>
			<SearchTable 
        onSearch={(search) => setUrl(`${urlParam}?page=${page}&limit=${limit}&search=${search}`)}
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
					onShowSizeChange: (_: any, size: number) => setLimit(size),
					onChange: (page: number) => setPage(page),
					showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} de ${total} registros.`,
					locale: { items_per_page: '/ página' },
					showSizeChanger: true
				}}
			/>
		</div>
	)
}

export default Table;