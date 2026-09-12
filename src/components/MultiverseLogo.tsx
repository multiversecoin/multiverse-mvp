"use client"

export default function MultiverseLogo({ size = 60 }: { size?: number }) {
  return (
    <img
      src="/logo.jpg"
      alt="Multiverse Coin Logo"
      style={{ width: size, height: size }}
      className="mx-auto object-contain"
    />
  )
}
