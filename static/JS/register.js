document.addEventListener('DOMContentLoaded', function() {
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
    const quoteBg = document.getElementById('quoteBg');

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
    ?   'linear-gradient(135deg,#ffb347,#ffcf69)'
    :   'linear-gradient(135deg,#40a8ff,#0bb7d8)';

        // Dynamic border and shadow color for the card
        const [r, g, b] = hexToRgb(accent);
        formEl.style.boxShadow = `0 10px 40px rgba(${r},${g},${b},0.18)`;
        formEl.style.border = `1.5px solid ${accent}`;

        // Theme toggling
        formEl.classList.toggle('recruiter-theme', isRecruiter);
        formEl.classList.toggle('freelancer-theme', !isRecruiter);
        registerBtn.classList.toggle('recruiter', isRecruiter);
        registerBtn.classList.toggle('freelancer', !isRecruiter);

        // Titles and subtitles
        formTitle.textContent = isRecruiter ? 'Recruiter Registration' : 'Freelancer Registration';
        subtitle.textContent = isRecruiter
            ? 'Sign up to find top talent for your projects.'
            : 'Simple sign up to start applying for projects.';

        // Quote
        quoteBg.textContent = isRecruiter
            ? '"Leadership is not a position or a title; it is action and example."'
            : '"Unlock your potential. Every freelancer is a creator of their own journey."';
        quoteBg.classList.toggle('recruiter-quote', isRecruiter);
        quoteBg.classList.toggle('freelancer-quote', !isRecruiter);

        if (percent === 100) formEl.classList.add('full');
        else formEl.classList.remove('full');
    }

    // CSS for ::after glow (optional, for visual effect)
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
});