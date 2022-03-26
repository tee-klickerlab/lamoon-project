import AddIcon from "@mui/icons-material/Add";

const AddButton = (props) => (
  <button {...props} className="add-button" type="button">
    <AddIcon sx={{ fontSize: 60 }} />
  </button>
);

export default AddButton;
