const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const doc = new PDFDocument({
  size: "A4",
  margin: 40,
});

const outputPath = path.join(__dirname, "public", "Mahendiran_S_Resume.pdf");
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

const darkColor = "#111111";
const grayColor = "#444444";

// ================= PAGE 1 =================

// Title Header
doc.font("Helvetica-Bold").fontSize(22).fillColor(darkColor).text("MAHENDIRAN S", 40, 40);
doc.font("Helvetica-Bold").fontSize(13).fillColor(darkColor).text("Software Developer", 40, 42, { align: "right" });

doc.moveTo(40, 70).lineTo(555, 70).strokeColor("#cccccc").lineWidth(1).stroke();

doc.font("Helvetica").fontSize(10).fillColor(darkColor).text(
  "mahendirans002@gmail.com | +918610774327",
  40,
  78,
  { align: "right" }
);

doc.moveDown(1.5);

// Section: PROFESSIONAL SUMMARY
doc.font("Helvetica-Bold").fontSize(11).fillColor(darkColor).text("PROFESSIONAL SUMMARY");
doc.moveDown(0.3);
doc.font("Helvetica").fontSize(9.5).fillColor(grayColor).text(
  "Dynamic Software Developer specializing in full-stack development, low-code solutions, and web design. Deep understanding of backend security, database architecture, and modern web technologies. Driven by the challenge of solving complex problems and building robust, user-centric applications. Strong believer in the power of clean code, scalable systems, and continuous innovation. Ready to contribute technical skills and creative problem-solving to forward-thinking development teams.",
  { leading: 4, align: "justify" }
);

doc.moveDown(1.2);

// Section: CORE COMPETENCIES
doc.font("Helvetica-Bold").fontSize(11).fillColor(darkColor).text("CORE COMPETENCIES");
doc.moveDown(0.3);
doc.font("Helvetica").fontSize(9.5).fillColor(grayColor);
doc.font("Helvetica-Bold").text("Full Stack Developer: ", { continued: true })
   .font("Helvetica").text(
     "with experience in building and deploying web applications using HTML, CSS, JavaScript, and React. Skilled in backend development with Node.js and Java (Spring Boot), RESTful APIs, and database management (MySQL, MongoDB). Familiar with authentication (JWT), version control using Git, and deployment on Vercel and Netlify. Strong foundation in data structures, debugging, and performance optimization, python(basics), MS-Excel.",
     { leading: 4, align: "justify" }
   );

doc.moveDown(1.2);

// Section: WORK EXPERIENCE
doc.font("Helvetica-Bold").fontSize(11).fillColor(darkColor).text("WORK EXPERIENCE");
doc.moveDown(0.3);

doc.font("Helvetica-Bold").fontSize(10).fillColor(darkColor).text("Full stack-Developer Intern", 40, doc.y, { continued: true });
doc.font("Helvetica-Bold").fontSize(9.5).fillColor(darkColor).text("Dec 2024–Jan 2025", { align: "right" });

doc.font("Helvetica-Bold").fontSize(10).fillColor(darkColor).text("Cognifyz Technology");
doc.moveDown(0.3);

const expBullets = [
  "Developed and contributed to full stack web applications using frontend and backend technologies",
  "Built responsive user interfaces and integrated them with backend services",
  "Designed and consumed RESTful APIs for efficient client-server communication",
  "Worked with databases to perform CRUD operations and basic schema design",
  "Implemented authentication mechanisms and handled application security basics",
  "Collaborated on debugging, testing, and improving application performance",
  "Gained hands-on experience in real-world development workflows and deployment"
];

expBullets.forEach(bullet => {
  doc.font("Helvetica").fontSize(9.5).fillColor(grayColor).text(`•  ${bullet}`, { indent: 10, leading: 3 });
});

doc.moveDown(1.2);

// Section: PROJECTS
doc.font("Helvetica-Bold").fontSize(11).fillColor(darkColor).text("PROJECTS");
doc.moveDown(0.3);

