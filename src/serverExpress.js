// Richiede i moduli necessari
var http = require('http');
var mysql = require('mysql');
const crypto = require('crypto');
var myurl = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var id_acq = 0;
var server = express(); // Inizializza il server Express
var cors = require('cors');

// Abilita il parsing di JSON e dati codificati nel corpo delle richieste
server.use(bodyParser.json()); // supporta i corpi codificati json
server.use(bodyParser.urlencoded({ extended: true })); // supporto codificato body

// Abilita il CORS per consentire le richieste da http://localhost:3000
server.use(cors({
    origin: 'http://localhost:3000'
}));

// Avvia il server sulla porta 5556
server.listen(5556, function () {
	updateId_acq();     // Esegue l'aggiornamento dell'ID di acquisto più recente
	console.log('Server running at http://127.0.0.1:5556/');
	console.log('========= SERVER INFO =========');
	console.log('        Server started!!       ');
	console.log('===============================');
	console.log('\n\n');
});

//Definizione delle route per l'API RESTful
/***** RESTful API *****/ 


/*****     GET     *****/
server.get('/acquisti/:getAll', getAcquisti); //Restituisce tutti gli acquisti raggruppati per ID acquisto.

/*****     POST     *****/
server.post('/verificaUtente', accediRegistrati); //Gestisce l'autenticazione e la registrazione degli utenti.
server.post('/prodotti/:get5prodotti', get5Prodotti); //Restituisce i primi 5 prodotti più recenti o più venduti.
server.post('/utente/:info', getUtente); //Ottiene le informazioni dell'utente
server.post('/aggiungialCarrello', verificaAddProdottoCarrello); //Verifica e aggiunge un prodotto al carrello dell'utente
//server.post('/quantitaTotaleProdotto', getQuantitaTotaleProdotto);
server.post('/deleteProdottoCarrello', deleteProdottoCarrello);
server.post('/aggiungiAcquisto', aggiungiAcquisto);
server.post('/ottieniCarrello', ottieniCarrello);
server.post('/recapitoUtente', ottieniRecapito);
server.post('/getSerie', getSerie);
server.post('/addMoreVolumes', addMoreVolumes);
server.post('/inserisciRecapito', inserisciRecapito);
server.post('/getOrdini', getOrdini);
server.post('/getProdottiOrdine', getProdottiOrdine);
server.post('/searchProdotto', searchProdotto);
server.post('/delete/:recapito', deleteRecapito);

// Funzione per la connessione al database MySQL
function accessodb(){
	console.log("funzione accessodb");
	var connection = mysql.createConnection(
		{
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'bookbazar',
		}
	);
	connection.connect();
	return connection;
}

// Funzione per calcolare l'hash SHA256 di una stringa
function hashFunction(str) {
	console.log("funzione hashFunction");
	const hashHex = crypto.createHash('sha256').update(str).digest('hex');
	return hashHex;
}

// Funzione per aggiornare l'ID di acquisto più recente
function updateId_acq() {
	console.log("funzione updateId_acq");
	var connection = accessodb();
	var idquery  = "SELECT Id_Acquisto FROM acquisti ORDER BY Id_Acquisto DESC LIMIT 1";
	connection.query(idquery, function(err, result, fields) { 
		if (err) throw err;
		if (result.length > 0)
			id_acq = result[0].Id_Acquisto;
	});
	connection.end();
}

// Funzione per ottenere tutti gli acquisti raggruppati per ID acquisto
function getAcquisti(req, res) {
	console.log("funzione getAcquisti");
	var strquery = "SELECT Id_Acquisto, SUM(quantità) as qtot, dataacquisto,SUM(prezzo) as ptot "
		+ "FROM acquisti "
		+ "GROUP BY Id_Acquisto, dataacquisto";
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		if (err) 
			return;
		if (result.length > 0) {
			res.json(result);
		}
		else { 
			var myjson = [{"Id_Acqusito":"-1"}];
			res.json(myjson);
		}
	});
	connection.end();
}

