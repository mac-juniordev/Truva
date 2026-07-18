import { Upload, FileText, Link2, Image } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Analyze() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">New Analysis</h1>
      <p className="text-gray-400 mt-2">Submit content for trust analysis</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-8 hover:border-emerald-500/30 transition">
          <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-12 text-center hover:border-emerald-500/30 transition cursor-pointer">
            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Drop your content here or click to upload</p>
            <p className="text-sm text-gray-500 mt-2">Supports documents, text, URLs, and images</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 hover:border-emerald-500/30 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Upload Document</span>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 hover:border-emerald-500/30 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Link2 className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Analyze URL</span>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 hover:border-emerald-500/30 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Image className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Analyze Image</span>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 hover:border-emerald-500/30 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Paste Text</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}