const tableBody = document.querySelector("#table-body");
const tblHead = document.querySelector("thead > tr")


document.addEventListener("DOMContentLoaded", ()=> {
  addRows()
  tableBody.addEventListener('click', delegateHandler)
  tblHead.addEventListener('click', delegateSort)

  console.log(tblHead)
})

function rendRows() {
  let tableBody = document.querySelector("#table-body")
  tableBody.innerHTML = ""
  Group.allTeams().forEach( acapellers => {
    let newTableRow = document.createElement('tr')
    newTableRow.setAttribute('id', `row-${acapellers.id}`)
    newTableRow.setAttribute('data-id', `${acapellers.id}`)
    newTableRow.innerHTML= acapellers.rowRender()
    // console.log(newTableRow)
    // console.log(tableBody)
    tableBody.append(newTableRow)
  }) // end forEach
}


function addRows(){
  fetch('http://localhost:3000/a_cappella_groups')
  .then(res => res.json())
  .then(groups => {
    Group = group()
    groups.forEach(e => {
      let tableBody = document.querySelector("#table-body")
      let acapellers = new Group(e.name, e.membership, e.college)
      let newTableRow = document.createElement('tr')
      newTableRow.setAttribute('id', `row-${acapellers.id}`)
      newTableRow.setAttribute('data-id', `${acapellers.id}`)
      newTableRow.innerHTML= acapellers.rowRender()
      // console.log(newTableRow)
      // console.log(tableBody)
      tableBody.append(newTableRow)
    }) // end forEach
  }) // end groups then
  .catch(error => console.log(error))
}

function delegateHandler(e) {
  if (e.target.className.includes("winner-btn")) {
    let winnerBox = document.querySelector('#winner')
    let winner = Group.findById(Number(e.target.dataset.id))
    let winnerRow = document.getElementById(`row-${e.target.dataset.id}`)
    winnerBox.innerText = `Winner: ${winner.college.name} ${winner.name}`
    let oldWinnerRow = document.getElementById(`row-${winnerBox.dataset.id}`)
    console.log(oldWinnerRow)
    if (oldWinnerRow !== null) {
      winnerBox.dataset.id = winner.id
      Group.hideRow(winnerRow)
      Group.showRow(oldWinnerRow)
    } else {
      winnerBox.dataset.id = winner.id
      Group.hideRow(winnerRow)
    }
  }
  if (e.target.className.includes("delete-btn")) {
    let id = e.target.parentNode.parentNode.dataset.id
    let deleteTarget = document.getElementById(`row-${id}`)
    Group.removeRow(deleteTarget)
  }
}

function delegateSort(e) {
  if (e.target.className.includes("college")) {
    console.log('college')
    let a = Group.sortList('name', true)
    console.log(a)
  } else if (e.target.className.includes("group-name")) {
    console.log('group name')
    Group.sortList('name')
  } else if (e.target.className.includes("membership")) {
    console.log('membership')
    Group.sortList('membership')
  } else if (e.target.className.includes("division")) {
    console.log('divison')
    Group.sortList('division', true)
  }
  rendRows()
}
