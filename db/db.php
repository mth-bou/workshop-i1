<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'workshopgrp10';

try {

    $conn = new PDO('mysql:host='.$servername.';dbname='.$dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "Erreur : " . $e->getMessage();
}