const btnAdd = document.querySelector("#btnAdd");
const btnDel = document.querySelector("#btnDel");
const inputText = document.querySelector("#input");




// load previous data
function loadData(){
  const storedData = JSON.parse(localStorage.getItem("data")) || [];
  storedData.forEach((item) => {
    
    addTodoList(item.text,item.complete);
  });
}

window.addEventListener("load", loadData());

// it is add button
btnAdd.addEventListener("click", function () {
  const inputTextValue = inputText.value.trim();
  if (inputTextValue !== "") {
    addTodoList(inputTextValue,false);
    inputText.value = "";
    saveData();
  } else {
    alert("Please enter a value");
  }
});

// Save data after every opertion
function saveData() {
  const listItems = document.querySelector("#list").querySelectorAll("li");
  const dataUpdata = [];
  listItems.forEach((item) => {
    const text = item.querySelector(".text").innerText;
    const flag=item.querySelector("p").classList.contains("textStyle");

    dataUpdata.push({ text: text ,complete:flag});
  });
  localStorage.setItem("data", JSON.stringify(dataUpdata));
}

// add TodList  function
function addTodoList(text,flag) {
  const list = document.querySelector("#list");
  const li = document.createElement("li");

   if(!flag)
   {
    li.innerHTML = `<input type="checkbox"> </input> 
    <p class="text"> ${text}</p>  
    <button id="edit"   onclick="editMyFun(this)">Edit</button> 
    <button class="hide" id="save" onclick="saveMyFun(this)">Save</button> 
    <button onclick="complete(this)">Complete</button>
    <button onclick="delMyFun(this)">Delete</button>`;
   }

   else  
   {
    li.innerHTML = `<input type="checkbox" checked> </input> 
    <p class="text textStyle"> ${text}</p>  
    <button id="edit"   onclick="editMyFun(this)">Edit</button> 
    <button class="hide" id="save" onclick="saveMyFun(this)">Save</button> 
    <button onclick="complete(this)">Complete</button>
    <button onclick="delMyFun(this)">Delete</button>`;

   }      
   
  list.appendChild(li);
}


//  It is complete button
function complete(liCom){
  const li = liCom.parentElement;  
   li.querySelector("p").classList.toggle("textStyle");
   li.querySelector("input").checked=li.querySelector("p").classList.contains("textStyle");
  //  console.log(li);
   saveData();
}


//  It is Delete item individual
function delMyFun(liDel) {
  const li = liDel.parentElement;
  let storedData = JSON.parse(localStorage.getItem("data")) || [];
  li.remove();
  saveData();
}

// it is delete for all select checked item
btnDel.addEventListener("click", function () {
  const listCheck = document.querySelector("#list");
  const listChecks = listCheck.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  listChecks.forEach((listCheck) => listCheck.parentElement.remove());
  saveData();
});

// it is edit button
function editMyFun(liEdit) {
  liEdit.classList.add("hide");
  const saveBtn = liEdit.parentElement.querySelector("#save");
  saveBtn.classList.remove("hide");
  const inputEdit = document.createElement("input");
  inputEdit.classList.add("text");
  inputEdit.type = "text";
  inputEdit.value = liEdit.parentElement.querySelector(".text").innerHTML;
  liEdit.parentElement.querySelector(".text").replaceWith(inputEdit);
}


// it is save button
function saveMyFun(liSave) {
  const editText = liSave.parentElement.querySelector(".text").value.trim();
  if (editText !== "") {
    liSave.classList.add("hide");
    const editBtn = liSave.parentElement.querySelector("#edit");
    editBtn.classList.remove("hide");
    const inputSave = document.createElement("p");
    inputSave.classList.add("text");
    inputSave.innerHTML = editText;
    liSave.parentElement.querySelector(".text").replaceWith(inputSave);
    saveData();
  } else {
    alert("Please enter some text");
  }
}
