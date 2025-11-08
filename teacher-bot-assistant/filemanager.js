// File and Media Management System

// Store uploaded files metadata in localStorage
function uploadFile(file, metadata = {}) {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission('upload')) {
    alert('You do not have permission to upload files.');
    return null;
  }
  
  // In a real application, files would be uploaded to a server
  // Here we'll store file metadata and use FileReader for previews
  const fileData = {
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedBy: currentUser.name,
    uploadedAt: new Date().toISOString(),
    classId: metadata.classId || null,
    category: metadata.category || 'general', // 'course', 'schedule', 'image', 'document'
    ...metadata
  };
  
  // Store file metadata
  const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  files.push(fileData);
  localStorage.setItem('uploadedFiles', JSON.stringify(files));
  
  // Read file content for preview (images, PDFs)
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fileData.preview = e.target.result;
      localStorage.setItem('uploadedFiles', JSON.stringify(files));
    };
    reader.readAsDataURL(file);
  }
  
  return fileData;
}

function getFiles(filter = {}) {
  const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  
  return files.filter(file => {
    if (filter.classId && file.classId !== filter.classId) return false;
    if (filter.category && file.category !== filter.category) return false;
    if (filter.type && !file.type.includes(filter.type)) return false;
    return true;
  });
}

function deleteFile(fileId) {
  const currentUser = getCurrentUser();
  if (!currentUser || !hasPermission('delete')) {
    alert('You do not have permission to delete files.');
    return false;
  }
  
  const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  const updatedFiles = files.filter(f => f.id !== fileId);
  localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  return true;
}

function getCourses(classId = null) {
  const filter = { category: 'course' };
  if (classId) filter.classId = classId;
  return getFiles(filter);
}

function getImages(classId = null) {
  const filter = { type: 'image' };
  if (classId) filter.classId = classId;
  return getFiles(filter);
}

// Sample course structure
function createCourse(title, description, classId, files = []) {
  const currentUser = getCurrentUser();
  if (!hasPermission('upload')) return null;
  
  const course = {
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    title,
    description,
    classId,
    createdBy: currentUser.name,
    createdAt: new Date().toISOString(),
    files: files, // Array of file IDs
    views: 0,
    downloads: 0
  };
  
  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));
  
  return course;
}

function getAllCourses(classId = null) {
  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  if (classId) {
    return courses.filter(c => c.classId === classId);
  }
  return courses;
}
