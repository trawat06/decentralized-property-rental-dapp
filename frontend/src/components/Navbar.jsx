import WalletConnect from "./WalletConnect";

function Navbar({
  account,
  onConnect,
  loading,
  selectedNetwork,
  onSelectNetwork,
  onSwitchNetwork,
  isNetworkLoading,
}) {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Decentralized Property Rental System
          </h1>
          <p className="text-xs text-slate-500">Ethereum Powered Rental Marketplace</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#contact"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 hover:text-indigo-700"
          >
            Contact
          </a>
          <select
            value={selectedNetwork}
            onChange={(event) => onSelectNetwork(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500"
          >
            <option value="localhost">Hardhat Localhost</option>
            <option value="sepolia">Sepolia</option>
          </select>
          <button
            onClick={() => onSwitchNetwork(selectedNetwork)}
            disabled={isNetworkLoading}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
          >
            {isNetworkLoading ? "Switching..." : "Switch Network"}
          </button>
          <WalletConnect account={account} onConnect={onConnect} loading={loading} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
