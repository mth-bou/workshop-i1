<?php

require_once('vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT'] . '\workshop-i1');
$dotenv->load();

$domain = "hotmail.fr";
$sender = $_ENV['SENDER_USERNAME'] . '@' . $domain;

$_SESSION['mailer_transport'] = (new Swift_SmtpTransport($_ENV['SENDER_HOST'], 587, 'tls'))
    ->setUsername($sender)
    ->setPassword($_ENV['SENDER_PASSWORD'])
    ->setStreamOptions(array('ssl' => array('allow_self_signed' => true, 'verify_peer' => false)))
;

$_SESSION['subject'] = "Opéation inhabituelle sur votre compte bancaire";

function createMailBody($message) {

    $url = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? $url = "https" : $url = "http";
    $url .= "://";
    $url .= $_SERVER['HTTP_HOST'];
    $url .= $_SERVER['REQUEST_URI'];
    $url .= 'public_bank/www.creditmutuel.fr';

    return "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>
	<head>
		<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
		<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
		<title>Opération inhabituelle sur votre compet</title>
		<style type='text/css'>
			/* ----- Custom Font Import ----- */
			@import url(https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin,latin-ext);

			/* ----- Text Styles ----- */
			table{
				font-family: 'Lato', Arial, sans-serif;
				-webkit-font-smoothing: antialiased;
				-moz-font-smoothing: antialiased;
				font-smoothing: antialiased;
			}

			@media only screen and (max-width: 700px){
				/* ----- Base styles ----- */
				.full-width-container{
					padding: 0 !important;
				}

				.container{
					width: 100% !important;
				}

				/* ----- Header ----- */
				.header td{
					padding: 30px 15px 30px 15px !important;
				}

				/* ----- Projects list ----- */
				.projects-list{
					display: block !important;
				}

				.projects-list tr{
					display: block !important;
				}

				.projects-list td{
					display: block !important;
				}

				.projects-list tbody{
					display: block !important;
				}

				.projects-list img{
					margin: 0 auto 25px auto;
				}

				/* ----- Half block ----- */
				.half-block{
					display: block !important;
				}

				.half-block tr{
					display: block !important;
				}

				.half-block td{
					display: block !important;
				}

				.half-block__image{
					width: 100% !important;
					background-size: cover;
				}

				.half-block__content{
					width: 100% !important;
					box-sizing: border-box;
					padding: 25px 15px 25px 15px !important;
				}

				/* ----- Hero subheader ----- */
				.hero-subheader__title{
					padding: 80px 15px 15px 15px !important;
					font-size: 35px !important;
				}

				.hero-subheader__content{
					padding: 0 15px 90px 15px !important;
				}

				/* ----- Title block ----- */
				.title-block{
					padding: 0 15px 0 15px;
				}

				/* ----- Paragraph block ----- */
				.paragraph-block__content{
					padding: 25px 15px 18px 15px !important;
				}

				/* ----- Info bullets ----- */
				.info-bullets{
					display: block !important;
				}

				.info-bullets tr{
					display: block !important;
				}

				.info-bullets td{
					display: block !important;
				}

				.info-bullets tbody{
					display: block;
				}

				.info-bullets__icon{
					text-align: center;
					padding: 0 0 15px 0 !important;
				}

				.info-bullets__content{
					text-align: center;
				}

				.info-bullets__block{
					padding: 25px !important;
				}

				/* ----- CTA block ----- */
				.cta-block__title{
					padding: 35px 15px 0 15px !important;
				}

				.cta-block__content{
					padding: 20px 15px 27px 15px !important;
				}

				.cta-block__button{
					padding: 0 15px 0 15px !important;
				}
			}
			
			#logo_credit_mutuel {
			    margin-right: auto;
			    margin-left: auto;
			}
			
			#barre_bleue {
			    width: 100%;
			    height: 10px;
			    background-color: #1d00db;
			}
		</style>

		<!--[if gte mso 9]><xml>
			<o:OfficeDocumentSettings>
				<o:AllowPNG/>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml><![endif]-->
	</head>

	<body style='padding: 0; margin: 0;' bgcolor='#eeeeee'>
		<span style='color:transparent !important; overflow:hidden !important; display:none !important; line-height:0px !important; height:0 !important; opacity:0 !important; visibility:hidden !important; width:0 !important; mso-hide:all;'>Nous avons détecté un comportement inhabituel sur votre compte bancaire, veuillez effectuer</span>
        
        <div id='barre_bleue'></div>
		<!-- / Full width container -->
		<table class='full-width-container' border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' bgcolor='#eeeeee' style='width: 100%; height: 100%; padding: 30px 0 30px 0;'>
			<tr>
				<td align='center' valign='top'>
					<!-- / 700px container -->
					<table class='container' border='0' cellpadding='0' cellspacing='0' width='700' bgcolor='#ffffff' style='width: 700px;'>
						<tr>
							<td align='center' valign='top'>

								<!-- / Hero subheader -->
								<table class='container hero-subheader' border='0' cellpadding='0' cellspacing='0' width='620' style='width: 620px;'>
								
								    <img id='logo_credit_mutuel' alt='logo crédit mutuel' src='".$message->embed(Swift_Image::fromPath('templates/mail-credit-mutuel/logo-credit-mutuel.png'))."' />
								
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 5px 5px 0;' align='left'>Bonjour,</td>
									</tr>
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 5px 5px 0;' align='left'>Lors de votre dernier achat, nous avons remarqué <strong>une activité inhabituelle</strong> sur votre compte bancaire.</td>
									</tr>
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 5px 5px 0;' align='left'>Par mesure de sécurité, nous avons temporairement suspendu toutes les opérations de votre compte.</td>
									</tr>
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 5px 5px 0;' align='left'>Nous vous invitons à consulter votre compte en vue d'une réactivation de ce dernier.</td>
									</tr>
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 5px 5px 0;' align='left'>Veuillez suivre le lien ci-après pour finaliser le processus de réactivation : <a href='". $url ."'>Consulter mon compte</a></td>
									</tr>
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 60px 15px 0;' align='left'>Nous vous remercions de votre confiance.</td>
									</tr>
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 60px 15px 0;' align='left'>Cordialement,</td>
									</tr>
									<tr>
										<td class='hero-subheader__content' style='font-size: 16px; line-height: 27px; color: #969696; padding: 0 60px 15x 0;' align='left'>Votre conseiller Crédit Mutuel</td>
									</tr>
									
								</table>
								<!-- /// Hero subheader -->

								<!-- / Divider -->
								<table class='container' border='0' cellpadding='0' cellspacing='0' width='100%' style='padding-top: 25px;' align='center'>
									<tr>
										<td align='center'>
											<table class='container' border='0' cellpadding='0' cellspacing='0' width='620' align='center' style='border-bottom: solid 1px #eeeeee; width: 620px;'>
												<tr>
													<td align='center'>&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- /// Divider -->

								<!-- / CTA Block -->
								<table class='container cta-block' border='0' cellpadding='0' cellspacing='0' width='100%'>
									<tr>
										<td align='center' valign='top'>
											<table class='container' border='0' cellpadding='0' cellspacing='0' width='620' style='width: 620px;'>
												<tr>
													<td class='cta-block__title' style='padding: 35px 0 0 0; font-size: 26px; text-align: center;'>A propos de nous</td>
												</tr>

												<tr>
													<td class='cta-block__content' style='padding: 20px 0 27px 0; font-size: 16px; line-height: 27px; color: #969696; text-align: center;'>Née du désir de faire avancer les choses, 
													la société Workshop est présente sur le marché des nouvelles technologies depuis maintenant vingt ans. Véritable niveau d'expertise pour les professionnels comme pour les particuliers, Workshop vous aide dans la gestion de votre système d'information.</td>
												</tr>

												<tr>
													<td align='center'>
														<table class='container' border='0' cellpadding='0' cellspacing='0'>
															<tr>
																<td class='cta-block__button' width='230' align='center' style='width: 200px;'>
																	<a href='#' style='border: 3px solid #eeeeee; color: #969696; text-decoration: none; padding: 15px 45px; text-transform: uppercase; display: block; text-align: center; font-size: 16px;'>Nous contacter</a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- /// CTA Block -->

								<!-- / Divider -->
								<table class='container' border='0' cellpadding='0' cellspacing='0' width='100%' style='padding-top: 25px;' align='center'>
									<tr>
										<td align='center'>
											<table class='container' border='0' cellpadding='0' cellspacing='0' width='620' align='center' style='border-bottom: solid 1px #eeeeee; width: 620px;'>
												<tr>
													<td align='center'>&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- /// Divider -->

								<!-- / Footer -->
								<table class='container' border='0' cellpadding='0' cellspacing='0' width='100%' align='center'>
									<tr>
										<td align='center'>
											<table class='container' border='0' cellpadding='0' cellspacing='0' width='620' align='center' style='border-top: 1px solid #eeeeee; width: 620px;'>
												<tr>
													<td style='text-align: center; padding: 50px 0 10px 0;'>
														<a href='#' style='font-size: 28px; text-decoration: none; color: #d5d5d5;'>Workshop®</a>
													</td>
												</tr>

												<tr>
													<td align='middle'>
														<table width='60' height='2' border='0' cellpadding='0' cellspacing='0' style='width: 60px; height: 2px;'>
															<tr>
																<td align='middle' width='60' height='2' style='background-color: #eeeeee; width: 60px; height: 2px; font-size: 1px;'><img height='250' width='250' src='".$message->embed(Swift_Image::fromPath('templates/mail-portfolio/img/workshop.jpg'))."'></td>
															</tr>
														</table>
													</td>
												</tr>

												<tr>
													<td style='color: #d5d5d5; text-align: center; font-size: 15px; padding: 10px 0 60px 0; line-height: 22px;'>Copyright &copy; 2015 <br />All rights reserved.</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- /// Footer -->
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>";
}