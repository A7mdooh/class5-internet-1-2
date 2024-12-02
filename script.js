const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const characterImg = document.getElementById('character-img');

// الصوت
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');  // إخفاء زر "ابدأ اللعبة" عند البدء
  characterImg.classList.remove('hide'); // إظهار الصورة عند بدء اللعبة
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });

  // تشغيل الصوت المناسب
  if (correct) {
    correctSound.play();
  } else {
    wrongSound.play();
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'إعادة اللعبة';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
const questions = [
  {
    question: 'حدد الشبكة المناسبة لكل حالة، هل هي LAN أم WAN؟ (مركز مصادر التعلم)',
    answers: [
      { text: 'LAN', correct: true },
      { text: 'WAN', correct: false }
    ]
  },
  {
    question: 'حدد الشبكة المناسبة لكل حالة، هل هي LAN أم WAN؟ (مطبخ)',
    answers: [
      { text: 'LAN', correct: true },
      { text: 'WAN', correct: false }
    ]
  },
  {
    question: 'حدد الشبكة المناسبة لكل حالة، هل هي LAN أم WAN؟ (وكالة ناسا)',
    answers: [
      { text: 'LAN', correct: false },
      { text: 'WAN', correct: true }
    ]
  },
  {
    question: 'حدد الشبكة المناسبة لكل حالة، هل هي LAN أم WAN؟ (مستشفى)',
    answers: [
      { text: 'LAN', correct: true },
      { text: 'WAN', correct: false }
    ]
  },
  {
    question: 'حدد الشبكة المناسبة لكل حالة، هل هي LAN أم WAN؟ (محطة فضاء)',
    answers: [
      { text: 'LAN', correct: false },
      { text: 'WAN', correct: true }
    ]
  },
  {
    question: 'تُستخدم شبكة المنطقة المحلية لتوصيل الأجهزة عبر مسافات كبيرة، كالمسافات بين المدن.',
    answers: [
      { text: 'صحيحة', correct: false },
      { text: 'خاطئة', correct: true }
    ]
  },
  {
    question: 'يمكنك توصيل الحاسوب عبر شبكة المنطقة المحلية فقط.',
    answers: [
      { text: 'صحيحة', correct: false },
      { text: 'خاطئة', correct: true }
    ]
  },
  {
    question: 'تغطي شبكات المدارس التي تربط الفصول الدراسية داخل نفس المبنى شبكات منطقة محلية.',
    answers: [
      { text: 'صحيحة', correct: true },
      { text: 'خاطئة', correct: false }
    ]
  },
  {
    question: 'يمكن الوصول إلى الطابعة المتصلة بشبكة منزلية عن طريق أجهزة خارج تلك الشبكة.',
    answers: [
      { text: 'صحيحة', correct: false },
      { text: 'خاطئة', correct: true }
    ]
  },
  {
    question: 'تُستخدم رسائل البريد الإلكتروني المرسلة إلى صديق في بلد آخر شبكة المنطقة المحلية.',
    answers: [
      { text: 'صحيحة', correct: false },
      { text: 'خاطئة', correct: true }
    ]
  },
  {
    question: 'أنت بحاجة إلى Router (موجة) لإنشاء شبكة منطقة محلية.',
    answers: [
      { text: 'صحيحة', correct: true },
      { text: 'خاطئة', correct: false }
    ]
  }
];
