$(document).ready(function() {
    $('#editUserForm').submit(function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Extract the form data
        var formData = $(this).serialize();

        // If the checkbox is unchecked, set the value to false
        if (!$("#is_admin").is(":checked")) {
            formData += "&is_admin=false";
        }

        // Send the PUT request using AJAX
        $.ajax({
            url: $(this).attr('action'),
            type: 'PUT',
            data: formData,
            success: function(response) {
                // Handle the successful response
                console.log('User updated successfully:', response);
                window.location.href = '/admin';
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error('Error updating user:', error);
                window.location.href = '/admin';
            }
        });
    });

    $(document).ready(function() {
        $('#deleteUserBtn').click(function() {
            // Get the user ID from the hidden input field
            var userId = $('#userId').val();
            
            // Display confirmation dialog
            if (confirm('Are you sure you want to delete this user?')) {
                // User confirmed, proceed with deletion
                $.ajax({
                    url: '/admin/editUser/' + userId + '/delete',
                    type: 'DELETE',
                    success: function(response) {
                        // Handle successful deletion
                        console.log('User deleted successfully:', response);
                        // Redirect to admin page
                        window.location.href = '/admin';
                    },
                    error: function(xhr, status, error) {
                        // Handle errors
                        console.error('Error deleting user:', error);
                        // Redirect to admin page
                        window.location.href = '/admin';
                    }
                });
            }
        });
    });    
});

