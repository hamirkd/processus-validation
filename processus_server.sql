-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  Dim 16 mai 2021 à 10:11
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `processus_server`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `demandes` (`id`, `created_on`, `description`, `etat`, `etatdirecteur`, `etatmanager`, `updated_at`, `demandeur_id`, `directeur_id`, `direction_id`, `manager_id`) VALUES
(18, '2021-05-11 07:28:53', 'xzcxzcaasa', 'ENCOURS', 'ENCOURS', 'ENCOURS', '2021-05-11 07:28:53', 943843, 1302338, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `departements`
--

CREATE TABLE `departements` (
  `id` bigint(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `departements`
--

INSERT INTO `departements` (`id`, `created_on`, `nom`, `updated_at`) VALUES
(1, '2021-05-03 05:31:29', 'Operation IT', '2021-05-03 05:31:29');

-- --------------------------------------------------------

--
-- Structure de la table `directions`
--

CREATE TABLE `directions` (
  `id` bigint(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `directions`
--

INSERT INTO `directions` (`id`, `created_on`, `nom`, `updated_at`) VALUES
(1, '2021-05-03 10:51:48', 'IT', '2021-05-03 10:51:48'),
(2, '2021-05-03 10:51:48', 'MARKETING', '2021-05-03 10:51:48'),
(3, '2021-05-03 10:51:48', 'NETWORK', '2021-05-03 10:51:48'),
(4, '2021-05-03 10:51:48', 'SALES', '2021-05-03 10:51:48');

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(22),
(22),
(22);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `matricule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `departement_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nationalite` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `poste` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `directeur_id` bigint(20) DEFAULT NULL,
  `direction_id` bigint(20) DEFAULT NULL,
  `interim_id` bigint(20) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  `superviseur_id` bigint(20) DEFAULT NULL,
  `email_superviseur` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adminstrateur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `created_on`, `matricule`, `email`, `nom`, `password`, `departement_id`, `nationalite`, `poste`, `prenom`, `updated_at`, `directeur_id`, `direction_id`, `interim_id`, `manager_id`, `superviseur_id`, `email_superviseur`, `adminstrateur_id`) VALUES
(101, '2021-05-03 05:31:29', '1212', 'admin@gmail.com', 'Alio', 'admin@gmail.com', NULL, 'Nigerien', 'ADMINISTRATEUR', 'Ibrahim', '2021-05-03 10:51:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(943843, '2021-05-03 05:31:29', '60', 'employe@gmail.com', '', 'employe@gmail.com', NULL, NULL, 'EMPLOYE', 'Issaka', '2021-05-03 10:51:48', 1302338, 1, NULL, NULL, NULL, NULL, NULL),
(1302338, '2021-05-03 05:31:29', NULL, 'directeur@gmail.com', 'Alio', 'directeur@gmail.com', NULL, 'Niger', 'DIRECTEUR', NULL, '2021-05-03 10:51:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
-- Index pour la table `departements`
--
ALTER TABLE `departements`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `FK5p1ci5btqfwvtaqx5n2wxi182` (`manager_id`),
  ADD KEY `FK57r79996qvjdi9a47hvdcdeyo` (`adminstrateur_id`);

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
  ADD CONSTRAINT `FK57r79996qvjdi9a47hvdcdeyo` FOREIGN KEY (`adminstrateur_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FK5p1ci5btqfwvtaqx5n2wxi182` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKkbb9ek3k3aqconkeyi5msv38o` FOREIGN KEY (`directeur_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKs1he4pwgukx80jfqh7j6mqugq` FOREIGN KEY (`direction_id`) REFERENCES `directions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
