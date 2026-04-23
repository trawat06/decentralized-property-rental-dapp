import { ethers } from "ethers";
import { formatEth, shortenAddress } from "../utils/format";

function PropertyCard({ property, account, onRent, onMarkAvailable, actionLoadingId }) {
  const totalAmount = property.monthlyRent + property.securityDeposit;
  const isLandlord =
    account && property.landlord.toLowerCase() === account.toLowerCase();
  const canRent =
    account &&
    property.isAvailable &&
    !property.isRented &&
    !isLandlord;

  return (
    <article className="glass-panel rounded-3xl p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-slate-900">{property.title}</h4>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            property.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {property.isAvailable ? "Available" : "Rented"}
        </span>
      </div>

      <p className="text-sm text-slate-600">{property.location}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
        <p className="rounded-lg bg-white/70 px-2 py-1">ID: {property.id.toString()}</p>
        <p className="rounded-lg bg-white/70 px-2 py-1">
          Rent: {formatEth(property.monthlyRent)} ETH
        </p>
        <p className="rounded-lg bg-white/70 px-2 py-1">
          Deposit: {formatEth(property.securityDeposit)} ETH
        </p>
        <p className="rounded-lg bg-indigo-50 px-2 py-1 font-medium text-indigo-700">
          Total: {formatEth(totalAmount)} ETH
        </p>
      </div>
      <div className="mt-3 space-y-1 text-sm text-slate-700">
        <p>Landlord: {shortenAddress(property.landlord)}</p>
        <p>
          Contact:{" "}
          <a
            href={`tel:${property.contactNumber}`}
            className="font-medium text-indigo-700 underline-offset-2 hover:underline"
          >
            {property.contactNumber}
          </a>
        </p>
        <p>
          Tenant:{" "}
          {property.tenant === ethers.ZeroAddress
            ? "Not rented yet"
            : shortenAddress(property.tenant)}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        {canRent && (
          <button
            onClick={() => onRent(property.id, totalAmount)}
            disabled={actionLoadingId === property.id.toString()}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {actionLoadingId === property.id.toString() ? "Processing..." : "Rent Now"}
          </button>
        )}

        {isLandlord && !property.isAvailable && (
          <button
            onClick={() => onMarkAvailable(property.id)}
            disabled={actionLoadingId === property.id.toString()}
            className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-amber-300"
          >
            {actionLoadingId === property.id.toString()
              ? "Updating..."
              : "Mark Available"}
          </button>
        )}
      </div>
    </article>
  );
}

export default PropertyCard;
