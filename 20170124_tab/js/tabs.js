$(document).ready(function(){
	$('#tabs01 .tabs-item').click(function(){
		$(this).addClass('active').addClass('event-target').siblings().removeClass('event-target').removeClass('active');
	});
	$('#tabs02 .tabs-item').click(function(){
		$(this).addClass('active').addClass('event-target').siblings().removeClass('event-target').removeClass('active');
	});
	$('#tabs03 .tabs-item').click(function(){
		$(this).addClass('active').addClass('event-target').siblings().removeClass('event-target').removeClass('active');
	});
});