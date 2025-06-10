import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';
import { REST_API_BASE_URL } from '../service/AdminService';

const AdminProductComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');



  useEffect(() => {
    axios.get(`${REST_API_BASE_URL}/products/all`)
        .then(response => {
          if (response.data.code === 0) {
            setData(response.data.result.map(item => {
              const sizeColors = item.sizeColorProductsEntity
                  .map(sizeColor => {
                    const color = sizeColor.color ? sizeColor.color : '';
                    const size = sizeColor.size ? sizeColor.size : '';
                    return `${color}/${size}`;
                  })
                  .join(', ');

              const prices = item.sizeColorProductsEntity
                  .map(sizeColor => sizeColor.listPrice ? sizeColor.listPrice : '')
                  .join(', ');

              const discounts = item.sizeColorProductsEntity
                  .map(sizeColor => sizeColor.discount ? sizeColor.discount : '')
                  .join(', ');

              return {
                key: item.id,
                productCode: item.id,
                productName: item.nameProduct,
                description: item.description,
                supplier: item.supplierEntity.nameSupplier,
                producer: item.producerEntity.nameProducer,
                category: item.categoryEntity.nameCategory,
                status: item.status,
                sizeColor: sizeColors,
                price: prices,
                discount: discounts,
                image: item.imageProductEntity[0]?.image || '',
              };
            }));
          }
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
  }, []);


  const getAddProduct = () => {
    navigate('/admin/add-product');
  };
  function getEditProduct(id) {
    navigate(`/admin/edit-product/${id}`);
  }

  const handleDelete = (key) => {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không thể khôi phục điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, xóa nó đi!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${REST_API_BASE_URL}/products/${key}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
            .then(() => {
              Swal.fire('Đã xóa!', 'Sản phẩm của bạn đã bị xóa.', 'success');
              setData(data.filter(item => item.key !== key));
            })
            .catch(error => {
              console.error('Xóa không thành công:', error);
              Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa tệp.', 'error');
            });
      }
    });
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
