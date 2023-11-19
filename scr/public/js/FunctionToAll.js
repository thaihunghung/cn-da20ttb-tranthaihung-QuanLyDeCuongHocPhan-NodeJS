class FunctionToAll {
    checkboxClicked(id) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (otherCheckbox) {
            if (otherCheckbox.id !== id) {
                otherCheckbox.checked = false;
            }
        });
    }

    checkboxChanged(checkboxId) {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.id !== checkboxId) {
                checkbox.checked = false;
            }
        });
    }
    sendDataToServer(data) {
        const serverEndpoint = '/savedata';
        // Send data to the server using AJAX
        $.ajax({
            type: 'POST',
            url: serverEndpoint,
            contentType: 'application/json', 
            data: JSON.stringify(data), 
            success: function (response) {
                console.log('Data sent successfully');
            },
            error: function (error) {
                console.error('Error sending data to the server', error);
            }
        });
    }
}