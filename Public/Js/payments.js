document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener los salones y el total
    async function loadPaymentInfo() {
        try {
            const response = await fetch('/user/payments/info'); // Ruta para obtener información de pagos
            const data = await response.json();

            // Muestra la información de los salones
            const paymentInfoDiv = document.getElementById('payment-info');
            paymentInfoDiv.innerHTML = data.salones.map(salon => `
                <div class="salon-info">
                    <p>Salón: ${salon.nombre}</p>
                    <p>Precio: $${salon.precio}</p>
                </div>
            `).join('');

            // Muestra el total
            const totalAmountSpan = document.getElementById('total-amount');
            totalAmountSpan.textContent = data.total;

        } catch (error) {
            console.error('Error al cargar la información de pagos:', error);
        }
    }

    // Cargar la información cuando la página se carga
    loadPaymentInfo();

    // Event listener para el botón de confirmar y pagar
    document.getElementById('confirm-payment').addEventListener('click', () => {
        alert('Pago confirmado. Gracias por tu compra.');
        //  la lógica para procesar el pago
    });
});
