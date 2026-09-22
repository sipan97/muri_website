let isAdmin = false;

// 1. ئینانە دەریا داتایان ژ LocalStorage ئەگەر هەبن، ئەگەر نەبن با دەستپێکی بن
let ppts = JSON.parse(localStorage.getItem('saved_ppts')) || [
    { id: 1, title: "سەرەتایەک د ئابووری دا", class: "10", tag: "پۆلا 10ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ سەرەتایەک د ئابووری دا.", link: "files/10/seretayak.pptx" },
    { id: 2, title: "دیاردەیا هەناردەکرن و هاوردەکرنێ", class: "10", tag: "پۆلا 10ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ دیاردەیا هەناردەکرن و هاوردەکرنێ.", link: "files/10/hanardakrn.pptx" },
    { id: 3, title: "ململانێیا بازاری و بەرهەم", class: "11", tag: "پۆلا 11ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ ململانێیا بازاری و بەرهەم.", link: "files/11/mlmlanya.pptx" },
    { id: 4, title: "سیستەمێن دارایی د جیهانێ دا", class: "11", tag: "پۆلا 11ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ سیستەمێن دارایی د جیهانێ دا.", link: "files/11/systemen.pptx" },
    { id: 5, title: "داهاتی نەەتەوەیی و گەشەکرن", class: "12", tag: "پۆلا 12ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ داهاتی نەەتەوەیی و گەشەکرن.", link: "files/12/dahati.pptx" },
    { id: 6, title: "سیاستەتا نەقدی و بەنکا ناوەندی", class: "12", tag: "پۆلا 12ی وێژەیی", desc: "فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ سیاستەتا نەقدی و بەنکا ناوەندی.", link: "files/12/syasea.pptx" }
];

let ministerials = JSON.parse(localStorage.getItem('saved_ministerials')) || [
    { id: 1, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ١)", link: "files/ministerial/2023_khola1.pdf" },
    { id: 2, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ۲)", link: "files/ministerial/2023_khola2.pdf" }
];

