import axios from "axios";
import { ITattoo } from "../models/itattoo.model";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function ListeSujets() {

    const [listeTattoos, setListeTattoos] = useState<ITattoo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<{ tattoos: ITattoo[] }>('https://dw3-projetfinal-a24-api.onrender.com/api/tattoos')
            .then((response) => {
                setListeTattoos(response.data.tattoos);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données: ", error);
            });
    }, []);

    // Code emprunté à GitHub Copilot - [Modèle massif de langage] - 29 novembre 2024
    const compterSujet = listeTattoos.flatMap(tattoo => tattoo.sujet).reduce((accumulation, sujet) => {
        accumulation[sujet] = (accumulation[sujet] || 0) + 1;
        return accumulation;
    }, {} as Record<string, number>);
    // Fin code emprunté

    const handleSujetClic = (sujet: string) => {
        console.log(`Sujet cliqué: ${sujet}`);
        navigate(`/sujet/${sujet}`);
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "background.default",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box sx={{ width: '100%', padding: 2 }}>
                {/* Utilisation de Grid pour créer une grille fluide */}
                <Grid container spacing={2} justifyContent="center">
                    {Object.entries(compterSujet).map(([sujet, nombre], index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        bgcolor: "primary.main",
                                        color: "white",
                                        boxShadow: 6,
                                    },
                                    padding: 2, // Espacement interne
                                }}
                            >
                                <ListItemButton onClick={() => handleSujetClic(sujet)}>
                                    <ListItemText
                                        primary={`${sujet} (${nombre})`}
                                        sx={{ fontWeight: "bold", color: "text.primary" }}
                                    />
                                </ListItemButton>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}