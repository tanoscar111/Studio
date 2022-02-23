// Wrap every letter in a span
var textWrappers2 = document.querySelectorAll('.animation-text2');

for (let i = 0; i < textWrappers2.length; i++) {
  textWrappers2[i].innerHTML =textWrappers2[i].textContent.replace(/\S/g, "<span class='letter2' style='opacity:0'>$&</span>");  
}

anime.timeline({loop: 1})
  .add({
    targets: '.animation-text2 .letter2',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => 300 + 30 * i
  })
  // .add({
  //   targets: '.animation-text2 .letter2',
  //   translateY: [0,-100],
  //   opacity: [1,0],
  //   easing: "easeInExpo",
  //   duration: 200,
  //   delay: (el, i) => 100 + 20 * i
  // });