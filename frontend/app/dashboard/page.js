"use client";
import { useAuth, useUser, UserButton } from "@clerk/nextjs";
import { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";

// 1. Pydantic Schemas se match karte hue helper components
const StatusBadge = ({ status }) => {
  const baseClass = "px-2 py-1 text-xs font-mono rounded";
  switch (status) {
    case "SUCCESS": return <span className={`${baseClass} bg-green-900 text-green-300`}>SUCCESS</span>;
    case "RUNTIME_ERROR": return <span className={`${baseClass} bg-red-900 text-red-300`}>ERROR</span>;
    case "TIMEOUT": return <span className={`${baseClass} bg-yellow-900 text-yellow-300`}>TIMEOUT</span>;
    default: return <span className={`${baseClass} bg-neutral-700 text-neutral-300`}>{status}</span>;
  }
};

export default function Dashboard() {
  const { getToken, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded } = useUser();
  const [dbUserId, setDbUserId] = useState(null);
  const [code, setCode] = useState('print("System Booting...")');
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const editorRef = useRef(null);

  // 3. API Call: Fetch Execution History (Real Data)
  async function fetchHistory(userId) {
    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/execute/history/${userId}`);
      if (!response.ok) throw new Error("History fetch failed");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("History fetch error:", error);
    }
  }

  // 2. THE HANDSHAKE (Clerk -> FastAPI Sync)
  useEffect(() => {
    if (isLoaded && isAuthLoaded && user) {
      const syncUser = async () => {
        try {
          const token = await getToken();

          if (!token) {
            throw new Error("Missing Clerk session token");
          }

          const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: user.primaryEmailAddress?.emailAddress,
              auth_provider_id: user.id
            })
          });
          if (!response.ok) throw new Error("Sync failed");
          const data = await response.json();
          setDbUserId(data.id); 
          fetchHistory(data.id); // Sync hone ke baad history fetch karo
        } catch (error) {
          console.error("User sync error:", error);
          setOutput(`[SYSTEM ERROR]: User synchronization failed. ${error.message}`);
        }
      };
      syncUser();
    }
  }, [getToken, isAuthLoaded, user, isLoaded]);

  // 4. API Call: Submit Code for Execution (The Main Engine)
  const runCode = async () => {
    if (!dbUserId) {
      setOutput("[SYSTEM ERROR]: Core handshake incomplete.");
      return;
    }
    
    setIsRunning(true);
    setOutput("[SYSTEM]: Code submitted. Waiting for engine..."); 

    try {
      const token = await getToken();
      // 1. Initial Submission
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/execute/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          user_id: dbUserId,
          language: "python",
          code: code
        })
      });

      let result = await response.json();

      // 2. THE POLLING LOOP
      // Keep asking the server "Is it done?" every 1 second while status is QUEUED or RUNNING
      while (result.status === "QUEUED" || result.status === "RUNNING") {
        setOutput(`[SYSTEM]: Status is ${result.status}. Container booting...`);
        
        // Wait 1 second before asking again
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        // Fetch the updated status
        const pollResponse = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/execute/${result.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        result = await pollResponse.json();
      }

      // 3. Engine Finished. Print the final results.
      if (result.status === "SUCCESS") {
        setOutput(result.stdout || "[SYSTEM]: Execution finished with no output.");
      } else if (result.status === "RUNTIME_ERROR" || result.status === "TIMEOUT") {
        setOutput(result.stderr || `[SYSTEM ERROR]: ${result.status} triggered.`);
      }

      fetchHistory(dbUserId);

    } catch (error) {
      setOutput(`[SYSTEM ERROR]: Engine communication failure. ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  if (!isLoaded) return <div className="h-screen bg-neutral-900 text-white font-mono flex items-center justify-center">OopsEngine Booting...</div>;

  return (
    <div className="h-screen bg-neutral-950 flex flex-col font-sans text-neutral-300 overflow-hidden">
      
      {/* SECTION 1: TOP NAV (Height: 60px) */}
      <nav className="h-[60px] p-4 bg-neutral-900 border-b border-neutral-800 flex justify-between items-center z-10">
        <h1 className="text-xl font-mono font-bold tracking-tighter text-white">Oops<span className="text-green-500">Engine</span>_</h1>
        <div className="flex items-center gap-4">
          {isRunning && <span className="animate-pulse text-xs text-yellow-400 font-mono">EXECUTING_LOGIC...</span>}
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      {/* MAIN WORKSPACE: Grid Layout (No Horizontal Split) */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-[1fr,350px] overflow-hidden">
        
        {/* SECTION 2 & 3: EDITOR + TERMINAL (Left Column / Vertical Stack) */}
        <main className="flex flex-col border-r border-neutral-800 overflow-hidden">
          
          {/* EDITOR (Top 70%) */}
          <div className="flex-grow-[7] bg-neutral-900 relative">
            <header className="px-4 py-2 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-400">main.py</span>
              <button 
                onClick={runCode} 
                disabled={isRunning}
                className={`px-4 py-1 text-xs font-mono rounded ${isRunning ? 'bg-neutral-600' : 'bg-green-600 hover:bg-green-700 text-black'}`}>
                {isRunning ? "RUNNING..." : "RUN_CODE()"}
              </button>
            </header>
            <div className="absolute inset-0 top-[40px]"> {/* Height of header */}
              <Editor
                height="100%"
                theme="vs-dark"
                defaultLanguage="python"
                value={code}
                onMount={(editor) => editorRef.current = editor}
                onChange={(value) => setCode(value)}
                options={{
                  fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 16 }
                }}
              />
            </div>
          </div>

          {/* TERMINAL OUTPUT (Bottom 30% - Stays Green/Red) */}
          <div className="flex-grow-[3] h-[30%] bg-black border-t border-neutral-800 overflow-y-auto p-4 font-mono text-sm">
            <span className="block text-neutral-600 mb-2">SYSTEM_OUTPUT::bash_</span>
            <pre className={`whitespace-pre-wrap ${output.startsWith("[SYSTEM ERROR]") ? 'text-red-400' : 'text-green-400'}`}>
              {output || "Awaiting execution command..."}
            </pre>
          </div>
        </main>

        {/* SECTION 4: EXECUTION HISTORY SIDEBAR (Right Column) */}
        <aside className="bg-neutral-900 border-l border-neutral-800 flex flex-col overflow-hidden">
          <header className="p-4 border-b border-neutral-800">
            <h2 className="text-sm font-mono font-bold text-white">System_Logs_</h2>
          </header>
          <div className="flex-grow overflow-y-auto p-2 space-y-2">
            {history.length === 0 ? (
              <p className="text-xs text-neutral-600 font-mono p-2">No previous executions logged.</p>
            ) : (
              history.map(exec => (
                <div key={exec.id} className="p-3 bg-neutral-800 rounded border border-neutral-700 font-mono text-xs hover:border-green-500 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <StatusBadge status={exec.status} />
                    {exec.execution_time_ms && <span className="text-neutral-500">{exec.execution_time_ms}ms</span>}
                  </div>
                  <div className="text-neutral-500">
                    {exec.created_at ? new Date(exec.created_at).toLocaleString() : "unknown time"}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}