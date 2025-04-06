import React from 'react'

const AppTitleComponent = ({name}) => {
    return (
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
                <li className="breadcrumb-item active">
                    <a href="#">
                        <b>{name}</b>
                    </a>
                </li>
            </ul>
            <div id="clock" />
        </div>
    )
}

export default AppTitleComponent