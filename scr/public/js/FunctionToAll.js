class FunctionToAll {
    checkboxClicked(id) {
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (otherCheckbox) {
            if (otherCheckbox.id !== id) {
                otherCheckbox.checked = false;
                localStorage.removeItem(otherCheckbox.id);
            }
        });
        console.log('Local Storage:', localStorage);
    }
}
