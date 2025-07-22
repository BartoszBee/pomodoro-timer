import Timer from "@/components/Timer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-8">Pomodoro Timer</h1>
      <Timer />
    </main>
  );
}
