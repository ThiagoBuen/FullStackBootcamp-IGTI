window.addEventListener('load', function(){
    const timer = document.querySelector("#timer");
    let count = 0;
    const interval = setInterval(() => {
        timer.textContent = count++;
        if (count === 20){
            this.clearInterval(interval);
            return;
        }
        if(count % 5 === 0){
            setTimeout(() => {
                count =+ '0,5';
                timer.textContent = count;
            }, 500);
        }
    }, 1000);
};