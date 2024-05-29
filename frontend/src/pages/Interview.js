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
import Link from "@mui/material/Link";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import getSignInTheme from "../components/getSignInTheme";
import ToggleColorMode from "../components/ToggleColorMode";

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
    width: "450px",
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

export default function Interview() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));

  const [tableList, setTableList] = useState([]);
  const [isLogin, setisLogin] = useState("");

  useEffect(() => {
    fetch(
      "http://a825e3f9329ee47d493b753be8a74e7f-1673472404.ap-northeast-2.elb.amazonaws.com/api/authcheck"
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === "True") {
          setisLogin("True");
        } else {
          setisLogin("False");
        }
        console.log(json);
      });

    axios.get(address + "/api/interview").then((response) => {
      console.log(response.data);
      setTableList(response.data);
    });
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
      <CssBaseline />

      <Grid container spacing={3} padding="1rem 0">
        {isLogin === "True" ? (
          <Grid item xs={1}>
            <Button variant="contained" href="/">
              글쓰기
            </Button>
          </Grid>
        ) : (
          <Grid item xs={1}>
            <Button variant="contained">글쓰기</Button>
          </Grid>
        )}
      </Grid>
      <Stack>
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>글번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">등록일</TableCell>
                  <TableCell align="right">작성자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">
                      <Link href={"/view?t=interview&i=" + row.id}>
                        {row.title}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.createAt}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
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
      </SignInContainer>
    </ThemeProvider>
  );
}
