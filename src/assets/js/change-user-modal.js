function toggleModal(btnSelector, modalSelector) {
    let btn = document.querySelector(btnSelector);
    let modal = document.querySelector(modalSelector);

    btn.addEventListener('click', function() {
        modal.classList.remove('d-none');
        document.body.style.overflow = 'hidden';
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('d-none');
            document.body.style.overflow = 'auto';
        }
    });
}

toggleModal('.change-user-btn', '.user-change-modal');
toggleModal('.delete-user-btn', '.user-delete-modal');
toggleModal('.block-user-btn', '.user-block-modal');
toggleModal('.add-money-btn', '.add-money-modal');
toggleModal('.take-money-btn', '.take-money-modal');
toggleModal('.up-card-btn', '.up-card-modal');
toggleModal('.down-card-btn', '.down-card-modal');
toggleModal('.pin-card-btn', '.pin-card-modal');
toggleModal('.unpin-card-btn', '.unpin-card-modal');
