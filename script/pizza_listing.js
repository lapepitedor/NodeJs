import http from "node:http";
import querystring from "node:querystring";
import fs from "node:fs";// pour importer le module fs, puis nous utilisons fs.readFile pour lire le contenu d'un fichier
import pug from "pug";

const pizzaOffers = [
  { name: "Ananas Dave", cost: 12 },
  { name: "Mango Pizza", cost: 112 },
  { name: "Pizza Margherita", cost: 8 },
  { name: "Pizza Pepperoni", cost: 10 },
  { name: "Pizza Vegetariana", cost: 9 },
];

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Traiter la soumission du formulaire lors de la requête bestellung

  if (req.url === "/bestellung") {

    // Créer une variable pour stocker les données du formulaire
    let formData = "";

    req.on("data", function (data) {
      // Écouter les données du formulaire entrantes
      formData += data;
    });

    // Une fois toutes les données reçues

    req.on("end", function ()
    {

      const bestellt = querystring.decode(formData);
      console.log(bestellt);

      const bestellungen =  fs
        .readFileSync("script/bestellungen.html")
        .toString();
      res.write(bestellungen)

      const pizza = bestellt.bestellung;
      const adresse = bestellt.adresse;
      const datum = new Date().toLocaleDateString();
      
      const jsonString = JSON.stringify([
        ...existierende_bestellungen, //um die alte werte zu nehmen

        {

        bestellung: pizza,
        adresse,
       datum
      }
      ]);

      fs.writeFileSync("script/bestellungen.json", jsonString);
      const Bestell = fs.writeFileSync("script/bestellungen.html").toString();
      res.write(Bestell({orders:existierende_bestellungen}));
      // orders[{
      //   
      // }]
      res.write(`Danke für die Bestellung: ${bestellt.bestellung}`);
      res.end();
    }); //
  } else if (req.url === "/") {
    
    console.log(pizzaOffers);
    // Remplacer la balise spécifique dans le HTML par les options générées
    const pizzaOptions = pizzaOffers
      .map(
        (pizza) =>
          `<option value="${pizza.name}">${pizza.name}, ${pizza.cost} EUR</option>`
      )
      .join(""); // Convertir le tableau en une chaîne

    const datei = fs.readFileSync("script/startseite.html").toString();

    
    const modifiedHtmlContent = datei.replace(
     
      "Pizza Margherita, 8 EUR",
      pizzaOptions
    );
    res.write(modifiedHtmlContent);

    res.end();
  } else {
    res.statusCode = 404;
    res.write("Diese Seite existiert nicht");
    res.end();
  }
});
server.listen(3500, () => {
  console.log("Server is listening on port 3500");
});
