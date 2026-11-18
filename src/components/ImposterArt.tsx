import type { Imposter } from '../data/types'

/** Shows the imposter's image, or a hooded silhouette until the art is ready. */
export function ImposterArt({ imposter }: { imposter: Imposter }) {
  return (
    <div className="imposter-art">
      {imposter.image ? (
        <img
          src={imposter.image}
          alt={imposter.name}
          className={imposter.motion ? `idle-${imposter.motion}` : undefined}
          draggable={false}
        />
      ) : (
        <svg viewBox="0 0 120 120" role="img" aria-label={imposter.name}>
          <defs>
            <linearGradient id="hood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a2340" />
              <stop offset="1" stopColor="#0d0a1c" />
            </linearGradient>
          </defs>
          <path d="M60 14c-24 0-38 20-38 44v48h76V58c0-24-14-44-38-44z" fill="url(#hood)" stroke="#ff3d8b" strokeOpacity=".5" />
          <ellipse cx="60" cy="60" rx="24" ry="22" fill="#3949d6" />
          <path d="M42 54l12 4-12 4zM78 54l-12 4 12 4z" fill="#ff2d6f" />
          <path d="M50 70q10 8 20 0" stroke="#0d0a1c" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}
