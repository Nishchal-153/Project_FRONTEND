// Function to load products
function loadProducts() {
    $.get('http://localhost:27017/users', function(users) {
      $('#users').empty();
      users.forEach(user => {
        // Display the user on the page
        // Add buttons for updating and deleting
      });
    });
  }
  
  // Function to add a user
  $('#new_user').submit(function(e) {
    e.preventDefault();
    const user = {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    };
  
    $.post('http://localhost:27017/users', user, function() {
      loadProducts();
      $('#new_user')[0].reset();
    });
  });
  
  // Function to update a user
  $('#users').on('click', '.update-button', function() {
    const userId = $(this).data('id');
    const updatedUser = {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    };
  
    $.ajax({
      url: `http://localhost:27017/users/${userId}`,
      method: 'PUT',
      data: updatedUser,
      success: function() {
        loadProducts();
        $('#new_user')[0].reset();
      }
    });
  });
  
  // Function to delete a user
  $('#users').on('click', '.delete-button', function() {
    const userId = $(this).data('id');
  
    $.ajax({
      url: `http://localhost:27017/users/${userId}`,
      method: 'DELETE',
      success: function() {
        loadProducts();
      }
    });
  });
  
  // Load users on page load
  loadProducts();
  // ... Your existing code

// Function to load users
function loadUsers() {
  $.get('/users', function(users) {
    $('#users').empty();
    users.forEach(user => {
      $('#users').append(`
        <div>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
          <p>Password: ${user.password}</p>
          <button class="update-button" data-id="${user._id}">Update</button>
          <button class="delete-button" data-id="${user._id}">Delete</button>
        </div>
      `);
    });
  });
}

// Function to add a user
$('#new_user').submit(function(e) {
  e.preventDefault();
  const user = {
    name: $('#name').val(),
    email: $('#email').val(),
    password: $('#password').val()
  };

  $.post('/users', user, function() {
    loadUsers();
    $('#new_user')[0].reset();
  });
});

// Function to update a user
$('#users').on('click', '.update-button', function() {
  const userId = $(this).data('id');
  const updatedUser = {
    name: $('#name').val(),
    email: $('#email').val(),
    password: $('#password').val()
  };

  $.ajax({
    url: `/users/${userId}`,
    method: 'PUT',
    data: updatedUser,
    success: function() {
      loadUsers();
      $('#new_user')[0].reset();
    }
  });
});

// Function to delete a user
$('#users').on('click', '.delete-button', function() {
  const userId = $(this).data('id');

  $.ajax({
    url: `/users/${userId}`,
    method: 'DELETE',
    success: function() {
      loadUsers();
    }
  });
});

// Load users on page load
loadUsers();
