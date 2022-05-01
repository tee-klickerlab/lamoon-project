import Axios from "./BaseService";

const MenuServices = {
  getMenuList: () => {
    return Axios.get("/menus");
  },
  getMenuData: (menuID) => {
    return Axios.get("/menus/" + menuID);
  },
  addMenu: (data) => {
    return Axios.post("/menus", { ...data, name: data.menu });
  },
  updateMenu: (data, id) => {
    return Axios.put("/menus/" + id, { ...data, name: data.menu });
  },
  deleteMenu: (id) => {
    return Axios.delete("/menus/" + id);
  },
};

export default MenuServices;
