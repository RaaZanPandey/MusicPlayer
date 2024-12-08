const songs = ["songs/one-direction_one-direction-change-my-mind (1).mp3",
    "songs/one-direction_one-direction-c-mon-c-mon copy.mp3",
    "songs/one-direction_one-direction-everything-about-you.mp3",
    "songs/one-direction_one-direction-i-should-ve-kissed-you.mp3",
    "songs/one-direction_one-direction-i-want.mp3 ",
    "songs/one-direction_one-direction-i-wish.mp3",
    "songs/one-direction_one-direction-i-would (1).mp3",
    "songs/one-direction_one-direction-kiss-you.mp3",
    "songs/one-direction_one-direction-little-things.mp3",
    "songs/one-direction_one-direction-live-while-we-re-young.mp3",
    "songs/one-direction_one-direction-moments.mp3",
    "songs/one-direction_one-direction-more-than-this.mp3 ",
    "songs/one-direction_one-direction-na-na-na.mp3 ",
    "songs/one-direction_one-direction-over-again.mp3",
    "songs/one-direction_one-direction-same-mistakes.mp3 ",
    "songs/one-direction_one-direction-they-don-t-know-about-us.mp3",
    "songs/one-direction_one-direction-they-don-t-know-about-us.mp3",
    "songs/one-direction_one-direction-what-makes-you-beautiful.mp3"

];


const currentSong = new Audio();
let CurrentIndex = 0;
let isPlaying = false;

let playButton = document.getElementById("PlayButton");

function PlayMusic(track) {   //THIS FUNCTION IS TO PLAY SONG ON THE LIST IT ACCEPT THE SOGS ITSELF
    currentSong.src = track;
    currentSong.play();
    isPlaying = true;
    playButton.classList.remove("ri-play-circle-line");
    playButton.classList.add("ri-pause-circle-line");
    document.querySelector(".songInfo").innerHTML = track.split("songs/one-direction_")[1];
    console.log(track);

}

function PlaySong(CurrentIndex) {   //THIS FUNCTION IS TO PLAY THE SONG BY CLICKILING ON THS PLAY ICON IT ACCEPT THE INDEX OF THE SONG WHICH ARE STORES IN ARRAY OF SONGS
    currentSong.src = songs[CurrentIndex];
    currentSong.play();
    isPlaying = true;
    playButton.classList.remove("ri-play-circle-line");
    playButton.classList.add("ri-pause-circle-line");
    document.querySelector(".songInfo").innerHTML = songs[CurrentIndex].split("songs/one-direction_")[1];

}

PlaySong(CurrentIndex);   //THIS IS TO PLAY THE FIRST SONG IF THE PARTICULAR SONG IS NOT SELECTED YET


playButton.onclick = () => {  //THIS IS TO CHNAGE THS ICON OF PLAYBUTTON AND TO PLAY AND PAUSE THE SONGS
    if (isPlaying) {
        currentSong.pause();
        isPlaying = false;
        playButton.classList.remove("ri-pause-circle-line");
        playButton.classList.add("ri-play-circle-line");
    }
    else {
        currentSong.play();
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

currentSong.addEventListener("timeupdate", () => {
    // console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songTime").innerHTML = `${convertToMinSec(currentSong.currentTime)} / ${convertToMinSec(currentSong.duration)}`;
    const progress = document.querySelector("#progress");
    const percent = (currentSong.currentTime / currentSong.duration) * 100;
    progress.value = percent;

    progress.addEventListener("input", () => {
        progress.dragging = true;
        const newTime = (progress.value / 100) * currentSong.duration;
        currentSong.currentTime = newTime;
    })

})


let next = document.querySelector(".ri-skip-right-line");  //THIS TRIGGER THE NEXT ICON AND PLAY NEXT SONG 
next.onclick = () => {
    CurrentIndex += 1;
    PlaySong(CurrentIndex);
}

let previous = document.querySelector(".ri-skip-left-line");  //THIS TRIGGER THE PREVIOUS ICON AND PLAY PREVIOUS SONG 
previous.onclick = () => {
    CurrentIndex -= 1;
    PlaySong(CurrentIndex);
}



let songName = [];
for (const a of songs) {
    songName.push(a.split("songs/one-direction_")[1]);
}

let songList = document.querySelector(".SongList");
songName.forEach(e => {
    const li = document.createElement("li");
    li.innerHTML =
        `         <i class="ri-music-2-line"></i>
                        <div class="info">
                            <div>${e}</div>
                            <div>One Direction</div>
                        </div>
                        <div class="playNow">
                            <span>Play Now </span>
                        <i id ="play" class="ri-play-circle-line"></i>
                    </div>
                    `
        ;
    songList.appendChild(li);
})

let CartContainer = document.querySelector(".cardContainer");
songName.forEach(e => {
    let card = document.createElement("class");
    card.innerHTML = ` <div class="card border">
                    <div class="play"><i class="ri-music-fill"></i></div>
                    <img src="onde-direction.jpg" alt="">
                    <p>${e}</p>
                    <h2>One Direction</h2>
                </div>
`
    CartContainer.appendChild(card);
})

Array.from(document.querySelector(".SongList").getElementsByTagName("li")).forEach((e, index)=>{
    e.addEventListener("click", ()=>{
        PlayMusic(songs[index]);
       
    })
})

document.querySelector(".hamberger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0";
})

document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-110%";
})

