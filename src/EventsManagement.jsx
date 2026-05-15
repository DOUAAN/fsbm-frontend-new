import { useState } from "react";

const initialEvents = [
  { id: "evt-001", titre: "Tech Fest 2026", club: "IEEE Student Branch", lieu: "Engineering Auditorium", membres: 148, date: "May 24", color: "bg-purple-600" },
  { id: "evt-002", titre: "Annual Cultural Night", club: "Cultural Committee", lieu: "Main Amphitheatre", membres: 320, date: "May 27", color: "bg-pink-500" },
  { id: "evt-003", titre: "Inter-College Debate", club: "Debate Club", lieu: "Seminar Hall B", membres: 64, date: "Jun 3", color: "bg-blue-500" },
  { id: "evt-004", titre: "Robotics Workshop", club: "Robotics Club", lieu: "Tech Lab 2", membres: 87, date: "Jun 8", color: "bg-purple-500" },
  { id: "evt-005", titre: "Photography Exhibition", club: "Photography Society", lieu: "Art Gallery", membres: 52, date: "Jun 12", color: "bg-pink-600" },
  { id: "evt-006", titre: "Entrepreneurship Summit", club: "Entrepreneurship Society", lieu: "Main Hall", membres: 119, date: "Jun 15", color: "bg-indigo-500" },
];

const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6600FF] focus:ring-2 focus:ring-[#6600FF]/10 transition placeholder:text-gray-400";

export default function EventsManagement() {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    titre: "", club: "", lieu: "", membres: "0", date: "", color: "bg-purple-600",
  });

  const filtered = events.filter(e =>
    e.titre.toLowerCase().includes(search.toLowerCase()) ||
    e.club.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (editData) {
      setEvents(events.map(e => e.id === editData.id ? { ...e, ...form } : e));
    } else {
      setEvents([...events, { ...form, id: `evt-${Date.now()}` }]);
    }
    setEditData(null);
    setShowForm(false);
  };

  const handleDelete = (evt) => {
    setEvents(events.filter(e => e.id !== evt.id));
    setDeleteTarget(null);
  };

  const colors = [
    "bg-purple-600", "bg-pink-500", "bg-blue-500",
    "bg-indigo-500", "bg-pink-600", "bg-green-500",
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Events Management</h2>
          <p className="text-sm text-gray-400 mt-1">Manage all upcoming university events.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setEditData(null); setShowForm(true); }}
            className="bg-[#6600FF] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition"
          >
            + Add New Event
          </button>
        )}
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-white rounded-2xl overflow-hidden border shadow-sm">
          <div className="bg-[#6600FF] px-6 py-5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                {editData ? "Edit Event" : "Add New Event"}
              </h2>
              <p className="text-purple-200 text-sm mt-1">Fill in the event details.</p>
            </div>
            <button onClick={() => { setShowForm(false); setEditData(null); }} className="text-white text-xl hover:text-purple-200">✕</button>
          </div>

          <div className="px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
              <input value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })} placeholder="e.g. Tech Fest 2026" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Club <span className="text-red-500">*</span></label>
                <input value={form.club} onChange={e => setForm({ ...form, club: e.target.value })} placeholder="Organizing club" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location <span className="text-red-500">*</span></label>
                <input value={form.lieu} onChange={e => setForm({ ...form, lieu: e.target.value })} placeholder="e.g. Engineering Auditorium" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date <span className="text-red-500">*</span></label>
                <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="e.g. May 24" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expected Members</label>
                <input value={form.membres} onChange={e => setForm({ ...form, membres: e.target.value })} placeholder="0" type="number" className={inputClass} />
              </div>
            </div>

            {/* Color picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Color</label>
              <div className="flex gap-3">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setForm({ ...form, color: c })}
                    className={`w-8 h-8 rounded-full ${c} transition ${form.color === c ? "ring-2 ring-offset-2 ring-[#6600FF]" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
            <button onClick={() => { setShowForm(false); setEditData(null); }} className="px-5 py-2.5 text-sm text-gray-600 bg-white border rounded-xl hover:bg-gray-100 transition">
              Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2.5 text-sm font-medium bg-[#6600FF] text-white rounded-xl hover:bg-purple-800 transition">
              {editData ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      {!showForm && (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#f6f1fc]">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Upcoming Events</h3>
              <p className="text-xs text-gray-400 mt-0.5">Next 30 days</p>
            </div>
            <span className="bg-[#ede0ff] text-[#6600FF] text-sm font-semibold px-4 py-1.5 rounded-full">
              {filtered.length} total
            </span>
          </div>

          {/* Search */}
          <div className="px-6 py-3 bg-[#f6f1fc]">
            <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="Search events or clubs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none w-full"
              />
            </div>
          </div>

          {/* Events */}
          <div className="divide-y divide-gray-50 px-6">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No events found</div>
            ) : (
              filtered.map(evt => (
                <div key={evt.id} className="flex items-center justify-between py-5 group hover:bg-gray-50 -mx-6 px-6 transition">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 ${evt.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="font-semibold text-gray-800">{evt.titre}</div>
                      <div className="text-sm text-gray-400 mt-0.5">{evt.club}</div>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          {evt.lieu}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                          </svg>
                          {evt.membres}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date + Actions */}
                  <div className="flex items-center gap-4">
                    <span className="bg-[#ede0ff] text-[#6600FF] text-sm font-semibold px-4 py-1.5 rounded-full">
                      {evt.date}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => { setEditData(evt); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-[#f6f1fc] text-gray-400 hover:text-[#6600FF] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteTarget(evt)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-red-600">Delete Event</h3>
          <p className="text-gray-500 text-sm mb-6">
            Are you sure you want to delete <strong>{deleteTarget.titre}</strong> ? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">Cancel</button>
            <button onClick={() => handleDelete(deleteTarget)} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
          </div>
        </div>
      )}

    </div>
  );
}