// Altre funzioni per eseguire query al database come searchProdotto, getOrdini, getProdottiOrdine, ecc.
function searchProdotto(req, res) {
	console.log("funzione searchProdotto");
	var nome = req.body.nome;
	var nvol = req.body.nvol;
	var strquery = "SELECT * FROM prodotti WHERE nome = '"+nome+"' AND nvol = "+nvol;
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		if (err) 
			return;
		if (result.length > 0) {
			res.json(result);
		}
		else { 
			var myjson = [{"Id_Prodotto":"-1"}];
			res.json(myjson);
		}
	});
	connection.end();
}


function getOrdini(req, res) {
	console.log("funzione getOrdini");
	var Id_Utente = req.body.Id_Utente;
	console.log(Id_Utente);
	var strquery = "SELECT Id_Acquisto, SUM(quantità) as qtot, dataacquisto,SUM(prezzo) as ptot "
		+ "FROM acquisti WHERE Id_Utente = "+Id_Utente
		+ " GROUP BY Id_Acquisto, dataacquisto";
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		console.log(result);
		if (err) 
			return;
		if (result.length > 0) {
			res.json(result);
		}
		else { 
			var myjson = [{"Id_Acquisto":"-1"}];
			res.json(myjson);
		}
	});
	connection.end();
}


function getProdottiOrdine(req, res) {
	console.log("funzione getProdottiOrdine");
	var Id_Acquisto = req.body.Id_Acquisto;
	var strquery = "SELECT a.Id_Utente as Id_Utente,a.Id_Prodotto AS Id_Prodotto, a.quantità AS quantità, p.nome AS nome, "
		+ "p.nvol AS nvol, p.src_image AS src_image, a.prezzo AS prezzo "
		+ "FROM acquisti AS a JOIN prodotti AS p ON a.Id_Prodotto = p.Id_Prodotto "
		+ "WHERE a.Id_Acquisto = "+Id_Acquisto;
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		if (err) 
			return;
		if (result.length > 0) {
			res.json(result);
		}
		else { 
			var myjson = [{"Id_Prodotto":"-1"}];
			res.json(myjson);
		}
	});
	connection.end();
}


function inserisciRecapito(req, res) {
	console.log("funzione inerisciRecapito");
	var Id_Utente = req.body.Id_Utente;
	var ncivico = req.body.ncivico;
	var via = req.body.via;
	var città = req.body.città;
	var provincia = req.body.provincia;
	var cap = req.body.cap;
	var telefono = req.body.telefono;
	var note = req.body.note;
	var insert = "INSERT INTO recapiti(Id_Utente,ncivico,via,città,provincia,cap,telefono,note) "
		+ "VALUES ("+Id_Utente+",'"+ncivico+"','"+via+"','"+città+"','"+provincia+"',"+cap+",'"+telefono+"','"+note+"')";
	var connection = accessodb();
	connection.query(insert, function(err, result, fields) {
		if (err) 
			return;
		var myjson = [{"state":"true"}];
		res.json(myjson);
	});
	connection.end();
}


function deleteRecapito(req, res) {
	console.log("funzione deleteRecapito");
	var Id_Recapito = req.body.Id_Recapito;
	console.log(Id_Recapito);
	var strquery = "UPDATE recapiti SET stato ='disattivato' WHERE Id_Recapito = "+Id_Recapito;
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		console.log(strquery);
		if (err) 
			return;
		var myjson = [{"state":"true"}];
		res.json(myjson);
	});
	connection.end();
}


function ottieniRecapito(req, res) {
	console.log("funzione ottieniRecapito");
	var Id_Utente = req.body.Id_Utente;
	console.log(Id_Utente);
	var strquery = "SELECT * FROM recapiti WHERE Id_Utente = "+Id_Utente+" AND stato='attivato'";
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		console.log(result);
		if (err) 
			return;
		if (result.length > 0) {
			res.json(result);
		}
		else {
			var myjson = [{"Id_Recapito":"-1"}];
			res.json(myjson);
		}
	});
	connection.end();
}


