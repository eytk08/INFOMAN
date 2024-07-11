$(document).ready(function() {
    // Add and delete items in condition
    $('#add-condition').on('click', function() {
        const container = $('#conditions-container');
        const newCondition = $(`
            <div class="condition-item form-group">
                <label for="conditionName">Condition Name</label>
                <input type="text" class="form-control inptborder" name="conditionName[]">
                <label for="diagnoseDate">Date of Diagnose</label>
                <input type="date" class="form-control inptborder" name="diagnoseDate[]">
                <label for="med">Medicine</label>
                <input type="text" class="form-control inptborder" name="med[]">
                <button type="button" class="btn btn-danger btn-sm delete-condition">Delete</button>
            </div>`);
        container.append(newCondition);
        addDeleteConditionEvent(newCondition.find('.delete-condition'));
    });

    function addDeleteConditionEvent(button) {
        button.on('click', function() {
            $(this).closest('.condition-item').remove();
        });
    }

    $('.delete-condition').each(function() {
        addDeleteConditionEvent($(this));
    });

    // Add and delete items in allergy
    $('#add-allergy').on('click', function() {
        const container = $('#allergy-container');
        const newAllergy = $(`
            <div class="allergy-item form-group">
                <label for="allergenName">Allergy Name</label>
                <input type="text" class="form-control inptborder" name="allergenName[]">
                <label for="diagnoseDate">Date of Diagnose</label>
                <input type="date" class="form-control inptborder" name="allergenDiagnoseDate[]">
                <label for="med">Medicine</label>
                <input type="text" class="form-control inptborder" name="allergyMed[]">
                <button type="button" class="btn btn-danger btn-sm delete-allergy">Delete</button>
            </div>`);
        container.append(newAllergy);
        addDeleteAllergyEvent(newAllergy.find('.delete-allergy'));
    });

    function addDeleteAllergyEvent(button) {
        button.on('click', function() {
            $(this).closest('.allergy-item').remove();
        });
    }

    $('.delete-allergy').each(function() {
        addDeleteAllergyEvent($(this));
    });

    // Add and delete items in surgery
    $('#add-surgery').on('click', function() {
        const container = $('#surgery-container');
        const newSurgery = $(`
            <div class="surgery-item form-group">
                <label for="surgeryName">Surgery Name</label>
                <input type="text" class="form-control inptborder" name="surgeryName[]">
                <div class="d-flex align-items-end">
                    <div style="flex: 1;">
                        <label for="surgeryLoc">Surgery Location</label>
                        <input type="text" class="form-control inptborder" name="surgeryLoc[]">
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <label for="surgeryType">Type</label>
                        <input type="text" class="form-control inptborder" name="surgeryType[]">
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <label for="surgeryYear">Year Conducted</label>
                        <input type="number" class="form-control inptborder" name="surgeryYear[]" min="1900" max="2100">
                    </div>
                    <button type="button" class="btn btn-danger btn-sm delete-surgery">Delete</button>
                </div>
            </div>`);
        container.append(newSurgery);
        addDeleteSurgeryEvent(newSurgery.find('.delete-surgery'));
    });

    function addDeleteSurgeryEvent(button) {
        button.on('click', function() {
            $(this).closest('.surgery-item').remove();
        });
    }

    $('.delete-surgery').each(function() {
        addDeleteSurgeryEvent($(this));
    });

// back2top
    var backToTop = $('#back2Top');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });
    backToTop.click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });
});

/*PREVIEW*/
document.addEventListener('DOMContentLoaded', function() {
    // Function to populate preview based on form data
    function populatePreview(formData) {
        var previewHtml = '<div><strong>Full Name:</strong> ' + (formData.patientName || '') + '</div>';
        previewHtml += '<div><strong>Birthday:</strong> ' + (formData.patientBday || '') + '</div>';
        previewHtml += '<div><strong>Age:</strong> ' + (formData.patientAge || '') + '</div>';
        previewHtml += '<div><strong>Sex:</strong> ' + (formData.patientSex || '') + '</div>';
        previewHtml += '<div><strong>Religion:</strong> ' + (formData.patientRel || '') + '</div>';
        previewHtml += '<div><strong>Marital Status:</strong> ' + (formData.patientMarStat || '') + '</div>';
        previewHtml += '<div><strong>Occupation:</strong> ' + (formData.patientOccup || '') + '</div>';
        previewHtml += '<div><strong>Phone Number:</strong> ' + (formData.patientPNum || '') + '</div>';
        previewHtml += '<div><strong>Email Address:</strong> ' + (formData.patientEmail || '') + '</div>';
        previewHtml += '<div><strong>Blood Type:</strong> ' + (formData.patientBType || '') + '</div>';
        previewHtml += '<div><strong>Height:</strong> ' + (formData.patientHeight || '') + '</div>';
        previewHtml += '<div><strong>Weight:</strong> ' + (formData.patientWeight || '') + '</div>';
        previewHtml += '<div><strong>PCP\'s Name:</strong> ' + (formData.doctorPDoc || '') + '</div>';
        previewHtml += '<div><strong>PCP\'s Phone Number:</strong> ' + (formData.doctorPNum || '') + '</div>';
        previewHtml += '<div><strong>PCP\'s Email Address:</strong> ' + (formData.doctorPEmail || '') + '</div>';

        var previewModalContent = document.getElementById('modal-preview-content');
        if (previewModalContent) {
            previewModalContent.innerHTML = previewHtml;
        } else {
            console.error('Modal preview content element not found.');
        }
    }

    // Event listener for form submission
    $('#medical-history-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        var formData = {
            patientName: $('#patientName').val(),
            patientBday: $('#patientBday').val(),
            patientAge: $('#patientAge').val(),
            patientSex: $('#patientSex').val(),
            patientRel: $('#patientRel').val(),
            patientMarStat: $('#patientMarStat').val(),
            patientOccup: $('#patientOccup').val(),
            patientPNum: $('#patientPNum').val(),
            patientEmail: $('#patientEmail').val(),
            patientBType: $('#patientBType').val(),
            patientHeight: $('#patientHeight').val(),
            patientWeight: $('#patientWeight').val(),
            doctorPDoc: $('#doctorPDoc').val(),
            doctorPNum: $('#doctorPNum').val(),
            doctorPEmail: $('#doctorPEmail').val()
        };

        
        populatePreview(formData);

        // Show the modal
        $('#previewModal').modal('show');
    });
});