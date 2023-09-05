import http from "node:http";
import querystring from "node:querystring";
import fs from "node:fs";

const pizzaOffers = [
  { name: "Ananas Dave", cost: 12 },
  { name: "Mango Pizza", cost: 112 },
];

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (req.url === "/bestellung") {
      // Traiter la soumission du formulaire lors de la requête bestellung
       
        let formData = ""; // Créer une variable pour stocker les données du formulaire
        
      
      req.on("data", function (data) {
        // Écouter les données du formulaire entrantes
        formData += data;
      });
        
      //// Une fois toutes les données reçues

      req.on("end", function () {
        const bestellt = querystring.decode(formData);
        res.write("<h1>Bestellseite</h1>");
        // Utiliser la variable bestellt pour afficher la commande
         
          res.write(`Danke für die Bestellung: ${bestellt.bestellung}`);
        res.end();
      }); //
    }
    else if (req.url === "/") {
      //start seite
        let pizzaString = "";
        pizzaOffers.forEach((pizza) => {
            pizzaString += `${pizza.name}, ${pizza.cost} EUR <br/>`;
        });
        
            const datei = fs.readFileSync("script/startseite.html").toString();
        
        res.write(datei.replace("PIZZA AUFLISTUNG HIER",  pizzaString));

       res.end();
    }
    else
    {
        res.statusCode = 404;
        res.write("Diese Seite existiert nicht");
        res.end();
    }
 
});
server.listen(3500, () => {
  console.log("Server is listening on port 3500");
});
