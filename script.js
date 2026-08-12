let isAdmin = false;

let ppts = [
    { id: 1, title: "سەرەتایەک د ئابووری دا", class: "10", tag: "پۆلا 10ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ سەرەتایەک د ئابووری دا.", link: "#" },
    { id: 2, title: "دیاردەیا هەناردەکرن و هاوردەکرنێ", class: "10", tag: "پۆلا 10ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ دیاردەیا هەناردەکرن و هاوردەکرنێ.", link: "#" },
    { id: 3, title: "ململانێیا بازاری و بەرهەم", class: "11", tag: "پۆلا 11ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ ململانێیا بازاری و بەرهەم.", link: "#" },
    { id: 4, title: "سیستەمێن دارایی د جیهانێ دا", class: "11", tag: "پۆلا 11ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ سیستەمێن دارایی د جیهانێ دا.", link: "#" },
    { id: 5, title: "داهاتی نەەتەوەیی و گەشەکرن", class: "12", tag: "پۆلا 12ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ داهاتی نەەتەوەیی و گەشەکرن.", link: "#" },
    { id: 6, title: "سیاستەتا نەقدی و بەنکا ناوەندی", class: "12", tag: "پۆلا 12ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ سیاستەتا نەقدی و بەنکا ناوەندی.", link: "#" }
];

let ministerials = [
    { id: 1, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ١)", link: "#" },
    { id: 2, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ۲)", link: "#" },
    { id: 3, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ١)", link: "#" }
];

let quizzes = [
    {
        id: 1,
        question: "چەمکێ ئابووری ب تەمامی بریتییە ژ چ؟",
        options: [
            "زانستا ڕێکخستن و بەرێوەبرتنا سەرچاوەیان",
            "تەنێ کۆمکرنا پەڕەیی د بەنکێ دا",
            "بازرگانیا دەرەکی ب بێ پلاندانان",
            "کڕینا کەلوپەلان ژ بازارێ ب تەنێ"
        ],
        correctIndex: 0
    },
    {
        id: 2,
        question: "دەسەڵاتا دەرکرنا دراڤی (پارە)ی ل دەست خۆدیێ چ لایەنەکییە؟",
        options: [
            "بەنکێن بازرگانی یێن تایبەت",
            "بەنکا ناوەندی یا دەولەتێ",
            "وەزارەتا بازرگانی",
            "کومپانیێن مەزن یێن بەرهەمهێنانی"
        ],
        correctIndex: 1
    }
];

// Toggle Admin Mode
function toggleAdmin() {
    const password = prompt("تکایە پاسوۆردێ ئەدمینی بنڤێسە:");
    if (password === "22334456") {
        isAdmin = !isAdmin;
        document.body.classList.toggle("is-admin", isAdmin);
        const btn = document.getElementById("admin-toggle-btn");
        
        if (isAdmin) {
            btn.innerHTML = `<i class="fa-solid fa-lock"></i> دەركەفتن`;
            alert("تو دەرباز بوی وەک ئەدمین!");
        } else {
            btn.innerHTML = `<i class="fa-solid fa-user-gear"></i> ئەدمین`;
            alert("تو دەركەفتی ژ حالەتێ ئەدمینی.");
        }
        
        renderPPTs();
        renderMinisterials();
        renderQuizzes();
    } else if (password !== null) {
        alert("پاسوۆرد شاشە!");
    }
}

// Mobile Menu Toggle
const menuToggleBtn = document.getElementById('menu-toggle');
if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
        document.getElementById('nav-menu').classList.toggle('active');
    });
}

function closeMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.remove('active');
}

// Render Functions
function renderPPTs(filter = 'all') {
    const container = document.getElementById("ppt-container");
    if (!container) return;
    const filtered = filter === 'all' ? ppts : ppts.filter(item => item.class === filter);

    container.innerHTML = filtered.map(item => `
        <div class="data-card">
            <span class="card-tag">${item.tag}</span>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="card-actions">
                <a href="${item.link}" class="btn-download"><i class="fa-solid fa-file-powerpoint"></i> داگرتن</a>
                <button class="btn-edit admin-only" onclick="editPPT(${item.id})">
                    <i class="fa-solid fa-pen-to-square"></i> دەستکاریکرن
                </button>
            </div>
        </div>
    `).join('');
}

function renderMinisterials() {
    const container = document.getElementById("ministerial-container");
    if (!container) return;
    container.innerHTML = ministerials.map(item => `
        <div class="pdf-card">
            <div class="pdf-icon"><i class="fa-solid fa-file-pdf"></i></div>
            <h3>${item.title}</h3>
            <a href="${item.link}" class="pdf-link"><i class="fa-solid fa-download"></i> داگرتنا PDF</a>
            <button class="btn-edit admin-only" onclick="editMinisterial(${item.id})">
                <i class="fa-solid fa-pen-to-square"></i> دەستکاریکرن
            </button>
        </div>
    `).join('');
}

function renderQuizzes() {
    const container = document.getElementById("quiz-container");
    if (!container) return;
    container.innerHTML = quizzes.map(q => `
        <div class="quiz-box">
            <div class="quiz-title"><i class="fa-solid fa-circle-question"></i> ${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, idx) => `
                    <div class="quiz-opt" onclick="selectOption(this, ${q.id}, ${idx})">${opt}</div>
                `).join('')}
            </div>
            <div class="quiz-feedback" id="feedback-${q.id}" style="margin-top: 1rem; font-weight: bold;"></div>
            <button class="btn-edit admin-only" onclick="editQuiz(${q.id})" style="margin-top: 0.5rem;">
                <i class="fa-solid fa-pen-to-square"></i> دەستکاریکرن
            </button>
        </div>
    `).join('');
}

