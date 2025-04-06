import React from 'react';

const ElementButtonComponent = () => {
    return (
        <div className="row element-button">
            <div className="col-sm-2">
                <a className="btn btn-delete btn-sm nhap-tu-file" type="button" title="Nhập">
                    <i className="fas fa-file-upload" /> Tải từ file
                </a>
            </div>
            <div className="col-sm-2">
                <a className="btn btn-delete btn-sm print-file" type="button" title="In">
                    <i className="fas fa-print" /> In dữ liệu
                </a>
            </div>
            <div className="col-sm-2">
                <a className="btn btn-delete btn-sm print-file js-textareacopybtn" type="button" title="Sao chép">
                    <i className="fas fa-copy" /> Sao chép
                </a>
            </div>
            <div className="col-sm-2">
                <a className="btn btn-excel btn-sm" href="" title="In">
                    <i className="fas fa-file-excel" /> Xuất Excel
                </a>
            </div>
            <div className="col-sm-2">
                <a className="btn btn-delete btn-sm pdf-file" type="button" title="In">
                    <i className="fas fa-file-pdf" /> Xuất PDF
                </a>
            </div>
        </div>
    );
};

export default ElementButtonComponent;
