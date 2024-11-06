// Declare `resumeData` globally
var resumeData;
// Function to gather form data and create the resume
function generateResume() {
    // Capture user input
    var personalInfo = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };
    var education = {
        degree: document.getElementById("degree").value,
        institution: document.getElementById("institution").value,
        graduationYear: document.getElementById("graduationYear").value
    };
    var skills = document.getElementById("skills").value.split(',');
    var workExperience = {
        jobTitle: document.getElementById("jobTitle").value,
        company: document.getElementById("company").value,
        duration: document.getElementById("duration").value,
        responsibilities: document.getElementById("responsibilities").value
    };
    // Initialize `resumeData` globally
    resumeData = { personalInfo: personalInfo, education: education, skills: skills, workExperience: workExperience };
    displayResume(resumeData);
}
// Function to display and make the resume editable
function displayResume(data) {
    var resumeSection = document.getElementById("generatedResume");
    resumeSection.innerHTML = "\n        <h2 contenteditable=\"true\" data-section=\"personalInfo\" data-key=\"name\">".concat(data.personalInfo.name, "</h2>\n        <p>Email: <span contenteditable=\"true\" data-section=\"personalInfo\" data-key=\"email\">").concat(data.personalInfo.email, "</span></p>\n        <p>Phone: <span contenteditable=\"true\" data-section=\"personalInfo\" data-key=\"phone\">").concat(data.personalInfo.phone, "</span></p>\n        \n        <h3>Education</h3>\n        <p contenteditable=\"true\" data-section=\"education\" data-key=\"degree\">").concat(data.education.degree, "</p>\n        <p contenteditable=\"true\" data-section=\"education\" data-key=\"institution\">").concat(data.education.institution, "</p>\n        <p contenteditable=\"true\" data-section=\"education\" data-key=\"graduationYear\">").concat(data.education.graduationYear, "</p>\n        \n        <h3>Skills</h3>\n        <p contenteditable=\"true\" data-section=\"skills\">").concat(data.skills.join(", "), "</p>\n        \n        <h3>Work Experience</h3>\n        <p contenteditable=\"true\" data-section=\"workExperience\" data-key=\"jobTitle\">").concat(data.workExperience.jobTitle, "</p>\n        <p contenteditable=\"true\" data-section=\"workExperience\" data-key=\"company\">").concat(data.workExperience.company, "</p>\n        <p contenteditable=\"true\" data-section=\"workExperience\" data-key=\"duration\">").concat(data.workExperience.duration, "</p>\n        <p contenteditable=\"true\" data-section=\"workExperience\" data-key=\"responsibilities\">").concat(data.workExperience.responsibilities, "</p>\n    ");
    enableEditing();
}
// Function to enable editing and real-time updates
function enableEditing() {
    var editableElements = document.querySelectorAll("[contenteditable='true']");
    editableElements.forEach(function (element) {
        element.addEventListener("input", function (event) {
            var target = event.target;
            var section = target.getAttribute("data-section");
            var key = target.getAttribute("data-key");
            if (section && key) {
                updateData(section, key, target.innerText);
            }
            else if (section === "skills") {
                updateSkills(target.innerText);
            }
        });
    });
}
// Function to update the data model as the user edits content
function updateData(section, key, value) {
    switch (section) {
        case "personalInfo":
            resumeData.personalInfo[key] = value;
            break;
        case "education":
            resumeData.education[key] = value;
            break;
        case "workExperience":
            resumeData.workExperience[key] = value;
            break;
    }
}
// Function to update skills as a comma-separated string
function updateSkills(skillsText) {
    resumeData.skills = skillsText.split(",").map(function (skill) { return skill.trim(); });
}
