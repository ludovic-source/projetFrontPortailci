import { Thematique } from '../models/Thematique';

export class Lien {

    id: number;
    url: string;
    nom: string;
    description: string;
    statut;          // valeurs possibles : "publié restreint" / "publié" / "dépublié"
    mode_affichage; // true = nouvel onglet ; false = nouvelle fenêtre
    date_publication_restreinte;
    date_publication;
    date_depublication;

    thematique: Thematique;

    constructor() { }


}
