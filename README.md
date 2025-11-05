# Class AI Assistant (Sage)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.0+-orange.svg)](https://www.tensorflow.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991.svg)](https://openai.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-0.24+-F7931E.svg)](https://scikit-learn.org/)

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
- Python 3.8 or higher
- Node.js 16+ (for frontend development)
- PostgreSQL or SQLite database
- OpenAI API key (for AI features)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Rabie-Zerrim/Sage-Class-AI-Assistant-.git
   cd Sage-Class-AI-Assistant-
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key and database credentials
   ```

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python app.py
   ```

7. Open your browser and navigate to `http://localhost:5000`

8. For login, use:
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
