# 🧙 Sage AI Bot - Command Reference Guide

## 📚 Complete Command List

This guide shows all available commands you can use with Sage, your AI teaching assistant.

---

## 👥 Student Management Commands (Teachers Only)

### Add Student
Add a new student to the system via natural language.

**Syntax:**
```
Add student named [name], age [number], [visual/auditory/kinesthetic] learner
Add student called [name], age [number], [learning style], grade [number]
Create student named [name], age [number], [learning style]
```

**Examples:**
```
"Add student named John, age 15, visual learner, grade 10"
"Create student called Sarah, age 12, kinesthetic"
"Register student named Emma, age 14, auditory learner, grade 9"
```

**Response:** ✅ Confirms student creation with details

---

### View All Students
Display complete list of registered students.

**Commands:**
```
"Show all students"
"List students"
"Display students"
```

**Response:** 📊 Full student list with details

---

### Filter Students
Find students by learning style or grade.

**Commands:**
```
"Show visual learners"
"List auditory students"
"Find kinesthetic learners"
"Show students in grade 7"
"List grade 10 students"
```

**Response:** 📊 Filtered student list

---

### Student Statistics
View analytics about your students.

**Commands:**
```
"Student statistics"
"Show student stats"
"How many students do I have?"
"Student analytics"
```

**Response:** 📊 Shows:
- Total student count
- Learning style breakdown (percentages)
- Average age
- Most popular subject

---

## 📚 Course Management Commands (Teachers Only)

### Create Course
Add a new course to the system.

**Syntax:**
```
Create course called [title]
Add course titled [title] description [text]
New course named [title]
```

**Examples:**
```
"Create course called Advanced Physics"
"Add course titled Python Programming description Learn Python basics"
"New course named Calculus 101"
```

**Response:** ✅ Confirms course creation

---

### View Courses
See all available courses.

**Commands:**
```
"What courses are available?"
"Show me all courses"
"List courses"
"Display courses"
```

**Response:** 📚 Lists all courses with details

---

## 📅 Schedule Commands

### View Schedule
Display the weekly schedule for a class.

**Commands:**
```
"Show me the schedule"
"What's the schedule?"
"Display timetable"
"Show emploi de temps"
```

**Response:** 📅 Shows weekly schedule (context-aware for current class)

---

## 📁 File & Material Commands

### View Files
List all uploaded course materials.

**Commands:**
```
"Show me the files"
"What files are available?"
"List materials"
"Show documents"
```

**Response:** 📁 Lists files with download buttons

---

### View Images
Display only image files.

**Commands:**
```
"Show me images"
"What pictures are available?"
"Display photos"
"Show image files"
```

**Response:** 🖼️ Shows images with thumbnails and download options

---

## 🔍 Wikipedia Knowledge Base (All Users)

### Search Information
Get information from Wikipedia on any topic.

**Syntax:**
```
What is [topic]?
Tell me about [topic]
Explain [topic]
Define [topic]
Search for [topic]
```

**Examples:**
```
"What is photosynthesis?"
"Tell me about Albert Einstein"
"Explain quantum mechanics"
"Define democracy"
"Search for World War II"
"What is machine learning?"
"Tell me about the solar system"
"Explain DNA"
```

**Response:** 📖 Wikipedia summary with "Read more" link

**Works for:**
- ✅ Science topics
- ✅ Historical events
- ✅ Famous people
- ✅ Technology concepts
- ✅ Geography
- ✅ Any Wikipedia topic!

---

## 📝 Lesson Planning Commands

### Create Lesson Plan
Generate personalized lesson plans.

**Commands:**
```
"Create lesson plan"
"Make a lesson plan"
"Generate lesson plan"
```

**Process:**
1. Sage asks for student name
2. Sage asks for topic
3. Sage asks for learning style
4. Generates personalized plan with resources

**Example Flow:**
```
You: "Create lesson plan"
Sage: "Who is this lesson plan for?"
You: "Emma"
Sage: "What topic?"
You: "Math"
Sage: "Learning style?"
You: "Visual"
Sage: [Generates visual-based math lesson plan]
```

---

## 👤 Student Information Queries

### View Student Profile
Get information about specific students.

**Commands:**
```
"Tell me about Emma"
"Show Emma's profile"
"Alice's performance"
"Bob's favorite subject"
"What does Emma like?"
```

**Response:** Shows student's learning style, interests, and performance

---

## 💬 General Chat Commands

### Greetings
```
"Hello"
"Hi Sage"
"Hey"
"Good morning"
```

**Response:** Friendly greeting

---

### Help with Subjects
```
"Help with math"
"Assist with science"
"Support for history"
```

**Response:** Subject-specific resources and suggestions

---

## 🎯 Command Syntax Tips

### Natural Language
Sage understands natural language! You don't need exact syntax.

**All of these work:**
```
✅ "Add student named John, age 15, visual"
✅ "Create a student called John who is 15 and a visual learner"
✅ "Register student John, 15 years old, visual learning style"
```

