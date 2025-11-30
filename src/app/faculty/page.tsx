import Sidebar from '@/components/Sidebar'
import { getAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default function FacultyPage() {
  const auth = getAuth()
  if (!auth) redirect('/login')
  if (auth.role !== 'admin') redirect('/dashboard')

  return (
    <div className="flex min-h-screen bg-gray-50">
     <Sidebar role={auth.role} auth={auth} />


      {/* Main Content */}
      <main className="flex-1 p-8 mt-16 md:mt-0">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Faculty Admin Panel</h1>
          <p className="text-gray-500 mt-1">
            Manage students, monitor progress, and control academic activity.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Manage Students */}
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">👨‍🎓 Manage Students</h2>
            <p className="text-gray-600">
              Add, remove, and update student academic & account details.
            </p>
          </div>

          {/* View Progress */}
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📊 View Progress</h2>
            <p className="text-gray-600">
              Track student test scores, activity logs, and performance analytics.
            </p>
          </div>

          {/* Upload Notes */}
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📚 Upload Study Materials</h2>
            <p className="text-gray-600">
              Upload PDFs, assignments, and course notes for students.
            </p>
          </div>

          {/* Attendance */}
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Attendance</h2>
            <p className="text-gray-600">
              Mark attendance and generate attendance reports quickly.
            </p>
          </div>

          {/* AI Insights */}
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🤖 AI Insights</h2>
            <p className="text-gray-600">
              Get AI-powered insights for student weaknesses & suggestions.
            </p>
          </div>

          {/* Scheduling */}
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🗓️ Manage Timetable</h2>
            <p className="text-gray-600">
              Create schedules, set tests, and manage upcoming events.
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
