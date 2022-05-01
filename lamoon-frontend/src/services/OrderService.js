import Axios from "./BaseService";

const formatDate = (date) => {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return `${dd}/${mm}/${yyyy}`;
};

const OrderServices = {
  deleteOrder: (id) => {
    return Axios.delete("/orders/" + id);
  },
  addOrder: (data, reportID, list) => {
    const { room, remark, paid, done, ...orders } = data;

    const menuItems = Object.keys(orders).map((key) => {
      let menuDetail = list.find((l) => l.menu === key);

      return {
        menuID: menuDetail.menuID,
        menuPriceID: menuDetail.menuPriceID,
        amount: orders[key],
      };
    });

    let dataSet = {
      name: room,
      reportID,
      remark,
      menuItems,
    };

    return Axios.post("/orders", dataSet);
  },
  updateOrder: (data, reportID, list, updateCheck, checked, checkedName) => {
    if (updateCheck) {
      let order = list[reportID];

      let dataSet = {
        updateCheck,
        checked,
        checkedName,
      };

      return Axios.put("/orders/" + order.id, dataSet);
    } else {
      const { room, remark, paid, done, id, ...orders } = data;

      const menuItems = Object.keys(orders).map((key) => {
        let menuDetail = list.find((l) => l.menu === key);

        return {
          menuID: menuDetail.menuID,
          menuPriceID: menuDetail.menuPriceID,
          amount: orders[key],
        };
      });

      let dataSet = {
        name: room,
        reportID,
        remark,
        menuItems,
      };

      return Axios.put("/orders/" + id, dataSet);
    }
  },
  //   addReport: () => {
  //     const date = new Date();

  //     return Axios.post("/reports", { name: formatDate(date) });
  //   },
  //   updateReport: (id, data, total) => {
  //     let payload = {
  //       name: Date.now(),
  //       total,
  //       menus: data.map((r) => ({
  //         menuID: r.menuID,
  //         menuPriceID: r.menuPriceID,
  //       })),
  //     };

  //     return Axios.put("/reports/" + id, payload);
  //   },
};

export default OrderServices;
