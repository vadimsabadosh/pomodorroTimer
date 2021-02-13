    let audio = document.querySelector('audio');
    
    
    let audioSound = document.querySelectorAll('.audio');
    
    let title = document.querySelector('.timer-title');
    let buttons = document.querySelector('.buttons');

    let options = document.querySelector('.options');
    let minutes = document.querySelector('.minutes');
    let seconds = document.querySelector('.seconds');

    let start = document.querySelector('.start');
    let pause = document.querySelector('.pause');
    let reset = document.querySelector('.reset');

    let incrSession = document.querySelector('#incrSession');
    let sessionInput = document.querySelector('#sessionInput');
    let decrSession = document.querySelector('#decrSession');

    let incrBreak = document.querySelector('#incrBreak');
    let breakInput = document.querySelector('#breakInput');
    let decrBreak = document.querySelector('#decrBreak');

    let breakLength = breakInput.value * 60;
    let breakMax = 10;
    let breakMin = 1;
    let sessionLength = sessionInput.value * 60;
    
    let sessionMax = 60;
    let sessionMin = 5;
    let sessionNum = 0;
    let countdown;
    let countType;
    let remainingTime = sessionLength;

    


   
    const startSession = () => {
        sessionNum++;
        countType = "session";
        title.innerHTML = `Session ${sessionNum}`;
        startTimer(sessionLength);
        options.style.display = 'none';
        audio.play();
    };
    const startBreak = () => {
        countType = "break";
        title.innerHTML = `Break ${sessionNum}`;
        
        audio.pause();
        startTimer(breakLength);
    };
    const startTimer = (timeLeft) => {

            start.style.display = 'none';
            pause.style.display = 'block';
            audio.play();
            countdown = setInterval(() => {
                timeLeft--;
                remainingTime = timeLeft;
                let minLeft = Math.floor(timeLeft / 60);
                let secLeft = Math.floor(timeLeft - minLeft * 60);
                updateMinutes(minLeft);
                updateSeconds(secLeft < 10 ? "0" + secLeft : secLeft);
                if (timeLeft < 1){
                    if (countType === "session"){
                        startBreak(breakLength);
                    } else {
                        startSession();
                    };
                };
            }, 1000);
        
    };
    const pauseCountdown = () => {
        sessionNum--;
        clearInterval(countdown);
        options.style.display = '';
        title.innerHTML = 'Paused';
        start.style.display = 'block';
        
        pause.style.display = 'none';
        audio.pause();
    };
    // const resetCountdown = () => {
    //     clearInterval(countdown);
    //     updateMinutes(sessionLength / 60);
    //     updateSeconds("00");
    //     countType = undefined;
    //     title.textContent = "Ready?";
    //     remainingTime = sessionLength;
    // };
    //Update Session
    const incSession = () => {
        let num = Number(sessionInput.value);
        num = num + (num === sessionMax ? 0 : 1);
        sessionLength = num * 60;
        
        updateSession(num);
        updateMinutes(num);
        updateSeconds("00");
        //resetCountdown();
        
    };
    const decSession = () => {
        let num = Number(sessionInput.value);
        num = num - (num === sessionMin ? 0 : 1);
        sessionLength = num * 60;
        updateSession(num);
        updateMinutes(num);
        updateSeconds("00");
        //resetCountdown();
    };
    const updateSession = (num) => {
        num = num < sessionMin ? sessionMin : num > sessionMax ? sessionMax : num;
        sessionInput.value = num;
        updateMinutes(num);
        updateSeconds("00");
        
        sessionLength = num * 60;
        //resetCountdown();
    };

    //Update Break
    const incBreak = () => {
        let num = Number(breakInput.value);
        num = num + (num === breakMax ? 0 : 1);
        breakLength = num * 60;
        updateBreak(num);
        //resetCountdown();
    };
    const decBreak = () => {
        let num = Number(breakInput.value);
        num = num - (num === breakMin ? 0 : 1);
        breakLength = num * 60;
        updateBreak(num);
        //resetCountdown();
    };
    const updateBreak = (num) => {
        breakInput.value = num < breakMin ? breakMin : num > breakMax ? breakMax : num;
        breakLength = num * 60;
        //resetCountdown();
    };

    //Update Time
    const updateMinutes = (num) => {
        minutes.textContent = num;
        
    };
    const updateSeconds = (num) => {
        seconds.textContent = num;
    };

    const audioSelect = () => {
        audioSound.forEach(el => {
            el.addEventListener('click', e => {
                
                e.target.classList.add('selected');
                
                switch(e.target.id){
                    case "Forest" : 
                        audio.setAttribute('src', 'audio/forest.mp3');
                        audio.play();
                    break;
                    case "Ocean" : 
                        audio.setAttribute('src', 'audio/ocean.mp3');
                        audio.play();
                    break;
                    case "Rain" : 
                        audio.setAttribute('src', 'audio/rain.mp3'); 
                        audio.play();
                    break;
                };
            })
        });
    }

    const init = () => {

        incrSession.addEventListener('click', incSession);
        decrSession.addEventListener('click', decSession);
        incrBreak.addEventListener('click', incBreak);
        decrBreak.addEventListener('click', decBreak);
        sessionInput.addEventListener('change', e => updateSession(e.target.value));
        breakInput.addEventListener('change', e => updateBreak(e.target.value));
        start.addEventListener('click', () => {
            if(countType === "break"){
                startSession();
            }else{
                startBreak();
            }
        });
        pause.addEventListener('click', pauseCountdown);
        //reset.addEventListener('click', resetCountdown);
        audioSelect();

    };
    
    init();