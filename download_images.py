"""Download stock images for ENZARA landing page from free sources."""

import os
import urllib.request
import ssl
from pathlib import Path

# Disable SSL verification for downloads
ssl._create_default_https_context = ssl._create_unverified_context

# Output directory
OUTPUT_DIR = Path("assets/images")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Stock images from Unsplash (free, high-quality, no attribution required for web)
# Using Unsplash Source API for direct downloads
IMAGES = [
    # Product hero - green bottle with natural elements
    {
        "filename": "product-hero.jpg",
        "url": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&h=800&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?w=800&h=800&fit=crop&auto=compress"
    },
    # Value pack / bundle
    {
        "filename": "product-value-pack.jpg",
        "url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=675&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?w=1200&h=675&fit=crop&auto=compress"
    },
    # Before/after dishes - clean kitchen
    {
        "filename": "before-after-dishes.jpg",
        "url": "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&h=675&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=1200&h=675&fit=crop&auto=compress"
    },
    # Natural ingredients - pineapple and lemon
    {
        "filename": "natural-ingredients.jpg",
        "url": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=1200&h=675&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/2480527/pexels-photo-2480527.jpeg?w=1200&h=675&fit=crop&auto=compress"
    },
    # Safe for baby - baby bottles
    {
        "filename": "safe-for-baby.jpg",
        "url": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=800&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/3875225/pexels-photo-3875225.jpeg?w=800&h=800&fit=crop&auto=compress"
    },
    # Eco-friendly - green leaves and nature
    {
        "filename": "eco-friendly.jpg",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?w=800&h=800&fit=crop&auto=compress"
    },
    # Kitchen lifestyle - woman in modern kitchen
    {
        "filename": "kitchen-lifestyle.jpg",
        "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=675&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?w=1200&h=675&fit=crop&auto=compress"
    },
    # Premium badge - gold seal/badge
    {
        "filename": "premium-badge.jpg",
        "url": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=800&fit=crop&auto=format&q=80",
        "fallback": "https://images.pexels.com/photos/3693901/pexels-photo-3693901.jpeg?w=800&h=800&fit=crop&auto=compress"
    },
]


def download_image(url: str, filepath: Path) -> bool:
    """Download an image from URL to file."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        request = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(request, timeout=30) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        return True
    except Exception as e:
        print(f"    Error: {e}")
        return False


def main():
    """Download all stock images."""
    print("=" * 50)
    print("ENZARA Stock Image Downloader")
    print("=" * 50)
    print()

    success_count = 0
    total = len(IMAGES)

    for i, img in enumerate(IMAGES, 1):
        filepath = OUTPUT_DIR / img["filename"]
        print(f"[{i}/{total}] Downloading: {img['filename']}...")

        # Try primary URL
        if download_image(img["url"], filepath):
            print(f"    Saved: {filepath}")
            success_count += 1
        elif "fallback" in img:
            # Try fallback URL
            print("    Trying fallback...")
            if download_image(img["fallback"], filepath):
                print(f"    Saved: {filepath}")
                success_count += 1
            else:
                print("    Failed to download")
        else:
            print("    Failed to download")

        print()

    print("=" * 50)
    print(f"Complete: {success_count}/{total} images downloaded")
    print(f"Output directory: {OUTPUT_DIR.absolute()}")
    print("=" * 50)


if __name__ == "__main__":
    main()
