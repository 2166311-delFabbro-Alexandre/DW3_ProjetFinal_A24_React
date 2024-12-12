import { Box } from '@mui/material';
import Entete from './entete.component';
import {
  Outlet,
} from 'react-router-dom';

export default function Modele() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full viewport height
        bgcolor: "background.default",
      }}
    >
      <Entete />
      <Box
        sx={{
          flex: 1,
          paddingTop: '64px',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddinX: 2
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}