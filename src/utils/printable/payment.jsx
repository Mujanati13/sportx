import { getCurrentDate } from "../helper";

export function handlePrintPayment(
  nom,
  prenom,
  cdn,
  fonction,
  month,
  pay,
  vcnn

) {
  if (true) {
    const printWindow = window.open("", "", "width=600,height=800");
    printWindow.document.open();
    printWindow.document.write(
      `
      <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Contrat N°</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }

        h1 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 15pt;
        }

        p {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11pt;
            margin: 0pt;
        }

        .s1 {
            color: #808080;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 12.5pt;
        }

        .h2 {
            color: #808080;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 12.5pt;
        }

        h3 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10.5pt;
        }

        .s2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 12pt;
        }

        h4 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 9.5pt;
        }
    </style>
</head>

<body>
    <h1 style="padding-top: 3pt;padding-left: 32pt;text-indent: 0pt;text-align: center;">Fiche de paie</h1>
    <p style="text-indent: 0pt;text-align: left;"><br /></p>
    <p style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Je soussigné</p>
    <p class="s1" style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${prenom} ${nom}</p>
    <p style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Numéro de carte nationale : <span
            class="h2">${cdn}</span></p>
    <p style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">validité CIN : <span
            class="h2">${vcnn}</span></p>
    <p style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Fonction : <span
            class="h2">${fonction}</span></p>
    <p style="text-indent: 0pt;text-align: left;"><br /></p>
    <p style="padding-left: 5pt;text-indent: 0pt;line-height: 128%;text-align: left;">Atteste avoir recu, en bonne et
        due forme, le salaire de la période du mois <span class="h2">${month} </span>de la part de
        l&#39;association sportive ALBISSAT AL ALHDAR d&#39;un montant total de <span class="h2">${pay} Dhs.</span></p>
    <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
    <h3 style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Fait à Fes ,le <span class="s2">29/5/2024</span>
    </h3>
    <p style="text-indent: 0pt;text-align: left;"><br /></p>
    <h4 style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Signature du salarié Signature de l&#39;employeur
    </h4>
</body>

</html>`
    );

    printWindow.document.close();
    printWindow.print();
  }
}
