const header = document.querySelector("header");
window.addEventListener("scroll", ()=>{
  window.scrollY > 10 ? header.classList.add("active") : header.classList.remove("active") ;
});

const navEls = document.querySelectorAll("header a");
// for(const navEl of navEls){
//   navEl.addEventListener("click",(e)=>{
//     e.preventDefault()
//     const targetPosition = document.querySelector(e.target.dataset.target).offsetTop;
//     window.scrollTo({top:targetPosition,behavior:'smooth'})
//   })
// }
navEls.forEach((el)=>{
  el.addEventListener("click",function(e){
    e.preventDefault()
    const targetPosition = document.querySelector(this.dataset.target).offsetTop;
    window.scrollTo({top:targetPosition, behavior:'smooth'});
  });
});

//필요없는 전역변수의 생성을 줄일 수 있다.
//private한 변수를 만들 수 있다.
(()=>{
  const spanEl = document.querySelector("main h2 span");
  const strArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer']
  let idx = 0;
  let textBox = strArr[idx].split("");
  function writeTxt(){
    spanEl.innerText += textBox.shift();
    if(textBox.length !== 0 ){
      setTimeout(writeTxt,Math.floor(Math.random()*150))
    } else{
      textBox = spanEl.innerText.split("");
      setTimeout(deleteTxt,1000)
    }
  }
  function deleteTxt(){
    textBox.pop();
    spanEl.innerText = textBox.join("");
    if(textBox.length !== 0 ){
      setTimeout(deleteTxt,Math.floor(Math.random()*150))
    }else{
      idx = (idx + 1) % strArr.length;
      textBox = strArr[idx].split("");
      setTimeout(writeTxt,500);
    }
  }
  writeTxt();
})()