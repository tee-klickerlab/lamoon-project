// external modules
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { connect } from "react-redux";

// internal modules
import { useBaseContext } from "contexts/baseContext";
import { ActionButton } from "components";
import { openResponseBar } from "reduxes/action";
import colors from "assets/scss/_themes-vars.module.scss";
import MenuServices from "services/MenuService";

const CRUDMenuPage = ({ handleBar }) => {
  const [state, setState] = useState({ menu: "", cost: 0, sale: 0 });
  const { browserWidth } = useBaseContext();
  const { action, menu } = useParams();
  const isEdit = action === "edit";
  const navgate = useNavigate();

  const handleChange = ({ target }) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const goBack = () => navgate("/management");

  const handleConfirm = () => {
    if (isEdit) {
      MenuServices.updateMenu(state, state.menuID)
        .then((res) => {
          handleBar({
            message: "แก้ไขเมนูสำเร็จ",
            status: "success",
            open: true,
          });
          goBack();
        })
        .catch((e) => {
          console.log(e);
          handleBar({
            message: "ทำรายการไม่สำเร็จ",
            status: "error",
            open: true,
          });
        });
    } else {
      MenuServices.addMenu(state)
        .then((res) => {
          handleBar({
            message: "เพิ่มเมนูสำเร็จ",
            status: "success",
            open: true,
          });
          goBack();
        })
        .catch((e) => {
          console.log(e);
          handleBar({
            message: "ทำรายการไม่สำเร็จ",
            status: "error",
            open: true,
          });
        });
    }
  };

  useEffect(() => {
    if (isEdit) {
      MenuServices.getMenuData(menu)
        .then((res) => {
          let data = res.payload[0];
          if (data) {
            setState((prevState) => ({
              ...prevState,
              menuID: data.MenuID,
              menu: data.MenuName,
              cost: data.Cost,
              sale: data.Sale,
            }));
          }
        })
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <div className="relative">
      <div className="title">{isEdit ? "แก้ไขเมนู" : "เพิ่มเมนู"}</div>
      <div
        className="layout management-layout"
        style={{
          width: browserWidth,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{ maxWidth: 500, margin: "auto" }}
          className="mb-10"
          id="menu-name"
        >
          <div className="label">ชื่อเมนู</div>
          <input
            style={{ minWidth: 450 }}
            onChange={handleChange}
            value={state.menu}
            name="menu"
            className="textfield"
          />
        </div>
        <div
          style={{ maxWidth: 500, margin: "auto" }}
          className="mb-10"
          id="menu-cost"
        >
          <div className="label">ต้นทุน</div>
          <input
            style={{ minWidth: 450 }}
            onChange={handleChange}
            value={state.cost}
            name="cost"
            className="textfield"
          />
        </div>
        <div
          style={{ maxWidth: 500, margin: "auto" }}
          className="mb-10"
          id="menu-sale"
        >
          <div className="label">ราคาขาย</div>
          <input
            style={{ minWidth: 450 }}
            onChange={handleChange}
            value={state.sale}
            name="sale"
            className="textfield"
          />
        </div>
        <div
          className="d-flex mb-10"
          style={{
            maxWidth: 500,
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <ActionButton onClick={handleConfirm} color="enter">
            ตกลง
          </ActionButton>
          <ActionButton onClick={goBack} classes="ml-10" color="cancel">
            ยกเลิก
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  responseBar: state.responseBar,
});

const mapDispatchtoProps = (dispatch) => ({
  handleBar: (data) => dispatch(openResponseBar(data)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(CRUDMenuPage);
