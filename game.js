
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const cols = 8;
const rows = 8;
const size = 60;

let score = 0;
const scoreText = document.getElementById("points");

const board = [];

for (let y = 0; y < rows; y++) {
    board[y] = [];
    for (let x = 0; x < cols; x++) {
        board[y][x] = 0;
    }
}

const colors = [
    "#ff4d4d",
    "#4da6ff",
    "#2ecc71",
    "#f1c40f",
    "#9b59b6",
    "#ff7f50"
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            ctx.strokeStyle = "#444";
            ctx.strokeRect(x * size, y * size, size, size);

            if (board[y][x] !== 0) {
                ctx.fillStyle = board[y][x];
                ctx.fillRect(
                    x * size + 4,
                    y * size + 4,
                    size - 8,
                    size - 8
                );
            }
        }
    }
}

canvas.addEventListener("click", function(e) {

    const rect = canvas.getBoundingClientRect();

    const x = Math.floor((e.clientX - rect.left) / size);
    const y = Math.floor((e.clientY - rect.top) / size);

    if (board[y][x] === 0) {
        board[y][x] = colors[Math.floor(Math.random() * colors.length)];
        score++;
        scoreText.textContent = score;
    }

    draw();
});

draw();
