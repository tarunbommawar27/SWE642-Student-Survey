SWE642 Student Survey Application

A full-stack web application built with Spring Boot (backend) and Angular (frontend) for collecting and managing student survey data.
This project follows the GMU SWE 642 “Student Survey” assignment specification.

📁 Project Structure
SWE642-Student-Survey/
│
├── survey-backend/     # Spring Boot backend (Java + MySQL)
│   ├── src/main/java/com/example/survey/
│   ├── pom.xml
│   └── ...
│
├── survey-frontend/    # Angular frontend (TypeScript + Bootstrap)
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md

⚙️ Backend Setup (Spring Boot + MySQL)
1️⃣ Prerequisites

Java 17+

Maven 3.9+

MySQL 8.0+

VS Code / IntelliJ / Eclipse

2️⃣ Database Setup

Open MySQL and run:

CREATE DATABASE IF NOT EXISTS swe642;
CREATE USER IF NOT EXISTS 'swe642'@'localhost' IDENTIFIED BY 'swe642pass';
GRANT ALL PRIVILEGES ON swe642.* TO 'swe642'@'localhost';
FLUSH PRIVILEGES;

3️⃣ Configure DB connection

Edit survey-backend/src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/swe642
spring.datasource.username=swe642
spring.datasource.password=swe642pass
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
server.port=8080

4️⃣ Run the backend
cd survey-backend
mvn clean package -DskipTests
mvn spring-boot:run


If successful, your backend should start at:
👉 http://localhost:8080

💻 Frontend Setup (Angular)
1️⃣ Prerequisites

Node.js 18+

Angular CLI 17+

2️⃣ Install dependencies
cd survey-frontend
npm install

3️⃣ Run the frontend
npx ng serve


Then open:
👉 http://localhost:4200

🔗 Connecting Frontend & Backend

The frontend Angular app communicates with the backend REST API at http://localhost:8080
.
If needed, check or update the base URL in:

survey-frontend/src/app/services/survey.service.ts

🤝 Team Workflow
Clone the repository
git clone https://github.com/tarunbommawar27/SWE642-Student-Survey.git

Create a new branch
git checkout -b feature/frontend-validation
# make changes
git add .
git commit -m "Add form validation improvements"
git push -u origin feature/frontend-validation


Then open a Pull Request (PR) on GitHub to merge into main.

🧹 .gitignore Summary
survey-frontend/node_modules/
survey-frontend/dist/
survey-frontend/.angular/
survey-backend/target/
*.log

✅ Verification Checklist

 Backend runs without SQL errors (mvn spring-boot:run)

 Frontend builds successfully (npx ng serve)

 Able to submit survey and store responses

 Git push/pull working for all team members

👨‍💻 Contributors

Tarun Bommawar


🏁 License

This project is for academic purposes under George Mason University SWE642 coursework.
