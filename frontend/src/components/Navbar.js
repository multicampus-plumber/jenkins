import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Link from '@mui/material/Link';
export default function ButtonAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" underline="none" color="inherit">Home</Link>
          </Typography>
          <Button color="inherit" href='/jaso'>자기소개서</Button>
          <Button color="inherit" href='/interview'>면접 후기</Button>
          { props.mode === "LOGIN" ? 
            <Button color="inherit" href='/sign-in'>Login</Button> : 
           <Button color="inherit" href='/logout'>Logout</Button> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
