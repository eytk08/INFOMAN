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