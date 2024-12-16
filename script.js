const songs = [
    "1DSongs/one-direction_one-direction-change-my-mind (1).mp3",
    "1DSongs/one-direction_one-direction-c-mon-c-mon copy.mp3",
    "1DSongs/one-direction_one-direction-everything-about-you.mp3",
    "1DSongs/one-direction_one-direction-i-should-ve-kissed-you.mp3",
    "1DSongs/one-direction_one-direction-i-want.mp3 ",
    "1DSongs/one-direction_one-direction-i-wish.mp3",
    "1DSongs/one-direction_one-direction-i-would (1).mp3",
    "1DSongs/one-direction_one-direction-kiss-you.mp3",
    "1DSongs/one-direction_one-direction-little-things.mp3",
    "1DSongs/one-direction_one-direction-live-while-we-re-young.mp3",
    "1DSongs/one-direction_one-direction-moments.mp3",
    "1DSongs/one-direction_one-direction-more-than-this.mp3 ",
    "1DSongs/one-direction_one-direction-na-na-na.mp3 ",
    "1DSongs/one-direction_one-direction-over-again.mp3",
    "1DSongs/one-direction_one-direction-same-mistakes.mp3 ",
    "1DSongs/one-direction_one-direction-they-don-t-know-about-us.mp3",
    "1DSongs/one-direction_one-direction-they-don-t-know-about-us.mp3",
    "1DSongs/one-direction_one-direction-what-makes-you-beautiful.mp3"
];

const justin = [
    "JustinSongs/justin-bieber-type-beat-pop-rnb-freedom-by-tremoxbeatz-216870.mp3",
    "JustinSongs/new-life-201862.mp3",
    "JustinSongs/pop-instrumental-136021.mp3",
    "JustinSongs/new-life-201862.mp3",
    "JustinSongs/popsicle-smooth-fashion-pop-194237.mp3",
    "JustinSongs/the-tropical-house-138603.mp3",
    "JustinSongs/upbeat-dj-music-140470.mp3"
];

const xxxtantion = [
    "xxxtantionSongs/drugs-hiphop-music-21551.mp3",
    "xxxtantionSongs/never-again-rampb-music-22126.mp3",
    "xxxtantionSongs/suicide-doors-uk-drill-music-18507.mp3",
    "xxxtantionSongs/time-for-love-hiphop-music-21372.mp3"
];


const Ed_Sheeran = [
    "Ed_SheeranSongs/dance-90s-151862.mp3",
    "Ed_SheeranSongs/dreams-in-patterns-164484.mp3",
    "Ed_SheeranSongs/fantasy-for-orchestra-4th-ed-121970.mp3",
    "Ed_SheeranSongs/fragile-horizon-268783.mp3",
    "Ed_SheeranSongs/mc-quattro-beats-beats-ufo-rage-cyberpunk-2022-13551.mp3",
    "Ed_SheeranSongs/party-over-262693.mp3",
    "Ed_SheeranSongs/tender-love-guitar-variation-110606.mp3"
];


const currentSong = new Audio();
let CurrentIndex = 0;
let isPlaying = false;

let playButton = document.getElementById("PlayButton");

function PlayMusic(track) {   //THIS FUNCTION IS TO PLAY SONG ON THE LIST IT ACCEPT THE SOGS ITSELF
    document.querySelector(".playBar").style.border = "2px solid aqua";
    currentSong.src = track;
    currentSong.play();
    isPlaying = true;
    playButton.classList.remove("ri-play-circle-line");
    playButton.classList.add("ri-pause-circle-line");
    document.querySelector(".songInfo").innerHTML = track.split("Songs/")[1];
   
}

function PlaySong(array) {   //THIS FUNCTION IS TO PLAY THE SONG BY CLICKILING ON THS PLAY ICON IT ACCEPT THE INDEX OF THE SONG WHICH ARE STORES IN ARRAY OF SONGS
    currentSong.src = array[CurrentIndex];
    currentSong.play();
    isPlaying = true;
    playButton.classList.remove("ri-play-circle-line");
    playButton.classList.add("ri-pause-circle-line");
}


PlaySong(CurrentIndex);   //THIS IS TO PLAY THE FIRST SONG IF THE PARTICULAR SONG IS NOT SELECTED YET



