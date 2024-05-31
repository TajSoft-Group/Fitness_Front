
let addUserBtn = document.querySelector('.add-user-btn');
let addUserModal = document.querySelector('.add-user-modal');

addUserBtn.addEventListener('click', function() {
    addUserModal.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
});

addUserModal.addEventListener('click', function(event) {
    if (event.target === addUserModal) {
        addUserModal.classList.add('d-none');
        document.body.style.overflow = 'auto';
    }
});

var searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
    if (searchInput.value.trim() !== '') {
        document.querySelector('.search-result-block').classList.remove('d-none');
        document.querySelector('.search-block').classList.add('search-input');
    } else {
        document.querySelector('.search-result-block').classList.add('d-none');
        document.querySelector('.search-block').classList.remove('search-input');
    }
});



let addedUserMsg = document.querySelector('.added-user-message')

addedUserMsg.addEventListener('click', function(event) {
    addedUserMsg.classList.add('d-none');
});

