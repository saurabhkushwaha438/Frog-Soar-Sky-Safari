const canvas= document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =window.innerWidth
canvas.height =window.innerHeight



const gravity  = 0.3   
let i
let score  = 0

const playerimg = new Image()
playerimg.src= 'img/plr.png'

class Player {
    constructor(){
       this.position={
        x:100,  
        y:300
       }
       this.velocity={
        x:0,
        y:0
       }
       this.height = 50
       this.width = 50
    }
    draw(){
        c.fillStyle='transparent'
        c.fillRect(this.position.x,this.position.y,this.height,this.width)
        c.drawImage(playerimg, this.position.x, this.position.y, this.width, this.height);
       }

       update(){
        this.draw()
        this.velocity.y += gravity;

        
        this.position.y += this.velocity.y;
    
    
        if (this.position.y + this.height > innerHeight) {
        
            this.position.y -=this.velocity.y;
        }else if(this.position.y  <  0){
            this.position.y =  0;
          
        }

        if (keys.space.pressed) {
            this.velocity.y = -10;
            keys.space.pressed = false; 
        }
       
       }

}  


const platformimg = new Image()
platformimg.src = 'img/platform.png'
class Platform{
    constructor(x,y){
        this.position={
            x:x,
            y:y
           }
           this.height = Math.floor( Math.random()*20+50 )
           this.width =   Math.floor( Math.random()*20 +50)
    }
    draw(){
        c.fillStyle='transpanrent'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        c.drawImage(platformimg,this.position.x,this.position.y,this.width,this.height)
       }

       update(){
        this.draw()
        this.position.x -= 3
        if (
            player.position.x < this.position.x + this.width &&
            player.position.x + player.width > this.position.x &&
            player.position.y < this.position.y + this.height &&
            player.position.y + player.height > this.position.y
        ) {

  
            restart()
             
           //    player.position.y = this.position.y - player.height;
        }
       }
}

const player = new Player()

const platforms = [];
const platform = new Platform()

function restart() {
    player.position.x=100
    player.position.y=300
    player.velocity.x=0
    player.velocity.y=0 
    i=0
    score =0
    platforms.length=0

    alert('game is over')
}

setInterval(()=> {
    for ( i = 0; i < 5; i++) {
        const x = Math.random() * (canvas.width )*10; 
        const y = Math.random() *730; 
        platforms.push(new Platform(x, y));
       
    }
    score+=1
}, 2000);





const keys ={
    space :{
        pressed : false
    },
   
}


const backgroundImage = new Image();
backgroundImage.src = 'img/bk.png';


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    c.fillStyle = 'black';
    c.font = '20px Arial';
    c.fillText('Score: ' + score, 10, 30);
    player.update()
   

    platforms.forEach(platform => {
        platform.update();
    });

  //  c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
}
//animate()

addEventListener('keydown', (event) => {
    if (event.code === "Space") {
        keys.space.pressed = true;
    }
}); 

canvas.addEventListener('touchstart', () => {
    keys.space.pressed = true;
});

animate()
