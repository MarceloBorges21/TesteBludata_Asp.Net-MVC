
$(document).ready(function () {
    $.noConflict();
    validaLetrasENumeros();
});
const UF = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MS", "MT", "MG", "PA", "PB", "PR"
    , "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

var uf = document.getElementById("UF");
for (var i = 0; i < UF.length; i++) {
    uf.innerHTML = uf.innerHTML +
        '<option value="' + UF[i] + '">' + UF[i] + '</option>';
}

var ufEdit = document.getElementById("UFEdit");
for (var i = 0; i < UF.length; i++) {
    ufEdit.innerHTML = ufEdit.innerHTML +
        '<option value="' + UF[i] + '">' + UF[i] + '</option>';
}

function validaLetrasENumeros() {
    var Nome = $("#Nome");
    Nome.keyup(function () {
        var valorNome = Nome.val().replace(/[^a-zA-Z " "]+/g, '');
        Nome.val(valorNome);
    });

    var CPF = $("#CPF_ou_CNPJ");
    CPF.keyup(function () {
        var valorCpf = CPF.val().replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        CPF.val(valorCpf);
    });
}

$("#Salvar").click(function () {
    if (validaDados()) {
        Register();
    }
});

function validaDados() {
    var mensagem = "";

    if ($("#Nome").val() == null || $("#Nome").val() == "") {
        $("#Nome").css({ "border-color": "#F00", "padding": "2px" });
        setTimeout(function () {
            $("#Nome").css({ "border-color": "", "padding": "1px" });
        }, 3000);
        mensagem = "1";
    }
    else {
        $("#Nome").css({ "border-color": "#blue", "padding": "1px" });
    }

    if ($("#UF").val() == null || $("#UF").val() == "") {
        $("#UF").css({ "border-color": "#F00", "padding": "1px" });
        setTimeout(function () {
            $("#UF").css({ "border-color": "", "padding": "1px" });
        }, 3000);
        mensagem = "1";
    }
    else {
        $("#UF").css({ "border-color": "#blue", "padding": "1px" });
    }

    if ($("#CPF_ou_CNPJ").val() == null || $("#CPF_ou_CNPJ").val() == "") {
        $("#CPF_ou_CNPJ").css({ "border-color": "#F00", "padding": "1px" });
        setTimeout(function () {
            $("#CPF_ou_CNPJ").css({ "border-color": "", "padding": "1px" });
        }, 3000);
        mensagem = "1";
    }
    else {
        $("#CPF_ou_CNPJ").css({ "border-color": "#blue", "padding": "1px" });
    }

    if (mensagem != "") {
        $("#resposta").addClass("alert alert-danger");
        $("#resposta").html("Verifique o formulario, existem campos obrigatorios!");
        $("#resposta").show();
        setTimeout(function () {
            $("#resposta").html("");
            $("#resposta").hide();
        }, 3000);
        return false;
    }
    else {
        $("#resposta").html("");
        $("#resposta").hide();
        return true;
    }
}

function CarregaDados(Id) {
    debugger
    console.log(Id)
    $.ajax
        ({
            url: "/Empresa/CarregaDados/" + Id,
            success: function (data) {
                //$("#Id").val(data.Id);
                $("#NomeEdit").val(data.Nome);
                $("#UFEdit").val(data.UF);
                $("#CPF_ou_CNPJEdit").val(data.CPF_ou_CNPJ);
            }
        });


}

function Register() {
    jQuery.ajax
        ({
            type: "POST",
            url: "/Empresa/RegisterEmpresa",//chama metodo do controler '/controler/metodo/'
            dataType: "json",
            data:
            {
                Nome: $("#Nome").val(),
                UF: $("#UF").val(),
                CPF_ou_CNPJ: $("#CPF_ou_CNPJ").val(),
            },
            success: function (data) {
                //retorna uma resposta de sucesso na 'div resposta'
                $("#resposta").addClass("alert alert-success");
                $("#resposta").html("Registro salvo com sucesso");
                $("#resposta").show();

                //some com a div de resposta apos 5seg
                setTimeout(function () {
                    $("#resposta").fadeOut("fast");
                    window.location.assign("/Empresa/Index");
                }, 2000);
            },
            error: function (request, status, erro) {
                $("#resposta").addClass("alert alert-danger");
                $("#resposta").html("Registro NÃO FOI SALVO." + erro);
                $("#resposta").show();
            },
            complete: function (jqXHR, textStatus) { }
        });
}

function Put() {
    jQuery.ajax
        ({
            type: "POST",
            url: "/Empresa/EditEmpresa",
            dataType: "json",
            data: {
                Id: $("#Id").val(),
                Nome: $("#Nome").val(),
                UF: $("#UF").val(),
                CPF_ou_CNPJ: $("#CPF_ou_CNPJ").val()
            },
            success: function (data) {
                //retorna uma resposta de sucesso na 'div resposta'
                $("#resposta").addClass("alert alert-success");
                $("#resposta").html("Registro editado com sucesso");
                $("#resposta").show();

                //some com a div de resposta apos 5seg
                setTimeout(function () {
                    $("#resposta").fadeOut("fast");
                    window.location.assign("/Empresa/Index");
                }, 2000);

            },
            error: function (request, status, erro) {
                $("#resposta").addClass("alert alert-danger");
                $("#resposta").html("Registro não foi editado.");
                $("#resposta").show();
            },
            complete: function (jqXHR, textStatus) { }
        });
}

function Excluir(Id) {
    if (confirm("Deseja realmente excluir?") == true) {
        jQuery.ajax
            ({
                type: "POST",
                url: "/Empresa/DeleteEmpresa",
                dataType: "json",
                data: {
                    Id: Id
                },
                success: function (data) {
                    window.location.assign("/Empresa/Index");
                }
            });
    } else {
        return false;
    }
}
