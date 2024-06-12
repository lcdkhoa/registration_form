import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";

const SubmissionConfirmation = ({ open, handleClose }) => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          mt={2}
        >
          <WarningIcon color="error" style={{ fontSize: "xxx-large" }} />
          <Typography variant="h6" mt={2}>
            Đã có lỗi trong quá trình ghi danh, vui lòng thử lại.
          </Typography>
          <DialogActions>
            <Button onClick={reloadPage} variant="contained" color="primary">
              OK
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionConfirmation;
