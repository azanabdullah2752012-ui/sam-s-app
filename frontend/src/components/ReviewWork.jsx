import React, { useState } from 'react';

const ReviewWork = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const handleReview = async () => {
    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const response = await fetch('http://localhost:5000/api/review-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: 'base64_mock' })
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Server Timeout');
      setFeedback(data.feedback);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-lightPurple/40 backdrop-blur-xl border border-lightPurple p-12 rounded-[32px] shadow-glow">
      <h2 className="text-3xl font-bold mb-6">Review My Work 🤖</h2>
      <button 
        onClick={handleReview} 
        disabled={loading}
        className="px-8 py-4 bg-gradient-to-br from-accentPurple to-[#8855db] hover:opacity-90 text-darkPurple font-bold rounded-full transition disabled:opacity-50"
      >
        {loading ? 'AI is scanning...' : 'Analyze Image'}
      </button>

      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200">{error}</div>}
      {feedback && <div className="mt-6 p-4 bg-green-900/30 border border-green-500 rounded-xl text-green-200">{feedback}</div>}
    </div>
  );
};

export default ReviewWork;
