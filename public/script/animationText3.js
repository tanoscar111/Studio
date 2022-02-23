  // Wrap every letter in a span
  var textWrappers3 = document.querySelectorAll('.animation-text3');
  
  for (let i = 0; i < textWrappers3.length; i++) {
    textWrappers3[i].innerHTML =textWrappers3[i].textContent.replace(/\S/g, "<span class='letter3'>$&</span>");  
  }
  
  anime.timeline({loop: 1})
    .add({
      targets: '.animation-text3 .letter3',
      translateY: [100,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 0 + 100 * i
    })
    // .add({
    //   targets: '.animation-text3 .letter3',
    //   translateY: [0,-100],
    //   opacity: [1,0],
    //   easing: "easeInExpo",
    //   duration: 1200,
    //   delay: (el, i) => 100 + 40 * i
    // });