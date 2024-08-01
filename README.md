# Final Project for Grade 11/12 Computer Science (ICS4U)
This project was originally developed as a part of a grade 12 level computer science course. It started as a team with 5 members and has since been expanded with additional features and enhancements by me.

# Live Demo Link
EMR Project: https://electronic-medical-record-website.onrender.com/

# Project Overview
This project is an Electronic Medical Record (EMR/EHR) System designed to facilitate scheduling, viewing, and managing appointments. It includes interactive UI elements, backend integration, and email notifications to improve user experience.

# Features

**1. Interactive Calendar**
- Display appointments
- Book and edit appointments
- Email Notifications - sent out as appointments are created or updated

**2. Patients Page**
- Display patient information
- Edit current patients
- Update medications, immunizations, and appointments info

**3. Drugs Page**
- Displays drugs fetched from Drug Product Database Canada

## Video Demo


https://github.com/christinasuncs/emr/assets/112977159/7650fff2-6d1b-4cba-a69d-3f98c3995496



# Set Up Instructions
1. Clone repo
```
git clone https://github.com/christinasuncs/emr.git
cd emr
```
2. Add `.env` file with database connection string, EmailJS key, Google Client ID and Secret
3. Install Backend Dependencies and Start the Server
```
cd api
npm install
node index.js
```
4. Install Frontend Dependencies and Load Page
```
cd public
npm install
npm run dev
```

# Technologies Used
- VueJS
- Express
- MongoDB
- Passport.js
- EmailJS

# Contributions
Originally a collaborative effort, this project benefitted from the contributions of my grade 12 computer science team. Post-course, I have expanded and enhanced the project with features listed above.
