;

/* =================== Crédit Mutuel Enseignant ============================ */
(function() {

    function initCME() {
		//setCookie("CME","1",,"/");
		document.cookie = "CME=1; path=/";
    }
	$(document).ready(initCME);

})();