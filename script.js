// Load existing students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display stored students on page load
window.onload = displayStudents;

// Event listeners
document.getElementById("registerBtn").addEventListener("click", validateForm);
document.getElementById("newRegBtn")?.addEventListener("click", () => {
  document.getElementById("successContainer").style.display = "none";
  document.getElementById("formContainer").style.display = "block";
  document.getElementById("regForm").reset();
});

// Validate form and store student
function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let dept = document.getElementById("department").value;
  let year = document.getElementById("year").value;
  let project = document.getElementById("project").value.trim();
  let errorMsg = document.getElementById("errorMsg");

  if (!name || !email || !dept || !year || !project) {
    errorMsg.textContent = "⚠ Please fill all fields.";
    return;
  }

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  if (!emailPattern.test(email)) {
    errorMsg.textContent = "⚠ Please enter a valid email.";
    return;
  }

  errorMsg.textContent = "";

  // Save student in array & localStorage
  const student = { name, email, dept, year, project };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  // Show success container
  document.getElementById("formContainer").style.display = "none";
  document.getElementById("successContainer").style.display = "block";

  // Show current registration
  document.getElementById("displayName").textContent = name;
  document.getElementById("displayEmail").textContent = email;
  document.getElementById("displayDept").textContent = dept;
  document.getElementById("displayYear").textContent = year;
  document.getElementById("displayProject").textContent = project;

  // Update the list of all students
  displayStudents();
}

// Display all registered students
function displayStudents() {
  let studentList = document.getElementById("studentList");
  if (!studentList) {
    // Create the list container if it doesn't exist
    studentList = document.createElement("div");
    studentList.id = "studentList";
    studentList.style.marginTop = "20px";
    document.body.appendChild(studentList);
  }

  if (students.length === 0) {
    studentList.innerHTML = "<p style='color:white;'>No students registered yet.</p>";
    return;
  }

  let html = `
    <h3 style="color:white; margin-bottom:10px;">📋 Registered Students</h3>
    <table style="width:100%; border-collapse:collapse; color:white;">
      <tr style="background:rgba(255,255,255,0.2);">
        <th style="padding:8px;">Name</th>
        <th style="padding:8px;">Email</th>
        <th style="padding:8px;">Dept</th>
        <th style="padding:8px;">Year</th>
        <th style="padding:8px;">Project</th>
        <th style="padding:8px;">Action</th>
      </tr>
  `;

  students.forEach((s, index) => {
    html += `
      <tr style="background:rgba(255,255,255,0.05);">
        <td style="padding:8px;">${s.name}</td>
        <td style="padding:8px;">${s.email}</td>
        <td style="padding:8px;">${s.dept}</td>
        <td style="padding:8px;">${s.year}</td>
        <td style="padding:8px;">${s.project}</td>
        <td style="padding:8px;">
          <button onclick="deleteStudent(${index})" style="padding:5px 10px; background:red; border:none; color:white; border-radius:5px; cursor:pointer;">Delete</button>
        </td>
      </tr>
    `;
  });

  html += "</table>";
  studentList.innerHTML = html;
}

// Delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}
