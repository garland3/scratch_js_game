     // Get the canvas element
     const canvas = document.getElementById('canvas');

     // Set up the canvas context
     const ctx = canvas.getContext('2d');

     // Set up the game variables
     let score = 0;
     let isGameOver = false;
     let intervalId = null;
     const objectSpeed = 3;
     const objectInterval = 1000;
     let objects = [];

     // Set up the player variables
     const playerWidth = 50;
     const playerHeight = 50;
     const playerSpeed = 5;
     let playerX = (canvas.width / 2) - (playerWidth / 2);
     let playerY = canvas.height - playerHeight;

     // Draw the player
     function drawPlayer() {
             ctx.fillStyle = 'blue';
             ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
     }

     // Move the player
     function movePlayer(event) {
             if (event.key === 'ArrowLeft' && playerX > 0) {
                     playerX -= playerSpeed;
             } else if (event.key === 'ArrowRight' && playerX < canvas.width - playerWidth) {
                     playerX += playerSpeed;
             }
     }

     // Draw the objects
     function drawObjects() {
             for (let i = 0; i < objects.length; i++) {
                     ctx.fillStyle = 'red';
                     ctx.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);        
             }
     }

     // Move the objects
     function moveObjects() {
             for (let i = 0; i < objects.length; i++) {
                     objects[i].y += objectSpeed;

                     // Check if the object has hit the player
                     if (objects[i].y + objects[i].height >= playerY && objects[i].x >= playerX && objects[i].x + objects[i].width <= playerX + playerWidth) {
                             isGameOver = true;
                             clearInterval(intervalId);
                             alert(`Game Over! Your score: ${score}`);
                     }
             }

             // Remove objects that are off screen
             objects = objects.filter(object => object.y < canvas.height);
     }

     // Spawn new objects
     function spawnObject() {
             const objectWidth = 30 + Math.random() * 40;
             const objectHeight = 30 + Math.random() * 40;
             const objectX = Math.random() * (canvas.width - objectWidth);
             const objectY = 0 - objectHeight;

             objects.push({ x: objectX, y: objectY, width: objectWidth, height: objectHeight });
     }

     // Update the score
     function updateScore() {
             score++;
             document.getElementById('score').innerHTML = `Score: ${score}`;
     }

     // Start the game
     function startGame() {
             // Add event listeners
             window.addEventListener('keydown', movePlayer);

             // Set up the initial score and object interval
             score = 0;
             document.getElementById('score').innerHTML = `Score: ${score}`;
             intervalId = setInterval(spawnObject, objectInterval);

             // Start the game loop
             function gameLoop() {
                     if (!isGameOver) {
                             ctx.clearRect(0, 0, canvas.width, canvas.height);

                             drawPlayer();
                             moveObjects();
                             drawObjects();
                             updateScore();

                             requestAnimationFrame(gameLoop);
                     }
             }

             gameLoop();
     }