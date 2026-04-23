import { shortenAddress } from "../utils/format";

const NETWORK_LABELS = {
  "0x7a69": "Hardhat Localhost (31337)",
  "0xaa36a7": "Sepolia (11155111)",
};

function HeroSection({ account, onConnect, loading, currentChainId, selectedNetwork }) {
  const chainLabel =
    NETWORK_LABELS[currentChainId] || "Unknown network (please switch network)";

  return (
    <section className="mx-auto mt-8 max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
        <div className="absolute -right-14 -top-14 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-indigo-300/30 blur-2xl" />
        <div className="relative">
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs">
            Trusted Web3 Rental Experience
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Rent Properties Securely With Ethereum
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-indigo-50 md:text-base">
            Landlords list properties on-chain and tenants pay rent plus deposit
            through smart contracts. Every action is verifiable and wallet-based.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onConnect}
            disabled={loading}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:bg-indigo-100"
          >
            {loading
              ? "Connecting..."
              : account
              ? `Connected: ${shortenAddress(account)}`
              : "Connect Wallet"}
          </button>
          <span className="text-xs text-indigo-100">
            {account
              ? "Wallet connected. You can list and rent properties."
              : "Connect MetaMask to list and rent properties."}
          </span>
        </div>
        <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
          <div className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
            Selected network: <span className="font-semibold">{selectedNetwork}</span>
          </div>
          <div className="rounded-lg border border-white/25 bg-white/10 px-3 py-2">
            Wallet network: <span className="font-semibold">{chainLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
