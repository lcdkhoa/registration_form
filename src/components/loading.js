import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Grid,
  Typography,
} from "@mui/material";

const Loading = ({ open }) => {
  return (
    <Box
      zIndex="500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
    >
      <Backdrop open={open}>
        <Fade in>
          <Grid
            spacing={2}
            container
            direction="column"
            justifyContent="center"
            align="center"
          >
            <Grid item>
              <CircularProgress style={{ color: "white" }} />
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  paddingTop: 20,
                }}
              >
                Đang nộp phiếu, vui lòng đợi...
              </Typography>
            </Grid>
          </Grid>
        </Fade>
      </Backdrop>
    </Box>
  );
};

export default Loading;
