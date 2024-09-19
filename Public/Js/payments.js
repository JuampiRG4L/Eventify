async function confirmPayment() {
    const salonId = document.getElementById('salon-id').value; 
    const tipoEvento = document.getElementById('tipo-evento').value; 
    const numeroDePersonas = document.getElementById('numero-personas').value; 
    const horaInicio = document.getElementById('hora-inicio').value; 
    const horaFin = document.getElementById('hora-fin').value; 
    const precioTotal = document.getElementById('total-amount').innerText; 

    try {
        const response = await fetch('/user/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_salon: salonId,
                tipo_evento: tipoEvento,
                numero_de_personas: numeroDePersonas,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                precio_total: precioTotal
            })
        });

        if (response.ok) {
            const result = await response.json();
            alert('Reserva realizada con éxito');
            window.location.href = '/user/reservation';
        } else {
            alert('Error al realizar la reserva');
        }
    } catch (error) {function confirmPayment() {
        const salonId = document.getElementById('salon-id').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const cardHolderName = document.getElementById('card-holder-name').value;
        const cardExpirationMonth = document.getElementById('card-expiration-month').value;
        const cardExpirationYear = document.getElementById('card-expiration-year').value;
        const cardCVC = document.getElementById('card-cvc').value;
    
        // Aquí deberías validar los campos
    
        // Enviar datos a tu servidor, por ejemplo, con fetch
        fetch('/user/payments/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                salonId,
                paymentMethod,
                cardHolderName,
                cardExpirationMonth,
                cardExpirationYear,
                cardCVC
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            console.log(data);
            // Redirigir o mostrar un mensaje de éxito
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
        console.error('Error:', error);
        alert('Error de red al realizar la reserva');
    }
}

function confirmPayment() {
    const salonIdElement = document.getElementById('salon-id');
    if (!salonIdElement) {
        console.error('Element with ID "salon-id" not found.');
        return;
    }
    const salonId = salonIdElement.value;

    const paymentMethodElement = document.getElementById('payment-method');
    if (!paymentMethodElement) {
        console.error('Element with ID "payment-method" not found.');
        return;
    }
    const paymentMethod = paymentMethodElement.value;

    const cardHolderNameElement = document.getElementById('card-holder-name');
    const cardHolderName = cardHolderNameElement ? cardHolderNameElement.value : '';

    const cardExpirationMonthElement = document.getElementById('card-expiration-month');
    const cardExpirationMonth = cardExpirationMonthElement ? cardExpirationMonthElement.value : '';

    const cardExpirationYearElement = document.getElementById('card-expiration-year');
    const cardExpirationYear = cardExpirationYearElement ? cardExpirationYearElement.value : '';

    const cardCVCElement = document.getElementById('card-cvc');
    const cardCVC = cardCVCElement ? cardCVCElement.value : '';

    // Aquí deberías validar los campos y proceder con el envío
    // ...
}



document.addEventListener('DOMContentLoaded', () => {
    const paymentMethodSelect = document.getElementById('payment-method');
    const cardDetailsDiv = document.getElementById('card-details');

    // Mostrar/ocultar los campos de la tarjeta según el método de pago seleccionado
    paymentMethodSelect.addEventListener('change', function () {
        if (this.value === 'tarjeta') {
            cardDetailsDiv.style.display = 'block';
        } else {
            cardDetailsDiv.style.display = 'none';
        }
    });

    // Agregar los próximos años al select de años
    const currentYear = new Date().getFullYear();
    const yearSelect = document.getElementById('card-expiration-year');

    for (let i = 0; i < 10; i++) { // Muestra los próximos 10 años
        const option = document.createElement('option');
        option.value = currentYear + i;
        option.textContent = currentYear + i;
        yearSelect.appendChild(option);
    }
});
