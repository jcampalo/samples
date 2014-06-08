$(document).ready(function () {
	/* Control of Security certification */
	$("#certSeg").hide();
	$("#certification1").click(function () {
		hideMenuComboLogin(true);
		$("#certSeg").css("height", getDocHeight());
		$("#certSeg").css("width", getDocWidth());
		showElementTransition("#certSeg");
	});
	$("#certification2").click(function () {
		hideMenuComboLogin(true);
		$("#certSeg").css("height", getDocHeight());
		$("#certSeg").css("width", getDocWidth());
		showElementTransition("#certSeg");
	});
	$("#close-security-cert").click(function () {
		hideElementTransition("#certSeg");
	});

	/* Control of Security rules */
	$("#normSeg").hide();
	$(".login-use-terms").click(function () {
		hideMenuComboLogin(true);
		$("#normSeg").css("height", getDocHeight());
		$("#normSeg").css("width", getDocWidth());
		showElementTransition("#normSeg");
	});
	$("#close-security-rules").click(function () {
		hideElementTransition("#normSeg");
	});

	/* Control of Terms and conditions */
	$("#termsCond").hide();
	$("#alert-terms-cond").hide();
	$(".div-login").hide();
	$("#btn-accept-terms-cond").click(function () {
		$(location).attr("href","bbvaweb-logged.php");
		form.submit();
	});

	$("scroll-slider-terms-cond").scroll();

	var firstTimeTermsAndCond = true;
	$("#btn-no-accept-terms-cond").click(function () {
		if (firstTimeTermsAndCond) {
			showElementTransition("#alert-terms-cond");
			firstTimeTermsAndCond = false;
		} else {
			hideElementTransition("#termsCond");
			hideElementTransition("#alert-terms-cond");
			firstTimeTermsAndCond = true;
		}
	});

	/* Control of Forgotten password */
	$("#forgotPass").hide();
	$(".menu-password-search").hide();
	$(".login-key-forgotten").click(function () {
		$("#forgotPass").css("height",getDocHeight());
		$("#forgotPass").css("width",getDocWidth());
		showElementTransition("#forgotPass");
	});

	$("#close-forgotten-password").click(function () {
		$(".menu-password-search").hide();
		$(".combo-pass-option").each(function () {
			if ($(this).hasClass("option-selected"))
				$(this).removeClass("option-selected");
		});
		$("#lost-password-search").val("");
		hideElementTransition("#forgotPass");
	});

	var prevVal = "";
	$("#lost-password-search").keyup(function (e) {
		if (e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40){
			showMenuList(".menu-password-search",".combo-pass-option","#lost-password-search");
			prevVal = $(this).val();
			if ($(".combo-pass-option").is(":visible") == 0) {
				$(".menu-password-search").hide();
				$(".combo-pass-option").each(function () {
					if ($(this).hasClass("option-selected"))
						$(this).removeClass("option-selected");
				});
			}
		} else {
			if ($(this).val().length > 0) {
				/* left = 37  up = 38 right = 39 down = 40 enter = 13 */
				var reallyFinded = false;
				var count = 0;
				$(".combo-pass-option").each(function() {
					count++;
					if ($(this).hasClass("option-selected") && $(this).is(":visible") && !$reallyFinded) {
						$(this).removeClass("option-selected");
						if (e.keyCode == 39 || e.keyCode == 40)
							$elem = $(this).next();
						if (e.keyCode == 37 || e.keyCode == 38)
							$elem = $(this).prev();
						if ($elem.is(":visible")){
							$("#lost-password-search").val($elem.children().text());
							$elem.addClass("option-selected");
						}
						reallyFinded = true;
					}
				});
				if (count != 0 && !reallyFinded) {
					if (e.keyCode == 39 || e.keyCode == 40)
						$elem = $(".combo-pass-option").filter(":visible").first();
					if (e.keyCode == 37 || e.keyCode == 38)
						$elem = $(".combo-pass-option").filter(":visible").last();
					$elem.addClass("option-selected");
					$(this).val($elem.children().text());
				}
				if (!$(".combo-pass-option").hasClass("option-selected")) {
					$(this).val($prevVal);
				}
			}
		}
	});

	$(".combo-pass-option").click(function () {
		$("#lost-password-search").val($(this).children().text());
		$(".menu-password-search").hide();
		$(".combo-pass-option").each(function() {
			if ($(this).hasClass("option-selected"))
				$(this).removeClass("option-selected");
		});
    });

	$mouseover = false;
	$(".menu-password-search").mouseover(function () {
	    $mouseover = true;
	})

	$(".menu-password-search").mouseout(function () {
	    $mouseover = false;
	})

	$("#lost-password-search").focusout(function () {
		if (!$mouseover) {
			$(".menu-password-search").hide();
			$(".combo-pass-option").each(function () {
				if ($(this).hasClass("option-selected"))
					$(this).removeClass("option-selected");
			});
		}
	});

	/* Logged control */
	$(".contact-last-conection").hide();

	$(".contact-opt-user").mouseover(function () {
		$(".contact-last-conection").show();
	});

	$(".contact-last-conection").mouseleave(function () {
		$(".contact-last-conection").hide();
	});

	$(".btn-user-disconnect").click(function () {
		$(location).attr("href","bbvaweb-initial.php");
		form.submit();
	});

	/* Agent data control */
	$(".agent-data").hide();
	var agentShowed = false;
	$(".agent").click(function () {
		if (!agentShowed) {
			$(".agent-data").slideDown("slow");
			agentShowed = true;
		} else {
			$(".agent-data").hide();
			agentShowed = false;
		}
	});

	$(".agent").outside("click", function () {
		$(".agent-data").hide();
		agentShowed = false;
	});

	/* Login control */
	$(".access").click(function () {
		$(".div-login").slideDown("slow");
	});

	$(".login-opened").click(function () {
		$(".div-login").slideUp("slow");
	});

	$(".combo-login").click(function () {
		if ($(".menu-combo-login").hasClass("hidden")) {
			hideMenuComboLogin(false);
		} else {
			hideMenuComboLogin(true);
		}
	});

	$("#cmb-login-option1").click(function () {
		$(".combo-content").text("Número de documento");
		$("#document-acces").attr("placeholder","Número de documento");
		$("#cmb-login-option1").addClass("option-selected");
		$("#cmb-login-option2").removeClass("option-selected");
		$("#cmb-login-option3").removeClass("option-selected");
		$("#cmb-login-option4").removeClass("option-selected");
		hideMenuComboLogin(true);
	});

	$("#cmb-login-option2").click(function () {
		$(".combo-content").text("Número de cuenta");
		$("#document-acces").attr("placeholder","Número de cuenta");
		$("#cmb-login-option2").addClass("option-selected");
		$("#cmb-login-option1").removeClass("option-selected");
		$("#cmb-login-option3").removeClass("option-selected");
		$("#cmb-login-option4").removeClass("option-selected");
		hideMenuComboLogin(true);
	});

	$("#cmb-login-option3").click(function () {
		$(".combo-content").text("Tarjeta de crédito");
		$("#document-acces").attr("placeholder","Tarjeta de crédito");
		$("#cmb-login-option3").addClass("option-selected");
		$("#cmb-login-option2").removeClass("option-selected");
		$("#cmb-login-option1").removeClass("option-selected");
		$("#cmb-login-option4").removeClass("option-selected");
		hideMenuComboLogin(true);
	});

	$("#cmb-login-option4").click(function () {
		$(".combo-content").text("Número de cliente");
		$("#document-acces").attr("placeholder","Número de cliente");
		$("#cmb-login-option4").addClass("option-selected");
		$("#cmb-login-option2").removeClass("option-selected");
		$("#cmb-login-option3").removeClass("option-selected");
		$("#cmb-login-option1").removeClass("option-selected");
		hideMenuComboLogin(true);
	});

    $("#certification1, #certification2").hover(function () {
      var currentImg = $(this).attr("src");
      $(this).attr("src", $(this).attr("hover"));
      $(this).attr("hover", currentImg);
    }, function() {
      var currentImg = $(this).attr("src");
      $(this).attr("src", $(this).attr("hover"));
      $(this).attr("hover", currentImg);
    });

	$("#document-acces").change(function () {
		checkFieldOnChange("#document-acces");
	});

	$("#pass-acces").change(function () {
		checkFieldOnChange("#pass-acces");
	});

	$("#captcha-field").change(function () {
		checkFieldOnChange("#captcha-field");
	});

	$("#env-login").click(function () {
		hideMenuComboLogin(true);
		var correct = true;
		if ($("#document-acces").val().length < 1) {
			correct = false;
			$("#document-acces").addClass("error");
		}
		if ($("#pass-acces").val().length < 1) {
			correct = false;
			$("#pass-acces").addClass("error");
		}
		if ($("#captcha-field").val().length < 1) {
			correct = false;
			$("#captcha-field").addClass("error");
		}
		if (!correct) {
			$(".msg-error-login").removeClass("hidden");
			$(".acces-login-panel").addClass("error");
			$(".content-login").addClass("error");
			$("#title-cod-sec").addClass("error");
			$(".menu-combo-login").addClass("error");
		} else {
			$(".msg-error-login").addClass("hidden");
			$(".menu-combo-login").removeClass("error");
			$(".acces-login-panel").removeClass("error");
			$(".content-login").removeClass("error");
			$("#title-cod-sec").removeClass("error");
			$("#captcha-field").removeClass("requ");
			$("#document-acces").removeClass("requ");
			$("#pass-acces").removeClass("requ");
			$("#termsCond").css("height",getDocHeight());
			$("#termsCond").css("width",getDocWidth());
			showElementTransition("#termsCond");
		}
	});

	$(window).resize(function() {
		$(".label-background-floats").each(function() {
			$(this).css("height",getDocHeight());
			$(this).css("width",getDocWidth());
		});
	});
	$(window).scroll(function() {
		$(".label-background-floats").each(function() {
			$(this).css("height",getDocHeight());
			$(this).css("width",getDocWidth());
		});
	});
});