function ottieniCarrello(req, res) {
	console.log("funzione ottieniCarrello");
	var Id_Utente = req.body.Id_Utente;
	var connection = accessodb();
	console.log(Id_Utente);
	var strquery = "SELECT carrello.*,prodotti.nome as nome, prodotti.nvol as nvol,prodotti.src_image as src_image, prodotti.prezzo as prezzo "+
		"FROM "+
		"carrello JOIN prodotti ON carrello.Id_Prodotto = prodotti.Id_Prodotto "+
		"WHERE carrello.Id_Utente = "+Id_Utente;
	connection.query(strquery, function(err, result, fields) {
		if (err) 
			return;
		console.log(result);
		if (result.length > 0) { //torna il carrello
			res.json(result);
		}
		else { //carrello vuoto
			var myjson = [{"Id_Utente":"-1"}];
			res.json(myjson);
		}
	});
	connection.end();
}


function addMoreVolumes(req, res){
	console.log("funzione addMoreVolumes");
	var Id_Serie = req.body.Id_Serie;
	var num = req.body.num;
	var strquery = "SELECT * FROM prodotti WHERE Id_Serie = "+Id_Serie + " AND nvol >"+num+" LIMIT 10";
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		if (err) 
			return;
		res.json(result);
	});
	connection.end();
}


function getSerie(req, res){
	console.log("funzione getSerie");
	var Id_Serie = req.body.Id_Serie;
	var connection = accessodb();
	var strquery = "SELECT * FROM serie WHERE Id_Serie = "+Id_Serie;
	connection.query(strquery, function(err, result, fields) {
		if (err) 
			return;
		res.json(result);
	});
	connection.end();
}


function insAcquisto(insQ, upQ, delQ, res) {
	console.log("funzione insAcquisto");
	var connection = accessodb();
	connection.query(insQ, function(err, result, fields) {
		if (err) 
			return;
		upAcquisto(upQ, delQ,res);
	});
	connection.end();
}


function upAcquisto(upQ, delQ, res) {
	console.log("funzione upAcquisto");
	var connection = accessodb();
	connection.query(upQ, function(err, result, fields) {
		if (err) 
			return;
		svuotaCarrello(delQ, res);
	});
	connection.end();
}


function svuotaCarrello(delQ, res) {
	console.log("funzione svuotaCarrello");
	var connection = accessodb();
	connection.query(delQ, function(err, result, fields) {
		if (err) 
			return;
		var myjson = [{"state":"true"}];
		res.json(myjson);
	});
	connection.end();
}


