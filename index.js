document.addEventListener("DOMContentLoaded", () => {
    // --- 1. localStorage: Дані про систему ---
    const systemInfo = {
        browser: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        timestamp: new Date().toLocaleString()
    };
    
    localStorage.setItem('userSystemInfo', JSON.stringify(systemInfo));
    
    const footerStorage = document.getElementById('storage-display');
    footerStorage.innerHTML = `<strong>Системні дані (з localStorage):</strong> ${localStorage.getItem('userSystemInfo')}`;

    // --- 2. Динамічний вміст (JSONPlaceholder) ---
    // Вкажи свій порядковий номер у журналі замість "1"
    const myVariant = 1; 
    const commentsContainer = document.getElementById('comments-container');

    fetch(`https://jsonplaceholder.typicode.com/posts/${myVariant}/comments`)
        .then(response => response.json())
        .then(data => {
            commentsContainer.innerHTML = ''; // Очистити текст завантаження
            data.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.style.borderBottom = "1px solid #ccc";
                commentDiv.style.marginBottom = "10px";
                commentDiv.innerHTML = `
                    <p><strong>Від:</strong> ${comment.email}</p>
                    <p><em>"${comment.body}"</em></p>
                `;
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(err => {
            commentsContainer.innerText = "Помилка завантаження відгуків.";
            console.error(err);
        });

    // --- 3. Модальне вікно (через 1 хвилину) ---
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.close-button');

    setTimeout(() => {
        modal.style.display = 'block';
    }, 60000); // 60 000 мс = 1 хвилина

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };

    // --- 4. Перемикання теми (Ручне та Автоматичне) ---
    const themeToggle = document.getElementById('theme-toggle');
    
    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    // Ручне перемикання
    themeToggle.onclick = () => {
        document.body.classList.toggle('dark-mode');
    };

    // Автоматичне перемикання (День: 07:00 - 21:00)
    const checkTimeAndTheme = () => {
        const hour = new Date().getHours();
        const isNight = hour < 7 || hour >= 21;
        applyTheme(isNight);
    };

    checkTimeAndTheme(); // Запустити при завантаженні
});