// JavaScript 互動功能

// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

// 初始化所有功能
function initializeAll() {
    initTestimonialCarousel();
    initFAQAccordion();
    initFloatingCTA();
    initCountdownTimer();
    initFormHandlers();
    initSmoothScrolling();
}

// 見證輪播功能
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function initTestimonialCarousel() {
    if (slides.length === 0) return;

    // 自動播放
    setInterval(nextSlide, 5000);

    // 確保第一張幻燈片顯示
    showSlide(0);
}

function showSlide(index) {
    if (slides.length === 0) return;

    // 隱藏所有幻燈片
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // 顯示選定的幻燈片
    slides[index].classList.add('active');
    if (dots[index]) {
        dots[index].classList.add('active');
    }

    currentSlideIndex = index;
}

function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function currentSlide(index) {
    showSlide(index - 1); // 因為 HTML 中的索引從 1 開始
}

// FAQ 手風琴功能
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    console.log('Found FAQ questions:', faqQuestions.length);

    faqQuestions.forEach((question, index) => {
        console.log('Adding event listener to FAQ:', index);
        question.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('FAQ question clicked:', index);
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(questionElement) {
    const faqItem = questionElement.parentElement;
    const isActive = faqItem.classList.contains('active');

    // 關閉所有其他 FAQ 項目
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // 如果當前項目不是活動狀態，則開啟它
    if (!isActive) {
        faqItem.classList.add('active');
    }

    // 添加調試信息
    console.log('FAQ clicked:', faqItem, 'Active:', !isActive);
}

// 浮動 CTA 按鈕功能
function initFloatingCTA() {
    const floatingCTA = document.getElementById('floating-cta');
    const heroSection = document.getElementById('hero');

    if (!floatingCTA || !heroSection) return;

    window.addEventListener('scroll', function() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition > heroBottom) {
            floatingCTA.classList.remove('hidden');
        } else {
            floatingCTA.classList.add('hidden');
        }
    });
}

// 倒數計時器功能
function initCountdownTimer() {
    const targetDate = new Date('2025-12-31T23:59:59').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            updateTimerDisplay('days', days);
            updateTimerDisplay('hours', hours);
            updateTimerDisplay('minutes', minutes);
            updateTimerDisplay('seconds', seconds);
        } else {
            // 倒數計時結束
            updateTimerDisplay('days', 0);
            updateTimerDisplay('hours', 0);
            updateTimerDisplay('minutes', 0);
            updateTimerDisplay('seconds', 0);
        }
    }

    function updateTimerDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value.toString().padStart(2, '0');
        }
    }

    // 立即更新一次
    updateTimer();

    // 每秒更新一次
    setInterval(updateTimer, 1000);
}

// 表單處理功能
function initFormHandlers() {
    // 免費檢測表單
    const freeOfferForm = document.getElementById('freeOfferForm');
    if (freeOfferForm) {
        freeOfferForm.addEventListener('submit', handleFreeOfferSubmit);
    }

    // 聯絡表單
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleFreeOfferSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        experience: formData.get('experience'),
        problems: formData.get('problems'),
        schedule: formData.get('schedule')
    };

    // 基本驗證
    if (!data.name || !data.phone || !data.email) {
        alert('請填寫所有必填欄位（姓名、手機、Email）');
        return;
    }

    if (!validateEmail(data.email)) {
        alert('請輸入有效的 Email 地址');
        return;
    }

    if (!validatePhone(data.phone)) {
        alert('請輸入有效的手機號碼');
        return;
    }

    // 模擬提交成功
    alert('預約成功！我們會盡快與您聯繫確認時間。');

    // 重置表單
    event.target.reset();

    // 更新剩餘名額（模擬）
    updateRemainingSlots();

    // 真實專案中，這裡會送出資料到後端
    console.log('免費檢測預約資料：', data);
}

function handleContactSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        plan: formData.get('plan'),
        message: formData.get('message')
    };

    // 基本驗證
    if (!data.name || !data.phone || !data.email) {
        alert('請填寫所有必填欄位（姓名、手機、Email）');
        return;
    }

    if (!validateEmail(data.email)) {
        alert('請輸入有效的 Email 地址');
        return;
    }

    if (!validatePhone(data.phone)) {
        alert('請輸入有效的手機號碼');
        return;
    }

    // 模擬提交成功
    alert('訊息已送出！我們會盡快回覆您。');

    // 關閉 Modal
    closeContactModal();

    // 重置表單
    event.target.reset();

    // 真實專案中，這裡會送出資料到後端
    console.log('聯絡表單資料：', data);
}

// Email 驗證函數
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 手機號碼驗證函數
function validatePhone(phone) {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

// 更新剩餘名額
function updateRemainingSlots() {
    const remainingSlotsElement = document.getElementById('remainingSlots');
    const bookedSlotsElement = document.getElementById('bookedSlots');

    if (remainingSlotsElement && bookedSlotsElement) {
        let remaining = parseInt(remainingSlotsElement.textContent);
        let booked = parseInt(bookedSlotsElement.textContent);

        if (remaining > 0) {
            remaining--;
            booked++;

            remainingSlotsElement.textContent = remaining;
            bookedSlotsElement.textContent = booked;
        }
    }
}

// Modal 功能
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // 恢復滾動
    }
}

// 點擊 Modal 背景關閉
document.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
});

// ESC 鍵關閉 Modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// 平滑滾動功能
function initSmoothScrolling() {
    // 為所有內部連結添加平滑滾動
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 滾動動畫效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // 觀察所有區塊
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 在頁面載入時初始化滾動動畫
window.addEventListener('load', function() {
    initScrollAnimations();
});

// 返回頂部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 防止表單重複提交
let isSubmitting = false;

function preventDoubleSubmit(formElement) {
    if (isSubmitting) {
        return false;
    }

    isSubmitting = true;

    // 3 秒後重置提交狀態
    setTimeout(() => {
        isSubmitting = false;
    }, 3000);

    return true;
}

// 電話號碼格式化
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 4 && value.length <= 7) {
        value = value.replace(/(\d{4})(\d{0,3})/, '$1-$2');
    } else if (value.length >= 8) {
        value = value.replace(/(\d{4})(\d{3})(\d{0,3})/, '$1-$2-$3');
    }

    input.value = value;
}

// 為手機號碼輸入框添加格式化
document.addEventListener('input', function(event) {
    if (event.target.type === 'tel') {
        formatPhoneNumber(event.target);
    }
});

// 效能優化：節流函數
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 效能優化：防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 優化滾動事件
window.addEventListener('scroll', throttle(function() {
    // 這裡可以添加其他滾動相關的功能
}, 100));

// 響應式選單功能（如果需要）
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// 圖片懶載入
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 錯誤處理
window.addEventListener('error', function(event) {
    console.error('JavaScript 錯誤：', event.error);
    // 在生產環境中，可以將錯誤發送到監控服務
});

// 瀏覽器相容性檢查
function checkBrowserSupport() {
    // 檢查必要的 API 支援
    if (!window.IntersectionObserver) {
        console.warn('瀏覽器不支援 IntersectionObserver');
        // 提供替代方案或提示用戶升級瀏覽器
    }

    if (!window.Promise) {
        console.warn('瀏覽器不支援 Promise');
        // 提供 polyfill 或替代方案
    }
}

// 初始化瀏覽器相容性檢查
checkBrowserSupport();

// 導出函數供 HTML 中使用
window.scrollToSection = scrollToSection;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.toggleFAQ = toggleFAQ;
window.currentSlide = currentSlide;