function aggiungiAcquisto(req, res) {
	console.log("funzione aggiungiAcquisto");
	var Id_Utente = req.body.Id_Utente;
	var Id_Recapito = req.body.Id_Recapito;
	console.log(Id_Utente);
	console.log(Id_Recapito);
	var checkQ = "SELECT COUNT(*) AS totc FROM carrello WHERE Id_Utente = "+Id_Utente;
	var querySel = "SELECT carrello.Id_Prodotto AS prod, carrello.quantità AS qty, (prodotti.prezzo * carrello.quantità) AS prezzo " + 
		"FROM carrello JOIN prodotti ON carrello.Id_Prodotto = prodotti.Id_Prodotto " + 
		"WHERE (carrello.quantità <= prodotti.quantità) AND (carrello.Id_Utente = "+Id_Utente+")";
		
	var insQuery = "INSERT INTO acquisti(Id_Acquisto,Id_Utente,Id_Prodotto,quantità,dataacquisto,prezzo,Id_Recapito) VALUES ";
	
	var upQuery = "UPDATE prodotti, carrello SET prodotti.quantità = prodotti.quantità - " +
				"(SELECT carrello.quantità FROM carrello WHERE carrello.Id_Prodotto = prodotti.Id_Prodotto AND carrello.Id_Utente = "+Id_Utente+
				") WHERE carrello.Id_Prodotto = prodotti.Id_Prodotto AND carrello.Id_Utente = "+Id_Utente;
	var query2 = "";
	var delQuery = "DELETE FROM carrello WHERE Id_Utente ="+ Id_Utente;
	var connection0 = accessodb();
	var connection = accessodb();
	connection0.query(checkQ, function(err, result0, fields) {
		if (err) 
			return;
		connection.query(querySel, function(err, result, fields) {
			if (err) 
				return;
			if (result0[0].totc == result.length && result.length > 0) {
				id_acq++;
				for (var i in result) {
					query2 = query2 + "("+id_acq+","+Id_Utente+","+result[i].prod+","+result[i].qty+",CURRENT_DATE,"+result[i].prezzo+","+Id_Recapito+"),";
				}
				insQuery = insQuery + query2;
				var iq = insQuery.substr(0, insQuery.length - 1);
				insAcquisto(iq, upQuery, delQuery, res);
			}
			else { //i prodotti nel carrello non sono tutti disponibili
				var myjson = [{"state":"false"}];
				res.json(myjson);
			}
		});
		connection.end();
	});
	connection0.end();
}


function deleteProdottoCarrello(req, res) {
	console.log("funzione deleteProdottoCarrello");
	var Id_Prodotto = req.body.Id_Prodotto;
	var Id_Utente = req.body.Id_Utente;
	var strquery = "DELETE FROM carrello WHERE Id_Prodotto =" + Id_Prodotto +" AND Id_Utente ="+ Id_Utente;
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) { //cancella il prodotto dal carrrello dell'utente
		if (err)
			return;
		var myjson = [{ "state":"true"}];
		res.json(myjson);
	});
	connection.end();
}	


function unIncrementoProdottoCarrello(req, res) {
	console.log("funzione unIncrementoProdottoCarrello");
	var Id_Utente = req.body.Id_Utente;
	var Id_Prodotto = req.body.Id_Prodotto;
	var sign = req.body.sign;
	var strquery;
	console.log(sign);
	if(sign == "+"){
		strquery = "UPDATE carrello SET quantità = (quantità + 1) WHERE Id_Utente ="+ Id_Utente +" AND Id_Prodotto =" + Id_Prodotto;
	}
	else if(sign == "-"){
		strquery = "UPDATE carrello SET quantità = (quantità - 1) WHERE Id_Utente ="+ Id_Utente +" AND Id_Prodotto =" + Id_Prodotto;
	}
	else{   //Clicca più volte il pulsante aggiungi al carrello, ma non succede nulla se il prodotto è già presente nel carrello.
		var myjson = [{"state":"false"}];
		res.json(myjson);
		return;
	}
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) { //incrementa/diminuisce la quantita di un'unita del prodotto nel carrello
		if (err)
			return;
		var myjson = [{"state":"true"}];
		res.json(myjson);
	});
	connection.end();
}


function aggiungiAlCarrello(req, res) {
	console.log("funzione aggiungiAlCarrello");
	var Id_Utente = req.body.Id_Utente;
	var Id_Prodotto = req.body.Id_Prodotto;
	var connection = accessodb();
	var strquery = "INSERT INTO carrello VALUES("+ Id_Utente +","+ Id_Prodotto +",1)";
	connection.query(strquery, function(err, result, fields) { //inserisce il prodotto nel carrello
		if (err)
			return;
		var myjson = [{"state":"true"}];
		res.json(myjson);
	});
	connection.end();
}


