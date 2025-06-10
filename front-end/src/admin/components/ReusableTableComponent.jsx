import  { useState } from 'react';
import { Table, Button, Space, Input,  Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const ReusableTableComponent = ({ columns, data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pageSize, setPageSize] = useState(5);

  let searchInput;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => 
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  const getSorter = (dataIndex) => (a, b) => {
    if (typeof a[dataIndex] === 'number' && typeof b[dataIndex] === 'number') {
      return a[dataIndex] - b[dataIndex];
    }
    if (typeof a[dataIndex] === 'string' && typeof b[dataIndex] === 'string') {
      return a[dataIndex].localeCompare(b[dataIndex]);
    }
    return 0; // Default case when types are mixed or unsupported
  };

  // eslint-disable-next-line react/prop-types
  const enhancedColumns = columns.map((col) => {
    const { dataIndex } = col;
    if (!col.searchable && !col.sortable) {
      return col;
    }

    return {
      ...col,
      ...(col.searchable ? getColumnSearchProps(dataIndex) : {}),
      ...(col.sortable ? { sorter: getSorter(dataIndex) } : {}),
    };
  });

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Select defaultValue={5} onChange={handlePageSizeChange} style={{ width: 120 }}>
          <Option value={5}>Hiển thị 5</Option>
          <Option value={10}>Hiển thị 10</Option>
          <Option value={20}>Hiển thị 20</Option>
        </Select>
      </div>
      <Table
        className='responsive-table'
        columns={enhancedColumns}
        dataSource={data}
        bordered
        pagination={{ pageSize }}
      />
    </div>
  );
};

export default ReusableTableComponent;
