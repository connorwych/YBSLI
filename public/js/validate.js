(function($) {

	$.fn.bootstrapValidator.i18n.recaptchaCustom = $.extend($.fn.bootstrapValidator.i18n.recaptchaCustom || {}, {
			'default': 'reCaptcha is compulsary and can\'t be empty'
	});

	$.fn.bootstrapValidator.validators.recaptchaCustom = {
		/**
		* @param {FormValidation.Base} validator The validator plugin instance
		* @param {jQuery} $field The jQuery object represents the field element
		* @param {Object} options The validator options
		* @returns {Boolean}
		*/
			validate: function(validator, $field, options) {
				console.log("Validating recaptchaCustom")
			if ( grecaptcha.getResponse().length !== 0) {
				return true;
			} else {
				return false;
			}
		}
	};
}(window.jQuery));

$(document).ready(function validateForm(){
	$('#contactForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			senderName: {
				message: 'Please enter your name',
				validators: {
					notEmpty: {
						message: 'Please enter your name'
					}
				}
			},
			senderEmail: {
				message: 'Please enter your email',
				validators: {
					notEmpty: {
						message: 'Please enter an email address'
					},
					emailAddress: {
						message: 'Please check the format of your email address'
					}
				}
			},
			subject: {
				message: 'Please enter a subject',
				validators: {
					notEmpty: {
						message: 'Please enter a subject'
					}
				}
			},
			emailBody: {
				message: 'Please enter a message',
				validators: {
					notEmpty: {
						message: 'Please enter a message'
					}
				}
			},
			recaptchaHidden: {
				excluded: false,
				message: 'Please enter recaptcha field',
				validators: {
					recaptchaCustom: {
						message: 'Please enter recaptcha field'
					}
				}
			}
		}
	}).on('error.field.bv', function(e, data) {
		data.bv.disableSubmitButtons(true); // disable submit buttons on errors
	}).on('status.field.bv', function(e, data) {
		data.bv.disableSubmitButtons(false); // enable submit buttons on valid
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		$('#emailSubmit').addClass("disabled");
		$('#emailSubmit').html("Sending Email");

		$.ajax({
			type: 	$("#contactForm").attr('method'),
			url: 		$("#contactForm").attr('action'),
			data: 	$("#contactForm").serialize(),
			success: function (data) {
				e.preventDefault();
				$('#contactForm').hide(400);
				$('.contact').append("<h3>Email Successfully Sent </h3> <p> Interpreters will respond if they are available for your request (but may not fill up your inbox with replies if they are not). They may be in the middle of another job, so a reply may take a short while to come through.");
			},
			error: function(err){
				$('#contactForm').hide(400);
				$('.contact').append("<p>An error occured. Please try again later </p>");
			}
		});
	});
});

$(document).ready(function validateForm(){
	$('#contactForm').bootstrapValidator('addField', 'g\-recaptcha\-response', {
	 excluded: false,
	 validators: {
		 recaptchaCustom: {
			 message: 'The captcha is required and can\'t be empty a'
		 },
	 }
	});
});

var gCallback = function () {
	$('#contactForm').bootstrapValidator('revalidateField', 'recaptchaHidden');
}
