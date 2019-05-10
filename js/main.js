function restrictToNumber(event) { //Función que permite ingresar solo números al input
    event = (event) ? event : window.event
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
    return true
}

function createMatriz(){
    var lengthMatriz = $("#matriz").val() // Se obtiene el tamaño de la matriz
    var i=0;
    $(".nxn .level").empty()
    $(".nxn .level:eq(0)").siblings().remove()
    $(".text-result").text("")
    $(".level").append("<span>[</span>")
    for(i=0; i<lengthMatriz; i++){ //Se agregan los inputs a la primer fila de la matriz
        var fileMatriz = "<input type='text' onkeypress='restrictToNumber(event);' maxlength='5'><span>,</span>"
        $(".level").append(fileMatriz)
    }
    $(".level").append("<span>],</span>")
    lengthMatriz = lengthMatriz -1; //se disminuye 1 porque ya se completo la primer fila de la matriz
    for (i=0; i<lengthMatriz; i++) {
        var allFiles = $(".level:eq(0)").html() //se toma toda la estructura para despues aplicarla a las filas restantes
        $(".nxn").append("<div class='level'>"+allFiles+"</div>")
    }
    $(".calculate").removeClass("display-N")
}

function getDiagonalsDifference() {
    var withoutValue = 0;
    $(".nxn input").each(function() {
        if ($(this).val() == "") { //Verifica los inputs vacios
            withoutValue = withoutValue + 1;
        }
    })
    if (withoutValue != 0) {
        alert("Llena la matriz") //Si hay mas de 1 vacio se muestra una alerta para poder completar el ejercicio
    } else {
        var lengthL = $(".nxn .level").length //Se obtiene la longitud de la matriz
        var desc = lengthL - 1;
        var diagonalAscendente = 0;
        var diagonalDescendente = 0;
        //Ciclo para la suma de diagonal descendente
        for(var i=0; i<lengthL; i++){
            var valueD = $(".level:eq("+i+") input:eq("+i+")").val()
            diagonalDescendente = diagonalDescendente + parseInt(valueD)
        }
        //Ciclo para la suma de diagonal ascendente
        for(var i=0; i<lengthL; i++){
            var valueA = $(".level:eq("+desc+") input:eq("+i+")").val()
            diagonalAscendente = diagonalAscendente + parseInt(valueA)
            desc = desc - 1;
        }

        var differenceDiagonal = Math.abs(diagonalAscendente - diagonalDescendente); //Se hace la diferencia de la suma de las diagonales de forma absoluta usando .abs
        $(".text-result").text(differenceDiagonal) //Se imprime el resultado
    }
}
