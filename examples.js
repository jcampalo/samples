$(function () {
	$(".TablaScrollContenido").find(".Pijama2,.Pijama1").hide();
	$("td").css("border-bottom", "1px solid #fff");

	$(".TablaScrollContenido").find(".Total").each(function () {
		$(this).find(".BotonPrismatico").toggle(
			function () {
				$(this).closest("tr").nextUntil(".Total").filter(".Pijama2:not").show();
				$(this).closest("tr").nextUntil(".Total").filter("#tipo_interes_LP_nueva").show();
				if ($(this).closest("tr").nextUntil(".Total").find("td.TextoTablaIzqN").find("select").val() != null){
					valorCombo($(this).closest("tr").nextUntil(".Total").find("td.TextoTablaIzqN").find("select").val());
				}
				$(this).closest("tr").nextUntil(".Total").find("td.TextoTablaIzqN").find(".BotonPrismatico[title='$']").click();
				$(this).attr({"src":"/ataa_es_web_pub/images/arrowplegable.gif","title":"Plegar"});
			},
			function () {
				$(this).closest("tr").nextUntil(".Total").hide();
				$(this).closest("tr").nextUntil(".Total").find("td.TextoTablaIzqN").find(".BotonPrismatico[title='Plegar']").click().attr("title","$");
				$(this).attr({"src":"/ataa_es_web_pub/images/arrowdesplegable.gif","title":"Desplegar"});
		});
	});
	$(".TablaScrollContenido").find(".Pijama2").each(function () {
		$(this).find(".BotonPrismatico[id!='btnVentaInmovilizado']").toggle(
			function () {
				$(this).closest("tr").nextUntil(".Pijama2").show();
				$(this).attr({"src":"/ataa_es_web_pub/images/arrowplegable.gif","title":"Plegar"});
			},
			function () {
				$(this).closest("tr").nextUntil(".Pijama2").hide();
				$(this).attr({"src":"/ataa_es_web_pub/images/arrowdesplegable.gif","title":"Desplegar"});
		});
	});

	$(".TablaScrollContenido").find(".Total").first().find(".BotonPrismatico").click();

	$(this).find("input[id^='imp']").each(function () {
		if ($(this).val() != "") {
			var importe = desformateaImporte($(this).val());
			if ($("#HD_COD_MEDIDA").val() == "M") {
				importe = importe / 1000;
				importe = importe.toFixed(2);
				$(this).val(aplicaMascaraNumericaDefecto(importe));
			}
			if ($("#HD_COD_MEDIDA").val() == "N") {
				importe = importe / 1000000;
				importe = importe.toFixed(2);
				$(this).val(aplicaMascaraNumericaDefecto(importe));
			}
		}
	});

	$(this).find("span[id^='imp']").not("[id$='_ER']").each(function () {
		if ($(this).text() != "") {
			var importe = desformateaImporte($(this).text());
			if ($("#HD_COD_MEDIDA").val() == "M") {
				importe = importe / 1000;
				importe = importe.toFixed(2);
				$(this).text(aplicaMascaraNumericaDefecto(importe));
			}
			if ($("#HD_COD_MEDIDA").val() == "N") {
				importe = importe / 1000000;
				importe = importe.toFixed(2);
				$(this).text(aplicaMascaraNumericaDefecto(importe));
			}
		}
	});
});

function actualizaInvNueva () {
  var imp_invbiemu = 0;
  var imp_invbiein = 0;
  var valor = 0;
  if ($("#imp_invbiemu").val() == "" && $("#imp_invbiein").val() == ""){
    $("#imp_invnueva").text("0,00");
    return;
  }
  if ($("#imp_invbiemu").val() != "")
    imp_invbiein = desformateaImporte($("#imp_invbiemu").val());
  if ($("#imp_invbiein").val() != "")
    imp_invbiemu = desformateaImporte($("#imp_invbiein").val());
  valor = imp_invbiein + imp_invbiemu;
  valor = valor.toFixed(2);
  $("#imp_invnueva").text(aplicaMascaraNumericaDefecto(valor));
}

function desformateaImporte (control) {
  var valor = control;
  var coma  = valor.indexOf(",");
  var punto = valor.indexOf(".");
  var mascara = "9#0,00";
  var comamascara  = mascara.indexOf(",");
  var puntomascara = mascara.indexOf(".");
  if (punto > coma) {
    if ((puntomascara < comamascara)) {
      control = replaceAll(control,'.','');
    } else {
      control = replaceAll(control,',','');
    }
  } else {
    if ((puntomascara > comamascara)) {
      control = replaceAll(control,',','');
    } else {
      control = replaceAll(control,'.','');
    }
  }
  return parseFloat(control.replace(",","."));
}