// Option Selection Logic
function selectOption(element, quizId, selectedIdx) {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const parent = element.parentElement;
    if (parent.classList.contains('disabled')) return;

    parent.classList.add('disabled');
    const options = parent.querySelectorAll('.quiz-opt');
    const feedbackBox = document.getElementById(`feedback-${quizId}`);

    const correctOpt = options[quiz.correctIndex];
    correctOpt.style.border = "2px solid #10b981";
    correctOpt.style.color = "#10b981";
    correctOpt.style.fontWeight = "bold";

    if (selectedIdx === quiz.correctIndex) {
        if (feedbackBox) {
            feedbackBox.style.color = "#10b981";
            feedbackBox.innerHTML = "ئافەرین! بەرسڤا تە یا ڕاست بوو 🎉";
        }
    } else {
        element.style.border = "2px solid #ef4444";
        element.style.color = "#ef4444";
        element.style.fontWeight = "bold";

        if (feedbackBox) {
            feedbackBox.style.color = "#ef4444";
            feedbackBox.innerHTML = "بەرسڤا تە شاش بوو! بەرسڤا ڕاست ب ڕەنگێ کەسک هاتیە دەستنیشانکرن.";
        }
    }
}

// Edit Functions
function editPPT(id) {
    const item = ppts.find(p => p.id === id);
    if (!item) return;
    const newTitle = prompt("ناڤێ نوی بنڤێسە:", item.title);
    if (newTitle) { item.title = newTitle; renderPPTs(); }
}

function editMinisterial(id) {
    const item = ministerials.find(m => m.id === id);
    if (!item) return;
    const newTitle = prompt("ناڤێ فایلا وەزاری بگوهۆڕە:", item.title);
    if (newTitle) { item.title = newTitle; renderMinisterials(); }
}

function editQuiz(id) {
    const q = quizzes.find(item => item.id === id);
    if (!q) return;
    const newQuestion = prompt("پرسیارا نوی بنڤێسە:", q.question);
    if (newQuestion) { q.question = newQuestion; renderQuizzes(); }
}

function filterPPT(cls) {
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    renderPPTs(cls);
}

document.addEventListener("DOMContentLoaded", () => {
    renderPPTs();
    renderMinisterials();
    renderQuizzes();

    const searchInput = document.getElementById("ppt-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = ppts.filter(p => p.title.toLowerCase().includes(query));
            const container = document.getElementById("ppt-container");
            if (container) {
                container.innerHTML = filtered.map(item => `
                    <div class="data-card">
                        <span class="card-tag">${item.tag}</span>
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <div class="card-actions">
                            <a href="${item.link}" class="btn-download"><i class="fa-solid fa-file-powerpoint"></i> داگرتن</a>
                            <button class="btn-edit admin-only" onclick="editPPT(${item.id})">
                                <i class="fa-solid fa-pen-to-square"></i> دەستکاریکرن
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        });
    }
});
// بارکرنا ئاگەهداریێ ژ بیرگەها وێبسایتی
function loadNotification() {
    const savedText = localStorage.getItem('site_notification');
    if (savedText) {
        document.getElementById('notice-text').innerText = savedText;
    }
}

// گۆڕینا ئاگەهداریێ ژلایێ ئەدمینی ڤە
function editNotification() {
    const currentText = document.getElementById('notice-text').innerText;
    const newText = prompt("ئاگەهداریا نوی بنڤێسە:", currentText);
    
    if (newText !== null && newText.trim() !== "") {
        document.getElementById('notice-text').innerText = newText;
        localStorage.setItem('site_notification', newText);
        alert("ئاگەهداری ب سەرکەفتن هاتە گۆڕین!");
    }
}

// د دەمێ ڤەکرنا پەیجی دا bang بکە
document.addEventListener("DOMContentLoaded", () => {
    loadNotification();
});
// Add New PPT Lesson
function addNewPPT(event) {
    event.preventDefault();
    const title = document.getElementById("ppt-title-input").value;
    const cls = document.getElementById("ppt-class-input").value;
    const desc = document.getElementById("ppt-desc-input").value;
    const link = document.getElementById("ppt-link-input").value;

    const newObj = {
        id: Date.now(),
        title: title,
        class: cls,
        tag: `پۆلا ${cls}ی وێژەیی`,
        desc: desc,
        link: link
    };

    ppts.unshift(newObj); // زێدەکرن بۆ سەرەتایا لیستی
    renderPPTs();
    event.target.reset();
    alert("وانە ب سەرکەفتن هاتە زێدەکرن!");
}

// Add New Ministerial PDF
function addNewMinisterial(event) {
    event.preventDefault();
    const title = document.getElementById("pdf-title-input").value;
    const link = document.getElementById("pdf-link-input").value;

    const newObj = {
        id: Date.now(),
        title: title,
        link: link
    };

    ministerials.unshift(newObj);
    renderMinisterials();
    event.target.reset();
    alert("فایلا وەزاری ب سەرکەفتن هاتە زێدەکرن!");
}

// Add New Quiz Question
function addNewQuiz(event) {
    event.preventDefault();
    const q = document.getElementById("quiz-q-input").value;
    const opt1 = document.getElementById("quiz-opt1-input").value;
    const opt2 = document.getElementById("quiz-opt2-input").value;
    const opt3 = document.getElementById("quiz-opt3-input").value;
    const opt4 = document.getElementById("quiz-opt4-input").value;

    const newObj = {
        id: Date.now(),
        question: q,
        options: [opt1, opt2, opt3, opt4],
        correctIndex: 0 // بەرسڤا ئێکێ (opt1) وەک ڕاست دهێتە تۆمارکرن
    };

    quizzes.push(newObj);
    renderQuizzes();
    event.target.reset();
    alert("پرسیارا کویزی ب سەرکەفتن هاتە زێدەکرن!");
}