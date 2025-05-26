import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import AppTitleComponent from './AppTitleComponent'


const AdminAddProductComponent = () => {
    const navigate = useNavigate()
    const [productName, setProductName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProducer, setSelectedProducer] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [productDescription, setProductDescription] = useState('');
    function getProductManager() {
        navigate('/admin/product-manager')
    }

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
                                                    src={typeof mainImage === 'string' ? mainImage : URL.createObjectURL(mainImage)}
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
                                                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
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
                                <a style={{ marginLeft: 5 }} className="btn btn-cancel" onClick={getProductManager}>
                                    Hủy bỏ
                                </a>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </main>
    )
}

export default AdminAddProductComponent