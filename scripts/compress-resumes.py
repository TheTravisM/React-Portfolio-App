"""Compress resume PDFs by re-encoding embedded images and garbage-collecting."""

from __future__ import annotations

import sys
from pathlib import Path

import fitz  # PyMuPDF


DOCS_DIR = Path("src/assets/docs")
TARGET_KB = 280
IMAGE_DPI = 110
JPEG_QUALITY = 55


def compress_pdf(src: Path, dst: Path) -> tuple[int, int]:
    original_size = src.stat().st_size
    doc = fitz.open(src)

    # Prefer object-level image rewrite when available.
    if hasattr(doc, "rewrite_images"):
        try:
            doc.rewrite_images(
                dpi_threshold=150,
                dpi_target=IMAGE_DPI,
                quality=JPEG_QUALITY,
                lossy=True,
            )
        except (TypeError, ValueError):
            try:
                doc.rewrite_images()
            except Exception:
                pass

    tmp = dst.with_suffix(".tmp.pdf")
    doc.save(
        tmp,
        garbage=4,
        deflate=True,
        deflate_images=True,
        deflate_fonts=True,
        clean=True,
    )
    doc.close()

    # If still too large, rasterize pages at modest DPI as a last resort.
    # This keeps download size small for portfolio use.
    size = tmp.stat().st_size
    if size > TARGET_KB * 1024:
        src_doc = fitz.open(tmp)
        out = fitz.open()
        zoom = IMAGE_DPI / 72
        matrix = fitz.Matrix(zoom, zoom)
        for page in src_doc:
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            img_bytes = pix.tobytes("jpeg")
            rect = page.rect
            new_page = out.new_page(width=rect.width, height=rect.height)
            new_page.insert_image(rect, stream=img_bytes)
        src_doc.close()
        out.save(
            tmp,
            garbage=4,
            deflate=True,
            deflate_images=True,
            deflate_fonts=True,
            clean=True,
        )
        out.close()

    if dst.exists():
        dst.unlink()
    tmp.replace(dst)
    return original_size, dst.stat().st_size


def main() -> int:
    if not DOCS_DIR.exists():
        print(f"Missing docs dir: {DOCS_DIR}", file=sys.stderr)
        return 1

    pdfs = sorted(DOCS_DIR.glob("*.pdf"))
    if not pdfs:
        print("No PDFs found")
        return 1

    for pdf in pdfs:
        before, after = compress_pdf(pdf, pdf)
        print(
            f"{pdf.name}: {before / 1024:.0f}KB -> {after / 1024:.0f}KB "
            f"({(after / before) * 100:.1f}%)"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
