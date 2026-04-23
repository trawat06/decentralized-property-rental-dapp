import { useState } from "react";
import { ethers } from "ethers";

const initialForm = {
  title: "",
  location: "",
  contactNumber: "",
  monthlyRent: "",
  securityDeposit: "",
};

function PropertyForm({ onSubmit, submitting }) {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      monthlyRent: ethers.parseEther(formData.monthlyRent || "0"),
      securityDeposit: ethers.parseEther(formData.securityDeposit || "0"),
    });
    setFormData(initialForm);
  };

  return (
    <section className="mx-auto mt-8 max-w-6xl px-6">
      <div className="glass-panel rounded-3xl p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">List New Property</h3>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Landlord Panel
          </span>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Property title"
            required
            className="rounded-xl border border-slate-300 bg-white/90 px-3 py-2 outline-none transition focus:border-indigo-500"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="rounded-xl border border-slate-300 bg-white/90 px-3 py-2 outline-none transition focus:border-indigo-500"
          />
          <input
            type="number"
            step="0.001"
            min="0"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleChange}
            placeholder="Monthly rent (ETH)"
            required
            className="rounded-xl border border-slate-300 bg-white/90 px-3 py-2 outline-none transition focus:border-indigo-500"
          />
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Landlord phone number"
            required
            className="rounded-xl border border-slate-300 bg-white/90 px-3 py-2 outline-none transition focus:border-indigo-500"
          />
          <input
            type="number"
            step="0.001"
            min="0"
            name="securityDeposit"
            value={formData.securityDeposit}
            onChange={handleChange}
            placeholder="Security deposit (ETH)"
            required
            className="rounded-xl border border-slate-300 bg-white/90 px-3 py-2 outline-none transition focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-gradient-to-r from-slate-900 to-indigo-800 px-4 py-2 font-semibold text-white shadow transition hover:opacity-95 disabled:cursor-not-allowed disabled:from-slate-500 disabled:to-slate-500 md:col-span-2"
          >
            {submitting ? "Submitting..." : "List Property"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PropertyForm;
