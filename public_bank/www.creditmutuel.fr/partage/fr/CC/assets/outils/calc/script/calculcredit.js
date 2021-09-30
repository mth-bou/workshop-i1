var caCCOld, caCDOld, caCMOld, nCCOld, nCDOld, nCMOld, txCCOld, txCDOld, txCMOld, prCCOld, prCDOld, prCMOld, ResultatCCOld, ResultatCDOld, ResultatCMOld;

// ##################################################################################################
function CalculCapital(pr, n, tx) {
	//consoleLog("CalculCapital(pr="+pr+",n:"+n+",tx:"+tx+")");
	//pr = somme prélevée mensuel
    //n = Nombre de périodes (en mois)
    //tx = Taux fixe d'emprunt (%)
	var pr = pr * 1;
	var n = n * 1;
	var tx = tx * 1;
	/*if (typeof (pr) != "number" || typeof (n) != "number" || typeof (tx) != "number") {
		alert("CalculCapital : NaN - ca:" + typeof (pr) + " - n:" + typeof (n) + " - tx:" + typeof (tx));
		return;
	}*/
	if (pr == prCCOld && n == nCCOld && tx == txCCOld) {
		// consoleLog("!!! idem !!! CalculCapital avec pr:"+pr+" n:"+n+" tx:"+tx);
		return ResultatCCOld;
	}
	prCCOld = pr;
	nCCOld = n;
	txCCOld = tx;

	if (tx == 0) {
		tx = 0.0000001;
	}
	var txm = tx / 100 / 12;
	var a = new Array();
	a[1] = pr * 1;
	var i = new Array();
	var c = new Array();
	for (var j = 1; j <= n; j++) {
		if (j != 1) {
			a[j] = c[j - 1] + pr;
		}
		i[j] = a[j] * txm;
		c[j] = a[j] - i[j];
	}
	ca = Math.floor(c[n] * 100) / 100;

	// Affichage
	var Resultat = new Object();
	Resultat.ca = ca;
  ResultatCCOld = Resultat;
  //consoleLog(Resultat);
	return Resultat;
}

function CalculDuree(ca, pr, tx) {
	//consoleLog("CalculDuree(ca="+ca+",pr:"+pr+",tx:"+tx+")");
	//ca = Capital emprunté (Euros)
	//pr = somme prélevée mensuel
    //tx = Taux fixe d'emprunt (%)
	var pr = pr * 1;
	var ca = ca * 1;
	var tx = tx * 1;

	if (pr == prCDOld && ca == caCDOld && tx == txCDOld) {
		return ResultatCDOld;
	}
	prCDOld = pr;
	caCDOld = ca;
	txCDOld = tx;

	if (tx == 0) {
		var n = Math.ceil(ca/pr);
	} else {
		var txm = tx / 100 / 12;
		var n = Math.ceil( Math.log(pr/(pr-ca*txm))/Math.log(1+txm));
	}

	// Affichage
	//Nombre de périodes (en mois)
	var Resultat = new Object();
	Resultat.n = n;
	ResultatCDOld = Resultat;
  //consoleLog(Resultat);
	return Resultat;
}

