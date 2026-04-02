// --- Dados Iniciais (pode ser carregado de um JSON ou API futuramente) ---
const DOMI_INITIAL_DATA = {
    profile: {
        name: "DOMI",
        height: 1.78,
        weight: 86,
        targetWeight: 79,
        age: 30,
        tdeeEstimated: 2700, // Ajustado
        caloriesTarget: 2200, // Deficit de ~500kcal
        proteinTarget: 150, // g
        waterTarget: 3500 // ml
    },
    dietPlan: [
        { time: "06:30", description: "☕ Café da manhã (pré-treino): 3 ovos mexidos, 2 fatias de pão integral, café preto. (Pós Jiu-Jitsu leve)" },
        { time: "11:00", description: "🥛 Lanche pós-treino: 1 scoop de whey protein (30g), 1 banana, 1 punhado de castanhas (30g)." },
        { time: "12:30", description: "🍲 Almoço (empresa): Salada à vontade (folhas, tomate), 150g de frango/carne magra grelhada, 100g de batata doce/arroz integral." },
        { time: "16:00", description: "🍞 Lanche: 1 fatia de pão integral, 2 fatias de queijo magro, café. (Opcional: 1 fruta da estação)" },
        { time: "19:30", description: "🍽️ Jantar (pós-treino pesado): 180g de salmão/frango, vegetais cozidos/assados à vontade (brócolis, couve-flor), 1 colher de azeite." },
        { time: "22:00", description: "🥛 Pós-jantar: 1 copo de iogurte grego natural ou 1 scoop de caseína (para os dias de treino noturno)." }
    ],
    reminders: [
        "Domingo 20h: Preparar marmitas para a semana!",
        "Segunda/Quarta: Hidrate-se bem, jiu-jitsu leve hoje!",
        "Terça/Quinta: Jiu-jitsu pesado a noite, foco na recuperação e proteína!",
        "Diário: Evitar energético, maionese e doces. Tenha frutas como opção!"
    ],
    improvements: [
        "**Controle do Durateston:** Esteja ciente de que pode aumentar o apetite. Planeje as refeições para evitar excessos.",
        "**Substituição estratégica:** Troque energético por café preto puro ou chás. Maionese por maionese de abacate ou iogurte. Doces por paçoca fitness caseira, frutas congeladas ou pequenas porções de chocolate amargo.",
        "**Timing Nutricional:** Priorize carboidratos e proteínas no pós-treino (principalmente nos treinos pesados à noite).",
        "**Controle de Porções:** Use uma balança para pesar o pão e outros alimentos nas refeições chaves, especialmente o lanche das 16h.",
        "**Atenção ao lanche da tarde:** Se a fruta estiver disponível, priorize-a sobre pão e margarina. Margarina é rica em gorduras ruins."
    ],
    marmitaIdeas: [
        "**Proteínas:** Frango desfiado temperado (em grande quantidade), ovos cozidos, carne moída magra refogada.",
        "**Carboidratos:** Batata doce assada/cozida, arroz integral, quinoa cozida.",
        "**Vegetais:** Mix de vegetais congelados refogados (brócolis, couve-flor, cenoura), salada de folhas verdes já lavadas e secas (para montar na hora).",
        "**Lanches:** Paçoca fitness (tâmaras, amendoim, cacau), bolinhas de proteína caseiras, porções de frutas frescas."
    ],
    mealHistory: [],
    waterHistory: [],
    currentWater: 0
};

