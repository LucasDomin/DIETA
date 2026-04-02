// --- Dados Iniciais (com calorias para cada refeição) ---
const DOMI_INITIAL_DATA = {
    profile: {
        name: "DOMI",
        height: 1.78,
        weight: 86,
        targetWeight: 79,
        age: 30,
        tdeeEstimated: 2700,
        caloriesTarget: 2200, // Limite diário
        proteinTarget: 150,
        waterTarget: 3500
    },
    dietPlan: [
        { time: "06:30", description: "☕ Café da manhã: 3 ovos, 2 pães integrais, café", calories: 450 },
        { time: "11:00", description: "🥛 Lanche: Whey + banana + castanhas", calories: 300 },
        { time: "12:30", description: "🍲 Almoço: Frango + batata doce + salada", calories: 600 },
        { time: "16:00", description: "🍞 Lanche: Pão + queijo + café", calories: 250 },
        { time: "19:30", description: "🍽️ Jantar: Salmão + vegetais", calories: 500 },
        { time: "22:00", description: "🥛 Pós-jantar: Iogurte ou caseína", calories: 150 }
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
    currentWater: 0,
    compensation: {
        active: false,
        date: null,
        reduction: 0,
        note: ""
    }
};

const NATH_INITIAL_DATA = {
    profile: {
        name: "NATH",
        height: 1.60,
        weight: 56,
        targetWeight: 50,
        age: 30,
        tdeeEstimated: 2000,
        caloriesTarget: 1550,
        proteinTarget: 100,
        waterTarget: 2500
    },
    dietPlan: [
        { time: "06:50", description: "🥚 Café da manhã: Ovos + aveia + fruta", calories: 350 },
        { time: "09:50", description: "🥜 Lanche: Iogurte + castanhas", calories: 200 },
        { time: "13:00", description: "🥗 Almoço: Frango + salada + carboidrato", calories: 500 },
        { time: "17:00", description: "🍌 Pré-treino: Banana + whey", calories: 200 },
        { time: "20:30", description: "🍲 Jantar: Sopa ou omelete", calories: 300 }
    ],
    reminders: [
        "Diário: Prepare o lanche da escola na noite anterior!",
        "Foco: Controlar o consumo de doces e macarrão.",
        "Sexta: Recompensa - um 'doce programado' ou porção controlada de macarrão integral!"
    ],
    improvements: [
        "**Gerenciamento de doces:** Crie um sistema de 'doces programados' (1-2x/semana) para evitar exageros.",
        "**Substituição do macarrão:** Experimente espaguete de abobrinha, batata doce em espiral ou macarrão integral em porções muito controladas.",
        "**Lanches Estratégicos:** Tenha proteína em pó ou iogurte natural fácil de levar para a escola.",
        "**Preparação antecipada:** Faça 'marmitas doces saudáveis' para quando a vontade de doce bater."
    ],
    marmitaIdeas: [
        "**Proteínas:** Frango desfiado, ovos cozidos, atum em água.",
        "**Carboidratos:** Quinoa, batata doce, cuscuz marroquino.",
        "**Vegetais:** Saladas prontas em potes, mix de vegetais cozidos.",
        "**Lanches:** Frutas porcionadas, iogurte com granola caseira, bolinhas de tâmara e coco."
    ],
    mealHistory: [],
    waterHistory: [],
    currentWater: 0,
    compensation: {
        active: false,
        date: null,
        reduction: 0,
        note: ""
    }
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

function getDateForTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
}

function saveAppData() {
    localStorage.setItem('domiData', JSON.stringify(appData.domi));
    localStorage.setItem('nathData', JSON.stringify(appData.nath));
}

// Calcula calorias totais do dia
function calculateDailyCalories(user, date) {
    const history = appData[user].mealHistory.filter(m => m.date === date);
    return history.reduce((total, meal) => total + (parseInt(meal.calories) || 0), 0);
}

// Calcula compensação para o dia seguinte
function calculateCompensation(user) {
    const today = getCurrentDateString();
    const todayCalories = calculateDailyCalories(user, today);
    const target = appData[user].profile.caloriesTarget;

    if (todayCalories > target) {
        const excess = todayCalories - target;
        const reduction = Math.min(excess * 0.7, 500); // Reduz até 70% do excesso, mas no máximo 500kcal
        appData[user].compensation = {
            active: true,
            date: getDateForTomorrow(),
            reduction: Math.round(reduction),
            note: `Excesso de ${excess}kcal hoje. Reduzir ${reduction}kcal amanhã.`
        };
        saveAppData();
    } else {
        appData[user].compensation = { active: false, date: null, reduction: 0, note: "" };
        saveAppData();
    }
}

// --- Renderização da Interface ---
function renderProfileSummary(user) {
    const profile = appData[user].profile;
    const today = getCurrentDateString();
    const todayCalories = calculateDailyCalories(user, today);
    const target = profile.caloriesTarget;
    const excess = todayCalories - target;
    const color = excess > 0 ? "#f44336" : excess < -300 ? "#4CAF50" : "#FFC107";

    let compensationHtml = "";
    const comp = appData[user].compensation;
    if (comp.active && comp.date === today) {
        compensationHtml = `
            <div style="background:#fff3e0; border-left:5px solid #ff9800; padding:10px; margin-top:15px;">
                <strong>⚠️ Ajuste de Recuperação Hoje:</strong><br>
                Reduzir ${comp.reduction}kcal devido ao excesso de ontem.<br>
                <em>Sugestão: Pular lanche ou reduzir carboidrato no jantar.</em>
            </div>
        `;
    }

    return `
        <div class="profile-section">
            <h2>Perfil de ${profile.name}</h2>
            <p><strong>Altura:</strong> ${profile.height}m</p>
            <p><strong>Peso Atual:</strong> ${profile.weight}kg</p>
            <p><strong>Meta de Peso:</strong> ${profile.targetWeight}kg</p>
            <p><strong>Idade:</strong> ${profile.age} anos</p>
            <p><strong>Calorias Hoje:</strong> <strong>${todayCalories}/${target} kcal</strong> <span style="color:${color}">${excess > 0 ? `(+${excess})` : excess < 0 ? `(${excess})` : ""}</span></p>
            <p><strong>Proteína Alvo:</strong> ${profile.proteinTarget}g</p>
            <p><strong>Água Alvo:</strong> ${profile.waterTarget / 1000}L</p>
            <p><strong>Progresso:</strong> ${profile.weight - profile.targetWeight}kg restantes para a meta!</p>
            ${compensationHtml}
        </div>
    `;
}

function renderDietPlan(user) {
    const dietPlan = appData[user].dietPlan;
    const today = getCurrentDateString();
    const comp = appData[user].compensation;
    let mealsHtml = "";

    dietPlan.forEach(meal => {
        let note = "";
        if (comp.active && comp.date === today) {
            // Aplica redução proporcional ou fixa
            const reductionPerMeal = Math.round(comp.reduction / dietPlan.length);
            note = `<span style="color:#f44336; font-size:0.9em;">(-${reductionPerMeal}kcal sugerido)</span>`;
        }
        mealsHtml += `
            <div class="meal-card">
                <strong>${meal.time}</strong>
                <span>${meal.description} ${note}</span>
                <small>🔥 ${meal.calories} kcal</small>
            </div>
        `;
    });

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
                <label for="${user}-meal-weight">Peso/Quantidade:</label>
                <input type="text" id="${user}-meal-weight" placeholder="Ex: 150g frango">
            </div>
            <div class="input-group">
                <label for="${user}-meal-calories">Calorias Estimadas:</label>
                <input type="number" id="${user}-meal-calories" placeholder="Ex: 450" min="0">
            </div>
            <div class="input-group">
                <label for="${user}-meal-desc">Descrição:</label>
                <textarea id="${user}-meal-desc" placeholder="Detalhes da refeição..."></textarea>
            </div>
            <button onclick="addMeal('${user}')">Adicionar Refeição</button>
        </div>
    `;
}

// As outras funções (renderWaterTracker, renderHistory, etc.) permanecem as mesmas
// ... (copie as funções renderWaterTracker, renderHistory, renderReminders, renderImprovements, renderMarmitaIdeas, addMeal, addWater, resetWater, renderApp, switchTab do código anterior)

// --- Modificação na função addMeal para incluir calorias e calcular compensação ---
function addMeal(user) {
    const mealDate = document.getElementById(`${user}-meal-date`).value;
    const mealTime = document.getElementById(`${user}-meal-time`).value;
    const mealWeight = document.getElementById(`${user}-meal-weight`).value;
    const mealCalories = parseInt(document.getElementById(`${user}-meal-calories`).value) || 0;
    const mealDesc = document.getElementById(`${user}-meal-desc`).value;

    if (!mealDate || !mealTime || !mealWeight || mealDesc === "" || mealCalories <= 0) {
        alert('Por favor, preencha todos os campos corretamente (incluindo calorias)!');
        return;
    }

    const newMeal = {
        date: mealDate,
        time: mealTime,
        weight: mealWeight,
        calories: mealCalories,
        description: mealDesc
    };

    appData[user].mealHistory.push(newMeal);
    saveAppData();
    renderApp(user);
    alert('Refeição adicionada com sucesso!');

    // Calcula compensação se for hoje
    if (mealDate === getCurrentDateString()) {
        calculateCompensation(user);
    }

    // Limpar campos
    document.getElementById(`${user}-meal-weight`).value = '';
    document.getElementById(`${user}-meal-calories`).value = '';
    document.getElementById(`${user}-meal-desc`).value = '';
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se há compensação para hoje ao carregar
    calculateCompensation('domi');
    calculateCompensation('nath');
    switchTab(currentActiveTab);
});
