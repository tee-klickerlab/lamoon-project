import AddIcon from "assets/icons/plus-small";

const AddButton = ({ Wrapper, wrapperProps, ...other }) => {
  if (Wrapper) {
    return (
      <Wrapper {...wrapperProps}>
        <button {...other} className="add-button" type="button">
          <AddIcon sx={{ fontSize: 60 }} />
        </button>
      </Wrapper>
    );
  } else {
    return (
      <button {...other} className="add-button" type="button">
        <AddIcon sx={{ fontSize: 60 }} />
      </button>
    );
  }
};

export default AddButton;
