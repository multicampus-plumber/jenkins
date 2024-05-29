import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { Card as MuiCard } from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

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

function TextUpload() {
  const [textError, setTextError] = React.useState(false);
  const [textErrorMessage, setTextErrorMessage] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = React.useState("");

  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));

  const [searchParams, setSearchParams] = useSearchParams();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setSearchParams(searchParams);

    fetch(
      "http://a825e3f9329ee47d493b753be8a74e7f-1673472404.ap-northeast-2.elb.amazonaws.com/api/authcheck"
    )
      .then((res) => res.json())
      .then((json) => {
        setUserEmail(json.userEmail);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const uploadText = document.getElementById("uploadText");
    const uploadTitle = document.getElementById("uploadTitle");
    const boardData = {
      table: searchParams.get("t"),
      title: uploadTitle.value,
      content: uploadText.value,
      email: userEmail,
    };

    fetch(address + "/api/upload", {
      //auth 주소에서 받을 예정
      method: "post", // method :통신방법
      headers: {
        // headers: API 응답에 대한 정보를 담음
        "content-type": "application/json",
      },
      body: JSON.stringify(boardData), //userData라는 객체를 보냄
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  const validateInputs = () => {
    const uploadText = document.getElementById("uploadText");
    const uploadTitle = document.getElementById("uploadTitle");
    let isValid = true;

    if (!uploadText.value || uploadText.value.length < 20) {
      setTextError(true);
      setTextErrorMessage("내용을 20자리 이상 입력해주십시오.");
      isValid = false;
    } else {
      setTextError(false);
      setTextErrorMessage("");
    }

    if (!uploadTitle.value || uploadTitle.value.length < 5) {
      setTitleError(true);
      setTitleErrorMessage("제목을 5자리 이상 입력해주십시오.");
      isValid = false;
    } else {
      setTitleError(false);
      setTitleErrorMessage("");
    }

    return isValid;
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
        <CssBaseline />

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
                자소서 / 면접 후기 작성
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Divider variant="middle" />
                <FormLabel htmlFor="uploadTitle">제목</FormLabel>
                <FormControl>
                  <TextField
                    sx={{ m: 1 }}
                    error={titleError}
                    helperText={titleErrorMessage}
                    color={titleError ? "error" : "primary"}
                    rows={1}
                    name="uploadTitle"
                    id="uploadTitle"
                    placeholder="제목을 입력해주세요."
                    fullWidth
                    required
                    autoFocus
                  ></TextField>
                </FormControl>
                <Divider variant="middle" />
                <FormLabel htmlFor="uploadText">내용</FormLabel>
                <FormControl>
                  <TextField
                    sx={{ m: 1, height: "50ch" }}
                    multiline
                    rows={17}
                    error={textError}
                    helperText={textErrorMessage}
                    color={textError ? "error" : "primary"}
                    name="uploadText"
                    id="uploadText"
                    placeholder="내용을 입력해주세요."
                    fullWidth
                    required
                  ></TextField>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  저장 하기
                </Button>
              </Box>
            </Card>
          </Stack>
        </SignInContainer>
      </ThemeProvider>
    </>
  );
}

export default TextUpload;