function ventaInmovilizado () {
  var valImpVeninMu = 0;
  var signoImpVeninMu = "+";
  if ($("#imp_veninmu").val().indexOf("-") != -1) {
    valImpVeninMu = desformateaImporte($("#imp_veninmu").val().substr(1,$("#imp_veninmu").val().length));
    signoImpVeninMu = "-";
  } else {
    valImpVeninMu = desformateaImporte($("#imp_veninmu").val());
  }
  if ($("#HD_COD_MEDIDA").val() == "M")
    valImpVeninMu = valImpVeninMu * 1000;
  if ($("#HD_COD_MEDIDA").val() == "N")
    valImpVeninMu = valImpVeninMu * 1000000;

  var sURL= getBase() + "web?flujo=KDSCFL40044&CANAL=WEB&LOCALE=es_ES";
  sURL += "&PAR_INICIO.XTI_VNCONTABLE=" + encodeURIComponent($("#HD_XTI_VNCONTABLE").val());
  sURL += "&PAR_INICIO.IMP_VNCONTABLE=" + $("#HD_IMP_VNCONTABLE").val();
  sURL += "&PAR_INICIO.XTI_EFECTOINM=" + encodeURIComponent($("#HD_XTI_EFECTOINM").val());
  sURL += "&PAR_INICIO.IMP_EFECTOINM=" + $("#HD_IMP_EFECTOINM").val();
  sURL += "&PAR_INICIO.XTI_RESEXTRA=" + encodeURIComponent($("#HD_XTI_RESEXTRA").val());
  sURL += "&PAR_INICIO.IMP_RESEXTRA=" + $("#HD_IMP_RESEXTRA").val();
  sURL += "&PAR_INICIO.IMP_VENINMU=" + valImpVeninMu;
  sURL += "&PAR_INICIO.XTI_VENINMU=" + encodeURIComponent(signoImpVeninMu);
  var parametros = new Array();
  parametros[0] ="obtenerResultadosKDSCVE40044()";

  var sPropiedades="dialogWidth:420px;dialogHeight:250px;help:no;maximize:no;minimize:no;scrollbars:no;status:no;";
  var sTitulo = "";
  var activar= "true";
  lanzarVentanaModalTitulo(sURL,parametros,sPropiedades,sTitulo,"true",activar);
  obtenerResultadosKDSCVE40044();
}

function getBase () {
  var pos = window.location.href.indexOf("://") + 3;
  var url = window.location.href.substring(pos);
  pos = url.indexOf("/");
  url = url.substring(pos)
  pos = url.lastIndexOf("/") + 1;
  url = url.substring(0, pos);
  return url;
}

function checkCalcular () {
  if ($(".DivPagina").find(".CampoEntradaImporteError[id!='qnu_banplin'][id!='qnu_banlpop1'][id!='qnu_carbanplin'][id!='imp_tesormin'][id!='qnu_carbanlpop1']").length != 0 ||
    ($("#qnu_banplin").hasClass("CampoEntradaImporteError") && $("#qnu_carbanplin").hasClass("CampoEntradaImporteOK")) ||
    ($("#qnu_banlpop1").hasClass("CampoEntradaImporteError") && $("#qnu_carbanlpop1").hasClass("CampoEntradaImporteOK"))){
    $("#btn_calcular").attr({"class":"BotonDisabled BotonMargenDer","disabled":"disabled","tabindex":"-1"}).css("cursor","default");
  }else{
    $("#btn_calcular").attr({"class":"Boton BotonMargenDer","disabled":"","tabindex":""}).css("cursor","pointer");
  }
}

function checkPlazoMinimo (plazo,campoImporte) {
  var importe = desformateaImporte($(campoImporte).val());
  if ($(campoImporte).val() != "" && importe != 0) {
    if ($(plazo).val() != "") {
      var valor = parseInt($(plazo).val());
      if ($(plazo).val() < 1){
        ataaMensaje('error','Plazo mínimo','El plazo mínimo es de 1 año','aceptar','void(0)','');
        $(plazo).attr("class","CampoEntradaImporteError");
      } else
        $(plazo).attr("class","CampoEntradaImporteOK");
    } else
      $(plazo).attr("class","CampoEntradaImporteOK");
  } else {
    $(plazo).attr("class","CampoEntradaImporteOK");
  }
  checkCalcular();
}

function checkInBalNetAct () {
  var imp_inmactbiemu = 0;
  var imp_inmactbiein = 0;
  var imp_inmoviliza = 0;
  if ($("#imp_inmactbiemu").val() != "")
    imp_inmactbiemu =  desformateaImporte($("#imp_inmactbiemu").val());
  if ($("#imp_inmactbiein").val() != "")
    imp_inmactbiein =  desformateaImporte($("#imp_inmactbiein").val());
  if ($("#imp_inmoviliza").text() != "")
    imp_inmoviliza =  desformateaImporte($("#imp_inmoviliza").text());
  var valor = imp_inmactbiein + imp_inmactbiemu;
  valor = valor.toFixed(2);
  imp_inmoviliza = imp_inmoviliza.toFixed(2);
  if (valor != imp_inmoviliza) {
    $("#imp_inmactbiemu").attr("class","CampoEntradaImporteError");
    $("#imp_inmactbiein").attr("class","CampoEntradaImporteError");
    ataaMensaje('error','Error','La suma de los campos "Inmovilizado actual bienes inmuebles" y "Inmovilizado actual bienes muebles" debe ser igual al campo "Inmovilizado neto actual"','aceptar','void(0)','');
  } else {
    $("#imp_inmactbiemu").attr("class","CampoEntradaImporteOK");
    $("#imp_inmactbiein").attr("class","CampoEntradaImporteOK");
  }
}

function checkLupa () {
  if ($("#imp_veninmu").attr("class") != "CampoEntradaImporteError" && $("#imp_veninmu").val() != ""){
    $("#btnVentaInmovilizado").attr({"src":"/ataa_es_web_pub/images/BotonPrismaticoS.gif","disabled":"","tabindex":""}).css("cursor","hand");
  } else {
    $("#btnVentaInmovilizado").attr({"src":"/ataa_es_web_pub/images/BotonPrismaticoSoff.gif","disabled":"disabled","tabindex":"-1"}).css("cursor","default");
  }
}


