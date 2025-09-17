function clearFormAndMessages() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('passInput').value = '';
    document.getElementById('passConfirmInput').value = '';
    document.getElementById('tc').checked = false;
    let resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.innerHTML = '';
}

// Always clear on normal load
document.addEventListener('DOMContentLoaded', clearFormAndMessages);

// Always clear on bfcache restore (back/forward navigation)
window.addEventListener('pageshow', function(event) {
    clearFormAndMessages();
});

document.addEventListener('DOMContentLoaded', function() {
    clearFormAndMessages(); // Always clear on load

    const formEl = document.getElementById('registerForm');
    const inputs = [
        document.getElementById('nameInput'),
        document.getElementById('emailInput'),
        document.getElementById('passInput'),
        document.getElementById('passConfirmInput')
    ];
    const progressFill = document.getElementById('progressFill');
    const registerBtn = document.getElementById('registerBtn');
    const toggle = document.getElementById('roleToggle');
    const formTitle = document.getElementById('formTitle');
    const subtitle = document.querySelector('.subtitle');
    const tcCheckbox = document.getElementById('tc');

    function hexToRgb(hex) {
        hex = hex.replace('#','');
        if (hex.length === 3) hex = hex.split('').map(h => h+h).join('');
        const bigint = parseInt(hex, 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }

    function updateUI() {
        const filled = inputs.filter(i => i.value.trim() !== '').length;
        const percent = Math.round((filled / inputs.length) * 100);
        const isRecruiter = toggle.checked;
        const accent = isRecruiter ? '#ffb347' : '#40a8ff';
        progressFill.style.width = percent + '%';
        progressFill.style.background = accent;

        const logo = document.querySelector('.logo');
        logo.style.background = isRecruiter
            ? 'linear-gradient(135deg,#ffb347,#ffcf69)'
            : 'linear-gradient(135deg,#40a8ff,#0bb7d8)';

        const [r, g, b] = hexToRgb(accent);
        formEl.style.boxShadow = `0 10px 40px rgba(${r},${g},${b},0.18)`;
        formEl.style.border = `1.5px solid ${accent}`;

        formEl.classList.toggle('recruiter-theme', isRecruiter);
        formEl.classList.toggle('freelancer-theme', !isRecruiter);
        registerBtn.classList.toggle('recruiter', isRecruiter);
        registerBtn.classList.toggle('freelancer', !isRecruiter);

        formTitle.textContent = isRecruiter ? 'Recruiter Registration' : 'Freelancer Registration';
        subtitle.textContent = isRecruiter
            ? 'Sign up to find top talent for your projects.'
            : 'Simple sign up to start applying for projects.';

        if (percent === 100) formEl.classList.add('full');
        else formEl.classList.remove('full');
    }

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      #registerForm::after {
        box-shadow: var(--after-box, 0 0 0 rgba(0,0,0,0));
        opacity: var(--after-opacity, 0);
      }
    `;
    document.head.appendChild(styleSheet);

    inputs.forEach(i => i.addEventListener('input', updateUI));
    toggle.addEventListener('change', updateUI);

    updateUI();

    formEl.addEventListener('submit', function(e) {
        e.preventDefault();

        const isRecruiter = toggle.checked;
        const role = isRecruiter ? 'recruiter' : 'freelancer';
        const tc = tcCheckbox.checked;

        const formData = {
            name: document.getElementById('nameInput').value,
            email: document.getElementById('emailInput').value,
            role: role,
            password: document.getElementById('passInput').value,
            password2: document.getElementById('passConfirmInput').value,
            tc: tc
        };

        fetch('/api/v1/accounts/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.getElementById('result');
            if (!resultDiv) {
                resultDiv = document.createElement('div');
                resultDiv.id = 'result';
                formEl.appendChild(resultDiv);
            }
            // Show only a friendly success message and redirect after success
            if (data.message) {
                resultDiv.innerHTML = `<div style="color:green;font-weight:600;font-size:1.1em;padding:8px 0;">${data.message}<br>Redirecting to login...</div>`;
                formEl.reset();
                updateUI();
                setTimeout(function() {
                    window.location.href = "/accounts/login/";
                }, 1800);
            } else if (data.msg) {
                resultDiv.innerHTML = `<div style="color:green;font-weight:600;font-size:1.1em;padding:8px 0;">${data.msg}<br>Redirecting to login...</div>`;
                formEl.reset();
                updateUI();
                setTimeout(function() {
                    window.location.href = "/accounts/login/";
                }, 1800);
            } else if (typeof data === "object") {
                // Show each error in red, one per line (no redirect)
                let errors = [];
                for (let key in data) {
                    if (Array.isArray(data[key])) {
                        errors.push(`<div style="color:red;font-weight:500;">${data[key].join('<br>')}</div>`);
                    } else {
                        errors.push(`<div style="color:red;font-weight:500;">${data[key]}</div>`);
                    }
                }
                resultDiv.innerHTML = errors.join('');
            } else {
                resultDiv.innerHTML = `<div style="color:red;">${JSON.stringify(data)}</div>`;
            }
        })
        .catch(error => {
            let resultDiv = document.getElementById('result');
            if (!resultDiv) {
                resultDiv = document.createElement('div');
                resultDiv.id = 'result';
                formEl.appendChild(resultDiv);
            }
            resultDiv.innerText = 'Error: ' + error;
            resultDiv.style.color = "red";
        });
    });
});