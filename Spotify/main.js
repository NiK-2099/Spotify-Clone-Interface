console.log("Welcome to Spotify!");

// intialise the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));
// let duration = document.getElementById("time");


let songs = [
    {songName: "Never Gonna Give You Up", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ra Ra Ready", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Pepsi Ki Kasam", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Mere Dil Me Aaj", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Oo Antava", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Busy Busy", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Self Control", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Liar", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Dimaag Kharaab", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "...Baby I did It Again", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //seekbar update
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value*audioElement.duration/100;
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songListPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songListPlay')).forEach((element) => {
    element.addEventListener("click", (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // console.log(e.target);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex>9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});