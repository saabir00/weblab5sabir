
let cvData = {
  profile: {},
  contact: {},
  education: [],
  skills: [],
  languages: [],
  work: [],
  references: []
};

let originalData = {};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to load data');
    const data = await response.json();
    Object.assign(cvData, data);
    originalData = JSON.parse(JSON.stringify(data)); 
    renderCV();
  } catch (error) {
    console.error('Error loading data:', error);
    loadFromLocalStorage();
  }
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem("cvData");
  if (stored) {
    try {
      Object.assign(cvData, JSON.parse(stored));
      originalData = JSON.parse(JSON.stringify(cvData)); 
    } catch (e) {
      console.error("Invalid data in localStorage");
    }
  }
}

function saveToLocalStorage() {
  localStorage.setItem("cvData", JSON.stringify(cvData));
  alert("Data saved successfully!");
}

function resetToOriginal() {
  if (confirm("Are you sure you want to reset all changes?")) {
    Object.assign(cvData, JSON.parse(JSON.stringify(originalData)));
    renderCV();
  }
}


function renderCV() {

  document.getElementById('name').innerHTML = `<h4><strong>${cvData.profile.name.split(' ')[0]}</strong> <span>${cvData.profile.name.split(' ')[1]}</span></h4>`;
  document.getElementById('title').textContent = cvData.profile.title;
  document.getElementById('summary').textContent = cvData.profile.summary;

 
  document.getElementById('phone').textContent = cvData.contact.phone;
  document.getElementById('email').textContent = cvData.contact.email;

 
  renderEducation();
  
  
  renderSkills();
  
  
  renderLanguages();
  
  
  renderWork();
  
  
  renderReferences();
}

function renderEducation() {
  const educationList = document.getElementById('educationList');
  educationList.innerHTML = '';
  
  cvData.education.forEach((edu, index) => {
    const div = document.createElement('div');
    div.className = 'education-item';
    
    const content = document.createElement('div');
    content.innerHTML = `<strong>${edu.year}</strong><br>${edu.school}<br>${edu.field}`;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editEducation(index, content);
    };
    
    div.appendChild(content);
    div.appendChild(editBtn);
    educationList.appendChild(div);
  });
}

function renderSkills() {
  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = '';
  
  cvData.skills.forEach((skill, index) => {
    const li = document.createElement('li');
    li.className = 'skill-item';
    
    const span = document.createElement('span');
    span.textContent = skill;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editSkill(index, span);
    };
    
    li.appendChild(span);
    li.appendChild(editBtn);
    skillsList.appendChild(li);
  });

}
function createInputField(value, onSave, onCancel) {
  const container = document.createElement('div');
  container.className = 'edit-container';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.className = 'edit-input';
  
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.className = 'edit-btn save-btn';
  saveBtn.onclick = () => onSave(input.value);
  
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'Confirm';
  cancelBtn.onclick = onCancel;
  
  container.appendChild(input);
  container.appendChild(saveBtn);
  container.appendChild(cancelBtn);
  
  return container;
}

function renderLanguages() {
  const languagesList = document.getElementById('languagesList');
  languagesList.innerHTML = '';
  
  cvData.languages.forEach((lang, index) => {
    const li = document.createElement('li');
    li.className = 'language-item';
    
    const span = document.createElement('span');
    span.textContent = lang;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editLanguage(index, span);
    };
    
    li.appendChild(span);
    li.appendChild(editBtn);
    languagesList.appendChild(li);
  });
}

function renderWork() {
  const workList = document.getElementById('workList');
  workList.innerHTML = '';
  
  cvData.work.forEach((work, index) => {
    const div = document.createElement('div');
    div.className = 'item work-item';
    
    const content = document.createElement('p');
    content.textContent = work.description;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editWork(index, content);
    };
    
    div.appendChild(content);
    div.appendChild(editBtn);
    workList.appendChild(div);
  });
}

function renderReferences() {
  const referenceList = document.getElementById('referenceList');
  referenceList.innerHTML = '';
  
  cvData.references.forEach((ref, index) => {
    const div = document.createElement('div');
    div.className = 'reference-item';
    
    const content = document.createElement('div');
    content.innerHTML = `<strong>${ref.name}</strong><br>${ref.title}<br>${ref.email}`;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editReference(index, content);
    };
    
    div.appendChild(content);
    div.appendChild(editBtn);
    referenceList.appendChild(div);
  });
}


