
const videoPlayerElement = [...document.querySelectorAll('[data-js-video-player]')]


export function initVideoPlayer () {
  

videoPlayerElement.forEach((videoPlayer) => {
    const video = videoPlayer.querySelector('[data-js-video-player-video]')
    const videoPanel = videoPlayer.querySelector('[data-js-video-player-panel]')
    const videoButton = videoPlayer.querySelector('[data-js-video-player-play-button]')
   videoButton.addEventListener('click',() => {
        video.play()
        video.controls = true
        videoPanel.classList.remove('is-active')
   })
   video.addEventListener('pause',() => {
    video.controls = false
    videoPanel.classList.add('is-active')
   })
})
}