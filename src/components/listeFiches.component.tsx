import { useEffect, useState } from "react";
import { ITattoo } from "../models/itattoo.model";
import Fiche from "./fiche.component";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Snackbar, Alert, Divider, List, ListItem, Typography, Box, Button, TextField } from "@mui/material";

export default function ListeFiches() {

    const { type, valeur } = useParams<{ type: string, valeur: string }>();
    // const { sujet } = useParams<{ sujet: string }>();
    const [listeFiches, setListeFiches] = useState<ITattoo[]>([]);
    const [nouvelleValeur, setNouvelleValeur] = useState<string | null>(null);
    const [messageSnackbar, setMessageSnackbar] = useState<string | null>(null);
    const [typeSnackbar, setTypeSnackbar] = useState<"success" | "error" | undefined>(undefined);

    const navigate = useNavigate();

    const afficherSnackbar = (message: string, severity: "success" | "error") => {
        setMessageSnackbar(message);
        setTypeSnackbar(severity);
    };

    const fermerSnackbar = () => {
        setMessageSnackbar(null);
        setTypeSnackbar(undefined);
    };

    const rafraichirListe = () => {
        if (type && valeur) {
            axios.get<{ tattoos: ITattoo[] }>(`http://localhost:3000/api/tattoos/${type}/${valeur}`)
                .then((response) => {
                    const tattoos = response.data.tattoos;
                    if(tattoos.length === 0) {
                        afficherSnackbar(`Aucun tattoo trouvé pour ${type}: ${valeur}`, "error");
                    }
                    setListeFiches(tattoos);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des données: ", error);
                    afficherSnackbar("Erreur lors de la récupération des données", "error");
                });
        }
    };

    const rechercherValeur = () => {
        if (nouvelleValeur?.trim()) {
            navigate(`/${type}/${nouvelleValeur.trim()}`);
        } else {
            afficherSnackbar(`Veuillez entrer une valeur valide pour ${type}"`, "error");
        }
    };

        useEffect(() => {
            rafraichirListe();
        }, [type, valeur]);

        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
                <Typography variant="h4" gutterBottom>
                    Tattoos du {type}: {valeur}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: "2rem",
                        width: "100%",
                        maxWidth: "600px",
                    }}
                >
                    <TextField
                        label="Rechercher un sujet"
                        variant="outlined"
                        fullWidth
                        value={nouvelleValeur}
                        onChange={(e) => setNouvelleValeur(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && rechercherValeur()}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={rechercherValeur}
                    >
                        Rechercher
                    </Button>
                </Box>
                <List>
                    {listeFiches.map((tattoo) => (
                        <div key={tattoo._id}>
                            <ListItem>
                                <Fiche
                                    tattoo={tattoo}
                                    rafraichirListe={rafraichirListe}
                                    afficherSnackbar={afficherSnackbar} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>

                <Snackbar
                    open={!!messageSnackbar}
                    autoHideDuration={4000}
                    onClose={fermerSnackbar}
                >
                    <Alert
                        onClose={fermerSnackbar}
                        severity={typeSnackbar}
                        sx={{ width: "100%" }}
                    >
                        {messageSnackbar}
                    </Alert>
                </Snackbar>
            </Box>
        );
    }