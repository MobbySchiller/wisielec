const elements = {
    titleSign: document.querySelector(".title"),
    startBtn: document.querySelector(".start-button"),
    gameDisplay: document.querySelector(".game-display"),
    categorySpan: document.querySelector(".category span"),
    wordSpan: document.querySelector(".word"),
    img: document.querySelector("img"),

    endGameDisplay: document.querySelector(".end-game"),
    gameResult: document.querySelector(".result"),
    restartBtn: document.querySelector(".play-again-button")
}

const lists = {
    keys: [...document.querySelectorAll(".key")],
    words: ["polska", "niemcy", "wielka brytania", "stany zjednoczone", "erytrea", "zimbabwe", "zjednoczone emiraty arabskie", "san marino", "korea południowa", "kazachstan", "argentyna", "honduras", "norwegia", "mongolia", "budapeszt", "kraków", "frankfurt", "dekarz", "tokarz", "nauczyciel", "programista", "aktor", "kaskader", "kierowca", "skazani na shawshank", "batman", "christian bale", "tomasz karolak", "scenariusz", "forrest gump", "tom hanks", "anna hathaway", "kapitan ameryka", "dwunastu ludzi gniewnych", "ojciec chrzestny", "pulp fiction", "władca pierścieni", "cezary pazura", "max verstappen", "iga świątek", "roger federer", "rafael nadal", "novak djoković", "agnieszka radwańska", "robert lewandowski", "lionel messi", "cristiano ronaldo", "siatkówka plażowa", "kombinacja norweska", "skoki narciarskie", "kamil stoch", "łyżwiarstwo figurowe", "spaghetti", "durszlak", "maggi", "ramen", "kotlet schabowy", "mizeria", "hamburger"],
    cat: ["państwo","państwo","państwo","państwo","państwo","państwo","państwo","państwo","państwo","państwo","państwo","państwo","państwo","państwo","miasto","miasto","miasto","zawód","zawód","zawód","zawód","zawód","zawód","zawód","film","film","film","film","film","film","film","film","film","film","film","film","film","film","sport","sport","sport","sport","sport","sport","sport","sport","sport","sport","sport","sport","sport","sport","kuchnia","kuchnia","kuchnia","kuchnia","kuchnia","kuchnia","kuchnia"],
    guessWordLetters: [],
    spans: []
}

const guess = {
    word: "",
    wordLetters: [],
    spans: []
}

const stats = {
    number: 0,
    point: 0
}

function clearGame() {
    guess.word = "";
    guess.wordLetters.length = "0";
    guess.spans.length = "0";
    elements.wordSpan.textContent = "";
    stats.number = 0;
    stats.point = 0;
    elements.img.src = `img/mistake${stats.number}.jpg`;
}

function displayWord(index) {
        const newSpan = document.createElement("span");
        newSpan.textContent = guess.word.charAt(index);
        guess.spans.push(newSpan);
        elements.wordSpan.appendChild(newSpan);
}

function drawWord() {
    clearGame();
    const index = Math.floor(Math.random() * lists.words.length);
    guess.word = lists.words[index];

    for (let i = 0; i < guess.word.length; i++) {
        guess.wordLetters.push(guess.word.charAt(i));

        displayWord(i)
    };

    const guessCategory = lists.cat[index];
    elements.categorySpan.textContent = guessCategory;
};


function checkLetter(e) {
    const userPick = e.target.textContent;
    e.target.classList.add("disappear");

    if ((guess.wordLetters.indexOf(userPick) < 0) && (stats.number < 12)) {
        elements.img.src = `img/mistake${++stats.number}.jpg`;
    }
    
    const searching = guess.wordLetters.map(letter => letter == userPick);

    for (let i = 0; i < guess.wordLetters.length; i++) {

        if (searching[i] == true) {
            guess.spans[i].classList.add("visible");
            stats.point++;
        };
};
window.setTimeout(checkResult, 3000);
};

function checkResult() {
    if (stats.number < 12 && stats.point == guess.word.split(" ").join("").length) {
        elements.gameResult.textContent = "WYGRAŁEŚ!"
        endGame();
    } else if (stats.number == 12) {
        elements.gameResult.textContent = "PRZEGRAŁEŚ!"
        lists.spans.forEach(letter => letter.classList.add("visible"));
        endGame();
    }
};

function startGame() {
    elements.titleSign.classList.add("active");
    elements.startBtn.classList.add("started");
    elements.gameDisplay.classList.add("go-up");
    
    typer();
    drawWord();
};

function endGame() {
    elements.endGameDisplay.classList.add("visible");
    elements.titleSign.classList.add("blur");
    elements.gameDisplay.classList.add("blur");
    
    typer();
};

function restartGame() {
    lists.keys.forEach(key => key.classList.remove("disappear"));
    elements.endGameDisplay.classList.remove("visible");
    elements.titleSign.classList.remove("blur");
    elements.gameDisplay.classList.remove("blur");

    typer();
    drawWord();
}

function typer() {
    lists.keys.forEach(key => key.addEventListener('click', checkLetter));
}
elements.startBtn.addEventListener('click', startGame);
elements.restartBtn.addEventListener('click', restartGame);