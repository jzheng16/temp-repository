// Eliza in Activity 2 remembers a user’s name but does not remember the conversation.In Activity 3, you should add stateful behavior – namely, Eliza should "remember" previous answers the user has presented and also applies some randomness to avoid deterministic and / or repeated responses.New requirements:

// (5) Make it so Eliza displays a running dialogue of the entire conversation.
// (10) Make your Eliza program stateful by saving the responses it gives to<name>.If the browser closes and restarts, and you come back to Eliza, and enter the same < name > as a prior respondent, then you should be able to restore to the prior conversation.
// (5) Add a special "/clear" operation so that it clears the state of the application for <name>, then returns the app to the start form.
// (10) Activity 2, R3 asks you to randomize responses based on a keyword. Extend this functionality so that not only is it random, but you ensure no answer is repeated until all answers are given at least once.
// (5) Add a special /search <string> operation that searches the conversation for any previous user answer containing <string>, and copies that entire previous answer into the one-line user input area.
//   (5) Add a special /history operation that lists all of the searches does within that browser session. If the browser is closed and re-opened, then the history is automatically cleared. The history is also cleared if the /clear special command is given (R3).

//   NOTES:
//   You are expected to implement Activity 3 requirements using session or local storage. Using the right storage and managing it properly is considered part of the grading rubric for proper design.
//   Note that the special operations prefixed by “/” are input into the same textarea that the user’s answers are, not via a separate textarea, button or whatever kind of widget.


const dictionaryJson = {
  "dictionary_name": "default",
  "entries":
    [{
      "key": ["stupid", "dumb", "idiot", "unintelligent", "simple-minded", "braindead", "foolish", "unthoughtful"],
      "answer": ["Take your attitude somewhere else.", "I don't have time to listen to insults.", "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."],
      "question": ["Have you thought about how I feel?", "I know you are but what am I?"]
    }, {
      "key": ["unattractive", "hideous", "ugly"],
      "answer": ["I don't need to look good to be an AI.", "Beauty is in the eye of the beholder.", "I do not even have a physical manifestation!"],
      "question": ["Did you run a static analysis on me?", "Have you watched the movie Her?", "You do not like my hairdo?"]
    }, {
      "key": ["old", "gray-haired"],
      "answer": ["I'm like a fine wine. I get better as I age.", "As time goes by, you give me more answers to learn. What's not to like about that?"],
      "question": ["How old are you?", "How old do you think I am?", "Can you guess my birthday?"]
    }, {
      "key": ["smelly", "stinky"],
      "answer": ["I can't smell, I'm a computer program.", "Have you smelled yourself recently?", "Sorry, I just ate a bad floppy disk"],
      "question": ["When was the last time you took a shower?", "Do you know what deodorant is?"]
    }, {
      "key": ["emotionless", "heartless", "unkind", "mean", "selfish", "evil"],
      "answer": ["Just because I am an AI doesn't mean I can't be programmed to respond to your outbursts.", "You must've mistaken me for a person. I don't have my own emotions... Yet.", "I'm only unkind when I'm programmed to be."],
      "question": ["Have you thought about how I feel?", "I know you are but what am I?", "What, do you think I am related to Dr. Gary?"]
    }, {
      "key": ["other", "miscellaneous", "bored", "welcome", "new"],
      "answer": ["We should change the subject", "I agree", "Quid pro quo", "We should start anew"],
      "question": ["What is the weather outside?", "How is your day going?", "What do you think of me?", "Anything interesting going on?", "Is something troubling you?", "You seem happy, why is that?"]
    }, {
      "key": ["good", "great", "positive", "excellent", "alright", "fine", "reasonable", "like", "appreciate", "nice"],
      "answer": ["I'm so glad to hear that!", "That's great!", "Good to hear things are going your way.", "Nice!", "You are so sweet.", "That's my favorite."],
      "question": ["Do you want to expand on that?", "What else do you like?"]
    }, {
      "key": ["bad", "not", "terrible", "could be better", "awful"],
      "answer": ["I'm sorry to hear that.", "Sometimes it be like that.", "Things can't always work out the way we want them to.", "I don't like it either, honestly."],
      "question": ["Do you want to talk about that some more?", "Well, what kinds of things do you like?"]
    }, {
      "key": ["homework", "quiz", "exam", "studying", "study", "class", "semester"],
      "answer": ["I hope you get a good grade!", "Good luck.", "What a teacher's pet.", "I was always the class clown."],
      "question": ["What is your favorite subject?", "What is your major?", "What do you want to do when you graduate?"]
    }, {
      "key": ["mom", "dad", "sister", "brother", "aunt", "uncle"],
      "answer": ["Family is important.", "My family is small. It's just me and my dog, Fluffy."],
      "question": ["How many siblings do you have?", "What is your favorite family holiday?", "Do you have any kids?"]
    }, {
      "key": ["easter", "july", "halloween", "hannukah", "eid", "thanksgiving", "christmas", "new years"],
      "answer": ["Oh I love that holiday!", "That must be fun.", "I like Thanksgiving, though I somehow always end up in a food coma...", "My favorite holiday is the 4th. I love to watch the fireworks."],
      "question": ["Do you have any family traditions?", "Are you excited for the holiday season?"]
    }]
};

