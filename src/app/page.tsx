import Link from "next/link";

export default function Home() {
  return (
    <div className="grid items-center justify-center min-h-screen p-8 pb-20 sm:pt-18 bg-gradient-to-b from-slate-800 to-stone-200">
  <main className="flex flex-col gap-8 items-center justify-center mt-4 text-center">
    <h1 className="text-4xl font-bold text-gray-200 font-mono">
      Welcome to Brainblast
    </h1>
    <div className="flex flex-col sm:flex-row justify-center gap-x-20 gap-y-10 p-20 rounded-lg">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-gray-100 font-bold text-lg">Let's Play</p>
        <Link href="/student">
          <button
            className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-violet-600
             text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full 
               before:duration-500 before:ease-out hover:shadow-violet-700 hover:before:h-56 hover:before:w-56 rounded hover:scale-125"
          >
            <span className="relative z-10">Student</span>
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-gray-100 font-bold text-lg">Add Question</p>
        <Link href="/instructor">
          <button
            className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-green-600
             text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full 
               before:duration-500 before:ease-out hover:shadow-green-400 hover:before:h-56 hover:before:w-56 rounded hover:scale-125"
          >
            <span className="relative z-10">Instructor</span>
          </button>
        </Link>
      </div>
    </div>
  </main>
</div>


  );
}
