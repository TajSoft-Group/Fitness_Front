const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.innerHTML = type === 'password' ? "<i class='fa fa-eye-slash'></i>" : "<i class='fa fa-eye'></i>";
});

function formatPhoneNumber(input) {
    const cleaned = ('' + input).replace(/\D/g, '');

    const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return cleaned;
}

const phoneNumberInput = document.getElementById('phoneNumberInput');

phoneNumberInput.addEventListener('input', function() {
    const formatted = formatPhoneNumber(this.value);
    this.value = formatted;
});