'use client'
import { useState } from 'react'

export default function MockTestPage() {
  const [topic, setTopic] = useState('')
  const [questionsText, setQuestionsText] = useState<string>('')

  const startTest = async () => {
    const res = await fetch('/api/ai/mock-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    })
    const data = await res.json()
    setQuestionsText(data.questionsText)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Mock Test</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter topic (e.g. Node.js)"
          className="border p-2 rounded flex-1"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button onClick={startTest} className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate Questions
        </button>
      </div>
      {questionsText && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <pre className="whitespace-pre-wrap">{questionsText}</pre>
        </div>
      )}
    </div>
  )
}
