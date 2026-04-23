import PropertyCard from "./PropertyCard";

function PropertyList({
  properties,
  account,
  onRent,
  onMarkAvailable,
  loading,
  actionLoadingId,
}) {
  const availableCount = properties.filter((property) => property.isAvailable).length;
  const rentedCount = properties.length - availableCount;

  return (
    <section className="mx-auto my-8 max-w-6xl px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900">Property Marketplace</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-slate-900 px-3 py-1 font-semibold text-white">
            Total: {properties.length}
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
            Available: {availableCount}
          </span>
          <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-700">
            Rented: {rentedCount}
          </span>
        </div>
        {loading && <span className="text-sm text-slate-500">Loading...</span>}
      </div>

      {properties.length === 0 ? (
        <div className="glass-panel rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No properties listed yet.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id.toString()}
              property={property}
              account={account}
              onRent={onRent}
              onMarkAvailable={onMarkAvailable}
              actionLoadingId={actionLoadingId}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PropertyList;