const NATH_INITIAL_DATA = {
    profile: {
        name: "NATH",
        height: 1.60,
        weight: 56,
        targetWeight: 50,
        age: 30,
        tdeeEstimated: 2000, // Ajustado
        caloriesTarget: 1550, // Deficit de ~450kcal
        proteinTarget: 100, // g
        waterTarget: 2500 // ml
    },
    dietPlan: [
        { time: "06:50", description: "🥚 Café da manhã: 2 ovos cozidos, 30g de aveia com água/leite vegetal, 1 fruta (banana/maçã)." },
        { time: "09:50", description: "🥜 Lanche na escola: 1 pote de iogurte natural (170g), 1 punhado de mix de castanhas (20g)." },
        { time: "13:00", description: "🥗 Almoço: 120g de peito de frango/peixe grelhado, salada verde à vontade, 80g de batata doce/arroz integral." },
        { time: "17:00", description: "🍌 Pré-treino (se for treinar): 1 banana, 1 scoop de whey protein (30g) com água." },
        { time: "20:30", description: "🍲 Jantar (pós-treino ou não): Sopa de legumes com frango desfiado, ou omelete com vegetais. (Leve e digerível)." }
    ],
    reminders: [
        "Diário: Prepare o lanche da escola na noite anterior!",
        "Foco: Controlar o consumo de doces e macarrão.",
        "Sexta: Recompensa - um 'doce programado' ou porção controlada de macarrão integral!"
    ],
    improvements: [
        "**Gerenciamento de doces:** Crie um sistema de 'doces programados' (1-2x/semana) para evitar exageros. Ex: 100g de chocolate amargo ou paçoca fitness.",
        "**Substituição do macarrão:** Experimente espaguete de abobrinha, batata doce em espiral ou macarrão integral em porções muito controladas (50-70g cozido).",
        "**Lanches Estratégicos:** Tenha proteína em pó ou iogurte natural fácil de levar para a escola.",
        "**Preparação antecipada:** Faça 'marmitas doces saudáveis' (receitas com aveia, frutas e cacau) para quando a vontade de doce bater."
    ],
    marmitaIdeas: [
        "**Proteínas:** Frango desfiado, ovos cozidos, atum em água.",
        "**Carboidratos:** Quinoa, batata doce, cuscuz marroquino.",
        "**Vegetais:** Saladas prontas em potes (com molho à parte), mix de vegetais cozidos.",
        "**Lanches:** Frutas porcionadas, iogurte com granola caseira (sem açúcar), bolinhas de tâmara e coco."
    ],
    mealHistory: [],
    waterHistory: [],
    currentWater: 0
};

let appData = {
    domi: JSON.parse(localStorage.getItem('domiData')) || DOMI_INITIAL_DATA,
    nath: JSON.parse(localStorage.getItem('nathData')) || NATH_INITIAL_DATA
};

let currentActiveTab = 'domi';

// --- Funções Auxiliares ---
function getCurrentDateString() {
    return new Date().toISOString().slice(0, 10);
}

function saveAppData() {
    localStorage.setItem('domiData', JSON.stringify(appData.domi));
    localStorage.setItem('nathData', JSON.stringify(appData.nath));
}

// --- Renderização da Interface ---
function renderProfileSummary(user) {
    const profile = appData[user].profile;
    return `
        <div class="profile-section">
            <h2>Perfil de ${profile.name}</h2>
            <p><strong>Altura:</strong> ${profile.height}m</p>
            <p><strong>Peso Atual:</strong> ${profile.weight}kg</p>
            <p><strong>Meta de Peso:</strong> ${profile.targetWeight}kg</p>
            <p><strong>Idade:</strong> ${profile.age} anos</p>
            <p><strong>Calorias Alvo Diárias:</strong> ${profile.caloriesTarget} kcal</p>
            <p><strong>Proteína Alvo:</strong> ${profile.proteinTarget}g</p>
            <p><strong>Água Alvo:</strong> ${profile.waterTarget / 1000}L</p>
            <p><strong>Progresso:</strong> ${profile.weight - profile.targetWeight}kg restantes para a meta!</p>
        </div>
    `;
}

function renderDietPlan(user) {
    const dietPlan = appData[user].dietPlan;
    let mealsHtml = dietPlan.map(meal => `
        <div class="meal-card">
            <strong>${meal.time}</strong>
            <span>${meal.description}</span>
        </div>
    `).join('');

    return `
        <div class="diet-plan-section">
            <h2>Plano de Dieta Diário</h2>
            ${mealsHtml}
        </div>
    `;
}

