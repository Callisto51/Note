const notesList = document.getElementById('notes-list');
const noteTitleInput = document.getElementById('note-title');
const noteBodyTextarea = document.getElementById('note-body');
const addNoteBtn = document.getElementById('add-note-btn');

// إضافة ملاحظة جديدة
function addNote() {
  const noteTitle = noteTitleInput.value.trim();
  const noteBody = noteBodyTextarea.value.trim();
  if (noteTitle === '' || noteBody === '') {
    return;
  }
  const noteItem = document.createElement('li');
  noteItem.innerHTML = `
    <div class="note-title">${noteTitle}</div>
    <div class="note-body">${noteBody}</div>
  `;
  notesList.appendChild(noteItem);
  noteTitleInput.value = '';
  noteBodyTextarea.value = '';
  saveNotes();
}

// عرض الملاحظات المخزنة عند تحميل الصفحة
window.addEventListener('load', function() {
  loadNotes();
});

// حفظ الملاحظات عند إضافة ملاحظة جديدة
function saveNotes() {
  const notes = Array.from(notesList.children).map((noteItem) => {
    const titleElement = noteItem.querySelector('.note-title');
    const bodyElement = noteItem.querySelector('.note-body');
    return {
      title: titleElement.textContent,
      body: bodyElement.textContent
    };
  });
  const json = JSON.stringify(notes);
  fetch('notes.json', {
    method: 'PUT',
    body: json
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('حدث خطأ أثناء الحفظ');
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

// تحميل الملاحظات المخزنة
function loadNotes() {
  fetch('notes.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('حدث خطأ أثناء التحميل');
    }
    return response.json();
  })
  .then((notes) => {
    for (const note of notes) {
      const noteItem = document.createElement('li');
      noteItem.innerHTML = `
        <div class="note-title">${note.title}</div>
        <div class="note-body">${note.body}</div>
      `;
      notesList.appendChild(noteItem);
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

// منع الإرسال الافتراضي للنموذج
addNoteBtn.addEventListener('click', function(event) {
  event.preventDefault();
  addNote();
});
