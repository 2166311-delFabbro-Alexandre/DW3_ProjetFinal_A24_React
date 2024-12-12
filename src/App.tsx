import './App.css'
import Modele from './components/modele.component';
import Accueil from './components/accueil.component';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Theme from './Theme';
import { RouteProtegee } from './components/routeProtegee.component';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import ListeFiches from './components/listeFiches.component';
import ListeSujet from './components/listeSujet.component';
import Login from './routes/login.route';
import FormulaireTattoo from './components/formulaire.component';

/**
 * Fonction de l'application web
 * 
 * Auteur: Alexandre del Fabbro
 * Inspiré du code vu durant le cours de Développement Web 3 - Cégep de Victoriaville - Automne 2024
 * Enseignant: Étienne Rivard
 * 
 * @returns L'application web
 */
export default function App() {

  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Modele />}>
              <Route index element={<Accueil />} />
              <Route path="listeSujet" element={<ListeSujet />} />
              {/* <Route
                path="sujet/:sujet"
                element={
                  <RouteProtegee>
                    <ListeFiches />
                  </RouteProtegee>
                } />
              <Route
                path="courriel/:courriel"
                element={
                  <RouteProtegee>
                    <ListeFiches />
                  </RouteProtegee>
                } /> */}
              <Route
                path=":type/:valeur"
                element={
                  <RouteProtegee>
                    <ListeFiches />
                  </RouteProtegee>
                } />
              <Route
                path="ajouter"
                element={
                  <RouteProtegee>
                    <FormulaireTattoo />
                  </RouteProtegee>
                }
              />
              <Route
                path="modifier/:id"
                element={
                  <RouteProtegee>
                    <FormulaireTattoo />
                  </RouteProtegee>
                }
              />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