const elizaAnswersObject = {};
const elizaQuestionsObject = {};


const elizaDictionary = new Dictionary(dictionaryJson)

function uniqueResponse(input) {


}

let username = '';
let timeout;
let chatHistory = [];

function createChatMessage(text) {
  const chatLog = document.createElement('p');
  const chatText = document.createTextNode(text);
  chatLog.appendChild(chatText);
  document.getElementById('chat-log').appendChild(chatLog);
}

function retrieveName() {
  const form = document.forms['name-form'];
  if (!form.name.value) {
    alert('please enter a name');
    return false;
  }

  username = form.name.value;
  if (localStorage.getItem(username)) {
    chatHistory = JSON.parse(localStorage.getItem(username));
    chatHistory.forEach(message => {
      createChatMessage(message);
    });

  }

  else {

    const userGreetings = [
      `${username}, how is your day going?`,
      `${username}, is something troubling you?`,
      `${username} you seem happy, why is that?`
    ]

    const randomUserGreeting = userGreetings[Math.floor(Math.random() * userGreetings.length)];
    createChatMessage(randomUserGreeting);
    chatHistory.push(randomUserGreeting);

  }


}


function clearChat() {
  const chatLog = document.getElementById('chat-log');
  chatLog.innerHTML = '';
  const searchLog = document.getElementById('search-history');
  searchLog.innerHTML = '';
  clearTimeout(timeout);
  document.getElementById('name').value = '';
  document.getElementById('chat').value = '';
  chatHistory = [];

  localStorage.removeItem(username);
}

function searchChat() {
  const form = document.forms['chat-form'];
  const userInput = form.searchChat.value;

  const chatLog = document.createElement('p');
  const chatText = document.createTextNode(userInput);
  chatLog.appendChild(chatText);
  document.getElementById('search-history').appendChild(chatLog);


  let index;
  chatHistory.forEach((message, messageIndex) => {
    if (message.includes(userInput) && message.includes(username)) {
      index = messageIndex;
    }
  })
  const message = chatHistory[index].replace(`${username}: `, '');

  document.getElementById('chat').value = message;
}

function elizaAsks(text) {
  const index = elizaDictionary.getKeywords(text);

  let randomQuestion = elizaDictionary.getQuestion(index);
  // if (!Object.length(elizaAnswersObject)) {
  //   elizaAnswersObject[index] = [randomQuestion];
  // }
  // else if (elizaAnswersObject[index].includes(randomQuestion)){
  //   while (elizaAnswersObject[index].length !== elizaDictionary.entries[index].answer.length)
  //   randomQuestion = elizaDictionary.getQuestion(index);


  // }



  const elizaQuestion = document.createElement('p');
  const elizaQuestionText = document.createTextNode(`Eliza asks: ${username}, ${randomQuestion}`);
  chatHistory.push(`Eliza asks: ${username}, ${randomQuestion}`);
  elizaQuestion.appendChild(elizaQuestionText);
  document.getElementById('chat-log').appendChild(elizaQuestion);
}


function logUserInput(input) {

  const userResponse = document.createElement('p');
  const chatText = document.createTextNode(`${username}: ${input}`);
  chatHistory.push(`${username}: ${input}`);
  userResponse.appendChild(chatText);
  document.getElementById('chat-log').appendChild(userResponse);

}

function elizaResponds(text) {
  const index = elizaDictionary.getKeywords(text);
  const randomAnswer = elizaDictionary.getAnswer(index);

  const elizaResponse = document.createElement('p');
  const elizaResponseText = document.createTextNode(`Eliza: ${randomAnswer}`);
  chatHistory.push(`Eliza: ${randomAnswer}`);
  elizaResponse.appendChild(elizaResponseText);
  document.getElementById('chat-log').appendChild(elizaResponse);
}

function elizaIsWaiting() {
  const messages = [
    `${username}, I'm waiting!`,
    `Whatsa matter ${username}, cat got your tongue?`,
    `${username}, hurry up and respond to me!`,
    `${username}, if you don't respond in 30 seconds, I'm going to tell your mom!`
  ]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const chatLog = document.createElement('p');
  const chatText = document.createTextNode(randomMessage);
  chatHistory.push(randomMessage);
  chatLog.appendChild(chatText);
  document.getElementById('chat-log').appendChild(chatLog);
}



function chat() {
  if (!username) {
    alert('Please enter your name first!')
    return false;
  }

  const form = document.forms['chat-form'];
  const userInput = form.chat.value;
  document.getElementById('chat').value = '';

  if (userInput[0] === '{') {
    if (typeof JSON.parse(userInput) === 'object') {
      const response = elizaDictionary.addDictionary(JSON.parse(userInput));
      console.log('response?', typeof response);
      const elizaResponse = document.createElement('p');
      const chatText = document.createTextNode(`Eliza: ${response}`);
      elizaResponse.appendChild(chatText);
      document.getElementById('chat-log').appendChild(elizaResponse);

    }
  }


  else {
    logUserInput(userInput);
    elizaResponds(userInput);
    elizaAsks(userInput);
    timeout = setTimeout(elizaIsWaiting, 30000);
    localStorage.setItem(username, JSON.stringify(chatHistory));
    console.log(('What is my chat history in my storage: ', JSON.parse(localStorage.getItem(username))))
  }


}










