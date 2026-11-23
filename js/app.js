/*
 * ============================================================
 *  APPLICATION UT TRUCHTERSHEIM – logique de l'interface
 *  Version 0.3 (phase 3 : écrans et navigation)
 * ============================================================
 *  Ce fichier n'a normalement pas besoin d'être modifié :
 *  les contenus (services, adresses, liens, types de demande)
 *  se changent dans data/services.js, puis dans le référentiel
 *  Google Sheets à partir de la phase 4.
 */

(function () {
  "use strict";

  var VERSION = "0.3";
  var ICONES = window.UT_ICONES || {};
  var app = document.getElementById("app");

  /* ---------- 1. Lecture et contrôle du référentiel ---------- */

  function texte(valeur) {
    return valeur === undefined || valeur === null ? "" : String(valeur).trim();
  }

  function lienValide(url) {
    return /^https:\/\/\S+$/i.test(texte(url));
  }

  function emailValide(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texte(email));
  }

  function chargerReferentiel(source) {
    source = source || {};
    var services = (source.services || [])
      .filter(function (s) { return texte(s.id) && texte(s.actif).toUpperCase() !== "NON"; })
      .map(function (s) {
        return {
          id: texte(s.id).toUpperCase(),
          ordre: Number(s.ordre) || 999,
          nom: texte(s.nom) || texte(s.id),
          description: texte(s.description),
          icone: texte(s.icone),
          responsable: texte(s.responsable),
          email: texte(s.email),
          objet_mail: texte(s.objet_mail),
          intro_mail: texte(s.intro_mail).replace(/\\n/g, "\n"),
          lien_form: texte(s.lien_form),
          champ_type: texte(s.champ_type),
          consignes: texte(s.consignes),
          types: []
        };
      })
      .sort(function (a, b) { return a.ordre - b.ordre; });

    var parId = {};
    services.forEach(function (s) { parId[s.id] = s; });

    (source.types || []).forEach(function (t) {
      var service = parId[texte(t.service_id).toUpperCase()];
      if (service && texte(t.libelle)) {
        service.types.push({ ordre: Number(t.ordre) || 999, libelle: texte(t.libelle) });
      }
    });
    services.forEach(function (s) {
      s.types.sort(function (a, b) { return a.ordre - b.ordre; });
    });

    return { services: services, parId: parId };
  }

  var REF = chargerReferentiel(window.UT_REFERENTIEL);

  /* ---------- 2. Petits outils de construction ---------- */

  // Crée un élément ; le texte passe toujours par textContent (jamais interprété comme du code).
  function el(balise, attributs, enfants) {
    var noeud = document.createElement(balise);
    Object.keys(attributs || {}).forEach(function (cle) {
      if (cle === "texte") { noeud.textContent = attributs[cle]; }
      else if (cle === "classe") { noeud.className = attributs[cle]; }
      else if (cle.indexOf("on") === 0) { noeud.addEventListener(cle.slice(2), attributs[cle]); }
      else { noeud.setAttribute(cle, attributs[cle]); }
    });
    (enfants || []).forEach(function (enfant) {
      if (enfant) { noeud.appendChild(typeof enfant === "string" ? document.createTextNode(enfant) : enfant); }
    });
    return noeud;
  }

  function icone(nom) {
    var span = document.createElement("span");
    span.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      (ICONES[nom] || ICONES.dossier || "") + "</svg>";
    return span.firstChild;
  }

  var minuterieToast;
  function afficherMessage(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(minuterieToast);
    minuterieToast = setTimeout(function () { toast.classList.remove("visible"); }, 4000);
  }

  /* ---------- 3. Liens vers les formulaires et la messagerie ---------- */

  function lienFormulaire(service, libelle) {
    if (!lienValide(service.lien_form)) { return ""; }
    var url = service.lien_form;
    if (service.champ_type) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + "usp=pp_url&" +
        encodeURIComponent(service.champ_type) + "=" + encodeURIComponent(libelle);
    }
    return url;
  }

  function lienMail(service) {
    if (!emailValide(service.email)) { return ""; }
    var objet = service.objet_mail || ("[UT Truchtersheim] " + service.nom);
    return "mailto:" + service.email +
      "?subject=" + encodeURIComponent(objet) +
      "&body=" + encodeURIComponent((service.intro_mail || "Bonjour,") + "\n\n");
  }

  /* ---------- 4. Écran d'accueil ---------- */

  var vientDeLAccueil = false;

  function ecranAccueil() {
    document.title = "UT Truchtersheim – Services";

    var entete = el("header", { classe: "entete" }, [
      el("div", { classe: "entete-accueil" }, [
        el("div", { classe: "logo", "aria-hidden": "true", texte: "UT" }),
        el("div", {}, [
          el("h1", { texte: "UT Truchtersheim" }),
          el("p", { classe: "sous-titre", texte: "Services de l'UT" })
        ])
      ])
    ]);

    var intro = el("section", { classe: "accueil-intro" }, [
      el("h2", { texte: "Bonjour" }),
      el("p", { texte: "Choisissez un service pour faire une demande ou contacter son responsable." })
    ]);

    var grille = el("nav", { classe: "grille", "aria-label": "Services" },
      REF.services.map(function (s) {
        return el("a", {
          classe: "tuile",
          href: "#/service/" + encodeURIComponent(s.id),
          onclick: function () { vientDeLAccueil = true; }
        }, [
          el("span", { classe: "pastille" }, [icone(s.icone)]),
          el("span", { classe: "tuile-nom", texte: s.nom })
        ]);
      })
    );

    var pied = el("footer", { classe: "pied" }, [
      estInstallee() ? null : el("button", {
        type: "button", classe: "bouton-installer", onclick: ouvrirAideInstallation
      }, [icone("installer"), "Installer l'application sur mon téléphone"]),
      el("p", { classe: "version", texte: "UT Truchtersheim · version " + VERSION })
    ]);

    return [entete, el("main", {}, [intro, grille]), pied];
  }

  /* ---------- 5. Page d'un service ---------- */

  function retourAccueil() {
    if (vientDeLAccueil) { history.back(); }
    else { location.hash = "#/"; }
  }

  function ecranService(s) {
    document.title = s.nom + " – UT Truchtersheim";

    var entete = el("header", { classe: "entete entete-service" }, [
      el("button", { type: "button", classe: "lien-retour", onclick: retourAccueil }, [icone("retour"), "Accueil"]),
      el("div", { classe: "titre-service" }, [
        el("span", { classe: "pastille", "aria-hidden": "true" }, [icone(s.icone)]),
        el("h1", { texte: s.nom })
      ])
    ]);

    var contenu = [];
    if (s.description) { contenu.push(el("p", { classe: "description", texte: s.description })); }
    if (s.consignes) {
      contenu.push(el("div", { classe: "consignes", role: "note" }, [icone("info"), el("p", { texte: s.consignes })]));
    }

    if (s.types.length) {
      contenu.push(el("h2", { classe: "intertitre", id: "titre-types", texte: "Type de demande" }));
      contenu.push(el("ul", { classe: "liste-types", "aria-labelledby": "titre-types" },
        s.types.map(function (t) {
          var url = lienFormulaire(s, t.libelle);
          var ligne = url
            ? el("a", { classe: "type", href: url, target: "_blank", rel: "noopener" },
                [el("span", { texte: t.libelle }), icone("suivant")])
            : el("button", {
                type: "button", classe: "type",
                onclick: function () {
                  afficherMessage("Formulaire en cours de création. En attendant, utilisez « Contacter le service ».");
                }
              }, [el("span", { texte: t.libelle }), el("span", { classe: "type-a-venir", texte: "Bientôt" })]);
          return el("li", {}, [ligne]);
        })
      ));
    }

    contenu.push(el("p", { classe: "responsable" }, [
      "Responsable : ", el("strong", { texte: s.responsable || "à renseigner" })
    ]));

    var mail = lienMail(s);
    var boutonContact = mail
      ? el("a", { classe: "bouton-contact", href: mail }, [icone("mail"), "Contacter le service"])
      : el("button", {
          type: "button", classe: "bouton-contact", "aria-disabled": "true",
          onclick: function () { afficherMessage("L'adresse de ce service n'est pas encore renseignée."); }
        }, [icone("mail"), "Contacter le service"]);

    return [
      entete,
      el("main", { classe: "contenu-service" }, contenu),
      el("div", { classe: "barre-contact" }, [boutonContact])
    ];
  }

  /* ---------- 6. Navigation ---------- */

  function afficher() {
    var correspondance = location.hash.match(/^#\/service\/([^/?#]+)/);
    var service = correspondance ? REF.parId[decodeURIComponent(correspondance[1]).toUpperCase()] : null;
    var elements = service ? ecranService(service) : ecranAccueil();
    if (!service) { vientDeLAccueil = false; }

    document.getElementById("toast").classList.remove("visible");
    app.textContent = "";
    elements.forEach(function (e) { if (e) { app.appendChild(e); } });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", afficher);

  /* ---------- 7. Installation sur l'écran d'accueil ---------- */

  var invitationAndroid = null;
  window.addEventListener("beforeinstallprompt", function (evenement) {
    evenement.preventDefault();
    invitationAndroid = evenement;
  });
  window.addEventListener("appinstalled", function () {
    invitationAndroid = null;
    afficherMessage("Application installée.");
    afficher();
  });

  function estInstallee() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true;
  }

  function estIPhone() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function ouvrirAideInstallation() {
    if (invitationAndroid) {
      invitationAndroid.prompt();
      invitationAndroid.userChoice.then(function () { invitationAndroid = null; });
      return;
    }
    var etapes = estIPhone()
      ? ["Ouvrez cette page dans Safari.",
         "Touchez le bouton Partager (carré avec une flèche vers le haut).",
         "Choisissez « Sur l'écran d'accueil », puis « Ajouter »."]
      : ["Ouvrez cette page dans Chrome.",
         "Touchez le menu ⋮ en haut à droite.",
         "Choisissez « Ajouter à l'écran d'accueil » ou « Installer l'application »."];

    var contenu = document.getElementById("aide-contenu");
    contenu.textContent = "";
    contenu.appendChild(el("p", { texte: "L'icône UT apparaîtra sur votre téléphone, comme une application classique." }));
    contenu.appendChild(el("ol", {}, etapes.map(function (e) { return el("li", { texte: e }); })));

    var dialogue = document.getElementById("aide-installation");
    if (typeof dialogue.showModal === "function") { dialogue.showModal(); }
    else { alert(etapes.join("\n")); }
  }

  document.querySelectorAll("[data-fermer]").forEach(function (bouton) {
    bouton.addEventListener("click", function () { bouton.closest("dialog").close(); });
  });

  /* ---------- Démarrage ---------- */
  if (!REF.services.length) {
    app.appendChild(el("p", { classe: "noscript", texte: "Le référentiel des services est introuvable ou vide (data/services.js)." }));
  } else {
    afficher();
  }
})();
