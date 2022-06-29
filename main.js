window.onload = function () {
  var stage = document.getElementById("stage");
  var ctx = stage.getContext("2d");
  var score = 0;
  var highScore = 0;

  addEventListener("keydown", keyPush);

  setInterval(game, 60);

  const velocity = 1;

  var vx = (vy = 0);
  var px = 5; //position snake x
  var py = 5; //position snake y
  var tp = 16; // fruis snake width and height
  var qp = ctx.canvas.height / tp - 1;
  var ax = (ay = 15); //position fruits

  var trail = [];
  var tail = 5;
  var gameStarted = false;
  var gameStart = true;
  function game() {
    if (gameStart) {
      px += vx;
      py += vy;

      const reduceCanvas = () => {
        if (ctx.canvas.height > 300 && ctx.canvas.width > 300) {
          ctx.canvas.height = ctx.canvas.height - 100;
          ctx.canvas.width = ctx.canvas.width - 100;
          qp = Math.floor(ctx.canvas.height / tp);
            ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
        }
      };

      if (px < 0) {
        //left
        py = py - 1;
        vx = velocity;
        vy = 0;

        reduceCanvas();
      }
      if (px > qp - 1) {
        //right

        py = py - 1;
        px = px - 6;
        vx = -velocity;
        vy = 0;
        reduceCanvas();
      }
      if (py < 0) {
        //up
        px = px - 1;
        vx = 0;
        vy = velocity;
        reduceCanvas();
      }
      if (py > qp - 1) {
        //down
        px = px - 1;
        py = py - 6;
        vx = 0;
        vy = -velocity;
        reduceCanvas();
      }

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, stage.width, stage.height);

      ctx.fillStyle = "blue";
      ctx.fillRect(ax * tp, ay * tp, tp, tp);

      ctx.fillStyle = "white";
      for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
        if (trail[i].x == px && trail[i].y == py) {
          vx = vy = 0;
          tail = 5;
          if (score > highScore) {
            highScore = score;
          }
          score = 0;
          if (gameStarted) {
            qp = ctx.canvas.height / tp - 1;
            ctx.canvas.height = 800;
            ctx.canvas.width = 800;
            gameStart = false;
          }
        }
      }
      if (score > highScore) {
        ctx.fillStyle = "yellow";
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("Score: " + score, 15, 15);
      } else {
        ctx.fillStyle = "white";
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("Score: " + score, 15, 15);
      }

      trail.push({ x: px, y: py });
      while (trail.length > tail) {
        trail.shift();
      }
      if (ax == px && ay == py) {
        tail++;
        score++;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
      }
    } else {
      ctx.fillStyle = "Black";
      ctx.font = "15px Comic Sans MS";
      ctx.fillText("Press Enter to Restart", 50, 50);
    }
  }
  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // left
        vx = -velocity;
        vy = 0;
        gameStarted = true;
        break;
      case 38: // up
        vx = 0;
        vy = -velocity;
        gameStarted = true;
        break;
      case 39: // right
        vx = velocity;
        vy = 0;
        gameStarted = true;
        break;
      case 40: // down
        vx = 0;
        vy = velocity;
        gameStarted = true;
        break;
      case 13: // enter
        gameStart = true;
        gameStarted = false;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
        break;
      default:
        break;
    }
  }
};
