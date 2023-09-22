let index = 0;
let attempts = 0;
let timer = 0;

//앱이 시작할 때 함수
function appStart() {
  //게임이 끝났을 때 멘트를 보여주는 함수
  const displayGameOver = () => {
    //div라는 변수는 문서에서 div라는 요소를 만든다
    const div = document.createElement("div");
    //div안에 텍스트를 넣어줌
    div.innerText = "게임이 종료되었습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:30vw; background-color:white;";
    //body태그 안에 위에서 만든 div를 넣어줌
    document.body.appendChild(div);
  };
  //게임이 끝났을 때 함수
  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameOver();
    //타이머를 멈춰주는 것
    clearInterval(timer);
  };
  //다음줄로 넘겨주는 함수
  const nextline = () => {
    attempts += 1;
    if (attempts === 6) gameover();
    index = 0;
  };
  //Enter를 눌렀을 때 함수
  const handleEnterKey = async () => {
    let 맞은_개수 = 0;
    //서버에 정답을 받아오는 비동기 로직 (응답, 정답 부분)
    //파이썬에서 받아온 정답을 받아오기 위해서
    //await을 쓸 때 33절 async부분을 사용해줘야함
    //(서버에서 서버로 요청보낸다음에 응답이 올 때까지 기다림)
    //fetch는 javaScript에서 서버로 요청을 보낼 때 쓰는 함수
    //"/answer"라는 경로로 요청을 보낼 것
    //즉, answer이라는 경로에서 받아온 답을 기다려서 업뎃을 함
    const 응답 = await fetch("/answer");
    //안에 있는 정답을 판단하는 것
    //그 응답을 json으로 포맷으로 바꿈(자바스크립트에 맞게 바꿔준다)
    //javascript objuct nootation의 줄인말
    const 정답_객체 = await 응답.json();
    const 정답 = 정답_객체.answer;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "#6aaa64";
      } else if (정답.includes(입력_글자)) block.style.background = "#c9b458";
      else block.style.background = "#787c7e";

      block.style.color = "white";
    }
    if (맞은_개수 === 5) gameover;
    else nextline();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlcok = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlcok.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    const thisBlcok = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlcok.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const start_time = new Date(); //시작시간

    function setTime() {
      const now_time = new Date(); //현재시간
      const last_time = new Date(now_time - start_time); //흐른시간

      const min = last_time.getMinutes().toString().padStart(2, "0");
      const sec = last_time.getSeconds().toString().padStart(2, "0");

      const time = document.querySelector(".time");
      time.innerText = `time ${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handlekeydown);
}

appStart();
