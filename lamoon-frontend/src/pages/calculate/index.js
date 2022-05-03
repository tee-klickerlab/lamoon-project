// external modules
import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// internal modules
import { useBaseContext } from "contexts/baseContext";
import { IconButton, AddButton, DialogBox } from "components";
import colors from "assets/scss/_themes-vars.module.scss";
import ReportServices from "services/ReportService";
import { openResponseBar } from "reduxes/action";

const formatDate = (date) => {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return `${dd}/${mm}/${yyyy}`;
};

const Report = ({ ReportName: name, Total: balance, id, handleDelete }) => {
  const { views, alert, appBar } = colors;
  const groupButton = [
    {
      name: "view",
      color: views,
      icon: <VisibilityIcon />,
      wrapper: Link,
      wrapperProps: {
        to: "/calculate/view/" + id,
      },
    },
    {
      name: "edit",
      color: appBar,
      icon: <EditIcon />,
      wrapper: Link,
      wrapperProps: {
        to: "/calculate/edit/" + id,
      },
    },
    {
      name: "delete",
      color: alert,
      onClick: () => handleDelete(id, name),
      icon: <DeleteIcon />,
    },
  ];

  return (
    <div className="report-box report-box-number">
      <div className="report-title">{name}</div>
      <div className="d-flex">
        <span style={{ marginRight: 8, fontWeight: 600 }}>{balance}</span>
        <div style={{ marginRight: 30 }}>{` บาท`}</div>
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

const NoData = () => (
  <div
    style={{ border: "none", justifyContent: "center" }}
    className="report-box"
  >
    --- ยังไม่มีข้อมูล ---
  </div>
);

const ReportList = ({ reports, handleDelete }) => {
  const { browserWidth, browserHeight } = useBaseContext();
  const reportEmpty = reports.length === 0;

  return (
    <div
      className="layout"
      style={{
        height: browserHeight,
        width: browserWidth,
      }}
    >
      {reportEmpty ? (
        <NoData />
      ) : (
        reports.map((reportRow, index) => {
          const reportKey = `report-${index}`;
          const { ReportID: id, ...row } = reportRow;
          return (
            <Report
              {...row}
              id={id ?? index}
              handleDelete={handleDelete}
              key={reportKey}
            />
          );
        })
      )}
    </div>
  );
};

const CalculatePage = (props) => {
  const getDate = new Date();
  const { handleBar } = props;
  const [state, setState] = useState({
    data: [],
    open: false,
    deleteID: null,
    deleteReport: "",
  });
  //   const fakeData = [
  //     { name: "02/01/2022", balance: 2100 },
  //     { name: "03/01/2022", balance: 2000 },
  //     { name: "04/01/2022", balance: 2300 },
  //     { name: "05/01/2022", balance: 1800 },
  //     { name: "06/01/2022", balance: 2000 },
  //     { name: "06/01/2022 (2)", balance: 1900 },
  //     { name: "07/01/2022", balance: 1950 },
  //     { name: "02/02/2022", balance: 2100 },
  //     { name: "03/02/2022", balance: 2000 },
  //     { name: "04/02/2022", balance: 2300 },
  //     { name: "05/02/2022", balance: 1800 },
  //     { name: "06/02/2022", balance: 2000 },
  //     { name: "06/02/2022 (2)", balance: 1900 },
  //     { name: "07/02/2022", balance: 1950 },
  //     { name: "02/03/2022", balance: 2100 },
  //     { name: "03/03/2022", balance: 2000 },
  //     { name: "04/03/2022", balance: 2300 },
  //     { name: "05/03/2022", balance: 1800 },
  //     { name: "06/03/2022", balance: 2000 },
  //     { name: "06/03/2022 (2)", balance: 1900 },
  //     { name: "07/03/2022", balance: 1950 },
  //   ];

  useEffect(() => {
    ReportServices.getReportList()
      .then((res) =>
        setState((prevState) => ({ ...prevState, data: res.payload }))
      )
      .catch((e) => console.log(e));
  }, []);

  const handleClose = () => {
    setState((prevState) => ({ ...prevState, open: false }));

    let timer = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        deleteID: null,
        deleteReport: "",
      }));
    }, 350);
  };

  const handleDelete = (id, report) => {
    setState((prevState) => ({
      ...prevState,
      deleteReport: report,
      deleteID: id,
      open: true,
    }));
  };

  const handleConfirm = () => {
    ReportServices.deleteReport(state.deleteID)
      .then((res) => {
        if (res.status === "success") {
          setState((prevState) => ({
            ...prevState,
            data: prevState.data.filter(
              (d) => d.ReportID !== prevState.deleteID
            ),
          }));
          handleClose();
          handleBar({
            status: "success",
            open: true,
            message: "ลบเมนูสำเร็จ",
          });
        } else {
          handleBar({
            status: "error",
            open: true,
            message: "ทำรายการไม่สำเร็จ",
          });
        }
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
        text={`ต้องการลบรายการ ${state.deleteReport} ใช่มั้ย ?`}
      />
      <ReportList handleDelete={handleDelete} reports={state.data} />
      {!state.data.find((d) => d.ReportName === formatDate(getDate)) ? (
        <AddButton Wrapper={Link} wrapperProps={{ to: "/calculate/add/0" }} />
      ) : null}
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

export default connect(mapStatetoProps, mapDispatchtoProps)(CalculatePage);
