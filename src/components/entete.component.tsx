import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';

/**
 * Fonction de l'entête
 * 
 * Auteur: Alexandre del Fabbro
 * 
 * Inspiré du code vu durant le cours de Développement Web 3 - Cégep de Victoriaville - Automne 2024
 * Enseignant: Étienne Rivard
 * 
 * Inspiré du code de siriwatknp [https://github.com/siriwatknp]
 * Blog template - [https://github.com/mui/material-ui/tree/v6.1.8/docs/data/material/getting-started/templates/blog]
 * 
 * @returns L'application web
 */

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

function Entete() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}>
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            {/* TODO: Mettre icône du site ici */}
            <Box sx={{ display: { xxs: 'none', xs: 'flex', md: 'flex' } }}>
              <Button variant="text" color="primary" size="small" component={Link} to="/">
                Accueil
              </Button>
              <Button variant="text" color="primary" size="small" component={Link} to="/listeSujet">
                Liste
              </Button>
              <Button variant="text" color="primary" size="small" component={Link} to="/ajouter">
                Formulaire d'ajout
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="contained" size="small">
              Authentification
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem component={Link} to="/">Accueil</MenuItem>
                <MenuItem component={Link} to="/listeSujet">Liste</MenuItem>
                <MenuItem component={Link} to="/ajouter">Formulaire</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Authentification
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
};

export default Entete;