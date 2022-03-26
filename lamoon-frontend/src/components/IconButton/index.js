const IconButton = ({ children, color, classes, ...other }) => {
  const extraClass = classes ? ` ${classes}` : "";

  return (
    <button
      {...other}
      className={`icon-button${extraClass}`}
      style={{ backgroundColor: color }}
      type="button"
    >
      {children}
    </button>
  );
};

export default IconButton;
