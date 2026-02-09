async function updateMonitor() {
    try {
        const response = await fetch('/api/track');
        const data = await response.json();
        
        const list = document.getElementById('product-list');
        list.innerHTML = '';

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = `product-card ${item.alert ? 'alert' : ''}`;
            
            card.innerHTML = `
                <span class="status-badge ${item.alert ? 'alert-bg' : 'safe-bg'}">
                    ${item.alert ? 'KRİTİK: RAKİP UCUZ' : 'GÜVENLİ'}
                </span>
                <h3>${item.name}</h3>
                <div class="prices">
                    <p>Senin Fiyatın: <strong>${item.my_price} ₺</strong></p>
                    <p>Rakip Fiyatı: <span style="color:${item.alert ? '#ff4757' : '#2ed573'}">${item.competitor_price} ₺</span></p>
                </div>
                <small>${item.url}</small>
            `;
            list.appendChild(card);
            
            if(item.alert) {
                showNotification(`${item.name} için rakip fiyatı düştü!`);
            }
        });
    } catch (err) {
        console.error("Veri çekilemedi:", err);
    }
}

function showNotification(msg) {
    const bar = document.getElementById('notification-bar');
    bar.innerText = msg;
    bar.style.display = 'block';
}


setInterval(updateMonitor, 5000);
updateMonitor();