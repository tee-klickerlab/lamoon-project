// external modules
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

// internal modules
import { useBaseContext } from "contexts/baseContext";
import { IconButton, AddButton } from "components";
import colors from "assets/scss/_themes-vars.module.scss";

const TableHead = () => (
    <div className="table-head">
        <div style={{ width: "60%" }}>ชื่อเมนู</div>
        <div style={{ width: "20%", textAlign: "center" }}>ราคาทุน</div>
        <div style={{ width: "20%", textAlign: "center" }}>ราคาขาย</div>
        {/* action */}
        <div style={{ width: 120 }} />
    </div>
);

const TableBody = ({ menu, cost, sale }) => {
    const { alert, appBar } = colors;
    const groupButton = [
        {
            name: "edit",
            color: appBar,
            icon: <EditIcon />,
            wrapper: Link,
            wrapperProps: {
                to: "/management/edit/1",
            },
        },
        { name: "delete", color: alert, icon: <DeleteIcon /> },
    ];

    return (
        <div className="table-row">
            <div style={{ width: "60%" }}>{menu}</div>
            <div style={{ width: "20%", textAlign: "center" }}>{cost}</div>
            <div style={{ width: "20%", textAlign: "center" }}>{sale}</div>
            <div style={{ width: 120, textAlign: "center", display: "flex" }}>
                {groupButton.map((buttonDetail, buttonIndex) => {
                    const { icon, ...other } = buttonDetail;
                    const generateKey = `${other.name}-${buttonIndex}`;
                    return (
                        <IconButton key={generateKey} classes="margin-right-2" {...other}>
                            {icon}
                        </IconButton>
                    );
                })}
            </div>
        </div>
    );
};

const ManagementPage = () => {
    const { browserWidth, browserHeight } = useBaseContext();
    const titleMargin = 54;
    const fakeData = [
        { menu: "สปาเกตตี้ไส้กรอก", cost: 50, sale: 80 },
        { menu: "ข้าวผัดกุ้ง", cost: 60, sale: 100 },
        { menu: "สปาเกตตี้เบค่อน", cost: 50, sale: 80 },
        { menu: "บะหมี่", cost: 30, sale: 60 },
        { menu: "ผัดมาม่า", cost: 20, sale: 50 },
    ];

    return (
        <div className="relative">
            <div className="title">จัดการเมนู</div>
            <div className="layout" style={{ width: browserWidth, height: browserHeight - titleMargin }}>
                <TableHead />
                {fakeData.map((dataRow, dataIndex) => {
                    const generateKey = `menu-${dataIndex}`;

                    return <TableBody key={generateKey} {...dataRow} />;
                })}
            </div>
            <AddButton />
        </div>
    );
};

export default ManagementPage;
