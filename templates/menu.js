document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display existing menus
    fetchMenus();

    // Event listener for form submission to create a new menu
    document.getElementById('createMenuForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const menuData = {
            name: formData.get('menuName'),
            category: formData.get('menuCategory'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate')
        };
        createMenu(menuData);
    });

    // Event listener for form submission to update an existing menu
    document.getElementById('updateMenuForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const menuId = formData.get('updateMenuId');
        const updateData = {
            name: formData.get('updateName'),
            category: formData.get('updateCategory'),
            startDate: formData.get('updateStartDate'),
            endDate: formData.get('updateEndDate')
        };
        updateMenu(menuId, updateData);
    });
});

// Function to fetch and display existing menus
// Fetch and display existing menus
function fetchMenus() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/menus', {
        // headers: {
        //     'token': `${token}`,
        // },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch menus');
            }
            return response.json();
        })
        .then(data => {
            const menuList = document.getElementById('menuList');
            menuList.innerHTML = ''; // Clear previous entries
            data.forEach(menu => {
                const menuItem = document.createElement('div');
                menuItem.innerHTML = `
                    <strong>Name:</strong> ${menu.name}<br>
                    <strong>Category:</strong> ${menu.category}<br><br>
                `;
                menuList.appendChild(menuItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to create a new menu
function createMenu(menuData) {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/menus', {
        method: 'POST',
        // headers: {
        //     'token': `${token}`,
        // },
        body: JSON.stringify(menuData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create menu');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            fetchMenus();
        })
        .catch(error => console.error(error));
}

// Function to update an existing menu
function updateMenu(menuId, updateData) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/menus/${menuId}`, {
        method: 'PATCH',
        // headers: {
        //     'token': ` ${token}`,
        // },
        body: JSON.stringify(updateData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update menu');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            fetchMenus(); // Refresh the menu list
        })
        .catch(error => console.error(error));
}
