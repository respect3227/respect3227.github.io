/* ========== 粒子背景 ========== */
(function() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * h;
        }
        reset() {
            this.x = Math.random() * w;
            this.y = -10;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.y += this.speed;
            if (this.y > h + 10) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(79, 140, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 连接线
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.strokeStyle = `rgba(79, 140, 255, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
})();

/* ========== 打字机效果 ========== */
(function() {
    const texts = [
        '实施工程师 / 运维工程师',
        '会开发 · 更懂运维',
        '动手即交付'
    ];
    const el = document.querySelector('.typing-text');
    if (!el) return;
    let textIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const current = texts[textIdx];
        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }
        let speed = isDeleting ? 40 : 100;
        if (!isDeleting && charIdx === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            textIdx = (textIdx + 1) % texts.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 1000);
})();

/* ========== 博客文章数据 ========== */
const blogPosts = [
    {
        title: 'Linux 基础命令速查手册',
        date: '2026-07-20',
        desc: '实施工程师必备的 Linux 命令大全，涵盖文件操作、系统管理、权限配置、网络诊断等常用命令。',
        tag: 'Linux',
        link: 'blog/01-linux-basics.html'
    },
    {
        title: 'Docker 容器化部署入门实战',
        date: '2026-07-25',
        desc: '从零开始学习 Docker，理解镜像、容器、Dockerfile、docker-compose 等核心概念，附完整部署示例。',
        tag: 'Docker',
        link: 'blog/02-docker-guide.html'
    },
    {
        title: 'Nginx 反向代理与静态站点配置',
        date: '2026-07-28',
        desc: 'Nginx 常用配置详解：静态文件托管、反向代理、负载均衡、HTTPS 证书配置。',
        tag: 'Nginx',
        link: 'blog/03-nginx-config.html'
    },
    {
        title: 'MySQL 数据备份与迁移实操',
        date: '2026-07-30',
        desc: 'mysqldump 备份策略、定时备份脚本、跨服务器数据迁移、常见问题处理。',
        tag: 'MySQL',
        link: 'blog/04-mysql-ops.html'
    },
    {
        title: 'Shell 自动化脚本最佳实践',
        date: '2026-08-02',
        desc: '从零写实用 Shell 脚本：服务器巡检、日志清理、服务监控、自动备份等场景。',
        tag: 'Shell',
        link: 'blog/05-shell-scripts.html'
    },
    {
        title: '常见网络故障排查思路与方法',
        date: '2026-08-05',
        desc: '面向实施工程师的网络排障指南：DNS、端口、防火墙、IP冲突等 10+ 种常见故障解决方案。',
        tag: '网络',
        link: 'blog/06-network-troubleshoot.html'
    }
];

/* ========== 渲染博客列表 ========== */
function renderBlogList() {
    const container = document.getElementById('blog-list');
    if (!container) return;
    container.innerHTML = blogPosts.map(post => `
        <a href="${post.link}" class="blog-card">
            <h3>${post.title}</h3>
            <div class="blog-date">${post.date}</div>
            <div class="blog-desc">${post.desc}</div>
            <span class="blog-tag">${post.tag}</span>
        </a>
    `).join('');
}

/* ========== 数字滚动动画 ========== */
function animateNumbers() {
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.textContent.includes('%') ? '%' : el.textContent.includes('+') ? '+' : '';
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

/* ========== 滚动渐入动画 ========== */
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 触发数字动画
                if (entry.target.querySelector('.stat-num[data-count]') && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = '1';
                    entry.target.querySelectorAll('.stat-num[data-count]').forEach(el => {
                        const target = parseInt(el.getAttribute('data-count'));
                        const suffix = el.textContent.includes('%') ? '%' : el.textContent.includes('+') ? '+' : '';
                        const duration = 1500;
                        const start = performance.now();
                        function update(now) {
                            const progress = Math.min((now - start) / duration, 1);
                            const eased = 1 - Math.pow(2, -10 * progress);
                            el.textContent = Math.floor(eased * target) + suffix;
                            if (progress < 1) requestAnimationFrame(update);
                        }
                        requestAnimationFrame(update);
                    });
                }
            }
        });
    }, { threshold: 0.15 });

    // 监听所有需要动画的元素
    document.querySelectorAll('.section, .project-card, .skill-card, .blog-card, .contact-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 专门监听 about-stats
    const stats = document.querySelector('.about-stats');
    if (stats) { stats.classList.add('fade-in'); observer.observe(stats); }
}

/* ========== 导航栏滚动效果 ========== */
function setupNavScroll() {
    const nav = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // 导航背景
        if (window.scrollY > 60) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        // 高亮当前 section
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });
}

/* ========== 移动端菜单 ========== */
function setupMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle) return;
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

/* ========== 初始化 ========== */
document.addEventListener('DOMContentLoaded', () => {
    renderBlogList();
    setupScrollReveal();
    setupNavScroll();
    setupMobileMenu();
});
