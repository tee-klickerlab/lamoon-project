import Axios from "./BaseService";

const formatDate = (date) => {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return `${dd}/${mm}/${yyyy}`;
};

const ReportServices = {
  getReportList: () => {
    return Axios.get("/reports");
  },
  getReport: (id) => {
    return Axios.get("/reports/" + id);
  },
  deleteReport: (id) => {
    return Axios.delete("/reports/" + id);
  },
  addReport: () => {
    const date = new Date();

    return Axios.post("/reports", { name: formatDate(date) });
  },
  updateReport: (id, data, total) => {
    let payload = {
      name: Date.now(),
      total,
      menus: data.map((r) => ({
        menuID: r.menuID,
        menuPriceID: r.menuPriceID,
      })),
    };

    return Axios.put("/reports/" + id, payload);
  },
  //   getMenuData: (menuID) => {
  //     return Axios.get("/menus/" + menuID);
  //   },
  //   addMenu: (data) => {
  //     return Axios.post("/menus", { ...data, name: data.menu });
  //   },
  //   updateMenu: (data, id) => {
  //     return Axios.put("/menus/" + id, { ...data, name: data.menu });
  //   },
  //   deleteMenu: (id) => {
  //     return Axios.delete("/menus/" + id);
  //   },
};

export default ReportServices;
