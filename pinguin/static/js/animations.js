$('.options div').click(function() {
	$(this).closest('.row').slideUp();

	// If last question is answered
	if ($(this).parent().is('.last')) {
		// hide title
		$('.slogan').fadeOut();
		closeOverlay();
		showMapLogo();

		// display side bars
		
	}
	$('.transparent').first().removeClass('transparent');
})

function closeOverlay() {
    $('.site-wrapper').fadeOut(50);
    showMapLogo();
}

function showMapLogo() {
	$('.map-brand').fadeIn();
	console.log("hello");
}