import { useState, useEffect } from "react";
import { Search, Filter, Plus, ChevronDown } from "lucide-react";

const initialClubs = [
  { id: "club-001", nom: "Chess & Strategy Club", description: "Competitive chess training an...", categorie: "Academic", membres: 44, president: "Yuki Tanaka", annee: 2019, statut: "Active" },
  { id: "club-002", nom: "Cultural Committee", description: "Organizing cultural festivals...", categorie: "Arts & Culture", membres: 203, president: "Mei Lin Chen", annee: 2012, statut: "Active" },
  { id: "club-003", nom: "Debate Club", description: "Parliamentary and competitiv...", categorie: "Academic", membres: 64, president: "Fatima Al-Rashid", annee: 2015, statut: "Pending" },
  { id: "club-004", nom: "Drama Society", description: "Stage productions, improv wo...", categorie: "Arts & Culture", membres: 71, president: "Liam O'Brien", annee: 2017, statut: "Active" },
  { id: "club-005", nom: "Entrepreneurship Society", description: "Startup mentorship, pitch co...", categorie: "Academic", membres: 119, president: "Priya Nair", annee: 2021, statut: "Active" },
  { id: "club-006", nom: "IEEE Student Branch", description: "Student chapter of IEEE focusi...", categorie: "Technical", membres: 148, president: "Arjun Mehta", annee: 2018, statut: "Active" },
  { id: "club-007", nom: "Photography Society", description: "Photography workshops, exhi...", categorie: "Arts & Culture", membres: 52, president: "Daniel Okonkwo", annee: 2023, statut: "Active" },
  { id: "club-008", nom: "Robotics Club", description: "Hands-on robotics design, bu...", categorie: "Technical", membres: 87, president: "Ravi Sharma", annee: 2020, statut: "Active" },
  { id: "club-009", nom: "Sustainability Club", description: "Campus sustainability initiativ...", categorie: "Cultural", membres: 38, president: "Sofia Herrera", annee: 2024, statut: "Pending" },
  { id: "club-010", nom: "Volleyball Association", description: "Competitive and recreational...", categorie: "Sports", membres: 96, president: "Kofi Asante", annee: 2016, statut: "Suspended" },
  { id: "club-011", nom: "Football Team", description: "University football team...", categorie: "Sports", membres: 112, president: "Carlos Mendez", annee: 2010, statut: "Active" },
  { id: "club-012", nom: "Astronomy Society", description: "Stargazing and space research...", categorie: "Academic", membres: 89, president: "Priya Nair", annee: 2020, statut: "Active" },
];

const categoryColors = {
  Academic: "bg-indigo-100 text-indigo-600",
  "Arts & Culture": "bg-pink-100 text-pink-600",
  Technical: "bg-blue-100 text-blue-700",
  Cultural: "bg-yellow-100 text-yellow-700",
  Sports: "bg-green-100 text-green-700",
  Social: "bg-orange-100 text-orange-700",
};

const statusColors = {
  Active: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-700",
  Suspended: "bg-red-100 text-red-600",
  Archived: "bg-gray-100 text-gray-500",
};

const statusDots = {
  Active: "bg-green-500",
  Pending: "bg-yellow-500",
  Suspended: "bg-red-500",
  Archived: "bg-gray-400",
};

