"""Generate product images for ENZARA landing page using Gemini AI."""

import os
import time
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

# Initialize client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Output directory
OUTPUT_DIR = Path("assets/images")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Image generation model
IMAGE_MODEL = "gemini-2.0-flash-exp-image-generation"

# Retry settings
MAX_RETRIES = 3
RETRY_DELAY = 15  # seconds between retries
REQUEST_DELAY = 10  # seconds between requests


def generate_image(prompt: str, filename: str) -> bool:
    """Generate an image using Gemini and save it."""
    print(f"Generating: {filename}...")

    for attempt in range(MAX_RETRIES):
        try:
            response = client.models.generate_content(
                model=IMAGE_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                ),
            )

            # Extract and save image
            for part in response.candidates[0].content.parts:
                if part.inline_data is not None:
                    image_data = part.inline_data.data
                    output_path = OUTPUT_DIR / filename
                    with open(output_path, "wb") as f:
                        f.write(image_data)
                    print(f"  Saved: {output_path}")
                    return True

            print(f"  Warning: No image data in response")
            return False

        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                if attempt < MAX_RETRIES - 1:
                    wait_time = RETRY_DELAY * (attempt + 1)
                    print(f"  Rate limited. Waiting {wait_time}s before retry {attempt + 2}/{MAX_RETRIES}...")
                    time.sleep(wait_time)
                else:
                    print(f"  Error: Rate limit exceeded after {MAX_RETRIES} attempts")
                    return False
            else:
                print(f"  Error: {e}")
                return False

    return False


# Product images to generate
IMAGES = [
    {
        "filename": "product-hero.png",
        "prompt": """Create a product photography image of a premium enzyme dishwashing liquid bottle.
- Modern, elegant 500ml bottle with pump dispenser
- Transparent/translucent green bottle showing the clear liquid inside
- Clean white and green label with leaf design elements
- Label text: "ENZARA" in modern typography
- Pineapple and lemon slices decoratively placed around the bottle
- Fresh green leaves as accent decoration
- Clean white background with soft shadows
- Professional studio lighting, high-end product photography style
- Eco-friendly, natural, organic aesthetic
- Square format, 4K quality, sharp focus on the bottle"""
    },
    {
        "filename": "product-value-pack.png",
        "prompt": """Create a product photography showing a value bundle deal.
- Main: 500ml ENZARA enzyme dishwashing liquid bottle (green, modern design)
- Bonus items arranged around it: yellow cleaning sponge, small sample bottle
- "BEST VALUE" ribbon/badge overlay in gold
- Gift box presentation style
- Pineapple and lemon decorative elements
- Clean white background with celebration confetti
- Professional e-commerce product photography
- Bright, cheerful lighting
- Premium gift set aesthetic
- Wide format 16:9 ratio"""
    },
    {
        "filename": "before-after-dishes.png",
        "prompt": """Create a split-screen comparison image for dishwashing product.
LEFT SIDE (Before): Stack of dirty dishes with grease stains, food residue, cloudy glasses
RIGHT SIDE (After): Same dishes now sparkling clean, crystal clear glasses, shiny plates
- Clear dividing line between before/after
- Dramatic lighting difference (dull left, bright right)
- Kitchen sink/counter setting
- Realistic, relatable household dishes
- Professional before/after photography style
- High contrast to show the difference
- Wide format 16:9 ratio"""
    },
    {
        "filename": "natural-ingredients.png",
        "prompt": """Create a flat lay photography of natural ingredients for eco-friendly product.
- Fresh whole pineapple cut to show inside
- Bright yellow lemons, some sliced
- Green tropical leaves (palm, monstera)
- Small glass bottles with natural extracts
- Wooden cutting board as base
- Clean white marble background
- Soft natural lighting from above
- Organic, fresh, natural aesthetic
- Food photography style with vibrant colors
- Ingredients arranged in pleasing composition
- Wide format 16:9 ratio"""
    },
    {
        "filename": "safe-for-baby.png",
        "prompt": """Create a heartwarming image of baby bottle safety concept.
- Clean baby bottles and sippy cups on kitchen counter
- Soft, warm lighting
- Mother's hands gently holding a sparkling clean baby bottle
- Green plant in background suggesting natural/safe
- Soft pastel colors (light green, white, cream)
- Safe, gentle, nurturing atmosphere
- Family-friendly, trustworthy aesthetic
- Clean, minimal composition
- Lifestyle photography style
- Square format"""
    },
    {
        "filename": "eco-friendly.png",
        "prompt": """Create an eco-friendly environmental concept image.
- Hands holding a small green plant/seedling
- Clean water droplets on green leaves
- Earth/globe subtle in background
- Recycling symbol made of leaves
- Fresh, clean, environmental aesthetic
- Green and blue color palette
- Natural sunlight
- Sustainable living concept
- Hope and environmental responsibility theme
- Clean, modern, minimal style
- Square format"""
    },
    {
        "filename": "kitchen-lifestyle.png",
        "prompt": """Create a modern kitchen lifestyle scene.
- Beautiful bright modern kitchen with white cabinets
- Woman happily washing dishes at sink (back/side view)
- Sunlight streaming through window
- Green plants on windowsill
- Green dish soap bottle visible on counter
- Clean, organized, aspirational kitchen
- Warm, inviting atmosphere
- Lifestyle photography for home products
- Natural, authentic moment captured
- Wide format 16:9 ratio"""
    },
    {
        "filename": "premium-badge.png",
        "prompt": """Create a premium quality certification badge design.
- Elegant circular badge/seal design
- Gold and green color scheme
- Laurel wreath border
- Text: "PREMIUM QUALITY"
- Star or checkmark icon in center
- Metallic gold texture
- Clean transparent or white background
- Official certification aesthetic
- Trust badge for e-commerce
- High resolution, vector-like quality
- Square format"""
    },
]


def main():
    """Generate all product images."""
    print("=" * 50)
    print("ENZARA Product Image Generator")
    print("=" * 50)
    print(f"Retry delay: {RETRY_DELAY}s | Request delay: {REQUEST_DELAY}s")
    print()

    success_count = 0
    total = len(IMAGES)

    for i, img in enumerate(IMAGES, 1):
        print(f"[{i}/{total}] ", end="")
        if generate_image(
            prompt=img["prompt"],
            filename=img["filename"]
        ):
            success_count += 1

        # Wait between requests to avoid rate limiting
        if i < total:
            print(f"  Waiting {REQUEST_DELAY}s before next request...")
            time.sleep(REQUEST_DELAY)
        print()

    print("=" * 50)
    print(f"Complete: {success_count}/{total} images generated")
    print(f"Output directory: {OUTPUT_DIR.absolute()}")
    print("=" * 50)


if __name__ == "__main__":
    main()
