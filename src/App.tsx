import React, { useState, useEffect } from 'react';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  PlusCircle, 
  GraduationCap,
  Calendar,
  BookOpen,
  Clock,
  ArrowRight,
  LayoutDashboard,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  Bell,
  User,
  Lock,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Contribution {
  feature: string;
  impact: number;
}

interface Intervention {
  id: number;
  text: string;
  type: 'CRITICAL' | 'ACADEMIC' | 'LIFESTYLE' | 'TECH';
}

interface PredictionResult {
  risk_prob: number;
  at_risk: boolean;
  interventions: Intervention[];
  contributions: Contribution[];
  metrics: {
    latency_ms: number;
    model_ver: string;
  };
}

// --- Components ---

const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-100 animate-pulse rounded-xl ${className}`} />
);

const CardSkeleton = () => (
  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 space-y-6 shadow-sm">
    <div className="flex justify-between items-center">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-16" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-12 w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const LoginView = ({ onLogin }: { onLogin: (user: UserProfile) => void }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('advisor@university.edu');
  const [pass, setPass] = useState('••••••••');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();
    onLogin(data.user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50" />
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-gray-100 p-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-gray-900 p-5 rounded-[2rem] mb-6 shadow-xl shadow-gray-200">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 italic">EduPredict<span className="text-indigo-600 not-italic">.</span></h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3">Enterprise Analytics Pro</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Secure Identifier</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-100 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Access Token</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-indigo-100 outline-none transition-all" />
          </div>
          <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Initiate System Access"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);

  const stats = [
    { label: "Neural Recall", val: "94.8%", change: "+2.1%", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Active Samples", val: "1,284", change: "+12%", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Critical Flags", val: "42", change: "Action Now", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">{[1,2,3].map(i => <CardSkeleton key={i} />)}</div>;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay: i*0.1}} key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</span>
              <div className={`${s.bg} ${s.color} text-[9px] font-black px-2 py-0.5 rounded-full`}>{s.change}</div>
            </div>
            <div className="text-4xl font-black text-gray-900 tracking-tighter">{s.val}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black tracking-tight">Retention Drift <span className="text-indigo-500 font-extrabold">•</span></h3>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Model: v2.5.1 Alpha</div>
           </div>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={[{n:'W1', r:80}, {n:'W2', r:82}, {n:'W3', r:79}, {n:'W4', r:85}, {n:'W5', r:88}, {n:'W6', r:84}]}>
                 <defs><linearGradient id="chartG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/><stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/></linearGradient></defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                 <Area type="monotone" dataKey="r" stroke="#4F46E5" strokeWidth={4} fill="url(#chartG)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
        <div className="lg:col-span-4 bg-gray-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 -mr-12 -mt-8"><TrendingUp className="w-48 h-48" /></div>
           <h4 className="text-xs font-black uppercase tracking-widest opacity-40 mb-8">Triage Log</h4>
           <div className="space-y-4 relative z-10">
             {[
               { name: "John Doe", risk: "92%", type: "High" },
               { name: "Sarah Sm.", risk: "88%", type: "Med" },
               { name: "Mike Ross", risk: "85%", type: "High" },
             ].map((a, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="text-xs font-bold">{a.name}</div>
                  <div className="text-xs font-black text-indigo-400">{a.risk}</div>
               </div>
             ))}
           </div>
           <button className="w-full mt-10 p-4 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Audit Classroom</button>
        </div>
      </div>
    </div>
  );
};

const BatchView = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/batch-score')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-black tracking-tight">Classroom Batch Scoring</h3>
           <button className="text-xs font-bold bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition-all">Export Report (PDF)</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="text-[10px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-50">
               <tr>
                 <th className="pb-4 pl-4">Student ID</th>
                 <th className="pb-4">Name</th>
                 <th className="pb-4 text-center">Risk Score</th>
                 <th className="pb-4 text-center">Status</th>
                 <th className="pb-4 text-right pr-4">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {loading ? [1,2,3,4].map(i => (
                 <tr key={i}>
                   <td className="py-4 pl-4"><Skeleton className="h-4 w-12" /></td>
                   <td className="py-4"><Skeleton className="h-4 w-32" /></td>
                   <td className="py-4"><Skeleton className="h-4 w-8 mx-auto" /></td>
                   <td className="py-4"><Skeleton className="h-4 w-16 mx-auto" /></td>
                   <td className="py-4 pr-4"><Skeleton className="h-8 w-8 ml-auto rounded-lg" /></td>
                 </tr>
               )) : data.map((s, i) => (
                 <motion.tr 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  key={s.id} className="group hover:bg-gray-50/50 transition-colors"
                 >
                   <td className="py-4 pl-4 text-xs font-bold text-gray-500 font-mono">{s.id}</td>
                   <td className="py-4 text-sm font-bold text-gray-900">{s.name}</td>
                   <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                           <div className={`h-full ${s.status === 'CRITICAL' ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${s.risk * 100}%` }} />
                        </div>
                        <span className="text-xs font-bold">{(s.risk * 100).toFixed(0)}%</span>
                      </div>
                   </td>
                   <td className="py-4 text-center">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        s.status === 'CRITICAL' ? 'bg-rose-50 border-rose-100 text-rose-600' : 
                        s.status === 'WATCH' ? 'bg-orange-50 border-orange-100 text-orange-600' : 
                        'bg-emerald-50 border-emerald-100 text-emerald-600'
                      }`}>
                        {s.status}
                      </span>
                   </td>
                   <td className="py-4 text-right pr-4">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                   </td>
                 </motion.tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PredictorView = () => {
  const [formData, setFormData] = useState({
    attendance_pct: 85,
    quiz_avg: 72,
    study_hours_wk: 10,
    midterm: 65,
    on_time_submit_pct: 90
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [completedInterventions, setCompletedInterventions] = useState<number[]>([]);

  const handlePredict = async () => {
    setLoading(true);
    setPrediction(null);
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setTimeout(() => {
      setPrediction(data);
      setLoading(false);
    }, 800);
  };

  const toggleIntervention = (id: number) => {
    setCompletedInterventions(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Configure Student (Glassmorphism card) */}
      <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 h-fit sticky top-28">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Settings className="w-5 h-5" /></div>
           <h3 className="text-xl font-black tracking-tight">AI Configuration</h3>
        </div>

        <div className="space-y-6">
           {[
             { label: 'Attendance Weighting', key: 'attendance_pct', min: 0, max: 100 },
             { label: 'Quiz Academic Score', key: 'quiz_avg', min: 0, max: 100 }
           ].map(field => (
            <div key={field.key} className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{field.label}</label>
                <span className="text-sm font-black text-indigo-600">{(formData as any)[field.key]}%</span>
              </div>
              <input 
                type="range" min={field.min} max={field.max} value={(formData as any)[field.key]}
                onChange={e => setFormData({...formData, [field.key]: Number(e.target.value)})}
                className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
           ))}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Study Hrs</label>
              <input type="number" value={formData.study_hours_wk} onChange={e => setFormData({...formData, study_hours_wk: Number(e.target.value)})} className="w-full bg-gray-50 border-none rounded-2xl p-3 font-bold focus:ring-2 focus:ring-indigo-100 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Submissions</label>
              <input type="number" value={formData.on_time_submit_pct} onChange={e => setFormData({...formData, on_time_submit_pct: Number(e.target.value)})} className="w-full bg-gray-50 border-none rounded-2xl p-3 font-bold focus:ring-2 focus:ring-indigo-100 transition-all outline-none" />
            </div>
          </div>

          <button 
            onClick={handlePredict} disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black tracking-wide shadow-xl shadow-indigo-100 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><TrendingUp className="w-5 h-5" /> ANALYZE SIGNALS</>}
          </button>
        </div>
      </div>

      {/* Model Interpretability View */}
      <div className="lg:col-span-7 space-y-6">
        <AnimatePresence mode="wait">
          {!prediction && !loading && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm opacity-60 grayscale">
              <div className="bg-gray-50 p-6 rounded-full mb-6"><Search className="w-12 h-12 text-gray-200" /></div>
              <h4 className="font-black text-gray-400 tracking-tight">Signal Analysis Pending</h4>
              <p className="text-xs font-bold text-gray-300 mt-2 max-w-xs">Run the neural analysis engine to see<br/>probabilistic risk weights and SHAP explanations.</p>
            </motion.div>
          )}

          {loading && (
            <div className="space-y-6">
               <Skeleton className="h-40 w-full rounded-[2.5rem]" />
               <Skeleton className="h-64 w-full rounded-[2.5rem]" />
               <Skeleton className="h-32 w-full rounded-[2.5rem]" />
            </div>
          )}

            {prediction && !loading && (
            <motion.div initial={{ opacity:0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Comparative Insight */}
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem] flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600"><Users className="w-5 h-5" /></div>
                    <div>
                       <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Comparative Context</div>
                       <div className="text-sm font-black text-indigo-900">Score vs. Class Median</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-lg font-black text-indigo-900">{(prediction.risk_prob * 100 - 45).toFixed(1)}%</div>
                    <div className="text-[10px] font-bold text-indigo-300">Variance Delta</div>
                 </div>
              </div>

              {/* SHAP / Feature Contributions */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">Feature Contribution <span className="text-indigo-500">(SHAP Logic)</span></h4>
                   <div className="flex gap-4">
                     <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Positive Impact</span>
                     <span className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Negative Impact</span>
                   </div>
                </div>
                <div className="space-y-5">
                  {prediction.contributions.map((c, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-xs font-bold">
                         <span className="text-gray-600">{c.feature}</span>
                         <span className={c.impact >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                           {c.impact >= 0 ? '+' : ''}{c.impact.toFixed(1)}
                         </span>
                       </div>
                       <div className="h-2 bg-gray-50 rounded-full flex overflow-hidden">
                          {c.impact < 0 ? (
                            <>
                              <div className="flex-1 flex justify-end">
                                <div className="h-full bg-rose-400 rounded-full" style={{ width: `${Math.min(Math.abs(c.impact) * 4, 100)}%` }} />
                              </div>
                              <div className="flex-1" />
                            </>
                          ) : (
                            <>
                              <div className="flex-1" />
                              <div className="flex-1 flex justify-start">
                                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(c.impact * 4, 100)}%` }} />
                              </div>
                            </>
                          )}
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan Component */}
              <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    {prediction.at_risk ? <AlertTriangle className="w-24 h-24" /> : <CheckCircle2 className="w-24 h-24" />}
                 </div>
                 
                 <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Generated Protocol</h4>
                      <p className="text-2xl font-black">Intervention Strategy</p>
                    </div>
                    <div className="text-right">
                       <div className="text-3xl font-black text-indigo-400 tracking-tight">{(prediction.risk_prob * 100).toFixed(0)}%</div>
                       <div className="text-[10px] font-black opacity-40 uppercase">Model Risk Confidence</div>
                    </div>
                 </div>

                 <div className="space-y-3 relative z-10">
                    {prediction.interventions.map((item) => (
                      <button 
                        key={item.id} 
                        onClick={() => toggleIntervention(item.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          completedInterventions.includes(item.id) 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 grayscale-0 opacity-60' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                           <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] ${
                             item.type === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-indigo-500 text-white'
                           }`}>
                             {item.type[0]}
                           </div>
                           <span className={`text-sm font-bold ${completedInterventions.includes(item.id) ? 'line-through' : ''}`}>{item.text}</span>
                        </div>
                        {completedInterventions.includes(item.id) ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                        )}
                      </button>
                    ))}
                 </div>

                 <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] font-black uppercase opacity-60">Inference: {prediction.metrics.latency_ms}ms</span>
                    </div>
                    <button className="text-[10px] font-bold underline underline-offset-4 opacity-40 hover:opacity-100 transition-opacity">Request Model Drift Audit</button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'predictor' | 'batch' | 'settings'>('dashboard');

  if (!user) return <LoginView onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 hidden xl:flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-16 px-2">
          <div className="bg-gray-900 p-2.5 rounded-2xl shadow-xl shadow-gray-200">
             <GraduationCap className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter italic">EduPredict<span className="text-indigo-600 font-extrabold not-italic">.</span></h1>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            { id: 'dashboard', label: 'Suite Dashboard', icon: LayoutDashboard },
            { id: 'batch', label: 'Classroom Overview', icon: Users },
            { id: 'predictor', label: 'AI Signal Analyzer', icon: TrendingUp },
            { id: 'settings', label: 'System Gateway', icon: Lock },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)} 
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${
                currentTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200' 
                  : 'text-gray-400 hover:bg-indigo-50/50 hover:text-indigo-600'
              }`}
            >
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 px-2">
           <div className="bg-gray-50 p-4 rounded-[2rem] border border-gray-100 mb-8">
              <div className="flex items-center gap-3 mb-4">
                 <img src={user.avatar} className="w-10 h-10 rounded-2xl bg-white border border-gray-100 p-1" />
                 <div>
                    <div className="text-xs font-black text-gray-900 truncate max-w-[120px]">{user.name}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.role}</div>
                 </div>
              </div>
              <button 
                onClick={() => setUser(null)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white text-rose-500 font-black text-[10px] uppercase shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-all"
              >
                  <LogOut className="w-3.5 h-3.5" /> Termination Session
              </button>
           </div>
           <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em] text-center">Version 2.4.1 Stable Build</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
         <header className="bg-white/60 backdrop-blur-3xl border-b border-gray-50 px-12 py-8 sticky top-0 z-20 flex items-center justify-between">
            <div>
               <h2 className="text-3xl font-black text-gray-900 capitalize tracking-tighter truncate max-w-[300px]">
                 {currentTab === 'dashboard' ? 'Insight Hub' : currentTab === 'batch' ? 'Group Analysis' : currentTab}
               </h2>
               <div className="flex items-center gap-2 mt-1">
                 <span className="w-2 h-2 rounded-full bg-emerald-500" />
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Neural Network Operational • Last Sync: Now</p>
               </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-10">
                 <div className="text-right">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Global Recall</div>
                    <div className="text-lg font-black text-gray-900">92.4 <span className="text-[10px] opacity-20">%</span></div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Active Samples</div>
                    <div className="text-lg font-black text-gray-900">4.2 <span className="text-[10px] opacity-20">k</span></div>
                 </div>
              </div>
              <div className="h-10 w-[1px] bg-gray-100" />
              <button className="bg-gray-900 text-white p-3.5 rounded-2xl shadow-xl shadow-gray-200 hover:scale-105 active:scale-95 transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
         </header>

         <div className="p-12 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {currentTab === 'dashboard' && <DashboardHome />}
                {currentTab === 'predictor' && <PredictorView />}
                {currentTab === 'batch' && <BatchView />}
                {currentTab === 'settings' && (
                  <div className="bg-white p-20 rounded-[3rem] text-center border border-gray-50 shadow-sm space-y-6">
                     <div className="bg-indigo-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto text-indigo-600 rotate-12 group hover:rotate-0 transition-transform">
                        <Lock className="w-10 h-10" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black tracking-tight text-gray-900">Security & Gateway</h3>
                        <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">Adjust AI sensitivity thresholds and manage model versioning. High-impact changes require multi-factor authorization.</p>
                     </div>
                     <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200 transition-all hover:brightness-110">Revoke API Key</button>
                        <button className="px-10 py-4 bg-white text-gray-900 border border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-gray-50">Download Audit Logs</button>
                     </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
         </div>
      </main>
    </div>
  );
}
