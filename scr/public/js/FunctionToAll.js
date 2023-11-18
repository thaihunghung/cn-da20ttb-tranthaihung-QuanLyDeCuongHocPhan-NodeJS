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
}