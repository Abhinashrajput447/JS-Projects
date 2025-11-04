const containerEl = document.querySelector(".container");

const carrers = ["Softare Engineer","Youtuber", "Web Devloper", "Freelancer"];

let carrerIdx = 0;
let charactorIdx = 0;
updateText();

function updateText() {
  charactorIdx++;
  const word = carrers[carrerIdx];
  const firstLetter = word[0].toUpperCase();
  const isVowel = ['A','E','I','O','U'].includes(firstLetter);

  containerEl.innerHTML = `<h1>I'm ${isVowel ? 'an' : 'a'} ${word.slice(0,charactorIdx)}</h1>`;

  if(charactorIdx === carrers[carrerIdx].length) {
    carrerIdx++;
    charactorIdx = 0;
  }

  if(carrerIdx === carrers.length) {
    carrerIdx = 0;
  }

  setTimeout(updateText, 400);
}