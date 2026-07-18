import { Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function History() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Analysis History</h1>
      <p className="text-gray-400 mt-2">All your past analyses</p>
      
      <div className="mt-8">
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-12 text-center">
          <Clock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No analyses yet</p>
          <p className="text-sm text-gray-500 mt-1">Start your first analysis today</p>
          <div className="mt-6">
            <Button>Start New Analysis</Button>
          </div>
        </div>
      </div>
    </div>
  );
}