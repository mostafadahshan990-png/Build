document.addEventListener('DOMContentLoaded', function() {
    
    // === Preloader (شاشة التحميل) ===
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    });

    // === قائمة الجوال (الهامبرغر) ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // إغلاق القائمة عند الضغط على أي رابط
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // === تأثير ظهور الشريط عند التمرير ===
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 20px';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.padding = '0 20px';
            navbar.style.background = '#fff';
        }

        // زر الترميز للأعلى
        const scrollBtn = document.getElementById('scrollToTop');
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
        // تشغيل العدادات عند الوصول لها
        const statsSection = document.querySelector('.stats');
        const statNumbers = document.querySelectorAll('.stat-item h3');
        const statsTop = statsSection.offsetTop;

        if (window.scrollY + window.innerHeight > statsTop + 100 && !statsSection.classList.contains('counted')) {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                countUp(stat, target);
            });
            statsSection.classList.add('counted');
        }
    });

    // === وظيفة العداد المتزايد ===
    function countUp(element, target) {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // === زر الترميز للأعلى ===
    const scrollBtn = document.getElementById('scrollToTop');
    scrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // === معالجة نموذج الاتصال ===
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'جاري الإرسال...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'تم الإرسال بنجاح!';
            btn.style.backgroundColor = '#27ae60';
            btn.style.opacity = '1';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.opacity = '1';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);

        console.log('بيانات النموذج:', data);
    });

    // === تمييز الروابط النشطة أثناء التمرير ===
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    // === تأثير ظهور العناصر عند التمرير (Scroll Reveal) ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .service-card, .project-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // === تأثير تحميل الصور تدريجياً ===
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

});