// Add or check for existing Todos
add = document.getElementById("add");
function getAndUpdate() {
  title = document.getElementById("title").value;
  desc = document.getElementById("Description").value;

  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([title, desc]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([title, desc]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  }
  update();
}
function update() {
  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  //populate the table
  tablebody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>
          <button class="btn btn-xsm btn-danger" onclick="deleted(${index})">Delete</button>
        </td>
      </tr>`;
  });
  tablebody.innerHTML = str;
}
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {;
  itemJsonArrayStr = localStorage.getItem("itemJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete itemIndex element from the array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  update();
}

function clearStorage() {
  if (confirm("Do you want to clear the list?")) {
    localStorage.clear();
    update();
  }
}
