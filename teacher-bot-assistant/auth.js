// Authentication and User Management System

// User database (in production, this would be server-side)
const users = {
  'teacher1': {
    username: 'teacher1',
    password: 'teacher123', // In production, use hashed passwords
    role: 'teacher',
    name: 'Mr. Johnson',
    email: 'johnson@school.edu',
    classes: ['math-101', 'science-201']
  },
  'student1': {
    username: 'student1',
    password: 'student123',
    role: 'student',
    name: 'Alice Cooper',
    email: 'alice@school.edu',
    class: 'math-101'
  },
  'student2': {
    username: 'student2',
    password: 'student123',
    role: 'student',
    name: 'Bob Smith',
    email: 'bob@school.edu',
    class: 'science-201'
  }
};

// Check if user is logged in
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'login.html';
    return null;
  }
  return currentUser;
}

// Login function
function login(username, password) {
  const user = users[username];
  if (user && user.password === password) {
    const userSession = {
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
      classes: user.classes || [user.class]
    };
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    return userSession;
  }
  return null;
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  // Check if we're in the teacher-bot-assistant subfolder
  const currentPath = window.location.pathname;
  if (currentPath.includes('teacher-bot-assistant/teacher-bot-assistant')) {
    window.location.href = '../../login.html';
  } else if (currentPath.includes('teacher-bot-assistant')) {
    window.location.href = '../login.html';
  } else {
    window.location.href = 'login.html';
  }
}

// Check if user has permission
function hasPermission(action) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return false;
  
  const permissions = {
    teacher: ['upload', 'delete', 'approve', 'edit', 'view'],
    student: ['view', 'download']
  };
  
  return permissions[currentUser.role]?.includes(action) || false;
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}
