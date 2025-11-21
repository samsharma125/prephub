'use client'
import { useState } from 'react'

export default function ResumeBuilderPage() {
  const [resumeText, setResumeText] = useState('')
  const [suggestions, setSuggestions] = useState('')

  const getSuggestions = async () => {
    const res = await fetch('/api/ai/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText })
    })
    const data = await res.json()
    setSuggestions(data.suggestions)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resume Builder (AI)</h1>
      <textarea
        className="w-full border rounded p-2 h-48"
        placeholder="Paste your resume (plain text)"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      <div className="mt-2">
        <button onClick={getSuggestions} className="bg-blue-600 text-white px-4 py-2 rounded">
          Get AI Suggestions
        </button>
      </div>
      {suggestions && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-2">Suggestions</h2>
          <pre className="whitespace-pre-wrap">{suggestions}</pre>
        </div>
      )}
    </div>
  )
}
