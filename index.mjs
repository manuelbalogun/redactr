//----------variables to cache app data --------- 
let newPostInput = ''
let sectionPostName = ''
let newToggleInput = false
let sectionToggleName = ''
let newRedactrInput = ''
let sectionRedactrName = ''
let dataArray = []
let dataObj = {
  allWords: 0,
  scrambledWords: 0,
  time: 0,
}



//---------query selected elements----------------
let postInput = document.querySelector(".post")
let checkbox = document.querySelector(".toggleScramble")
let popup = document.querySelector(".redactr-text");
let closePopup = document.querySelector(".close-btn");
let createPostButton = document.querySelector(".submit");



//----------- disable redact checkbox when input is empty -------------------
checkbox.disabled = true;



//----------- save the value of the text area each time a user types--------------
const handlePostChange = (val, name) => {
  newPostInput = val;
  sectionPostName = name;
  // ------- reactivate redact checkbox when textarea is not empty------
  checkbox.disabled = false
  return (sectionPostName, newPostInput);
}


//------------ save the value of the redact popup input when a user types--------------
const handleRedartrChange = (val, name) => {
  newRedactrInput = val
  sectionRedactrName = name
  return (sectionRedactrName, newRedactrInput)
}

//------------- show redactr input popup modal when checkbox is checked by user-----------
let unscrambledText;
const handleToggleChange = () => {
  // only show redactr modal if text exist inside the textarea
  if (postInput.value.length > 0) {
    (checkbox.checked) ?
      (unscrambledText = postInput.value, popup.classList.toggle("none")) :
      (postInput.value = unscrambledText, dataArray = [], dataObj = { allWords: 0, scrambledWords: 0, time: 0 }, postInput.style.pointerEvents = "")
  } else {
    alert("please enter text to redact")
    checkbox.checked = false;
  }
}


//-------------close the popup modal that is shown when checkbox is checked------------
const closeModal = () => {
  popup.classList.toggle("none")
  checkbox.checked = false;
}


const closeStats = () => {
  document.querySelector('.stats-popup').classList.toggle("none")
}

//-------------- checks if a text area values has a punctuaution attached to it-------------------
const hasPunctuations = (word) => {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  return !!(word.match(regex))
}


//------------ this function handles joining  array items to become strings------------
const joinArray = (array) => {
  const joinedArray = array.join(" ")
  return joinedArray
}



//----------- this function scrambles the text of the text area -----------------
const scrambleTexts = () => {
  let startTime = Date.now(); 

    
  let encode = '*'  //symbol to be used to represent letters in scrambled words
  let myPostArray = newPostInput.split(" ");
  let myRedactrArray = newRedactrInput.split(" ");

  let scrambledWords = 0;
  myPostArray.forEach((item, index) => {
    hasPunctuations(item) ? item = item.substr(0, item.length - 1) : ""
    if (myRedactrArray.includes(item)) {
      scrambledWords++
      myPostArray[index] = encode.repeat(item.length)
    }
  })
  dataObj.scrambledWords = scrambledWords;


  let output = joinArray(myPostArray)
  postInput.value = output
  popup.classList.toggle("none")
  postInput.style.pointerEvents = "none" //stop a user from adding texts when checkbox is checked
  // let timeTaken = (Date.now() - startTime) * 0.001; // in seconds
  let timeTaken = Date.now() - startTime; // in milliseconds
  dataObj.time = timeTaken;
}



//---------------make a post on the app---------------------//
const makePost = () => {
  let myPostArray = newPostInput.split(" ");
  dataObj.allWords = myPostArray.length
  dataArray = [dataObj]
  console.log(dataArray)
  postInput.value.length < 1 ? "" :
    document.querySelector(".all-posts").innerHTML += `
      <div class="user-post">
        <span class="image-border">
          <img src="./assets/avatar.png" alt="avatar" />
        </span>
        
        <div class="post-content">
          <h5 class="email"><span class="email-first-name">Janet</span>@janet.dev</h5>
          <h5 class="small date">Aug 21, 2022</h5>
          <h5 class="text-value">${postInput.value}</h5>
          <div class="post-icons">
            <img data-length=${dataArray[0].allWords} data-scrambled=${dataArray[0].scrambledWords} data-time=${dataArray[0].time} class="stats" src="./assets/stats.png" alt="icon" />
            <img src="./assets/comments.png" alt="icon" />
            <img src="./assets/like.png" alt="icon" />
          </div>
        </div>
      </div>`
  postInput.value = ""
  checkbox.checked = false;
  postInput.style.pointerEvents = ""
  document.querySelector('.close-stats-btn').addEventListener("click", closeStats)
  document.querySelectorAll('.stats').forEach(item => {
    item.addEventListener("click", displayStats)
  })
  dataObj = { allWords: 0, scrambledWords: 0, time: 0, }

}


//------------ function that displays nav on mobile------------
const displayNav = () => {
  document.querySelector('.list-items').classList.toggle("hide-nav")
}

const displayStats = (e) => {
  document.querySelector('.stats-popup').classList.toggle("none")
  let allWords = e.target.getAttribute('data-length');
  let dataScrambled = e.target.getAttribute('data-scrambled');
  let dataTime = e.target.getAttribute('data-time');
  document.querySelector('.total-words').textContent = allWords;
  document.querySelector('.total-words-scrambled').textContent = dataScrambled;
  document.querySelector('.total-time').textContent = `${dataTime} ms` ;

}


//------------- subscribe to event listeners -----------------------
document.querySelector('.redact-btn').addEventListener("click", scrambleTexts)
createPostButton.addEventListener("click", makePost)
closePopup.addEventListener("click", closeModal)
document.querySelector('.hamburger').addEventListener("click", displayNav)
