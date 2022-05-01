import { forwardRef } from "react";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { closeResponseBar, openResponseBar } from "reduxes/action";

const Alert = forwardRef(function (props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

function ResponseBar(props) {
  let vertical = "top";
  let horizontal = "center";
  let { closeBar, handleState, responseBar } = props;

  const handleClose = () => {
    handleState({
      ...responseBar,
      open: false,
    });

    let timer = setTimeout(() => {
      closeBar();
    }, 350);
  };

  return (
    <Snackbar
      open={responseBar.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={handleClose}
        severity={responseBar.status ?? "success"}
        sx={{ width: "100%" }}
      >
        {responseBar.message}
      </Alert>
    </Snackbar>
  );
}

const mapStatetoProps = (state) => ({
  responseBar: state.responseBar,
});

const mapDispatchtoProps = (dispatch) => ({
  closeBar: () => dispatch(closeResponseBar()),
  handleState: (data) => dispatch(openResponseBar(data)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ResponseBar);
