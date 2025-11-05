# Class AI Assistant (Sage)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

An AI-powered web application designed to assist teachers with educational tasks through Sage (Class Assistant AI), a chatbot that provides personalized teaching strategies, lesson plans, and educational resources.

## Features

### 🤖 AI Teaching Assistant (Sage)
- Interactive chat interface for educational queries
- Personalized recommendations based on student learning styles
- Multi-step conversation flows for complex tasks

### 💬 Class Chat Rooms
- Dedicated chat interfaces for each class
- Students can collaborate and communicate together within their class groups
- Teacher moderation and oversight capabilities

### 👥 Student Management
- Add and manage student profiles with detailed information
- Track learning styles (visual, auditory, kinesthetic)
- Store student preferences, ages, classes, and notes

### 📚 Lesson Planning
- Generate personalized lesson plans for individual students
- Tailored content based on learning styles and interests
- Integration with educational resources

### 📝 Post Creation & Management
- Create educational posts organized by topics
- Filter and search through posts
- Weekly grouping and collapsible views

### 🎯 Topic Exploration
- Browse subjects with associated lessons
- View teacher assignments for different topics
- Access foundational topics for each subject

### 📹 Resource Recommendations
- Curated video suggestions from YouTube
- Google Slides presentations for lectures
- Topic-specific educational content

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required

### Setup
1. Clone or download the repository
2. Navigate to the project directory
3. Open `teacher-bot-assistant/index.html` in your web browser
4. For login, use:
   - Username: `teacher`
   - Password: `password123`

## Usage

### Getting Started
1. **Login**: Use the provided credentials to access the application
2. **Navigate**: Use the sidebar to switch between different tools

### Chat with Sage
- Ask questions about teaching methods, student engagement, or specific topics
- Request lesson plans: "Help me create a lesson plan for Alice on science"
- Get resource recommendations: "Suggest some videos and slides for math"

### Managing Students
- Add new students through the chat interface or dedicated form
- Specify learning styles, ages, classes, and favorite subjects
- View student information for personalized recommendations

### Creating Posts
- Use the "New Post" section to create educational content
- Organize posts by topics (Math, Science, History, etc.)
- Filter and search existing posts

### Exploring Topics
- Browse available subjects and their associated lessons
- View teacher assignments for different topics

## Configuration

### Student Database
The application uses browser localStorage to persist student data. Default students are pre-loaded:

```javascript
{
  "alice": { learningStyle: "visual", interests: ["art", "diagrams"] },
  "bob": { learningStyle: "auditory", interests: ["music", "discussions"] },
  "charlie": { learningStyle: "kinesthetic", interests: ["sports", "experiments"] }
}
```

### Topic Database
Educational resources are configured in the `topicDatabase` object in `script.js`, including:
- Video URLs and thumbnails
- Slide presentation links
- Topic lists for each subject

## API Documentation

This is a client-side only application with no external APIs. All functionality is handled through:

- **localStorage**: For data persistence
- **DOM Manipulation**: For dynamic content updates
- **Event Listeners**: For user interactions

### Key Functions

#### Chat Functions
- `getTeachingSuggestion(query)`: Processes user queries and returns AI responses
- `handleLessonPlanStep(userInput)`: Manages multi-step lesson plan creation
- `addBotMessage(text)`: Displays bot responses in chat

#### Student Management
- `showNewStudentPopup(studentName)`: Displays student creation form
- Student data stored in localStorage under 'students' key

#### Post Management
- Posts stored in localStorage under 'posts' key
- `saveNewPost(postData)`: Saves new posts to storage
- `loadPosts(filter, search)`: Loads and filters posts for display

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow vanilla JavaScript best practices
- Maintain consistent code formatting
- Test functionality across different browsers
- Update documentation for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies
- Inspired by the need for AI-assisted education
- Designed for teachers by understanding classroom challenges

## Support

For questions or issues:
- Check the example questions in `questions_examples.txt`
- Review the TODO.md for planned features
- Open an issue on GitHub for bugs or feature requests

---

**Note**: This application runs entirely in the browser and requires no server setup. All data is stored locally and will persist between sessions.
