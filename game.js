// ===============================
// BLOCK NOVA - PARTE 1
// ===============================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GRID = 8;
const CELL = 60;

const COLORS = [
    "#4CC9F0",
    "#F72585",
    "#FFD60A",
    "#06D6A0",
    "#9D4EDD",
    "#FF7F50"
];

let score = 0;

const board = [];

for (let y = 0; y < GRID; y++) {
    board[y] = [];

    for (let x = 0; x < GRID; x++) {
        board[y][x] = 0;
    }
}

const SHAPES = [

    [[1]],

    [[1,1]],

    [
        [1],
        [1]
    ],

    [
        [1,1],
        [1,1]
    ],

    [
        [1,1,1]
    ],

    [
        [1],
        [1],
        [1]
    ],

    [
        [1,0],
        [1,1]
    ],

    [
        [0,1],
        [1,1]
    ]

];

let pieces = [];

function randomColor(){
    return COLORS[Math.floor(Math.random()*COLORS.length)];
}

function randomShape(){

    return JSON.parse(
        JSON.stringify(
            SHAPES[Math.floor(Math.random()*SHAPES.length)]
        )
    );

}

function newPiece(){

    return{

        shape:randomShape(),

        color:randomColor()

    };

}

function generatePieces(){

    pieces=[];

    pieces.push(newPiece());
    pieces.push(newPiece());
    pieces.push(newPiece());

}

function drawGrid(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let y=0;y<GRID;y++){

        for(let x=0;x<GRID;x++){

            ctx.fillStyle="#222";

            ctx.fillRect(
                x*CELL,
                y*CELL,
                CELL,
                CELL
            );

            ctx.strokeStyle="#333";

            ctx.strokeRect(
                x*CELL,
                y*CELL,
                CELL,
                CELL
            );

            if(board[y][x]){

                ctx.fillStyle=board[y][x];

                ctx.fillRect(
                    x*CELL+4,
                    y*CELL+4,
                    CELL-8,
                    CELL-8
                );

            }

        }

    }

}

function drawMiniPieces(){

    for(let i=0;i<3;i++){

        const div=document.getElementById("piece"+(i+1));

        div.innerHTML="";

        const p=pieces[i];

        p.shape.forEach(row=>{

            const r=document.createElement("div");

            r.style.display="flex";

            row.forEach(cell=>{

                const b=document.createElement("div");

                b.style.width="22px";
                b.style.height="22px";
                b.style.margin="2px";

                if(cell){

                    b.style.background=p.color;
                    b.style.borderRadius="5px";

                }

                r.appendChild(b);

            });

            div.appendChild(r);

        });

    }

}

function update(){

    document.getElementById("points").textContent=score;

    drawGrid();

    drawMiniPieces();

}

generatePieces();

update();

document.getElementById("playBtn").onclick=()=>{

    document.getElementById("menu").style.display="none";

};
// ===============================
// BLOCK NOVA - PARTE 2
// ===============================

let selectedPiece = null;

function selectPiece(index){

    if(index < 0 || index >= pieces.length) return;

    selectedPiece = index;

    document.querySelectorAll(".piece").forEach((el,i)=>{

        if(i===index){

            el.style.transform="scale(1.15)";
            el.style.border="3px solid white";

        }else{

            el.style.transform="scale(1)";
            el.style.border="none";

        }

    });

}

document.getElementById("piece1").onclick=()=>selectPiece(0);
document.getElementById("piece2").onclick=()=>selectPiece(1);
document.getElementById("piece3").onclick=()=>selectPiece(2);

