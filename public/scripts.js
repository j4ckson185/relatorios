document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Process the data and display it
            const reportContainer = document.getElementById('reportContainer');
            reportContainer.innerHTML = generateTable(jsonData);

            // Set up the send button
            document.getElementById('sendButton').addEventListener('click', function() {
                const motoboy = document.getElementById('motoboySelect').value;
                if (motoboy) {
                    sendToMotoboy(motoboy, jsonData);
                } else {
                    alert('Selecione um motoboy para enviar o relatório.');
                }
            });
        };
        reader.readAsBinaryString(file);
    }
});

function generateTable(data) {
    if (data.length === 0) return '<p>Nenhum dado encontrado.</p>';

    const headers = Object.keys(data[0]);
    let table = '<table border="1"><thead><tr>';

    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });

    table += '</tr></thead><tbody>';

    data.forEach(row => {
        table += '<tr>';
        headers.forEach(header => {
            table += `<td>${row[header] || ''}</td>`;
        });
        table += '</tr>';
    });

    table += '</tbody></table>';
    return table;
}

function sendToMotoboy(motoboy, data) {
    // Implement the logic to send data to the specific motoboy's page
    // This can involve saving the data to a server or directly modifying HTML files

    console.log(`Sending data to ${motoboy}:`, data);
}
