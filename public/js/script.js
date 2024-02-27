$(document).ready(function() {

    // Initialize Bootstrap Datepicker for Date
    $('#datepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar',
            up: 'fas fa-chevron-up',
            down: 'fas fa-chevron-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'far fa-calendar-check',
            clear: 'far fa-trash-alt',
            close: 'far fa-times-circle'
        }
    });

    // Initialize Bootstrap Datetimepicker for Time
    $('#timepicker').datetimepicker({
        format: 'HH:mm:ss',
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar',
            up: 'fas fa-chevron-up',
            down: 'fas fa-chevron-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'far fa-calendar-check',
            clear: 'far fa-trash-alt',
            close: 'far fa-times-circle'
        }
    });

     // Function to handle icon selection
    $('#selectIconsBtn').click(function() {
        // Get the selected icons
        var selectedIcons = $('.icon.selected').toArray().map(icon => $(icon).data('icon'));

        // Update the hidden input fields with selected icons
        $('#selectedIcon1').val(selectedIcons[0] || '');
        $('#selectedIcon2').val(selectedIcons[1] || '');
        $('#selectedIcon3').val(selectedIcons[2] || '');

        // Close the modal
        $('#iconModal').modal('hide');
    });

    // Function to toggle icon selection
    $('.icon').click(function() {
        $(this).toggleClass('selected');
    });

    // Handle form submission
    $('#addTaskForm').submit(function(event) {
        // Combine date and time inputs into one timestamp
        var date = $('#datepicker').val();
        var time = $('#timepicker').val();
        var datetime = moment(date + ' ' + time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        // Assign combined datetime to the hidden input field
        $('#deadline').val(datetime);
    });

    // Handle click event of the complete button
    $('.complete-task').click(function() {
        var taskId = $(this).data('task-id');
        if (confirm('Are you sure you want to complete this task?')) {
            $.ajax({
                url: '/' + taskId + '/complete',
                type: 'PUT',
                success: function(response) {
                    // Remove the completed task from the DOM
                    $('#task-' + taskId).remove();
                    // Redirect to home page
                    window.location.href = '/';
                },
                error: function(xhr, status, error) {
                    console.error('Error completing task:', error);
                }
            });
        }
    });

    // Handle click event of the delete button
    $('.delete-task').click(function() {
        var taskId = $(this).data('task-id');
        if (confirm('Are you sure you want to delete this task?')) {
            $.ajax({
                url: '/' + taskId,
                type: 'DELETE',
                success: function(response) {
                    // Remove the deleted task from the DOM
                    $('#task-' + taskId).remove();
                    // Redirect to home page
                    window.location.href = '/';
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting task:', error);
                }
            });
        }
    });
});
