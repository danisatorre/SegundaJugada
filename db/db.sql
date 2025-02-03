create database online_shop;
use online_shop;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "00:00";

-- USUARIOS

CREATE TABLE 'users'(
    'id_user' int(20) UNSIGNED NOT NULL,
    'username' varchar(50) NOT NULL,
    'pwd' varchar(50) NOT NULL,
    'email' varchar(50) NOT NULL,
    'img_perfil' varchar(255) NOT NULL,
    'dir' varchar(100) NOT NULL,
    'sexo' varchar(20) NOT NULL
);

INSERT INTO 'users'('id_user', 'username', 'pwd', 'email', 'img_perfil', 'dir', 'sexo') VALUES
(1, 'user1', 'user1pwd', 'user1@gmail.com', 'img1.jpg', 'dir1', 'masculino'),
(2, 'user2', 'user2pwd', 'user2@gmail.com', 'img2.jpg', 'dir2', 'femenino'),
(3, 'user3', 'user3pwd', 'user3@gmail.com', 'img3.jpg', 'dir3', 'femenino'),
(4, 'user4', 'user4pwd', 'user4@gmail.com', 'img4.jpg', 'dir4', 'masculino'),
(5, 'user5', 'user5pwd', 'user5@gmail.com', 'img5.jpg', 'dir5', 'masculino');

-- DIRECCION

CREATE TABLE 'direccion'(
    'id_dir' int(20) UNSIGNED NOT NULL,
    'ciudad' varchar(50) NOT NULL,
    'calle' varchar(50) NOT NULL,
    'pais' varchar(50) NOT NULL,
    'cp' varchar(50) NOT NULL
);

INSERT INTO 'direccion'('id_dir', 'ciudad', 'calle', 'pais', 'cp') VALUES
(1, 'ciudad1', 'calle1', 'pais1', 'cp1'),
(2, 'ciudad2', 'calle2', 'pais2', 'cp2'),
(3, 'ciudad3', 'calle3', 'pais3', 'cp3'),
(4, 'ciudad4', 'calle4', 'pais4', 'cp4'),
(5, 'ciudad5', 'calle5', 'pais5', 'cp5');

-- FAVORITOS

CREATE TABLE favoritos(
    id_fav int(20) UNSIGNED NOT NULL,
    user_fav int(20) UNSIGNED NOT NULL,
    producto_fav int(20) UNSIGNED NOT NULL
);

INSERT INTO favoritos(id_fav, user_fav, producto_fav) VALUES
(1, 1, 1),
(2, 4, 2),
(3, 2, 3),
(4, 3, 4),
(5, 1, 5);

-- COMPRAS

CREATE TABLE 'compras'(
    'id_compra' int(20) UNSIGNED NOT NULL,
    'user_compra' int(20) UNSIGNED NOT NULL,
    'producto_compra' int(20) UNSIGNED NOT NULL,
    'fecha_compra' varchar(10) NOT NULL,
    'unidades' int(50) NOT NULL
);
INSERT INTO 'compras'('id_compra', 'user_compra', 'producto_compra', 'fecha_compra', 'unidades') VALUES
(1, 1, 1, '01/01/2021', 1),
(2, 5, 2, '01/01/2021', 1),
(3, 2, 3, '01/01/2021', 1),
(4, 3, 4, '01/01/2021', 1),
(5, 5, 5, '01/01/2021', 1);

-- CARRITO

CREATE TABLE 'carrito'(
    'id_carrito' int(20) UNSIGNED NOT NULL,
    'user_carrito' int(20) UNSIGNED NOT NULL,
    'producto_carrito' int(20) UNSIGNED NOT NULL,
    'cantidad_carrito' int(20) NOT NULL
);

INSERT INTO 'carrito' ('id_carrito', 'user_carrito', 'producto_carrito', 'cantidad_carrito') VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 1),
(4, 4, 4, 1),
(5, 5, 5, 1);

-- PRODUCTOS

CREATE TABLE 'productos'(
    'id_producto' int(20) UNSIGNED NOT NULL,
    'id_vendedor' int(20) UNSIGNED NOT NULL,
    'marca' int(50) UNSIGNED NOT NULL,
    'categoria' int(20) UNSIGNED NOT NULL,
    'nom_prod' varchar(40) NOT NULL,
    'sexo_prod' varchar(20) NOT NULL,
    'talla' varchar(10) NOT NULL,
    'entrega' varchar(40) NOT NULL,
    'oferta' varchar(3) NOT NULL,
    'descripcion' varchar(1000) NOT NULL,
    'condicion' varchar(20) NOT NULL,
    'stock' int(50) NOT NULL,
    'precio' int(5) NOT NULL
);

