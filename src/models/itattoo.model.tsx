type IClient = {
    prenom: string,
    nom: string,
    age: number,
    telephone: string,
    courriel: string
}

export interface ITattoo {
    _id: string;
    estTermine: boolean;
    client: IClient;
    premierRendezVous: string;
    sujet: [string];
}