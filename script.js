// This function will be called when the user clicks the "Calculate" button.
async function calculateFromBackend() {
    // Get the values from the input fields.
    const num1 = document.getElementById('num1').value;
    const operator = document.getElementById('operator').value;
    const num2 = document.getElementById('num2').value;
    const resultDiv = document.getElementById('result');

    // Basic input validation.
    if (num1 === '' || num2 === '') {
        resultDiv.textContent = 'Please enter both numbers.';
        return;
    }

    // Prepare the data to be sent to the server.
    const data = {
        num1: parseFloat(num1),
        operator: operator,
        num2: parseFloat(num2)
    };

    // The URL of your Java backend API endpoint.
    // Replace with the actual URL of your server (e.g., http://localhost:8080/calculate).
    const apiUrl = "http://localhost/phpmyadmin/index.php?route=/database/structure&db=calculator";

    try {
        // Send a POST request to the Java backend.
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response was successful.
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        // Parse the JSON response from the server.
        const result = await response.json();
        
        // Display the result received from the backend.
        resultDiv.textContent = `Result: ${result.value}`;

    } catch (error) {
        // Handle any errors that occurred during the fetch request.
        resultDiv.textContent = `Error: ${error.message}`;
        console.error('Error:', error);
    }
}