

$('.options div').click(function() {
	$(this).closest('.row').slideUp();

	// If last question is answered
	if ($(this).parent().is('.last')) {
		// hide title
		$('.slogan').fadeOut();
		closeOverlay();
		showMapLogo();
		makeCitiesApiCall();

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
}

function updateSidebar(content) {
	var sidebar = $('.sidebar');
	var sidebarWrapper = $('.sidebar-wrapper');
	sidebarWrapper.show();
	if (content) {
		sidebar.html(content);	
	} else {
		sidebar.html('hejsan');
	}
}

function hideSidebar(){
    var sidebarWrapper = $('.sidebar-wrapper');
    sidebarWrapper.hide();
}
/*
$(document).mouseup(function(e) 
{
    var sidebar = $('.sidebar');
    if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
        sidebar.hide();
    }
});*/