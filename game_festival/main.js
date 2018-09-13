enchant(); // enchant.jsの有効化

window.onload = function() {
    console.log('hello world');
    var game = new Game(240,320);
    game.fps=20;
    game.preload("./img/cat.png");
    game.preload("./img/fruit.png");
    game.onload=function(){
        var me=new Sprite(32,32);
        var moveflag=0;
        var mousex;
        var mousey;
        var direction=0;
        var fruit=new Array();
        var score=0;
        var label_score = new Label("スコア:"+score);
        var life=7;
        var frames=0;
        me.image=game.assets["./img/cat.png"];
        me.x=160-32;
        me.y=320-64;
        game.rootScene.addChild(me);

        for(i=0;i<10;i++){
            fruit[i]=new Sprite(32,32);
            fruit[i].image=game.assets["./img/fruit.png"];
            fruit[i].visible=false;
            game.rootScene.addChild(fruit[i]);
        }
        label_score.color="#303030";
        label_score.x=20;
        label_score.y=0;
        label_score.font="20px";
        game.rootScene.addChild(label_score);

        game.rootScene.backgroundColor  = '#88EEEE';







        game.rootScene.addEventListener('touchstart',function(e){
            moveflag=1;
            mousex=e.localX;
        })
        game.rootScene.addEventListener('touchend',function(e){
            moveflag=0;
        })
        game.rootScene.addEventListener('touchmove',function(e){
            moveflag=1;
            mousex=e.localX;
        })
        game.rootScene.addEventListener('enterframe',function(e){
            frames++
            if (moveflag==1){
                if (mousex<=me.x-8){
                    direction=-1;
                    me.scaleX=1;
                    me.frame=game.frame%2;
                }
                if (mousex>=me.x+8){
                    direction=1;
                    me.scaleX=-1;
                    me.frame=game.frame%2;
                }
                if (mousex<=me.x+8 & mousex>=me.x-8){
                    direction=0;
                }
                me.x+=(8*direction);
                if (me.x<=0){
                    me.x=0;
                }
                if (me.x>=240-32){
                    me.x=240-32;
                }
            }

            if(Math.random()<=0.3 && frames%8==0){
                for(i=0;i<10;i++){
                    if (fruit[i].visible==false){
                        fruit[i].visible=true;
                        fruit[i].x=Math.random()*320;
                        fruit[i].y=0;
                        console.log("fruit appeared:"+i);
                        break;
                    }
                }
            }
        for(i=0;i<10;i++){
            if(fruit[i].visible==true){
                fruit[i].y+=6;
                if (fruit[i].y>320){
                    fruit[i].visible=false;
                }
                if (me.intersect(fruit[i])){
                    console.log("You touched a fruit");
                    fruit[i].visible=false;
                    score+=10;
                    label_score.text=("スコア:"+score);
                }
            }
        }

        });
    }
    game.start();
}