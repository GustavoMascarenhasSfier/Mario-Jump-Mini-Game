const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const botao = document.querySelector('#meuBotao');

let score = 0;
const scoreElement = document.querySelector('#pontuacao');

// Nova variável para controlar a pontuação de cada cano
let hasScored = false;

// A sua função jump agora recebe um parâmetro 'event'
const jump = (event) => {
    // Verifique se a tecla pressionada é a que você quer
    // A string para a barra de espaço é ' ' (apenas um espaço)
    if (event.key === ' ' || event.key === 'ArrowUp') {
        // Verificação para evitar pulos no ar, quando o mario não estiver pulando será permitido que ele inicie um novo pulo
        if (!mario.classList.contains('jump')) {
            mario.classList.add('jump');
            setTimeout(() => {
                mario.classList.remove('jump');
            }, 500);
        }
    }
};

let loop;

function gameLoop() {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Lógica de colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Para animações
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        clouds.style.animation = 'none';
        clouds.style.left = `${clouds.offsetLeft}px`;

        // Game Over
        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        document.querySelector('.game-over').style.display = 'block';
        botao.style.display = 'block';
        clearInterval(loop);

    } else {
        // Lógica de Pontuação
        // Se a pontuação ainda não foi contada para este cano...
        if (pipePosition <= 50 && !hasScored) {
            score++;
            scoreElement.textContent = score;
            hasScored = true; // Define a bandeira como verdadeira para evitar contagem dupla
        }

        // Reseta a bandeira quando o cano reaparece do lado direito
        if (pipePosition > 120) {
            hasScored = false;
        }
    }
}

function reiniciarJogo() {
    // Esconde game-over
    document.querySelector('.game-over').style.display = 'none';
    botao.style.display = 'none';

    // Reset Mario
    mario.src = 'img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px';
    mario.style.animation = '';

    // Reset Pipe
    pipe.style.left = '';
    pipe.style.animation = '';

    // Reset Clouds
    clouds.style.left = '';
    clouds.style.animation = '';

    // Reseta a pontuação e a bandeira
    score = 0;
    scoreElement.textContent = score;
    hasScored = false;

    // Reinicia o loop
    loop = setInterval(gameLoop, 10);
}

// Eventos
document.addEventListener('keydown', jump);
botao.addEventListener('click', reiniciarJogo);

// Inicia o loop
loop = setInterval(gameLoop, 10);