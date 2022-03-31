// external modules
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// internal modules
import { useBaseContext } from "contexts/baseContext";
import { IconButton, AddButton } from "components";
import colors from "assets/scss/_themes-vars.module.scss";

const calculated = (menuList, order) => {
    let sum = 0;
    menuList.forEach((m) => {
        if (order[m.menu]) {
            sum = sum + m.sale * order[m.menu];
        }
    });

    return sum;
};

const calculateSumary = (menu, orders) => {
    let sum = 0;
    orders.forEach((o) => {
        sum = sum + parseInt(o[menu]);
    });

    return sum;
};

const Menu = ({ data, menuList, onChange, disabled }) => {
    const { browserWidth } = useBaseContext();

    return (
        <>
            <div className="title">เพิ่มเมนู</div>
            <div className="paper" style={{ width: browserWidth }}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="th" style={{ width: "60%", textAlign: "left", paddingLeft: 15 }}>
                                เมนู
                            </th>
                            <th className="th">ราคาทุน</th>
                            <th className="th">ราคาขาย</th>
                        </tr>
                        {data.map((row, index) => {
                            let checked = menuList.includes(row.menu);

                            return (
                                <tr key={index} className={`tr${checked ? " active" : ""}`}>
                                    <td className={`td d-flex menu-column`}>
                                        <label className="checkbox">
                                            <input
                                                name={row.menu}
                                                checked={checked}
                                                onChange={onChange}
                                                disabled={disabled}
                                                type="checkbox"
                                            />
                                            <svg viewBox="0 0 21 18">
                                                <symbol
                                                    id={`tick-path${index}`}
                                                    viewBox="0 0 21 18"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"
                                                        fill="none"
                                                        strokeWidth="2.25"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </symbol>
                                                <defs>
                                                    <mask id={`tick${index}`}>
                                                        <use className="tick mask" href={`#tick-path${index}`} />
                                                    </mask>
                                                </defs>
                                                <use
                                                    className="tick"
                                                    href={`#tick-path${index}`}
                                                    stroke="currentColor"
                                                />
                                                <path
                                                    fill="white"
                                                    mask={`url(#tick${index})`}
                                                    d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z"
                                                />
                                            </svg>
                                            <svg className="lines" viewBox="0 0 11 11">
                                                <path d="M5.88086 5.89441L9.53504 4.26746" />
                                                <path d="M5.5274 8.78838L9.45391 9.55161" />
                                                <path d="M3.49371 4.22065L5.55387 0.79198" />
                                            </svg>
                                        </label>
                                        <span className="ml-05">{row.menu}</span>
                                    </td>
                                    <td className="td fw-600" style={{ textAlign: "center" }}>
                                        {row.cost}
                                    </td>
                                    <td className="td fw-600" style={{ textAlign: "center" }}>
                                        {row.sale}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const AddList = ({ menuList, addOrder, change: handleChange, add: handleAdd, cancel: handleCancel }) => {
    const { success, alert } = colors;
    let defaultCol = ["", "", ""];
    let renderCol = menuList.length > defaultCol.length ? menuList : defaultCol;

    return (
        <tr className="tr">
            <td className="td each-menu"></td>
            <td className="td each-menu text-center">
                <input
                    name="room"
                    className="textfield"
                    value={addOrder.room}
                    onChange={handleChange}
                    style={{ maxWidth: 200, width: "80%" }}
                />
            </td>
            {renderCol.map((h, index) => {
                let col = h === "" ? menuList[index] : h;

                return (
                    <td key={"inputHeader" + index} className="td each-menu text-center">
                        {col && (
                            <input
                                name={col}
                                className="textfield"
                                value={addOrder[col]}
                                onChange={handleChange}
                                style={{ maxWidth: 200, width: "80%" }}
                            />
                        )}
                    </td>
                );
            })}
            <td colSpan={2} />
            <td
                style={{ height: 66, width: "100%", maxWidth: "none" }}
                className="td each-menu d-flex justify-center menu-column"
            >
                <IconButton onClick={handleAdd} color={success}>
                    <CheckIcon />
                </IconButton>
                <IconButton onClick={handleCancel} classes="ml-05" color={alert}>
                    <ClearIcon />
                </IconButton>
            </td>
        </tr>
    );
};

const List = (props) => {
    const { menuList, orderList, addBtn, list, open, checked, edit, handleDelete } = props;
    const { editIndex, editOpen, editConfirm, editCancel } = edit;
    const { alert, appBar } = colors;
    const { browserWidth } = useBaseContext();
    let defaultHeader = ["", "", ""];
    let renderHeader = menuList.length > defaultHeader.length ? menuList : defaultHeader;
    let disabled = editIndex;

    return (
        <>
            <div style={{ alignItems: "center" }} className="title d-flex ">
                <span>รายการ</span>
                <button disabled={disabled} onClick={addBtn} className="add-order">
                    <AddIcon />
                </button>
            </div>
            <div className="paper" style={{ width: browserWidth }}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="th each-menu" style={{ width: "12px" }}>
                                ทำ
                            </th>
                            <th className="th each-menu">ห้อง</th>
                            {renderHeader.map((h, index) => {
                                let header = h === "" ? menuList[index] ?? "" : h;

                                return (
                                    <th key={"header" + index} className="th each-menu">
                                        {header}
                                    </th>
                                );
                            })}
                            <th className="th each-menu">รวม</th>
                            <th className="th each-menu" style={{ width: "12px" }}>
                                จ่าย
                            </th>
                            <th className="th each-menu">#</th>
                        </tr>
                        {open && <AddList {...props} />}
                        {orderList.map((o, index) => {
                            let editProps = { ...props, add: editConfirm, cancel: editCancel };

                            if (editIndex !== index) {
                                return (
                                    <tr key={"tr" + index} className="tr">
                                        <td className="each-row" style={{ width: "12px", paddingLeft: "30px" }}>
                                            <label className="checkbox">
                                                <input
                                                    name={"done" + index}
                                                    type="checkbox"
                                                    checked={o.done}
                                                    onChange={() => checked(index, "done", o.done)}
                                                />
                                                <svg viewBox="0 0 21 18">
                                                    <symbol
                                                        id={`tick-path-done${index}`}
                                                        viewBox="0 0 21 18"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"
                                                            fill="none"
                                                            strokeWidth="2.25"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </symbol>
                                                    <defs>
                                                        <mask id={`tick-done${index}`}>
                                                            <use
                                                                className="tick mask"
                                                                href={`#tick-path-done${index}`}
                                                            />
                                                        </mask>
                                                    </defs>
                                                    <use
                                                        className="tick"
                                                        href={`#tick-path-done${index}`}
                                                        stroke="currentColor"
                                                    />
                                                    <path
                                                        fill="white"
                                                        mask={`url(#tick-done${index})`}
                                                        d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z"
                                                    />
                                                </svg>
                                                <svg className="lines" viewBox="0 0 11 11">
                                                    <path d="M5.88086 5.89441L9.53504 4.26746" />
                                                    <path d="M5.5274 8.78838L9.45391 9.55161" />
                                                    <path d="M3.49371 4.22065L5.55387 0.79198" />
                                                </svg>
                                            </label>
                                        </td>
                                        <th className="each-row">{o.room}</th>
                                        {renderHeader.map((h, index) => {
                                            let header = h === "" ? menuList[index] ?? "" : h;
                                            let menu = o[header];

                                            return (
                                                <th key={"headers" + index} className="each-menu">
                                                    {menu ?? ""}
                                                </th>
                                            );
                                        })}
                                        <th className="each-row">{calculated(list, o)}</th>
                                        <td className="each-row" style={{ width: "12px", paddingLeft: "30px" }}>
                                            <label className="checkbox">
                                                <input
                                                    name={"paid" + index}
                                                    type="checkbox"
                                                    checked={o.paid}
                                                    onChange={() => checked(index, "paid", o.paid)}
                                                />
                                                <svg viewBox="0 0 21 18">
                                                    <symbol
                                                        id={`tick-path-paid${index}`}
                                                        viewBox="0 0 21 18"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"
                                                            fill="none"
                                                            strokeWidth="2.25"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </symbol>
                                                    <defs>
                                                        <mask id={`tick-paid${index}`}>
                                                            <use
                                                                className="tick mask"
                                                                href={`#tick-path-paid${index}`}
                                                            />
                                                        </mask>
                                                    </defs>
                                                    <use
                                                        className="tick"
                                                        href={`#tick-path-paid${index}`}
                                                        stroke="currentColor"
                                                    />
                                                    <path
                                                        fill="white"
                                                        mask={`url(#tick-paid${index})`}
                                                        d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z"
                                                    />
                                                </svg>
                                                <svg className="lines" viewBox="0 0 11 11">
                                                    <path d="M5.88086 5.89441L9.53504 4.26746" />
                                                    <path d="M5.5274 8.78838L9.45391 9.55161" />
                                                    <path d="M3.49371 4.22065L5.55387 0.79198" />
                                                </svg>
                                            </label>
                                        </td>
                                        <td
                                            style={{ height: 66, width: "100%", maxWidth: "none" }}
                                            className="td each-menu d-flex justify-center menu-column"
                                        >
                                            <IconButton
                                                disabled={disabled}
                                                onClick={() => editOpen(index, o)}
                                                color={appBar}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                disabled={disabled}
                                                onClick={() => handleDelete(index)}
                                                classes="ml-05"
                                                color={alert}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                );
                            }
                            return <AddList {...editProps} />;
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const Summary = ({ data, menuList, list }) => {
    const { browserWidth } = useBaseContext();

    return (
        <>
            <div className="title">สรุป</div>
            <div className="paper" style={{ width: browserWidth }}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="th" style={{ width: "60%", textAlign: "left", paddingLeft: 15 }}>
                                เมนู
                            </th>
                            <th className="th">จำนวน</th>
                            <th className="th">ราคาทุน</th>
                            <th className="th">ราคาขาย</th>
                            <th className="th">กำไร</th>
                        </tr>
                        {menuList.map((m, index) => {
                            let counter = calculateSumary(m, data);
                            let menu = list.find((l) => l.menu === m);
                            let cost = menu.cost * counter;
                            let sale = menu.sale * counter;

                            return (
                                <tr key={index} className={`tr`}>
                                    <td className={`td`}>{m}</td>
                                    <td className="td fw-600" style={{ textAlign: "center" }}>
                                        {counter}
                                    </td>
                                    <td className="td fw-600" style={{ textAlign: "center" }}>
                                        {cost}
                                    </td>
                                    <td className="td fw-600" style={{ textAlign: "center" }}>
                                        {sale}
                                    </td>
                                    <td className="td fw-600" style={{ textAlign: "center" }}>
                                        {sale - cost}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const CRUDCalPage = () => {
    const { browserWidth } = useBaseContext();
    const { action, report } = useParams();
    const addOrderInit = {
        room: "",
        paid: false,
        done: false,
    };
    const [state, setState] = useState({
        menuDisabled: false,
        openAdd: true,
        menus: [],
        orders: [],
        addOrder: { ...addOrderInit },
        edit: null,
    });

    const fakeData = [
        { menu: "สปาเกตตี้ไส้กรอก", cost: 50, sale: 80 },
        { menu: "ข้าวผัดกุ้ง", cost: 60, sale: 100 },
        { menu: "สปาเกตตี้เบค่อน", cost: 50, sale: 80 },
        { menu: "บะหมี่", cost: 30, sale: 60 },
        { menu: "ผัดมาม่า", cost: 20, sale: 50 },
    ];

    const handleSelect = ({ target }) => {
        let menu = target.name;
        let menuExist = state.menus.findIndex((d) => d === menu) !== -1;

        if (menuExist) {
            setState((getState) => ({
                ...getState,
                menus: getState.menus.filter((d) => d !== menu),
                addOrder: {
                    ...getState.addOrder,
                    [menu]: undefined,
                },
            }));
        } else {
            setState((getState) => ({
                ...getState,
                menus: [...getState.menus, menu],
                addOrder: {
                    ...getState.addOrder,
                    [menu]: "",
                },
            }));
        }
    };

    const handleAddBtn = () => {
        setState((getState) => ({
            ...getState,
            openAdd: true,
        }));
    };

    const handleAdd = () => {
        setState((getState) => ({
            ...getState,
            orders: [...getState.orders, { ...getState.addOrder }],
            addOrder: { ...addOrderInit },
            openAdd: false,
        }));
    };

    const handleCheck = (index, name, checked) => {
        setState((getState) => ({
            ...getState,
            orders: getState.orders.map((o, oIndex) => {
                if (oIndex === index) {
                    return { ...o, [name]: !checked };
                }

                return { ...o };
            }),
        }));
    };

    const handleCancel = () => {
        setState((getState) => ({
            ...getState,
            addOrder: { ...addOrderInit },
            openAdd: false,
        }));
    };

    const handleDelete = (index) => {
        setState((getState) => ({ ...getState, orders: getState.orders.filter((o, oIndex) => oIndex !== index) }));
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState((getState) => ({ ...getState, addOrder: { ...getState.addOrder, [name]: value } }));
    };

    const handleEditOpen = (index, order) => {
        setState((getState) => ({ ...getState, addOrder: { ...order }, edit: index }));
    };

    const handleEditConfirm = () => {
        setState((getState) => ({
            ...getState,
            orders: getState.orders.map((o, oIndex) => {
                if (oIndex === getState.edit) {
                    return { ...getState.addOrder };
                }
                return { ...o };
            }),
            addOrder: { ...addOrderInit },
            edit: null,
        }));
    };

    const handleEditCancel = () => {
        setState((getState) => ({ ...getState, addOrder: { ...addOrderInit }, edit: null }));
    };

    return (
        <div className="relative x-hidden" style={{ marginBottom: "1rem" }}>
            <Menu data={fakeData} menuList={state.menus} disabled={state.orders.length > 0} onChange={handleSelect} />
            {state.menus.length > 0 && (
                <List
                    list={fakeData}
                    menuList={state.menus}
                    orderList={state.orders}
                    addOrder={state.addOrder}
                    open={state.openAdd}
                    checked={handleCheck}
                    change={handleChange}
                    cancel={handleCancel}
                    add={handleAdd}
                    addBtn={handleAddBtn}
                    handleDelete={handleDelete}
                    edit={{
                        editIndex: state.edit,
                        editOpen: handleEditOpen,
                        editConfirm: handleEditConfirm,
                        editCancel: handleEditCancel,
                    }}
                />
            )}
            {state.orders.length > 0 && <Summary data={state.orders} menuList={state.menus} list={fakeData} />}
        </div>
    );
};

export default CRUDCalPage;