### Case Insensitive
```
✅ "SHOW ME THE SCHEDULE"
✅ "show me the schedule"
✅ "Show Me The Schedule"
```

### Flexible Phrasing
```
✅ "What courses do we have?"
✅ "Show courses"
✅ "List all available courses"
✅ "What courses are there?"
```

---

## 🔐 Permission Levels

### 👨‍🏫 Teacher Commands (teacher1)
- ✅ Add students
- ✅ Create courses
- ✅ View all statistics
- ✅ Upload files
- ✅ Create schedules
- ✅ Approve student requests
- ✅ All student commands
- ✅ Wikipedia search

### 🎓 Student Commands (student1)
- ✅ View courses
- ✅ View schedules
- ✅ View files (download)
- ✅ View students list
- ✅ View statistics
- ✅ Wikipedia search
- ✅ Create lesson plans
- ❌ Cannot add students
- ❌ Cannot create courses
- ❌ Cannot upload files

---

## 💡 Pro Tips

### 1. Combine Information
```
"Add student named Sarah, age 12, kinesthetic learner, grade 7"
```
Provide all info at once for faster processing!

### 2. Be Specific
```
❌ "Show students"
✅ "Show all visual learners in grade 10"
```

### 3. Use Natural Language
```
✅ "Can you tell me what photosynthesis is?"
✅ "I need help understanding quantum physics"
✅ "What's the schedule for next week?"
```

### 4. Chain Questions
```
You: "What is DNA?"
Sage: [Explains DNA]
You: "Tell me more about genetic mutations"
Sage: [Explains mutations]
```

---

## 🎨 Interactive Features

### Portal Animation
Every Sage response triggers the magical portal animation with:
- ✨ Swirling purple portal
- ⚡ Lightning bolts
- 🔮 Magic runes
- 💫 Energy particles
- 🌊 Ripple effects

### File Downloads
When files are displayed, you get:
- 📁 File type icons
- 🖼️ Image thumbnails
- ⬇️ Download buttons
- 💾 File metadata

### Rich Formatting
Responses include:
- **Bold** headings
- • Bullet points
- Numbered lists
- Emoji indicators
- Clickable links

---

## 📊 Example Usage Scenarios

### Scenario 1: Adding a New Student
```
Teacher: "Add student named Alex, age 16, auditory learner, grade 11"
Sage: "✅ Student Added Successfully!
       📝 Name: Alex
       🎂 Age: 16 years old
       🎨 Learning Style: Auditory
       📚 Grade: 11
       
       Alex has been registered in the system!"
```

### Scenario 2: Creating a Course
```
Teacher: "Create course called Organic Chemistry description Study of carbon compounds"
Sage: "✅ Course Created Successfully!
       📚 Title: Organic Chemistry
       📖 Description: Study of carbon compounds
       👨‍🏫 Created by: Mr. Johnson
       
       The course is now available!"
```

### Scenario 3: Wikipedia Research
```
Student: "What is photosynthesis?"
Sage: "🔍 Searching Wikipedia for 'photosynthesis'...
       
       📖 Photosynthesis
       
       Photosynthesis is a process used by plants and other organisms
       to convert light energy into chemical energy that can later be
       released to fuel the organism's activities...
       
       🔗 Read more on Wikipedia"
```

### Scenario 4: Getting Statistics
```
Teacher: "Student statistics"
Sage: "📊 Student Statistics:
       
       👥 Total Students: 24
       
       🎨 Learning Styles:
          • Visual: 10 (42%)
          • Auditory: 8 (33%)
          • Kinesthetic: 6 (25%)
       
       🎂 Average Age: 14.5 years
       📚 Most Popular Subject: Math (12 students)"
```

---

## 🚀 Quick Reference

| Command Type | Example | Permission |
|-------------|---------|------------|
| Add Student | "Add student named John, age 15, visual" | 👨‍🏫 Teacher |
| Create Course | "Create course called Physics" | 👨‍🏫 Teacher |
| View Students | "Show all students" | 👥 All |
| Statistics | "Student stats" | 👥 All |
| View Courses | "What courses available?" | 👥 All |
| View Schedule | "Show me the schedule" | 👥 All |
| View Files | "Show me the files" | 👥 All |
| Wikipedia | "What is gravity?" | 👥 All |
| Lesson Plan | "Create lesson plan" | 👥 All |

---

## 🆘 Help & Support

If Sage doesn't understand your command:
1. Try rephrasing with simpler words
2. Check the examples above
3. Make sure you have the right permissions
4. Verify you're logged in

**Still stuck?** Try these help commands:
```
"Help"
"What can you do?"
"Show me commands"
```

---

## ✨ Future Commands (Coming Soon)

- 🔔 "Send announcement to Math 101"
- ⏰ "Remind students about quiz"
- 📧 "Email parents about event"
- 📈 "Show performance trends"
- 🎯 "Who needs extra help?"

---

**Happy teaching with Sage! 🧙✨**