doc.font("Helvetica-Bold").fontSize(10).fillColor(darkColor).text("Full stack-developer", 40, doc.y, { continued: true });
doc.font("Helvetica-Bold").fontSize(9.5).fillColor(darkColor).text("Jan 2026 – Present", { align: "right" });

doc.font("Helvetica-Bold").fontSize(10).fillColor(darkColor).text("BookMyEvent");
doc.moveDown(0.3);

const projBulletsPage1 = [
  "Developed a full-stack College Event Management System that enables seamless interaction between Admin, Organizer, and Student roles. The system allows administrators to manage organizers, organizers to create and manage events, and students to browse and register for events with QR-based ticket generation.",
  "The application is built using React (Vite), HTML, CSS, and JavaScript, with Supabase/Firebase handling authentication and database operations.",
  "It features a role-based access system, real-time data handling, and a responsive UI optimized for both web and mobile devices.",
  "Advanced functionalities include an integrated AI assistant for natural language event queries, automated event registration, and organizer analytics.",
  "The system also supports CSV export of participant data, secure authentication, and structured database design for scalability."
];

projBulletsPage1.forEach(bullet => {
  doc.font("Helvetica").fontSize(9.5).fillColor(grayColor).text(`•  ${bullet}`, { indent: 10, leading: 3 });
  doc.moveDown(0.2);
});


// ================= PAGE 2 =================
doc.addPage();

const projBulletsPage2 = [
  "This project demonstrates strong skills in full-stack development, database design, authentication, UI/UX design, and AI integration, making it a comprehensive solution for managing college-level events efficiently."
];

projBulletsPage2.forEach(bullet => {
  doc.font("Helvetica").fontSize(9.5).fillColor(grayColor).text(`•  ${bullet}`, { indent: 10, leading: 3 });
  doc.moveDown(0.4);
});

doc.moveDown(0.8);

// Section: EDUCATION
doc.font("Helvetica-Bold").fontSize(11).fillColor(darkColor).text("EDUCATION");
doc.moveDown(0.3);

doc.font("Helvetica-Bold").fontSize(10).fillColor(darkColor).text("Mahendra Engineering College", 40, doc.y, { continued: true });
doc.font("Helvetica-Bold").fontSize(9.5).fillColor(darkColor).text("June 2024–June 2028", { align: "right" });

doc.font("Helvetica").fontSize(9.5).fillColor(grayColor).text("Bachelor of Information Technology");

doc.moveDown(1.5);

// Section: ADDITIONAL INFORMATION
doc.font("Helvetica-Bold").fontSize(11).fillColor(darkColor).text("ADDITIONAL INFORMATION");
doc.moveDown(0.4);

doc.font("Helvetica-Bold").fontSize(10).fillColor(darkColor).text("ACHIEVEMENTS & CERTIFICATION");
doc.moveDown(0.3);

const addInfoBullets = [
  "Completed a Full Stack Development Internship at Cognifyz Technologies, gaining hands-on experience in real-world web application development",
  "Completed foundational programming courses in Python and C, building strong problem-solving basics",
  "Earned certification in UI/UX Design (Beginner), understanding core design principles and user experience concepts",
  "Participated in hackathons, gaining hands-on experience in real-time problem solving and teamwork",
  "Completed multiple online technical courses to strengthen development skills",
  "Actively engaged in learning new technologies and improving practical development knowledge"
];

addInfoBullets.forEach(bullet => {
  doc.font("Helvetica").fontSize(9.5).fillColor(grayColor).text(`•  ${bullet}`, { indent: 10, leading: 3 });
  doc.moveDown(0.3);
});

// Footer links at bottom of Page 2
doc.font("Helvetica").fontSize(9).fillColor(grayColor).text(
  "https://www.linkedin.com/in/mahendiran-s-/ || https://github.com/Mahendiran-S",
  40,
  770,
  { align: "center" }
);

doc.end();

stream.on("finish", () => {
  console.log("PDF generated successfully at: " + outputPath);
});
