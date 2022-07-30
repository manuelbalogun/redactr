let newPostInput = ''
let sectionPostName = ''
let newToggleInput = false
let sectionToggleName = ''
let newRedactrInput = ''
let sectionRedactrName = ''

const handlePostChange = (val, name) => {
  newPostInput = val;
  sectionPostName = name;
  return (sectionPostName, newPostInput);
}
const handleRedartrChange = (val, name) => {
  newRedactrInput = val
  sectionRedactrName = name
  return (sectionRedactrName, newRedactrInput)
}

const handleToggleChange = (val, name) => {
  (val === 'on') ? newToggleInput = true : newToggleInput = false
  sectionToggleName = name;
  return (sectionToggleName, newToggleInput);
}

const joinArray = (array) => {
  const joinedArray = array.join(" ")
  return joinedArray
}

const handleSubmit = (e) => {
  e.preventDefault();
  let encode = 'x'
  let myPostArray = newPostInput.split(" ");

  let myRedactrArray = newRedactrInput.split(" ");

  myRedactrArray.forEach(item => {
    let index;
    if (myPostArray.includes(item)) {
      index = myPostArray.indexOf(item);
    }
    if ((index !== -1) && (index !== undefined)) {
      myPostArray[index] = encode.repeat(item.length)
    }
  })
  let out = joinArray(myPostArray)
  document.getElementById('abc').innerHTML = out;
}

document.getElementById('form').addEventListener("submit", handleSubmit)