playButton.onclick = () => {  //THIS IS TO CHNAGE THS ICON OF PLAYBUTTON AND TO PLAY AND PAUSE THE SONGS
    if (isPlaying) {
        document.querySelector(".playBar").style.border = "2px solid gray";
        currentSong.pause();
        isPlaying = false;
        playButton.classList.remove("ri-pause-circle-line");
        playButton.classList.add("ri-play-circle-line");
    }
    else {
        currentSong.play();
        document.querySelector(".playBar").style.border = "2px solid aqua";
        isPlaying = true;
        playButton.classList.remove("ri-play-circle-line");
        playButton.classList.add("ri-pause-circle-line");
    }
}
function convertToMinSec(timeInSeconds) {    //FOUNCTION TO  COVER DEFULT TIME INTO MINUTES AND SECONDS
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

currentSong.addEventListener("timeupdate", () => { //THIS IS TO UPDATE THE PROGRESS BAR ACCORODING TO SONG TIME

    if(!isNaN(currentSong.currentTime) && !isNaN(currentSong.duration)){
        document.querySelector(".songTime").innerHTML = `${convertToMinSec(currentSong.currentTime)} / ${convertToMinSec(currentSong.duration)}`;
    }
    else{
        document.querySelector(".songTime").innerHTML = "0:00 / 0:00";
    }
    const progress = document.querySelector("#progress");
    const percent = (currentSong.currentTime / currentSong.duration) * 100;
    progress.value = percent;
  
    progress.addEventListener("input", () => {   // THIS IS  TO UPDATE THE  SONG TIME ACCORODING TO THE CURRENT DURATION OF THE SONG
        progress.dragging = true;
        const newTime = (progress.value / 100) * currentSong.duration;
        currentSong.currentTime = newTime;
    })
    if(!progress.dragging){
        progress.value = 0;
    }

})



function next(array){
    CurrentIndex += 1;
    PlaySong(array);
    document.querySelector(".songInfo").innerHTML = currentSong.src.split("Songs/")[1];

    let songItem = document.querySelectorAll(".SongList li");
    songItem[CurrentIndex-1].style.backgroundColor = "";
    songItem[CurrentIndex].style.backgroundColor = "#25414c";
}

function previous(array){
    CurrentIndex -= 1;
    PlaySong(array);
    document.querySelector(".songInfo").innerHTML = currentSong.src.split("Songs/")[1];

    let songItem = document.querySelectorAll(".SongList li");
    songItem[CurrentIndex+1].style.backgroundColor = "";
    songItem[CurrentIndex].style.backgroundColor = "#25414c";
}



function InsertSong(list){     //FUNCTION TO INSERT SONG IN THE SONGLIST ACCORODING TO USER 
    let songList = document.getElementsByClassName("SongList")[0];
    songList.innerHTML = "";
    list.forEach(e =>{
        let li = document.createElement("li");
        li.innerHTML = `<i class="ri-music-2-line"></i>
                    <div class="info">
                        <div>${e.split("Songs/")[1]}</div>
                      
                    </div>
                    <div class="playNow">
                        <span>Play Now </span>
                    <i id ="play" class="ri-play-circle-line"></i>
                </div> `;
                songList.appendChild(li);
    });
}

function PassSong(file){    //ACCEPT ARRAY OF SONG AND PASS SPECIFIC SONG FROM ACCEPTED ARRAY TO PLAY
    Array.from(document.querySelector(".SongList").getElementsByTagName("li")).forEach((e, index)=>{
        e.addEventListener("click", ()=>{
          Array.from(document.querySelector(".SongList").getElementsByTagName("li")).forEach(li=>{
            li.style.backgroundColor = '';
          });
          e.style.backgroundColor = '#25414c';
            PlayMusic(file[index]);
        });
    });
}
document.querySelectorAll(".card").forEach(e=>{
    e.addEventListener("click", ()=>{
        document.querySelectorAll(".card").forEach(i=>{
            i.style.backgroundColor = "";
            i.style.border = "";
        })
        e.style.backgroundColor = "#25414c";
        e.style.border = "2px solid aqua";
    })
})

document.getElementsByClassName("card")[0].addEventListener("click", ()=>{
    InsertSong(songs);
   PassSong(songs);
   document.querySelector(".ri-skip-right-line").onclick = ()=>{next(songs)};
   document.querySelector(".ri-skip-left-line").onclick = ()=>{previous(songs)};
});
document.getElementsByClassName("card")[1].addEventListener("click", ()=>{
    InsertSong(justin);
  PassSong(justin);
  document.querySelector(".ri-skip-right-line").onclick = ()=>{next(justin)};
  document.querySelector(".ri-skip-left-line").onclick = ()=>{previous(justin)};
});
document.getElementsByClassName("card")[2].addEventListener("click", ()=>{
    InsertSong(xxxtantion);
    PassSong(xxxtantion);
    document.querySelector(".ri-skip-right-line").onclick = ()=>{next(xxxtantion)};
    document.querySelector(".ri-skip-left-line").onclick = ()=>{previous(xxxtantion)};
});
document.getElementsByClassName("card")[3].addEventListener("click", ()=>{
    InsertSong(Ed_Sheeran);
    PassSong(Ed_Sheeran);
    document.querySelector(".ri-skip-right-line").onclick = ()=>{next(Ed_Sheeran)};
    document.querySelector(".ri-skip-left-line").onclick = ()=>{previous(Ed_Sheeran)};
});



document.querySelector(".hamberger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
})

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-110%";
})


