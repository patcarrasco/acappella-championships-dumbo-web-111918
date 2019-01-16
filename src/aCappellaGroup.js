const group = () => {
  let id = 0

  fullList = []

  return class {
    constructor(name, membership, college) {
      this.name = name
      this.membership = membership
      this.college = college
      this.id = id++
      this.addToFullList()
    }

    addToFullList() {
      fullList.push(this)
    }

    rowRender() {
      return `
      <td>
      <button class="btn btn-warning btn-sm delete-btn"> delete </button>
      ${this.college.name}
      </td>
      <td>${this.name}</td>
      <td>${this.membership}</td>
      <td>${this.college.division}</td>
      <td><input type='image' src='./assets/trophy.png' data-id='${this.id}' name='saveForm' class='winner-btn submit'/></td>
      `
    }

    static hideRow(element) {
      element.style.display = "none"
    }

    static showRow(element) {
      element.style.display = ""
    }

    static removeRow(element) {
      let tableBody = document.querySelector(".table-body")
      // console.log(tableBody.children)
      // console.log(element)
      tableBody.removeChild(element)
      this.deleteTeam(element.dataset.id)
    }

    static findById(iden) {
      return fullList.find((e) => e.id === iden)
    }

    static deleteTeam(id) {
      fullList = fullList.filter(e => {
        return Number(e.id) != Number(id)
      })
      console.log(fullList)
    }

    static sortList(sortedby, college = false) {
      if (college){
        fullList = fullList.sort((a, b) => a.college[sortedby].localeCompare(b.college[sortedby], undefined, {numeric: true}))
      } else {
        fullList = fullList.sort((a, b) => a[sortedby].localeCompare(b[sortedby], undefined, {numeric: true}))
      }
      console.log(fullList)
    }

    static allTeams() {
      return fullList
    }
  }
}
