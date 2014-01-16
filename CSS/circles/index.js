$(document).ready(function(){
	$('.challenge4').addClass('challenge3');

	if($.browser.chrome) {
		// Kludge due to Chrome float rendering bug
		// Reference: https://productforums.google.com/forum/?fromgroups=#!topic/chrome/94s52C4mmgo

		$('.challenge4 .code div:nth-child(3n+3').css('float', 'none');
		$('.challenge4 .code div:nth-child(3n+1').css('float', 'none');

		setTimeout(function(){
			$('.challenge4 .code div:nth-child(3n+1').css('float', 'left');
			$('.challenge4 .code div:nth-child(3n+3').css('float', 'right');
		}, 1);
	}
});