const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6600FF] focus:ring-2 focus:ring-[#6600FF]/10 transition placeholder:text-gray-400";

export default function ClubsManagement() {
  const [clubs, setClubs] = useState(initialClubs);
  const [search, setSearch] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("All");
  const [filterStatut, setFilterStatut] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [form, setForm] = useState({
    nom: "", categorie: "Academic", president: "", email: "",
    description: "", annee: "2026", membres: "0", statut: "Active",
  });

  useEffect(() => {
    if (editData) setForm(editData);
    else setForm({ nom: "", categorie: "Academic", president: "", email: "", description: "", annee: "2026", membres: "0", statut: "Active" });
  }, [editData, showForm]);

  const filtered = clubs.filter(c => {
    const matchSearch = c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.president.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategorie === "All" || c.categorie === filterCategorie;
    const matchStatut = filterStatut === "All" || c.statut === filterStatut;
    return matchSearch && matchCat && matchStatut;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSave = () => {
    if (editData) {
      setClubs(clubs.map(c => c.id === editData.id ? { ...c, ...form } : c));
    } else {
      setClubs([...clubs, { ...form, id: `club-${Date.now()}` }]);
    }
    setEditData(null);
    setShowForm(false);
  };

  const handleDelete = (club) => {
    setClubs(clubs.filter(c => c.id !== club.id));
    setDeleteTarget(null);
  };

  const getInitials = (nom) => nom.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">

      {/* Formulaire Add/Edit */}
      {showForm && (
        <div className="bg-white rounded-[35px] overflow-hidden border border-gray-100 shadow-sm">
          <div className="bg-[#6600FF] px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                {editData ? "Edit Club" : "Add New Club"}
              </h2>
              <p className="text-purple-200 text-sm mt-1">
                Complete all required fields to submit a club registration.
              </p>
            </div>
            <button onClick={() => { setShowForm(false); setEditData(null); }} className="text-white hover:text-purple-200 text-2xl transition">✕</button>
          </div>

          <div className="px-8 py-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Club Name <span className="text-red-500">*</span></label>
              <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="e.g. Robotics Engineering Club" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })} className={inputClass}>
                  {["Academic", "Sports", "Arts & Culture", "Cultural", "Technical", "Social"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Initial Status</label>
                <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })} className={inputClass}>
                  {["Active", "Pending", "Suspended", "Archived"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Club President <span className="text-red-500">*</span></label>
              <p className="text-xs text-gray-400 mb-1.5">The primary contact responsible for this club.</p>
              <input value={form.president} onChange={e => setForm({ ...form, president: e.target.value })} placeholder="Full name of the club president" className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">President Email <span className="text-red-500">*</span></label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="president@university.edu" type="email" className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Club Description <span className="text-red-500">*</span></label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Briefly describe the club's purpose, activities, and target audience..." rows={3} className={`${inputClass} resize-none`} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Founded Year <span className="text-red-500">*</span></label>
                <input value={form.annee} onChange={e => setForm({ ...form, annee: e.target.value })} placeholder="2026" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Members</label>
                <input value={form.membres} onChange={e => setForm({ ...form, membres: e.target.value })} placeholder="0" type="number" className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-8 py-4 border-t bg-gray-50">
            <button onClick={() => { setShowForm(false); setEditData(null); }} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition">
              Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2.5 text-sm font-medium bg-[#6600FF] text-white rounded-xl hover:bg-purple-800 transition">
              {editData ? "Update Club" : "Create Club"}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {!showForm && (
        <div className="bg-[#f4f1ff] rounded-[35px] p-8">

          {/* Title + Actions */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-[#1d2152]">Clubs Registry</h2>
              <p className="text-gray-500 mt-1">{filtered.length} clubs found</p>
            </div>
            <button
              onClick={() => { setEditData(null); setShowForm(true); }}
              className="bg-[#6600FF] hover:bg-purple-800 text-white rounded-full px-7 py-4 flex items-center gap-2 font-semibold shadow-lg transition"
            >
              <Plus size={18} />
              Add New Club
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-[30px] p-5 flex items-center gap-5 border border-gray-100 mb-8">
            <div className="flex-1 flex items-center gap-3 bg-[#fafafa] border border-gray-200 rounded-full px-5 py-4">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by club name or president..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
            <select
              value={filterCategorie}
              onChange={e => { setFilterCategorie(e.target.value); setPage(1); }}
              className="w-56 bg-[#fafafa] border border-gray-200 rounded-full px-5 py-4 text-sm text-[#1d2152] outline-none"
            >
              {["All", "Academic", "Sports", "Arts & Culture", "Cultural", "Technical", "Social"].map(c => (
                <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
              ))}
            </select>
            <select
              value={filterStatut}
              onChange={e => { setFilterStatut(e.target.value); setPage(1); }}
              className="w-44 bg-[#fafafa] border border-gray-200 rounded-full px-5 py-4 text-sm text-[#1d2152] outline-none"
            >
              {["All", "Active", "Pending", "Suspended", "Archived"].map(s => (
                <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[35px] overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="grid grid-cols-12 px-8 py-5 border-b text-xs font-semibold text-gray-400 uppercase">
              <div className="col-span-4">Club Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Members</div>
              <div className="col-span-2">President</div>
              <div className="col-span-1">Founded</div>
              <div className="col-span-2">Status</div>
            </div>

            {/* Rows */}
            {paginated.length === 0 ? (
              <div className="px-8 py-16 text-center text-gray-400 text-sm">No clubs found</div>
            ) : (
              paginated.map(club => (
                <div key={club.id} className="grid grid-cols-12 items-center px-8 py-5 border-b last:border-none hover:bg-[#faf9ff] transition group">
                  {/* Club Name */}
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6600FF] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {getInitials(club.nom)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1d2152]">{club.nom}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{club.description}</div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${categoryColors[club.categorie] || "bg-gray-100 text-gray-600"}`}>
                      {club.categorie}
                    </span>
                  </div>

                  {/* Members */}
                  <div className="col-span-1 font-bold text-[#1d2152]">{club.membres}</div>

                  {/* President */}
                  <div className="col-span-2">
                    <div className="font-medium text-[#1d2152]">{club.president}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{club.email}</div>
                  </div>

                  {/* Founded */}
                  <div className="col-span-1 text-gray-500">{club.annee}</div>

                  {/* Status + Actions */}
                  <div className="col-span-2 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[club.statut] || "bg-gray-100 text-gray-600"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDots[club.statut] || "bg-gray-400"}`}></span>
                      {club.statut}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => { setEditData(club); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-[#f6f1fc] text-gray-400 hover:text-[#6600FF] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteTarget(club)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition">
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-gray-500">
              Showing <strong>{(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)}</strong> of <strong>{filtered.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-sm border rounded-full bg-white hover:bg-gray-50 disabled:opacity-40 transition">
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => setPage(i + 1)} className={`px-4 py-2 text-sm rounded-full border transition ${page === i + 1 ? "bg-[#6600FF] text-white border-[#6600FF]" : "bg-white hover:bg-gray-50"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm border rounded-full bg-white hover:bg-gray-50 disabled:opacity-40 transition">
                ›
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-red-600">Delete Club</h3>
          <p className="text-gray-500 text-sm mb-6">
            Are you sure you want to delete <strong>{deleteTarget.nom}</strong> ? This cannot be undone.
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