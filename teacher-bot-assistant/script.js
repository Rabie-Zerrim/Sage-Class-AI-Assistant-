document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'submit-btn') {
    event.preventDefault();
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

    // Simulate bot response
    setTimeout(() => {
        // Check for greetings
        if (isGreeting(query)) {
            addBotMessage("Hello! I'm GATA, your Generative AI Teaching Assistant. How can I help you today?");
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

        // If user asks to create a post, start multi-step post creation
        if (query.toLowerCase().includes('create a post') || query.toLowerCase().includes('plus create a post')) {
            conversationState.creatingPost = true;
            conversationState.postCreationStep = 1;
            conversationState.newPostData = { topic: '', title: '', content: '' };
            addBotMessage("Sure! Let's create a new post. What is the topic?");
        }

        // If user asks to create a lesson plan, start multi-step lesson plan creation
        if (query.toLowerCase().includes('create a lesson plan') || query.toLowerCase().includes('help me create a lesson plan')) {
            conversationState.creatingLessonPlan = true;
            conversationState.lessonPlanStep = 1;
            conversationState.lessonPlanData = { student: '', topic: '', learningStyle: '' };
            addBotMessage("Great! I'd love to help you create a personalized lesson plan. Which student is this lesson plan for?");
        }
    }, 1000);
  }
});

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
        author: 'Hmouda',
        date: new Date().toLocaleDateString()
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Add navigation for Teacher Tools button
document.getElementById('btn-teacher-tools').addEventListener('click', function() {
    window.location.href = 'topics.html';
});

// Add navigation for Logout button
document.getElementById('btn-logout').addEventListener('click', function() {
    window.location.href = 'login.html';
});

// Add navigation for New Post button
document.getElementById('btn-new-post').addEventListener('click', function() {
    window.location.href = 'newpost.html';
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
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = `You: ${text}`;
    output.appendChild(userDiv);
    output.scrollTop = output.scrollHeight;
}

function addBotMessage(text) {
    const output = document.getElementById('chat-output');
    const botDiv = document.createElement('div');
    botDiv.className = 'bot-message';
    botDiv.textContent = text;
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

    // Check for topics in the profile
    for (const topic in topicDatabase) {
        if (lowerProfile.includes(topic)) {
            const topicInfo = topicDatabase[topic];
            videos = topicInfo.videos;
            response += `Regarding ${topic}, here are some foundational topics to explore: ${topicInfo.topics.join(', ')}. These can serve as building blocks for more advanced concepts.`;
            conversationState.lastTopic = topic;
            break;
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
