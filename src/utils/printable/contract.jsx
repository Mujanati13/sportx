import { getCurrentDate } from "../helper";

export function handlePrintContract(
  nom,
  prenom,
  mail,
  address,
  ville,
  tele,
  ddn,
  ddd
) {
  if (true) {
    const printWindow = window.open("", "", "width=600,height=800");
    printWindow.document.open();
    printWindow.document.write(
      `
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Contrat N° 184 - 137-24-184</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }

        .s1 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 15pt;
        }

        h1 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 12pt;
        }

        h4 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 9pt;
        }

        .s2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 9.5pt;
        }

        .s3 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 9.5pt;
        }

        .s4 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s5 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 9.5pt;
        }

        h2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10.5pt;
        }

        .s6 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s7 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: italic;
            font-weight: bold;
            text-decoration: none;
            font-size: 12pt;
        }

        .a,
        a {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 9.5pt;
        }

        p {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 7.5pt;
            margin: 0pt;
        }

        .s8 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 8pt;
        }

        li {
            display: block;
        }

        #l1 {
            padding-left: 0pt;
        }

        #l1>li>*:first-child:before {
            content: "- ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
        }

        li {
            display: block;
        }

        #l2 {
            padding-left: 0pt;
        }

        #l2>li>*:first-child:before {
            content: "- ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
        }

        #l3 {
            padding-left: 0pt;
            counter-reset: d1 1;
        }

        #l3>li>*:first-child:before {
            counter-increment: d1;
            content: counter(d1, decimal)"- ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 7pt;
        }

        #l3>li:first-child>*:first-child:before {
            counter-increment: d1 0;
        }

        #l4 {
            padding-left: 0pt;
            counter-reset: d1 5;
        }

        #l4>li>*:first-child:before {
            counter-increment: d1;
            content: counter(d1, decimal)"- ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 7pt;
        }

        #l4>li:first-child>*:first-child:before {
            counter-increment: d1 0;
        }

        li {
            display: block;
        }

        #l5 {
            padding-left: 0pt;
            counter-reset: d1 6;
        }

        #l5>li>*:first-child:before {
            counter-increment: d1;
            content: counter(d1, decimal)"- ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 7pt;
        }

        #l5>li:first-child>*:first-child:before {
            counter-increment: d1 0;
        }

        table,
        tbody {
            vertical-align: top;
            overflow: visible;
        }
    </style>
</head>

<body>
    <div class="textbox"
        style="width: 100%; align-items: center; text-align: center;display:block;min-height:46.5pt;width:358.9pt;">
        <p class="s1" style="width: 100%; padding-top: 1pt;padding-left: 132pt;text-indent: -107pt;text-align: left;"><a
                name="bookmark0">&zwnj;</a>CONTRAT D&#39;ABONNEMENT Club Fit House N°137-24-184</p>
    </div>
    <p style="padding-left: 140pt;text-indent: 0pt;text-align: left;" />
    <h1 style="padding-top: 7pt;padding-left: 140pt;text-indent: 0pt;text-align: left;">Saison : 2023-2024</h1>
    <p style="padding-top: 11pt;text-indent: 0pt;text-align: left;"><br /></p>
    <h4 style="padding-left: 6pt;text-indent: 0pt;line-height: 174%;text-align: left;">Pour souscrire un abonnement Fit
        House, merci de bien vouloir compléter en MAJUSCULES et SIGNER le formulaire ci-dessous :</h4>
    <table style="border-collapse:collapse;margin-left:6.34646pt" cellspacing="0">
        <tr style="height:22pt">
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Civilité
                </p>
            </td>
            <td
                style="width:107pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-left: 3pt;text-indent: 0pt;text-align: center;">Madmoiselle</p>
            </td>
            <td
                style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-left: 3pt;text-indent: 0pt;text-align: center;">Madame</p>
            </td>
            <td
                style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-left: 3pt;text-indent: 0pt;text-align: center;">Monsieur</p>
            </td>
        </tr>
        <tr style="height:22pt">
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Prénom
                </p>
            </td>
            <td
                style="width:107pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">
                    ${prenom}</p>
            </td>
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Nom</p>
            </td>
            <td
                style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">${nom}</p>
            </td>
        </tr>
        <tr style="height:22pt">
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Adresse
                </p>
            </td>
            <td style="width:431pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                colspan="3">
                <p class="s2" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">${address}</p>
            </td>
        </tr>
        <tr style="height:22pt">
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Code
                    Postal</p>
            </td>
            <td
                style="width:107pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </td>
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Ville
                </p>
            </td>
            <td
                style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Fès</p>
            </td>
        </tr>
        <tr style="height:22pt">
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">
                    Téléphone portable</p>
            </td>
            <td
                style="width:107pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">
                    ${tele}</p>
            </td>
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">
                    Téléphone fixe</p>
            </td>
            <td
                style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </td>
        </tr>
        <tr style="height:22pt">
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Date de
                    naissance</p>
            </td>
            <td style="width:431pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                colspan="3">
                <p class="s2" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">${ddn}</p>
            </td>
        </tr>
        <tr style="height:22pt">
            <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                bgcolor="#E6E6E8">
                <p class="s2" style="padding-left: 3pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">Email
                </p>
            </td>
            <td style="width:431pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                colspan="3">
                <p style="padding-left: 1pt;text-indent: 0pt;text-align: center;"><a
                        href="mailto:${mail}" class="s3">${mail}</a></p>
            </td>
        </tr>
        <tr style="height:22pt">
            <td style="width:539pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                colspan="4">
                <p class="s4" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">J&#39;accepte de recevoir
                    des informations par mail de la part de Fit House <span class="s5">OUI NON</span></p>
            </td>
        </tr>
    </table>
    <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
    <h2 style="padding-left: 6pt;text-indent: 0pt;text-align: left;">Documents à fournir pour l&#39;inscription :</h2>
    <ul id="l1">
        <li data-list-text="-">
            <h4 style="padding-top: 7pt;padding-left: 11pt;text-indent: -5pt;text-align: left;">une piéce d&#39;identité
                en cours de validité.</h4>
        </li>
        <li data-list-text="-">
            <h4 style="padding-top: 7pt;padding-left: 11pt;text-indent: -5pt;text-align: left;">un certificat médical
                récent, attestant de ma capacité à pratiquer une activité sportive.</h4>
            <p style="text-indent: 0pt;text-align: left;"><br /></p>
            <table style="border-collapse:collapse;margin-left:6.34646pt" cellspacing="0">
                <tr style="height:22pt">
                    <td style="width:135pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Date de début
                            D&#39;abonnement</p>
                    </td>
                    <td
                        style="width:404pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">${ddd}</p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:135pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">
                            Type D&#39;abonnement</p>
                    </td>
                    <td
                        style="width:404pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">FITNESS / Homme/
                            Semestriel</p>
                    </td>
                </tr>
            </table>
            <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
            <h4 style="padding-left: 29pt;text-indent: -22pt;line-height: 112%;text-align: left;">Mode De Réglement :
                Chéques Espéces Prélèvements</h4>
            <h4 style="padding-left: 29pt;text-indent: 0pt;text-align: left;">Autres ......................</h4>
            <p class="s6"
                style="padding-top: 9pt;padding-left: 6pt;text-indent: 0pt;line-height: 121%;text-align: left;">Je
                soussigné(e) : <span class="s7">ADM NOUREDDINE </span>déclare souscrire un abonnement nominatif pour la
                durée de validité ci-dessus. Cet abonnement m&#39;autorise à utiliser les installations aux horaires
                fixés par la Direction et à participer à l&#39;ensemble des activités proposées par STAF Fitness (hors
                activités annexes ). II n&#39;est ni transférable, ni remboursable. Je déclare que mon état de santé me
                permet de participer aux cours proposés par l&#39;Etablissement et m&#39;engage à fournir un certificat
                médical d&#39;apitude à la pratique du sport en salle datant de moins de 1 mois lors de ma premiére
                séance .Celui-ci devra ensuite être renouvelé tous les ans. Je déclare avoir pris connaissance du
                réglement intérieur de STAF Fitness (affiché dans le studio ainsi qu&#39;au verso de ce document) et
                devoir m&#39;y conformer en totalité.</p>
            <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
            <h2 style="padding-left: 6pt;text-indent: 0pt;text-align: left;">Fait à Fes</h2>
            <h2 style="padding-top: 3pt;padding-left: 6pt;text-indent: 0pt;text-align: left;">${getCurrentDate()}</h2>
            <p style="padding-top: 10pt;text-indent: 0pt;text-align: left;"><br /></p>
            <table style="border-collapse:collapse;margin-left:6.34646pt" cellspacing="0">
                <tr style="height:22pt">
                    <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 71pt;text-indent: 0pt;text-align: left;">
                            Signature de L&#39;adhérant (e)</p>
                    </td>
                    <td style="width:270pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 79pt;text-indent: 0pt;text-align: left;">
                            Signature du Conseiller</p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td
                        style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p style="text-indent: 0pt;text-align: left;"><br /></p>
                    </td>
                    <td
                        style="width:270pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p style="text-indent: 0pt;text-align: left;"><br /></p>
                    </td>
                </tr>
            </table>
            <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
            <p style="padding-left: 6pt;text-indent: 0pt;line-height: 1pt;text-align: left;" />
            <p style="padding-top: 6pt;padding-left: 203pt;text-indent: -132pt;line-height: 165%;text-align: left;"><a
                    href="mailto:fithousefes@gmail.com" class="a" target="_blank">Complexe Sportif de Fés, Route de
                    Sefrou, Tél : 05.35.61.88.53 / watssap : 07.73.06.93.77 Email : </a><a
                    href="mailto:fithousefes@gmail.com" target="_blank">fithousefes@gmail.com</a></p>
            <div style="margin-top: 100px;"></div>
            <div class="textbox"
                style="background:#E6E6E8;border:0.8pt solid #000000;display:block;min-height:28.5pt;width:538.6pt;">
                <p class="s1" style="padding-top: 1pt;padding-left: 39pt;text-indent: 0pt;text-align: left;">CONDITION
                    GENERAS DE VENTES ET REGLEMENT INTERIEUR</p>
            </div>
        </li>
    </ul>
    <p style="padding-left: 5pt;text-indent: 0pt;text-align: left;" />
    <p style="text-indent: 0pt;text-align: left;"><br /></p>
    <h1 style="padding-top: 4pt;padding-left: 6pt;text-indent: 0pt;text-align: justify;">Les conditions générales et
        leur application:</h1>
    <ul id="l2">
        <li data-list-text="-">
            <p style="padding-top: 7pt;padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Les
                conditions générales - au dessous - régissent les realations contractuelles du club, de remise en forme
                objet de ce contrat de l&#39;adhérent contractant.</p>
            <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Aucune condition
                particuliére ne peut, sauf acceptation formelle et écrite du club ou de son mandataire commercialsant,
                prévoir contre les conditions générales. Toute condition contraire posée par L&#39;adhérent sera donc
                caduque, quel que soit le mement ou elle aura pu être a sa connaissance.</p>
            <ol id="l3" style="display: grid;
            grid-column-gap: 10px;
            grid-row-gap: 0px;width: 100%;">
                <li data-list-text="1-" style="grid-area: 1 / 1 / 2 / 2;">
                    <p class="s8" style="padding-top: 6pt;padding-left: 13pt;text-indent: -7pt;text-align: left;">OBJET
                        DU CONTRAT</p>
                    <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Aprés avoir
                        visité les installations du club et /ou avoir pris connaissance des prestations proposées, le
                        Membre déclare souscrire un contrat d&#39;abonnement nominatif et incessible l&#39;autorisant à
                        utiliser les installations en libre-service avec accés illimité aux jours et heures
                        d&#39;ouvertures du club dans le cadre du forfait de base comprenant : Cardio-training et
                        musculation, selon un prix et des modalités financiéres indiqués dans le présent contrat.</p>
                </li>
                <li data-list-text="2-" style="grid-area: 1 / 2 / 2 / 3;">
                    <p class="s8" style="padding-top: 6pt;padding-left: 13pt;text-indent: -7pt;text-align: left;">
                        DEFINITION</p>
                    <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">La CARTE du
                        membre est à durée détarminée suivant le durée souscrite au départ du contrat. En cas de
                        prélèvement, l&#39;arrêt de celui ci intervient des l&#39;échéance suivant la contrat. En cas de
                        perte ou de vol, le remplacemebt de sa carte sera facture 100 SH TTC a l&#39;abonné. Le
                        renouvellemnt fait l&#39;objet d&#39;un nouveau contrat</p>
                </li>
                <li data-list-text="3-" style="grid-area: 2 / 2 / 3 / 3;">
                    <p class="s8" style="padding-top: 6pt;padding-left: 13pt;text-indent: -7pt;text-align: left;">
                        GARANTIE DU PRIX</p>
                    <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Pendant toute
                        la
                        durée du contrat, le prix fixé aux présentes est garanti (en Dirhams constants). En cas
                        d&#39;interruption du contrat a l&#39;initiative du membre (a l&#39;exclusion d&#39;une
                        interruption a l&#39;iniyiative du club) et quelle qu&#39;en soit la cause ou la durée, le club
                        se réserve la possibilté d&#39;actualiser, le cas échéant, le prix de l&#39;abonnement mensuel
                        lors de la réactivation de contrat.</p>
                    <p>
                        Le Membre déclare se conformer aux conditions générales et au présent réglement intérieur, y
                        adhérer sans restriction ni réserve et de respecter les consignes suivantes :

                        Présence des enfants non inscrits aux kids club exclue dans l'enceinte du club pour des raisons
                        de sécuriié.

                        L'interdication de fumer à l'intérieur et devant la porte de l'établissement.

                        Le port de vêtements et de chaussures de sport spécifiques et exclusifs de toutes autres
                        utilisations.

                        La salle de cours collectif est strictement réservée aux cours collectfs.



                        Le Membre s'engage à n'utiliser que le matériel et les équipements mis à disposition par la
                        salle et ne sont pas autorisés à ramener ses propres affaires (corde à sauter, etc. ).

                        L'emploi d'une serviette sur les appareils et tapis de sol.

                        Nettoyer sa place et son matériel aprés utilisation au moyen des produits de nettoyage prévu à
                        cet effet.

                        Ranger le matériel aprés utilisation et décharger les barres et appareil aprés chaque
                        utilisation.

                        La nourriture est interdite dans les salles d'entraînement.

                        Chaque membre s'engage en cas d'accident dont il serait témoin à alerter immédiatement les
                        secours.

                        Accés interdit à la pelouse du terrain lors de l'utilisation de la piste d'athlétisme.
                    </p>
                </li>
                <li data-list-text="4-" style="grid-area: 2 / 1 / 3 / 2;">
                    <p class="s8" style="padding-top: 6pt;padding-left: 13pt;text-indent: -7pt;text-align: left;">
                        MODALITES DE RESIATION</p>
                    <p style="text-indent: 0pt;text-align: left;"><br /></p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 8pt;text-align: justify;">A
                        l&#39;initiative du Membre :</p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">La demande de
                        résiliation à l&#39;initiative du membre, est possible à compter du 11éme mois effectif de
                        l&#39;abonnement, et doit être sgnifiée, par courrier recommandé avec avis de réception, avec un
                        préavis d&#39;un mois. Poue être validitée définitivement, la résiliation doit être suivie, au
                        terme du mois de préavis, de la restitution de la carte de Membre au club. A défaut, les
                        réglementx mensuels ou les prélèvements contnuent d&#39;être effectues jusqu&#39;à remise de la
                        carte du membre. En cas de résiliation du contrat par le membre relevant de la force majeure
                        pendant la période incompressible des 12 premiers mois, les frais administratifs seront d&#39;un
                        montant forfaitaire de 1900,00 DH, et seront prélevés en une seule fois pour clôture du dossier.
                        Par motif de cas de force majeure, il est limitativement fait réfèrence aux cas suivants :
                        maladie ou accident grave empéchant défnitivement le Membre de bénéficier des services du club,
                        décés, mutation professionnelle du fait de l&#39;employeur.</p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Pour toute autre
                        cause d&#39;empêchement non définitve (supérieue à 2 mois), le Membre pourra bénéficier
                        d&#39;une suspension d&#39;abonnement à la condition expresse d&#39;informer le club
                        préalablement et remettre sa carte ainsi que les piéces justificatives.</p>
                    <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 8pt;text-align: justify;">A
                        l&#39;initiative du Club :</p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">L&#39;abonnement
                        est résilié de plein droit par le club aux motifs suivants : - En cas de fraude dans la
                        constitution du dossier d&#39;abonnement, fausse déclaration, faisification des piéces.</p>
                </li>
                <li data-list-text="6-" style="grid-area: 3 / 1 / 4 / 2;">
                    <p class="s8" style="padding-top: 6pt;padding-left: 13pt;text-indent: -7pt;text-align: left;">
                        VESTIARES/DEPOT</p>
                    <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Le Membre peut
                        utiliser
                        des casies individuels à fermeture traditionnelle dont l&#39;utilisation est limitée à la durée
                        de la
                        séance. En cas d&#39;utilisation par le Membre d&#39;un casier individuel à fermeture
                        traditionnelle, il
                        lui est expressement rappelé l&#39;obligation de se pourvoir d&#39;un cadenas de sécurité afin
                        de
                        pouvoir le fermer. Le cadenas est et reste la propriéte du Membre. II est rappelé expressement
                        au Membre
                        que les vestiares ne font l&#39;objet d&#39;aucune surveillance spécifique. Le Membre reconnaît
                        ainsi
                        avoir été parfaitement informé des risques encourus par le fait de placer des objets de valeur
                        dans les
                        vestiaires communs, ce qui en aucune façon ne engager la responsabilité du club. II est
                        strictement
                        interdit de laisser ses affaires personnelles à l&#39;intérieur des casies aprés avoir quité le
                        club car
                        les cadenas seront automatiquement coupés et enlevés, sans aucune indemnisation pour le membre.
                        Une
                        pénalité de 50 Dhs sera éxigée.</p>
                </li>
                <li data-list-text="7-" style="grid-area: 3 / 2 / 4 / 3;">
                    <p class="s8" style="padding-top: 6pt;padding-left: 13pt;text-indent: -7pt;text-align: left;">
                        ATTESTATION/CERTIFICAT MEDICAL/DECHARGE MEDICALE</p>
                    <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Le Membre
                        atteste que sa
                        constitution physique et son état de santé lui permettent de pratiquer le sport en général, et
                        plus
                        particuliérement d&#39;utiliser les services, les activités, le matériel et les installations
                        proposés
                        par le club</p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">: musculation,
                        cardio-training, cours collectifs de fitness et activités annexes, qu&#39;il ne souffre
                        d&#39;aucune
                        blessure, maladie ou handicap, qu&#39;il n&#39;a jamais eu de problémes cardiaques ou
                        respirations
                        décelés à ce jour.</p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Aucun médecin,
                        infirmier, entraîneur, ne lui a déconseillé la pratique de cette activité.</p>
                    <p style="padding-left: 6pt;text-indent: 0pt;line-height: 100%;text-align: justify;">Le Membre remet
                        le jour
                        de la signature du contrat, un certificat d&#39;aptitude à la pratque des activités proposées
                        par le
                        club. A défaut de certificat médical, le Membre décharge le club, ses responsables, le(s)
                        professeur(s),
                        ses membres, de toutes réclamations, actions juridiques, frais, dépenses et requêtes
                        respectivement à
                        des blessures ou dommages occasionnés à sa personne et causés de quelque maniére que ce soit,
                        découlant
                        ou en raison du fait qu&#39;il pratique cette activité sportive, et ce nonobstant le fait que
                        cela ait
                        pu être causé ou occasionné par négligence ou être lié à un manquement à ses responsabilités à
                        titre
                        d&#39;occupant des lieux. Le Membre consent à assumer tous les risques connus et inconnus, et
                        toutes les
                        conséquences afférentes ou liées au fait qu&#39;il participe aux activités sportives du club. En
                        outre,
                        le(s) parent(s) ou le(s) titeur(s) légal (aux) des participants mineurs de moins de 18 ans
                        accepte(nt)
                        de communiquer aux dits participants mineurs les avertissements et les conditions mentionnés
                        ci-dessus,
                        ainsi que leurs conséquences et consent(ent) à la participation des dits mineur(s). Le Membre
                        atteste
                        avoir lu le présent document comprend qu&#39;en y apposant sa signature il renonce à des droits
                        importants C&#39;est donc en toute connaissance de cause qu&#39;il signe la présente décharge
                        médicale.
                    </p>
                </li>
                
            </ol>
        </li>
       
    </ul>



</body>

</html>`
    );

    printWindow.document.close();
    printWindow.print();
  }
}
