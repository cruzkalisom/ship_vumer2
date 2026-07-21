-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.37 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.20.0.7320
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para ship_vumer
CREATE DATABASE IF NOT EXISTS `ship_vumer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ship_vumer`;

-- Copiando estrutura para tabela ship_vumer.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela ship_vumer.sessions: ~1 rows (aproximadamente)
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('bbGfCXMcDij1o2Ydm8NjgoLp9Y2ZwHmp', 1787258585, '{"cookie":{"originalMaxAge":2592000000,"expires":"2026-08-20T20:43:04.673Z","httpOnly":true,"path":"/"},"token":1,"user_id":1,"oldPage":"/admin"}');

-- Copiando estrutura para tabela ship_vumer.user_sessions
CREATE TABLE IF NOT EXISTS `user_sessions` (
  `token` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0',
  `remember` tinyint(1) NOT NULL DEFAULT '0',
  `last_login` datetime NOT NULL DEFAULT '2026-07-21 00:00:00',
  PRIMARY KEY (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela ship_vumer.user_sessions: ~1 rows (aproximadamente)
INSERT INTO `user_sessions` (`token`, `user_id`, `remember`, `last_login`) VALUES
	(1, 1, 0, '2026-07-21 17:07:58');

-- Copiando estrutura para tabela ship_vumer.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL DEFAULT 'Sem nome',
  `email` varchar(500) NOT NULL DEFAULT 'sem@email',
  `password` varchar(500) NOT NULL DEFAULT 'semsenha',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela ship_vumer.users: ~1 rows (aproximadamente)
INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
	(1, 'Kalisom Cruz', 'kalisom.cruz@vumer.com.br', '$2b$10$Yq9gZSvoYDwrSz0Av/8Bv.9vSYWPbDNyr152KG3jexIcOHrRYGnuy');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
