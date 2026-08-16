export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-off-white/50">
      <div className="h-8 w-8 border-2 border-muted-blue border-t-accent rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-wider">Loading</span>
    </div>
  )
}