let quizzes = JSON.parse(localStorage.getItem('saved_quizzes')) || [
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
        question: "دەسەڵاتا دەرکرنا دراڤی (پارە)ی ل دەست خۆدیێ چ لایەنەکییە?",
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
        renderFeedbacks();
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

// Render PPTs with View-Only button
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
                <a href="${item.link}" target="_blank" class="btn-download" style="background: #3b82f6;"><i class="fa-solid fa-eye"></i> سەحکرنا وانەیێ</a>
                <button class="btn-edit admin-only" onclick="editPPT(${item.id})">
                    <i class="fa-solid fa-pen-to-square"></i> دەستکاریکرن
                </button>
                <button class="btn-delete admin-only" onclick="deletePPT(${item.id})" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;">
                    <i class="fa-solid fa-trash"></i> سڕینەوە
                </button>
            </div>
        </div>
    `).join('');
}

// Render Ministerials
function renderMinisterials() {
    const container = document.getElementById("ministerial-container");
    if (!container) return;
    container.innerHTML = ministerials.map(item => `
        <div class="pdf-card">
            <div class="pdf-icon"><i class="fa-solid fa-file-pdf"></i></div>
            <h3>${item.title}</h3>
            <a href="${item.link}" class="pdf-link" target="_blank"><i class="fa-solid fa-download"></i> داگرتنا PDF</a>
            <button class="btn-edit admin-only" onclick="editMinisterial(${item.id})">
                <i class="fa-solid fa-pen-to-square"></i> دەستکاریکرن
            </button>
            <button class="btn-delete admin-only" onclick="deleteMinisterial(${item.id})" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;">
                <i class="fa-solid fa-trash"></i> سڕینەوە
            </button>
        </div>
    `).join('');
}

// Render Quizzes
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
            <div style="margin-top: 0.5rem;">
                <button class="btn-edit admin-only" onclick="editQuiz(${q.id})">
                    <i class="fa-solid fa-pen-to-square"></i> دەستکاریکرن
                </button>
                <button class="btn-delete admin-only" onclick="deleteQuiz(${q.id})" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;">
                    <i class="fa-solid fa-trash"></i> سڕینەوە
                </button>
            </div>
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
    if (newTitle) { 
        item.title = newTitle; 
        localStorage.setItem('saved_ppts', JSON.stringify(ppts));
        renderPPTs(); 
    }
}

function editMinisterial(id) {
    const item = ministerials.find(m => m.id === id);
    if (!item) return;
    const newTitle = prompt("ناڤێ فایلا وەزاری بگوهۆڕە:", item.title);
    if (newTitle) { 
        item.title = newTitle; 
        localStorage.setItem('saved_ministerials', JSON.stringify(ministerials));
        renderMinisterials(); 
    }
}

function editQuiz(id) {
    const q = quizzes.find(item => item.id === id);
    if (!q) return;
    const newQuestion = prompt("پرسیارا نوی بنڤێسە:", q.question);
    if (newQuestion) { 
        q.question = newQuestion; 
        localStorage.setItem('saved_quizzes', JSON.stringify(quizzes));
        renderQuizzes(); 
    }
}

// Delete Functions
function deletePPT(id) {
    if (confirm("تۆ دڵنیای لە سڕینەوەی ئەم وانەیەیە؟")) {
        ppts = ppts.filter(item => item.id !== id);
        localStorage.setItem('saved_ppts', JSON.stringify(ppts));
        renderPPTs();
        alert("وانە بە سەرکەوتوویی سڕایەوە!");
    }
}

function deleteMinisterial(id) {
    if (confirm("تۆ دڵنیای لە سڕینەوەی ئەم پرسیارە وەزارییە؟")) {
        ministerials = ministerials.filter(item => item.id !== id);
        localStorage.setItem('saved_ministerials', JSON.stringify(ministerials));
        renderMinisterials();
        alert("پرسیاری وەزاری بە سەرکەوتوویی سڕایەوە!");
    }
}

function deleteQuiz(id) {
    if (confirm("تۆ دڵنیای لە سڕینەوەی ئەم پرسیارەی کویز؟")) {
        quizzes = quizzes.filter(item => item.id !== id);
        localStorage.setItem('saved_quizzes', JSON.stringify(quizzes));
        renderQuizzes();
        alert("پرسیاری کویز بە سەرکەوتوویی سڕایەوە!");
    }
}

function filterPPT(cls) {
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    renderPPTs(cls);
}

// Handle Feedback Submission & Saving
function submitFeedback(event) {
    event.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const nameInput = document.getElementById("user-name").value.trim();
    const role = document.getElementById("user-role").value;
    const message = document.getElementById("user-message").value.trim();
    
    const feedbackObj = {
        id: Date.now(),
        name: nameInput !== "" ? nameInput : "سەردانیکەرێ نەناس",
        role: role,
        rating: rating,
        message: message,
        date: new Date().toLocaleDateString('ku-IQ')
    };

    let feedbacks = JSON.parse(localStorage.getItem('site_feedbacks')) || [];
    feedbacks.unshift(feedbackObj);
    localStorage.setItem('site_feedbacks', JSON.stringify(feedbacks));

    const successBox = document.getElementById("feedback-success");
    if (successBox) {
        successBox.style.display = "block";
        setTimeout(() => { successBox.style.display = "none"; }, 4000);
    }

    document.getElementById("feedback-form").reset();
    renderFeedbacks();
}

// Render Feedbacks for Admin
function renderFeedbacks() {
    const container = document.getElementById("admin-feedbacks-container");
    if (!container) return;

    let feedbacks = JSON.parse(localStorage.getItem('site_feedbacks')) || [];

    if (feedbacks.length === 0) {
        container.innerHTML = `<p style="color: #666; font-style: italic;">هێشتا چ تێبینی نەهاتینە نڤێسین.</p>`;
        return;
    }

    container.innerHTML = feedbacks.map(item => `
        <div class="feedback-item">
            <h4>${item.name} (${item.role}) - <span style="color: #f59e0b;">⭐ ${item.rating}/5</span></h4>
            <p>${item.message}</p>
            <div class="feedback-meta">
                <span>بەروار: ${item.date}</span>
                <button class="btn-delete-feedback" onclick="deleteFeedback(${item.id})"><i class="fa-solid fa-trash"></i> سڕینەوە</button>
            </div>
        </div>
    `).join('');
}

// Delete Feedback
function deleteFeedback(id) {
    if (confirm("تۆ دڵنیای لە سڕینەوەی ئەم تێبینییە؟")) {
        let feedbacks = JSON.parse(localStorage.getItem('site_feedbacks')) || [];
        feedbacks = feedbacks.filter(item => item.id !== id);
        localStorage.setItem('site_feedbacks', JSON.stringify(feedbacks));
        renderFeedbacks();
    }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    renderPPTs();
    renderMinisterials();
    renderQuizzes();
    loadNotification();
    renderFeedbacks();

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
                            <button class="btn-delete admin-only" onclick="deletePPT(${item.id})" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;">
                                <i class="fa-solid fa-trash"></i> سڕینەوە
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        });
    }
});

// Load and Edit Notification
function loadNotification() {
    const savedText = localStorage.getItem('site_notification');
    if (savedText) {
        const noticeEl = document.getElementById('notice-text');
        if (noticeEl) noticeEl.innerText = savedText;
    }
}

function editNotification() {
    const noticeEl = document.getElementById('notice-text');
    const currentText = noticeEl ? noticeEl.innerText : "";
    const newText = prompt("ئاگەهداریا نوی بنڤێسە:", currentText);
    
    if (newText !== null && newText.trim() !== "") {
        if (noticeEl) noticeEl.innerText = newText;
        localStorage.setItem('site_notification', newText);
        alert("ئاگەهداری ب سەرکەفتن هاتە گۆڕین!");
    }
}

// Add New PPT Lesson (Direct folder linking + LocalStorage)
function addNewPPT(event) {
    event.preventDefault();
    const title = document.getElementById("ppt-title-input").value;
    const cls = document.getElementById("ppt-class-input").value;
    const desc = document.getElementById("ppt-desc-input").value;
    const fileInput = document.getElementById("ppt-file-input");

    if (fileInput.files.length === 0) {
        alert("تکایە فایلا پاوەرپۆینتێ هەڵبژێرە!");
        return;
    }

    // وەرگرتنا ناڤێ فایلی ب خۆکارى (بۆ نموونە: lessons.pptx) و گرێدانا وێ ب فۆڵدەرا پۆلێ ve
    const fileName = fileInput.files[0].name;
    const fileURL = `files/${cls}/${fileName}`;

    const newObj = {
        id: Date.now(),
        title: title,
        class: cls,
        tag: `پۆلا ${cls}ی وێژەیی`,
        desc: desc,
        link: fileURL
    };

    ppts.unshift(newObj);
    localStorage.setItem('saved_ppts', JSON.stringify(ppts));
    renderPPTs();
    event.target.reset();
    alert("وانە و فایلا پاوەرپۆینت ب سەرکەفتن هاتە زێدەکرن! (دڤێت فایلا تە د ناو فۆڵدەرا files/" + cls + " دا هەبت)");
}

// Add New Ministerial PDF (Direct folder linking + LocalStorage)
function addNewMinisterial(event) {
    event.preventDefault();
    const title = document.getElementById("pdf-title-input").value;
    const fileInput = document.getElementById("pdf-file-input");

    if (fileInput.files.length === 0) {
        alert("تکایە فایلا PDF هەڵبژێرە!");
        return;
    }

    const fileName = fileInput.files[0].name;
    const fileURL = `files/ministerial/${fileName}`;

    const newObj = {
        id: Date.now(),
        title: title,
        link: fileURL
    };

    ministerials.unshift(newObj);
    localStorage.setItem('saved_ministerials', JSON.stringify(ministerials));
    renderMinisterials();
    event.target.reset();
    alert("فایلا وەزاری ب سەرکەفتن هاتە زێدەکرن! (دڤێت فایلا تە د ناو فۆڵدەرا files/ministerial دا هەبت)");
}

// Add New Quiz Question (With LocalStorage Saving)
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
        correctIndex: 0
    };

    quizzes.push(newObj);
    localStorage.setItem('saved_quizzes', JSON.stringify(quizzes));
    renderQuizzes();
    event.target.reset();
    alert("پرسیارا کویزی ب سەرکەفتن هاتە زێدەکرن!");
}