/* Show the menu if the chain matches with an option */
showMenuList = function (menuToShow,menuOption,inputBox) {
	var chain = $(inputBox).val().toLowerCase();
	if (chain.length < 1) {
		$(menuToShow).hide();
		$(menuOption).each(function () {
			if ($(this).hasClass("option-selected"))
				$(this).removeClass("option-selected");
		});
	} else {
		$(menuToShow).show();
		$(menuOption).each(function () {
			var textOption = $(this).children().text().toLowerCase();
			if (textOption.indexOf(chain) != -1 && textOption != chain){
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	}
}

/* Returns the document height */
getDocHeight = function () {
    return $(document).height();
}

/* Returns the document width */
getDocWidth = function () {
    var D = document;
    if ($.browser.msie && jQuery.browser.version == "8.0")
    	return Math.min(
	      Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
	      Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
	      Math.max(D.body.clientWidth, D.documentElement.clientWidth));
    else
	    return Math.max(
	      Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
	      Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
	      Math.max(D.body.clientWidth, D.documentElement.clientWidth));
}

/* Hide the menu combo of login */
hideMenuComboLogin = function (hide) {
	if (hide) {
		$(".menu-combo-login").addClass("hidden");
		$(".combo-content").removeClass("selected");
		$(".combo-arrow").removeClass("selected");
		$(".combo-login").removeClass("selected");
	} else {
		$(".menu-combo-login").removeClass("hidden");
		$(".combo-content").addClass("selected");
		$(".combo-arrow").addClass("selected");
		$(".combo-login").addClass("selected");
	}
}

/* Check if the filed is empty */
checkFieldOnChange = function (object) {
	$(object).removeClass("error");
	if ($(object).attr("value").length > 0) {
		$(object).removeClass("requ");
	}
}
/* Show an element with a transition */
showElementTransition = function (object) {
	$float = $(object);
	$float.css("opacity", 0);
	$float.show();
	$float.animate({
	      opacity:1
    }, 500);
}

/* Hide an element with a transition */
hideElementTransition = function (object) {
	$(object).animate({
	      opacity:0
    }, 500, function() {
    	$(object).hide()
    });
}