function CalculMensualite(ca, n, tx) {
	//consoleLog("CalculMensualite(ca="+ca+",n:"+n+",tx:"+tx+")");
	var ca = ca * 1;//Capital emprunté (Euros)
	var n = n * 1;//Nombre de périodes (en mois)
	var tx = tx * 1;//Taux fixe d'emprunt (%)
	/*if (typeof (ca) != "number" || typeof (n) != "number" || typeof (tx) != "number") {
		alert("CalculMensualite : NaN - ca:" + typeof (ca) + " - n:" + typeof (n) + " - tx:" + typeof (tx));
		return;
	}*/
	if (ca == caCMOld && n == nCMOld && tx == txCMOld) {
		// consoleLog("!!! idem !!! CalculMensualite avec ca:"+ca+" n:"+n+" tx:"+tx);
		return ResultatCMOld;
	}
	caCMOld = ca;
	nCMOld = n;
	txCMOld = tx;
	if (tx == 0) {
		tx = 0.0000001;
	}
	var txm = tx / 100 / 12;//Taux fixe d'emprunt mensuel (%)
	//Amortissement le 1er mois
	var a = new Array();
	a[1] = (ca * txm) / (Math.pow((1 + txm), n) - 1);//Intérêt 1er mois
	var i = new Array();
	i[1] = ca * txm;
	//somme prélevée mensuel
	pr = i[1] + a[1];
	//Début de la boucle du tableau d'amortissement
	//Le tableaux c() contiendra le capital restant dû période après période (mois après mois) en euros.
	//Le tableaux i() contiendra les intérets filés à la banque sur chaque période, en euros
	//Le tableaux a() contiendra le capital remboursé sur chaque période, en euros.
	var c = new Array();
	c[1] = ca;
	ttint = 0;
	for (var j = 2; j <= n; j++) {
		c[j] = c[j - 1] - a[j - 1];
		i[j] = Math.round((c[j] * txm) * 10) / 10;
		//c[j] * txm;
		//alert(i[j]);
		a[j] = pr - i[j];
		ttint = ttint + i[j];
	}
	derr = a[n] - c[n];
	a[n] = c[n];
	i[n] = i[n] + derr;
	if (tx == 0.000001) {
		i[1] = 0;
		for (var j = 2; j <= n; j++) {
			a[j] = c[1] / n;
			i[j] = 0;
			c[j] = c[j - 1] - a[j];
		}
		ttint = 0;
		derr = 0;
		a[n] = c[n];
	}
	ttint = ttint + i[1] + derr;
	// Calcul du FraisDossier
	var fd = ca * (parseFloat(FraisDossier._val)/100);
	fd = (fd > parseFloat(FraisDossier._max)) ? parseFloat(FraisDossier._max) : fd;
	fd = (fd < parseFloat(FraisDossier._min)) ? parseFloat(FraisDossier._min) : fd;
	//consoleLog(fd);
	//fd = (n <= 24) ? 0 : fd;
	var teg = CalculTEG(ca, n, tx, fd);
	// Calcul Epargne
	var mt = (Math.round((pr + (ca / 4) / n) / 10)) * 10;
	var me = mt - pr;
	var e = me * n;
	var ap = (e * 100) / ca;

	// Montant total dû
	var mtd = ca + ttint + fd;

	// Affichage
	var Resultat = {
		CapitalEmprunte: ca,
		NombreDePeriodes: n,
		TauxFixeEmprunt: tx,
		TauxFixeEmpruntMensuel: txm,
		SommePreleveeMensuel: pr,
		CapitalRestantDuMensuel: c,
		InteretsMensuel: i,
		CapitalRembourseMensuel: a,
		ttint: ttint,
		FraisDossier: fd,
		TEG: teg,
		MensualiteTotal: mt,
		MensualiteEpargne: me,
		Epargne: e,
		AffPourcentage: ap,
		MontantTotalDu: mtd,
	};
	ResultatCMOld = Resultat;
	//alert("fini !! ");
  //consoleLog(Resultat);
	return Resultat;
}
// ##############################################################################################
// donne la valeur de p(x) où p est le polynome stocké dans le tableau sinPolynome
function valPoly(x) {
	var resultPoly = sinPolynome[0];
	for (var i = 1; i <= intDim; i++) {
		resultPoly = resultPoly + sinPolynome[i] * Math.pow(x, i);
	}
	//alert("valPoly("+x+") = "+resultPoly);
	return resultPoly;
}
// donne la valeur de p'(x) où p' est le polynome dérivé du polynome stocké dans le tableau sinPolynome
function valPolyDerive(x) {
	var resultPolyDerive = 0;
	for (var i = 1; i <= intDim; i++) {
		resultPolyDerive = resultPolyDerive + i * sinPolynome[i] * Math.pow(x, (i - 1));
	}
	return resultPolyDerive;
}
// recherche du zéro du polynome p stocké dans sinPolynome par la méthode de Newton
function newton(xo) {
	var x1 = xo - valPoly(xo) / valPolyDerive(xo);
	while (Math.abs(x1 - xo) > 0.000001) {
		xaux = x1 - valPoly(x1) / valPolyDerive(x1);
		xo = x1;
		x1 = xaux;
	}
	return 1200 * (xo - 1);
}
// on initialise le polynome dans le cas où :
// * le prêt est remboursé par des mensualités constantes
// * les frais sont payés dès le début du prêt
// * le prêt est remboursé mensuellement
// pré requis:
// * le taux est annuel
//  * la durée en nombre de mois
//  * les frais sont supposés fixes et payés dès le début du prêt
var sinPolynome, intDim, sinAux;
function CalculTEG(Capital, DureeNbMois, TauxNominalAnnuel, FraisCommissions) {
	//consoleLog("CalculTEG(Capital="+Capital+",DureeNbMois:"+DureeNbMois+",TauxNominalAnnuel:"+TauxNominalAnnuel+",FraisCommissions:"+FraisCommissions+")");
	sinPolynome = new Array(200);
	var sinTm = TauxNominalAnnuel / 12 / 100;
	intDim = DureeNbMois;
	sinAux = sinTm * Capital / (1 - (1 / Math.pow((1 + sinTm), DureeNbMois)));
	for (var i = 1; i <= intDim; i++) {
		sinPolynome[(intDim - i)] = -sinAux;
	}
	sinPolynome[intDim] = Capital - FraisCommissions;
	var TegAnnuelProp = newton(1);
	var TegAnnuelActu = Math.round((+(Math.pow((1 + TegAnnuelProp / 1200), 12) - 1) * 100) * 1000) / 1000;
  //consoleLog("TEG="+TegAnnuelActu);
	return TegAnnuelActu;
}



