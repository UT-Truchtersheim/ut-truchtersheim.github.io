/*
 * ============================================================
 *  RÉFÉRENTIEL DES SERVICES – UT TRUCHTERSHEIM
 *  Copie locale (phase 3). En phase 4, l'application lira en
 *  priorité le tableau Google Sheets ; ce fichier deviendra
 *  la copie de secours.
 * ============================================================
 *
 *  RÈGLES DE MODIFICATION
 *  - Ne modifiez que le texte ENTRE les guillemets "…".
 *  - Gardez les virgules en fin de ligne et les accolades { }.
 *  - Une valeur vide "" signifie « à renseigner » : l'application
 *    affiche alors un message clair au lieu d'un lien cassé.
 *
 *  CHAMPS D'UN SERVICE
 *  id           Identifiant unique (3 lettres), aussi préfixe des numéros
 *  ordre        Position de la tuile sur l'accueil (1 = en haut à gauche)
 *  actif        "OUI" pour afficher le service, "NON" pour le masquer
 *  nom          Nom affiché
 *  description  Phrase courte affichée sur la page du service
 *  icone        Nom d'une icône du fichier js/icones.js
 *  responsable  Nom ou fonction du responsable
 *  email        Adresse du bouton « Contacter le service »
 *  objet_mail   Objet pré-rempli du mail
 *  intro_mail   Début du message pré-rempli (\n = retour à la ligne)
 *  lien_form    Lien du Google Forms du service (https://…)
 *  champ_type   Code du champ « Type de demande » du formulaire
 *               (ex. "entry.123456789"), pour le pré-remplir
 *  consignes    Encadré d'information (vide = pas d'encadré)
 *
 *  CHAMPS D'UN TYPE DE DEMANDE
 *  service_id   L'id du service concerné
 *  ordre        Position dans la liste
 *  libelle      Texte affiché (et transmis au formulaire)
 */

