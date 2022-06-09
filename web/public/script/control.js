let startBtn = document.querySelector('.js-start-btn');
let htpButton = document.querySelector('.how-to-play-button')



htpButton.addEventListener("click", function(e){
    Swal.fire({
        template: '#modal'
      })
})




// startBtn.addEventListener('click',function(e){
//     alert(e.target);
// })