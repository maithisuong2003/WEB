import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppTitleComponent from './AppTitleComponent';
import Swal from 'sweetalert2';
import axios from 'axios';
import { REST_API_BASE_URL } from '../service/AdminService';

const AdminUpdateProductComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [producers, setProducers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([{ size: '', color: '', quantity: '', listPrice: '', discount: '' }]);
    const [mainImage, setMainImage] = useState(null);
    const [descriptionImages, setDescriptionImages] = useState([]);
    const [productName, setProductName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProducer, setSelectedProducer] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const token = localStorage.getItem('token');

    function getProductManager() {
        navigate('/admin/product-manager');
    }
    const handleAddCategory = () => {
        Swal.fire({
            title: 'Nhập tên danh mục',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Lưu',
            showLoaderOnConfirm: true,
            preConfirm: (categoryName) => {
                if (!categoryName) {
                    Swal.showValidationMessage('Tên danh mục không được để trống');
                } else {
                    return axios.post(`${REST_API_BASE_URL}/categories/create`, {
                        nameCategory: categoryName,
                        isActive: "true"
                    }, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            if (response.status !== 200) {
                                throw new Error(response.statusText);
                            }
                            return response.data;
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Yêu cầu thất bại: ${error}`);
                        });
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                fetchCategories();
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Danh mục đã được thêm thành công',
                    icon: 'success'
                });
            }
        });
    };
    const handleAddProducer = () => {
        Swal.fire({
            title: 'Nhập tên nhà sản xuất',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Lưu',
            showLoaderOnConfirm: true,
            preConfirm: (producerName) => {
                if (!producerName) {
                    Swal.showValidationMessage('Tên nhà sản xuất không được để trống');
                } else {
                    return axios.post(`${REST_API_BASE_URL}/producers/create`, {
                        nameProducer: producerName,
                        isActive: "true"
                    }, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            if (response.status !== 200) {
                                throw new Error(response.statusText);
                            }
                            return response.data;
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Yêu cầu thất bại: ${error}`);
                        });
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                fetchProducers();
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Nhà sản xuất đã được thêm thành công',
                    icon: 'success'
                });
            }
        });
    };
    const handleAddSupplier = () => {
        Swal.fire({
            title: 'Nhập tên nhà cung cấp',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Lưu',
            showLoaderOnConfirm: true,
            preConfirm: (supplierName) => {
                if (!supplierName) {
                    Swal.showValidationMessage('Tên nhà cung cấp không được để trống');
                } else {
                    return axios.post(`${REST_API_BASE_URL}/suppliers/create`, {
                        nameSupplier: supplierName,
                        isActive: "true"
                    }, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            if (response.status !== 200) {
                                throw new Error(response.statusText);
                            }
                            return response.data;
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Yêu cầu thất bại: ${error}`);
                        });
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                fetchSuppliers();
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Nhà cung cấp đã được thêm thành công',
                    icon: 'success'
                });
            }
        });
    };
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${REST_API_BASE_URL}/products/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                const product = response.data.result;
                setProductName(product.nameProduct);
                setProductDescription(product.description);
                setSelectedCategory(product.categoryEntity.id);
                setSelectedProducer(product.producerEntity.id);
                setSelectedSupplier(product.supplierEntity.id);
                setProducts(product.sizeColorProductsEntity.map(item => ({
                    size: item.size,
                    color: item.color,
                    quantity: item.inventoryEntity.quantity,
                    listPrice: item.listPrice,
                    discount: item.discount
                })));
                setMainImage(product.imageProductEntity[0].image);
                setDescriptionImages(product.imageProductEntity.slice(1).map(image => image.image));
            } else {
                throw new Error('Lỗi khi lấy thông tin sản phẩm');
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi khi lấy thông tin sản phẩm',
                text: error.message,
            });
        }
    };

    const fetchCategories = () => {
        axios.get(`${REST_API_BASE_URL}/categories/all`)
            .then(response => {
                if (response.status === 200) {
                    setCategories(response.data.result);
                } else {
                    console.error('Lỗi khi lấy danh sách danh mục:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách danh mục:', error);
            });
    };

    const fetchProducers = () => {
        axios.get(`${REST_API_BASE_URL}/producers/all`)
            .then(response => {
                if (response.status === 200) {
                    setProducers(response.data.result);
                } else {
                    console.error('Lỗi khi lấy danh sách nhà sản xuất:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách nhà sản xuất:', error);
            });
    };

    const fetchSuppliers = () => {
        axios.get(`${REST_API_BASE_URL}/suppliers/all`)
            .then(response => {
                if (response.status === 200) {
                    setSuppliers(response.data.result);
                } else {
                    console.error('Lỗi khi lấy danh sách nhà cung cấp:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách nhà cung cấp:', error);
            });
    };

    useEffect(() => {
        fetchProduct();
        fetchCategories();
        fetchProducers();
        fetchSuppliers();
    }, [id]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    const addProduct = () => {
        setProducts([...products, { size: '', color: '', quantity: '', listPrice: '', discount: '' }]);
    };

    const removeProduct = (index) => {
        if (products.length > 1) {
            const newProducts = products.filter((_, i) => i !== index);
            setProducts(newProducts);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Không thể xóa',
                text: 'Phải có ít nhất một hàng trong bảng sản phẩm.',
            });
        }
    };

    const handleMainImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setMainImage(file);
        }
    };

    const handleDescriptionImagesChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + descriptionImages.length > 4) {
            Swal.fire({
                icon: 'warning',
                title: 'Không thể tải lên',
                text: 'Chỉ có thể chọn tối đa 4 ảnh mô tả.',
            });
        } else {
            setDescriptionImages(prevImages => [
                ...prevImages,
                ...files
            ]);
        }
    };

    const removeMainImage = () => {
        setMainImage(null);
    };

    const removeDescriptionImage = (index) => {
        setDescriptionImages(descriptionImages.filter((_, i) => i !== index));
    };

    const handleUploadImages = async () => {
        try {
            let mainImageUrl = '';
            const descriptionImageUrls = [];

            if (mainImage instanceof File) {
                const formData = new FormData();
                formData.append('file', mainImage);

                const response = await axios.post(`${REST_API_BASE_URL}/uploadFile`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                mainImageUrl = response.data.result;
            } else {
                mainImageUrl = mainImage;
            }

            for (const file of descriptionImages) {
                if (file instanceof File) {
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await axios.post(`${REST_API_BASE_URL}/uploadFile`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });

                    descriptionImageUrls.push(response.data.result);
                } else {
                    descriptionImageUrls.push(file);
                }
            }

            return { mainImageUrl, descriptionImageUrls };
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi khi tải lên hình ảnh',
                text: error.message,
            });
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { mainImageUrl, descriptionImageUrls } = await handleUploadImages();

            const payloadJSON = {
                "id": id,
                "nameProduct": productName,
                "description": productDescription,
                "isActive": true,
                "isDelete": false,
                "status": "Còn hàng",
                "supplierEntity": {
                    "id": selectedSupplier
                },
                "producerEntity": {
                    "id": selectedProducer
                },
                "categoryEntity": {
                    "id": selectedCategory
                },
                "sizeColorProductsEntity": products.map(product => {
                    return {
                        "size": product.size,
                        "color": product.color,
                        "listPrice": product.listPrice,
                        "discount": product.discount,
                        "inventoryEntity": {
                            "quantity": product.quantity
                        }
                    };
                }),
                "imageProductEntity": [
                    {
                        "image": mainImageUrl
                    },
                    ...descriptionImageUrls.map(url => {
                        return {
                            "image": url
                        };
                    })
                ]
            };

            const response = await axios.put(`${REST_API_BASE_URL}/products/${id}`, payloadJSON, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                Swal.fire('Thành công!', 'Sản phẩm đã được cập nhật thành công', 'success').then(() => {
                    navigate('/admin/product-manager');
                });
            } else {
                throw new Error('Lỗi khi cập nhật sản phẩm');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi khi cập nhật sản phẩm',
                text: error.message,
            });
        }
    };

    return (
        <main className="app-content">
            <AppTitleComponent />
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Tạo mới sản phẩm</h3>
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <a className="btn btn-add btn-sm" onClick={handleAddProducer} >
                                        <i className="fas fa-folder-plus" /> Thêm nhà sản xuất
                                    </a>
                                </div>
                                <div className="col-sm-2">
                                    <a className="btn btn-add btn-sm" onClick={handleAddSupplier}>
                                        <i className="fas fa-folder-plus" /> Thêm nhà cung cấp
                                    </a>
                                </div>
                                <div className="col-sm-2">
                                    <a className="btn btn-add btn-sm" onClick={handleAddCategory}  >
                                        <i className="fas fa-folder-plus" /> Thêm danh mục
                                    </a>
                                </div>
                            </div>
                            <form className="row" onSubmit={handleSubmit}>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productName"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="category" className="control-label">
                                        Danh mục
                                    </label>
                                    <select className="form-control" value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)} required name="category" id="category">
                                        <option>-- Chọn danh mục --</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.nameCategory}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="producer" className="control-label">
                                        Nhà sản xuất
                                    </label>
                                    <select
                                        className="form-control"
                                        id="producer"
                                        value={selectedProducer}
                                        onChange={(e) => setSelectedProducer(e.target.value)}
                                        required
                                    >
                                        <option>--  Nhà sản xuất --</option>
                                        {producers.map(producer => (
                                            <option key={producer.id} value={producer.id}>
                                                {producer.nameProducer}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="supplier" className="control-label">
                                        Nhà cung cấp
                                    </label>
                                    <select
                                        className="form-control"
                                        id="supplier"
                                        value={selectedSupplier}
                                        onChange={(e) => setSelectedSupplier(e.target.value)}
                                        required
                                    >
                                        <option>-- Chọn nhà cung cấp --</option>
                                        {suppliers.map(supplier => (
                                            <option key={supplier.id} value={supplier.id}>
                                                {supplier.nameSupplier}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <table style={{ margin: 10 }} id="product-table" className='responsive-table'>
                                    <tbody>
                                        <tr>
                                            <th>Kích thước</th>
                                            <th>Màu sắc</th>
                                            <th>Số lượng</th>
                                            <th>Giá tiền</th>
                                            <th>Giảm giá</th>
                                            <th>Xóa</th>
                                        </tr>
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="size"
                                                        value={product.size}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Nhập kích thước"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="color"
                                                        value={product.color}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Nhập màu sắc"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="quantity"
                                                        value={product.quantity}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Nhập số lượng"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="listPrice"
                                                        value={product.listPrice}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Nhập giá"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="discount"
                                                        value={product.discount}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Nhập giảm giá"
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeProduct(index)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button
                                    style={{ margin: '0 0 30px 10px' }}
                                    className="btn btn-add"
                                    type="button"
                                    onClick={addProduct}
                                >
                                    Thêm hàng
                                </button>

                                <div className="form-group col-md-12">
                                    <label className="control-label">Ảnh đại diện sản phẩm</label>
                                    <div id="myfileupload">
                                        <label htmlFor="uploadfile-main" className="Choicefile" style={{ color: 'white', cursor: 'pointer' }}>
                                            <i className="fas fa-cloud-upload-alt" /> Chọn ảnh
                                        </label>
                                        <input
                                            type="file"
                                            id="uploadfile-main"
                                            name="ImageUpload"
                                            onChange={handleMainImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <div id="thumbbox">
                                        {mainImage && (
                                            <div className="thumbimage-container">
                                                <img
                                                    height={450}
                                                    width={400}
                                                    alt="Thumb image"
                                                    id="thumbimage"
                                                    src={mainImage}
                                                />
                                                <button
                                                    type="button"
                                                    className="removeimg"
                                                    onClick={removeMainImage}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="control-label">Ảnh mô tả sản phẩm</label>
                                    <div id="myfileupload">
                                        <label htmlFor="uploadfile-description" className="Choicefile" style={{ color: 'white', cursor: 'pointer' }}>
                                            <i className="fas fa-cloud-upload-alt" /> Chọn ảnh
                                        </label>
                                        <input
                                            type="file"
                                            id="uploadfile-description"
                                            name="ImageUpload"
                                            multiple
                                            onChange={handleDescriptionImagesChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <div id="thumbbox">
                                        {descriptionImages.map((image, index) => (
                                            <div key={index} className="thumbimage-container">
                                                <img
                                                    height={100}
                                                    width={100}
                                                    alt="Thumb image"
                                                    src={image}
                                                />
                                                <button
                                                    type="button"
                                                    className="removeimg"
                                                    onClick={() => removeDescriptionImage(index)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="productDescription">Mô tả sản phẩm</label>
                                    <textarea
                                        className="form-control"
                                        id="productDescription"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className="btn btn-save" type="sumit">
                                    Lưu lại
                                </button>
                                <button style={{ marginLeft: 5 }} className="btn btn-cancel" onClick={getProductManager}>
                                    Hủy bỏ
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </main>
    );
};

export default AdminUpdateProductComponent;
