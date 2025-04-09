// frontend/src/App.jsx
import { useState } from 'react';
import InputForm from './components/InputForm';
import ScriptDisplay from './components/ScriptDisplay';
import Timer from './components/Timer';
import ReelBackground from './components/ReelBackground';

function App() {
  const [scriptData, setScriptData] = useState(null);

  return (
    <ReelBackground>
      <div className="text-white w-full px-4 max-w-xl">
        <InputForm onScriptGenerated={setScriptData} />
        {scriptData && (
          <>
            <ScriptDisplay scriptData={scriptData} />
            <Timer />
          </>
        )}
      </div>
    </ReelBackground>
  );
}

export default App;