function editEducation(index, element) {
  const edu = cvData.education[index];
  const container = element.parentElement;
  
  const yearInput = createInputField(edu.year, (value) => {
    edu.year = value;
    renderEducation();
  }, () => renderEducation());
  
  const schoolInput = createInputField(edu.school, (value) => {
    edu.school = value;
    renderEducation();
  }, () => renderEducation());
  
  const fieldInput = createInputField(edu.field, (value) => {
    edu.field = value;
    renderEducation();
  }, () => renderEducation());
  
  container.innerHTML = '';
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createTextNode('Year: '));
  container.appendChild(yearInput);
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createTextNode('School: '));
  container.appendChild(schoolInput);
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createTextNode('Field: '));
  container.appendChild(fieldInput);
}

function editSkill(index, element) {
  const container = element.parentElement;
  const oldValue = cvData.skills[index];
  
  const inputContainer = createInputField(oldValue, (value) => {
    if (value) {
      cvData.skills[index] = value;
      renderSkills();
    }
  }, () => renderSkills());
  
  container.innerHTML = '';
  container.appendChild(inputContainer);
}

function editLanguage(index, element) {
  const container = element.parentElement;
  const oldValue = cvData.languages[index];
  
  const inputContainer = createInputField(oldValue, (value) => {
    if (value) {
      cvData.languages[index] = value;
      renderLanguages();
    }
  }, () => renderLanguages());
  
  container.innerHTML = '';
  container.appendChild(inputContainer);
}

function editWork(index, element) {
  const container = element.parentElement;
  const oldValue = cvData.work[index].description;
  
  const inputContainer = createInputField(oldValue, (value) => {
    if (value) {
      cvData.work[index].description = value;
      renderWork();
    }
  }, () => renderWork());
  
  container.innerHTML = '';
  container.appendChild(inputContainer);
}

function editReference(index, element) {
  const ref = cvData.references[index];
  const container = element.parentElement;
  
  const nameInput = createInputField(ref.name, (value) => {
    ref.name = value;
    renderReferences();
  }, () => renderReferences());
  
  const titleInput = createInputField(ref.title, (value) => {
    ref.title = value;
    renderReferences();
  }, () => renderReferences());
  
  const emailInput = createInputField(ref.email, (value) => {
    if (validateEmail(value)) {
      ref.email = value;
      renderReferences();
    } else {
      alert("Invalid email format");
    }
  }, () => renderReferences());
  
  container.innerHTML = '';
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createTextNode('Name: '));
  container.appendChild(nameInput);
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createTextNode('Title: '));
  container.appendChild(titleInput);
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createTextNode('Email: '));
  container.appendChild(emailInput);
}


function addEducation() {
  const year = prompt("Enter the years (e.g., 2030–2034):");
  const school = prompt("Enter the school name:");
  const field = prompt("Enter your field of study:");

  if (!year || !school || !field) return alert("All fields are required.");
  if (year.length > 30 || school.length > 50 || field.length > 50) return alert("Character limits exceeded.");

  cvData.education.push({ year, school, field });
  renderCV();
}

function addSkill() {
  const skill = prompt("Enter a new skill:");
  if (!skill) return alert("Skill cannot be empty.");
  if (skill.length > 50) return alert("Skill too long.");
  cvData.skills.push(skill);
  renderCV();
}

function addWork() {
  const work = prompt("Describe your work experience:");
  if (!work) return alert("Work experience cannot be empty.");
  if (work.length > 250) return alert("Description too long.");
  cvData.work.push({ description: work });
  renderCV();
}

function addLanguage() {
  const language = prompt("Enter a language and proficiency (e.g., Spanish (Beginner)):");
  if (!language) return alert("Language is required.");
  if (language.length > 50) return alert("Too long.");
  cvData.languages.push(language);
  renderCV();
}

function addReference() {
  const name = prompt("Enter reference name:");
  const title = prompt("Enter reference title:");
  const email = prompt("Enter reference email:");

  if (!name || !title || !email) return alert("All fields are required.");
  if (!validateEmail(email)) return alert("Invalid email format.");
  if (name.length > 50 || title.length > 50) return alert("Too long.");

  cvData.references.push({ name, title, email });
  renderCV();
}


document.addEventListener('DOMContentLoaded', () => {
  loadData();
  
  
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.style.position = 'fixed';
  resetBtn.style.bottom = '20px';
  resetBtn.style.left = '20px';
  resetBtn.style.padding = '10px 20px';
  resetBtn.style.borderRadius = '50px';
  resetBtn.style.color = 'var(--white)';
  resetBtn.style.backgroundColor = 'var(--black)';
  resetBtn.onclick = resetToOriginal;
  document.body.appendChild(resetBtn);
});