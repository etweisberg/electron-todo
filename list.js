const electron = require("electron");
const { ipcRenderer } = electron;
const ul = document.querySelector("ul");

//catch add item
ipcRenderer.on("item:add", function (e, item, date) {
  ul.className = "collection";
  //making list item
  const li = document.createElement("li");
  li.className = "collection-item";

  //making row
  const row = document.createElement("div");
  row.className = "row";

  //making left col
  const leftDiv = document.createElement("div");
  leftDiv.className = "col s4";
  const form = document.createElement("form");
  form.action = "#";
  const label = document.createElement("label");
  const span = document.createElement("span");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  label.appendChild(checkBox);
  label.appendChild(span);
  form.appendChild(label);
  leftDiv.appendChild(form);

  //making mid col
  const midDiv = document.createElement("div");
  midDiv.className = "col s4";
  const itemText = document.createTextNode(item);
  midDiv.appendChild(itemText);

  //making right col
  const dateText = document.createTextNode(date);
  const rightDiv = document.createElement("div");
  rightDiv.className = "col s4";
  rightDiv.appendChild(dateText);

  row.appendChild(leftDiv);
  row.appendChild(midDiv);
  row.appendChild(rightDiv);

  //adding columns to list
  li.appendChild(row);

  ul.appendChild(li);
});

//catch clear items
ipcRenderer.on("item:clear", function (e) {
  ul.innerHTML = "";
  ul.className = "";
});

//Remove item
ul.addEventListener("checkbox", removeItem);
function removeItem(e) {
  console.log(123);
}
