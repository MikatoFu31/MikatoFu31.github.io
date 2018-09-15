enchant(); // enchant.jsの有効化

window.onload = function() {
    console.log('hello world');
    var game = new Game(240,320);
    game.fps=20;
    game.preload("./img/cat.png");
    game.preload("./img/fruit.png");
    game.preload("./img/bomb.png");
    game.onload=function(){
        var me=new Sprite(32,32);
        var moveflag=0;
        var mousex;
        var mousey;
        var direction=0;
        var fruit=new Array();
        var pointup=new Array();
        var enemy=new Array();
        var score=0;
        var level=1;
        var label_score = new Label("スコア:"+score+"  レベル:"+level);
        var life=5;
        var frames=0;
        var gover=0
        var overeffect=0;
        var gameover=new Label("Game\nover")
        gameover.font = "Sawarabi Gothic bold 48px";
        gameover.x=20;
        gameover.y=20;
        gameover.visible=true;
        gameover.color="#D0D0D0"
        game.rootScene.addChild(label_score);
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
        for(i=0;i<10;i++){
            enemy[i]=new Sprite(32,32);
            enemy[i].image=game.assets["./img/bomb.png"];
            enemy[i].visible=false;
            game.rootScene.addChild(enemy[i]);
        }
        for(i=0;i<20;i++){
            pointup[i]=new Label("");
            pointup[i].visible=false;
            pointup[i].font="Sawarabi Gothic bold 20px";
            game.rootScene.addChild(pointup[i]);
        }


        label_score.color="#303030";
        label_score.x=20;
        label_score.y=0;
        label_score.font="Sawarabi Gothic bold 20px";
        game.rootScene.addChild(label_score);

        game.rootScene.backgroundColor  = '#88EEEE';







        game.rootScene.addEventListener('touchstart',function(e){
            if (moveflag==0){
                moveflag=1;
            }
            mousex=e.localX;
        })
        game.rootScene.addEventListener('touchend',function(e){
            moveflag=0;
        })
        game.rootScene.addEventListener('touchmove',function(e){
            if (moveflag==0){
                moveflag=1;
            }
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
                        fruit[i].x=Math.random()*(240-32);
                        fruit[i].y=0;
                        fruit[i].yspeed=Math.random()*8+3;
                        console.log("fruit appeared:"+i);
                        break;
                    }
                }
            }
            for(j=0;j<10;j++){
                if(fruit[j].visible==true){
                    fruit[j].y+=fruit[j].yspeed;
                    if (fruit[j].y>320){
                        fruit[j].visible=false;
                    }
                    if (me.intersect(fruit[j]) & fruit[j].visible==true && me.visible==true){
                        console.log("You touched a fruit "+i+" in frame "+frames);
                        add_pointup(pointup,"+10",fruit[j].x,fruit[j].y,20);
                        fruit[j].visible=false;
                        score+=10;
                        if(level<=score/100+1){
                            level++
                            add_pointup(pointup,"レベルアップ!",me.x+20,me.y+20,20);
                        }
                        label_score.text=("スコア:"+score+"  レベル:"+level);
                    }
                }
            }
            if (Math.random()*(20-level*1.5)<=2 && frames%16==0){
                for(i=0;i<10;i++){
                    if (enemy[i].visible==false){
                        enemy[i].visible=true;
                        enemy[i].x=Math.random()*(240-32);
                        enemy[i].y=0;
                        enemy[i].xspeed=Math.random()*5-2;
                        enemy[i].yspeed=Math.random()*4+3;
                        break;
                    }
                }
            }
            for(j=0;j<10;j++){
                if (enemy[j].visible==true){
                    enemy[j].x+=enemy[j].xspeed;
                    enemy[j].y+=enemy[j].yspeed;
                    if (enemy[j].y>320){
                        enemy[j].visible=false;
                    }
                    if (me.intersect(enemy[j]) & enemy[j].visible==true){
                        console.log("You touched a enemy "+i+" in frame "+frames);
                        var gover=1;
                        label_score.text=("スコア:"+score);
                    }

                }
            }
            nexttick_pointup(pointup);
            if (gover==1 || overeffect!=0){
                moveflag=-1
                console.log("GAMEOVER"+overeffect);
                overeffect++;
                if (overeffect==2){
                    game.rootScene.backgroundColor  = '#883333';
                }
                if (overeffect==2){
                    me.visible=false;
                }
                if (overeffect>=2){
                    var of=overeffect;
                    add_pointup(pointup,"。",me.x-of,me.y-of,1);
                    add_pointup(pointup,"。",me.x-of,me.y+of,1);
                    add_pointup(pointup,"。",me.x+of,me.y-of,1);
                    add_pointup(pointup,"。",me.x+of,me.y+of,1);
                }
                if(overeffect==40){
                    gameover.visible=true;
                }
                if (overeffect==42){
                    game.stop();
                }
            }
        });
    }
    game.start();
}


function add_pointup(pointup,texttoshow,xpos,ypos,drawcount){
    for (i=0;i<10;i++){
        if(pointup[i].visible==false){
//            console.log("Point"+xpos);
            pointup[i].text=texttoshow;
            pointup[i].visible=true;
            pointup[i].x=xpos;
            pointup[i].y=ypos;
/*            pointup[i].xs=xspeed;
            pointup[i].ys=yspeed;*/
            pointup[i].dc=drawcount;
            break;
        }
    }

}
function nexttick_pointup(pointup){
    for (i=0;i<10;i++){
        if(pointup[i].visible==true){
/*            pointup[i].x+=pointup[i].xspeed;
            pointup[i].y+=pointup[i].yspeed;*/
            pointup[i].dc--;
            if (pointup[i].dc<=0){
                console.log("Point disappeared");
                pointup[i].visible=false;
            }
        }
    }

}