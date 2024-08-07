import React from 'react';

class NetworkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Network Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="network-error p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-lg font-bold mb-2">Network Error</h2>
          <p>Unable to connect to the server. Please check your internet connection and try again.</p>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default NetworkErrorBoundary;