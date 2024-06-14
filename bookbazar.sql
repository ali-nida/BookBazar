-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 26, 2024 alle 18:55
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookbazar`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `acquisti`
--

CREATE TABLE `acquisti` (
  `Id_Acquisto` int(11) NOT NULL,
  `Id_Utente` int(11) DEFAULT NULL,
  `Id_Prodotto` int(11) NOT NULL,
  `quantità` int(11) DEFAULT NULL,
  `dataacquisto` date DEFAULT NULL,
  `prezzo` double DEFAULT NULL,
  `Id_Recapito` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `acquisti`
--

INSERT INTO `acquisti` (`Id_Acquisto`, `Id_Utente`, `Id_Prodotto`, `quantità`, `dataacquisto`, `prezzo`, `Id_Recapito`) VALUES
(1, 2, 3, 2, '2023-03-11', 20, 1),
(1, 2, 24, 2, '2023-03-11', 20, 1),
(1, 2, 78, 11, '2023-03-11', 20, 1),
(2, 3, 42, 10, '2023-03-11', 20, 2),
(2, 3, 184, 10, '2023-03-11', 20, 2),
(3, 21, 2, 1, '2024-04-20', 19.99, 11),
(4, 21, 11, 1, '2024-04-22', 17.99, 11),
(5, 21, 11, 1, '2024-04-22', 17.99, 11),
(6, 21, 11, 1, '2024-04-24', 17.99, 11),
(7, 21, 3, 1, '2024-04-24', 22.5, 11),
(8, 21, 11, 1, '2024-04-24', 17.99, 11),
(9, 21, 11, 1, '2024-04-24', 17.99, 11),
(10, 21, 2, 1, '2024-04-24', 19.99, 11),
(11, 21, 1, 1, '2024-04-26', 25.99, 11),
(11, 21, 11, 1, '2024-04-26', 17.99, 11),
(12, 21, 2, 1, '2024-04-26', 19.99, 11),
(13, 21, 3, 1, '2024-04-26', 22.5, 11),
(14, 21, 11, 1, '2024-04-26', 17.99, 11),
(15, 21, 16, 1, '2024-04-26', 12.99, 11),
(16, 21, 11, 1, '2024-04-26', 17.99, 11),
(17, 21, 1, 1, '2024-04-26', 25.99, 11),
(18, 21, 16, 1, '2024-04-27', 12.99, 11),
(19, 20, 2, 4, '2024-04-27', 79.96, 13),
(19, 20, 3, 2, '2024-04-27', 45, 13);

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `Id_Utente` int(11) NOT NULL,
  `Id_Prodotto` int(11) NOT NULL,
  `quantità` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `carrello`
--

INSERT INTO `carrello` (`Id_Utente`, `Id_Prodotto`, `quantità`) VALUES
(20, 16, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `prodotti`
--

CREATE TABLE `prodotti` (
  `Id_Prodotto` int(11) NOT NULL,
  `Id_Serie` int(11) DEFAULT NULL,
  `nome` varchar(1000) DEFAULT NULL,
  `nvol` int(11) DEFAULT NULL,
  `stato` varchar(20) DEFAULT NULL CHECK (`stato` in ('disponibile','nondisponibile')),
  `quantità` int(11) DEFAULT NULL,
  `datapubblicazione` date DEFAULT NULL,
  `descrizione` varchar(5000) DEFAULT NULL,
  `src_image` varchar(1000) DEFAULT NULL,
  `prezzo` double NOT NULL DEFAULT 5.1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `prodotti`
--

INSERT INTO `prodotti` (`Id_Prodotto`, `Id_Serie`, `nome`, `nvol`, `stato`, `quantità`, `datapubblicazione`, `descrizione`, `src_image`, `prezzo`) VALUES
(1, 1, 'Il Signore degli Anelli', 3, 'disponibile', 48, '1954-07-29', 'Il classico epico fantasy di J.R.R. Tolkien che narra delle avventure di Frodo Baggins nell\'Anello del Potere.', 'signore degli anelli.jpg', 25.99),
(2, 2, 'Harry Potter e la Pietra Filosofale', 2, 'disponibile', 93, '1997-06-26', 'Il primo libro della serie di Harry Potter, che racconta le sue avventure nel Mondo Magico.', 'Harry Potter e la Pietra Filosofale.jpeg', 19.99),
(3, 3, 'Cronache del ghiaccio e del fuoco: Il Trono di Spade', 3, 'disponibile', 43, '1996-08-06', 'Il primo libro della saga epica di George R.R. Martin, piena di intrighi politici, guerre e draghi.', 'Il Trono di Spade.jpeg', 22.5),
(4, 4, '1984', 1, 'disponibile', 50, '1949-06-08', 'Il romanzo distopico di George Orwell che dipinge un futuro cupo e totalitario.', '1984.jpg', 15.99),
(5, 5, 'Orgoglio e Pregiudizio', 1, 'disponibile', 47, '1813-01-28', 'Il classico di Jane Austen che narra le vicende della famiglia Bennet nel contesto della società inglese del XIX secolo.', 'Orgoglio e Pregiudizio.jpg', 12.99),
(6, 6, 'Il Piccolo Principe', 2, 'disponibile', 50, '1943-04-06', 'Il celebre racconto di Antoine de Saint-Exupéry che racconta l\'incontro tra un pilota e un piccolo principe proveniente da un altro pianeta.', 'Il Piccolo Principe.jpg', 10.5),
(7, 7, 'Le Cronache di Narnia: Il Leone, la Strega e l\'Armadio', 1, 'disponibile', 50, '1950-10-16', 'Il primo libro della serie fantasy di C.S. Lewis che narra le avventure dei fratelli Pevensie nel magico mondo di Narnia.', 'Le Cronache di Narnia.jpg', 18.99),
(8, 8, 'Moby Dick', 2, 'disponibile', 55, '1851-10-18', 'Il romanzo di Herman Melville che narra la caccia al leggendario capodoglio bianco da parte del capitano Ahab.', 'moby dick.jpg', 16.99),
(9, 9, 'Il Grande Gatsby', 3, 'disponibile', 65, '1925-04-10', 'Il romanzo di F. Scott Fitzgerald che racconta la storia del misterioso milionario Jay Gatsby durante gli anni del proibizionismo.', 'Il Grande Gatsby.jpg', 14.5),
(10, 10, 'Anna Karenina', 1, 'disponibile', 60, '1877-12-02', 'Il romanzo di Lev Tolstoj che narra la storia tragica di Anna Karenina, una donna dell\'alta società russa.\n', 'Anna Karenina.jpg', 13.99),
(11, 11, 'Il Cacciatore di Aquiloni', 5, 'disponibile', 62, '2003-05-29', 'Il romanzo di Khaled Hosseini che racconta l\'amicizia tra due ragazzi in Afghanistan e le loro vite intrecciate.', 'Il Cacciatore di Aquiloni.jpg', 17.99),
(12, 12, 'Don Chisciotte della Mancia', 2, 'disponibile', 45, '1605-11-25', ' Il romanzo di Miguel de Cervantes che narra le avventure del cavaliere errante Don Chisciotte e del suo scudiero Sancho Panza.', 'Don Chisciotte della Mancia.jpg', 20.5),
(13, 13, 'Lo Hobbit', 3, 'disponibile', 80, '1937-09-21', 'Il romanzo di J.R.R. Tolkien che narra le avventure del giovane hobbit Bilbo Baggins.', 'Lo Hobbit.jpg', 14.99),
(14, 14, 'Crime and Punishment', 1, 'disponibile', 55, '1866-01-01', 'Il romanzo di Fëdor Dostoevskij che esplora le profondità della mente umana ', 'Crime and Punishment.jpg', 5.1),
(15, 15, 'Lo Straniero', 2, 'disponibile', 50, '1942-01-01', 'Il romanzo di Albert Camus che segue la storia di Meursault, un uomo distaccato dalla società.', 'Lo Straniero.jpg', 13.5),
(16, 16, 'Piccole Donne', 3, 'disponibile', 68, '1969-01-01', 'Il romanzo di Louisa May Alcott che narra le vicende delle sorelle March durante la guerra civile americana.', 'Piccole Donne.jpg', 12.99),
(17, 17, 'Le Avventure di Sherlock Holmes', 3, 'disponibile', 65, '1892-01-01', 'La raccolta di storie investigative di Arthur Conan Doyle che seguono le gesta del celebre detective Sherlock Holmes.', 'Le Avventure di Sherlock Holmes.jpg', 15.99),
(18, 18, 'Frankenstein', 4, 'disponibile', 60, '1818-01-01', 'Il romanzo gotico di Mary Shelley che narra la storia del dottor Frankenstein e della sua creatura.', 'Frankenstein.jpg', 14.5),
(19, 19, 'Il Conte di Montecristo', 4, 'disponibile', 40, '1844-01-01', 'Il romanzo di Alexandre Dumas che narra la vendetta del giovane Edmond Dantès contro coloro che lo hanno tradito.', 'Il Conte di Montecristo.jpg', 21.99),
(20, 20, 'Guerra e Pace', 5, 'disponibile', 35, '1869-01-01', 'Il romanzo di Lev Tolstoj che narra le vicende di diverse famiglie aristocratiche russe durante le guerre napoleoniche.', 'Guerra e Pace.jpg', 26.5);

-- --------------------------------------------------------

--
-- Struttura della tabella `recapiti`
--

CREATE TABLE `recapiti` (
  `Id_Recapito` int(11) NOT NULL,
  `Id_Utente` int(11) DEFAULT NULL,
  `ncivico` varchar(10) DEFAULT NULL,
  `via` varchar(1000) DEFAULT NULL,
  `città` varchar(1000) DEFAULT NULL,
  `provincia` varchar(1000) DEFAULT NULL,
  `cap` int(11) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `note` varchar(5000) DEFAULT NULL,
  `stato` varchar(20) NOT NULL DEFAULT 'attivato'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `recapiti`
--

INSERT INTO `recapiti` (`Id_Recapito`, `Id_Utente`, `ncivico`, `via`, `città`, `provincia`, `cap`, `telefono`, `note`, `stato`) VALUES
(1, 2, '5', 'Via circonvallazione', 'Parma', 'PR', 43125, '3203232032', 'Lasciare il pacco al vicino di casa', 'attivato'),
(2, 3, '8', 'Via mentana', 'Siracusa', 'SR', 96078, '3203232032', 'Citofonare a Karim', 'attivato'),
(11, 21, '2', 'via pintor', 'parma', 'PR', 43122, '3203232032', 'primo piano', 'attivato'),
(12, 21, '2', 'marzapane', 'pompei', 'NA', 42156, '3513235132', 'Nessuna nota.', 'attivato'),
(13, 20, '2', 'fontana', 'calcutta', 'RE', 45216, '3213232132', 'Nessuna nota.', 'attivato');

-- --------------------------------------------------------

--
-- Struttura della tabella `serie`
--

CREATE TABLE `serie` (
  `Id_Serie` int(11) NOT NULL,
  `nome` varchar(1000) DEFAULT NULL,
  `volumitotali` int(11) DEFAULT NULL,
  `stato` varchar(10) DEFAULT NULL CHECK (`stato` in ('completa','incorso'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `serie`
--

INSERT INTO `serie` (`Id_Serie`, `nome`, `volumitotali`, `stato`) VALUES
(1, 'Il signore degli Anelli', 3, 'completa'),
(2, 'Harry Potter e la Pietra Filosofale', 2, 'incorso'),
(3, 'Cronache del ghiaccio e del fuoco: Il Trono di Spade', 3, 'incorso'),
(4, '1984', 1, 'incorso'),
(5, 'Orgoglio e Pregiudizio', 1, 'completa'),
(6, 'Il Piccolo Principe', 2, 'incorso'),
(7, 'Le Cronache di Narnia: Il Leone, la Strega e l\'Armadio', 1, 'incorso'),
(9, 'Il Grande Gatsby', 3, 'incorso');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `Id_Utente` int(11) NOT NULL,
  `nome` varchar(500) DEFAULT NULL,
  `cognome` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `ruolo` varchar(5) DEFAULT 'user' CHECK (`ruolo` in ('user','admin'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`Id_Utente`, `nome`, `cognome`, `email`, `password`, `ruolo`) VALUES
(19, 'silvio', 'ronca', 'silvioronca@gmail.com', '1638accfe846067c88dc8b7c25dc5fcfcb54817b2eb5778a4cb7ae14b11707a0', 'user'),
(20, 'nida', 'ali', 'nida.ali@gmail.com', '5e0fb1717e6f1190a94a44e83980ee133257a15e456e4ab04bd3b2a8171c3619', 'admin'),
(21, 'Oliviero', 'Tosini', 'olly@gmail.com', '5e0fb1717e6f1190a94a44e83980ee133257a15e456e4ab04bd3b2a8171c3619', 'user'),
(22, 'pinco', 'pallino', 'pincopallo@gmail.com', '5e0fb1717e6f1190a94a44e83980ee133257a15e456e4ab04bd3b2a8171c3619', 'user');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `acquisti`
--
ALTER TABLE `acquisti`
  ADD PRIMARY KEY (`Id_Acquisto`,`Id_Prodotto`),
  ADD KEY `Id_Utente` (`Id_Utente`),
  ADD KEY `Id_Prodotto` (`Id_Prodotto`),
  ADD KEY `idrecapitoutente` (`Id_Recapito`);

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD PRIMARY KEY (`Id_Utente`,`Id_Prodotto`),
  ADD KEY `Id_Prodotto` (`Id_Prodotto`);

--
-- Indici per le tabelle `prodotti`
--
ALTER TABLE `prodotti`
  ADD PRIMARY KEY (`Id_Prodotto`),
  ADD KEY `Id_Serie` (`Id_Serie`);

--
-- Indici per le tabelle `recapiti`
--
ALTER TABLE `recapiti`
  ADD PRIMARY KEY (`Id_Recapito`),
  ADD KEY `Id_Utente` (`Id_Utente`);

--
-- Indici per le tabelle `serie`
--
ALTER TABLE `serie`
  ADD PRIMARY KEY (`Id_Serie`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`Id_Utente`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `acquisti`
--
ALTER TABLE `acquisti`
  MODIFY `Id_Acquisto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT per la tabella `prodotti`
--
ALTER TABLE `prodotti`
  MODIFY `Id_Prodotto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

--
-- AUTO_INCREMENT per la tabella `recapiti`
--
ALTER TABLE `recapiti`
  MODIFY `Id_Recapito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT per la tabella `serie`
--
ALTER TABLE `serie`
  MODIFY `Id_Serie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `Id_Utente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