window.UT_REFERENTIEL = {

  services: [
    {
      id: "VEH",
      ordre: 1,
      actif: "OUI",
      nom: "Matériel roulant",
      description: "Pannes, anomalies et équipements des véhicules de l'unité.",
      icone: "camion",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Matériel roulant",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: ""
    },
    {
      id: "MAT",
      ordre: 2,
      actif: "OUI",
      nom: "Matériel non roulant",
      description: "Matériel défectueux, manquant ou à remplacer.",
      icone: "outils",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Matériel non roulant",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: ""
    },
    {
      id: "INF",
      ordre: 3,
      actif: "OUI",
      nom: "Infrastructures",
      description: "Bâtiments, électricité, plomberie, chauffage et locaux.",
      icone: "batiment",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Infrastructures",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: ""
    },
    {
      id: "HAB",
      ordre: 4,
      actif: "OUI",
      nom: "Habillement",
      description: "Échanges, remplacements, tailles et commandes de tenues.",
      icone: "tshirt",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Habillement",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: ""
    },
    {
      id: "SEL",
      ordre: 5,
      actif: "OUI",
      nom: "Sélectif",
      description: "Échange, anomalie ou remplacement de votre sélectif.",
      icone: "radio",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Sélectif",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: ""
    },
    {
      id: "FOR",
      ordre: 6,
      actif: "OUI",
      nom: "Formation",
      description: "Pré-acquis, formations, manœuvres et matériel pédagogique.",
      icone: "formation",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Formation",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: ""
    },
    {
      id: "JSP",
      ordre: 7,
      actif: "OUI",
      nom: "JSP",
      description: "Questions et demandes concernant la section des jeunes sapeurs-pompiers.",
      icone: "groupe",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] JSP",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: "Ne transmettez aucune information de santé ni information personnelle sur un jeune. Pour une situation individuelle, contactez directement le responsable de section."
    },
    {
      id: "PHA",
      ordre: 8,
      actif: "OUI",
      nom: "Pharmacie",
      description: "Commandes, ruptures de stock et produits manquants.",
      icone: "pharmacie",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Pharmacie",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: "Ne mentionnez aucune information sur une victime, un patient ou l'état de santé d'une personne."
    },
    {
      id: "DIR",
      ordre: 9,
      actif: "OUI",
      nom: "Contact direction",
      description: "Informations, suggestions et difficultés à signaler à la direction.",
      icone: "message",
      responsable: "",
      email: "",
      objet_mail: "[UT Truchtersheim] Contact direction",
      intro_mail: "Bonjour,\n\n",
      lien_form: "",
      champ_type: "",
      consignes: "Pour une difficulté personnelle, privilégiez un e-mail ou un entretien direct avec la direction."
    }
  ],

  types: [
    { service_id: "VEH", ordre: 1, libelle: "Panne véhicule" },
    { service_id: "VEH", ordre: 2, libelle: "Anomalie ou dysfonctionnement" },
    { service_id: "VEH", ordre: 3, libelle: "Problème d'équipement" },
    { service_id: "VEH", ordre: 4, libelle: "Demande d'intervention" },
    { service_id: "VEH", ordre: 5, libelle: "Autre demande" },

    { service_id: "MAT", ordre: 1, libelle: "Matériel défectueux" },
    { service_id: "MAT", ordre: 2, libelle: "Matériel manquant" },
    { service_id: "MAT", ordre: 3, libelle: "Anomalie constatée" },
    { service_id: "MAT", ordre: 4, libelle: "Demande de remplacement" },
    { service_id: "MAT", ordre: 5, libelle: "Demande de matériel" },
    { service_id: "MAT", ordre: 6, libelle: "Autre demande" },

    { service_id: "INF", ordre: 1, libelle: "Anomalie bâtimentaire" },
    { service_id: "INF", ordre: 2, libelle: "Problème électrique" },
    { service_id: "INF", ordre: 3, libelle: "Plomberie" },
    { service_id: "INF", ordre: 4, libelle: "Chauffage" },
    { service_id: "INF", ordre: 5, libelle: "Dégradation des locaux" },
    { service_id: "INF", ordre: 6, libelle: "Demande d'intervention" },
    { service_id: "INF", ordre: 7, libelle: "Autre signalement" },

    { service_id: "HAB", ordre: 1, libelle: "Demande d'échange" },
    { service_id: "HAB", ordre: 2, libelle: "Demande de remplacement" },
    { service_id: "HAB", ordre: 3, libelle: "Problème de taille" },
    { service_id: "HAB", ordre: 4, libelle: "Demande de commande" },
    { service_id: "HAB", ordre: 5, libelle: "Équipement manquant ou défectueux" },
    { service_id: "HAB", ordre: 6, libelle: "Autre demande" },

    { service_id: "SEL", ordre: 1, libelle: "Demande d'échange" },
    { service_id: "SEL", ordre: 2, libelle: "Signalement d'une anomalie" },
    { service_id: "SEL", ordre: 3, libelle: "Matériel défectueux" },
    { service_id: "SEL", ordre: 4, libelle: "Demande de remplacement" },
    { service_id: "SEL", ordre: 5, libelle: "Autre demande" },

    { service_id: "FOR", ordre: 1, libelle: "Déclaration de pré-acquis" },
    { service_id: "FOR", ordre: 2, libelle: "Demande concernant une formation" },
    { service_id: "FOR", ordre: 3, libelle: "Proposition ou demande de manœuvre" },
    { service_id: "FOR", ordre: 4, libelle: "Demande de matériel pédagogique" },
    { service_id: "FOR", ordre: 5, libelle: "Anomalie sur du matériel de formation" },
    { service_id: "FOR", ordre: 6, libelle: "Autre demande" },

    { service_id: "JSP", ordre: 1, libelle: "Demande de renseignement" },
    { service_id: "JSP", ordre: 2, libelle: "Demande d'autorisation" },
    { service_id: "JSP", ordre: 3, libelle: "Demande concernant une activité" },
    { service_id: "JSP", ordre: 4, libelle: "Question sur le fonctionnement de la section" },
    { service_id: "JSP", ordre: 5, libelle: "Autre demande" },

    { service_id: "PHA", ordre: 1, libelle: "Demande de commande" },
    { service_id: "PHA", ordre: 2, libelle: "Signalement d'une rupture de stock" },
    { service_id: "PHA", ordre: 3, libelle: "Matériel ou produit manquant" },
    { service_id: "PHA", ordre: 4, libelle: "Signalement d'un problème" },
    { service_id: "PHA", ordre: 5, libelle: "Autre demande" },

    { service_id: "DIR", ordre: 1, libelle: "Demande de renseignement" },
    { service_id: "DIR", ordre: 2, libelle: "Transmission d'une information" },
    { service_id: "DIR", ordre: 3, libelle: "Suggestion" },
    { service_id: "DIR", ordre: 4, libelle: "Difficulté particulière" },
    { service_id: "DIR", ordre: 5, libelle: "Autre demande" }
  ]
};
