$(document).ready(function() {
// add and delete items in condition
	document.getElementById('add-condition').addEventListener('click', function() {
    	const container = document.getElementById('conditions-container');
    	const newCondition = document.createElement('div');
        newCondition.classList.add('condition-item', 'form-group');
        newCondition.innerHTML = `
            <label for="conditionName">Condition Name</label>
            <input type="text" class="form-control" name="conditionName[]">
            <label for="diagnoseDate">Date of Diagnose</label>
            <input type="date" class="form-control" name="diagnoseDate[]">
            <button type="button" class="btn btn-danger btn-sm delete-condition">Delete</button>`;
    container.appendChild(newCondition);
    addDeleteEvent(newCondition.querySelector('.delete-condition'));
});

function addDeleteEvent(button) {
    button.addEventListener('click', function() {
        const conditionItem = button.closest('.condition-item');
        conditionItem.remove();
    });
}

document.querySelectorAll('.delete-condition').forEach(addDeleteEvent);

// add and delete items in surgery
document.getElementById('add-surgery').addEventListener('click', function() {
    const container = document.getElementById('surgery-container');
    const newSurgery = document.createElement('div');
    newSurgery.classList.add('surgery-item', 'form-group');
    newSurgery.innerHTML = `
        <label for="surgeryName">Surgery Name</label>
        <input type="text" class="form-control" name="surgeryName[]">
        <div class="d-flex align-items-end">
            <div style="flex: 1;">
                <label for="surgeryLoc">Surgery Location</label>
                <input type="text" class="form-control" name="surgeryLoc[]">
            </div>
            <div style="flex: 1; margin-left: 10px;">
                <label for="surgeryType">Type</label>
                <input type="text" class="form-control" name="surgeryType[]">
            </div>
            <div style="flex: 1; margin-left: 10px;">
                <label for="surgeryYear">Year Conducted</label>
                <input type="number" class="form-control" name="surgeryYear[]" min="1900" max="2100">
            </div>
            <button type="button" class="btn btn-danger btn-sm delete-surgery">Delete</button>
        </div>
    `;
    container.appendChild(newSurgery);
    addDeleteEvent(newSurgery.querySelector('.delete-surgery'));
});

function addDeleteEvent(button) {
    button.addEventListener('click', function() {
        const surgeryItem = button.closest('.surgery-item');
        surgeryItem.remove();
    });
}

// Add delete event to initial surgery item
document.querySelectorAll('.delete-surgery').forEach(addDeleteEvent);


// back2top
    var backToTop = $('#back2Top');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            ackToTop.fadeOut();
        }
    });
    backToTop.click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });
});

/*PREVIEW*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('medical-history-form');
    const previewContainer = document.getElementById('preview-container');
    const submitButton = document.getElementById('submit-button');
    const editButton = document.getElementById('edit-button');
    const finalSubmitButton = document.getElementById('final-submit-button');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        populatePreview();
        form.classList.add('hidden');
        previewContainer.classList.remove('hidden');
    });

    editButton.addEventListener('click', function () {
        form.classList.remove('hidden');
        previewContainer.classList.add('hidden');
    });

    finalSubmitButton.addEventListener('click', function () {
        form.submit();
    });

    function populatePreview() {
        document.getElementById('preview-full-name').textContent = document.getElementById('patientName').value;
        document.getElementById('preview-birthday').textContent = document.getElementById('patientBday').value;
        document.getElementById('preview-age').textContent = document.getElementById('patientAge').value;
        document.getElementById('preview-sex').textContent = document.getElementById('patientSex').value;
        document.getElementById('preview-religion').textContent = document.getElementById('patientRel').value;
        document.getElementById('preview-marital-status').textContent = document.getElementById('patientMarStat').value;
        document.getElementById('preview-occupation').textContent = document.getElementById('patientOccup').value;
        document.getElementById('preview-phone-number').textContent = document.getElementById('patientPNum').value;
        document.getElementById('preview-email').textContent = document.getElementById('patientEmail').value;
        document.getElementById('preview-blood-type').textContent = document.getElementById('patientBType').value;
        document.getElementById('preview-height').textContent = document.getElementById('patientHeight').value;
        document.getElementById('preview-weight').textContent = document.getElementById('patientWeight').value;
        document.getElementById('preview-pcp-name').textContent = document.getElementById('doctorPDoc').value;
        document.getElementById('preview-pcp-phone').textContent = document.getElementById('doctorPNum').value;
        document.getElementById('preview-pcp-email').textContent = document.getElementById('doctorPEmail').value;
        document.getElementById('preview-condition-medications').textContent = document.getElementById('conditionMed').value;
        document.getElementById('preview-allergies').textContent = document.getElementById('allergenName').value;
        document.getElementById('preview-allergen-medications').textContent = document.getElementById('allergenMed').value;

        const conditionsContainer = document.getElementById('conditions-container');
        const previewConditions = document.getElementById('preview-conditions');
        previewConditions.innerHTML = '';
        const conditionItems = conditionsContainer.querySelectorAll('.condition-item');
        conditionItems.forEach(function (item, index) {
            const conditionName = item.querySelector('input[name="conditionName[]"]').value;
            const diagnoseDate = item.querySelector('input[name="diagnoseDate[]"]').value;
            previewConditions.innerHTML += `<p><strong>Condition ${index + 1}:</strong> ${conditionName} (Diagnosed: ${diagnoseDate})</p>`;
        });

        const surgeriesContainer = document.getElementById('surgery-container');
        const previewSurgeries = document.getElementById('preview-surgeries');
        previewSurgeries.innerHTML = '';
        const surgeryItems = surgeriesContainer.querySelectorAll('.surgery-item');
        surgeryItems.forEach(function (item, index) {
            const surgeryName = item.querySelector('input[name="surgeryName[]"]').value;
            const surgeryLoc = item.querySelector('input[name="surgeryLoc[]"]').value;
            const surgeryType = item.querySelector('input[name="surgeryType[]"]').value;
            const surgeryYear = item.querySelector('input[name="surgeryYear[]"]').value;
            previewSurgeries.innerHTML += `<p><strong>Surgery ${index + 1}:</strong> ${surgeryName} (Location: ${surgeryLoc}, Type: ${surgeryType}, Year: ${surgeryYear})</p>`;
        });
    }
});
