// SIMULADOR BANCARIO 
// Funciones:
//      1) Consulta de saldo
//      2) Abono
//      3) Simulación de crédito
//      4) Transferencia bancaria
//      5) Cerrar sesión

// VARIABLES
let balance = 1000000
const intRate = .015


// FUNCIONES
function consultaSaldo(balance) {
    alert(`Su saldo actual es de ${balance}`)
    console.log(`El usuario consultó su saldo, ${balance}.`)
}

function cerrarSesion() {
    alert(`Muchas gracias por usar nuestros servicios ¡Hasta una próxima ocasión!`)
    console.log(`El usuario terminó la sesión.`)
}

function transferenciaBancaria(balance) {
    let monto = Number(prompt(`Ingrese el monto a transferir.`))

    if(monto>balance || monto <= 0 || isNaN(monto)) {
        alert(`No es posible realizar la transacción. 
               Usted está intentando transferir un valor que no corresponde.
               Se volverá al menú inicial`)
        console.log(`El usuario ha ingresado un valor incorrecto. Transferencia incompleta.`)
    }

    else {
        balance -= monto
        alert(`Usted ha transferido ${monto} de manera exitosa. Su nuevo saldo es de ${balance}`)
        console.log(`El usuario ha realizado una transferencia exitosa. Saldo actual ${balance}`)
    }
    
    return [balance , monto]
}

function abono(balance) {
    let monto = Number(prompt(`Ingrese el monto a abonar.`))

    if(monto <= 0 || isNaN(monto)) {
        alert(`No es posible realizar la transacción. 
        Usted está intentando abonar un valor que no corresponde.
        Se volverá al menú inicial`)
        console.log(`El usuario ha ingresado un valor incorrecto. Abono incompleto.`)
    }

    else {
        balance += monto
        alert(`Usted ha abonado ${monto} de manera exitosa. Su nuevo saldo es de ${balance}`)
        console.log(`El usuario ha realizado un abono exitoso. Saldo actual ${balance}`)
    }

    return balance
}

function simuladorCredito(balance, intRate) {

    dataCalcCredito = infoCredito()
    //                                income                intr    instalments             loan
    dataAprobCredito = calculoCredito(dataCalcCredito[0], intRate, dataCalcCredito[1], dataCalcCredito[2])

    //                           balance    instalments         loan                intereses      detalle cuota         
    balance = aprobacionCredito(balance, dataCalcCredito[1], dataCalcCredito[2], dataAprobCredito[0], dataAprobCredito[1])
    return balance
}


function infoCredito(){
    
    let on = true
    while(on){

        let income = Number(prompt(`Ingrese nivel de ingreso/renta líquido/a percibido.`))
        let instalments = Number(prompt(`Ingrese el número de meses en el que desea cancelar sus cuotas.`))
        let montoLoan = Number(prompt(`Ingrese el monto a solicitar en préstamo.`))

        if(typeof montoLoan != 'number' || isNaN(montoLoan) || isNaN(instalments) || isNaN(income) ||  typeof income != 'number' || typeof instalments != 'number' || 
            montoLoan < 0 || income < 0){
            
                console.log(`El usuario ha ingresado valor(es) incorrecto(s).`)
                alert(`Usted ha ingresado un valor que no corresponde, vuelva a ingresar su información.`)
                continue
        }

        console.log(`Info de solicitud crédito, ingreso ${income}, cuotas ${instalments}, y monto préstamo ${montoLoan}`)
        return [income, instalments, montoLoan]
    }
}

function calculoCredito(income, intRate, instalments, montoLoan) {

    let tasa = 0
    if(income < 100000) {
        tasa = intRate
    }

    else if(income >= 100000 && income <= 500000) {
        tasa = intRate + .002
    }

    else {
        tasa = intRate + .008
    }

    let totalIntereses = 0
    for(i=0;i<instalments;i++) {
        totalIntereses += montoLoan * (Math.pow((1+tasa),i)-1)
    }

    let detalleCuota = (montoLoan + totalIntereses)/instalments

    console.log(`Info de crédito calculado, préstamo, intereses totales ${totalIntereses}, y valor cuota mensual ${ detalleCuota}`)
    return [totalIntereses, detalleCuota]
}

function aprobacionCredito(balance, instalments, montoLoan, totalIntereses, detalleCuota) {

    let onContinue = true
    while(onContinue){
        let okPrestamo = Number(prompt(`El crédito solicitado es de ${montoLoan}. El valor cada cuota es ${detalleCuota.toFixed(1)}, las que deben ser canceladas en un periodo de ${instalments} meses. El monto total a pagar por el prestamo asciende ${(montoLoan + totalIntereses).toFixed(1)}. En caso de aceptar ingrese (1), ingrese (2).`))
                            
        if(okPrestamo === 1) {
            alert(`Su prestamo de ${montoLoan} ha sido aprobado. Su balance actualizado es de ${balance + montoLoan}`)
            console.log(`Usuario ha aceptado condiciones de crédito. Se otorgan ${montoLoan} en ${instalments} cuotas mensuales.`)
            return balance + montoLoan
        }

        else if(okPrestamo === 2) {
            alert(`Usted ha cancelado su solicitud de préstamo. Esta operación queda sin efecto.`)
            console.log(`Usuario ha rechazado condiciones de crédito.`)
            return balance
        }

        else {
            alert(`Usted ha ingresado un valor que no corresponde, vuelva a intentarlo.`)
            console.log(`El usuario ha ingresado valor(es) incorrecto(s).`)
            continue
        }
    } 
}

function bienvenidaBanco(balance, intRate){

    let on = true
    while(on){

        let option = Number(prompt(`Bienvenido a banco simulador, favor ingrese la opción que desea:
                            1 : Consulta de saldo.
                            2:  Abono.
                            3 : Simulación de crédito.
                            4 : Transferencia bancaria.
                            5 : Cerrar sesión.`))

        if(option === 1){
            consultaSaldo(balance)
        }
        
        else if(option === 2){
            balance = abono(balance)
        }

        else if (option === 3){
            balance = simuladorCredito(balance, intRate)
        }

        else if(option === 4){
            balance = transferenciaBancaria(balance)[0]
        }

        else if(option === 5){
            on = false
            cerrarSesion()
        }

        else {
            alert(`Usted ha ingresado una opción incorrecta, favor inténtelo nuevamente.`)
            console.log(`Usuario usa opción errónea.`)
        }

    }
}

bienvenidaBanco(balance, intRate)


