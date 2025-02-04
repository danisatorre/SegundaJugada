DROP DATABASE IF EXISTS `online_shop`;

create database online_shop;
use online_shop;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- USUARIOS

DROP TABLE IF EXISTS users;

CREATE TABLE `users`(
    `id_user` int(20) UNSIGNED NOT NULL,
    `username` varchar(50) NOT NULL,
    `pwd` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `img_perfil` varchar(255) NOT NULL,
    `dir` varchar(100) NOT NULL,
    `sexo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users`(`id_user`, `username`, `pwd`, `email`, `img_perfil`, `dir`, `sexo`) VALUES
(1, 'user1', 'user1pwd', 'user1@gmail.com', 'img1.jpg', 'dir1', 'masculino'),
(2, 'user2', 'user2pwd', 'user2@gmail.com', 'img2.jpg', 'dir2', 'femenino'),
(3, 'user3', 'user3pwd', 'user3@gmail.com', 'img3.jpg', 'dir3', 'femenino'),
(4, 'user4', 'user4pwd', 'user4@gmail.com', 'img4.jpg', 'dir4', 'masculino'),
(5, 'user5', 'user5pwd', 'user5@gmail.com', 'img5.jpg', 'dir5', 'masculino');

-- DIRECCION

DROP TABLE IF EXISTS direccion;

CREATE TABLE `direccion`(
    `id_dir` int(20) UNSIGNED NOT NULL,
    `ciudad` varchar(50) NOT NULL,
    `calle` varchar(50) NOT NULL,
    `pais` varchar(50) NOT NULL,
    `cp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `direccion`(`id_dir`, `ciudad`, `calle`, `pais`, `cp`) VALUES
(1, 'ciudad1', 'calle1', 'pais1', 'cp1'),
(2, 'ciudad2', 'calle2', 'pais2', 'cp2'),
(3, 'ciudad3', 'calle3', 'pais3', 'cp3'),
(4, 'ciudad4', 'calle4', 'pais4', 'cp4'),
(5, 'ciudad5', 'calle5', 'pais5', 'cp5');

-- FAVORITOS

DROP TABLE IF EXISTS favoritos;

CREATE TABLE `favoritos`(
    `id_fav` int(20) UNSIGNED NOT NULL,
    `user_fav` int(20) UNSIGNED NOT NULL,
    `producto_fav` int(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `favoritos`(`id_fav`, `user_fav`, `producto_fav`) VALUES
(1, 1, 1),
(2, 4, 2),
(3, 2, 3),
(4, 3, 4),
(5, 1, 5);

-- COMPRAS

DROP TABLE IF EXISTS compras;

CREATE TABLE `compras`(
    `id_compra` int(20) UNSIGNED NOT NULL,
    `user_compra` int(20) UNSIGNED NOT NULL,
    `producto_compra` int(20) UNSIGNED NOT NULL,
    `fecha_compra` varchar(10) NOT NULL,
    `unidades` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `compras`(`id_compra`, `user_compra`, `producto_compra`, `fecha_compra`, `unidades`) VALUES
(1, 1, 1, '01/01/2021', 1),
(2, 5, 2, '01/01/2021', 1),
(3, 2, 3, '01/01/2021', 1),
(4, 3, 4, '01/01/2021', 1),
(5, 5, 5, '01/01/2021', 1);

-- CARRITO

DROP TABLE IF EXISTS carrito;

CREATE TABLE `carrito`(
    `id_carrito` int(20) UNSIGNED NOT NULL,
    `user_carrito` int(20) UNSIGNED NOT NULL,
    `producto_carrito` int(20) UNSIGNED NOT NULL,
    `cantidad_carrito` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `carrito` (`id_carrito`, `user_carrito`, `producto_carrito`, `cantidad_carrito`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 4),
(4, 4, 4, 2),
(5, 5, 5, 1);

-- PRODUCTOS

DROP TABLE IF EXISTS productos;

CREATE TABLE `productos`(
    `id_producto` int(20) UNSIGNED NOT NULL,
    `id_vendedor` int(20) UNSIGNED NOT NULL,
    `marca` int(50) UNSIGNED NOT NULL,
    `categoria` int(20) UNSIGNED NOT NULL,
    `tipo` int(20) UNSIGNED NOT NULL,
    `nom_prod` varchar(40) NOT NULL,
    `sexo_prod` varchar(20) NOT NULL,
    `talla` varchar(10) NOT NULL,
    `entrega` varchar(40) NOT NULL,
    `oferta` varchar(3) NOT NULL,
    `descripcion` varchar(1000) NOT NULL,
    `condicion` varchar(20) NOT NULL,
    `stock` int(50) NOT NULL,
    `precio` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `productos` (`id_producto`, `id_vendedor`, `marca`, `categoria`, `tipo`, `nom_prod`, `sexo_prod`, `talla`, `entrega`, `oferta`, `descripcion`, `condicion`, `stock`, `precio`) VALUES
(1, 1, 1, 1, 1, 'producto1', 'masculino', 'M', 'persona', 'no', 'descripcion1', 'nuevo', 3, 10),
(2, 2, 2, 2, 2, 'producto2', 'femenino', 'S', 'domicilio', 'si', 'descripcion2', 'desgastado', 5, 20),
(3, 3, 3, 3, 3, 'producto3', 'femenino', 'L', 'tienda', 'no', 'descripcion3', 'roto', 3, 30),
(4, 4, 4, 1, 4, 'producto4', 'masculino', 'XL', 'persona', 'si', 'descripcion4', 'bueno', 1, 40),
(5, 5, 5, 2, 5, 'producto5', 'masculino', 'M', 'tienda', 'no', 'descripcion5', 'nuevo', 1, 50);

-- PRODUCT IMAGES

DROP TABLE IF EXISTS producto_img;

CREATE TABLE `producto_img`(
    `id_pimg` int(20) UNSIGNED NOT NULL,
    `pimage_producto` int(20) UNSIGNED NOT NULL,
    `pimage_route` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `producto_img` (`id_pimg`, `pimage_producto`, `pimage_route`) VALUES
(1, 1, 'img1.jpg'),
(2, 2, 'img2.jpg'),
(3, 3, 'img3.jpg'),
(4, 4, 'img4.jpg'),
(5, 5, 'img5.jpg');

-- CATEGORIAS

DROP TABLE IF EXISTS categorias;

CREATE TABLE `categorias`(
    `id_categoria` int(20) UNSIGNED NOT NULL,
    `categoria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categorias` (`id_categoria`, `categoria`) VALUES
(1, '5x5'),
(2, '3x3'),
(3, 'solo');

-- TIPO

DROP TABLE IF EXISTS tipo;

CREATE TABLE `tipo`(
    `id_tipo` int(20) UNSIGNED NOT NULL,
    `tipo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tipo` (`id_tipo`, `tipo`) VALUES
(1, 'cancha'),
(2, 'calle'),
(3, 'zapatos'),
(4, 'gorras'),
(5, 'balones'),
(6, 'pantalones'),
(7, 'camisetas'),
(8, 'accesorios'),
(9, 'sudadera'),
(10, 'chaqueta');

-- IMAGES

DROP TABLE IF EXISTS images;

CREATE TABLE `images`(
    `id_image` int(20) UNSIGNED NOT NULL,
    `img_producto` int(20) UNSIGNED NOT NULL,
    `img_route` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `images` (`id_image`, `img_producto`, `img_route`) VALUES
(1, 1, 'img1.jpg'),
(2, 2, 'img2.jpg'),
(3, 3, 'img3.jpg'),
(4, 5, 'img4.jpg'),
(5, 4, 'img5.jpg');

-- RESEÑAS

DROP TABLE IF EXISTS resenas;

CREATE TABLE `resenas`(
    `id_resena` int(20) UNSIGNED NOT NULL,
    `user_resena` int(20) UNSIGNED NOT NULL,
    `producto_resena` int(20) UNSIGNED NOT NULL,
    `puntuacion` int(2) NOT NULL, -- la puntuación va de 0 hasta 50
    `comentario` varchar(500) NOT NULL,
    `fecha_resena` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `resenas` (`id_resena`, `user_resena`, `producto_resena`, `puntuacion`, `comentario`, `fecha_resena`) VALUES
(1, 1, 1, 40, 'El producto me llego en buenas condiciones', '26/10/2024'),
(2, 2, 4, 40, 'El producto me llego en buenas condiciones', '18/07/2024'),
(3, 5, 3, 40, 'El producto me llego en buenas condiciones', '12/01/2025'),
(4, 3, 4, 40, 'El producto me llego en buenas condiciones', '15/01/2025'),
(5, 4, 5, 40, 'El producto me llego en buenas condiciones', '04/11/2024');

-- MARCAS

DROP TABLE IF EXISTS marcas;

CREATE TABLE `marcas`(
    `id_marca` int(20) UNSIGNED NOT NULL,
    `nom_marca` varchar(30) NOT NULL,
    `img_marca` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `marcas` (`id_marca`, `nom_marca`, `img_marca`) VALUES
(1, 'Puma', 'puma.jpg'),
(2, 'Adidas', 'adidas.jpg'),
(3, 'Nike', 'nike.jpg'),
(4, 'Jordan', 'jordan.jpg'),
(5, 'Reebok', 'reebok.jpg'),
(6, 'Luanvi', 'luanvi.jpg'),
(7, 'Spalding', 'spalding.jpg'),
(8, 'Wilson', 'wilson.jpg'),
(9, 'Tenth', 'tenth.jpg'),
(10, 'Joma', 'joma.jpg');

-- DEVOLUCIONES

DROP TABLE IF EXISTS devoluciones;

CREATE TABLE `devoluciones`(
    `id_dev` int(20) UNSIGNED NOT NULL,
    `user_dev` int(20) UNSIGNED NOT NULL,
    `producto_dev` int(20) UNSIGNED NOT NULL,
    `motivo` int(20) UNSIGNED NOT NULL,
    `fecha_solicitud` varchar(10) NOT NULL,
    `estado_dev` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `devoluciones` (`id_dev`, `user_dev`, `producto_dev`, `motivo`, `fecha_solicitud`, `estado_dev`) VALUES
(1, 2, 3, 5, '03/10/2024', 'En proceso'),
(2, 4, 4, 4, '03/10/2024', 'Completado'),
(3, 5, 5, 2, '03/10/2024', 'En proceso'),
(4, 3, 2, 3, '03/10/2024', 'Completado'),
(5, 1, 1, 1, '03/10/2024', 'En proceso');

-- PAGOS

DROP TABLE IF EXISTS pagos;

CREATE TABLE `pagos`(
    `id_pago` int(20) UNSIGNED NOT NULL,
    `metodo_pago` int(20) UNSIGNED NOT NULL,
    `producto_pago` int(20) UNSIGNED NOT NULL,
    `user_pago` int(20) UNSIGNED NOT NULL,
    `fecha_pago` varchar(10) NOT NULL,
    `coste` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pagos` (`id_pago`, `metodo_pago`, `producto_pago`, `user_pago`, `fecha_pago`, `coste`) VALUES
(1, 1, 1, 1, '12/12/2024', 10),
(2, 2, 2, 2, '12/12/2024', 20),
(3, 3, 3, 3, '12/12/2024', 30),
(4, 4, 4, 4, '12/12/2024', 40),
(5, 5, 5, 5, '12/12/2024', 50);

-- MOTIVOS

DROP TABLE IF EXISTS motivos;

CREATE TABLE `motivos`(
    `id_motivo` int(20) UNSIGNED NOT NULL,
    `motivo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `motivos` (`id_motivo`, `motivo`) VALUES
(1, 'Mal estado del producto'),
(2, 'Estafa'),
(3, 'Disconforme'),
(4, 'Talla equivocada'),
(5, 'Otro');

-- CHAT

DROP TABLE IF EXISTS chats;

CREATE TABLE `chats`(
    `id_chat` int(20) UNSIGNED NOT NULL,
    `cliente_chat` int(20) UNSIGNED NOT NULL,
    `vendedor_chat` int(20) UNSIGNED NOT NULL,
    `producto_chat` int(20) UNSIGNED NOT NULL,
    `mensaje` varchar(255) NOT NULL,
    `fecha_msg` varchar(10) NOT NULL,
    `hora_msg` varchar(5) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `chats` (`id_chat`, `cliente_chat`, `vendedor_chat`, `producto_chat`, `mensaje`, `fecha_msg`, `hora_msg`) VALUES
(1, 1, 5, 1, 'mensaje1', '03/02/2025', '12:38'),
(2, 2, 3, 2, 'mensaje2', '03/02/2025', '12:38'),
(3, 3, 4, 3, 'mensaje3', '01/02/2025', '12:38'),
(4, 4, 2, 4, 'mensaje4', '09/01/2025', '12:38'),
(5, 5, 1, 5, 'mensaje5', '12/11/2024', '12:38');

-- SUBASTAS

DROP TABLE IF EXISTS subastas;

CREATE TABLE `subastas`(
    `id_subasta` int(20) UNSIGNED NOT NULL,
    `user_sub` int(20) UNSIGNED NOT NULL,
    `producto_sub` int(20) UNSIGNED NOT NULL,
    `puja` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `subastas` (`id_subasta`, `user_sub`, `producto_sub`, `puja`) VALUES
(1, 1, 1, 10),
(2, 2, 2, 20),
(3, 3, 3, 30),
(4, 4, 4, 40),
(5, 5, 5, 50);

-- METODOS PAGO

DROP TABLE IF EXISTS metodo_pago;

CREATE TABLE `metodos_pago`(
    `id_metodo` int(20) UNSIGNED NOT NULL,
    `metodo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `metodos_pago` (`id_metodo`, `metodo`) VALUES
(1, 'Paypal'),
(2, 'Transferencia bancaria'),
(3, 'Bizum'),
(4, 'Paysafecard'),
(5, 'Efectivo');

-- TEAMS

DROP TABLE IF EXISTS teams;

CREATE TABLE `teams`(
    `id_team` int(20) UNSIGNED NOT NULL,
    `nom_team` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `teams`(`id_team`, `nom_team`) VALUES
(1, 'L.A Lakers'),
(2, 'Dallas Maverics'),
(3, 'Phoenix Suns'),
(4, 'Boston Celtics'),
(5, 'Valencia Basket');

-- PLAYERS

DROP TABLE IF EXISTS players;

CREATE TABLE `players`(
    `id_player` int(20) UNSIGNED NOT NULL,
    `nom_player` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `players` (`id_player`, `nom_player`) VALUES
(1, 'Luka Doncic'),
(2, 'Lebron James'),
(3, 'Jaime Pradilla'),
(4, 'Stephen Curry'),
(5, 'Devin Booker');

-- ALTER TABLES

-- PRIMARY KEYS

-- USERS

ALTER TABLE `users`
    ADD PRIMARY KEY (`id_user`);

-- DIRECCION

ALTER TABLE `direccion`
    ADD PRIMARY KEY (`id_dir`);

-- FAVORITOS

ALTER TABLE `favoritos`
    ADD PRIMARY KEY (`id_fav`);

-- COMPRAS

ALTER TABLE `compras`
    ADD PRIMARY KEY (`id_compra`);

-- CARRITO

ALTER TABLE `carrito`
    ADD PRIMARY KEY (`id_carrito`);

-- PRODUCTOS

ALTER TABLE `productos`
    ADD PRIMARY KEY (`id_producto`);

-- PRODUCT IMAGES

ALTER TABLE `producto_img`
    ADD PRIMARY KEY (`id_pimg`);

-- CATEGORIAS

ALTER TABLE `categorias`
    ADD PRIMARY KEY (`id_categoria`);

-- TIPO

ALTER TABLE `tipo`
    ADD PRIMARY KEY (`id_tipo`);

-- IMAGES

ALTER TABLE `images`
    ADD PRIMARY KEY (`id_image`);

-- RESEÑAS

ALTER TABLE `resenas`
    ADD PRIMARY KEY (`id_resena`);

-- MARCAS

ALTER TABLE `marcas`
    ADD PRIMARY KEY (`id_marca`);

-- DEVOLUCIONES

ALTER TABLE `devoluciones`
    ADD PRIMARY KEY (`id_dev`);

-- PAGOS

ALTER TABLE `pagos`
    ADD PRIMARY KEY (`id_pago`);

-- MOTIVOS

ALTER TABLE `motivos`
    ADD PRIMARY KEY (`id_motivo`);

-- CHATS

ALTER TABLE `chats`
    ADD PRIMARY KEY (`id_chat`);

-- SUBASTAS

ALTER TABLE `subastas`
    ADD PRIMARY KEY (`id_subasta`);

-- METODOS DE PAGO

ALTER TABLE `metodos_pago`
    ADD PRIMARY KEY (`id_metodo`);

-- TEAMS

ALTER TABLE `teams`
    ADD PRIMARY KEY (`id_team`);

-- PLAYERS

ALTER TABLE `players`
    ADD PRIMARY KEY (`id_player`);

--
-- ID's AUTOINCREMENTALES
--

ALTER TABLE `users`
    MODIFY `id_user` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

-- DIRECCION

ALTER TABLE `direccion`
    MODIFY `id_dir` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

-- FAVORITOS

ALTER TABLE `favoritos`
    MODIFY `id_fav` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=300;

-- COMPRAS

ALTER TABLE `compras`
    MODIFY `id_compra` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=400;

-- CARRITO

ALTER TABLE `carrito`
    MODIFY `id_carrito` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=500;

-- PRODUCTOS

ALTER TABLE `productos`
    MODIFY `id_producto` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=600;

-- PRODUCT IMAGES

ALTER TABLE `producto_img`
    MODIFY `id_pimg` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=700;

-- CATEGORIAS

ALTER TABLE `categorias`
    MODIFY `id_categoria` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=800;

-- TIPO

ALTER TABLE `tipo`
    MODIFY `id_tipo` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=900;

-- IMAGES

ALTER TABLE `images`
    MODIFY `id_image` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

-- RESEÑAS

ALTER TABLE `resenas`
    MODIFY `id_resena` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1100;

-- MARCAS

ALTER TABLE `marcas`
    MODIFY `id_marca` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1200;

-- DEVOLUCIONES

ALTER TABLE `devoluciones`
    MODIFY `id_dev` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1300;

-- PAGOS

ALTER TABLE `pagos`
    MODIFY `id_pago` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1400;

-- MOTIVOS

ALTER TABLE `motivos`
    MODIFY `id_motivo` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1500;

-- CHATS

ALTER TABLE `chats`
    MODIFY `id_chat` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1600;

-- SUBASTAS

ALTER TABLE `subastas`
    MODIFY `id_subasta` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1700;

-- METODOS DE PAGO

ALTER TABLE `metodos_pago`
    MODIFY `id_metodo` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1800;

-- TEAMS

ALTER TABLE `teams`
    MODIFY `id_team` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1900;

-- PLAYERS

ALTER TABLE `players`
    MODIFY `id_player` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2000;

--
-- CLAVES AJENAS
--

-- FAVORITOS

ALTER TABLE `favoritos`
    ADD CONSTRAINT `FK_user_fav` FOREIGN KEY (`user_fav`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_producto_fav` FOREIGN KEY (`producto_fav`) REFERENCES `productos` (`id_producto`);

-- COMPRAS

ALTER TABLE `compras`
    ADD CONSTRAINT `FK_user_compra` FOREIGN KEY (`user_compra`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_producto_compra` FOREIGN KEY (`producto_compra`) REFERENCES `productos` (`id_producto`);

-- CARRITO

ALTER TABLE `carrito`
    ADD CONSTRAINT `FK_user_carrito` FOREIGN KEY (`user_carrito`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_producto_carrito` FOREIGN KEY (`producto_carrito`) REFERENCES `productos` (`id_producto`);

-- PRODUCTOS

ALTER TABLE `productos`
    ADD CONSTRAINT `FK_id_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_marca` FOREIGN KEY (`marca`) REFERENCES `marcas` (`id_marca`),
    ADD CONSTRAINT `FK_categoria` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id_categoria`),
    ADD CONSTRAINT `FK_tipo` FOREIGN KEY (`tipo`) REFERENCES `tipo` (`id_tipo`);

-- PRODUCT IMAGES

ALTER TABLE `producto_img`
    ADD CONSTRAINT `FK_pimage_producto` FOREIGN KEY (`pimage_producto`) REFERENCES `productos` (`id_producto`);

-- IMAGES

ALTER TABLE `images`
    ADD CONSTRAINT `FK_img_producto` FOREIGN KEY (`img_producto`) REFERENCES `productos` (`id_producto`);

-- RESEÑAS

ALTER TABLE `resenas`
    ADD CONSTRAINT `FK_user_resena` FOREIGN KEY (`user_resena`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_producto_resena` FOREIGN KEY (`producto_resena`) REFERENCES `productos` (`id_producto`);

-- DEVOLUCIONES

ALTER TABLE `devoluciones`
    ADD CONSTRAINT `FK_user_dev` FOREIGN KEY (`user_dev`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_producto_dev` FOREIGN KEY (`producto_dev`) REFERENCES `productos` (`id_producto`),
    ADD CONSTRAINT `FK_motivo` FOREIGN KEY (`motivo`) REFERENCES `motivos` (`id_motivo`);

-- PAGOS

ALTER TABLE `pagos`
    ADD CONSTRAINT `FK_metodo_pago` FOREIGN KEY (`metodo_pago`) REFERENCES `metodos_pago` (`id_metodo`),
    ADD CONSTRAINT `FK_producto_pago` FOREIGN KEY (`producto_pago`) REFERENCES `productos` (`id_producto`),
    ADD CONSTRAINT `FK_user_pago` FOREIGN KEY (`user_pago`) REFERENCES `users` (`id_user`);

-- CHATS

ALTER TABLE `chats`
    ADD CONSTRAINT `FK_cliente_chat` FOREIGN KEY (`cliente_chat`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_vendedor_chat` FOREIGN KEY (`vendedor_chat`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_producto_chat` FOREIGN KEY (`producto_chat`) REFERENCES `productos` (`id_producto`);

-- SUBASTAS

ALTER TABLE `subastas`
    ADD CONSTRAINT `FK_user_sub` FOREIGN KEY (`user_sub`) REFERENCES `users` (`id_user`),
    ADD CONSTRAINT `FK_producto_sub` FOREIGN KEY (`producto_sub`) REFERENCES `productos` (`id_producto`);