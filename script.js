const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistake = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')


let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistakes=0;
let isTyping=false;


function loadParagraph(){
    const para=["The only way to do great work is to love what you do. - Steve Jobs",
    "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
     "Follow Aryanfittech for more updates"]

    const randomIndex=Math.floor(Math.random()*para.length);

    typingText.innerHTML='';

    for(const char of para[randomIndex]){
        // console.log(char);
       //adding span in p tag of typing-text class 
        typingText.innerHTML+=`<span>${char}</span>`;
        
    }

    //typing-text class me saare span select kiye or first span mtlb idx[0] pe active   class list add krdi
    typingText.querySelectorAll('span')[0].classList.add('active'); 
    document.addEventListener('keydown',()=>{
        input.focus();
    });
    typingText.addEventListener('click',()=>{
        input.focus();
    })
    
}

//now handeling input
function initTyping(){
    const char =typingText.querySelectorAll('span');
    // console.log(char)
    const typedChar = input.value.charAt(charIndex);
     

    if(charIndex < char.length && timeLeft > 0){
       
        if(!isTyping){
            timer=setInterval(initTime,1000);
            isTyping=true;
        }
        
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct')
            console.log('correct')
        }else{
            mistakes++;
            char[charIndex].classList.add('wrong')
            console.log('wrong')
        }

        mistake.innerText=mistakes;
        charIndex++;
        char[charIndex].classList.add('active');
        cpm.innerText=charIndex-mistakes;
    }
    else{
       clearInterval(timer);
       input='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal=Math.round(((charIndex-mistakes)/5)/(maxTime-timeLeft)*60);
        wpm.innerText=wpmVal;
    }
    else{
        clearInterval(timer);
        // isTyping=false;
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    time.innerText=timeLeft;
    charIndex=0;
    mistakes=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistake.innerText=0;
}


input.addEventListener('input',initTyping)
btn.addEventListener("click",reset);
loadParagraph();


