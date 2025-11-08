# Teacher Bot Assistant - Complete Testing Guide

## 🎯 Test Credentials

### Teacher Account
- **Username:** `teacher1`
- **Password:** `teacher123`
- **Role:** Admin/Teacher (full access)

### Student Account
- **Username:** `student1`
- **Password:** `student123`
- **Role:** Student (limited access)

---

## 📋 Feature Testing Checklist

### 🆕 NEW: Advanced Bot Management Features

#### Test Bot Student Management (Teacher Only)
1. Login as teacher1
2. In Sage chat, type: **"Add student named John, age 15, visual learner, grade 10"**
3. Sage should create the student and show confirmation
4. Type: **"Show all students"** → See John in the list
5. Type: **"Student statistics"** → See updated stats

#### Test Bot Course Creation (Teacher Only)
1. Still as teacher1
2. Type: **"Create course called Advanced Physics"**
3. Sage should create course and confirm
4. Type: **"What courses are available?"** → See Advanced Physics listed

#### Test Wikipedia Integration (All Users)
1. Type: **"What is photosynthesis?"**
2. Sage searches Wikipedia and returns summary with link
3. Try: **"Tell me about Albert Einstein"**
4. Try: **"Explain quantum mechanics"**
5. Should get Wikipedia excerpts for each query

#### Test Permission System
1. Logout and login as student1
2. Type: **"Add student named Test"** → Should show "🔒 Only teachers can add students"
3. Type: **"Create course called Test"** → Should show permission error
4. Type: **"What is gravity?"** → Should work (Wikipedia access for all)
5. Check sidebar → "Students" tab should be **hidden** for students

---

### 1. Authentication System ✅

#### Test Login
1. Open `teacher-bot-assistant/login.html`
2. Try invalid credentials → Should show "Invalid username or password"
3. Login as **teacher1** / **teacher123** → Should redirect to Teacher Dashboard
4. Logout → Should return to login page
5. Login as **student1** / **student123** → Should redirect to main chat (index.html)

#### Test Logout
1. Login as any user
2. Go to any page (index.html, classrooms.html, etc.)
3. Click profile/logout in sidebar
4. Should clear session and redirect to login page

---

### 2. Teacher Dashboard (Teacher Only) 👨‍🏫

**Login as:** teacher1

#### Test Course Upload
1. Navigate to Teacher Dashboard
2. Click **"Courses"** tab
3. Fill in:
   - Title: "Introduction to Python"
   - Description: "Learn Python basics"
4. Click **"Create Course"**
5. Verify course appears in the list below

#### Test File Upload
1. Click **"Files"** tab
2. Select a file (PDF, image, document)
3. Choose category: "Course Material" or "Assignment"
4. Choose type: "PDF", "Image", "Document", etc.
5. Click **"Upload File"**
6. File should appear in the files list with metadata

#### Test Schedule Creation
1. Click **"Schedule"** tab
2. Select **Class**: Choose "Math 101" or "Science 201"
3. Select **Week**: Choose current week
4. Fill in schedule slots:
   - Monday 08:00-09:00: Subject="Math", Teacher="Mr. Smith", Room="101"
   - Tuesday 09:00-10:00: Subject="Science", Teacher="Dr. Johnson", Room="202"
5. Click **"💾 Save Schedule"**
6. Alert should confirm: "Schedule saved successfully for math-101 - Week [number]"

#### Test Schedule Loading
1. Change **Week** selector → Schedule should clear
2. Change **Class** selector → Should load that class's schedule if it exists
3. Fill in new schedule for different class
4. Save and verify

#### Test Student Requests (Teacher)
1. Click **"Requests"** tab
2. (After student requests to join - see Student Tests)
3. See pending request with student name
4. Click **"✅ Approve"** → Request disappears, student joins class
5. OR Click **"❌ Reject"** → Request removed

---

### 3. Sage AI Assistant (Main Chat) 🧙

**Login as:** student1 or teacher1

#### Test Portal Animation
1. Go to `index.html` (main chat)
2. Type anything in chat and send
3. **Portal animation should appear:**
   - Purple/gold swirling portal
   - Energy particles (25 flying particles)
   - Magic runes (6 rotating symbols)
   - Lightning bolts (4 electric strikes)
   - Sparkles (40 small stars)
   - Ripple waves
   - Flash burst effect
   - Screen shake
4. Sage emerges from portal with response

#### Test Basic Chat Responses
1. Type: "Hello" → Sage greets you
2. Type: "help with math" → Suggests math resources
3. Type: "create lesson plan" → Starts lesson plan wizard
4. Follow wizard steps with student name, topic, learning style

#### Test Student Information
1. Type: "tell me about emma" → Shows Emma's profile
2. Type: "alice's performance" → Shows Alice's grades
3. Type: "bob's favorite subject" → Shows Bob's interests

---

### 4. Class Chat Rooms 🏫

**Login as:** student1

#### Test Class Discovery
1. Navigate to **"Class Chat Rooms"** (classrooms.html)
2. See grid of available classes:
   - Mathematics 101
   - Science Advanced
   - World History
   - English Literature
   - Computer Science

#### Test Join Request (Student)
1. Click **"Request to Join"** on "Mathematics 101"
2. Button changes to **"Pending..."**
3. Request saved to localStorage
4. (Teacher must approve - see Teacher Tests)

#### Test Entering Class (After Approval)
1. After teacher approves your request
2. Refresh page
3. Button shows **"Enter Class"**
4. Click to enter class chat
5. Class view opens with chat area

#### Test Class Chat
1. Inside a class (e.g., Math 101)
2. Type message in chat box → Message appears
3. Type: "Summon Sage" → Portal animation plays, Sage appears
4. Ask Sage: "what courses are available?" → Lists all uploaded courses
5. Ask Sage: "show me the schedule" → Displays Math 101's schedule
6. Ask Sage: "what files are available?" → Lists course materials

---

### 5. Schedule Display & Notifications 📅

#### Test Schedule View (Student)
1. Login as student1
2. Join/Enter "Math 101" class
3. In class chat, summon Sage
4. Type: **"show me the schedule"**
5. Sage displays:
   ```
   📅 Here's the schedule for Mathematics 101 (Week 45):
   
   Monday:
     08:00-09:00: Math (Mr. Smith) - Room 101
   
   Tuesday:
     09:00-10:00: Science (Dr. Johnson) - Room 202
   ```

#### Test Schedule Change Notification
1. Login as teacher1
2. Go to Teacher Dashboard → Schedule tab
3. Select "Math 101" class
4. Modify an existing schedule (change subject or time)
5. Click **"💾 Save Schedule"**
6. Login as student1
7. Enter Math 101 class chat
8. **System notification appears:**
   ```
   📅 Schedule Update for Week 45!
   The schedule has been updated. Please check the new version.
   ```

---

### 6. File Management & Display 📁

#### Test File Upload (Teacher)
1. Login as teacher1
2. Teacher Dashboard → Files tab
3. Upload multiple files:
   - PDF: "Python_Tutorial.pdf" (Course Material)
   - Image: "diagram.png" (Course Material)
   - Document: "Assignment1.docx" (Assignment)
4. All files appear in list

#### Test File Display (Student)
1. Login as student1
2. Main chat or class chat
3. Ask Sage: **"show me the files"** or **"what materials are available?"**
4. Sage responds with file list
5. **Interactive file cards appear with:**
   - File preview (thumbnail for images, icon for documents)
   - File name in gold text
   - File size, category, upload date
   - **⬇️ Download button**

#### Test File Download
1. After files displayed (previous step)
2. Click **"⬇️ Download"** button on any file
3. File downloads to your computer
4. Success notification appears: "✅ Downloading [filename]..."

#### Test Image Display
1. Ask Sage: **"show me images"** or **"what pictures are available?"**
2. Sage separates files into:
   - **📚 Course Materials & Documents** (PDFs, docs)
   - **🖼️ Images & Photos** (PNG, JPG, etc.)
3. Images show thumbnail previews
4. Documents show file type icons

---

### 7. Course Management 📚

#### Test Course Creation (Teacher)
1. Login as teacher1
2. Teacher Dashboard → Courses tab
3. Create course:
   - Title: "Advanced Mathematics"
   - Description: "Calculus and Linear Algebra"
4. Course appears in list

#### Test Course Query (Student)
1. Login as student1
2. Any chat with Sage
3. Ask: **"what courses are available?"**
4. Sage lists all courses with:
   - Course title
   - Description
   - Created by (teacher name)
   - Number of files

---

### 8. Teacher Tools (Topics & Resources) 📖

#### Test Topics Browser
1. Login as any user
2. Navigate to **"Teacher Tools"** (topics.html)
3. Browse available topics:
   - Math
   - Science
   - History
   - English
   - Geography
   - Art
   - Computer Science

#### Test Resource View
1. Click on a topic (e.g., "Mathematics")
2. View resources:
   - **Lecture Slides** (expandable list)
   - **Video Suggestions** (with links)
3. Click video links → Opens in new tab

---

### 9. Lesson Plan Generator 📝

#### Test Lesson Plan Wizard
1. Main chat with Sage
2. Type: **"create lesson plan"**
3. **Step 1:** Sage asks for student name
   - Type: "emma"
4. **Step 2:** Sage asks for topic
   - Type: "math"
5. **Step 3:** Sage asks for learning style
   - Type: "visual"
6. Sage generates personalized lesson plan:
   - Teaching strategy for visual learner
   - Recommended slides
   - Recommended videos
   - Resources appear below chat

---

### 10. Multi-User Role System 🔐

#### Test Teacher Permissions
1. Login as teacher1
2. Should have access to:
   - ✅ Teacher Dashboard
   - ✅ Upload courses
   - ✅ Upload files
   - ✅ Create schedules
   - ✅ Approve/reject requests
   - ✅ All student features

#### Test Student Permissions
1. Login as student1
2. Should have access to:
   - ✅ Main chat with Sage
   - ✅ Class chat rooms
   - ✅ View Teacher Tools
   - ✅ View/download files
   - ✅ View schedules
   - ❌ NO Teacher Dashboard link
   - ❌ Cannot upload/delete

---

### 11. Notifications System 🔔

#### Test Schedule Change Notification
1. Teacher creates/updates schedule for a class
2. Student in that class chat sees system message:
   ```
   📅 Schedule Update for Week 45!
   The schedule has been updated. Please check the new version.
   ```

#### Test Request Notification (Future Feature)
- When student requests to join class
- Teacher sees notification in Requests tab

---

## 🧪 Complete Test Scenario (End-to-End)

### Scenario: New Student Joins Class and Accesses Materials

1. **Student Login**
   - Open login page
   - Login as student1 / student123

2. **Request Class Access**
   - Go to Class Chat Rooms
   - Request to join "Mathematics 101"
   - Status shows "Pending..."

3. **Teacher Approves**
   - Logout, login as teacher1 / teacher123
   - Go to Teacher Dashboard → Requests tab
   - Approve student1's request

4. **Teacher Uploads Materials**
   - Go to Courses tab → Create "Intro to Calculus" course
   - Go to Files tab → Upload "Calculus_Chapter1.pdf"
   - Go to Schedule tab → Select "Math 101" class
   - Create schedule for current week
   - Save schedule

5. **Student Accesses Class**
   - Logout, login as student1
   - Go to Class Chat Rooms
   - Click "Enter Class" on Mathematics 101
   - Class chat opens

6. **Student Interacts with Sage**
   - Type: "Summon Sage"
   - **Portal animation plays** ✨
   - Ask: "what courses are available?"
   - Sage lists: "Intro to Calculus"
   - Ask: "show me the schedule"
   - Sage displays Math 101 schedule
   - Ask: "show me the files"
   - **File cards appear with download buttons**
   - Click download on PDF
   - File downloads successfully

7. **Teacher Updates Schedule**
   - Login as teacher1
   - Modify Math 101 schedule
   - Save changes

8. **Student Sees Notification**
   - Login as student1
   - Enter Math 101 class
   - **System notification appears:**
     "📅 Schedule Update for Week 45!"

---

## 🐛 Known Issues to Test

### Check These Work Correctly:
- ✅ Logout from nested folders (teacher-bot-assistant/teacher-bot-assistant/)
- ✅ File upload with different file types
- ✅ Schedule persistence across page reloads
- ✅ Multiple classes with different schedules
- ✅ Portal animation triggers every time
- ✅ Download works for both images and documents

---

## 📊 Test Data in LocalStorage

After testing, check browser DevTools → Application → LocalStorage:

- `currentUser` - Current logged-in user
- `uploadedFiles` - All uploaded files with metadata
- `courses` - All created courses
- `schedules` - All schedules (format: `{classId}-week{number}`)
- `notifications` - Schedule change notifications
- `pendingRequests` - Student join requests
- `joinedClasses` - Classes student has joined
- `class-messages-{classId}` - Chat messages for each class

---

## 🎨 Visual Features to Verify

### Portal Animation Elements:
1. ✨ Portal spinner (purple gradient)
2. 💫 25 energy particles (spiraling)
3. 🔮 6 magic runes (orbiting)
4. ⚡ 4 lightning bolts (striking)
5. ✨ 40 sparkles (bursting)
6. 🌊 Ripple waves (expanding)
7. 💥 Flash burst (bright)
8. 📳 Screen shake effect
9. 🧙 Sage emerges from center

### File Cards Display:
- 📁 Document icons (PDF, Word, Excel)
- 🖼️ Image thumbnails
- 💾 Gold download buttons
- ✨ Hover effects (glow, transform)
- 📊 File metadata (size, date, category)

---

## 🔄 Reset Testing Environment

To start fresh:
1. Open DevTools (F12)
2. Go to Application → LocalStorage
3. Right-click → Clear
4. Refresh page
5. Login again with credentials

---

## ✅ Testing Checklist Summary

- [ ] Login/Logout works for both roles
- [ ] Portal animation plays with all effects
- [ ] Teacher can create courses
- [ ] Teacher can upload files
- [ ] Teacher can create schedules for specific classes
- [ ] Teacher can approve/reject student requests
- [ ] Student can request to join classes
- [ ] Student can enter approved classes
- [ ] Sage responds to course queries
- [ ] Sage displays class-specific schedules
- [ ] Sage shows files with download buttons
- [ ] File download works for PDFs and images
- [ ] Schedule changes trigger notifications
- [ ] Notifications appear in correct class chat
- [ ] Lesson plan generator wizard works
- [ ] Student information queries work
- [ ] Teacher Tools/Topics browsing works
- [ ] Class selector changes schedule view
- [ ] Week selector loads correct schedule
- [ ] File cards show thumbnails for images
- [ ] File cards show icons for documents

---

## 🎯 Quick Test Commands

**In Sage Chat, try these:**

### Basic Commands:
- "hello"
- "create lesson plan"
- "tell me about emma"
- "what courses are available?"
- "show me the schedule"
- "what files are available?"
- "show me images"
- "help with math"

### Advanced Bot Management Commands (Teachers Only):

**Student Management:**
- "Add student named John, age 15, visual learner, grade 10"
- "Create student called Sarah, age 12, kinesthetic"
- "Show all students"
- "List visual learners"
- "Find students in grade 7"
- "How many students do I have?"
- "Student statistics"

**Course Management:**
- "Create course called Advanced Physics"
- "Add course titled Python Programming description Learn Python basics"
- "New course named Mathematics 101"

### Wikipedia Knowledge Base:
- "What is photosynthesis?"
- "Tell me about Albert Einstein"
- "Explain quantum mechanics"
- "Define democracy"
- "Search for Renaissance"
- "What is machine learning?"

**Expected:** Each command triggers specific response with portal animation! ✨

---

## 🔒 Permission Testing

### Teacher Commands (Login as teacher1):
- ✅ Can add students via chat
- ✅ Can create courses via chat
- ✅ Can view all statistics
- ✅ Can upload files
- ✅ Can create schedules
- ✅ See "Students" tab in sidebar

### Student Commands (Login as student1):
- ❌ Cannot add students (shows permission error)
- ❌ Cannot create courses (shows permission error)
- ✅ Can view students list
- ✅ Can view statistics
- ✅ Can search Wikipedia
- ✅ Can view schedules/files
- ❌ NO "Students" tab in sidebar (hidden)

---

Happy Testing! 🚀
