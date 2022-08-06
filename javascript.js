const b=document.querySelector('.grids');
let index=202;
let direction=1;
let shift=true;
let time;
let width=15;
let aliensRemoved=[];
let count =0;

for(let i = 0 ; i < 225 ; i++ ){
    const bubble = document.createElement('div')
    b.appendChild(bubble);
}

const bubble=Array.from(document.querySelectorAll('.grids div'));

const arr = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24
    ,30,31,32,33,34,35,36,37,38,39];

function addBase(){
    //create gun's base 
    for(let i = 0 ; i < arr.length ; i++ ){
        if(!aliensRemoved.includes(i)){
            bubble[arr[i]].classList.add('invader');
        }
        
    }
    
}
addBase();

function remove(){
    //moving base
    for(let i = 0 ; i < arr.length ; i++ ){
        bubble[arr[i]].classList.remove('invader')
    }
}
remove();

//gun moves in 300/20=15 block

bubble[index].classList.add('gun');

//move the gun platform
function platform(e){
    bubble[index].classList.remove('gun');
    switch(e.key){
        case 'ArrowLeft':
             if(index % width !==0)
                index-=1;
            break;
        case 'ArrowRight':
            if(index % width < width-1)
                index+=1;
            break;
    }
    bubble[index].classList.add('gun');
}
//add event
document.addEventListener('keydown',platform);

//move bubbles
function movetarget(){
    const l=arr[0] % width===0;
    const r=arr[arr.length-1] % width===width-1;
    remove();

    if(r && shift){
        for(let i=0;i<arr.length;i++){
            arr[i]+=width+1;
            direction=-1;
            shift=false;
        }
    }
    if(l && !shift){
        for(let i=0;i<arr.length;i++){
            arr[i]+=width-1;
            direction=1;
            shift=true;
        }
    }

    for(let i=0;i<arr.length;i++){
        arr[i]+=direction;
    }
    addBase();

    //when invader hits gun
    if(bubble[index].classList.contains('invader','gun') ){
         document.querySelector("#result").innerHTML="!!Game Over!!";
          clearInterval(time);
    }
  
    if(aliensRemoved.length===arr.length){
        document.querySelector("#result").innerHTML="**YOU WIN**";
        clearInterval(bulletId);
    }

}

  time=setInterval(movetarget,700);
//to fire
function fire(e){
    let bulletId;
    let bulletIndex=index;

    function moveBullet(){
        bubble[bulletIndex].classList.remove('bullet');
        bulletIndex -= width;
        bubble[bulletIndex].classList.add('bullet');
    
//when hits a invader colors block to orange  
        if(bubble[bulletIndex].classList.contains('invader')){
            bubble[bulletIndex].classList.remove('bullet');
            bubble[bulletIndex].classList.remove('invader');
            bubble[bulletIndex].classList.add('hit');
            
//reomve the trailing eff of hit blocks
            setTimeout(()=>bubble[bulletIndex].classList.remove('hit'),300);
            clearInterval(bulletId);

//when hit remove that element
            //arr to store hit blocks            
            const alienRemoved = arr.indexOf(bulletIndex)
            aliensRemoved.push(alienRemoved)
            count++
            document.querySelector("#result").innerHTML=count;
            console.log(aliensRemoved)

        }
    }
    switch(e.key){
        case 'ArrowUp':
            bulletId=setInterval(moveBullet,100);
    }
}
document.addEventListener('keydown',fire);
  