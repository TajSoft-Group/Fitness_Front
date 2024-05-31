

document.querySelector('.user-configs-modal-icon').addEventListener('click', function(event) {
    document.querySelector('.user-configs-modal').classList.toggle('d-none');
});


let cardsModalBtns = document.querySelectorAll('.credit-card');

let cardsModal = document.querySelector('.cards-modal');

function showModal() {
    cardsModal.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    cardsModal.classList.add('d-none');
    document.body.style.overflow = 'auto';
}

cardsModalBtns.forEach(function(btn) {
    btn.addEventListener('click', showModal);
});

cardsModal.addEventListener('click', function(event) {
    if (event.target === cardsModal) {
        hideModal();
    }
});

let uslugisBtn = document.querySelector('.uslugi-btn');
let coursesBtn = document.querySelector('.courses-btn');
let uslugis = document.querySelector('.uslugis');
let courses = document.querySelector('.coursess');

uslugisBtn.addEventListener('click', function(event) {
    uslugisBtn.classList.add('checked');
    coursesBtn.classList.remove('checked');
    uslugis.classList.remove('d-none');
    courses.classList.add('d-none');
});

coursesBtn.addEventListener('click', function(event) {
    coursesBtn.classList.add('checked');
    uslugisBtn.classList.remove('checked');
    courses.classList.remove('d-none');
    uslugis.classList.add('d-none');
});

