// external modules
import React, { useEffect } from "react";
import { useParams } from "react-router";

// internal modules
import { useBaseContext } from "contexts/baseContext";
import { IconButton, AddButton } from "components";
import colors from "assets/scss/_themes-vars.module.scss";

const CRUDMenuPage = () => {
  const { browserWidth } = useBaseContext();
  const { action, menu } = useParams();

  return (
    <div className="relative">
      <div className="title">เพิ่มเมนู</div>
      <div className="layout management-layout" style={{ width: browserWidth }}>
        <div id="menu-name">
          <div className="label">ชื่อเมนู</div>
          <input className="textfield" />
        </div>
      </div>
    </div>
  );
};

export default CRUDMenuPage;
