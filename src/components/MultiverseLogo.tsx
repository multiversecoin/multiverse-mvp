"use client"

export default function MultiverseLogo({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" className="mx-auto">
      <circle cx="75" cy="75" r="60" stroke="#3B82F6" strokeWidth="3" fill="none"/>
      <circle cx="135" cy="75" r="8" fill="#3B82F6">
        <animate attributeName="cx" values="135;15;135" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="135" cy="75" r="12" fill="rgba(59, 130, 246, 0.3)">
        <animate attributeName="cx" values="135;15;135" dur="4s" repeatCount="indefinite"/>
      </circle>
      <text x="75" y="95" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="bold" fill="#3B82F6" textAnchor="middle">M</text>
    </svg>
  )
}
