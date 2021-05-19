class Game {
    constructor() {

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1", player_img);
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players = [player1, player2];
    }
    
    play() {

    form.hide();

    Player.getPlayerInfo();
    image(back_img, 0, 0, 1000, 800);
    var x = 100;
    var y = 200;
    var index = 0;
    drawSprites();

    for(var plr in allPlayers){
        index++;
        x = 500 - allPlayers[plr].distance;
        y = 500;
        
        players[index - 1].x = x;
        players[index - 1].y = y;
        
        if(index === player.index){
            textFont(antonFont);    
            fill("black");
            textSize(25);
            text(allPlayers[plr].name, x-25, y+25);

            if (player.index !== null) {
                //fill code here, to destroy the objects. (Use the one in the class project 40)
                // add the condition to calculate the score. 
                //and use update() to update the values in the database.
    
                for(var p = 0; p < fruitGroup.length; p++) {
                    console.log(players[index-1]);
                    if(fruitGroup[p].isTouching(players[index-1])) {
                        fruitGroup[p].destroy();
                        player.score+=1;
                        player.update();
                    }
                }
                //OLD CODE - DOES NOT WORK
                // if (fruitGroup.isTouching(player)) {
                //     fruitGroup.remove();
                //     player.score+=1;
                //     player.update();
                // }
            }
        }

        textFont(antonFont);
        textSize(34);
        fill(255);

        //Method #1 for displaying the score
        // text("Player 1: " + allPlayers.player1.score, 40, 60);
        // text("Player 2: " + allPlayers.player2.score, 50, 110);

        //Method #2 for displaying the score
        if(index === 1) {
            text("Player 1: " + allPlayers[plr].score, 40, 60);
        }
        //is only ran on the second time going through the loop
        else {
            text("Player 2: " + allPlayers[plr].score, 50, 110);
        }
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null && player.distance > -410) {
        player.distance -= 10;
        player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.index !== null && player.distance < 410) {
        player.distance += 10;
        player.update();
    }
    console.log(player1.x);

    if (frameCount % 20 === 0) {
        fruits = createSprite(random(100, 1000), 0, 100, 100);
        fruits.velocityY = 6;
        fruits.lifetime = 125;
        var rand = Math.round(random(1,5));
        switch(rand){
            case 1: fruits.addImage("fruit1",fruit1_img);
            break;
            case 2: fruits.addImage("fruit2", fruit2_img);
            break;
            case 3: fruits.addImage("fruit3", fruit3_img);
            break;
            case 4: fruits.addImage("fruit4", fruit4_img);
            break;
            case 5: fruits.addImage("fruit5", fruit5_img);
            break;
        }
        fruitGroup.add(fruits);
        
    }
}

    end(){
       console.log("Game Ended");
    }
}