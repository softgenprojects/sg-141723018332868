export function logError(message, error) {
  console.error(message, error);
  // In a production environment, you might want to send this error to a logging service
  // For example:
  // sendErrorToLoggingService(message, error);
}

// Placeholder function for sending errors to a logging service
function sendErrorToLoggingService(message, error) {
  // Implementation would depend on the logging service you're using
  // For example, you might use an API call to send the error data
  console.log('Sending error to logging service:', message, error);
}