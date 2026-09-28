import type { AboutContent } from "@/model/types";

/**
 * Two identical copies of the photo strip, laid end to end as one flat
 * row — the CSS animation scrolls exactly `translateX(-50%)`, which
 * only lands the loop seamlessly because every image (including the
 * last one in each copy) carries the same fixed trailing margin as its
 * spacing, rather than a `gap` on the row. `gap` only applies *between*
 * children, so the boundary between the two copies would be a
 * differently-sized seam than the flexible `clamp()`-height images
 * produce everywhere else — exactly 50% wouldn't line up. A uniform
 * per-image margin makes the two copies truly identical halves, so any
 * width (the images size responsively) still splits evenly.
 * The second copy is decorative (same images, already described once)
 * and hidden from assistive tech.
 */
export function PhotoMarquee({ photos }: { photos: AboutContent["photos"] }) {
  return (
    <div className="about-marquee">
      <div className="about-marquee-track">
        {photos.map((photo) => (
          <img
            key={`a-${photo.src}`}
            className="about-marquee-photo"
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
          />
        ))}
        {photos.map((photo) => (
          <img
            key={`b-${photo.src}`}
            className="about-marquee-photo"
            src={photo.src}
            alt=""
            aria-hidden="true"
            width={photo.width}
            height={photo.height}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
