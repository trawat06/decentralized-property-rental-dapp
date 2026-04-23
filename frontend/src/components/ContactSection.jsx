function ContactSection() {
  return (
    <section id="contact" className="mx-auto mt-8 max-w-6xl px-6">
      <div className="glass-panel rounded-3xl p-6 shadow-lg">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-900">Contact</h3>
          <p className="mt-1 text-sm text-slate-600">
            For project demo, collaboration, or rental support, contact the team.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/80 p-4">
            <p className="text-sm font-semibold text-slate-900">Email</p>
            <p className="mt-1 text-sm text-slate-600">propertyrental.dapp@gmail.com</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">Phone</p>
            <p className="mt-1 text-sm text-slate-600">+91 98765 43210</p>
          </div>

          <form
            className="rounded-2xl bg-white/80 p-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <p className="mb-3 text-sm font-semibold text-slate-900">Send Message</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <textarea
                rows="3"
                placeholder="Your message"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
