// ========== 博客文章数据 ==========
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

// ========== 动态渲染博客列表 ==========
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

// ========== 页面加载完成后执行 ==========
document.addEventListener('DOMContentLoaded', () => {
    renderBlogList();
});

// ========== 导航高亮（滚动监听） ==========
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--primary)';
        }
    });
});
