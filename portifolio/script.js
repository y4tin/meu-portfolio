// Scroll Reveal
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(en => { if (en.isIntersecting) en.target.classList.add('mostrar'); });
});
document.querySelectorAll('.escondido').forEach(el => observador.observe(el));

// Troca de Tema
const btnTema = document.getElementById('btn-tema');
const iconeTema = btnTema.querySelector('i');

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('tema-claro');
    const ehClaro = document.body.classList.contains('tema-claro');
    iconeTema.className = ehClaro ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    init(); // Reinicia partículas com a cor certa
});

// Canvas Background
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particulas = [];

function ajustar() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', ajustar);
ajustar();

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tam = Math.random() * 2 + 1;
        this.velX = Math.random() * 1 - 0.5;
        this.velY = Math.random() * 1 - 0.5;
        const claro = document.body.classList.contains('tema-claro');
        this.cor = claro ? `rgba(100,100,100,${Math.random()})` : `rgba(255,255,255,${Math.random()})`;
    }
    desenhar() {
        ctx.fillStyle = this.cor;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.tam, 0, Math.PI*2); ctx.fill();
    }
    update() {
        this.x += this.velX; this.y += this.velY;
        if (this.x > canvas.width || this.x < 0) this.velX *= -1;
        if (this.y > canvas.height || this.y < 0) this.velY *= -1;
    }
}

function init() {
    particulas = [];
    for(let i=0; i<100; i++) particulas.push(new Particula());
}

function animar() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particulas.forEach(p => { p.update(); p.desenhar(); });
    requestAnimationFrame(animar);
}
init(); animar();