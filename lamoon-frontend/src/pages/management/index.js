// external modules
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// internal modules
import { useBaseContext } from "contexts/baseContext";
import { IconButton, AddButton, DialogBox } from "components";
import MenuServices from "services/MenuService";
import { openResponseBar } from "reduxes/action";
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

const TableBody = ({
  MenuName: menu,
  Cost: cost,
  Sale: sale,
  MenuID: id,
  handleDelete,
}) => {
  const { alert, appBar } = colors;
  const groupButton = [
    {
      name: "edit",
      color: appBar,
      icon: <EditIcon />,
      wrapper: Link,
      wrapperProps: {
        to: "/management/edit/" + id,
      },
    },
    {
      name: "delete",
      color: alert,
      onClick: () => handleDelete(id, menu),
      icon: <DeleteIcon />,
    },
  ];

  return (
    <div className="table-row">
      <div style={{ width: "60%" }}>{menu}</div>
      <div style={{ width: "20%", textAlign: "center", fontWeight: 600 }}>
        {cost}
      </div>
      <div style={{ width: "20%", textAlign: "center", fontWeight: 600 }}>
        {sale}
      </div>
      <div style={{ width: 120, textAlign: "center", display: "flex" }}>
        {groupButton.map((buttonDetail, buttonIndex) => {
          const { icon, ...other } = buttonDetail;
          const generateKey = `${other.name}-${buttonIndex}`;
          return (
            <IconButton key={generateKey} classes="margin-right-4" {...other}>
              {icon}
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};

const ManagementPage = (props) => {
  const { handleBar, responseBar } = props;
  const [state, setState] = useState({
    data: [],
    open: false,
    deleteID: null,
    deleteMenu: "",
    forceUpdate: false,
  });

  const { browserWidth, browserHeight } = useBaseContext();
  const titleMargin = 54;
  const fakeData = [
    { menu: "สปาเกตตี้ไส้กรอก", cost: 50, sale: 80 },
    { menu: "ข้าวผัดกุ้ง", cost: 60, sale: 100 },
    { menu: "สปาเกตตี้เบค่อน", cost: 50, sale: 80 },
    { menu: "บะหมี่", cost: 30, sale: 60 },
    { menu: "ผัดมาม่า", cost: 20, sale: 50 },
  ];

  useEffect(() => {
    MenuServices.getMenuList()
      .then((res) => {
        setState((prevState) => ({ ...prevState, data: res.payload }));
      })
      .catch((e) => console.log(e));
  }, [state.forceUpdate]);

  const handleClose = () => {
    setState((prevState) => ({ ...prevState, open: false }));

    let timer = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        deleteID: null,
        deleteMenu: "",
      }));
    }, 350);
  };

  const handleDelete = (id, menu) => {
    setState((prevState) => ({
      ...prevState,
      deleteMenu: menu,
      deleteID: id,
      open: true,
    }));
  };

  const handleConfirm = () => {
    MenuServices.deleteMenu(state.deleteID)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          forceUpdate: !prevState.forceUpdate,
        }));

        handleBar({
          status: "success",
          open: true,
          message: "ลบเมนูสำเร็จ",
        });

        handleClose();
      })
      .catch((e) => {
        console.log(e);
        handleBar({
          status: "error",
          open: true,
          message: "ทำรายการไม่สำเร็จ",
        });
      });
  };

  return (
    <div className="relative">
      <DialogBox
        open={state.open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        text={`ต้องการลบเมนู ${state.deleteMenu} ใช่มั้ย ?`}
      />
      <div className="title">จัดการเมนู</div>
      <div
        className="layout"
        style={{ width: browserWidth, height: browserHeight - titleMargin }}
      >
        <TableHead />
        {state.data?.map((dataRow, dataIndex) => {
          const generateKey = `menu-${dataIndex}`;

          return (
            <TableBody
              key={generateKey}
              handleDelete={handleDelete}
              {...dataRow}
            />
          );
        })}
      </div>
      <AddButton Wrapper={Link} wrapperProps={{ to: "/management/add/0" }} />
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    responseBar: state.responseBar,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    handleBar: (data) => dispatch(openResponseBar(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ManagementPage);
