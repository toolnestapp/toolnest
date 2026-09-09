// Reusable placeholder for future ad slots.
// Currently renders nothing visible so no fake ads are shown in the MVP.
// To enable ads later: set VITE_ADS_ENABLED=true and render your ad script/component here.
const ADS_ENABLED = import.meta.env.VITE_ADS_ENABLED === 'true'

export default function AdPlaceholder({ slot = 'default', className = '' }) {
  if (!ADS_ENABLED) return null

  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-sm text-gray-400 ${className}`}
      data-ad-slot={slot}
    >
      Ad slot: {slot}
    </div>
  )
}
