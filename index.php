<?php

session_start();

require_once('vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$users = [
    'username' => [
        'mathieu.b-59',
    ]
];
$templates = [
    0 => 'templates/mail-portfolio/index.php',
    1 => 'templates/mail-credit-mutuel/index.php'
];
$random_template = rand(0, sizeof($templates) - 1);
$random_user = rand(0, sizeof($users['username']) - 1);
$domain = "hotmail.fr";

// include a random template file among the list of templates
include($templates[$random_template]);

$victim = $users['username'][$random_user] . '@' . $domain;

$sender = $_ENV['SENDER_USERNAME'] . '@' . $domain;

$private_key = file_get_contents('dkim.private.key');
$signer = new Swift_Signers_DKIMSigner($private_key, $domain, 'default');

$mailer = new Swift_Mailer($_SESSION['mailer_transport']);

$message = (new Swift_Message($_SESSION['subject']))
    ->attachSigner($signer)
    ->setFrom([$sender => formatSenderName($_ENV['SENDER_USERNAME'])])
    ->setTo([$victim])
    ->setContentType('text/html')
;

$message->setBody(createMailBody($message));

// if email is valid
if (filter_var($victim, FILTER_VALIDATE_EMAIL)) {
    if ($mailer->send($message))
    {
        echo "Mail envoyé avec succès \n";
    } else {
        echo "Echec de l'envoi du mail \n";
    }
}

// Format "prenom.nom" to "Prenom Nom"
function formatSenderName($username) {
    $name = preg_replace("[.]", " ", $username);
    return ucwords($name);
}
