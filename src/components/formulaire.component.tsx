import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { ITattoo } from "../models/itattoo.model";

export default function FormulaireTattoo() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [donneesTattoo, setDonneesTattoo] = useState<Partial<ITattoo>>({
        client: {
            prenom: "",
            nom: "",
            age: 0,
            telephone: "",
            courriel: "",
        },
        estTermine: false,
        premierRendezVous: new Date().toISOString().slice(0, 10),
        sujet: [""],
        _id: "",
    });

    const [messageSnackbar, setMessageSnackbar] = useState<string | null>(null);
    const [typeSnackbar, setTypeSnackbar] = useState<"success" | "error" | undefined>(undefined);
    const [chargement, setChargement] = useState<boolean>(true);
    const [erreurs, setErreurs] = useState<Partial<Record<string, string>>>({});

    const afficherSnackbar = (message: string, severity: "success" | "error") => {
        setMessageSnackbar(message);
        setTypeSnackbar(severity);
    };

    const fermerSnackbar = () => {
        setMessageSnackbar(null);
        setTypeSnackbar(undefined);
    };

    useEffect(() => {
        setChargement(true);
        if (!id) {
            setDonneesTattoo({
                client: {
                    prenom: "",
                    nom: "",
                    age: 0,
                    telephone: "",
                    courriel: "",
                },
                estTermine: false,
                premierRendezVous: new Date().toISOString().slice(0, 10),
                sujet: [""],
            });
            setChargement(false);
        } else {
            // Mode édition : récupérer les données existantes
            axios.get(`http://localhost:3000/api/tattoos/${id}`)
                .then((response) => {
                    const tattoo = response.data.tattoo;
                    console.log("Tattoo chargé: ", tattoo);
                    console.log("Données client: ", tattoo.client);
                    setDonneesTattoo({
                        client: {
                            prenom: tattoo.client?.prenom || "",
                            nom: tattoo.client?.nom || "",
                            age: tattoo.client?.age || 0,
                            telephone: tattoo.client?.telephone || "",
                            courriel: tattoo.client?.courriel || "",
                        },
                        estTermine: tattoo.estTermine ?? false,
                        premierRendezVous: tattoo.premierRendezVous?.slice(0, 10) || new Date().toISOString().slice(0, 10),
                        sujet: tattoo.sujet || [""],
                        _id: tattoo._id,
                    });
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des données: ", error);
                    afficherSnackbar("Erreur de chargement des données", "error");
                })
                .finally(() => {
                    setChargement(false);
                });
        }
    }, [id]);

    useEffect(() => {
        console.log("Mise à jour des données du formulaire: ", donneesTattoo);
    }, [donneesTattoo]);

    const handleChange = (field: keyof ITattoo, value: any) => {
        setDonneesTattoo((anterieur) => ({
            ...anterieur,
            [field]: value,
        }));

        setErreurs((erreursAnterieures) => {
            const nouvellesErreurs = { ...erreursAnterieures };
            delete nouvellesErreurs[field];
            return nouvellesErreurs;
        });
    };

    const handleClientChange = (field: keyof ITattoo["client"], value: any) => {
        setDonneesTattoo((anterieur) => ({
            ...anterieur,
            client: {
                ...anterieur.client ?? { prenom: "", nom: "", age: 0, telephone: "", courriel: "" },
                [field]: value || "",
            },
        }));
        setErreurs((erreursAnterieures) => {
            const nouvellesErreurs = { ...erreursAnterieures };
            delete nouvellesErreurs[`client.${field}`];
            return nouvellesErreurs;
        });
    };


    const handleSubmit = () => {
        const url = "http://localhost:3000/api/tattoos";
        const method = donneesTattoo._id ? "put" : "post";

        const payload = {
            tattoo: {
                ...donneesTattoo,
                sujet: donneesTattoo.sujet?.map((s) => s.trim()),
            }

        }

        console.log("Méthode: ", method);
        console.log("Payload: ", payload);

        axios[method](url, payload)
            .then(() => {
                afficherSnackbar(`Tattoo ${donneesTattoo._id ? "modifié" : "ajouté"} avec succès`, "success");
            })
            .catch((error) => {
                console.error(`Erreur lors de la ${donneesTattoo._id ? "modification" : "création"}: `, error);
                afficherSnackbar(`Erreur lors de la ${donneesTattoo._id ? "modification" : "création"}`, "error");
                afficherSnackbar(error.response.data.error, "error");

                if (error.response?.data?.errors) {
                    const erreursBackend: Record<string, string> = {};
                    const erreursChamp = error.response.data.errors;

                    for (const cle in erreurs) {
                        if (erreursChamp[cle]?.message) {
                            erreursBackend[cle] = erreursChamp[cle].message;
                        }
                    }
                    setErreurs(erreursBackend);
                }
            });
    };

    if (chargement) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography variant="h6">Chargement des données...</Typography>
            </Box>
        );
    } else {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "600px", margin: "auto", marginTop: "5rem" }}>
                <Typography variant="h4">{id ? "Modifier le Tattoo" : "Ajouter un Tattoo"}</Typography>
                <TextField
                    label="Prénom du client"
                    value={donneesTattoo.client?.prenom || ""}
                    onChange={(e) => handleClientChange("prenom", e.target.value)}
                    fullWidth
                    error={!!erreurs?.["client.prenom"]}
                    helperText={erreurs?.["client.prenom"]}
                />
                <TextField
                    label="Nom du client"
                    value={donneesTattoo.client?.nom || ""}
                    onChange={(e) => handleClientChange("nom", e.target.value)}
                    fullWidth
                    error={!!erreurs["client.nom"]}
                    helperText={erreurs["client.nom"]}
                />
                <TextField
                    label="Âge du client"
                    type="number"
                    value={donneesTattoo.client?.age || ""}
                    onChange={(e) => handleClientChange("age", +e.target.value)}
                    fullWidth
                    error={!!erreurs["client.age"]}
                    helperText={erreurs["client.age"]}
                />
                <TextField
                    label="Téléphone"
                    value={donneesTattoo.client?.telephone || ""}
                    onChange={(e) => handleClientChange("telephone", e.target.value)}
                    fullWidth
                    error={!!erreurs["client.telephone"]}
                    helperText={erreurs["client.telephone"]}
                />
                <TextField
                    label="Email"
                    value={donneesTattoo.client?.courriel || ""}
                    onChange={(e) => handleClientChange("courriel", e.target.value)}
                    fullWidth
                    error={!!erreurs["client.courriel"]}
                    helperText={erreurs["client.courriel"]}
                />
                <TextField
                    label="Sujet"
                    value={donneesTattoo.sujet?.join(", ") || ""}
                    onChange={(e) => handleChange("sujet", e.target.value.split(", ").map((s) => s.trim()))}
                    fullWidth
                    error={!!erreurs["sujet"]}
                    helperText={erreurs["sujet"]}
                />
                <TextField
                    label="Date du premier rendez-vous"
                    type="date"
                    value={donneesTattoo.premierRendezVous || ""}
                    onChange={(e) => handleChange("premierRendezVous", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={!!erreurs["premierRendezVous"]}
                    helperText={erreurs["premierRendezVous"]}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    {id ? "Modifier" : "Ajouter"}
                </Button>

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
}
