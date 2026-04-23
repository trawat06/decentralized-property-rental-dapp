import { shortenAddress } from "../utils/format";

function WalletConnect({ account, onConnect, loading }) {
  return (
    <button
      onClick={onConnect}
      disabled={loading}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
    >
      {loading
        ? "Connecting..."
        : account
        ? shortenAddress(account)
        : "Connect Wallet"}
    </button>
  );
}

export default WalletConnect;
