const notesList = document.getElementById('notes-list');
const noteTextarea = document.getElementById('note');
const addNoteBtn = document.getElementById('add-note-btn');

// إضافة ملاحظة جديدة
function addNote() {
  const noteText = noteTextarea.value.trim();
  if (noteText === '') {
    return;
  }
  const noteItem = document.createElement('li');
  noteItem.innerText = noteText;
  notesList.appendChild(noteItem);
  noteTextarea.value = '';
  saveNotes();
}

// عرض الملاحظات المخزنة عند تحميل الصفحة
window.addEventListener('load', function() {
  loadNotes();
});

// حفظ الملاحظات عند إضافة ملاحظة جديدة
function saveNotes() {
  const notes = Array.from(notesList.children).map((noteItem) => noteItem.innerText);
  const json = JSON.stringify(notes);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.open('POST', 'save-notes.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(json);
}

// تحميل الملاحظات المخزنة
function loadNotes() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const notes = JSON.parse(xhr.responseText);
      for (const note of notes) {
        const noteItem = document.createElement('li');
        noteItem.innerText = note;
        notesList.appendChild(noteItem);
      }
    }
  }
  xhr.open('GET', 'load-notes.php');
  xhr.send();
}

// منع الإرسال الافتراضي للنموذج
addNoteBtn.addEventListener('click', function(event) {
  event.preventDefault();
  addNote();
});
