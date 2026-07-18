export default function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Reports</h1>
      <p className="text-gray-400 mt-2">View your analysis reports</p>
      <div className="mt-8">
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <p className="text-gray-400">No reports yet</p>
          <p className="text-sm text-gray-500 mt-1">Run an analysis to generate your first report</p>
        </div>
      </div>
    </div>
  );
}