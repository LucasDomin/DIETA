// Super Agente Dieta - script.js (VERSÃO COMPLETA)

const DOMI_INITIAL_DATA = {
    profile: { name:"DOMI", height:1.78, weight:86, targetWeight:79, age:30, tdeeEstimated:2700, caloriesTarget:2200, proteinTarget:150, waterTarget:3500 },
    dietPlan: [
        { time:"06:30", description:"☕ Café da manhã: 3 ovos, 2 fatias pão integral, café" },
        { time:"11:00", description:"🥛 Lanche: Whey + banana + castanhas" },
        { time:"12:30", description:"🍲 Almoço: Frango + batata doce + salada" },
        { time:"16:00", description:"🍞 Lanche: Pão integral + queijo + café" },
        { time:"19:30", description:"🍽️ Jantar: Salmão + vegetais" },
        { time:"22:00", description:"🥛 Ceia: Iogurte grego ou caseína" }
    ],
    reminders:["Domingo 20h: Preparar marmitas!","Hidratar nos treinos de Jiu-Jitsu","Evitar energético e doces"],
    improvements:["Controle o apetite (Durateston)","Troque maionese por versões saudáveis","Pese o pão das 16h"],
    marmitaIdeas:["Frango desfiado, batata doce, brócolis","Ovos cozidos e arroz integral","Paçoca fitness caseira"],
    mealHistory:[], waterHistory:[], currentWater:0,
    compensation:{ active:false, date:null, reduction:0, note:"" }
};

const NATH_INITIAL_DATA = {
    profile: { name:"NATH", height:1.60, weight:56, targetWeight:50, age:30, tdeeEstimated:2000, caloriesTarget:1550, proteinTarget:100, waterTarget:2500 },
    dietPlan: [
        { time:"06:50", description:"🥚 Café: ovos + aveia + fruta" },
        { time:"09:50", description:"🥜 Lanche: iogurte + castanhas" },
        { time:"13:00", description:"🥗 Almoço: frango + salada + carboidrato" },
        { time:"17:00", description:"🍌 Pré-treino: banana + whey" },
        { time:"20:30", description:"🍲 Jantar leve: sopa ou omelete" }
    ],
    reminders:["Levar lanche para escola","Controlar doces e macarrão"],
    improvements:["Doces programados 1-2x/semana","Usar macarrão integral ou abobrinha"],
    marmitaIdeas:["Quinoa, frango, legumes","Bolinhas de tâmara e coco"],
    mealHistory:[], waterHistory:[], currentWater:0,
    compensation:{ active:false, date:null, reduction:0, note:"" }
};

let appData = {
    domi: JSON.parse(localStorage.getItem('domiData')) || DOMI_INITIAL_DATA,
    nath: JSON.parse(localStorage.getItem('nathData')) || NATH_INITIAL_DATA
};
let currentActiveTab = 'domi';

function getCurrentDateString(){ return new Date().toISOString().slice(0,10); }
function getTomorrowDateString(){ const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); }
function saveAppData(){ localStorage.setItem('domiData',JSON.stringify(appData.domi)); localStorage.setItem('nathData',JSON.stringify(appData.nath)); }

function calculateDailyCalories(user,date){
    return appData[user].mealHistory.filter(m=>m.date===date).reduce((s,m)=>s+(parseInt(m.calories)||0),0);
}
function updateCompensation(user){
    const today=getCurrentDateString(), tomorrow=getTomorrowDateString();
    const cal=calculateDailyCalories(user,today), target=appData[user].profile.caloriesTarget;
    if(cal>target){
        const excess=cal-target, reduction=Math.min(Math.round(excess*0.7),500);
        appData[user].compensation={ active:true, date:tomorrow, reduction, note:`Excesso de ${excess} kcal hoje.` };
    }else{
        if(appData[user].compensation.date===tomorrow) appData[user].compensation={ active:false, date:null, reduction:0, note:"" };
    }
    saveAppData();
}