INSERT INTO 'productos' ('id_producto', 'id_vendedor', 'marca', 'categoria', 'nom_prod', 'sexo_prod', 'talla', 'entrega', 'oferta', 'descripcion', 'condicion', 'stock', 'precio') VALUES
(1, 1, 1, 1, 'producto1', 'masculino', 'M', 'persona', 'no', 'descripcion1', 'nuevo', 3, 10),
(2, 2, 2, 2, 'producto2', 'femenino', 'S', 'domicilio', 'si', 'descripcion2', 'desgastado', 5, 20),
(3, 3, 3, 3, 'producto3', 'femenino', 'L', 'domicilio', 'no', 'descripcion3', 'roto', 3, 30),
(4, 4, 4, 4, 'producto4', 'masculino', 'XL', 'persona', 'si', 'descripcion4', 'bueno', 1, 40),
(5, 5, 5, 5, 'producto5', 'masculino', 'M', 'domicilio', 'no', 'descripcion5', 'nuevo', 1, 50);

-- PRODUCT IMAGES

CREATE TABLE 'product_img'(
    'id_pimg' int(20) UNSIGNED NOT NULL,
    'pimage_product' int(20) UNSIGNED NOT NULL,
    'pimage_route' varchar(255) NOT NULL
);

INSERT INTO 'product_img' ('id_pimg', 'pimage_product', 'pimage_route') VALUES
(1, 1, 'img1.jpg'),
(2, 2, 'img2.jpg'),
(3, 3, 'img3.jpg'),
(4, 4, 'img4.jpg'),
(5, 5, 'img5.jpg');

-- CATEGORIAS

CREATE TABLE 'categorias'(
    'id_categoria' int(20) UNSIGNED NOT NULL,
    'categoria' varchar(50) NOT NULL
);

INSERT INTO 'categorias' ('id_categoria', 'categoria') VALUES
(1, 'cancha'),
(2, 'calle'),
(3, 'zapatos'),
(4, 'gorras'),
(5, 'balones');
(6, 'pantalones'),
(7, 'camisetas'),
(8, 'accesorios'),
(9, 'calcetines'),
(10, 'sudadera'),
(11, 'NBA'),
(12, 'ACB'),

-- IMAGES

CREATE TABLE 'images'(
    'id_image' int(20) UNSIGNED NOT NULL,
    'image_product' int(20) UNSIGNED NOT NULL,
    'image_route' varchar(255) NOT NULL
);

INSERT INTO 'images' ('id_image', 'image_product', 'image_route') VALUES
(1, 1, 'img1.jpg'),
(2, 2, 'img2.jpg'),
(3, 3, 'img3.jpg'),
(4, 5, 'img4.jpg'),
(5, 4, 'img5.jpg');

-- RESEÑAS

CREATE TABLE 'resenas'(
    'id_resena' int(20) UNSIGNED NOT NULL,
    'user_resena' int(20) UNSIGNED NOT NULL,
    'product_resena' int(20) UNSIGNED NOT NULL,
    'puntuacion' int(2) NOT NULL, -- la puntuación va de 0 hasta 50
    'comentario' varchar(500) NOT NULL,
    'fecha_resena' varchar(10) NOT NULL
);

INSERT INTO 'resenas' ('id_resena', 'user_resena', 'product_resena', 'puntuacion', 'comentario', 'fecha_resena') VALUES
(1, 1, 1, 40, 'El producto me llego en buenas condiciones', '26/10/2024'),
(2, 2, 4, 40, 'El producto me llego en buenas condiciones', '18/07/2024'),
(3, 5, 3, 40, 'El producto me llego en buenas condiciones', '12/01/2025'),
(4, 3, 4, 40, 'El producto me llego en buenas condiciones', '15/01/2025'),
(5, 4, 5, 40, 'El producto me llego en buenas condiciones', '04/11/2024');

-- MARCAS

CREATE TABLE 'marcas'(
    'id_marca' int(20) UNSIGNED NOT NULL,
    'nom_marca' varchar(30) NOT NULL
);

INSERT INTO 'marcas' ('id_marca', 'nom_marca') VALUES
(1, 'Puma'),
(2, 'Adidas'),
(3, 'Nike'),
(4, 'Jordan'),
(5, 'Reebok'),
(6, 'Luanvi'),
(7, 'Spalding'),
(8, 'Wilson'),
(9, 'Tenth'),
(10, 'Joma');

-- DEVOLUCIONES

CREATE TABLE 'devoluciones'(
    'id_dev' int(20) UNSIGNED NOT NULL,
    'user_dev' int(20) UNSIGNED NOT NULL,
    'product_dev' int(20) UNSIGNED NOT NULL,
    'motivo' int(20) UNSIGNED NOT NULL,
    'fecha_solicitud' varchar(10) NOT NULL,
    'estado_dev' varchar(30) NOT NULL
);

