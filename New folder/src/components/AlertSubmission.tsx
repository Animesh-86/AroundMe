import { Send, Upload } from 'lucide-react';
import { useState } from 'react';
import type { AlertCategory, EventInterest } from '../App';

export function AlertSubmission() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AlertCategory>('Traffic');
  const [eventType, setEventType] = useState<EventInterest>('Music & Culture');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting alert:', { title, description, category, eventType });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTitle('');
      setDescription('');
      setCategory('Traffic');
      setEventType('Music & Culture');
    }, 2000);
  };

  const eventTypeOptions: EventInterest[] = [
    'Music & Culture',
    'Food & Social',
    'Arts & Theatre',
    'Sports',
    'Spiritual',
    'Academic / Tech',
    'Local Markets',
  ];

  return (
    <div className="glass-strong rounded-3xl p-6 border border-white/15 shadow-2xl">
      <h3 className="text-white mb-4">Report an Alert</h3>

      {submitted ? (
        <div className="py-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-green-400">Alert submitted successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief alert title"
              className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/40 text-white placeholder-slate-400 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the alert"
              rows={3}
              className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/40 text-white placeholder-slate-400 resize-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as AlertCategory)}
              className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/40 text-white transition-all"
            >
              <option value="Traffic">Traffic</option>
              <option value="Events">Events</option>
              <option value="Safety">Safety</option>
              <option value="Weather">Weather</option>
            </select>
          </div>

          {category === 'Events' && (
            <div>
              <label className="block text-slate-300 mb-2 text-sm">
                Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventInterest)}
                className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/40 text-white transition-all"
              >
                {eventTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 px-4 py-2 glass border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
              <Upload className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">
                Add Image (Optional)
              </span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <p className="text-slate-500 mt-2 text-xs">
              Image analysis is AI-assisted (prototype)
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
            Report Alert
          </button>
        </form>
      )}
    </div>
  );
}