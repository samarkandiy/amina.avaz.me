const quizCount = 5;
const confetti = new JSConfetti();
const quizElement = document.querySelector( '.quiz' );
const generatorElements = document.querySelectorAll( '.generators button' );

function generateQuiz({ operator, min, max }) {
  quizElement.removeAttribute( 'data-state' );

  let items = [];
  let range = max - min;
  
  let map = {};
  let loops = 0;
  
  while( items.length < quizCount && loops++ < 500 ) {
    let a = min + Math.round(Math.random() * range);
    let b = min + Math.round(Math.random() * range);
      
    // prevent dupes
    let key = a + 'x' + b;
    if( map[key] ) continue;
    map[key] = true;

    let answer;
    let op = operator;

    if( operator === '+' ) {
      answer = a + b;
    }
    else if( operator === '-' ) {
      if( a < b ) [a, b] = [b, a];
      answer = a - b;
    }
    else if( operator === '*' ) {
      op = '×';
      answer = a * b;
    }

    items.push(`
    <tr class="quiz-item" data-correct-answer="${answer}">
      <td style="text-align: right;">${a}</td>
      <td>${op}</td>
      <td style="text-align: left;">${b}</td>
      <td>=</td>
      <td><input type="tel" class="quiz-item-answer" placeholder="0" maxlength="4" /></td>
    </tr>
    `);
  }

  quizElement.innerHTML = items.join( '' );
}

function onAnswerChanged( event ) {
  if( event.target.matches('.quiz-item-answer') ) {
    const item = event.target.closest( '.quiz-item' );
    const value = parseInt(event.target.value, 10);

    item.removeAttribute( 'data-state' );

    if(typeof value === 'number' && !isNaN(value)) {
      const correctAnswer = parseInt(item.getAttribute('data-correct-answer'), 10);
      if(value === correctAnswer) {
        item.setAttribute( 'data-state', 'correct' );
        if( item.nextElementSibling ) {
          item.nextElementSibling.querySelector( 'input' ).focus();
        }
      }
      else if( event.type === 'focusout' ) {
        item.setAttribute( 'data-state', 'incorrect' );
        runAnimation( item, 'headShake' );
      }
    }
  }

  if( event.type === 'input' ) {
    checkIfTestIsCompleted();
  }
}

function onTestCompleted() {
  confetti.addConfetti();
  runAnimation( quizElement, 'tada' );
}

function generateQuizForButton( button ) {
  generatorElements.forEach( el => el.classList.remove( 'selected' ) );

  button.classList.add( 'selected' );

  localStorage.setItem( 'current-qid', button.getAttribute( 'data-qid' ) );

  generateQuiz({
    operator: button.getAttribute( 'data-operator' ),
    min: parseInt( button.getAttribute( 'data-min' ), 10 ),
    max: parseInt( button.getAttribute( 'data-max' ), 10 )
  });
}

function regenerateCurrentQuiz() {
  let id = localStorage.getItem( 'current-qid' );
  if( id ) {
    generateQuizForButton( document.querySelector( '[data-qid="'+ id +'"]' ) );
  }
  else {
    generateQuizForButton( generatorElements[0] );
  }
}

function checkIfTestIsCompleted() {
  if( document.querySelector( '.quiz-item:not([data-state="correct"])' ) === null ) {
    quizElement.setAttribute( 'data-state', 'completed' );
    onTestCompleted();
    if( document.activeElement ) document.activeElement.blur();
  }
}

function runAnimation( element, name ) {
  element.classList.remove( 'animate__animated', 'animate__' + name );
  setTimeout(() => {
    element.classList.add( 'animate__animated', 'animate__' + name );
  }, 1);
}

function focusFirstQuizItem() {
  document.querySelectorAll( '.quiz-item input' )[0].focus();
}

quizElement.addEventListener( 'input', onAnswerChanged );
quizElement.addEventListener( 'focusout', onAnswerChanged );

document.querySelector( '.restart' ).addEventListener( 'click', event => {
  runAnimation( quizElement, 'bounceIn' );
  regenerateCurrentQuiz();
  focusFirstQuizItem();
} );

generatorElements.forEach( button => {
  button.onclick = (event) => {
    runAnimation( quizElement, 'bounceIn' );
    generateQuizForButton( button );
    if(!event.shiftKey) focusFirstQuizItem();
  };
} )

regenerateCurrentQuiz();