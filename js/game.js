class Game{
    constructor(){

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
    player1.addImage("spaceship.png",player_img);
    player1.scale=0.3;
    //player_img.scale=0.5;
    player2 = createSprite(800,500);
    player2.addImage("spaceship.png", player_img);
    player2.scale=0.3;
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y= 500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                     textSize(25);
                     fill("white");
                     text("Player1 : " + allPlayers.player1.score,50,50);
                     text("Player2 : "+allPlayers.player2.score,50,100 );
                     
                    
                     
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }

                if(frameCount%200===0){
                    player.score=player.score+15;
                }
            
                 if (frameCount % 100 === 0) {
                     asteroids = createSprite(random(100, 1000),0,100,100);
                     asteroids.velocityY = 4;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: asteroids.addImage("asteroid",asteroid_img);
                         break;
                     }
                     asteroidGroup.add(asteroids);
                     
                 }
                 
                  if (player.index !== null) {
                    
                     for(var i=0 ;i<asteroidGroup.length; i++){

                     if (asteroidGroup.get(i).isTouching(players)){

                        asteroidGroup.get(i).destroy();
                        player.score=player.score-10;
                         player.update();

                     }
                     

                     }
                  }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}