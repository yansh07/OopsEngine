"use client";
import React from 'react';

import { Terminal, ShieldAlert, Timer, Server, Layers, Code2, ArrowRight } from 'lucide-react';
import { FaSquareGithub } from "react-icons/fa6";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A08] text-[#E8E8E0] font-mono selection:bg-[#C8F135] selection:text-black relative overflow-x-hidden">
      
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)]"></div>

      {/* Warning Strip */}
      <div className="bg-[#FF3B3B] text-white text-center py-2 px-4 text-[11px] tracking-[0.15em] uppercase font-bold">
        ⚠ Warning: Untrusted code execution zone — proceed with exactly zero trust ⚠
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between py-5 px-6 md:px-10 border-b border-[#2A2A25] sticky top-0 bg-[#0A0A08]/90 backdrop-blur-md z-40">
        <div className="font-sans font-extrabold text-lg tracking-tight flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C8F135] animate-pulse"></div>
          OopsEngine
        </div>
        <ul className="hidden md:flex gap-8 list-none text-xs tracking-widest uppercase text-[#6A6A60]">
          <li><a href="#htw" className="hover:text-[#C8F135] transition-colors">How it Works</a></li>
          <li><a href="#feat" className="hover:text-[#C8F135] transition-colors">Features</a></li>
          <li><a href="#stack" className="hover:text-[#C8F135] transition-colors">Stack</a></li>
        </ul>
        <button 
          onClick={() => window.location.href='/sign-in'}
          className="bg-[#C8F135] text-black font-mono text-xs font-bold tracking-widest px-5 py-2.5 uppercase transition-transform hover:-translate-y-0.5"
        >
          Get Started →
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 md:px-10 relative overflow-hidden flex flex-col items-start max-w-7xl mx-auto">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(#2A2A25_1px,transparent_1px),linear-gradient(90deg,#2A2A25_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_0%,transparent_100%)] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 border border-[#2A2A25] bg-[#111110] text-[11px] tracking-widest uppercase text-[#6A6A60] py-1.5 px-3 mb-8 relative z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B3B] animate-pulse"></div>
          Containerized · Isolated · Logged · Destroyed
        </div>

        <h1 className="font-sans font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mb-4 relative z-10">
          Because Running<br />Random Code <span className="text-[#C8F135]">Directly</span><br />on Production Was a<br />
          <span className="line-through text-[#6A6A60] italic font-normal text-[0.6em]">Totally Fine Idea</span>
        </h1>

        <p className="text-sm leading-relaxed text-[#6A6A60] max-w-2xl mb-12 relative z-10">
          OopsEngine accepts questionable code, locks it inside <strong className="text-[#E8E8E0]">disposable Docker containers</strong>, watches it carefully, records the damage, and <strong className="text-[#E8E8E0]">destroys the evidence</strong> before it can hurt anyone.
        </p>

        <div className="flex flex-wrap items-center gap-5 relative z-10">
          <button className="bg-[#C8F135] text-black font-bold text-[13px] tracking-widest px-7 py-3.5 uppercase relative group transition-transform hover:-translate-y-0.5 hover:-translate-x-0.5">
            <span className="relative z-10">Execute Something Dangerous</span>
            <div className="absolute inset-0 border border-[#C8F135] translate-y-1.5 translate-x-1.5 opacity-40 group-hover:translate-y-2 group-hover:translate-x-2 group-hover:opacity-80 transition-all -z-10"></div>
          </button>
          
          <a href="https://github.com/yansh07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#6A6A60] hover:text-[#E8E8E0] transition-colors py-3.5">
            <FaSquareGithub size={16} /> View on GitHub
          </a>
        </div>

        {/* Terminal Window */}
        <div className="mt-20 bg-[#111110] border border-[#2A2A25] w-full max-w-3xl relative z-10 shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#2A2A25] bg-[#1A1A17]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28CA42]"></div>
            <span className="text-[11px] text-[#6A6A60] ml-2 tracking-widest">oopsengine — execution/container-7f3a2b</span>
          </div>
          <div className="p-5 text-xs leading-loose text-[#6A6A60] overflow-x-auto">
            <div className="block whitespace-nowrap"><span className="text-[#C8F135]">$</span> <span className="text-[#E8E8E0]">docker run --rm -m 512m --cpus=0.5 --timeout=3 python:3.11-alpine execute.py</span></div>
            <div className="block whitespace-nowrap"><span className="text-[#28CA42]">✓ Container 7f3a2b spawned successfully</span></div>
            <div className="block whitespace-nowrap"><span className="text-[#FF6B2B]">⚑ Watching for infinite loops, memory bombs, and other creative disasters...</span></div>
            <div className="block whitespace-nowrap"><span className="text-[#28CA42]">✓ Execution complete — 0.847s</span></div>
            <div className="block whitespace-nowrap"><span className="text-[#FF3B3B]">✗ Stdout: RecursionError: maximum recursion depth exceeded</span> <span className="text-[#6A6A60]">// lol</span></div>
            <div className="block whitespace-nowrap"><span className="text-[#28CA42]">✓ Logged to PostgreSQL · job_id: 8f29c1</span></div>
            <div className="block whitespace-nowrap"><span className="text-[#28CA42]">✓ Container 7f3a2b killed and evidence destroyed</span></div>
            <div className="block whitespace-nowrap"><span className="text-[#C8F135]">$</span> <span className="inline-block w-2 h-3.5 bg-[#C8F135] align-[-2px] animate-pulse"></span></div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-t border-[#2A2A25] max-w-7xl mx-auto w-full px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-[#2A2A25]">
          <div className="p-8 md:p-10 border-r border-b md:border-b-0 border-[#2A2A25] text-center">
            <div className="font-sans text-4xl md:text-5xl font-extrabold text-[#C8F135] mb-2">3s</div>
            <div className="text-[10px] md:text-[11px] tracking-widest uppercase text-[#6A6A60]">Hard Timeout Kill</div>
          </div>
          <div className="p-8 md:p-10 border-r border-b md:border-b-0 border-[#2A2A25] text-center">
            <div className="font-sans text-4xl md:text-5xl font-extrabold text-[#E8E8E0] mb-2">512<span className="text-xl md:text-2xl text-[#6A6A60]">MB</span></div>
            <div className="text-[10px] md:text-[11px] tracking-widest uppercase text-[#6A6A60]">Max RAM Per Run</div>
          </div>
          <div className="p-8 md:p-10 border-r border-[#2A2A25] text-center">
            <div className="font-sans text-4xl md:text-5xl font-extrabold text-[#E8E8E0] mb-2">0.5<span className="text-xl md:text-2xl text-[#6A6A60]">×</span></div>
            <div className="text-[10px] md:text-[11px] tracking-widest uppercase text-[#6A6A60]">CPU Cap Per Job</div>
          </div>
          <div className="p-8 md:p-10 border-r border-[#2A2A25] text-center">
            <div className="font-sans text-4xl md:text-5xl font-extrabold text-[#FF3B3B] mb-2">∞</div>
            <div className="text-[10px] md:text-[11px] tracking-widest uppercase text-[#6A6A60]">Bad Decisions</div>
          </div>
        </div>
      </section>

      {/* Flow Architecture */}
      <section className="py-20 px-6 md:px-10 border-t border-[#2A2A25] max-w-7xl mx-auto overflow-hidden">
        <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#6A6A60] mb-12">
          <div className="w-6 h-[1px] bg-[#C8F135]"></div>
          The flow — what happens to your code
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 overflow-x-auto pb-4 scrollbar-hide">
          <div className="shrink-0 bg-[#C8F135]/5 border border-[#C8F135] p-4 min-w-[140px] text-center rounded-sm">
            <div className="text-[10px] text-[#6A6A60] uppercase tracking-widest mb-1">User</div>
            <div className="font-sans text-[13px] font-bold text-[#E8E8E0]">Submits Code</div>
          </div>
          <ArrowRight className="hidden md:block shrink-0 mx-3 text-[#6A6A60]" size={16} />
          
          <div className="shrink-0 bg-[#111110] border border-[#2A2A25] p-4 min-w-[140px] text-center rounded-sm">
            <div className="text-[10px] text-[#6A6A60] uppercase tracking-widest mb-1">FastAPI</div>
            <div className="font-sans text-[13px] font-bold text-[#E8E8E0]">Enqueues Job</div>
          </div>
          <ArrowRight className="hidden md:block shrink-0 mx-3 text-[#6A6A60]" size={16} />

          <div className="shrink-0 bg-[#FF4438]/5 border border-[#FF4438] p-4 min-w-[140px] text-center rounded-sm">
            <div className="text-[10px] text-[#6A6A60] uppercase tracking-widest mb-1">Redis</div>
            <div className="font-sans text-[13px] font-bold text-[#E8E8E0]">Job Queue</div>
          </div>
          <ArrowRight className="hidden md:block shrink-0 mx-3 text-[#6A6A60]" size={16} />

          <div className="shrink-0 bg-[#2496ED]/5 border border-[#2496ED] p-4 min-w-[140px] text-center rounded-sm">
            <div className="text-[10px] text-[#6A6A60] uppercase tracking-widest mb-1">Celery Worker</div>
            <div className="font-sans text-[13px] font-bold text-[#E8E8E0]">Spins Docker</div>
          </div>
          <ArrowRight className="hidden md:block shrink-0 mx-3 text-[#6A6A60]" size={16} />

          <div className="shrink-0 bg-[#FF3B3B]/5 border border-[#FF3B3B] p-4 min-w-[140px] text-center rounded-sm">
            <div className="text-[10px] text-[#FF3B3B] uppercase tracking-widest mb-1">Container</div>
            <div className="font-sans text-[13px] font-bold text-[#E8E8E0]">Executes → Dies</div>
          </div>
          <ArrowRight className="hidden md:block shrink-0 mx-3 text-[#6A6A60]" size={16} />

          <div className="shrink-0 bg-[#699eca]/5 border border-[#699eca] p-4 min-w-[140px] text-center rounded-sm">
            <div className="text-[10px] text-[#6A6A60] uppercase tracking-widest mb-1">Postgres</div>
            <div className="font-sans text-[13px] font-bold text-[#E8E8E0]">Logs Result</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="htw" className="py-20 px-6 md:px-10 border-t border-[#2A2A25] max-w-7xl mx-auto">
        <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#6A6A60] mb-12">
          <div className="w-6 h-[1px] bg-[#C8F135]"></div>
          How it works — four ruthless steps
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-[#2A2A25]">
          {/* Step 1 */}
          <div className="p-8 border-r border-b border-[#2A2A25] bg-[#0A0A08] hover:bg-[#111110] transition-colors group">
            <div className="font-sans text-5xl font-extrabold text-[#2A2A25] group-hover:text-[#1A1A17] transition-colors mb-4">01</div>
            <h3 className="font-sans text-lg font-bold text-[#E8E8E0] mb-3">Receive the Questionable Code</h3>
            <p className="text-xs leading-relaxed text-[#6A6A60] mb-6">
              FastAPI endpoint accepts your submission. Returns a <code className="text-[#C8F135] bg-[#C8F135]/10 px-1 py-0.5 rounded">job_id</code> instantly. No judgment. No mercy.
            </p>
            <span className="inline-block text-[10px] tracking-widest uppercase px-2 py-1 border border-[#C8F135]/30 bg-[#C8F135]/10 text-[#C8F135]">FastAPI + Redis</span>
          </div>

          {/* Step 2 */}
          <div className="p-8 border-r border-b border-[#2A2A25] bg-[#0A0A08] hover:bg-[#111110] transition-colors group">
            <div className="font-sans text-5xl font-extrabold text-[#2A2A25] group-hover:text-[#1A1A17] transition-colors mb-4">02</div>
            <h3 className="font-sans text-lg font-bold text-[#E8E8E0] mb-3">Lock It in a Disposable Prison</h3>
            <p className="text-xs leading-relaxed text-[#6A6A60] mb-6">
              Code drops into a <code className="text-[#C8F135] bg-[#C8F135]/10 px-1 py-0.5 rounded">python:3.11-alpine</code> container with 512MB RAM and half a CPU. It can't see your filesystem or secrets.
            </p>
            <span className="inline-block text-[10px] tracking-widest uppercase px-2 py-1 border border-[#2496ED]/30 bg-[#2496ED]/10 text-[#2496ED]">Docker Engine</span>
          </div>

          {/* Step 3 */}
          <div className="p-8 border-r border-b border-[#2A2A25] bg-[#0A0A08] hover:bg-[#111110] transition-colors group">
            <div className="font-sans text-5xl font-extrabold text-[#2A2A25] group-hover:text-[#1A1A17] transition-colors mb-4">03</div>
            <h3 className="font-sans text-lg font-bold text-[#E8E8E0] mb-3">Watch It Run. Watch the Clock.</h3>
            <p className="text-xs leading-relaxed text-[#6A6A60] mb-6">
              If execution exceeds 3 seconds, the container gets killed — no negotiation. <code className="text-[#FF3B3B] bg-[#FF3B3B]/10 px-1 py-0.5 rounded">while True</code> is not clever. It is a timeout.
            </p>
            <span className="inline-block text-[10px] tracking-widest uppercase px-2 py-1 border border-[#2496ED]/30 bg-[#2496ED]/10 text-[#2496ED]">SIGKILL at 3s</span>
          </div>

          {/* Step 4 */}
          <div className="p-8 border-r border-b border-[#2A2A25] bg-[#0A0A08] hover:bg-[#111110] transition-colors group">
            <div className="font-sans text-5xl font-extrabold text-[#2A2A25] group-hover:text-[#1A1A17] transition-colors mb-4">04</div>
            <h3 className="font-sans text-lg font-bold text-[#E8E8E0] mb-3">Log Damage. Destroy Evidence.</h3>
            <p className="text-xs leading-relaxed text-[#6A6A60] mb-6">
              Stdout, stderr, status, and execution time land in Postgres. Container is destroyed. The server never touched your code.
            </p>
            <span className="inline-block text-[10px] tracking-widest uppercase px-2 py-1 border border-[#699eca]/30 bg-[#699eca]/10 text-[#699eca]">PostgreSQL</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="feat" className="py-20 px-6 md:px-10 border-t border-[#2A2A25] max-w-7xl mx-auto">
        <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#6A6A60] mb-12">
          <div className="w-6 h-[1px] bg-[#C8F135]"></div>
          Features — milk these hard
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[#2A2A25]">
          <div className="p-8 border-r border-b border-[#2A2A25] relative">
            <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-[#6A6A60]">MVP</span>
            <Code2 className="text-[#C8F135] mb-5 w-8 h-8 p-1.5 border border-[#2A2A25]" />
            <h3 className="font-sans text-[15px] font-bold text-[#E8E8E0] mb-2.5">Single-Language Execution</h3>
            <p className="text-[11px] leading-relaxed text-[#6A6A60]">Python first. Get it right before adding JS. Start with <code className="text-[#C8F135]">python:3.11-alpine</code> — tiny image, fast spin-up, zero bloat.</p>
          </div>
          
          <div className="p-8 border-r border-b border-[#2A2A25] relative">
            <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-[#6A6A60]">MVP</span>
            <Layers className="text-[#C8F135] mb-5 w-8 h-8 p-1.5 border border-[#2A2A25]" />
            <h3 className="font-sans text-[15px] font-bold text-[#E8E8E0] mb-2.5">Containerized Execution</h3>
            <p className="text-[11px] leading-relaxed text-[#6A6A60]">Every run is an isolated container. No shared state. No privilege escalation. No crying to your SRE at 2am.</p>
          </div>

          <div className="p-8 border-r border-b border-[#2A2A25] relative">
            <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-[#6A6A60]">MVP</span>
            <Timer className="text-[#C8F135] mb-5 w-8 h-8 p-1.5 border border-[#2A2A25]" />
            <h3 className="font-sans text-[15px] font-bold text-[#E8E8E0] mb-2.5">Hard Timeout Kill</h3>
            <p className="text-[11px] leading-relaxed text-[#6A6A60]">3 seconds. Then SIGKILL. <code className="text-[#FF3B3B]">while True: pass</code> will not bring down your server. This is non-negotiable infrastructure.</p>
          </div>

          <div className="p-8 border-r border-b border-[#2A2A25] border-t-2 border-t-[#C8F135] relative mt-[-1px]">
            <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-[#C8F135]">Flex</span>
            <Server className="text-[#C8F135] mb-5 w-8 h-8 p-1.5 border border-[#C8F135]/30" />
            <h3 className="font-sans text-[15px] font-bold text-[#E8E8E0] mb-2.5">Async Task Queue</h3>
            <p className="text-[11px] leading-relaxed text-[#6A6A60]">50 concurrent submissions hit your endpoint. Synchronous FastAPI would fold immediately. Redis queue absorbs the load. Workers process at their own pace.</p>
          </div>

          <div className="p-8 border-r border-b border-[#2A2A25] border-t-2 border-t-[#C8F135] relative mt-[-1px]">
            <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-[#C8F135]">Flex</span>
            <ShieldAlert className="text-[#C8F135] mb-5 w-8 h-8 p-1.5 border border-[#C8F135]/30" />
            <h3 className="font-sans text-[15px] font-bold text-[#E8E8E0] mb-2.5">Resource Limits</h3>
            <p className="text-[11px] leading-relaxed text-[#6A6A60]">Pass <code className="text-[#C8F135]">--memory=512m --cpus=0.5</code> directly to Docker. Shows you understand system constraints. High signal-to-effort ratio.</p>
          </div>

          <div className="p-8 border-r border-b border-[#2A2A25] border-t-2 border-t-[#C8F135] relative mt-[-1px]">
            <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-[#C8F135]">Flex</span>
            <Terminal className="text-[#C8F135] mb-5 w-8 h-8 p-1.5 border border-[#C8F135]/30" />
            <h3 className="font-sans text-[15px] font-bold text-[#E8E8E0] mb-2.5">Test Case Evaluation</h3>
            <p className="text-[11px] leading-relaxed text-[#6A6A60]">Run code against hidden inputs. Compare output to expected results. The difference between "I built a REPL" and "I built a judge."</p>
          </div>
        </div>
      </section>

      {/* Code Snippet Example */}
      <section className="py-20 px-6 md:px-10 border-t border-[#2A2A25] max-w-7xl mx-auto">
        <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#6A6A60] mb-8">
          <div className="w-6 h-[1px] bg-[#C8F135]"></div>
          The core execution block
        </div>

        <div className="bg-[#1A1A17] border border-[#2A2A25] p-6 text-[11px] leading-loose text-[#E8E8E0] overflow-x-auto rounded-sm">
          <div className="text-[#546E7A] italic mb-2"># The execution pipeline in ~15 lines of actual logic</div>
          <div><span className="text-[#C792EA]">async def</span> <span className="text-[#82AAFF]">execute_in_container</span>(code: <span className="text-[#82AAFF]">str</span>, timeout: <span className="text-[#82AAFF]">int</span> = <span className="text-[#F78C6C]">3</span>):</div>
          <div className="pl-4 text-[#546E7A] italic mt-2"># Write code to a temp file — never eval() user input directly</div>
          <div className="pl-4">tmp = <span className="text-[#82AAFF]">write_temp_file</span>(code)</div>
          <div className="pl-4 text-[#546E7A] italic mt-2"># Spin up an ephemeral container with hard resource limits</div>
          <div className="pl-4">container = <span className="text-[#82AAFF]">docker.run</span>(</div>
          <div className="pl-8"><span className="text-[#C3E88D]">"python:3.11-alpine"</span>,</div>
          <div className="pl-8"><span className="text-[#82AAFF]">command</span>=<span className="text-[#82AAFF]">f</span><span className="text-[#C3E88D]">"python &#123;tmp&#125;"</span>,</div>
          <div className="pl-8"><span className="text-[#82AAFF]">mem_limit</span>=<span className="text-[#C3E88D]">"512m"</span>, <span className="text-[#82AAFF]">cpu_quota</span>=<span className="text-[#F78C6C]">50000</span>, <span className="text-[#82AAFF]">remove</span>=<span className="text-[#C792EA]">True</span></div>
          <div className="pl-4">)</div>
          <div className="pl-4 text-[#546E7A] italic mt-2"># If it's still running after timeout, kill it — no exceptions</div>
          <div className="pl-4"><span className="text-[#C792EA]">try</span>:</div>
          <div className="pl-8">stdout, stderr = <span className="text-[#C792EA]">await</span> <span className="text-[#82AAFF]">asyncio.wait_for</span>(container.<span className="text-[#82AAFF]">wait</span>(), timeout)</div>
          <div className="pl-4"><span className="text-[#C792EA]">except</span> asyncio.TimeoutError:</div>
          <div className="pl-8">container.<span className="text-[#82AAFF]">kill</span>() <span className="text-[#546E7A] italic"># SIGKILL. Not SIGTERM. Not a suggestion.</span></div>
          <div className="pl-8"><span className="text-[#C792EA]">return</span> &#123;<span className="text-[#C3E88D]">"status"</span>: <span className="text-[#C3E88D]">"TIMEOUT"</span>, <span className="text-[#C3E88D]">"output"</span>: <span className="text-[#C3E88D]">"while True was a choice."</span>&#125;</div>
          <div className="pl-4"><span className="text-[#C792EA]">return</span> <span className="text-[#82AAFF]">log_and_return</span>(stdout, stderr) <span className="text-[#546E7A] italic"># Postgres gets the receipts</span></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(200,241,53,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        
        <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 relative z-10">
          Thousands of lines executed.<br />Countless bad decisions <span className="text-[#C8F135]">contained.</span>
        </h2>
        <p className="text-sm text-[#6A6A60] mb-10 relative z-10 max-w-lg mx-auto">
          Your production server remains untouched. You're welcome.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          <button className="bg-[#C8F135] text-black font-bold text-xs tracking-widest px-8 py-4 uppercase w-full sm:w-auto hover:bg-[#d4ff44] transition-colors">
            Start Executing Code
          </button>
          <button className="border border-[#2A2A25] text-[#6A6A60] font-bold text-xs tracking-widest px-8 py-4 uppercase w-full sm:w-auto hover:text-[#E8E8E0] hover:border-[#6A6A60] transition-colors">
            Read the Docs
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-10 border-t border-[#2A2A25] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-sans font-extrabold text-sm text-[#6A6A60]">OopsEngine</div>
        <div className="text-[11px] text-[#6A6A60] italic text-center">
          "We trust your code exactly as much as <strong className="text-[#C8F135] font-normal not-italic">we should</strong>."
        </div>
        <div className="text-[11px] text-[#6A6A60]">© 2024 · MIT License</div>
      </footer>
    </div>
  );
}