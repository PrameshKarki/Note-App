let myNoteTitle = document.getElementById('title');
let myNoteContent = document.getElementById('note');
let addNoteBtn = document.getElementById('addNote');
let noteObject;
showNotes();
addNoteBtn.addEventListener('click', function (e) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObject = [];

    }
    else {
        noteObject = JSON.parse(notes);
    }
    //Define Object
    let tempObject = {
        content: "",
        title: '',
        date: ''
    }
    tempObject.content = myNoteContent.value;
    if (tempObject.content.length != 0) {
        tempObject.title = myNoteTitle.value;
        tempObject.date = currentDate();
        noteObject.push(tempObject);
        localStorage.setItem('notes', JSON.stringify(noteObject));
        myNoteTitle.value = '';
        myNoteContent.value = '';
        showNotes();


    }


    else {
        console.log('Empty Note!');
    }
})

//Function that returs current date
function currentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    today = dd + '/' + mm + '/' + yy;
    return today;
}


//Function to show Notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObject = [];
    }
    else {
        noteObject = JSON.parse(notes);
    }
    let gridContainer = document.getElementById('gridContainer');
    let html = '';
    noteObject.forEach(function (element, index) {
        html += `<div class="noteCard">
                <div class="heading">
              <p>Note No:${index + 1}</p>
              <p>Title:${element.title}</p>
              <p>Date:${element.date}</p>
            </div>
            <div class="content">
              <p>${element.content}</p>
            </div>
            <button id=${index} onclick=deleteNote(this.id) class="deleteBtn">Delete Note</button>
          </div>`
    });
    if (noteObject.length != 0) {
        gridContainer.innerHTML = html;

    }
    else {
        gridContainer.innerHTML = `Container is Empty!`;
    }

}
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObject = [];
    }
    else {
        noteObject = JSON.parse(notes);
    }
    noteObject.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteObject));
    showNotes();
}
let search = document.getElementById('search');
search.addEventListener('input', function (e) {
    let noteCard = document.getElementsByClassName('noteCard');
    console.log(noteCard);
    Array.from(noteCard).forEach(function (element) {
        let noteText = element.getElementsByTagName('p')[3].innerText;
        if (noteText.includes(search.value)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = "none";
        }
    })

})