canvas.addEventListener("click",function(e){

    if(selectedPiece===null) return;

    const rect=canvas.getBoundingClientRect();

    const x=Math.floor((e.clientX-rect.left)/CELL);
    const y=Math.floor((e.clientY-rect.top)/CELL);

    const piece=pieces[selectedPiece];

    let canPlace=true;

    for(let py=0;py<piece.shape.length;py++){

        for(let px=0;px<piece.shape[py].length;px++){

            if(piece.shape[py][px]){

                if(
                    y+py>=GRID ||
                    x+px>=GRID ||
                    board[y+py][x+px]!=0
                ){

                    canPlace=false;

                }

            }

        }

    }

    if(!canPlace){

        alert("Não cabe aqui!");

        return;

    }

    for(let py=0;py<piece.shape.length;py++){

        for(let px=0;px<piece.shape[py].length;px++){

            if(piece.shape[py][px]){

                board[y+py][x+px]=piece.color;

            }

        }

    }

    score+=10;

    pieces[selectedPiece]=newPiece();

    selectedPiece=null;

    document.querySelectorAll(".piece").forEach(el=>{

        el.style.transform="scale(1)";
        el.style.border="none";

    });
clearLines();
checkGameOver();
    update();

});
// ===============================
// BLOCK NOVA - PARTE 3
// Limpar linhas e colunas
// ===============================

function clearLines(){

    let cleared = 0;

    // Linhas
    for(let y = 0; y < GRID; y++){

        let full = true;

        for(let x = 0; x < GRID; x++){

            if(board[y][x] == 0){
                full = false;
                break;
            }

        }

        if(full){

            cleared++;

            for(let x = 0; x < GRID; x++){

                board[y][x] = 0;

            }

        }

    }

    // Colunas
    for(let x = 0; x < GRID; x++){

        let full = true;

        for(let y = 0; y < GRID; y++){

            if(board[y][x] == 0){
                full = false;
                break;
            }

        }

        if(full){

            cleared++;

            for(let y = 0; y < GRID; y++){

                board[y][x] = 0;

            }

        }

    }

    if(cleared > 0){

        score += cleared * 100;

    }

}

function canPlace(piece){

    for(let y=0;y<GRID;y++){

        for(let x=0;x<GRID;x++){

            let ok = true;

            for(let py=0;py<piece.shape.length;py++){

                for(let px=0;px<piece.shape[py].length;px++){

                    if(piece.shape[py][px]){

                        if(
                            y+py>=GRID ||
                            x+px>=GRID ||
                            board[y+py][x+px]!=0
                        ){

                            ok = false;

                        }

                    }

                }

            }

            if(ok) return true;

        }

    }

    return false;

}

function checkGameOver(){

    for(let p of pieces){

        if(canPlace(p)){

            return;

        }

    }

    setTimeout(()=>{

        alert("GAME OVER!\nPontuação: " + score);

        score = 0;

        for(let y=0;y<GRID;y++){

            for(let x=0;x<GRID;x++){

                board[y][x]=0;

            }

        }

        generatePieces();
        
        update();

    };

}
100);

}
// ===== GAME STATE FINAL =====
let gameRunning = true;
let score = 0;
let blocks = [];

// ===== RESET GAME =====
function resetGame() {
    score = 0;
    gameRunning = true;

    document.getElementById("score").innerText = score;

    // limpar blocos antigos
    blocks.forEach(b => {
        if (b.element) b.element.remove();
    });

    blocks = [];

    startSpawning();
}

// ===== SPAWN DE BLOCOS (CORRIGIDO) =====
function spawnBlock() {
    if (!gameRunning) return;

    const block = document.createElement("div");
    block.classList.add("block");

    block.style.left = Math.floor(Math.random() * 90) + "%";
    block.style.top = "0px";

    document.body.appendChild(block);

    let fallSpeed = 2 + Math.random() * 3;

    let interval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(interval);
            block.remove();
            return;
        }

        let top = parseInt(block.style.top);
        top += fallSpeed;
        block.style.top = top + "px";

        // se cair fora da tela = perde ponto ou vida
        if (top > window.innerHeight) {
            block.remove();
            clearInterval(interval);
        }
    }, 16);

    // clique no bloco
    block.onclick = () => {
        score += 1;
        document.getElementById("score").innerText = score;

        block.remove();
        clearInterval(interval);
    };

    blocks.push({ element: block, interval });
}

// ===== LOOP DE SPAWN =====
function startSpawning() {
    setInterval(() => {
        if (gameRunning) {
            spawnBlock();
        }
    }, 800);
}

// ===== GAME OVER =====
function gameOver() {
    gameRunning = false;
    alert("Game Over! Score: " + score);
}

// iniciar jogo
startSpawning();
