const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer = 0;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:30vw; background-color:white;";
    document.body.appendChild(div);
  };
  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameOver();
    clearInterval(timer);
  };
  const nextline = () => {
    if (attempts === 6) gameover();

    attempts += 1;
    console.log(attempts);
    index = 0;
  };

  const handleEnterKey = () => {
    //정답확인
    let 맞은_개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const write = block.innerText;
      const correct = answer[i];

      if (write === correct) {
        block.style.background = "#538d4e";
        맞은_개수 += 1;
      } else if (correct.includes(write)) block.style.background = "red";
      else block.style.background = "#787c7e";
      block.style.color = "white";
    }
    if (맞은_개수 === 5) gameover();
    nextline();
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
