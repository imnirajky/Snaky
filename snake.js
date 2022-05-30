function init() {
    canvas = document.getElementById('canvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 66;
    food = getRandomFood();
    score = document.getElementById("score");
    count = 0;
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake: function() {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                });
            }
        },
        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3);
            }
        },

        updateSnake: function() {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (food.x === headX && food.y === headY) {
                food = getRandomFood();
                count++;
                score.innerHTML = count;
            } else {
                this.cells.pop();
            }


            if (snake.direction === "right") {
                this.cells.unshift({ x: headX + 1, y: headY });
            } else if (snake.direction === "left") {
                this.cells.unshift({ x: headX - 1, y: headY });
            } else if (snake.direction === "down") {
                this.cells.unshift({ x: headX, y: headY + 1 });
            } else if (snake.direction === "up") {
                this.cells.unshift({ x: headX, y: headY - 1 });
            }

            var lastX = Math.round(W / cs);
            var lastY = Math.round(H / cs);

            if (headX < 0 || headY < 0 || headX > lastX || headY > lastY) {
                clearInterval(order);
                alert("Game Over!!!");
                return;
            }
        }
    };
    snake.createSnake();

    function keyPressed(obj) {
        if (obj.key === 'ArrowRight') {
            snake.direction = "right";
        } else if (obj.key === 'ArrowLeft') {
            snake.direction = "left";
        } else if (obj.key === 'ArrowDown') {
            snake.direction = "down";
        } else if (obj.key === 'ArrowUp') {
            snake.direction = "up";
        }
    }

    document.addEventListener("keydown", keyPressed);;
}



function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);

}

function update() {
    snake.updateSnake();
}

function gameloop() {
    draw();
    update();
}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    }

    return food;
}

init();
order = setInterval(gameloop, 100);