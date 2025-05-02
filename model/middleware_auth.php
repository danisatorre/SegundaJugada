<?php
include($_SERVER['DOCUMENT_ROOT'] . "/0_intro/online_shop/SegundaJugada/model/JWT.php");

function decode_token($token){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/model/jwt.ini');
    $secret = $jwt['JWT_SECRET'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

function create_token($username){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/0_intro/online_shop/SegundaJugada/model/jwt.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}