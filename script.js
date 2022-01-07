console.log('Welcome to Spotify');
//Feature to be added: press anywhere space bar to pause/play
//pause from the songList (it can only be played currently)
//gif.style.opacity = 1 
//the song being played should have option pause in songList
//song when ends play the next

//Initialize the variables
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Mortals - Warriyo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:48"},
    {songName: "Um Som - Xingu Rap", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "2:35"},
    {songName: "Invincible - Deaf Kev", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "4:39"},
    {songName: "My Heart - Different Heaven", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "4:26"},
    {songName: "Entrenamiento en el Gym - Gimnasio", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "3:29"},
    {songName: "..! (Interlude)", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "4:34"},
    {songName: "Heroes Tonight - Janji", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "3:28"}
]

//Setting songs
songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//Play/Pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

//Listen to event
//Seekbar
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;

}
);

//moving the seekbar
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
});

//Playing from the songList
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((e)=>{
        e.classList.remove('fa-pause-circle');
        e.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((e)=> {
    e.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    });
});

//next and previous button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7)
    {
        songIndex = 1;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1)
    {
        songIndex = 7;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    
});