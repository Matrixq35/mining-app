const tg = window.Telegram.WebApp;

// Telegram Web App Initialization
tg.ready();

// Устанавливаем фон
tg.expand();
document.body.style.backgroundColor = tg.themeParams.bg_color || "#f4f4f9";

// Функция для загрузки данных пользователя
async function loadUserData() {
    try {
        const response = await fetch('https://93fe-77-222-109-115.ngrok-free.app/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telegram_id: tg.initDataUnsafe.user.id, username: tg.initDataUnsafe.user.username })
        });
        if (!response.ok) throw new Error('Failed to load user data');
        const user = await response.json();
        document.getElementById('total-tokens').innerText = user.user.total_tokens;
        document.getElementById('energy').innerText = user.user.max_energy;
    } catch (error) {
        console.error(error);
        alert('Error loading user data.');
    }
}

// Обработчик для кнопки "Start Mining"
document.getElementById('start-mining').onclick = async () => {
    try {
        const response = await fetch('https://93fe-77-222-109-115.ngrok-free.app/start_mining', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telegram_id: tg.initDataUnsafe.user.id })
        });
        if (!response.ok) throw new Error('Failed to start mining');
        const data = await response.json();
        alert('Mining started: ' + JSON.stringify(data));
        loadUserData();
    } catch (error) {
        console.error(error);
        alert('Error starting mining.');
    }
};

// Загрузка данных при старте
loadUserData();
