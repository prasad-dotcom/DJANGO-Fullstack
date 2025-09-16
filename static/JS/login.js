var homeUrl = "/Hello/Home";
document.addEventListener('DOMContentLoaded', function() {
    // Clear fields and messages on load to prevent autofill and old messages
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    let resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.innerHTML = '';

    const formEl = document.getElementById('loginForm');

    formEl.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        };

        fetch('/api/v1/accounts/login/', {
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
            // On success, redirect to home
            if (data.message || data.msg) {
                resultDiv.innerHTML = `<div style="color:green;font-weight:600;font-size:1.1em;padding:8px 0;">${data.message || data.msg}<br>Redirecting to home...</div>`;
                setTimeout(function() {
                    window.location.href = homeUrl;
                }, 1500);
            } else if (typeof data === "object") {
                // Show errors only, no field names
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
                resultDiv.innerHTML = `<div style="color:red;">${data}</div>`;
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

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
