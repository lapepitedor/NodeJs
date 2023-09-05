import http, { Server } from 'node:http';

const server = http.createServer(function (req, res)  {
    res.write("Voila la requete du serveur");
    res.end()
});
server.listen(3500);