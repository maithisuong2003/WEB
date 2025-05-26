
import React from "react";
const RoleItem = ({ role, fetchRoles }) => {
    const groupPermissionsByCategory = (permissions) => {
        const groupedPermissions = {};

        permissions.forEach((permission) => {
            const [category] = permission.name.split("_");
            if (!groupedPermissions[category]) {
                groupedPermissions[category] = [];
            }
            groupedPermissions[category].push(permission);
        });

        return groupedPermissions;
    };
    const groupedPermissions = groupPermissionsByCategory(role.permissions);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div>
                        <div className="tile-container">
                            <h3 className="tile-title">{role.description}</h3>
                            <a className="btn btn-danger btn-sm" onClick={handleDeleteRole}>
                                <i className="fas fa-trash-alt" /> Xóa vai trò
                            </a>
                        </div>
                    </div>
                    <div className="tile-body">
                        <div className="row element-button">
                            <div className="col-sm-2">
                                <a className="btn btn-add btn-sm" onClick={handleAddPermission}>
                                    <i className="fas fa-plus" /> Thêm quyền truy cập
                                </a>
                            </div>
                        </div>
                        {Object.entries(groupedPermissions).map(([category, permissions]) => (
                            <div key={category}>
                                <h6>{category}</h6>
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Tên quyền</th>
                                            <th>Mô tả</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissions.map((permission, idx) => (
                                            <tr key={idx}>
                                                <td style={{ width: '15%' }}>{permission.name}</td>
                                                <td >{permission.description}</td>
                                                <td className="table-td-center" style={{ textAlign: 'center', width: '80px' }}>
                                                    <a onClick={() => handleDeletePermission(permission.name)} className="btn btn-primary btn-sm trash" type="button" title="Xóa">
                                                        <i className="fas fa-trash-alt" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleItem;