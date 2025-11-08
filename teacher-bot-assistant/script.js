// Function to handle sending message
function sendMessage() {
    const input = document.getElementById('chat-input');
    const query = input.value.trim();
    if (query === '') return;

    // Display user query in output area
    addUserMessage(query);

    // Clear input
    input.value = '';

    // Handle multi-step post creation conversation
    if (conversationState.creatingPost) {
        handlePostCreationStep(query);
        return;
    }

    // Handle multi-step lesson plan creation conversation
    if (conversationState.creatingLessonPlan) {
        handleLessonPlanStep(query);
        return;
    }

    // Process the query
    processQuery(query);
}

// Click event for submit button
document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'submit-btn') {
    event.preventDefault();
    sendMessage();
  }
});

// Add Enter key support for chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(event) {
            // Check if Enter key is pressed (without Shift)
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); // Prevent default Enter behavior (new line)
                sendMessage();
            }
            // Shift+Enter allows new line in input
        });
    }
});

// Function to process the query
function processQuery(query) {

    // Handle multi-step post creation conversation
    if (conversationState.creatingPost) {
        handlePostCreationStep(query);
        return;
    }

    // Handle multi-step lesson plan creation conversation
    if (conversationState.creatingLessonPlan) {
        handleLessonPlanStep(query);
        return;
    }

    // Simulate bot response
    setTimeout(() => {
        // Activate Sage talking animation
        const sageAvatar = document.getElementById('sage-avatar');
        const sageStatus = document.getElementById('sage-status');
        if (sageAvatar) sageAvatar.classList.add('talking');
        if (sageStatus) {
            sageStatus.classList.add('typing');
            sageStatus.textContent = 'Typing';
        }

        // Simulate typing delay
        setTimeout(() => {
            // Check for greetings
            if (isGreeting(query)) {
                const currentUser = getCurrentUser();
                const userName = currentUser ? currentUser.username : 'there';
                const userRole = currentUser ? currentUser.role : 'user';
                const roleEmoji = userRole === 'teacher' ? '👨‍🏫' : '🎓';
                
                const greetings = [
                    `Hello ${roleEmoji} ${userName}! I'm Sage, your AI Teaching Assistant. How can I help you today?`,
                    `Hi there, ${userName}! 🧙‍♂️ Ready to make learning magical? What can I do for you?`,
                    `Greetings, ${userName}! ${roleEmoji} I'm here to assist with teaching, learning, and everything in between!`,
                    `Hey ${userName}! 👋 Sage at your service. Need help with lesson plans, student info, or just curious about something?`
                ];
                
                // Pick a random greeting
                const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
                
                let helpText = "\n\n💡 **Quick Tips:**\n";
                if (userRole === 'teacher') {
                    helpText += "• Add students: *\"Add student named John, age 15, visual learner\"*\n";
                    helpText += "• Create courses: *\"Create course called Physics 101\"*\n";
                    helpText += "• Get statistics: *\"Student statistics\"*\n";
                } else {
                    helpText += "• Ask questions: *\"What is photosynthesis?\"*\n";
                    helpText += "• Get help: *\"Help me with math homework\"*\n";
                    helpText += "• View resources: *\"Show me the files\"*\n";
                }
                helpText += "• Search Wikipedia: *\"Tell me about [any topic]\"*\n";
                helpText += "• Create lesson plans: *\"Make a lesson plan\"*";
                
                addBotMessage(randomGreeting + helpText);
                stopSageAnimation();
                return;
            }

            const suggestion = getTeachingSuggestion(query);
            addBotMessage(suggestion.text);
            if (suggestion.videos && suggestion.videos.length > 0) {
                showVideoSuggestions(suggestion.videos);
            }
            if (suggestion.slides && suggestion.slides.length > 0) {
                showSlideSuggestions(suggestion.slides);
            }

            // Stop animation after response
            stopSageAnimation();

            // If user asks to create a post, start multi-step post creation
            if (query.toLowerCase().includes('create a post') || query.toLowerCase().includes('plus create a post')) {
                conversationState.creatingPost = true;
                conversationState.postCreationStep = 1;
                conversationState.newPostData = { topic: '', title: '', content: '' };
                setTimeout(() => addBotMessage("Sure! Let's create a new post. What is the topic?"), 500);
            }

            // If user asks to create a lesson plan, start multi-step lesson plan creation
            if (query.toLowerCase().includes('create a lesson plan') || query.toLowerCase().includes('help me create a lesson plan')) {
                conversationState.creatingLessonPlan = true;
                conversationState.lessonPlanStep = 1;
                conversationState.lessonPlanData = { student: '', topic: '', learningStyle: '' };
                setTimeout(() => addBotMessage("Great! I'd love to help you create a personalized lesson plan. Which student is this lesson plan for?"), 500);
            }
        }, 1500); // Typing delay
    }, 500);
}

function handlePostCreationStep(userInput) {
    switch (conversationState.postCreationStep) {
        case 1:
            conversationState.newPostData.topic = userInput.trim();
            conversationState.postCreationStep = 2;
            addBotMessage("Got it. What is the title of your post?");
            break;
        case 2:
            conversationState.newPostData.title = userInput.trim();
            conversationState.postCreationStep = 3;
            addBotMessage("Great! Please provide the content of your post.");
            break;
        case 3:
            conversationState.newPostData.content = userInput.trim();
            saveNewPost(conversationState.newPostData);
            addBotMessage("Your post has been created successfully!");
            conversationState.creatingPost = false;
            conversationState.postCreationStep = 0;
            conversationState.newPostData = { topic: '', title: '', content: '' };
            break;
        default:
            conversationState.creatingPost = false;
            conversationState.postCreationStep = 0;
            conversationState.newPostData = { topic: '', title: '', content: '' };
            addBotMessage("Something went wrong. Let's start over. What would you like to do?");
            break;
    }
}

function saveNewPost(postData) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        topic: postData.topic,
        title: postData.title,
        content: postData.content,
        author: 'Rabie',
        date: new Date().toLocaleDateString()
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Add navigation for Teacher Tools button (updated for new UI)
const teacherToolsBtn = document.getElementById('btn-teacher-tools');
if (teacherToolsBtn) {
    teacherToolsBtn.addEventListener('click', function() {
        window.location.href = 'topics.html';
    });
}

// Add navigation for Logout button (updated for new UI)
const logoutBtn = document.getElementById('btn-logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
}

// Add navigation for New Post button (updated for new UI)
const newPostBtn = document.getElementById('btn-new-post');
if (newPostBtn) {
    newPostBtn.addEventListener('click', function() {
        window.location.href = 'newpost.html';
    });
}

// Add click handlers for chat items in sidebar
document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        
        // If it's the current page (index.html), just update active state
        if (page === 'index.html') {
            // Remove active class from all items
            document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        } else if (page) {
            // Navigate to the specified page
            window.location.href = page;
        }
    });
});

function getFollowUpQuestion() {
    const questions = [
        "Is there a specific topic you'd like to focus on?",
        "Would you like some tips on how to engage this student?",
        "Do you want suggestions for other learning styles?",
        "Feel free to tell me more about the student's interests!"
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

// New function to get all questions for user interaction
function getAllFollowUpQuestions() {
    return [
        "Is there a specific topic you'd like to focus on?",
        "Would you like some tips on how to engage this student?",
        "Do you want suggestions for other learning styles?",
        "Feel free to tell me more about the student's interests!",
        "Could you please specify the student's learning style: visual, auditory, or kinesthetic?",
        "Would you like more resources on a specific topic or explore a different topic?"
    ];
}

function addUserMessage(text) {
    const output = document.getElementById('chat-output');
    
    // Create message row for new dark chat UI
    const messageRow = document.createElement('div');
    messageRow.className = 'message-row outgoing';
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg outgoing';
    
    const textDiv = document.createElement('div');
    textDiv.textContent = text;
    
    const metaDiv = document.createElement('div');
    metaDiv.className = 'meta';
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    metaDiv.innerHTML = `<span>👁️ 1</span><span>${time}</span>`;
    
    msgDiv.appendChild(textDiv);
    msgDiv.appendChild(metaDiv);
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar-small';
    avatarDiv.textContent = '👤';
    
    messageRow.appendChild(msgDiv);
    messageRow.appendChild(avatarDiv);
    
    output.appendChild(messageRow);
    
    // Also add as legacy class for compatibility
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = text;
    userDiv.style.display = 'none'; // Hide legacy version
    output.appendChild(userDiv);
    
    output.scrollTop = output.scrollHeight;
}

function addBotMessage(text) {
    const output = document.getElementById('chat-output');
    
    // Create message row for new dark chat UI
    const messageRow = document.createElement('div');
    messageRow.className = 'message-row incoming';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar-small';
    avatarDiv.textContent = '🧙';
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg incoming';
    
    const textDiv = document.createElement('div');
    textDiv.innerHTML = text.replace(/\n/g, '<br>'); // Convert newlines to <br>
    
    const metaDiv = document.createElement('div');
    metaDiv.className = 'meta';
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    metaDiv.innerHTML = `<span>${time}</span>`;
    
    msgDiv.appendChild(textDiv);
    msgDiv.appendChild(metaDiv);
    
    messageRow.appendChild(avatarDiv);
    messageRow.appendChild(msgDiv);
    
    output.appendChild(messageRow);
    
    // Also add as legacy class for compatibility
    const botDiv = document.createElement('div');
    botDiv.className = 'bot-message';
    botDiv.innerHTML = text.replace(/\n/g, '<br>');
    botDiv.style.display = 'none'; // Hide legacy version
    output.appendChild(botDiv);
    
    output.scrollTop = output.scrollHeight;
}

const topicDatabase = {
    math: {
        videos: [
            { title: "Basic Algebra Explained", url: "https://www.youtube.com/watch?v=NybHckSEQBI", thumbnail: "https://img.youtube.com/vi/NybHckSEQBI/0.jpg" },
            { title: "Geometry for Beginners", url: "https://www.youtube.com/watch?v=h7apO7q16V0", thumbnail: "https://img.youtube.com/vi/h7apO7q16V0/0.jpg" }
        ],
        slides: [
            { title: "Algebra Basics Slides", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_0" },
            { title: "Geometry Fundamentals", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_1" }
        ],
        topics: ["Algebra", "Geometry", "Trigonometry"]
    },
    science: {
        videos: [
            { title: "Introduction to Physics", url: "https://www.youtube.com/watch?v=DsxSLRz0qJQ", thumbnail: "https://img.youtube.com/vi/DsxSLRz0qJQ/0.jpg" },
            { title: "Basics of Chemistry", url: "https://www.youtube.com/watch?v=thnDxFdkzZs", thumbnail: "https://img.youtube.com/vi/thnDxFdkzZs/0.jpg" }
        ],
        slides: [
            { title: "Physics Introduction", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_2" },
            { title: "Chemistry Basics", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_3" }
        ],
        topics: ["Physics", "Chemistry", "Biology"]
    },
    history: {
        videos: [
            { title: "World War II Overview", url: "https://www.youtube.com/watch?v=6LnCJG5L4qk", thumbnail: "https://img.youtube.com/vi/6LnCJG5L4qk/0.jpg" },
            { title: "Ancient Civilizations", url: "https://www.youtube.com/watch?v=sohXPx1CNKs", thumbnail: "https://img.youtube.com/vi/sohXPx1CNKs/0.jpg" }
        ],
        slides: [
            { title: "WWII Overview", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_4" },
            { title: "Ancient Civilizations", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_5" }
        ],
        topics: ["World War II", "Ancient Civilizations", "Medieval Times"]
    },
    english: {
        videos: [
            { title: "English Grammar Basics", url: "https://www.youtube.com/watch?v=0IFDuhd5b5c", thumbnail: "https://img.youtube.com/vi/0IFDuhd5b5c/0.jpg" },
            { title: "Literature Analysis", url: "https://www.youtube.com/watch?v=8crvB2rBJOA", thumbnail: "https://img.youtube.com/vi/8crvB2rBJOA/0.jpg" }
        ],
        slides: [
            { title: "Grammar Fundamentals", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_6" },
            { title: "Literature Study", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_7" }
        ],
        topics: ["Grammar", "Literature", "Writing"]
    },
    geography: {
        videos: [
            { title: "World Geography Overview", url: "https://www.youtube.com/watch?v=0Z5Kfz7W8qA", thumbnail: "https://img.youtube.com/vi/0Z5Kfz7W8qA/0.jpg" },
            { title: "Maps and Cartography", url: "https://www.youtube.com/watch?v=4H9-1tdNZVQ", thumbnail: "https://img.youtube.com/vi/4H9-1tdNZVQ/0.jpg" }
        ],
        slides: [
            { title: "Geography Basics", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_8" },
            { title: "Map Reading", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_9" }
        ],
        topics: ["Continents", "Countries", "Landforms"]
    },
    art: {
        videos: [
            { title: "Drawing for Beginners", url: "https://www.youtube.com/watch?v=7TXEZ4tP06c", thumbnail: "https://img.youtube.com/vi/7TXEZ4tP06c/0.jpg" },
            { title: "Painting Techniques", url: "https://www.youtube.com/watch?v=0vEoL4D2mOA", thumbnail: "https://img.youtube.com/vi/0vEoL4D2mOA/0.jpg" }
        ],
        slides: [
            { title: "Art Fundamentals", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_10" },
            { title: "Color Theory", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_11" }
        ],
        topics: ["Drawing", "Painting", "Sculpture"]
    },
    computerscience: {
        videos: [
            { title: "Programming Basics", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", thumbnail: "https://img.youtube.com/vi/8aGhZQkoFbQ/0.jpg" },
            { title: "Algorithms Explained", url: "https://www.youtube.com/watch?v=rL8X2mlNHPM", thumbnail: "https://img.youtube.com/vi/rL8X2mlNHPM/0.jpg" }
        ],
        slides: [
            { title: "Intro to Programming", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_12" },
            { title: "Algorithm Basics", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#slide=id.g1211a2d0d3_0_13" }
        ],
        topics: ["Programming", "Algorithms", "Data Structures"]
    }
};

// Load student database from localStorage, with default values
let studentDatabase = JSON.parse(localStorage.getItem('students')) || {
    "alice": { learningStyle: "visual", interests: ["art", "diagrams"] },
    "bob": { learningStyle: "auditory", interests: ["music", "discussions"] },
    "charlie": { learningStyle: "kinesthetic", interests: ["sports", "experiments"] },
    "diana": { learningStyle: "visual", interests: ["painting", "videos"] },
    "eve": { learningStyle: "auditory", interests: ["podcasts", "lectures"] }
};

const conversationState = {
    lastUserMessage: '',
    lastBotMessage: '',
    expectingLearningStyle: false,
    lastTopic: null,
    lastWikiTopic: null,  // Track last Wikipedia search for better context
    creatingPost: false,
    newPostData: {
        topic: '',
        title: '',
        content: ''
    },
    postCreationStep: 0,
    creatingLessonPlan: false,
    lessonPlanStep: 0,
    lessonPlanData: {
        student: '',
        topic: '',
        learningStyle: ''
    }
};

// Create popup form container and append to body
const popupContainer = document.createElement('div');
popupContainer.id = 'new-student-popup';
popupContainer.style.position = 'fixed';
popupContainer.style.top = '50%';
popupContainer.style.left = '50%';
popupContainer.style.transform = 'translate(-50%, -50%)';
popupContainer.style.backgroundColor = 'white';
popupContainer.style.border = '1px solid #ccc';
popupContainer.style.padding = '20px';
popupContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
popupContainer.style.zIndex = '1000';
popupContainer.style.display = 'none';
popupContainer.style.width = '300px';
popupContainer.style.borderRadius = '8px';
popupContainer.style.fontFamily = 'Arial, sans-serif';

// Popup form HTML content
popupContainer.innerHTML = `
    <h3 style="color: #333; margin-bottom: 15px; text-align: center;">Add New Student</h3>
    <label for="popup-student-name" style="display: block; margin-bottom: 5px; font-weight: bold;">Student Name:</label>
    <input type="text" id="popup-student-name" readonly style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
    <label for="popup-learning-style" style="display: block; margin-bottom: 5px; font-weight: bold;">Preferred Learning Style:</label>
    <select id="popup-learning-style" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
        <option value="">Select learning style</option>
        <option value="visual">Visual</option>
        <option value="auditory">Auditory</option>
        <option value="kinesthetic">Kinesthetic</option>
    </select>
    <label for="popup-age" style="display: block; margin-bottom: 5px; font-weight: bold;">Age:</label>
    <input type="number" id="popup-age" min="3" max="120" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
    <label for="popup-class" style="display: block; margin-bottom: 5px; font-weight: bold;">Class/Grade:</label>
    <input type="text" id="popup-class" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
    <label for="popup-favorite-subject" style="display: block; margin-bottom: 5px; font-weight: bold;">Favorite Subject:</label>
    <select id="popup-favorite-subject" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
        <option value="">Select favorite subject</option>
        <option value="math">Math</option>
        <option value="science">Science</option>
        <option value="history">History</option>
        <option value="english">English</option>
        <option value="geography">Geography</option>
        <option value="art">Art</option>
        <option value="computerscience">Computer Science</option>
    </select>
    <label for="popup-notes" style="display: block; margin-bottom: 5px; font-weight: bold;">Additional Notes:</label>
    <textarea id="popup-notes" rows="3" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"></textarea>
    <button id="popup-submit-btn" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Add Student</button>
    <button id="popup-cancel-btn" style="width: 100%; padding: 10px; margin-top: 10px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Cancel</button>
`;

// Append popup to body
document.body.appendChild(popupContainer);

// Show popup function
function showNewStudentPopup(studentName) {
    document.getElementById('popup-student-name').value = studentName;
    popupContainer.style.display = 'block';
}

// Hide popup function
function hideNewStudentPopup() {
    popupContainer.style.display = 'none';
    // Clear form fields
    document.getElementById('popup-learning-style').value = '';
    document.getElementById('popup-age').value = '';
    document.getElementById('popup-class').value = '';
    document.getElementById('popup-favorite-subject').value = '';
    document.getElementById('popup-notes').value = '';
}

// Handle popup submit
document.getElementById('popup-submit-btn').addEventListener('click', () => {
    const studentName = document.getElementById('popup-student-name').value.trim().toLowerCase();
    const learningStyle = document.getElementById('popup-learning-style').value;
    const age = document.getElementById('popup-age').value;
    const studentClass = document.getElementById('popup-class').value.trim();
    const favoriteSubject = document.getElementById('popup-favorite-subject').value.trim();
    const notes = document.getElementById('popup-notes').value.trim();

    if (!studentName || !learningStyle || !age || !studentClass) {
        alert('Please fill in all required fields.');
        return;
    }

    // Save new student data to localStorage and update studentDatabase
    let students = JSON.parse(localStorage.getItem('students')) || {};
    students[studentName] = {
        learningStyle: learningStyle,
        age: age,
        class: studentClass,
        favoriteSubject: favoriteSubject,
        notes: notes
    };
    localStorage.setItem('students', JSON.stringify(students));
    studentDatabase = students;

    hideNewStudentPopup();

    // Continue lesson plan flow with new student
    conversationState.lessonPlanData.student = studentName;
    conversationState.lessonPlanData.learningStyle = learningStyle;
    conversationState.lessonPlanStep = 2;
    addBotMessage(`Thanks! I've added ${studentName.charAt(0).toUpperCase() + studentName.slice(1)} as a new student. What topic would you like to create a lesson plan for?`);
});

// Handle popup cancel
document.getElementById('popup-cancel-btn').addEventListener('click', () => {
    hideNewStudentPopup();
});

function getTeachingSuggestion(profile) {
    const lowerProfile = profile.toLowerCase();
    let response = '';
    let videos = [];

    // Check for course-related questions
    if (lowerProfile.includes('course') || lowerProfile.includes('courses')) {
        const courses = getAllCourses ? getAllCourses() : [];
        if (courses.length === 0) {
            response = "📚 There are currently no courses uploaded. Teachers can upload courses through the Teacher Dashboard.";
        } else {
            response = `📚 Available Courses:\n\n`;
            courses.forEach((course, index) => {
                response += `${index + 1}. **${course.title}**\n`;
                response += `   📖 ${course.description}\n`;
                response += `   👨‍🏫 By: ${course.createdBy}\n`;
                response += `   📁 Files: ${course.files?.length || 0}\n\n`;
            });
            response += "Would you like more details about any specific course?";
        }
        return { text: response, videos: [] };
    }

    // Check for schedule-related questions
    if (lowerProfile.includes('schedule') || lowerProfile.includes('timetable') || lowerProfile.includes('emploi')) {
        const weekNum = getCurrentWeekNumber ? getCurrentWeekNumber() : 0;
        const schedule = getSchedule ? getSchedule('general', weekNum) : null;
        
        if (!schedule) {
            response = "📅 No schedule has been uploaded for this week yet. Please check with your teacher.";
        } else {
            response = `📅 This Week's Schedule (Week ${weekNum}):\n\n`;
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
            const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            
            days.forEach((day, idx) => {
                if (schedule[day] && schedule[day].length > 0) {
                    response += `**${dayNames[idx]}:**\n`;
                    schedule[day].forEach(slot => {
                        if (slot.subject) {
                            response += `  • ${slot.time}: ${slot.subject}`;
                            if (slot.teacher) response += ` (${slot.teacher})`;
                            if (slot.room) response += ` - Room ${slot.room}`;
                            response += `\n`;
                        }
                    });
                    response += `\n`;
                }
            });
            
            if (schedule.uploadedBy) {
                response += `\n_Schedule uploaded by ${schedule.uploadedBy}_`;
            }
        }
        return { text: response, videos: [] };
    }

    // Check for file/material questions
    if (lowerProfile.includes('file') || lowerProfile.includes('material') || lowerProfile.includes('document') || lowerProfile.includes('image') || lowerProfile.includes('picture') || lowerProfile.includes('photo')) {
        const allFiles = getFiles ? getFiles() : [];
        const courseFiles = allFiles.filter(f => f.category === 'course' || f.category === 'document');
        const imageFiles = allFiles.filter(f => f.type && f.type.startsWith('image'));
        
        if (allFiles.length === 0) {
            response = "📁 No files have been uploaded yet. Teachers can upload materials through the dashboard.";
        } else {
            response = "📁 **Available Files & Materials:**\n\n";
            
            // Show course files
            if (courseFiles.length > 0) {
                response += "**📄 Documents & Course Materials:**\n";
                courseFiles.slice(0, 5).forEach((file, index) => {
                    response += `${index + 1}. ${file.name}\n`;
                    response += `   📅 ${new Date(file.uploadedAt).toLocaleDateString()}\n`;
                    response += `   👨‍🏫 By: ${file.uploadedBy}\n`;
                    response += `   💾 Size: ${formatFileSize(file.size)}\n\n`;
                });
                if (courseFiles.length > 5) {
                    response += `... and ${courseFiles.length - 5} more documents.\n\n`;
                }
            }
            
            // Show images
            if (imageFiles.length > 0) {
                response += "**🖼️ Images & Photos:**\n";
                imageFiles.slice(0, 5).forEach((file, index) => {
                    response += `${index + 1}. ${file.name}\n`;
                    response += `   📅 ${new Date(file.uploadedAt).toLocaleDateString()}\n`;
                    response += `   👨‍🏫 By: ${file.uploadedBy}\n\n`;
                });
                if (imageFiles.length > 5) {
                    response += `... and ${imageFiles.length - 5} more images.\n\n`;
                }
            }
            
            // Add interactive file display
            setTimeout(() => {
                displayFilesWithDownload(courseFiles, imageFiles);
            }, 500);
            
            response += "\n💡 Files and images will appear below with download buttons!";
        }
        return { text: response, videos: [] };
    }

    // === ADVANCED BOT COMMANDS ===
    
    // Add Student Command
    if (lowerProfile.match(/add|create|register.*student/i)) {
        if (!hasPermission('upload')) {
            return { text: "🔒 Sorry! Only teachers can add students. You can view student information instead.", videos: [] };
        }
        
        const nameMatch = lowerProfile.match(/(?:named?|called)\s+([a-z]+)/i);
        const ageMatch = lowerProfile.match(/age\s+(\d+)/i);
        const styleMatch = lowerProfile.match(/(visual|auditory|kinesthetic)/i);
        const gradeMatch = lowerProfile.match(/grade\s+(\d+|[a-z]+)/i);
        
        if (nameMatch && ageMatch && styleMatch) {
            const name = nameMatch[1].toLowerCase();
            const age = ageMatch[1];
            const style = styleMatch[1].toLowerCase();
            const grade = gradeMatch ? gradeMatch[1] : 'Not specified';
            
            let students = JSON.parse(localStorage.getItem('students')) || {};
            students[name] = {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                age: age,
                learningStyle: style,
                class: grade,
                favoriteSubject: '',
                notes: 'Added via chat command',
                addedAt: new Date().toISOString()
            };
            localStorage.setItem('students', JSON.stringify(students));
            
            response = `✅ **Student Added Successfully!**\n\n`;
            response += `📝 **Name:** ${name.charAt(0).toUpperCase() + name.slice(1)}\n`;
            response += `🎂 **Age:** ${age} years old\n`;
            response += `🎨 **Learning Style:** ${style.charAt(0).toUpperCase() + style.slice(1)}\n`;
            response += `📚 **Grade:** ${grade}\n\n`;
            response += `${name.charAt(0).toUpperCase() + name.slice(1)} has been registered in the system!\n`;
            response += `You can now create personalized lesson plans for them.`;
            
            return { text: response, videos: [] };
        } else {
            response = `📝 **To add a student, please provide:**\n\n`;
            response += `✓ Name: "named [name]" or "called [name]"\n`;
            response += `✓ Age: "age [number]"\n`;
            response += `✓ Learning Style: visual, auditory, or kinesthetic\n`;
            response += `✓ Grade (optional): "grade [number]"\n\n`;
            response += `**Example:** "Add student named Sarah, age 12, visual learner, grade 7"`;
            return { text: response, videos: [] };
        }
    }

    // Create Course Command
    if (lowerProfile.match(/create|add|new.*course/i)) {
        if (!hasPermission('upload')) {
            return { text: "🔒 Sorry! Only teachers can create courses.", videos: [] };
        }
        
        const titleMatch = lowerProfile.match(/(?:called|named|titled)\s+"([^"]+)"|(?:called|named|titled)\s+([a-z0-9\s]+?)(?:\s+for|\s+with|$)/i);
        const descMatch = lowerProfile.match(/(?:description|about)\s+"([^"]+)"|(?:description|about)\s+([^,\.]+)/i);
        
        if (titleMatch) {
            const title = titleMatch[1] || titleMatch[2];
            const description = descMatch ? (descMatch[1] || descMatch[2]) : 'No description provided';
            
            let courses = JSON.parse(localStorage.getItem('courses')) || [];
            const newCourse = {
                id: Date.now().toString(),
                title: title.trim(),
                description: description.trim(),
                createdBy: getCurrentUser()?.name || 'Teacher',
                createdAt: new Date().toISOString(),
                files: []
            };
            courses.push(newCourse);
            localStorage.setItem('courses', JSON.stringify(courses));
            
            response = `✅ **Course Created Successfully!**\n\n`;
            response += `📚 **Title:** ${title}\n`;
            response += `📖 **Description:** ${description}\n`;
            response += `👨‍🏫 **Created by:** ${getCurrentUser()?.name || 'Teacher'}\n\n`;
            response += `The course is now available! You can upload materials through the Teacher Dashboard.`;
            
            return { text: response, videos: [] };
        } else {
            response = `📚 **To create a course, please provide:**\n\n`;
            response += `✓ Title: "called [name]" or "titled [name]"\n`;
            response += `✓ Description (optional): "description [text]"\n\n`;
            response += `**Examples:**\n`;
            response += `• "Create course called Advanced Physics"\n`;
            response += `• "Add course titled Python Programming description Learn Python basics"`;
            return { text: response, videos: [] };
        }
    }

    // Search Students Command
    if (lowerProfile.match(/(?:show|list|find|search).*(all\s+)?students?/i)) {
        const students = JSON.parse(localStorage.getItem('students')) || {};
        const studentKeys = Object.keys(students);
        
        // Filter by learning style if specified
        const styleFilter = lowerProfile.match(/(visual|auditory|kinesthetic)/i);
        const gradeFilter = lowerProfile.match(/grade\s+(\d+)/i);
        
        let filteredStudents = studentKeys;
        if (styleFilter) {
            const style = styleFilter[1].toLowerCase();
            filteredStudents = filteredStudents.filter(key => students[key].learningStyle === style);
        }
        if (gradeFilter) {
            const grade = gradeFilter[1];
            filteredStudents = filteredStudents.filter(key => students[key].class && students[key].class.includes(grade));
        }
        
        if (filteredStudents.length === 0) {
            response = styleFilter || gradeFilter 
                ? `📊 No students found matching your criteria.`
                : `📋 No students registered yet. Add students through the Students page or use the "add student" command.`;
        } else {
            const filterDesc = styleFilter ? ` (${styleFilter[1]} learners)` : gradeFilter ? ` (Grade ${gradeFilter[1]})` : '';
            response = `📊 **Student List${filterDesc}:**\n\n`;
            filteredStudents.forEach((key, index) => {
                const student = students[key];
                response += `${index + 1}. **${student.name || key}**\n`;
                response += `   🎂 Age: ${student.age} | 📚 Grade: ${student.class || 'N/A'}\n`;
                response += `   🎨 Learning Style: ${student.learningStyle}\n`;
                if (student.favoriteSubject) {
                    response += `   ❤️ Favorite: ${student.favoriteSubject}\n`;
                }
                response += `\n`;
            });
            response += `**Total:** ${filteredStudents.length} student(s)`;
        }
        return { text: response, videos: [] };
    }

    // Student Statistics Command
    if (lowerProfile.match(/statistics|stats.*students?|how many students/i)) {
        const students = JSON.parse(localStorage.getItem('students')) || {};
        const studentKeys = Object.keys(students);
        
        if (studentKeys.length === 0) {
            return { text: "📊 No students registered yet.", videos: [] };
        }
        
        let visual = 0, auditory = 0, kinesthetic = 0;
        let subjects = {};
        let totalAge = 0;
        
        studentKeys.forEach(key => {
            const student = students[key];
            if (student.learningStyle === 'visual') visual++;
            else if (student.learningStyle === 'auditory') auditory++;
            else if (student.learningStyle === 'kinesthetic') kinesthetic++;
            
            if (student.favoriteSubject) {
                subjects[student.favoriteSubject] = (subjects[student.favoriteSubject] || 0) + 1;
            }
            totalAge += parseInt(student.age) || 0;
        });
        
        const avgAge = (totalAge / studentKeys.length).toFixed(1);
        const mostPopular = Object.keys(subjects).reduce((a, b) => subjects[a] > subjects[b] ? a : b, '');
        
        response = `📊 **Student Statistics:**\n\n`;
        response += `👥 **Total Students:** ${studentKeys.length}\n\n`;
        response += `🎨 **Learning Styles:**\n`;
        response += `   • Visual: ${visual} (${((visual/studentKeys.length)*100).toFixed(0)}%)\n`;
        response += `   • Auditory: ${auditory} (${((auditory/studentKeys.length)*100).toFixed(0)}%)\n`;
        response += `   • Kinesthetic: ${kinesthetic} (${((kinesthetic/studentKeys.length)*100).toFixed(0)}%)\n\n`;
        response += `🎂 **Average Age:** ${avgAge} years\n`;
        if (mostPopular) {
            response += `📚 **Most Popular Subject:** ${mostPopular} (${subjects[mostPopular]} students)`;
        }
        
        return { text: response, videos: [] };
    }

    // Wikipedia Search Integration - Enhanced with detailed content and images
    // Updated regex to match complex phrases including "of", "the", etc.
    const wikiMatch = lowerProfile.match(/(?:what is|what are|what's|tell me (?:more )?about|explain|define|search for|who is|who was|who are|more about|learn about|info about|information about)\s+(?:the\s+)?(.+?)(?:\?|$)/i);
    if (wikiMatch && 
        !lowerProfile.includes('lesson plan') && 
        !lowerProfile.includes('create') &&
        !lowerProfile.includes('add student') &&
        !lowerProfile.includes('show me the')) {
        
        const searchTerm = wikiMatch[1].trim();
        
        // Check if this is the same topic as before
        const isSameTopic = conversationState.lastWikiTopic && 
                           searchTerm.toLowerCase() === conversationState.lastWikiTopic.toLowerCase();
        
        if (isSameTopic) {
            // User asking about the same topic again - suggest related topics or provide context
            response = `💭 **You've already learned about "${searchTerm}"!**\n\n`;
            response += `Would you like to explore:\n`;
            response += `• A related topic? (e.g., "What is..." something related)\n`;
            response += `• A different aspect? Try being more specific\n`;
            response += `• Or ask about something completely new!\n\n`;
            response += `📖 **Quick reminder about ${searchTerm}:**\n`;
            response += `Scroll up to see the full article with images and details I already shared!\n\n`;
            response += `💡 **Tip:** Wikipedia articles are comprehensive. The "Read Full Article" button above has even more information if you need it!`;
            
            return { text: response, videos: [] };
        }
        
        response = `🔍 **Searching Wikipedia for "${searchTerm}"...**\n\n`;
        
        // Call Wikipedia API for detailed content
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`)
            .then(res => res.json())
            .then(data => {
                if (data.extract) {
                    let wikiResponse = `<div class="wikipedia-result" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border-left: 4px solid #8b5cf6; padding: 20px; border-radius: 12px; margin: 10px 0;">`;
                    
                    // Add image if available
                    if (data.thumbnail && data.thumbnail.source) {
                        wikiResponse += `<img src="${data.thumbnail.source}" alt="${data.title}" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`;
                    } else if (data.originalimage && data.originalimage.source) {
                        wikiResponse += `<img src="${data.originalimage.source}" alt="${data.title}" style="max-width: 100%; max-height: 300px; height: auto; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`;
                    }
                    
                    wikiResponse += `<h3 style="color: #8b5cf6; margin-top: 0;">📖 ${data.title}</h3>`;
                    
                    // Add description if available (more detailed than extract)
                    if (data.description) {
                        wikiResponse += `<p style="color: #94a3b8; font-style: italic; margin-bottom: 10px;">📌 ${data.description}</p>`;
                    }
                    
                    // Full extract (detailed content)
                    wikiResponse += `<p style="line-height: 1.8; color: #e2e8f0;">${data.extract}</p>`;
                    
                    // Add additional details if available
                    if (data.extract_html) {
                        wikiResponse += `<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(139, 92, 246, 0.3);">${data.extract_html}</div>`;
                    }
                    
                    // Add "Did you know" section for interesting facts
                    wikiResponse += `<div style="margin-top: 15px; padding: 10px; background: rgba(139, 92, 246, 0.15); border-radius: 8px;">`;
                    wikiResponse += `<strong style="color: #a78bfa;">💡 Quick Facts:</strong><br>`;
                    if (data.type) {
                        wikiResponse += `<span style="color: #cbd5e1;">• Type: ${data.type}</span><br>`;
                    }
                    if (data.timestamp) {
                        const lastUpdated = new Date(data.timestamp).toLocaleDateString();
                        wikiResponse += `<span style="color: #cbd5e1;">• Last updated: ${lastUpdated}</span><br>`;
                    }
                    wikiResponse += `</div>`;
                    
                    // Add link to full article
                    if (data.content_urls && data.content_urls.desktop) {
                        wikiResponse += `<div style="margin-top: 15px; text-align: center;">`;
                        wikiResponse += `<a href="${data.content_urls.desktop.page}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 6px rgba(139, 92, 246, 0.4); transition: transform 0.2s;">🔗 Read Full Article on Wikipedia</a>`;
                        wikiResponse += `</div>`;
                    }
                    
                    wikiResponse += `</div>`;
                    
                    addBotMessage(wikiResponse);
                    
                    // Store the last searched topic for context
                    conversationState.lastWikiTopic = searchTerm;
                    
                    // Offer related topics with better suggestions
                    setTimeout(() => {
                        let followUp = `💡 **Explore More Topics:**\n\n`;
                        followUp += `📚 **Try asking about:**\n`;
                        followUp += `• Related concepts (e.g., if you learned about DNA, ask "What are chromosomes?")\n`;
                        followUp += `• Different topics: "What is [new topic]?"\n`;
                        followUp += `• Historical figures: "Who was [person]?"\n`;
                        followUp += `• Scientific terms: "Explain [concept]"\n\n`;
                        followUp += `🔗 **Want MORE details?** Click the "Read Full Article" button above for the complete Wikipedia page!\n\n`;
                        followUp += `⚠️ **Note:** Asking about "${searchTerm}" again will show you've already learned this topic.`;
                        addBotMessage(followUp);
                    }, 1000);
                } else {
                    addBotMessage(`❌ Sorry, I couldn't find information about "${searchTerm}" on Wikipedia. Try:\n• Checking your spelling\n• Using a different phrasing\n• Being more specific (e.g., "Albert Einstein" instead of just "Einstein")`);
                }
            })
            .catch(error => {
                console.error('Wikipedia API Error:', error);
                addBotMessage(`⚠️ Unable to connect to Wikipedia. Please check your internet connection and try again.`);
            });
        
        return { text: response, videos: [] };
    }

    // Check if user is responding to learning style prompt
    if (conversationState.expectingLearningStyle) {
        if (lowerProfile.includes('visual')) {
            response = "Excellent choice! Visual learners thrive with visual aids like diagrams, charts, and videos. This approach can make learning more engaging and memorable for the student.";
        } else if (lowerProfile.includes('auditory')) {
            response = "Perfect! Auditory learners absorb information best through listening. Incorporating discussions, podcasts, and audio explanations will help the student retain information more effectively.";
        } else if (lowerProfile.includes('kinesthetic')) {
            response = "Great insight! Kinesthetic learners learn by doing. Hands-on activities, experiments, and interactive exercises will be key to keeping this student motivated and engaged.";
        } else {
            response = "I'm sorry, I didn't understand that. Could you please clarify the student's learning style? Is it visual (learning through seeing), auditory (learning through hearing), or kinesthetic (learning through doing)?";
            conversationState.expectingLearningStyle = true;
            return { text: response, videos: [] };
        }
        conversationState.expectingLearningStyle = false;
        return { text: response, videos: [] };
    }

    // Normal processing
    if (lowerProfile.includes('visual')) {
        response += 'For a visual learner, I recommend incorporating diagrams, videos, and visual aids into your teaching strategy. This can help the student visualize concepts and improve comprehension. ';
    } else if (lowerProfile.includes('auditory')) {
        response += 'An auditory learner would benefit from discussions, lectures, and audio materials. Try using podcasts or recorded explanations to reinforce key points. ';
    } else if (lowerProfile.includes('kinesthetic')) {
        response += 'Kinesthetic learners excel with hands-on activities, experiments, and role-playing. Incorporating movement and tactile experiences can make learning more effective. ';
    } else {
        if (isTeachingQuery(lowerProfile)) {
            response += 'To provide the best suggestions, could you tell me more about the student\'s learning style? Are they visual, auditory, or kinesthetic? ';
            conversationState.expectingLearningStyle = true;
        }
    }

    // Check for topics in the profile - only if NOT asking a question
    // This prevents "what is math" from showing topic resources instead of Wikipedia
    const isExplicitQuestion = lowerProfile.match(/(?:what is|what are|tell me about|explain|define|who is|who was)/i);
    
    if (!isExplicitQuestion) {
        for (const topic in topicDatabase) {
            if (lowerProfile.includes(topic)) {
                const topicInfo = topicDatabase[topic];
                videos = topicInfo.videos;
                response += `Regarding ${topic}, here are some foundational topics to explore: ${topicInfo.topics.join(', ')}. These can serve as building blocks for more advanced concepts.`;
                conversationState.lastTopic = topic;
                break;
            }
        }
    } else {
        // If it's an explicit question but no Wikipedia match, guide them
        if (!response || response === 'Hello! How can I assist you today?') {
            response = `🤔 I noticed you're asking a question! For detailed information from Wikipedia, try phrasing it like:\n• "What is [topic]?"\n• "Tell me about [topic]"\n• "Explain [topic]"\n\nOr I can show you our course materials and videos if you prefer!`;
        }
    }

    return { text: response, videos: videos };
}

function getFollowUpQuestion() {
    const questions = [
        "Is there a specific topic you'd like to focus on?",
        "Would you like some tips on how to engage this student?",
        "Do you want suggestions for other learning styles?",
        "Feel free to tell me more about the student's interests!"
    ];

    // Add context-aware follow-up
    if (conversationState.expectingLearningStyle) {
        return "Could you please specify the student's learning style: visual, auditory, or kinesthetic?";
    }

    if (conversationState.lastTopic) {
        return `Would you like more resources on ${conversationState.lastTopic} or explore a different topic?`;
    }

    return questions[Math.floor(Math.random() * questions.length)];
}

function showVideoSuggestions(videos) {
    const videoList = document.getElementById('video-list');
    if (!videoList) return;
    videoList.innerHTML = ''; // Clear previous

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';

        const thumbnail = document.createElement('img');
        thumbnail.className = 'video-thumbnail';
        thumbnail.src = video.thumbnail;
        thumbnail.alt = video.title;

        const title = document.createElement('div');
        title.className = 'video-title';
        title.textContent = video.title;

        videoItem.appendChild(thumbnail);
        videoItem.appendChild(title);

        videoItem.addEventListener('click', () => {
            window.open(video.url, '_blank');
        });

        videoList.appendChild(videoItem);
    });
}

function showSlideSuggestions(slides) {
    const slideList = document.getElementById('slide-list');
    if (!slideList) return;
    slideList.innerHTML = ''; // Clear previous

    slides.forEach(slide => {
        const slideItem = document.createElement('div');
        slideItem.className = 'slide-item';

        const title = document.createElement('div');
        title.className = 'slide-title';
        title.textContent = slide.title;

        slideItem.appendChild(title);

        slideItem.addEventListener('click', () => {
            window.open(slide.url, '_blank');
        });

        slideList.appendChild(slideItem);
    });
}

function clearVideoSuggestions() {
    const videoList = document.getElementById('video-list');
    if (!videoList) return;
    videoList.innerHTML = '';
}

function clearSlideSuggestions() {
    const slideList = document.getElementById('slide-list');
    if (!slideList) return;
    slideList.innerHTML = '';
}

function isGreeting(query) {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
    const lowerQuery = query.toLowerCase();
    return greetings.some(greeting => lowerQuery.includes(greeting));
}

function isTeachingQuery(query) {
    const teachingKeywords = ['teach', 'teaching', 'method', 'suggestion', 'suggest', 'learn', 'learning', 'student', 'class', 'lesson'];
    return teachingKeywords.some(keyword => query.includes(keyword));
}

function stopSageAnimation() {
    const sageAvatar = document.getElementById('sage-avatar');
    const sageStatus = document.getElementById('sage-status');
    if (sageAvatar) sageAvatar.classList.remove('talking');
    if (sageStatus) {
        sageStatus.classList.remove('typing');
        sageStatus.textContent = 'Online';
    }
}

function handleLessonPlanStep(userInput) {
    switch (conversationState.lessonPlanStep) {
        case 1:
            // Get student name and deduce learning style
            const studentName = userInput.trim().toLowerCase();
            const student = studentDatabase[studentName];
            if (student) {
                conversationState.lessonPlanData.student = studentName;
                conversationState.lessonPlanData.learningStyle = student.learningStyle;
                conversationState.lessonPlanStep = 2;
                addBotMessage(`Great! I know ${studentName.charAt(0).toUpperCase() + studentName.slice(1)}. Based on my records, they are a ${student.learningStyle} learner with interests in ${student.interests.join(', ')}. What topic would you like to create a lesson plan for?`);
            } else {
            addBotMessage(`I don't have information about ${studentName} in my database. Could you please provide their learning style (visual, auditory, or kinesthetic) so I can help create a personalized lesson plan?`);
            // Add a button to open popup form for new student without changing old code
            setTimeout(() => {
                const output = document.getElementById('chat-output');
                const button = document.createElement('button');
                button.textContent = 'Add New Student';
                button.style.marginTop = '10px';
                button.style.padding = '10px 20px';
                button.style.backgroundColor = '#007bff';
                button.style.color = 'white';
                button.style.border = 'none';
                button.style.borderRadius = '5px';
                button.style.cursor = 'pointer';
                button.style.fontSize = '16px';
                button.style.fontWeight = 'bold';
                button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                button.onmouseover = () => {
                    button.style.backgroundColor = '#0056b3';
                };
                button.onmouseout = () => {
                    button.style.backgroundColor = '#007bff';
                };
                button.onclick = () => {
                    showNewStudentPopup(studentName);
                };
                output.appendChild(button);
            }, 100); // Delay to ensure previous message is rendered
            conversationState.lessonPlanStep = 1.5; // Special step for unknown student
        }
        break;
        case 1.5:
            // Handle learning style for unknown student
            const learningStyle = userInput.trim().toLowerCase();
            if (['visual', 'auditory', 'kinesthetic'].includes(learningStyle)) {
                conversationState.lessonPlanData.learningStyle = learningStyle;
                conversationState.lessonPlanStep = 2;
                addBotMessage(`Perfect! Now, what topic would you like to create a lesson plan for?`);
            } else {
                addBotMessage("Please specify the learning style: visual, auditory, or kinesthetic.");
            }
            break;
        case 2:
            // Get topic and generate lesson plan
            const topic = userInput.trim().toLowerCase();
            conversationState.lessonPlanData.topic = topic;
            generateLessonPlan(conversationState.lessonPlanData);
            conversationState.creatingLessonPlan = false;
            conversationState.lessonPlanStep = 0;
            conversationState.lessonPlanData = { student: '', topic: '', learningStyle: '' };
            break;
        default:
            conversationState.creatingLessonPlan = false;
            conversationState.lessonPlanStep = 0;
            conversationState.lessonPlanData = { student: '', topic: '', learningStyle: '' };
            addBotMessage("Something went wrong. Let's start over. What would you like to do?");
            break;
    }
}

function generateLessonPlan(data) {
    const { student, topic, learningStyle } = data;
    let response = `Here's a personalized lesson plan for ${student.charAt(0).toUpperCase() + student.slice(1)} on ${topic}:\n\n`;

    // Check if topic matches student's favorite subject
    const studentInfo = studentDatabase[student];
    const isFavoriteSubject = studentInfo && studentInfo.favoriteSubject === topic;

    // Get topic-specific resources
    const topicInfo = topicDatabase[topic];
    if (topicInfo) {
        response += `**Learning Style:** ${learningStyle.charAt(0).toUpperCase() + learningStyle.slice(1)}\n\n`;
        if (isFavoriteSubject) {
            response += `**Note:** This is ${student.charAt(0).toUpperCase() + student.slice(1)}'s favorite subject! I've tailored the resources accordingly.\n\n`;
        }

        // Customize based on learning style
        if (learningStyle === 'visual') {
            response += `**Teaching Strategy:** Use diagrams, charts, and visual demonstrations to help ${student} visualize concepts.\n\n`;
        } else if (learningStyle === 'auditory') {
            response += `**Teaching Strategy:** Incorporate discussions, audio explanations, and group talks to engage ${student}'s auditory learning style.\n\n`;
        } else if (learningStyle === 'kinesthetic') {
            response += `**Recommended Activities:**\n`;
            response += `- Hands-on experiments\n`;
            response += `- Interactive demonstrations\n`;
            response += `- Group projects\n`;
            response += `\n**Teaching Strategy:** Include movement, experiments, and tactile experiences to keep ${student} engaged.\n\n`;
        }

        // Add resource sections to the response
        response += `**📚 Recommended Lecture Slides:**\n`;
        topicInfo.slides.forEach(slide => {
            response += `- ${slide.title}\n`;
        });
        response += `\n**🎥 Recommended Video Suggestions:**\n`;
        topicInfo.videos.forEach(video => {
            response += `- ${video.title}\n`;
        });

        // Show resources in the dedicated sections below the chat
        showSlideSuggestions(topicInfo.slides);
        showVideoSuggestions(topicInfo.videos);
    } else {
        response += `I don't have specific resources for ${topic}, but here's a general plan:\n\n`;
        response += `**Learning Objectives:**\n- Understand key concepts in ${topic}\n- Apply knowledge through practice\n\n`;
        response += `**Activities:**\n- Introduction and discussion\n- Hands-on practice\n- Review and assessment\n\n`;
        response += `**Materials Needed:**\n- Textbook or online resources\n- Writing materials\n- Any topic-specific tools\n\n`;
        response += `**Note:** For more specific video suggestions and lecture slides, try topics like math, science, history, english, geography, art, or computerscience.`;
    }

    addBotMessage(response);
}

// Helper function to format file size
function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Display files with download buttons
function displayFilesWithDownload(courseFiles, imageFiles) {
    const chatOutput = document.getElementById('chat-output');
    
    // Create container for file display
    const fileContainer = document.createElement('div');
    fileContainer.className = 'file-display-container';
    fileContainer.style.cssText = `
        margin: 15px 0;
        padding: 15px;
        background: rgba(139, 0, 139, 0.1);
        border: 1px solid rgba(139, 0, 139, 0.3);
        border-radius: 10px;
    `;
    
    // Display course files/documents
    if (courseFiles && courseFiles.length > 0) {
        const docsSection = document.createElement('div');
        docsSection.className = 'docs-section';
        docsSection.innerHTML = '<h4 style="color: #FFD700; margin-bottom: 10px;">📚 Course Materials & Documents</h4>';
        
        courseFiles.forEach(file => {
            const fileCard = createFileCard(file, false);
            docsSection.appendChild(fileCard);
        });
        
        fileContainer.appendChild(docsSection);
    }
    
    // Display images
    if (imageFiles && imageFiles.length > 0) {
        const imagesSection = document.createElement('div');
        imagesSection.className = 'images-section';
        imagesSection.style.marginTop = '15px';
        imagesSection.innerHTML = '<h4 style="color: #FFD700; margin-bottom: 10px;">🖼️ Images & Photos</h4>';
        
        imageFiles.forEach(file => {
            const fileCard = createFileCard(file, true);
            imagesSection.appendChild(fileCard);
        });
        
        fileContainer.appendChild(imagesSection);
    }
    
    // Append to chat
    chatOutput.appendChild(fileContainer);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Create individual file card with download button
function createFileCard(file, isImage) {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        margin: 8px 0;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(139, 0, 139, 0.5);
        border-radius: 8px;
        transition: all 0.3s ease;
    `;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.background = 'rgba(139, 0, 139, 0.2)';
        card.style.borderColor = '#FFD700';
        card.style.transform = 'translateX(5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(0, 0, 0, 0.3)';
        card.style.borderColor = 'rgba(139, 0, 139, 0.5)';
        card.style.transform = 'translateX(0)';
    });
    
    // File preview/icon
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    preview.style.cssText = `
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(139, 0, 139, 0.2);
        border-radius: 5px;
        flex-shrink: 0;
    `;
    
    if (isImage && file.preview) {
        // Show image thumbnail
        const img = document.createElement('img');
        img.src = file.preview;
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 5px;';
        img.alt = file.name;
        preview.appendChild(img);
    } else {
        // Show file icon
        const icon = document.createElement('span');
        icon.style.cssText = 'font-size: 30px;';
        icon.textContent = getFileIcon(file.type);
        preview.appendChild(icon);
    }
    
    // File info
    const info = document.createElement('div');
    info.className = 'file-info';
    info.style.cssText = 'flex: 1; min-width: 0;';
    
    const fileName = document.createElement('div');
    fileName.className = 'file-name';
    fileName.style.cssText = `
        color: #FFD700;
        font-weight: bold;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `;
    fileName.textContent = file.name;
    fileName.title = file.name; // Show full name on hover
    
    const fileDetails = document.createElement('div');
    fileDetails.className = 'file-details';
    fileDetails.style.cssText = 'color: #CCC; font-size: 0.85em;';
    fileDetails.innerHTML = `
        <span>${formatFileSize(file.size)}</span> • 
        <span>${file.category || 'File'}</span> • 
        <span>Uploaded ${new Date(file.uploadedAt).toLocaleDateString()}</span>
    `;
    
    info.appendChild(fileName);
    info.appendChild(fileDetails);
    
    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.innerHTML = '⬇️ Download';
    downloadBtn.style.cssText = `
        padding: 8px 16px;
        background: linear-gradient(135deg, #8B008B, #4B0082);
        color: #FFD700;
        border: 1px solid #FFD700;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        flex-shrink: 0;
    `;
    
    downloadBtn.addEventListener('mouseenter', () => {
        downloadBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
        downloadBtn.style.color = '#4B0082';
        downloadBtn.style.transform = 'scale(1.05)';
    });
    downloadBtn.addEventListener('mouseleave', () => {
        downloadBtn.style.background = 'linear-gradient(135deg, #8B008B, #4B0082)';
        downloadBtn.style.color = '#FFD700';
        downloadBtn.style.transform = 'scale(1)';
    });
    
    downloadBtn.addEventListener('click', () => {
        downloadFile(file);
    });
    
    // Assemble card
    card.appendChild(preview);
    card.appendChild(info);
    card.appendChild(downloadBtn);
    
    return card;
}

// Get file icon based on type
function getFileIcon(type) {
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📊';
    if (type.includes('text')) return '📃';
    if (type.includes('zip') || type.includes('rar')) return '📦';
    return '📁';
}

// Download file function
function downloadFile(file) {
    try {
        // Create download link
        const link = document.createElement('a');
        
        if (file.preview) {
            // If preview exists (base64), use it
            link.href = file.preview;
        } else if (file.url) {
            // If file URL exists
            link.href = file.url;
        } else {
            throw new Error('No file data available');
        }
        
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        const notification = document.createElement('div');
        notification.textContent = `✅ Downloading ${file.name}...`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #8B008B, #4B0082);
            color: #FFD700;
            padding: 15px 25px;
            border-radius: 10px;
            border: 2px solid #FFD700;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
        
    } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading file. Please try again.');
    }
}
