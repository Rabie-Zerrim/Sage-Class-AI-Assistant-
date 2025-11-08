// Weekly Schedule (Emploi de Temps) Management

// Store schedules in localStorage
function getSchedule(classId, weekNumber) {
  const schedules = JSON.parse(localStorage.getItem('schedules')) || {};
  const key = `${classId}-week${weekNumber}`;
  return schedules[key] || null;
}

function saveSchedule(classId, weekNumber, scheduleData) {
  const schedules = JSON.parse(localStorage.getItem('schedules')) || {};
  const key = `${classId}-week${weekNumber}`;
  
  // Check if schedule already exists (for change detection)
  const oldSchedule = schedules[key];
  schedules[key] = {
    ...scheduleData,
    uploadedAt: new Date().toISOString(),
    uploadedBy: getCurrentUser()?.name || 'Teacher'
  };
  
  localStorage.setItem('schedules', JSON.stringify(schedules));
  
  // If schedule changed, send notification
  if (oldSchedule) {
    sendScheduleChangeNotification(classId, weekNumber, oldSchedule, scheduleData);
  }
  
  return schedules[key];
}

function sendScheduleChangeNotification(classId, weekNumber, oldSchedule, newSchedule) {
  const message = `📅 Schedule Update for Week ${weekNumber}!\n\nThe schedule has been updated. Please check the new version.`;
  
  // Add notification to class chat
  const messages = JSON.parse(localStorage.getItem(`class-messages-${classId}`)) || [];
  messages.push({
    sender: 'System',
    text: message,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    isTeacher: false,
    isSystem: true,
    timestamp: Date.now()
  });
  
  localStorage.setItem(`class-messages-${classId}`, JSON.stringify(messages));
  
  // Store notification
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  notifications.push({
    type: 'schedule-change',
    classId,
    weekNumber,
    message,
    timestamp: Date.now(),
    read: false
  });
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

function getCurrentWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

// Auto-upload weekly schedule (would be triggered by teacher or cron job)
function autoUploadWeeklySchedule(classId) {
  const weekNumber = getCurrentWeekNumber();
  const existingSchedule = getSchedule(classId, weekNumber);
  
  if (!existingSchedule) {
    // Notify teacher to upload schedule
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push({
      type: 'schedule-required',
      classId,
      weekNumber,
      message: `Please upload the schedule for Week ${weekNumber}`,
      timestamp: Date.now(),
      read: false
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }
}

// Template schedule structure
const scheduleTemplate = {
  monday: [
    { time: '08:00-09:00', subject: '', teacher: '', room: '' },
    { time: '09:00-10:00', subject: '', teacher: '', room: '' },
    { time: '10:00-11:00', subject: '', teacher: '', room: '' },
    { time: '11:00-12:00', subject: '', teacher: '', room: '' },
  ],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: []
};