INSERT INTO 'devoluciones' ('id_dev', 'user_dev', 'product_dev', 'motivo', 'fecha_solicitud', 'estado_dev') VALUES
(1, 2, 3, 5, '03/10/2024', 'En proceso'),
(2, 4, 4, 4, '03/10/2024', 'Completado'),
(3, 5, 5, 2, '03/10/2024', 'En proceso'),
(4, 3, 2, 3, '03/10/2024', 'Completado'),
(5, 1, 1, 1, '03/10/2024', 'En proceso');

-- PAGOS

CREATE TABLE 'pagos'(
    'id_pago' int(20) UNSIGNED NOT NULL,
    'metodo_pago' int(20) UNSIGNED NOT NULL,
    'producto_pago' int(20) UNSIGNED NOT NULL,
    'user_pago' int(20) UNSIGNED NOT NULL,
    'fecha_pago' varchar(10) NOT NULL,
    'coste' int(5) NOT NULL
);

INSERT INTO 'pagos' ('id_pago', 'metodo_pago', 'producto_pago', 'user_pago', 'fecha_pago', 'coste') VALUES
(1, 1, 1, 1, '12/12/2024', 10),
(2, 2, 2, 2, '12/12/2024', 20),
(3, 3, 3, 3, '12/12/2024', 30),
(4, 4, 4, 4, '12/12/2024', 40),
(5, 5, 5, 5, '12/12/2024', 50);

-- MOTIVOS

CREATE TABLE 'motivos'(
    'id_motivo' int(20) UNSIGNED NOT NULL,
    'motivo' varchar(50) NOT NULL
);

INSERT INTO 'motivos' ('id_motivo', 'motivo') VALUES
(1, 'Mal estado del producto'),
(2, 'Estafa'),
(3, 'Disconforme'),
(4, 'Talla equivocada'),
(5, 'Otro');

-- CHAT

CREATE TABLE 'chats'(
    'id_chat' int(20) UNSIGNED NOT NULL,
    'cliente_chat' int(20) UNSIGNED NOT NULL,
    'vendedor_chat' int(20) UNSIGNED NOT NULL,
    'producto_chat' int(20) UNSIGNED NOT NULL,
    'mensaje' varchar(255) NOT NULL,
    'fecha_msg' varchar(10) NOT NULL,
    'hora_msg' varchar(5) NOT NULL 
);

INSERT INTO 'chats' ('id_chat', 'cliente_chat', 'vendedor_chat', 'producto_chat', 'mensaje', 'fecha_msg', 'hora_msg') VALUES
(1, 1, 5, 1, 'mensaje1', '03/02/2025', '12:38'),
(2, 2, 3, 2, 'mensaje2', '03/02/2025', '12:38'),
(3, 3, 4, 3, 'mensaje3', '01/02/2025', '12:38'),
(4, 4, 2, 4, 'mensaje4', '09/01/2025', '12:38'),
(5, 5, 1, 5, 'mensaje5', '12/11/2024', '12:38');

-- SUBASTAS

CREATE TABLE 'subastas'(
    'id_subasta' int(20) UNSIGNED NOT NULL,
    'user_sub' int(20) UNSIGNED NOT NULL,
    'prod_sub' int(20) UNSIGNED NOT NULL,
    'puja' int(5) NOT NULL
);

INSERT INTO 'subastas' ('id_subasta', 'user_sub', 'prod_sub', 'puja') VALUES
(1, 1, 1, 10),
(2, 2, 2, 20),
(3, 3, 3, 30),
(4, 4, 4, 40),
(5, 5, 5, 50);

-- METODOS PAGO

CREATE TABLE 'metodos_pago'(
    'id_metodo' int(20) UNSIGNED NOT NULL,
    'metodo' varchar(30) NOT NULL
);

INSERT INTO 'metodos_pago' ('id_metodo', 'metodo') VALUES
(1, 'Paypal'),
(2, 'Transferencia bancaria'),
(3, 'Bizum'),
(4, 'Paysafecard'),
(5, 'Efectivo');

-- TEAMS

CREATE TABLE 'teams'(
    'id_team' int(20) UNSIGNED NOT NULL,
    'nom_team' varchar(50) NOT NULL
);

INSERT INTO 'teams'('id_team', 'nom_team') VALUES
(1, 'L.A Lakers'),
(2, 'Dallas Maverics'),
(3, 'Phoenix Suns'),
(4, 'Boston Celtics'),
(5, 'Valencia Basket');

-- PLAYERS

CREATE TABLE 'players'(
    'id_player' int(20) UNSIGNED NOT NULL,
    'name_player' varchar(50) NOT NULL
)

INSERT INTO 'players' ('id_player', 'name_player') VALUES
(1, 'Luka Doncic'),
(2, 'Lebron James'),
(3, 'Jaime Pradilla'),
(4, 'Stephen Curry'),
(5, 'Devin Booker');
