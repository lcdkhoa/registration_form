import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SubmissionConfirmation = ({ open, handleClose, user = "bạn" }) => {
  const onClose = () => {
    handleClose(false);
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
          <CheckCircleOutlineIcon
            color="success"
            style={{ fontSize: "xxx-large" }}
          />
          <Typography variant="h6" mt={2}>
            Cám ơn {user}
          </Typography>
          <Typography variant="body1" mt={2}>
            Thông tin ghi danh của {user} đã được ghi nhận.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" onClick={onClose}>
            OK
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default SubmissionConfirmation;