function renderProfileSummary(user){
    const p=appData[user].profile, today=getCurrentDateString();
    const cal=calculateDailyCalories(user,today), diff=cal-p.caloriesTarget;
    let color="#4CAF50", status="";
    if(diff>0){ color="#f44336"; status=`(+${diff} kcal)`; } else if(diff<0){ color="#2196F3"; status=`(${diff} kcal)`; }
    const comp=appData[user].compensation;
    let compHtml="";
    if(comp.active && comp.date===today){
        compHtml=`<div style="background:#fff3e0;border-left:5px solid #ff9800;padding:12px;margin-top:15px;border-radius:5px;">
        <strong>⚠️ Ajuste de Recuperação</strong><br>Reduza <strong>${comp.reduction} kcal</strong> hoje.<br><small>${comp.note}</small></div>`;
    }
    return `<div class="profile-section"><h2>Perfil de ${p.name}</h2>
        <p><strong>Peso:</strong> ${p.weight}kg | Meta: ${p.targetWeight}kg</p>
        <p><strong>Calorias hoje:</strong> <span style="color:${color};font-weight:bold">${cal} / ${p.caloriesTarget} kcal ${status}</span></p>
        <p><strong>Proteína alvo:</strong> ${p.proteinTarget}g | <strong>Água:</strong> ${p.waterTarget/1000}L</p>${compHtml}</div>`;
}
function renderDietPlan(user){
    const plan=appData[user].dietPlan, comp=appData[user].compensation, today=getCurrentDateString();
    const html=plan.map(m=>{
        let note=""; if(comp.active && comp.date===today) note=`<br><small style="color:#f44336">Sugerido: -${Math.round(comp.reduction/plan.length)} kcal</small>`;
        return `<div class="meal-card"><strong>${m.time}</strong><span>${m.description}${note}</span></div>`;
    }).join('');
    return `<div class="diet-plan-section"><h2>Plano de Dieta</h2>${html}</div>`;
}
function renderMealLogger(user){
    return `<div class="logging-section"><h2>Registrar Refeição</h2>
        <div class="input-group"><label>Data:</label><input type="date" id="${user}-meal-date" value="${getCurrentDateString()}"></div>
        <div class="input-group"><label>Horário:</label><input type="time" id="${user}-meal-time" value="${new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}"></div>
        <div class="input-group"><label>Peso/Quantidade:</label><input type="text" id="${user}-meal-weight" placeholder="Ex: 150g frango"></div>
        <div class="input-group"><label>Calorias (kcal):</label><input type="number" id="${user}-meal-calories" placeholder="Ex: 450" min="0"></div>
        <div class="input-group"><label>Descrição:</label><textarea id="${user}-meal-desc"></textarea></div>
        <button onclick="addMeal('${user}')">Adicionar Refeição</button></div>`;
}
function renderWaterTracker(user){
    const p=appData[user].profile, cur=appData[user].currentWater, pct=Math.min(100,Math.round(cur/p.waterTarget*100));
    return `<div class="water-section"><h2>Água 💧</h2>
        <div class="water-tracker"><div class="water-progress"><div class="water-bar" style="width:${pct}%">${cur}ml (${pct}%)</div></div>
        <span>${cur}ml / ${p.waterTarget/1000}L</span>
        <button class="water-add-btn" onclick="addWater('${user}',250)">+250ml</button>
        <button class="water-add-btn" onclick="resetWater('${user}')">Zerar</button></div></div>`;
}
function renderHistory(user){
    const meals=appData[user].mealHistory.slice().sort((a,b)=>new Date(b.date+'T'+b.time)-new Date(a.date+'T'+a.time));
    const waters=appData[user].waterHistory.slice().sort((a,b)=>new Date(b.date+'T'+b.time)-new Date(a.date+'T'+a.time));
    let items=[]; meals.forEach(m=>items.push({type:'meal',...m})); waters.forEach(w=>items.push({type:'water',...w}));
    items.sort((a,b)=>new Date(b.date+'T'+b.time)-new Date(a.date+'T'+a.time));
    const html=items.map(it=> it.type==='meal'
        ? `<div class="history-item"><strong>${it.date} ${it.time}</strong><span>🍽️ ${it.description}</span><span>⚖️ ${it.weight} | 🔥 ${it.calories||0} kcal</span></div>`
        : `<div class="history-item"><strong>${it.date} ${it.time}</strong><span>💧 +${it.amount}ml (total ${it.total}ml)</span></div>`).join('');
    return `<div class="history-section"><h2>Histórico</h2><div class="history-list">${html||'<p>Nenhum registro.</p>'}</div></div>`;
}
function renderReminders(user){ return `<div class="reminders-section"><h2>Lembretes 🔔</h2>${appData[user].reminders.map(r=>`<div class="reminder-item">${r}</div>`).join('')}</div>`; }
function renderImprovements(user){ return `<div class="improvements-section"><h2>Melhorias 💡</h2>${appData[user].improvements.map(i=>`<div class="improvement-point">${i}</div>`).join('')}</div>`; }
function renderMarmita(user){ return `<div class="marmita-section"><h2>Marmitas 🍱</h2>${appData[user].marmitaIdeas.map(m=>`<div class="marmita-item">${m}</div>`).join('')}</div>`; }

function addMeal(user){
    const date=document.getElementById(`${user}-meal-date`).value;
    const time=document.getElementById(`${user}-meal-time`).value;
    const weight=document.getElementById(`${user}-meal-weight`).value;
    const calories=parseInt(document.getElementById(`${user}-meal-calories`).value)||0;
    const desc=document.getElementById(`${user}-meal-desc`).value;
    if(!date||!time||!weight||!desc){ alert("Preencha todos os campos"); return; }
    appData[user].mealHistory.push({date,time,weight,calories,description:desc});
    saveAppData(); updateCompensation(user); renderApp(user);
    document.getElementById(`${user}-meal-weight`).value=""; document.getElementById(`${user}-meal-calories`).value=""; document.getElementById(`${user}-meal-desc`).value="";
}
function addWater(user,amount){
    const today=getCurrentDateString();
    const last=appData[user].waterHistory[appData[user].waterHistory.length-1];
    if(!last || last.date!==today) appData[user].currentWater=0;
    appData[user].currentWater+=amount;
    appData[user].waterHistory.push({date:today,time:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),amount,total:appData[user].currentWater});
    saveAppData(); renderApp(user);
}
function resetWater(user){
    if(confirm("Zerar água de hoje?")){
        appData[user].currentWater=0;
        appData[user].waterHistory=appData[user].waterHistory.filter(e=>e.date!==getCurrentDateString());
        saveAppData(); renderApp(user);
    }
}
function renderApp(user){
    const today=getCurrentDateString();
    const last=appData[user].waterHistory[appData[user].waterHistory.length-1];
    if(!last || last.date!==today) appData[user].currentWater=0;
    document.getElementById('app-content').innerHTML = `
        ${renderProfileSummary(user)} ${renderDietPlan(user)} ${renderMealLogger(user)}
        ${renderWaterTracker(user)} ${renderHistory(user)} ${renderReminders(user)}
        ${renderImprovements(user)} ${renderMarmita(user)}`;
}
function switchTab(user){
    currentActiveTab=user;
    document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="switchTab('${user}')"]`).classList.add('active');
    renderApp(user);
}
document.addEventListener('DOMContentLoaded',()=>{ updateCompensation('domi'); updateCompensation('nath'); switchTab(currentActiveTab); });
