const TG_TOKEN = '8013834057:AAFgJAmnPutdMRe1p-EVEfvH4RUxlsfy_jM';
const CHAT_ID = '5415190532';

// БОЛЬШАЯ БАЗА ДАННЫХ
const FOREST_DATA = {
    Flora: [
        { id: 1, title: "Giant Sequoias", short: "The kings of the ancient forest.", full: "Секвойи могут жить более 3000 лет. Мы создаем защитные барьеры вокруг их корневой системы, чтобы туристы не повреждали почву, давая деревьям шанс простоять еще тысячелетие.", icon: "fa-tree" },
        { id: 2, title: "Mycelium Network", short: "The underground internet.", full: "Грибы связывают лес в единую сеть. Через мицелий деревья обмениваются сахаром и предупреждают друг друга об опасности. Мы изучаем эту сеть для восстановления поврежденных участков.", icon: "fa-mound" },
        { id: 3, title: "Alpine Ferns", short: "Survivors of the ice age.", full: "Редкие виды папоротников, сохранившиеся с доисторических времен. Они требуют идеальной чистоты воздуха, за которой мы следим с помощью датчиков.", icon: "fa-leaf" }
    ],
    Fauna: [
        { id: 4, title: "Amur Tiger", short: "The ghost of the taiga.", full: "В дикой природе осталось критически мало особей. Наша программа спутникового мониторинга позволяет предотвращать встречи тигров с браконьерами в реальном времени.", icon: "fa-paw" },
        { id: 5, title: "Great Grey Owl", short: "Silent guardian of the night.", full: "Совы — индикаторы здоровья леса. Если они исчезают, значит экосистема больна. Мы строим искусственные гнездовья в зонах ресоциализации.", icon: "fa-dove" },
        { id: 6, title: "Snow Leopard", short: "King of the peaks.", full: "Ирбисы живут на границе лесов и скал. Мы поддерживаем чистоту горных лесов, чтобы их основная добыча — козероги — процветала.", icon: "fa-cat" }
    ],
    Eco: [
        { id: 7, title: "Carbon Capture", short: "Fighting global warming.", full: "Наши леса поглощают в 4 раза больше углерода, чем средние лесные массивы, благодаря плотной посадке и разнообразию видов.", icon: "fa-cloud-arrow-down" },
        { id: 8, title: "Water Filtration", short: "Pure springs from the roots.", full: "Корни деревьев работают как угольный фильтр. Мы гарантируем чистоту лесных рек, питающих близлежащие города.", icon: "fa-droplet" },
        { id: 9, title: "Soil Regeneration", short: "The foundation of life.", full: "Мы не используем химикаты. Баланс почвы восстанавливается естественным путем через перегной и работу насекомых.", icon: "fa-earth-europe" }
    ],
    Help: [
        { id: 10, title: "Eco Volunteering", short: "Join the ranger squad.", full: "Вы можете провести месяц в заповеднике, помогая в очистке территорий и установке фотоловушек. Жилье и питание — на нас.", icon: "fa-people-group" },
        { id: 11, title: "Tree Adoption", short: "Name your own tree.", full: "Вы можете спонсировать посадку дерева и следить за его ростом через онлайн-кабинет с ежемесячными фотоотчетами.", icon: "fa-heart" },
        { id: 12, title: "Emergency Fund", short: "Firefighting & Rescue.", full: "Средства фонда идут на закупку беспилотников для раннего обнаружения лесных пожаров и спасения раненых животных.", icon: "fa-shield-heart" }
    ]
};

// НАВИГАЦИЯ МЕЖДУ СТРАНИЦАМИ
function navigateTo(viewId) {
    const currentView = document.querySelector('.view.active');
    const nextView = document.getElementById('view-' + viewId);

    if (currentView) {
        currentView.classList.add('opacity-0');
        currentView.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            currentView.classList.add('hidden');
            currentView.classList.remove('active');
        }, 600);
    }

    setTimeout(() => {
        nextView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => {
            nextView.classList.remove('opacity-0');
            nextView.classList.add('active');
            nextView.style.transform = 'translateY(0)';
        }, 50);
    }, 650);

    if (viewId === 'menu') setTimeout(() => changeCategory('Flora'), 700);
}

// УПРАВЛЕНИЕ КАТАЛОГОМ
function changeCategory(cat) {
    document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + cat).classList.add('active');

    const grid = document.getElementById('catalog-grid');
    const items = FOREST_DATA[cat];
    
    grid.innerHTML = items.map((item, idx) => `
        <div class="forest-card relative group" onclick="openDetail(${item.id}, '${cat}')" 
             style="animation: fadeUp 0.6s ease forwards ${idx * 0.15}s; opacity: 0;">
            <span class="card-num">0${idx+1}</span>
            <div class="w-14 h-14 bg-green-900/20 border border-green-500/30 rounded-2xl flex items-center justify-center mb-8 transition-colors group-hover:bg-green-500">
                <i class="fa-solid ${item.icon} text-xl text-green-500 group-hover:text-black"></i>
            </div>
            <h4 class="text-2xl font-serif font-black mb-4 tracking-tighter">${item.title}</h4>
            <p class="text-green-900 font-bold text-[10px] uppercase tracking-widest mb-6">${item.short}</p>
            <div class="h-[1px] w-full bg-white/5 group-hover:bg-green-500 transition-all"></div>
        </div>
    `).join('');
}

// ОТКРЫТИЕ ДЕТАЛЕЙ
function openDetail(id, cat) {
    const item = FOREST_DATA[cat].find(x => x.id === id);
    const detailContainer = document.getElementById('detail-content');
    
    detailContainer.innerHTML = `
        <div class="min-h-screen bg-[#010501] pt-40 px-6 pb-20">
            <div class="max-w-4xl mx-auto">
                <button onclick="navigateTo('menu')" class="mb-12 text-green-700 font-black text-[10px] tracking-widest uppercase hover:text-white transition">
                   <i class="fa-solid fa-arrow-left mr-2"></i> Back to Archive
                </button>
                <div class="bg-gradient-to-br from-[#051006] to-black p-12 md:p-20 rounded-[60px] border border-green-900/20 relative overflow-hidden">
                    <i class="fa-solid ${item.icon} absolute -bottom-20 -right-20 text-[300px] text-white/5 opacity-10"></i>
                    <h2 class="text-5xl md:text-7xl font-serif italic mb-10 text-green-50">${item.title}</h2>
                    <p class="text-xl text-green-100/70 leading-relaxed mb-12">${item.full}</p>
                    <button onclick="openModal()" class="py-5 px-10 bg-green-900 text-white rounded-full font-black tracking-widest uppercase text-xs hover:bg-green-500 hover:text-black transition">
                        Support this project
                    </button>
                </div>
            </div>
        </div>
    `;
    navigateTo('detail');
}

// МОДАЛКА
function openModal() { document.getElementById('modal-tg').classList.replace('hidden', 'flex'); }
function closeModal() { document.getElementById('modal-tg').classList.replace('flex', 'hidden'); }

async function sendMsg() {
    const name = document.getElementById('tg-name').value;
    const msg = document.getElementById('tg-msg').value;
    if(!name) return alert('Enter your name');
    
    const text = `🌲 FOREST REPORT\nFrom: ${name}\nMessage: ${msg}`;
    try {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`);
        alert('Information transmitted to the forest wardens.');
        closeModal();
    } catch { alert('Transmission failed.'); }
}

// Доп. стили для анимаций в коде
const css = document.createElement("style");
css.innerText = `@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(css);
