document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) el.classList.add('active');
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizBtns = document.querySelectorAll('.quiz-btn');
    const resultContent = document.getElementById('result-content');
    const restartBtn = document.getElementById('quiz-restart');
    
    let quizData = { flavor: '', dish: '' };

    quizBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const step = e.target.closest('.quiz-step');
            const value = e.currentTarget.getAttribute('data-value');
            if (step.id === 'quiz-step-1') {
                quizData.flavor = value;
                showStep('quiz-step-2');
            } else if (step.id === 'quiz-step-2') {
                quizData.dish = value;
                showResult();
            }
        });
    });

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            quizData = { flavor: '', dish: '' };
            showStep('quiz-step-1');
        });
    }

    function showStep(stepId) {
        quizSteps.forEach(step => {
            step.classList.remove('active');
            if (step.id === stepId) step.classList.add('active');
        });
    }

    function showResult() {
        let recommendation = '', description = '';
        if (quizData.flavor === 'sweet') {
            recommendation = 'Паростки Гороху';
            description = 'Мають приємний солодкуватий присмак. Ідеально підійдуть для вашої мети, додадуть страві соковитості та свіжого весняного аромату.';
        } else if (quizData.flavor === 'spicy') {
            recommendation = 'Редис або Мангольд';
            description = 'Ці види мають яскраво виражений пікантний смак. Вони зроблять вашу страву особливою та додадуть їй ресторанного вигляду.';
        } else {
            recommendation = 'Соняшник або Люцерна';
            description = 'Нейтральний горіховий або свіжий смак. Чудова база, яка не перебиває основні інгредієнти, але дає максимум вітамінів та приємний хрускіт.';
        }
        resultContent.innerHTML = `<h4>${recommendation}</h4><p>${description}</p>`;
        showStep('quiz-result');
    }
});