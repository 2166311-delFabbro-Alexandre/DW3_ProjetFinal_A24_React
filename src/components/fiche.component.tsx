import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ITattoo } from "../models/itattoo.model";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Définir le type pour les props
interface TattooProps {
  tattoo: ITattoo;
  rafraichirListe: () => void;
  afficherSnackbar: (message: string, severity: "success" | "error") => void;
};

const FicheTattoo: React.FC<TattooProps> = ({ tattoo, rafraichirListe, afficherSnackbar }) => {
  const {
    _id,
    estTermine,
    client: { prenom, nom, age, telephone, courriel },
    premierRendezVous,
    sujet,
  } = tattoo;

  const navigate = useNavigate();

  const [ouvrirDialogConfirmation, setOuvrirDialogConfirmation] = React.useState(false);

  const handleOuvrirDialogConfirmation = () => setOuvrirDialogConfirmation(true);
  const handleFermerDialogConfirmation = () => setOuvrirDialogConfirmation(false);


  // Fonction pour effacer un tattoo
  const handleEffacer = () => {
    axios
      .delete(`https://dw3-projetfinal-a24-api.onrender.com/api/tattoos/delete/${_id}`)
      .then((response) => {
        afficherSnackbar("Le tattoo a été effacé avec succès", "success");
        console.log("Le tattoo a été effacé avec succès: ", response.data);
        rafraichirListe();
      })
      .catch((error) => {
        afficherSnackbar("Erreur lors de l'effacement du tattoo", "error");
        console.error("Erreur lors de l'effacement du tattoo: ", error);
      })
      .finally(() => {
        handleFermerDialogConfirmation();
      });
  };

  const handleRechercherParCourriel = () => {
    navigate(`/courriel/${courriel}`);
  }

  // Fonction pour modifier un tattoo
  const handleModifier = () => {
    navigate(`/modifier/${tattoo._id}`)
  };

  return (
    <>
    <Card sx={{ maxWidth: 400, margin: "1rem auto" }}>
      <CardHeader
        title={`${prenom} ${nom}`}
        subheader={`Âge : ${age}`}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          <strong>Téléphone :</strong> {telephone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Courriel :</strong> {courriel}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Premier rendez-vous :</strong>{" "}
          {new Date(premierRendezVous).toLocaleString()}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}>
          {sujet.map((s, index) => (
            <Chip key={index} label={s} color="primary" />
          ))}
        </Box>
        <Typography
          variant="body2"
          sx={{ marginTop: "1rem", fontWeight: "bold", color: estTermine ? "green" : "orange" }}
        >
          Statut : {estTermine ? "Terminé" : "En cours"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleOuvrirDialogConfirmation}
          >
            Supprimer
          </Button>
          <Button variant="contained" color="secondary" onClick={handleRechercherParCourriel}>
            Rechercher par courriel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleModifier()}
          >
            Modifier
          </Button>
        </Box>
      </CardContent>
    </Card>
    <Dialog
    open={ouvrirDialogConfirmation}
    onClose={handleFermerDialogConfirmation}
    aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">Confirmer la suppression</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Êtes-vous sûr de vouloir effacer ce tattoo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFermerDialogConfirmation}>Annuler</Button>
        <Button onClick={handleEffacer} autoFocus>
          Effacer
        </Button>
      </DialogActions>
    </Dialog>
  </>
  );
};

export default FicheTattoo;