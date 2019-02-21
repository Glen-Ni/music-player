var currentIndex = 0
var musicList = [
  {
    src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
    title: '玫瑰',
    author: '贰佰',
    cover:
      'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=0098bffd5943fbf2d121ae71d117a1e5/3801213fb80e7bec92239914252eb9389a506b4e.jpg'
  },
  {
    src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
    title: 'IF YOU',
    author: 'Big Bang',
    cover: 'http://cloud.hunger-valley.com/17-9-22/87786461.jpg'
  }
]

function $(selector) {
  return document.querySelector(selector)
}
function formatTime(time) {
  return (
    Math.floor(time / 60)
      .toString()
      .padStart(2, 0) +
    ':' +
    Math.floor(time % 60)
      .toString()
      .padStart(2, 0)
  )
}

// getMusciList(function(list) {
//   console.log(list)
//   loadMusic(list[currentIndes])
// })

var audio = new Audio()
var clock
audio.autoPlay = true

function getMusicList(callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/music.json', true)
  xhr.onload = function() {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      callback(JOSN.parse(this.responseText))
    } else {
      console.log('获取数据失败')
    }
  }
  xhr.onerror = function() {
    console.log('网络异常')
  }
  xhr.send()
}

function loadMusic(musicObj) {
  $('.musicbox .title').innerText = musicObj.title
  $('.musicbox .author').innerText = musicObj.author
  $('.musicbox .cover').style.background = `url(${
    musicObj.cover
  }) center / cover no-repeat`
  audio.src = musicObj.src
}

loadMusic(musicList[currentIndex])

audio.ontimeupdate = function() {
  // console.log(this.currentTime)
  $('.progress .bar-now').style.width =
    (this.currentTime / this.duration) * 100 + '%'
}

audio.onplay = function() {
  clock = setInterval(function() {
    $('.progress .time-now').innerText = formatTime(audio.currentTime)
  }, 1000)
  $('.control .play').children[0].classList.remove('fa-play')
  $('.control .play').children[0].classList.add('fa-pause')
  $('.header .now-playing').style.visibility = 'visible'
}
audio.onpause = function() {
  clearInterval(clock)
  $('.control .play').children[0].classList.remove('fa-pause')
  $('.control .play').children[0].classList.add('fa-play')
  $('.header .now-playing').style.visibility = 'hidden'
}
audio.onended = function () {
  currentIndex = ++currentIndex % musicList.length
  console.log(currentIndex)
  loadMusic(musicList[currentIndex])
  audio.oncanplay = function () {
    audio.play()
    $('.progress .time-total').innerText = formatTime(audio.duration)
  }
}

// 喜欢按钮
$('.header .like-btn').onclick = function() {
  if ($('.header .like-btn').children[0].classList.contains('fa-heart-o')) {
    $('.header .like-btn').children[0].classList.remove('fa-heart-o')
    $('.header .like-btn').children[0].classList.add('fa-heart')
    $('.header .like-btn').children[0].style.color = 'red'
    return
  }
  $('.header .like-btn').children[0].classList.remove('fa-heart')
  $('.header .like-btn').children[0].classList.add('fa-heart-o')
  $('.header .like-btn').children[0].style.color = '#444'
}

// 播放三键
$('.control .play').onclick = function () {
  
  if (audio.paused == true) {
    audio.load()
    audio.oncanplay = function () { // 解决没加载完无法获取duration
      audio.play()
      $('.progress .time-total').innerText = formatTime(audio.duration)
    }
    return
  }
  audio.pause()
}
$('.control .forward').onclick = function() {
  currentIndex = ++currentIndex % musicList.length
  console.log(currentIndex)
  loadMusic(musicList[currentIndex])
  audio.oncanplay = function () {
    audio.play()
    $('.progress .time-total').innerText = formatTime(audio.duration)
  }
}
$('.control .backward').onclick = function() {
  currentIndex = --currentIndex < 0 ? musicList.length - 1 : currentIndex
  console.log(currentIndex)
  loadMusic(musicList[currentIndex])
  audio.oncanplay = function () {
    audio.play()
    $('.progress .time-total').innerText = formatTime(audio.duration)
  }
}

// 进度条
$('.progress .bar').onclick = function(e) {
  console.log(e.offsetX)
  var percent = e.offsetX/ parseInt(getComputedStyle(this).width)
  audio.currentTime = audio.duration * percent
}
