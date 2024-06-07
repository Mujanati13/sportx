import { getCurrentDate } from "../helper";

export function handlePrintContractStaff(
  nom,
  prenom,
  mail,
  address,
  ville,
  tele,
  cdn,
  ddn,
  ddd,
  type,
  pay
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
        
                .s1 {
                    color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 15pt;
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
        
                p {
                    color: black;
                    font-family: Arial, sans-serif;
                    font-style: normal;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 10.5pt;
                    margin: 0pt;
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
                style="background:#E6E6E8;display:block;min-height:46.5pt;width:358.9pt;">
                <p class="s1" style="padding-top: 1pt;padding-left: 162pt;text-indent: -100pt;text-align: start;">Contrat De
                    travail Club Fit House N°18</p>
            </div>
            <p style="padding-left: 140pt;text-indent: 0pt;text-align: left;" />
            <p style="text-indent: 0pt;text-align: left;"><br /></p>
            <table style="border-collapse:collapse;margin-left:6.34646pt" cellspacing="0">
                <tr style="height:22pt">
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Prénom</p>
                    </td>
                    <td
                        style="width:107pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">${prenom}
                        </p>
                    </td>
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Nom</p>
                    </td>
                    <td
                        style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">${nom}</p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Adresse
                        </p>
                    </td>
                    <td style="width:431pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        colspan="3">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">${address}
                        </p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">CIN</p>
                    </td>
                    <td
                        style="width:107pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">${cdn}
                        </p>
                    </td>
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Ville</p>
                    </td>
                    <td
                        style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">${ville}</p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Téléphone
                            portable</p>
                    </td>
                    <td
                        style="width:107pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">${tele}
                        </p>
                    </td>
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Téléphone
                            fixe</p>
                    </td>
                    <td
                        style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p style="text-indent: 0pt;text-align: left;"><br /></p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Date de
                            naissance</p>
                    </td>
                    <td style="width:431pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        colspan="3">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">${ddn}</p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:108pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Email</p>
                    </td>
                    <td style="width:431pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        colspan="3">
                        <p style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;"><a
                                href="mailto:${mail}" class="s3">${mail}</a></p>
                    </td>
                </tr>
            </table>
            <p style="text-indent: 0pt;text-align: left;"><br /></p>
            <table style="border-collapse:collapse;margin-left:6.34646pt" cellspacing="0">
                <tr style="height:22pt">
                    <td style="width:135pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Date de début</p>
                    </td>
                    <td
                        style="width:404pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">${ddd}</p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:135pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Type de contrat</p>
                    </td>
                    <td
                        style="width:404pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">${type}</p>
                    </td>
                </tr>
                <tr style="height:22pt">
                    <td style="width:135pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Salaire</p>
                    </td>
                    <td
                        style="width:404pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                        <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">${pay}0 dhs</p>
                    </td>
                </tr>
            </table>
            <p style="text-indent: 0pt;text-align: left;"><br /></p>
            <p style="padding-left: 6pt;text-indent: 0pt;line-height: 130%;text-align: left;">Fait à Fes Le</p>
            <p style="text-indent: 0pt;text-align: left;"><br /></p>
            <table style="border-collapse:collapse;margin-left:6.34646pt" cellspacing="0">
                <tr style="height:22pt">
                    <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 81pt;text-indent: 0pt;text-align: left;">Signature
                            du Salarié(e)</p>
                    </td>
                    <td style="width:270pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                        bgcolor="#E6E6E8">
                        <p class="s2" style="padding-top: 1pt;padding-left: 76pt;text-indent: 0pt;text-align: left;">Signature
                            de l&#39;employeur</p>
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
        </body>
        
        </html>`
    );

    printWindow.document.close();
    printWindow.print();
  }
}
