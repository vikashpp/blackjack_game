//challange 1
function ageInDays(){
  var birthYear = prompt('Enter the year you were born');
  var numberOfDays= (2018 - birthYear) *365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are '+ numberOfDays +' old');
  console.log(numberOfDays);
  h1.setAttribute('id','numberOfDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset()
{
  document.getElementById('numberOfDays').remove();
}

//challange 2
function generateCat()
{
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

//chaLLange 3
function rpsGame(yourChoice){
  var botChoice, humanChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(ranToRpsInt());
  var result = decideWinner(humanChoice, botChoice);
  var printMessage = finalMessaage(result);
  console.log(printMessage.message);
  rpsFroontEnd(humanChoice, botChoice, printMessage);
}

function ranToRpsInt(){
  return Math.floor(Math.random() * 3);
}

function  numberToChoice(number){
  return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
  var rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
  }
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];
  return [yourScore, computerScore];
}

function finalMessaage([yourScore, computerScore]){
  if(yourScore === 0)
  {
    return{'message': 'You Lost', 'color': 'red'}
  }
  else if (yourScore === 0.5)
  {
    return{'message': 'You Tied', 'color': 'yellow'}
  }
  else
  {
    return{'message': 'You Won', 'color': 'green'}
  }
}

function rpsFroontEnd(humanImageChoice, botImageChoice, finalMessage)
{
  var imageDatabase =
  {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  }

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height = '150px' width = '100px' style='box-shadow: 0px 0px 51px -1px rgba(17, 1, 198, 1);'>";
  botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height = '150px' width = '100px' style='box-shadow: 0px 0px 51px -1px rgba(249, 1, 1, 1);'>";
  messageDiv.innerHTML = "<h1 style= 'color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

//Challange 4

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for(let i=0; i < all_buttons.length; i++)
{
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThing)
{
  if (buttonThing.value === 'red')
  {
    buttonsRed();
  }
  else if (buttonThing.value === 'green')
  {
    buttonsGreen();
  }
  else if (buttonThing.value === 'reset')
  {
    buttonsReset();
  }
  else if (buttonThing.value === 'random')
  {
    buttonsRandom();
  }
}

function buttonsRed(){
  for(let i=0; i<all_buttons.length; i++)
  {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen(){
  for(let i=0; i<all_buttons.length; i++)
  {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonsReset(){
  for(let i=0; i<all_buttons.length; i++)
  {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function buttonsRandom(){
  let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

  for(let i=0; i < all_buttons.length; i++)
  {
    let randomNumber = Math.floor(Math.random()*4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}


//Challange 5

let blackjackGame = {
  'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
  'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
  'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardsMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K': 10,'J': 10,'Q': 10,'A':[1,11]},
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'hasHit': false,
  'isStand': false,
  'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a');
const loseSound = new Audio('static/sounds/aww.mp3');
const winSound = new Audio('static/sounds/cash.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

function blackjackHit()
{
  if(blackjackGame['isStand'] === false)
  {
    let card = randomCard();
    showCard(YOU,card);
    updateScore(YOU, card);
    showScore(YOU);
    blackjackGame['hasHit'] = true;
  }
  
}

function showScore(player)
{
  if(player['score']<=21)
  {
    document.querySelector(player['scoreSpan']).innerText = player['score'];
  }
  else
  {
    document.querySelector(player['scoreSpan']).style.color = 'red';
    document.querySelector(player['scoreSpan']).style.fontFeatureSettings = 'bold';
    document.querySelector(player['scoreSpan']).innerText = "BUST!!";
  }
}

function blackjackStand()
{
  if(blackjackGame['turnsOver'] === false && blackjackGame['hasHit'] === true)
  {
    blackjackGame['isStand'] = true;
    dealersTurn();
    blackjackGame['turnsOver'] = true;
  }
}


function blackjackDeal()
{
  if(blackjackGame['turnsOver'] === true)
  {
    blackjackGame['isStand'] = false;
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (i=0; i<yourImages.length; i++)
      yourImages[i].remove();

    for (i=0; i<dealerImages.length; i++)
      dealerImages[i].remove();

    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = "white";
    document.querySelector('#dealer-blackjack-result').style.color = "white";
    document.querySelector('#blackjack-result').textContent = "Let's Play";
    document.querySelector('#blackjack-result').textContent = "Let's Play";

    blackjackGame['turnsOver'] = false;
    blackjackGame['hasHit'] = false;
  }
}

function showCard(activePlayer, card)
{
  if(activePlayer['score'] <= 21)
  {
    cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    cardImage.height = '120';
    cardImage.width = '80';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function sleepAsync(ms)
{
  return new Promise(resolve => setTimeout(resolve,ms));
}
function sleep(millis) 
{
  var date = new Date();
  var curDate = null;
  do 
  {
    curDate = new Date();
  }
  while (curDate - date < millis);
}

function dealersTurn()
{
  let card = randomCard();
  showCard(DEALER,card);
  updateScore(DEALER, card);
  showScore(DEALER);
  var t=setTimeout(function ()
  {
  if(DEALER['score'] >= 15)
  { 
    let winner = computeWinner();
    showResult(winner);
  }
  else if(DEALER['score'] < 15)
  {
    dealersTurn();
  }
  },1000);
}

function randomCard()
{
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];

}

function updateScore(activePlayer, card)
{
  if(card == 'A')
  {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21)
    {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    }
    else
    {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
    
  }
  else if(activePlayer['score'] < 21)
  {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function computeWinner()
{
  let winner;

  if (YOU['score'] <= 21)
  {
    if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21)
    {
      blackjackGame['wins']++;
      winner = YOU;
    }
    else if(YOU['score'] < DEALER['score'])
    {
      blackjackGame['losses']++;
      winner = DEALER;
    }
    else if(YOU['score'] === DEALER['score'])
    {
      blackjackGame['draws']++;
    }
  }
  else if(YOU['score'] > 21 && DEALER['score']<=21)
  {
    blackjackGame['losses']++;
    winner = DEALER;
  }
  else if(YOU['score'] > 21 && DEALER['score'] > 21)
  {
    blackjackGame['draws']++;
  }
  return(winner);
}

function showResult(winner)
{
  if(winner === YOU)
  {
    message = 'You won!';
    messageColor = 'green';
    winSound.play();
  }
  else if(winner === DEALER)
  {
    message = 'You lost!';
    messageColor = 'red';
    loseSound.play();
  }
  else
  {
    message = 'You drew!'
    messageColor = 'black';
  }

  document.querySelector('#wins').textContent = blackjackGame['wins'];
  document.querySelector('#losses').textContent = blackjackGame['losses'];
  document.querySelector('#draws').textContent = blackjackGame['draws'];
  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}
