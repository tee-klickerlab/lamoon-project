import colors from "assets/scss/_themes-vars.module.scss";

const ActionButton = ({ children, classes, color = "default", ...other }) => {
  const extraClass = classes ? ` ${classes}` : "";
  let bg = () => {
    switch (color) {
      case "enter":
        return colors.success;
      case "cancel":
        return colors.alert;
      default:
        return colors.appBar;
    }
  };

  return (
    <button
      {...other}
      className={`default-button${extraClass}`}
      style={{
        backgroundColor: bg(),
      }}
      type="button"
    >
      {children}
    </button>
  );
};

export default ActionButton;
