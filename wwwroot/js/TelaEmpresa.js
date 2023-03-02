
    var UF = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MS", "MT", "MG", "PA", "PB", "PR"
        , "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];



    var ele =document.getElementById("UF");
    for (var i = 0; i < UF.length; i++) {
        ele.innerHTML = ele.innerHTML +
            '<option value="' + UF[i] + '">' + UF[i] + '</option>';
        console.log(UF[i]);
    }





