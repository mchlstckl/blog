"use strict";

// -------------------------------------------------------------------------

var Game = {
    delay: 17,					// around 60 fps -> 1000ms / 60 = 16.67
    players: [],
    bricks: [],
    balls: [],
    score: 0,
    ctx: null,					// 2D canvas context
    screen: null				// canvas element
};

// -------------------------------------------------------------------------

function Box(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
}

Box.prototype.draw = function (ctx) {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
};
Box.prototype.top = function () {
    return this.y;
};
Box.prototype.bottom = function () {
    return this.y + this.h;
};
Box.prototype.left = function () {
    return this.x;
};
Box.prototype.right = function () {
    return this.x + this.w;
};

// -------------------------------------------------------------------------

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
}

Circle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.fillStyle = this.c;
    ctx.fill();
};
Circle.prototype.top = function () {
    return this.y - this.r;
};
Circle.prototype.bottom = function () {
    return this.y + this.r;
};
Circle.prototype.left = function () {
    return this.x - this.r;
};
Circle.prototype.right = function () {
    return this.x + this.r;
};

// -------------------------------------------------------------------------

function Ball(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = 10;
    this.c = '#0F0';
}

Ball.prototype = new Circle;
Ball.prototype.move = function (dt) {
    this.x = this.x + this.dx * dt;
    this.y = this.y + this.dy * dt;
};

// -------------------------------------------------------------------------

function Brick(x, y, n) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 10;
    this.c = '#F00';
    this.n = n;
}

Brick.prototype = new Box;

// -------------------------------------------------------------------------

function Player(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0.5;
    this.dir = 0;	// direction: -1 = left, 0 = stay, 1 = right
    this.w = 200;
    this.h = 5;
    this.c = '#00F';
}

Player.prototype = new Box;
Player.prototype.move = function (dt) {
    if (this.dir == -1 && 0 < this.left() ||
        this.dir == 1 && this.right() < Game.screen.width) {
        this.x = this.x + this.dir * this.dx * dt;
    }
};

// -------------------------------------------------------------------------

function elm(id) {
    return document.getElementById(id);
}

function getScreen() {
    var s = elm('screen');
    s.vmiddle = s.height / 2;
    s.hmiddle = s.width / 2;
    return s;
}

function getContext() {
    return getScreen().getContext('2d');
}

// -------------------------------------------------------------------------

function Clock() {
    this.tic = new Date().getTime();
}

Clock.start = function() { 
    return new Clock(); 
};

Clock.prototype.elapsedTime = function () { 
    return new Date().getTime() - this.tic; 
};

// -------------------------------------------------------------------------

var Events = {
    init: function () {
        window.addEventListener('keydown', Events.onKeyDownEvent, true);
    },
    onKeyDownEvent: function (e) {
        switch (e.keyCode) {
            case 37:	// left arrow
                Game.players[0].dir = -1;
                break;
            case 39:	// right arrow
                Game.players[0].dir = 1;
                break;
            case 38:    // up arrow
            case 40:    // down arrow
                Game.players[0].dir = 0;
                break;
        }
    }
};

// -------------------------------------------------------------------------

function step(clock) {

    var ctx = Game.ctx;
    var screen = Game.screen;
    var dt = clock.elapsedTime();
    var deadBalls = [];
    var deadBricks = [];

    // clear scene
    ctx.clearRect(0, 0, screen.width, screen.height); 

    Game.balls.forEach(function (ball) {
        ball.move(dt);
    });

    Game.players.forEach(function (player) {
        player.move(dt);
    });
	
    // check for collisions
    var numBalls = Game.balls.length;
    for (var i = 0; i < numBalls; i++) {
        var ball = Game.balls[i];
    
        // left and right walls
        if (ball.left() <= 0 || screen.width <= ball.right()) {
            ball.move(-dt);
            ball.dx = -ball.dx;
            ball.move(dt);
        }

        // top wall
        if (ball.top() <= 0) {
            ball.move(-dt);
            ball.dy = -ball.dy;
            ball.move(dt);
        }

        // bottom
        if (screen.height <= ball.top() + 5) {
            deadBalls.push(i);
        }

        // players
        Game.players.forEach(function (player) {
            if (player.y <= ball.bottom()) 
                if (player.left() <= ball.x && ball.x <= player.right()) {
                    ball.move(-dt);
                    ball.dy = -ball.dy;
                    ball.move(dt);
                }
        });

        // bricks
        var numBricks = Game.bricks.length;
        for (var j = 0; j < numBricks; j++) {
            var brick = Game.bricks[j];
        
            // from below or above
            if (brick.left() <= ball.x && ball.x <= brick.right())
                if (brick.top() <= ball.top() && ball.top() <= brick.bottom() ||
                    brick.top() <= ball.bottom() && ball.bottom() <= brick.bottom()) {
                    ball.move(-dt);
                    ball.dy = -ball.dy;
                    ball.move(dt);
                    Game.score += brick.n * 100;
                    brick.n -= 1;
                }
			
            // from right or left
            if (brick.top() <= ball.y && ball.y <= brick.bottom())
                if (brick.left() <= ball.left() && ball.left() <= brick.right() ||
                    brick.left() <= ball.right() && ball.right() <= brick.right()) {
                    ball.move(-dt);
                    ball.dx = -ball.dx;
                    ball.move(dt);
                    Game.score += brick.n * 100;
                    brick.n -= 1;
                }

            if (brick.n <= 0) {
                deadBricks.push(j);
            }
        }
    }

    deadBalls.forEach(function (ball) {
        Game.balls.splice(ball, 1);
    });

    deadBricks.forEach(function (brick) {
        Game.bricks.splice(brick, 1);
    });

    // render scene
	
    Game.bricks.forEach(function (brick) {
        brick.draw(ctx);
    });

    Game.balls.forEach(function (ball) {
        ball.draw(ctx);
    });

    Game.players.forEach(function (player) {
        player.draw(ctx);
    });

    // game state
    elm('state').innerText = 'Score: ' + Game.score;

    var wait = Math.max(0, Game.delay - clock.elapsedTime());

    var newClock = Clock.start();

    setTimeout(function () {
        step(newClock);
    }, wait);
}

function startGame() {

    Game.ctx = getContext();
    Game.screen = getScreen();

    var screen = Game.screen;

    Events.init();

    var p = new Player(0, 0);
    p.x = Game.screen.hmiddle - p.w / 2;
    p.y = Game.screen.height - p.h - 5;
    Game.players.push(p);
	
    for (var i = 10; i < screen.vmiddle; i += 30) 
        for (var j = 10; j < screen.width - 60; j += 60)
            Game.bricks.push(new Brick(j, i, 1));
	
    var ball = new Ball(10, Game.screen.vmiddle, 0.3, 0.3);

    Game.balls.push(ball);

    step(new Clock());
}

var loader = setInterval(function() {
    if (elm('screen')) {
        clearInterval(loader);
        startGame();
    }
}, 300);






