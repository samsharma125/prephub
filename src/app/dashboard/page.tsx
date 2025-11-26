import Sidebar from "@/components/Sidebar";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatWidget from "@/components/ChatWidget";

export default function DashboardPage() {
  const auth = getAuth();
  if (!auth) redirect("/login");

  return (
    <div className="flex min-h-screen bg-[#0d1b2a] text-white">
      {/* Sidebar */}
      <Sidebar role={auth.role} />

      {/* Main Content */}
      <main className="flex-1 p-8 pt-20 md:pt-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">
         Welcome Back, {auth.name} 👋
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="p-6 bg-[#1b263b] rounded-2xl shadow hover:shadow-xl transition border border-[#415a77]/30">
            <h2 className="text-lg font-semibold text-blue-300 mb-2">
              Activity
            </h2>
            <p className="text-gray-300 text-sm">
              Your recent activity and updates appear here.
            </p>
          </div>

          <div className="p-6 bg-[#1b263b] rounded-2xl shadow hover:shadow-xl transition border border-[#415a77]/30">
            <h2 className="text-lg font-semibold text-blue-300 mb-2">
              Mock Test Summary
            </h2>
            <p className="text-gray-300 text-sm">
              Latest test scores and interview insights.
            </p>
          </div>

          <div className="p-6 bg-[#1b263b] rounded-2xl shadow hover:shadow-xl transition border border-[#415a77]/30">
            <h2 className="text-lg font-semibold text-blue-300 mb-2">
              Assignments
            </h2>
            <p className="text-gray-300 text-sm">
              Track upcoming & completed assignments.
            </p>
          </div>

          <div className="p-6 bg-[#1b263b] rounded-2xl shadow hover:shadow-xl transition border border-[#415a77]/30">
            <h2 className="text-lg font-semibold text-blue-300 mb-2">
              Calendar
            </h2>
            <p className="text-gray-300 text-sm">
              View lectures, exams & important events.
            </p>
          </div>
        </div>

        {/* Big Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#1b263b] rounded-2xl shadow p-6 border border-[#415a77]/30">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              Recent Activity
            </h3>
            <p className="text-gray-300 text-sm">
              No recent activity available at the moment.
            </p>
          </div>

          <div className="bg-[#1b263b] rounded-2xl shadow p-6 border border-[#415a77]/30">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              Upcoming Deadlines
            </h3>
            <p className="text-gray-300 text-sm">
              You're all caught up! No deadlines right now.
            </p>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
