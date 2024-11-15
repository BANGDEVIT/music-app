// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer){
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong)
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger)

  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 1,
    audio: [{
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics
    }],
    autoplay : true
  }); 

  const avatar = document.querySelector(".singer-detail .inner-avatar");
  
  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  });

  ap.on('ended', function () {
    const option = {
      method : "PATCH",
    }

    const link = `/songs/listen/${dataSong._id}`
    fetch(link,option)
      .then(res => res.json())
      .then(data =>{
        if (data.listen){
          const butonListen = document.querySelector("[button-listen]");
          const span = butonListen.querySelector("span");
          span.innerHTML = `${data.listen} lượt nghe`
        }
      })
  });
}
// End APlayer

//button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike){
  buttonLike.addEventListener("click",()=>{
    const idSong = buttonLike.getAttribute("button-like")
    const isActive = buttonLike.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";

    const option = {
      method : "PATCH",
    }

    const link = `/songs/like/${typeLike}/${idSong}`
    fetch(link,option)
      .then(res => res.json())
      .then(data =>{
        if (data.code){
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`
          buttonLike.classList.toggle("active")
        }
      })
  })
}
//End button like

//buton heart
const listButtonfavorite = document.querySelectorAll("[button-favorite]");
if (listButtonfavorite.length > 0){
  listButtonfavorite.forEach((buttonfavorite)=>{
    buttonfavorite.addEventListener("click",()=>{
      const idSong = buttonfavorite.getAttribute("button-favorite")
      const isActive = buttonfavorite.classList.contains("active");
  
      const typefavorite = isActive ? "unfavorite" : "favorite";
  
      const option = {
        method : "PATCH",
      } 
  
      const link = `/songs/favorite/${typefavorite}/${idSong}`
      fetch(link,option)
        .then(res => res.json())
        .then(data =>{
          if (data.code){
            buttonfavorite.classList.toggle("active")
          }
        })
    })
  })
  
}
//End buton heart

// search Suggest
const boxSearch = document.querySelector(".box-search")
if (boxSearch){
  const input = document.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest")
  input.addEventListener("keyup",()=>{
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;
    fetch(link)
      .then(res => res.json())
      .then(data =>{
        const songs = data.songs;
        if (songs.length > 0){
          boxSuggest.classList.add("show");
            const htmls = songs.map(song => {
              return `
                <a href="/songs/detail/${song.slug}" class="inner-item">
                  <div class = "inner-image">
                    <img src="${song.avatar}">
                  </div>
                  <div class = "inner-info">
                    <div class ="inner-title">${song.title}</div>
                    <div class ="inner-singer"><i class="fa-solid fa-microphone-lines"> ${song.infoSinger.fullName}</i></div>
                  </div>
                </a>
              `
            });
          const boxList = boxSuggest.querySelector(".inner-list")
          boxList.innerHTML = htmls.join("");
        }else{
          boxSuggest.classList.remove("show");
        }
      })
  })

 
}
// End search Suggest


