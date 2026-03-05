// 1. 動態時鐘與問候語邏輯
function updateTimeAndGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 更新時間顯示
    document.getElementById('time').textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;

    // 更新問候語顯示
    const greetingElement = document.getElementById('greeting');
    let greetingText = '你好';
    
    if (hours >= 5 && hours < 12) {
        greetingText = '早安，充滿活力的一天 ☀️';
    } else if (hours >= 12 && hours < 18) {
        greetingText = '午安，保持專注與熱情 ☕';
    } else if (hours >= 18 && hours < 22) {
        greetingText = '晚安，享受美好的傍晚 🌆';
    } else {
        greetingText = '夜深了，注意休息 🌙';
    }
    
    greetingElement.textContent = greetingText;
}

// 初始化並每秒更新時鐘
setInterval(updateTimeAndGreeting, 1000);
updateTimeAndGreeting();

// 2. 滑鼠微互動 - 3D 傾斜視差效果
const card = document.querySelector('.glass-card');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 計算旋轉角度 (除以一個基數來控制傾斜幅度)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// 滑鼠離開時平滑恢復原狀
card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.5s ease'; // 恢復時加上平滑過渡
    
    // 移除過渡效果以免影響 mousemove 的即時反應
    setTimeout(() => {
        card.style.transition = 'box-shadow 0.3s ease'; 
    }, 500);
});

// 3. 按鈕互動：隨機變換背景漸層色
const btn = document.querySelector('.interact-btn');
btn.addEventListener('click', () => {
    // 產生隨機十六進位顏色
    const randomColor1 = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomColor2 = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomColor3 = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    // 透過修改 CSS 變數達成全域換色
    document.documentElement.style.setProperty('--bg-gradient-1', `#${randomColor1}`);
    document.documentElement.style.setProperty('--bg-gradient-2', `#${randomColor2}`);
    document.documentElement.style.setProperty('--bg-gradient-3', `#${randomColor3}`);
});