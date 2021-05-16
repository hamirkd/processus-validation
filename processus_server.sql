-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 03 mai 2021 à 14:59
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `processus_server`
--

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

CREATE TABLE `demandes` (
  `id` bigint(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `etatdirecteur` varchar(255) DEFAULT NULL,
  `etatmanager` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `demandeur_id` bigint(20) DEFAULT NULL,
  `directeur_id` bigint(20) DEFAULT NULL,
  `direction_id` bigint(20) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `demandes` (`id`, `created_on`, `description`, `etat`, `etatdirecteur`, `etatmanager`, `updated_at`, `demandeur_id`, `directeur_id`, `direction_id`, `manager_id`) VALUES
(13, '2021-05-03 08:32:25', 'Ordinateur de bureau core i7\nPapier RAM 500', 'ACCEPTER', 'ACCEPTER', 'ACCEPTER', '2021-05-03 08:32:25', 12, 6, 1, 9),
(14, '2021-05-03 08:56:06', 'BATTERIE ORDINATEUR PORTABLE\nCHAISE DE BUREAU\nFAUTEUIL', 'ENCOURS', 'ENCOURS', 'ENCOURS', '2021-05-03 08:56:06', 12, 6, 1, 9);

-- --------------------------------------------------------

--
-- Structure de la table `directions`
--

CREATE TABLE `directions` (
  `id` bigint(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `directions`
--

INSERT INTO `directions` (`id`, `created_on`, `nom`, `updated_at`) VALUES
(1, '2021-05-03 10:51:48', 'TECHNIQUE', '2021-05-03 10:51:48'),
(2, '2021-05-03 10:51:48', 'MARKETING', '2021-05-03 10:51:48');

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(15),
(15),
(15);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `matricule` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `poste` varchar(20) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `directeur_id` bigint(20) DEFAULT NULL,
  `direction_id` bigint(20) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `created_on`, `email`, `matricule`, `nom`, `password`, `poste`, `prenom`, `updated_at`, `directeur_id`, `direction_id`, `manager_id`) VALUES
(6, '2021-05-03 05:31:29', 'directeur@gmail.com', '123', 'Souley', 'directeur@gmail.com', 'DIRECTEUR', 'Moussa', '2021-05-03 05:31:29', NULL, 1, NULL),
(9, '2021-05-03 05:33:32', 'manager@gmail.com', '33372', 'A.Kader', 'manager@gmail.com', 'MANAGER', 'Boubacar', '2021-05-03 05:33:32', 6, 1, NULL),
(12, '2021-05-03 05:38:53', 'employe@gmail.com', 'BF002', 'Alio', 'employe@gmail.com', 'EMPLOYE', 'Mahamadou', '2021-05-03 05:38:53', 6, 1, 9);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1e28c32u5wa1ipie70q51iyt2` (`demandeur_id`),
  ADD KEY `FK2y98xqb7igdp5jf5oacf0cr9j` (`directeur_id`),
  ADD KEY `FKa1pmoxgyiunqlyj87q4cc1ncm` (`direction_id`),
  ADD KEY `FKbqcvn56b7rk5ss5467iyn050f` (`manager_id`);

--
-- Index pour la table `directions`
--
ALTER TABLE `directions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD UNIQUE KEY `UK_t42bifyr7853ef7frriy402wg` (`matricule`),
  ADD KEY `FKkbb9ek3k3aqconkeyi5msv38o` (`directeur_id`),
  ADD KEY `FKs1he4pwgukx80jfqh7j6mqugq` (`direction_id`),
  ADD KEY `FK5p1ci5btqfwvtaqx5n2wxi182` (`manager_id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD CONSTRAINT `FK1e28c32u5wa1ipie70q51iyt2` FOREIGN KEY (`demandeur_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FK2y98xqb7igdp5jf5oacf0cr9j` FOREIGN KEY (`directeur_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKa1pmoxgyiunqlyj87q4cc1ncm` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`),
  ADD CONSTRAINT `FKbqcvn56b7rk5ss5467iyn050f` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK5p1ci5btqfwvtaqx5n2wxi182` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKkbb9ek3k3aqconkeyi5msv38o` FOREIGN KEY (`directeur_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKs1he4pwgukx80jfqh7j6mqugq` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
