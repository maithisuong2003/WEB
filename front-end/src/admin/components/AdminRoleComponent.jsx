import React, { useEffect, useState } from "react";
import AppTitleComponent from "./AppTitleComponent";

import RoleItem from "./RoleItem";

const AdminRoleComponent = () => {
    return (
        <main className="app-content">
            <AppTitleComponent />
            <button style={{ marginBottom: 10, marginLeft: 10 }} className="btn btn-add btn-sm" onClick={handleAddRole}>
                <i className="fas fa-plus" />
                Thêm vai trò
            </button>
            {roles.map((role, index) => (
                <RoleItem key={index} role={role} fetchRoles={fetchRoles} />
            ))}
        </main>
    );
};

export default AdminRoleComponent;
