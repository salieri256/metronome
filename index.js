const message = document.getElementById("message");
const audio = new Array(25);
const init = async () => {
    const loadMedia = element => new Promise((resolve, reject) => {
        element.load();
        element.addEventListener("loadeddata", resolve);
    });
    for(let i = 0; i < 25; i++) {
        audio[i] = new Audio("metronome.m4a");
        await loadMedia(audio[i]);
    }
    message.value = "ロード完了";
}
init();

const bpm = document.getElementById("bpm");//bpm値 = parseInt(bpm.value, 10)
const button = document.getElementById("button");
const pushed = value => {
    if(value.checked) {
        const a = parseInt(bpm.value, 10);
        if(!Number.isInteger(a) || a < 1 || 1500 < a) {
            message.value = "1~1500の数を入力してください。";
            value.checked = false;
            return;
        }
        play(60*1000/a);
        button.innerHTML = "STOP";
        message.value = "";
    } else {
        stop();
        button.innerHTML = "PLAY";
    }
}

let loop;
const play = interval => {
    let count = 0;
    loop = setInterval(() => {
        audio[count].currentTime = 0;
        audio[count].play();
        count++;
        if(count >= 25) count = 0;
    }, interval);
}

const stop = () => {
    clearInterval(loop);
}

