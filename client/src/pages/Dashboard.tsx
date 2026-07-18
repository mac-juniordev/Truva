import { Shield, FileText, BarChart3 } from 'lucide-react';
import { Button } from "../components/ui/Button";
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="text-gray-400 mt-2">Welcome to your Truva workspace</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 hover:border-emerald-500/30 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Analyses</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 hover:border-emerald-500/30 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Trust Score</p>
              <p className="text-2xl font-bold text-white">N/A</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 hover:border-emerald-500/30 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Reports</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-8 text-center">
        <p className="text-gray-400">Ready to analyze your first piece of content?</p>
        <Link to="/analyze" className="inline-block mt-4">
          <Button>Start New Analysis</Button>
        </Link>
      </div>
    </div>
  );
}