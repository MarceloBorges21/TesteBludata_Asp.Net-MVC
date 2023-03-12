$(document).ready(function () {
    $.noConflict();
    validaLetrasENumeros();
    CarregaDados(id);
});

const UF = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MS", "MT", "MG", "PA", "PB", "PR"
    , "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

var uf = document.getElementById("UF");
for (var i = 0; i < UF.length; i++) {
    uf.innerHTML = uf.innerHTML +
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

$("#Salvar").click(function ()//id=Salvar, chama o metodo salvar no ajax
{
    validaCampos();
    if (validaCampos()) {
        Register();
    }
});

function validaCampos() {
    var mensagem = "";
   
    if ($("#Nome").val() == null || $("#Nome").val() == "") {
        $("#Nome").addClass("ErroBorder");
        setTimeout(function () {
            $("#Nome").removeClass("ErroBorder");
            $("#Nome").addClass("BorderNormal");
        }, 3000);
        mensagem = "1";
    }
    else {
        $("#Nome").addClass("BorderNormal");
    }

    if ($("#UF").val() == null || $("#UF").val() == "") {
        $("#UF").addClass("ErroBorder");
        setTimeout(function () {
            $("#UF").removeClass("ErroBorder");
            $("#UF").addClass("BorderNormal");
        }, 3000);
        mensagem = "1";
    }
    else {
        $("#UF").addClass("BorderNormal");
    }

    if ($("#CPF_ou_CNPJ").val() == null || $("#CPF_ou_CNPJ").val() == "") {
        $("#CPF_ou_CNPJ").addClass("ErroBorder");
        setTimeout(function () {
            $("#CPF_ou_CNPJ").removeClass("ErroBorder");
            $("#CPF_ou_CNPJ").addClass("BorderNormal");
        }, 3000);
        mensagem = "1";
    }
    else {
        $("#CPF_ou_CNPJ").addClass("BorderNormal");
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

function CarregaDados(id) {
  $.ajax
        ({
            type: "GET",
            url: "/Empresa/CarregaDados/" + id ,
            dataType: "json",
            success: function (dados) {               
                $("#Id").val(dados.Id);
                $("#Nome").val(dados.Nome);
                $("#UF").val(dados.UF);
                $("#CPF_ou_CNPJ").val(dados.CPF_ou_CNPJ);
            }, error: function (xhr, textStatus, errorThrown) {
                console.log("Erro ao buscar os dados de edição: " + errorThrown);
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

function Edit() {
    jQuery.ajax
        ({
            type: "POST",
            url: "/Empresa/EditEmpresa",
            dataType: "json",
            data: {
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

function Delete(Id) {
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