function verificaAddProdottoCarrello(req, res) {
	console.log("funzione verificaAddProdottoCarrello");
	var Id_Utente = req.body.Id_Utente;
	var Id_Prodotto = req.body.Id_Prodotto;
	var strquery = "SELECT * FROM prodotti WHERE Id_Prodotto =" + Id_Prodotto +" AND stato ='disponibile' AND quantità > 0";
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) { //verifica disponibilità prodotto
		if (err)
			return;
		console.log(result);
		if (result.length > 0) { //prodotto disponibile
			var strquery2 = "SELECT * FROM carrello WHERE Id_Utente ="+ Id_Utente +" AND Id_Prodotto =" + Id_Prodotto;
			var connection2 = accessodb();
			connection2.query(strquery2, function(err, result, fields) { //verifica se già nel carrello
				if (err)
					return;
				if (result.length > 0) { //se si incrementa di un'unità
					unIncrementoProdottoCarrello(req, res);
					return;
				}
				else { //se no aggiunge un'unità
					aggiungiAlCarrello(req, res);
					return;
				}
			});
			connection2.end();
		} 
		else { //prodotto non diponibile
			var myjson = [{"state":"false"}];
			res.json(myjson);
		}
	});
	connection.end();
}


function getUtente(req, res) {
	console.log("funzione getUtente");
	var Id_Utente = req.body.Id_Utente;
	var strquery = "SELECT * FROM utenti WHERE Id_Utente = "+ Id_Utente;
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		if (err)
			return;
		res.json(result);
	});
	connection.end();
}


function get5Prodotti(req, res){
	console.log("funzione get5Prodotti");
	var opt = req.body.opzione;
	if(opt == "ultimeuscite"){
		var strquery = "SELECT * FROM prodotti ORDER BY datapubblicazione DESC LIMIT 5";
	}
	else{
		var strquery = "SELECT p.* FROM prodotti AS p JOIN acquisti AS a on p.Id_Prodotto = a.Id_Prodotto GROUP BY Id_Prodotto ORDER BY SUM(a.quantità) DESC LIMIT 5";
	}
	var connection = accessodb();
	connection.query(strquery, function(err, result, fields) {
		if (err)
			return;
		res.json(result);
	});
	connection.end();
}


function trovaUtente(req, res, opt){
    console.log("funzione trovaUtente");
    var email = req.body.email;
    var passwd = req.body.passwd;
    var hashpasswd = hashFunction(passwd);
    var strquery;
    if(opt == "registrati"){
        strquery = "SELECT * FROM utenti WHERE email ='"+ email +"'";
    }
    else{
        strquery = "SELECT * FROM utenti WHERE email ='"+ email +"' AND password ='" + hashpasswd + "'";
    }

    var connection = accessodb();
    connection.query(strquery, function(err, result, fields) {
        if (err)
            return;
        console.log(result);
        if (result.length > 0) { //l'utente esiste
            if (opt == "accedi") { //accedi
                res.json(result);
            }
            else { //registrati, ma la email è già usata
                var myjson = [{"Id_Utente":"-1"}];
                res.json(myjson); 
            }
        }
        else { //l'utente non esiste
            if (opt == "accedi") { //accedi, ma l'utente non esiste
                var myjson = [{ "Id_Utente":"-1"}];
                res.json(myjson); 
            }
            else { //registrati
                var nome = req.body.nome;
                var cognome = req.body.cognome;
                var connection2 = accessodb();
                var registerQuery = "INSERT INTO utenti(nome,cognome,email,password) VALUES('"+nome+"','"+cognome+"','"+email+"','"+hashpasswd+"')";
                connection2.query(registerQuery, function(err, result, fields) {
                    if (err)
                        return;
                    trovaUtente(req, res, "accedi"); //per tornare l'utente 
                });
                connection2.end();
            }
        }
    });
    connection.end();
}

// Funzione per gestire l'autenticazione e la registrazione degli utenti
function accediRegistrati(req, res){
	console.log("funzione accediRegistrati");
	var opt = req.body.opzione;
	trovaUtente(req, res, opt);
}