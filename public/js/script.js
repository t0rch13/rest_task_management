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
    var selectedIcons = [];

    // Function to toggle icon selection
    $(".icon").click(function() {
        $(this).toggleClass("selected");
    });

    // Function to handle the selection of icons
    $("#selectIconsBtn").click(function() {
        selectedIcons = [];
        $(".icon.selected").each(function() {
            selectedIcons.push($(this).data("icon"));
        });
        // Display selected icons in the hidden input fields
        $("#selectedIcon1").val(selectedIcons[0]);
        $("#selectedIcon2").val(selectedIcons[1]);
        $("#selectedIcon3").val(selectedIcons[2]);
        // Close the modal
        $("#iconModal").modal("hide");
    });

    // Handle form submission
    $('#addTaskForm').submit(function(event) {
        // Combine date and time inputs into one timestamp
        var date = $('#datepicker').val();
        var time = $('#timepicker').val();
        var datetime = new Date(date + 'T' + time); // Combine date and time into one datetime object
    
        // Subtract 5 hours from the datetime
        datetime.setHours(datetime.getHours() - 5);
    
        // Format the datetime to the desired format (YYYY-MM-DD HH:mm:ss)
        var formattedDatetime = datetime.toISOString().slice(0, 19).replace('T', ' '); // Format to YYYY-MM-DDTHH:mm:ss and then replace 'T' with a space
        
        // Assign the formatted datetime to the hidden input field
        $('#deadline').val(formattedDatetime);
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
