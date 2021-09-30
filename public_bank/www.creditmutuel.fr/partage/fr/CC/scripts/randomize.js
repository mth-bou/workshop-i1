;

/* =================== Randomize ============================ */
(function () {
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function initRandom() {
		$("[data-randomize=yes]").each(function () {
			var items = $(this);
			var loadingAnim = '<div class="loader" style="left:50%; top:25%; transform:translateX(-50%); position: absolute;"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
			var nbItems = items.children('div').length;
			var random = getRandomInt(nbItems);

			// If JS script is injected we detach it and append it at the end to prevent css from not working anymore (target first-child)
			if (items.children('script')) {
				var script = items.children('script');
				script.detach();
				items.append(script);
			}

			items.before(loadingAnim);
			items.children('div').each(function (i) {

				if (i !== random) {
					$(this).remove();
				} else {
					$(this).on('animationend', function () {
						items.prev('.loader').remove();
					});
				}

			});
		});
	}
	$(document).ready(initRandom);
})();