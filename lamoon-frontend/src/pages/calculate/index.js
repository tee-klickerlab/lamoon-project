// external modules
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// internal modules
import { useBaseContext } from "contexts/baseContext";
import { IconButton, AddButton } from "components";
import colors from "assets/scss/_themes-vars.module.scss";

const Report = ({ name, balance }) => {
  const { views, alert, appBar } = colors;
  const groupButton = [
    { name: "view", color: views, icon: <VisibilityIcon /> },
    { name: "edit", color: appBar, icon: <EditIcon /> },
    { name: "delete", color: alert, icon: <DeleteIcon /> },
  ];

  return (
    <div className="report-box report-box-number">
      <div className="report-title">{name}</div>
      <div className="report-footer">
        <div style={{ marginRight: 12 }}>{`${balance} บาท`}</div>
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

const NoData = () => (
  <div
    style={{ border: "none", justifyContent: "center" }}
    className="report-box"
  >
    --- ยังไม่มีข้อมูล ---
  </div>
);

const ReportList = ({ reports }) => {
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
          return <Report {...reportRow} key={reportKey} />;
        })
      )}
    </div>
  );
};

const CalculatePage = () => {
  const fakeData = [
    { name: "02/01/2022", balance: 2100 },
    { name: "03/01/2022", balance: 2000 },
    { name: "04/01/2022", balance: 2300 },
    { name: "05/01/2022", balance: 1800 },
    { name: "06/01/2022", balance: 2000 },
    { name: "06/01/2022 (2)", balance: 1900 },
    { name: "07/01/2022", balance: 1950 },
    { name: "02/02/2022", balance: 2100 },
    { name: "03/02/2022", balance: 2000 },
    { name: "04/02/2022", balance: 2300 },
    { name: "05/02/2022", balance: 1800 },
    { name: "06/02/2022", balance: 2000 },
    { name: "06/02/2022 (2)", balance: 1900 },
    { name: "07/02/2022", balance: 1950 },
    { name: "02/03/2022", balance: 2100 },
    { name: "03/03/2022", balance: 2000 },
    { name: "04/03/2022", balance: 2300 },
    { name: "05/03/2022", balance: 1800 },
    { name: "06/03/2022", balance: 2000 },
    { name: "06/03/2022 (2)", balance: 1900 },
    { name: "07/03/2022", balance: 1950 },
  ];

  return (
    <div className="relative">
      <ReportList reports={fakeData} />
      <AddButton />
    </div>
  );
};

export default CalculatePage;