function renderMealLogger(user) {
    return `
        <div class="logging-section">
            <h2>Registrar Refeição</h2>
            <div class="input-group">
                <label for="${user}-meal-date">Data:</label>
                <input type="date" id="${user}-meal-date" value="${getCurrentDateString()}">
            </div>
            <div class="input-group">
                <label for="${user}-meal-time">Horário:</label>
                <input type="time" id="${user}-meal-time" value="${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}">
            </div>
            <div class="input-group">
                <label for="${user}-meal-weight">Peso/Quantidade (ex: 150g, 2 fatias):</label>
                <input type="text" id="${user}-meal-weight" placeholder="Ex: 150g frango, 2 ovos">
            </div>
            <div class="input-group">
                <label for="${user}-meal-desc">Descrição:</label>
                <textarea id="${user}-meal-desc" placeholder="Detalhes da refeição..."></textarea>
            </div>
            <button onclick="addMeal('${user}')">Adicionar Refeição</button>
        </div>
    `;
}

function renderWaterTracker(user) {
    const profile = appData[user].profile;
    const currentWater = appData[user].currentWater;
    const waterTarget = profile.waterTarget;
    const percentage = Math.min(100, (currentWater / waterTarget) * 100).toFixed(0);

    return `
        <div class="water-section">
            <h2>Consumo de Água 💧</h2>
            <div class="water-tracker">
                <div class="water-progress">
                    <div class="water-bar" style="width: ${percentage}%;">
                        ${currentWater}ml (${percentage}%)
                    </div>
                </div>
                <div class="water-info">
                    <span>${currentWater}ml / ${waterTarget / 1000}L</span>
                </div>
                <button class="water-add-btn" onclick="addWater('${user}', 250)">+ 250ml</button>
                <button class="water-add-btn" onclick="resetWater('${user}')">Zerar Hoje</button>
            </div>
        </div>
    `;
}

function renderHistory(user) {
    const mealHistory = appData[user].mealHistory.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
    const waterHistory = appData[user].waterHistory.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));

    let combinedHistory = [];
    mealHistory.forEach(meal => combinedHistory.push({ type: 'meal', ...meal }));
    waterHistory.forEach(water => combinedHistory.push({ type: 'water', ...water }));

    combinedHistory.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));

    let historyItems = combinedHistory.map(item => {
        if (item.type === 'meal') {
            return `
                <div class="history-item">
                    <strong>📅 ${item.date} 🕐 ${item.time}</strong>
                    <span>🍽️ ${item.description}</span>
                    <span>⚖️ ${item.weight}</span>
                </div>
            `;
        } else if (item.type === 'water') {
            return `
                <div class="history-item">
                    <strong>📅 ${item.date} 🕐 ${item.time}</strong>
                    <span>💧 ${item.amount}ml de água (${item.total}ml total do dia)</span>
                </div>
            `;
        }
        return '';
    }).join('');

    return `
        <div class="history-section">
            <h2>Histórico de Refeições e Água</h2>
            <div class="history-list">
                ${historyItems.length > 0 ? historyItems : '<p>Nenhum registro ainda.</p>'}
            </div>
        </div>
    `;
}

function renderReminders(user) {
    const reminders = appData[user].reminders;
    let remindersHtml = reminders.map(reminder => `
        <div class="reminder-item">${reminder}</div>
    `).join('');

    return `
        <div class="reminders-section">
            <h2>Lembretes e Disciplina 🔔</h2>
            ${remindersHtml}
        </div>
    `;
}

function renderImprovements(user) {
    const improvements = appData[user].improvements;
    let improvementsHtml = improvements.map(point => `
        <div class="improvement-point">${point}</div>
    `).join('');

    return `
        <div class="improvements-section">
            <h2>Análise de Melhoria Imediata 💡</h2>
            ${improvementsHtml}
        </div>
    `;
}

