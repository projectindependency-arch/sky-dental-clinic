document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);

    /* --- GSAP ANIMATIONS --- */
    // Hero Entrance
    const tl = gsap.timeline();
    tl.from(".hero-title", { opacity: 0, y: 30, duration: 1, ease: "power3.out" })
      .from(".hero-description", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
      .from(".hero-actions", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
      .from(".doc-card", { opacity: 0, y: 20, stagger: 0.2, duration: 0.8 }, "-=0.4");

    // Background Morph (Dark to Light)
    gsap.to("body", {
        backgroundColor: "#F4F6F6",
        color: "#1A2E35",
        scrollTrigger: {
            trigger: "#transparency",
            start: "top 70%",
            end: "top 30%",
            scrub: true,
        }
    });

    // Dark Text Fix for Section Header on light bg
    gsap.to(".section-title, .section-subtitle", {
        color: "#1A2E35",
        scrollTrigger: {
            trigger: "#transparency",
            start: "top 70%",
            end: "top 30%",
            scrub: true,
        }
    });

    /* --- QUIZ LOGIC --- */
    const quizData = [
        { q: "What is your primary goal for visiting Sky Dental?", opts: ["Straightening & Gaps", "Whitening & Shine", "Fixing a Broken/Painful Tooth", "Routine Cleaning"] },
        { q: "Do you experience fear or anxiety about dental procedures?", opts: ["No anxiety at all", "Slight nervousness", "Severe fear/Painless options needed"] },
        { q: "Are you currently facing tooth sensitivity?", opts: ["No issues", "Mild when drinking cold liquids", "Constant sharp pain"] }
    ];

    let currentStep = 0;
    const quizContainer = document.getElementById("quiz-container");
    const quizStepText = document.getElementById("quiz-step");
    const quizResult = document.getElementById("quiz-result");

    function renderQuiz() {
        if (currentStep < quizData.length) {
            quizContainer.innerHTML = `
                <h3 class="quiz-question">${quizData[currentStep].q}</h3>
                ${quizData[currentStep].opts.map(opt => `<button class="btn-quiz-opt">${opt}</button>`).join('')}
            `;
            quizStepText.textContent = `Step ${currentStep + 1} of 3`;
            
            document.querySelectorAll(".btn-quiz-opt").forEach(btn => {
                btn.addEventListener("click", () => {
                    currentStep++;
                    renderQuiz();
                });
            });
        } else {
            quizContainer.classList.add("hidden");
            quizStepText.textContent = "Complete";
            quizResult.classList.remove("hidden");
        }
    }

    document.getElementById("btn-reset-quiz").addEventListener("click", () => {
        currentStep = 0;
        quizResult.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        renderQuiz();
    });

    renderQuiz(); // Init Quiz

    /* --- PRICING CALCULATOR LOGIC --- */
    const procedures = [
        { id: "align", name: "SkyAlign Clear Aligners", price: 120000, desc: "Invisible custom 3D alignment trays." },
        { id: "crown", name: "Bespoke Zirconia Crown", price: 18000, desc: "Metal-free, durable ceramic tooth cap." },
        { id: "endo", name: "Painless Root Canal", price: 6500, desc: "Advanced rotary endodontics (MDS)." },
        { id: "scale", name: "Signature Scaling & Polish", price: 2500, desc: "Deep ultrasonic clean & mineral wash." }
    ];

    let selectedProcs = [];
    let emiMonths = 12;
    const procList = document.getElementById("procedures-list");
    const emiCheckbox = document.getElementById("emi-checkbox");
    const emiOptionsDiv = document.getElementById("emi-options");

    function renderProcedures() {
        procList.innerHTML = procedures.map(p => `
            <div class="procedure-item" data-id="${p.id}" data-price="${p.price}">
                <div>
                    <div class="proc-name">${p.name}</div>
                    <div class="proc-desc">${p.desc}</div>
                </div>
                <div class="proc-price">₹${p.price.toLocaleString('en-IN')}</div>
            </div>
        `).join('');

        document.querySelectorAll(".procedure-item").forEach(item => {
            item.addEventListener("click", function() {
                this.classList.toggle("selected");
                const id = this.getAttribute("data-id");
                if (selectedProcs.includes(id)) {
                    selectedProcs = selectedProcs.filter(i => i !== id);
                } else {
                    selectedProcs.push(id);
                }
                calcTotal();
            });
        });
    }

    function calcTotal() {
        let total = 0;
        selectedProcs.forEach(id => {
            total += procedures.find(p => p.id === id).price;
        });

        document.getElementById("calc-total").textContent = `₹${total.toLocaleString('en-IN')}`;

        if (emiCheckbox.checked && total > 0) {
            emiOptionsDiv.style.display = "flex";
            const monthly = Math.round(total / emiMonths);
            document.getElementById("calc-monthly").textContent = `₹${monthly.toLocaleString('en-IN')}`;
        } else {
            emiOptionsDiv.style.display = "none";
            document.getElementById("calc-monthly").textContent = "₹0";
        }
    }

    emiCheckbox.addEventListener("change", calcTotal);

    document.querySelectorAll(".btn-tenure").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".btn-tenure").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            emiMonths = parseInt(this.getAttribute("data-months"));
            calcTotal();
        });
    });

    renderProcedures(); // Init Calc

    /* --- CONCIERGE FORM LOGIC --- */
    document.getElementById("booking-form").addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("booking-form").classList.add("hidden");
        document.getElementById("booking-success").classList.remove("hidden");
    });
});