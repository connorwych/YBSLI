// $(function() {
// 	$("#contactForm").submit(function(e) {
// 		e.preventDefault();
//     $('#emailSubmit').addClass("disabled");
//     $('#emailSubmit').html("Sending Email");
//
// 		$.ajax({
// 			type: 	$("#contactForm").attr('method'),
// 			url: 		$("#contactForm").attr('action'),
// 			data: 	$("#contactForm").serialize(),
// 			success: function (data) {
// 				e.preventDefault();
// 				$('#contactForm').hide(400);
// 				$('.contact').append("<h3>Email Successfully Sent </h3>");
// 			}
// 		});
// 	});
// });

// $(function() {
// 	$('#name').keyup(function validName() {
// 		if($('#name').val().length) {
// 			$('#nameGroup').removeClass("has-error");
// 			$('#nameGroup').addClass("has-success");
// 			$('#nameSuccess').show();
// 			$('#nameError').hide();
// 			$('#nameHelpBlock').hide();
// 			return true;
// 		} else {
// 			$('#nameGroup').addClass("has-success");
// 			$('#nameGroup').addClass("has-error");
// 			$('#nameSuccess').hide();
// 			$('#nameError').show();
// 			$('#nameHelpBlock').hide();
// 			$('#nameHelpBlock').show();
// 			return false;
// 		}
// 	});
// });
//
//
//
// $('#contactForm').keyup(function() {
//
//
// });
