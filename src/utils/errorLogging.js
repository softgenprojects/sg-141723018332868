export function logError(message, error, additionalInfo = {}) {
  console.error(message, error);
  
  // Log additional details
  if (error instanceof Error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }

  console.error('Additional info:', additionalInfo);

  // In a production environment, you might want to send this error to a logging service
  // For example:
  // sendErrorToLoggingService(message, error, additionalInfo);
}

export function handleApiError(error) {
  logError('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error setting up request:', error.message);
  }
}

// Placeholder function for sending errors to a logging service
function sendErrorToLoggingService(message, error, additionalInfo) {
  // Implementation would depend on the logging service you're using
  // For example, you might use an API call to send the error data
  console.log('Sending error to logging service:', message, error, additionalInfo);
}