// Format
function MontantFormat(nombre, nbdec) {
	var chaine = "";
	var nbdix = String(Math.floor(nombre)).length;

	var chainenb = String(nombre);
	if (nombre < 0) {
		nbdix = nbdix + 1;
	}
	var partnbdix = nbdix % 3;
	if (partnbdix != nbdix) {
		if (partnbdix > 0) {
			chaine = chainenb.substring(0, partnbdix);
		}
		var j;
		for (j = 0; j < Math.floor(nbdix / 3); ++j) {
			if (chaine.length > 0) {
				chaine = chaine + " ";
			}
			chaine = chaine + chainenb.substring(partnbdix + j * 3, partnbdix + (j + 1) * 3);
		}
	} else {
		chaine = chainenb.substring(0, nbdix);
	}
	var j;
	if (nbdec != undefined && nbdec > 0) {
		chaine = chaine + ".";
		if (chainenb.length > nbdix) {
			if (chainenb.length - 1 >= nbdix + nbdec) {
				chaine = chaine + chainenb.substring(nbdix + 1, nbdix + 1 + nbdec);
			} else {
				chaine = chaine + chainenb.substring(nbdix + 1, chainenb.length);
				for (j = 0; j < nbdix + nbdec - chainenb.length + 1; ++j) {
					chaine = chaine + "0";
				}
			}
		} else {
			for (j = 0; j < nbdec; ++j) {
				chaine = chaine + "0";
			}
		}
	} else {
		chaine = (chainenb.substring(nbdix + 1) == "") ? chaine : chaine + "." + chainenb.substring(nbdix + 1);
	}
	//trace("•• Formatage du Nombre : " + nombre + " • Resultat • " + chaine + " •");
	return chaine;
}
function Arrondi(montant, decimale) {
	var z = Math.pow(10, decimale);
	return Math.round(montant * z) / z;
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

var ed_tools = (getCookie("amcdebug") == 1) ? true : false;

if (window.console && ed_tools) {
  consoleAssert = function (exp, obj) { console.assert(exp, obj) };
  consoleClear = function () { console.clear() };
  consoleCount = function (lab) { console.count(lab) };
  consoleDebug = function (obj) { console.debug(obj) };
  consoleDir = function (obj) { console.dir(obj) };
  consoleDirxml = function (obj) { console.dirxml(obj) };
  consoleError = function (obj) { console.error(obj) };
  consoleGroup = function (data) { console.group(data) };
  consoleGroupCollapsed = function (data) { console.groupCollapsed(data) };
  consoleGroupEnd = function () { console.groupEnd() };
  consoleInfo = function (obj) { console.info(obj) };
  consoleLog = function (obj) { console.log(obj) };
  consoleProfile = function (lab) { console.profile(lab) };
  consoleProfileEnd = function () { console.profileEnd() };
  consoleTime = function (lab) { console.time(lab) };
  consoleTable = function (obj) { console.table(obj) };
  consoleTimeEnd = function (lab) { console.timeEnd(lab) };
  consoleTimeStamp = function (lab) { console.timeStamp(lab) };
  consoleTrace = function (obj) { console.trace(obj) };
  consoleWarn = function (obj) { console.warn(obj) };
  consoledebugger = function () { debugger };
} else {
  consoleAssert = function (data) { };
  consoleClear = function (data) { };
  consoleCount = function (data) { };
  consoleDebug = function (data) { };
  consoleDir = function (data) { };
  consoleDirxml = function (data) { };
  consoleError = function (data) { };
  consoleGroup = function (data) { };
  consoleGroupCollapsed = function (data) { };
  consoleGroupEnd = function (data) { };
  consoleInfo = function (data) { };
  consoleLog = function (data) { };
  consoleProfile = function (data) { };
  consoleProfileEnd = function (data) { };
  consoleTime = function (data) { };
  consoleTable = function (data) { };
  consoleTimeEnd = function (data) { };
  consoleTimeStamp = function (data) { };
  consoleTrace = function (data) { };
  consoleWarn = function (data) { };
  consoledebugger = function (data) { };
}
