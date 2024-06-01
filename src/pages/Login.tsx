import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import poster1 from "../assets/poster1.jpg";
import poster2 from "../assets/poster2.jpg";
import poster3 from "../assets/poster3.jpg";
import poster4 from "../assets/poster4.jpg";
import Carousel from "react-material-ui-carousel";
import { useForm } from "react-hook-form";
import UserRadioButtons from "@/components/ui/UserRadioButtions";

function Login() {
  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(() => {});
  const theme = useTheme();
  let posters = [poster1, poster2, poster3, poster4];
  return (
    <Box
      component={"main"}
      sx={{
        maxWidth: "1350px",
        margin: "50px auto",
        height: "calc(100dvh - 100px)",
        position: "relative",
      }}
    >
      <Carousel
        indicators={false}
        stopAutoPlayOnHover={false}
        sx={{
          height: "calc(100dvh - 100px)",
          borderRadius: "20px",
          // hide on small screen
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        {posters.map((item, i) => (
          <img
            style={{
              height: "max(calc(100dvh-100px),850px)",
              width: "100%",
            }}
            key={i}
            src={item}
          />
        ))}
      </Carousel>

      <Box
        component={"div"}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          [theme.breakpoints.down("md")]: {
            right: "50%",
            transform: "translate(50%, -50%)",
            maxWidth: "550px",
            marginX: "auto",
            backgroundColor: "background.paper",
            border: 0,
            borderRadius: "12px",
          },
          zIndex: 1,
          transform: "translateY(-50%)",
          height: "100%",
          backgroundColor: "#ffffff25",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          padding: "30px 50px",
          gap: "30px",
          borderRadius: "0 20px 20px 0",
        }}
      >
        <img
          src="./src/assets/dpu-logo.png"
          alt="DPU"
          style={{
            width: "125px",
            height: "50px",
            objectFit: "contain",
            alignSelf: "center",
          }}
        />
        <Typography
          variant="body1"
          lineHeight={1.2}
          alignSelf={"center"}
          width={"100%"}
          fontSize={"20px"}
          textAlign={"center"}
        >
          Dr. D. Y. Patil Institute of Technology
        </Typography>

        <UserRadioButtons />

        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            // required
            autoComplete="off"
            label="Username"
            {...register("id")}
          />
          <TextField
            // required
            autoComplete="off"
            type="password"
            label="Password"
            {...register("password")}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "primary.main",
              ":hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
