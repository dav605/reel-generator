import { useState } from 'react';
import axios from 'axios';

export default function InputForm({ onScriptGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('');
  const [duration, setDuration] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/generate', {
        prompt,
        tone,
        duration: Number(duration),
      });
      onScriptGenerated(response.data);
    } catch (error) {
      console.error("❌ Error generating script:", error);
      alert("Something went wrong while generating the script. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-white w-full max-w-xl mx-auto space-y-6">
      <input
        className="border border-white bg-transparent text-white placeholder-gray-300 p-3 w-full text-lg rounded"
        placeholder="Prompt"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        required
      />
      <input
        className="border border-white bg-transparent text-white placeholder-gray-300 p-4 w-full text-xl rounded"
        placeholder="Tone (funny, inspiring...)"
        value={tone}
        onChange={e => setTone(e.target.value)}
        required
      />
      <input
        className="border border-white bg-transparent text-white placeholder-gray-300 p-3 w-full text-lg rounded"
        type="number"
        min="1"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        required
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full text-lg disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Script'}
      </button>
    </form>
  );
}
