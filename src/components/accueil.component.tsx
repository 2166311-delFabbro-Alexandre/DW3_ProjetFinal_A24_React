import { Box, Typography } from "@mui/material";

export default function Accueil() {
    return (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            background: 'url(https://lambent-marshmallow-7e8243.netlify.app/MPP.png) no-repeat center center',
            backgroundSize: 'cover',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Superposition sombre
            }}
          />
        </Box>
    );
}