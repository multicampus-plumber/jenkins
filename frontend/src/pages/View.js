import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import { Button, Grid, Card as MuiCard } from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import getSignInTheme from "../components/getSignInTheme";

const address =
  "http://a825e3f9329ee47d493b753be8a74e7f-1673472404.ap-northeast-2.elb.amazonaws.com";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Toggle design language"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  gap: theme.spacing(4),
  width: "100%",
  padding: theme.spacing(2),
  boxShadow:
    theme.palette.mode === "light"
      ? "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px"
      : "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
    width: "1000px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "auto",
  padingBottom: theme.spacing(12),
  backgroundImage:
    theme.palette.mode === "light"
      ? "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))"
      : "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.up("sm")]: {
    paddingBottom: 0,
    height: "100dvh",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DetailVeiw() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));

  const [searchParams, setSearchParams] = useSearchParams();
  const [viewData, setViewData] = useState([]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setSearchParams(searchParams);

    const boardData = {
      table: searchParams.get("t"),
      id: searchParams.get("i"),
    };
    console.log(boardData);
    axios.post(address + "/api/view", boardData).then((response) => {
      console.log(response.data);
      setViewData(response.data);
      //console.log(viewData);
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
        <CssBaseline />
        <Grid container spacing={3} padding="1rem 0">
          <Grid item xs={8.5} />
          <Grid item xs={3.5}>
            <Button variant="contained" href={"/" + searchParams.get("t")}>
              목록
            </Button>
          </Grid>
        </Grid>
        <SignInContainer direction="column" justifyContent="space-between">
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              position: { xs: "static", sm: "fixed" },
              width: "100%",
              p: { xs: 2, sm: 4 },
            }}
          >
            {/*
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/"
            >
              Back
            </Button>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          */}
          </Stack>
          <Stack
            justifyContent="center"
            sx={{ height: { xs: "100%", sm: "100dvh" }, p: 2 }}
          >
            <Card>
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                상세 페이지
              </Typography>
              {viewData.map((row) => (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography component="h5" variant="h5">
                    작성자
                  </Typography>
                  <TextField
                    sx={{ "& > :not(style)": { m: 1, width: "50ch" } }}
                    disabled
                    label={row.username}
                  ></TextField>
                  <Divider variant="middle" />
                  <Typography component="h5" variant="h5">
                    작성 날짜
                  </Typography>
                  <TextField
                    sx={{ "& > :not(style)": { m: 1, width: "50ch" } }}
                    disabled
                    label={row.createAt}
                  ></TextField>
                  <Divider variant="middle" />
                  <Typography component="h5" variant="h5">
                    내용
                  </Typography>
                  <TextField
                    sx={{ "& > :not(style)": { m: 1, height: "50ch" } }}
                    disabled
                    label={row.content}
                  ></TextField>
                </Box>
              ))}
            </Card>
          </Stack>
        </SignInContainer>
      </ThemeProvider>
    </>
  );
}

export default DetailVeiw;
