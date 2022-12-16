const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const qBox = document.querySelector('.qBox');
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const answerList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = infoList[point].name;
  console.log(answerList);
  const answerGroup = document.querySelector('.answerGroup');
  for(let i =0;i<answerList.length;i++){
    let tempLi = document.createElement('li');
    let tempTxt = qnaList[i].q + " " + qnaList[i].a[answerList[i]].answer;
    tempLi.innerText = tempTxt;
    answerGroup.appendChild(tempLi);
  }
  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.webkitAnimation = 'fadeOut 1s';
  qna.style.animation = 'fadeOut 1s';
  setTimeout(()=>{
    result.style.webkitAnimation = 'fadeIn 1s';
    result.style.animation = 'fadeIn 1s';
    setTimeout(()=>{
      qna.style.display = 'none';
      result.style.display = 'block';
    },400);
  });
  setResult();
}

function addAnswer(answerTxt, qIdx, idx){
  const answerBox = document.querySelector('.answerBox');
  const answer = document.createElement('button');

  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  answerBox.appendChild(answer);
  answer.innerHTML = answerTxt;

  answer.addEventListener('click',function(){
    answerList[qIdx] =idx;
    const children = document.querySelectorAll('.answerList');
    qBox.style.webkitAnimation = 'fadeOut 0.5s';
    qBox.style.animation = 'fadeOut 0.5s';
    for(let i=0; i < children.length;i++){
      children[i].style.webkitAnimation = 'fadeOut 0.5s';
      children[i].style.animation = 'fadeOut 0.5s';
    }
    setTimeout(()=>{
      var target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
      qBox.style.webkitAnimation = 'fadeIn 0.5s';
      qBox.style.animation = 'fadeIn 0.5s';
    },450);
  },false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    qBox.style.display = 'none';
    goResult();
    return;
  }

  qBox.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
  }
  const status = document.querySelector('.statusBar');
  status.style.width = (100 / endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.webkitAnimation = 'fadeOut 1s';
  main.style.animation = 'fadeOut 1s';
  setTimeout(()=>{
    qna.style.webkitAnimation = 'fadeIn 1s';
    qna.style.animation = 'fadeIn 1s';
    setTimeout(()=>{
      main.style.display = 'none';
      qna.style.display = 'block';
    },450);
    let qIdx = 0;
    goNext(qIdx);
  },450);
}