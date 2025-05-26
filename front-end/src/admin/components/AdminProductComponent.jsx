import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';

const AdminProductComponent = () => {
  const navigate = useNavigate();




  const getAddProduct = () => {
    navigate('/admin/add-product');
  };
  function getEditProduct(id) {
    navigate(`/admin/edit-product/${id}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'productCode',
      key: 'productCode',
      width: '5%',
      searchable: true,
      sortable: true,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      searchable: true,
      sortable: true,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      searchable: true,
      sortable: true,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img className="img-card-person" src={text} alt="" />,
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Badge status={text === 'Còn hàng' ? 'success' : 'error'} text={text} />
      ),
    },
    {
      title: 'Màu sắc/Kích thước',
      dataIndex: 'sizeColor',
      key: 'sizeColor',
      render: (text) => (
        <div>{text.split(', ').map((sizeColor, index) => (
          <div key={index}>{sizeColor}</div>
        ))}</div>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (text) => (
        <div>{text.split(', ').map((price, index) => (
          <div key={index}>{parseInt(price).toLocaleString('it-IT')}đ</div>
        ))}</div>
      ),
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => (
        <div>{text.split(', ').map((discount, index) => (
          <div key={index}>{discount}%</div>
        ))}</div>
      ),
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className='btn btn-primary btn-sm edit'
            icon={<EditOutlined />}
            onClick={() => getEditProduct(record.key)}
          >
            Sửa
          </Button>
          <Button
            type="danger"
            className='btn btn-primary btn-sm trash'
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];


  return (
    <main className="app-content">
      <AppTitleComponent name={'Quản lý sản phẩm'} />
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <EmlementButtonComponent addButton={{ onClick: getAddProduct, title: 'Thêm', text: 'Thêm sản phẩm mới', visible: true }} />
              <Button
                type="primary"
                onClick={getAddProduct}
                icon={<PlusOutlined />}
                style={{ marginBottom: 16 }}
              >
                Thêm sản phẩm mới
              </Button>
              <ReusableTableComponent columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminProductComponent;
