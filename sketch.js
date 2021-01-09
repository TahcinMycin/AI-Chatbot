// python -m http.server


function setup() {
  noCanvas();
  withCredentials: true;
  const bot = new RiveScript();
  bot.loadFile("brain.rive").then(brainReady).catch(brainError);

  function brainReady() {
      console.log("Chatbot is ready!");
      bot.sortReplies();
  }

  function brainError() {
      console.log("Chatbot loading Error!");
  }

  let button = select('#submit');
  let user = select('#user');
  let output = select('#output');
  const speaker = new p5.Speech();

  button.mousePressed(chat);

  function chat() {
      let input = user.value();
      let username = "local-user";

      bot.reply(username, input).then(function(reply) {
          output.html(reply);
          speaker.speak(reply);
      });
      bot.sortReplies();
  }
}
