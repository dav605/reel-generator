export default function ScriptDisplay({ scriptData }) {
  return (
    <div className="mt-6 text-white">
      {/* Song Title */}
      <h2 className="text-2xl font-bold mb-2">
        🎶 Song: {scriptData.song}
      </h2>

      {/* Hashtags */}
      <h3 className="text-lg mb-4">
        📢 Hashtags: {scriptData.hashtags.join(' ')}
      </h3>

      {/* Script Lines */}
      <ul className="bg-transparent border border-white p-4 rounded-lg space-y-2 shadow-md">
        {scriptData.script.map((line, index) => (
          <li key={index}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}  