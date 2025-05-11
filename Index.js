<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Online Entrance Exam</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
    .container { max-width: 900px; margin: auto; padding: 20px; background: white; }
    #startScreen, #quizScreen, #resultScreen { display: none; }
    .question img { max-width: 100%; height: auto; }
    .options { list-style: none; padding: 0; }
    .options li { margin-bottom: 10px; }
    #timer { font-size: 20px; font-weight: bold; float: right; }
    .button { background: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer; margin-top: 20px; }
    .button:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="container">
    <div id="startScreen">
      <h1>Entrance Exam</h1>
      <p>This exam has 120 questions, each worth 1 mark. You have 120 minutes to complete the exam.</p>
      <button class="button" onclick="startTest()">Start Test</button>
    </div><div id="quizScreen">
  <div id="timer">Time: 120:00</div>
  <h2 id="qNo"></h2>
  <div class="question">
    <img id="qImage" src="" alt="Question Image" />
    <ul class="options">
      <li><input type="radio" name="option" value="0"> <span id="opt0"></span></li>
      <li><input type="radio" name="option" value="1"> <span id="opt1"></span></li>
      <li><input type="radio" name="option" value="2"> <span id="opt2"></span></li>
      <li><input type="radio" name="option" value="3"> <span id="opt3"></span></li>
    </ul>
  </div>
  <button class="button" onclick="nextQuestion()">Next</button>
  <button class="button" onclick="finishTest()">Finish Test</button>
</div>

<div id="resultScreen">
  <h2>Test Completed!</h2>
  <p>Your score is: <span id="score"></span> / 120</p>
</div>

  </div>  <script>
    const questions = Array.from({ length: 120 }, (_, i) => ({
      image: `https://via.placeholder.com/600x200?text=Question+${i + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: Math.floor(Math.random() * 4) // Random correct option
    }));

    let current = 0;
    let score = 0;
    let answers = Array(120).fill(null);
    let timer;
    let timeLeft = 120 * 60;

    function startTest() {
      document.getElementById('startScreen').style.display = 'none';
      document.getElementById('quizScreen').style.display = 'block';
      showQuestion();
      timer = setInterval(updateTimer, 1000);
    }

    function showQuestion() {
      const q = questions[current];
      document.getElementById('qNo').innerText = `Question ${current + 1}`;
      document.getElementById('qImage').src = q.image;
      q.options.forEach((opt, idx) => {
        document.getElementById(`opt${idx}`).innerText = opt;
        document.querySelector(`input[value='${idx}']`).checked = (answers[current] === idx);
      });
    }

    function nextQuestion() {
      saveAnswer();
      if (current < questions.length - 1) {
        current++;
        showQuestion();
      }
    }

    function saveAnswer() {
      const selected = document.querySelector('input[name="option"]:checked');
      if (selected) answers[current] = parseInt(selected.value);
    }

    function finishTest() {
      saveAnswer();
      clearInterval(timer);
      score = answers.reduce((acc, val, idx) => val === questions[idx].answer ? acc + 1 : acc, 0);
      document.getElementById('quizScreen').style.display = 'none';
      document.getElementById('resultScreen').style.display = 'block';
      document.getElementById('score').innerText = score;
    }

    function updateTimer() {
      if (timeLeft <= 0) {
        finishTest();
        return;
      }
      timeLeft--;
      const min = Math.floor(timeLeft / 60);
      const sec = timeLeft % 60;
      document.getElementById('timer').innerText = `Time: ${min}:${sec.toString().padStart(2, '0')}`;
    }

    document.getElementById('startScreen').style.display = 'block';
  </script></body>
</html>
