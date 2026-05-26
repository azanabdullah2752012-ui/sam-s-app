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
    <div className="mt-8 bg-white border-4 border-ecoDark p-10 rounded-3xl shadow-[0_12px_0_rgba(0,0,0,0.15)] relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-ecoYellow rounded-full opacity-50 z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span className="text-5xl">🤖</span> Magic Brain Review
        </h2>
        
        <p className="text-xl mb-8 text-center max-w-lg font-medium text-ecoDark/70">
          Finished building something awesome? The Magic Brain wants to see it! Give it a scan to get your stars!
        </p>

        <button 
          onClick={handleReview} 
          disabled={loading}
          className="px-10 py-5 bg-ecoPink text-white text-2xl font-bold rounded-full border-4 border-ecoDark shadow-bouncy bouncy-hover disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-bouncy flex items-center gap-3"
        >
          {loading ? (
            <><span className="animate-spin inline-block">⏳</span> Brain is thinking...</>
          ) : (
            <><span>📸</span> Scan My Project!</>
          )}
        </button>

        {error && (
          <div className="mt-8 p-6 bg-[#FF6B6B]/20 border-4 border-[#FF6B6B] rounded-2xl text-xl font-bold text-[#FF6B6B] w-full max-w-2xl text-center">
            Oh no! The brain got dizzy: {error} 😵‍💫
          </div>
        )}
        
        {feedback && (
          <div className="mt-8 p-6 bg-ecoGreen/20 border-4 border-ecoGreen rounded-2xl text-2xl font-bold text-ecoDark w-full max-w-2xl text-center animate-bounce" style={{animationIterationCount: 3}}>
            {feedback} 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewWork;
