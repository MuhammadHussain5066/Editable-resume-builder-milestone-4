
interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
}

interface Education {
    degree: string;
    institution: string;
    graduationYear: string;
}

interface WorkExperience {
    jobTitle: string;
    company: string;
    duration: string;
    responsibilities: string;
}

interface ResumeData {
    personalInfo: PersonalInfo;
    education: Education;
    skills: string[];
    workExperience: WorkExperience;
}

let resumeData: ResumeData;


function generateResume() {
    const personalInfo: PersonalInfo = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value
    };

    const education: Education = {
        degree: (document.getElementById("degree") as HTMLInputElement).value,
        institution: (document.getElementById("institution") as HTMLInputElement).value,
        graduationYear: (document.getElementById("graduationYear") as HTMLInputElement).value
    };

    const skills: string[] = (document.getElementById("skills") as HTMLInputElement).value.split(',');

    const workExperience: WorkExperience = {
        jobTitle: (document.getElementById("jobTitle") as HTMLInputElement).value,
        company: (document.getElementById("company") as HTMLInputElement).value,
        duration: (document.getElementById("duration") as HTMLInputElement).value,
        responsibilities: (document.getElementById("responsibilities") as HTMLInputElement).value
    };

    resumeData = { personalInfo, education, skills, workExperience };

    displayResume(resumeData);
}

function displayResume(data: ResumeData) {
    const resumeSection = document.getElementById("generatedResume") as HTMLElement;
    resumeSection.innerHTML = `
        <h2 contenteditable="true" data-section="personalInfo" data-key="name">${data.personalInfo.name}</h2>
        <p>Email: <span contenteditable="true" data-section="personalInfo" data-key="email">${data.personalInfo.email}</span></p>
        <p>Phone: <span contenteditable="true" data-section="personalInfo" data-key="phone">${data.personalInfo.phone}</span></p>
        
        <h3>Education</h3>
        <p contenteditable="true" data-section="education" data-key="degree">${data.education.degree}</p>
        <p contenteditable="true" data-section="education" data-key="institution">${data.education.institution}</p>
        <p contenteditable="true" data-section="education" data-key="graduationYear">${data.education.graduationYear}</p>
        
        <h3>Skills</h3>
        <p contenteditable="true" data-section="skills">${data.skills.join(", ")}</p>
        
        <h3>Work Experience</h3>
        <p contenteditable="true" data-section="workExperience" data-key="jobTitle">${data.workExperience.jobTitle}</p>
        <p contenteditable="true" data-section="workExperience" data-key="company">${data.workExperience.company}</p>
        <p contenteditable="true" data-section="workExperience" data-key="duration">${data.workExperience.duration}</p>
        <p contenteditable="true" data-section="workExperience" data-key="responsibilities">${data.workExperience.responsibilities}</p>
    `;

    enableEditing();
}

function enableEditing() {
    const editableElements = document.querySelectorAll("[contenteditable='true']");

    editableElements.forEach(element => {
        element.addEventListener("input", (event) => {
            const target = event.target as HTMLElement;
            const section = target.getAttribute("data-section") as keyof ResumeData;
            const key = target.getAttribute("data-key");

            if (section && key) {
                updateData(section, key, target.innerText);
            } else if (section === "skills") {
                updateSkills(target.innerText);
            }
        });
    });
}

function updateData(section: keyof ResumeData, key: string, value: string) {
    if (section === "personalInfo" || section === "education" || section === "workExperience") {
        (resumeData[section] as any)[key] = value;
    }
}

function updateSkills(skillsText: string) {
    resumeData.skills = skillsText.split(",").map(skill => skill.trim());
}