function renderMarmitaIdeas(user) {
    const marmitaIdeas = appData[user].marmitaIdeas;
    let ideasHtml = marmitaIdeas.map(idea => `
        <div class="marmita-item">${idea}</div>
    `).join('');

    return `
        <div class="marmita-section">
            <h2>Ideias de Marmita Fitness e Baixo Custo 🍱</h2>
            ${ideasHtml}
        </div>
    `;
}


// --- Funções de Ação (Interatividade) ---
function addMeal(user) {
    const mealDate = document.getElementById(`${user}-meal-date`).value;
    const mealTime = document.getElementById(`${user}-meal-time`).value;
    const mealWeight = document.getElementById(`${user}-meal-weight`).value;
    const mealDesc = document.getElementById(`${user}-meal-desc`).value;

    if (!mealDate || !mealTime || !mealWeight || !mealDesc) {
        alert('Por favor, preencha todos os campos da refeição!');
        return;
    }

    const newMeal = {
        date: mealDate,
        time: mealTime,
        weight: mealWeight,
        description: mealDesc
    };

    appData[user].mealHistory.push(newMeal);
    saveAppData();
    renderApp(user); // Re-renderiza a aba para atualizar o histórico
    alert('Refeição adicionada com sucesso!');

    // Limpar campos
    document.getElementById(`${user}-meal-weight`).value = '';
    document.getElementById(`${user}-meal-desc`).value = '';
}

function addWater(user, amount) {
    appData[user].currentWater += amount;
    const currentWater = appData[user].currentWater;
    const waterTarget = appData[user].profile.waterTarget;

    const newWaterEntry = {
        date: getCurrentDateString(),
        time: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}),
        amount: amount,
        total: currentWater
    };
    appData[user].waterHistory.push(newWaterEntry);

    // Se a data do último registro de água for diferente da atual, zere o contador para o dia
    const lastWaterDate = appData[user].waterHistory.length > 0 ? appData[user].waterHistory[0].date : null;
    if (lastWaterDate && lastWaterDate !== getCurrentDateString()) {
        appData[user].currentWater = amount; // Começa o dia com o primeiro registro
    }

    saveAppData();
    renderApp(user); // Re-renderiza a aba para atualizar
}

function resetWater(user) {
    if (confirm("Tem certeza que deseja zerar o consumo de água de hoje?")) {
        appData[user].currentWater = 0;
        // Opcional: remover os registros de água do dia atual do histórico
        appData[user].waterHistory = appData[user].waterHistory.filter(entry => entry.date !== getCurrentDateString());
        saveAppData();
        renderApp(user);
    }
}


// --- Renderização Principal da Aba ---
function renderApp(user) {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        ${renderProfileSummary(user)}
        ${renderDietPlan(user)}
        ${renderMealLogger(user)}
        ${renderWaterTracker(user)}
        ${renderHistory(user)}
        ${renderReminders(user)}
        ${renderImprovements(user)}
        ${renderMarmitaIdeas(user)}
    `;

    // Garante que o contador de água seja reiniciado se for um novo dia
    const lastWaterDate = appData[user].waterHistory.length > 0 ? appData[user].waterHistory[appData[user].waterHistory.length -1].date : null;
    if (!lastWaterDate || lastWaterDate !== getCurrentDateString()) {
        if(appData[user].currentWater > 0) { // Só zera se já tiver água do dia anterior
             appData[user].currentWater = 0;
             saveAppData();
             renderApp(user); // Re-renderiza para mostrar zero
        }
    }
}

function switchTab(user) {
    currentActiveTab = user;
    // Atualiza botões de aba
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tab-button[onclick="switchTab('${user}')"]`).classList.add('active');

    renderApp(user);
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    switchTab(currentActiveTab); // Renderiza a aba DOMI por padrão
});
