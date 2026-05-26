import { useState } from 'react';
import axios from 'axios';

export default function ReviewWork() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/review-work', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to review work.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 mt-8 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Review Your Work (AI)</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accentPurple file:text-white hover:file:bg-purple-700" />
        <button type="submit" className="bg-accentPurple text-white py-2 rounded-lg disabled:opacity-50" disabled={loading || !file}>
          {loading ? 'Reviewing...' : 'Upload & Review'}
        </button>
      </form>
      {result && <div className="mt-4 text-green-400">{result}</div>}
      {error && <div className="mt-4 text-red-400">{error}</div>}
    </div>
  );
}
