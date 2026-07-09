import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgDir = 'public/img';
const avifDir = path.join(imgDir, 'avif');
const webpDir = path.join(imgDir, 'webp');

fs.mkdirSync(avifDir, { recursive: true });
fs.mkdirSync(webpDir, { recursive: true });

// Only process original base JPGs (no width suffix)
const sources = fs
  .readdirSync(imgDir)
  .filter((f) => f.endsWith('.jpg') && !/-\d+\.jpg$/i.test(f));

const profileWidths = [320, 480, 640];
const projectWidths = [480, 768, 1024];

function sizeKB(filePath) {
  const normalized = filePath.startsWith('/')
    ? path.join(process.cwd(), filePath)
    : filePath.startsWith('./')
      ? path.join(process.cwd(), filePath.slice(2))
      : filePath.startsWith('.')
        ? path.join(process.cwd(), filePath.slice(1))
        : filePath;
  return Math.round(fs.statSync(normalized).size / 1024);
}

async function writeVariants(file, widths, { isProfile = false } = {}) {
  const base = path.basename(file, path.extname(file));
  const input = path.join(imgDir, file);
  const originalBuffer = fs.readFileSync(input);
  const meta = await sharp(originalBuffer).metadata();
  const maxW = meta.width || Math.max(...widths);

  const used = widths.filter((w) => w <= maxW);
  if (!used.length || used[used.length - 1] < maxW) {
    // include native width if smaller than largest requested and not already present
    if (!used.includes(maxW) && maxW < Math.max(...widths)) {
      used.push(maxW);
    }
  }
  if (!used.length) used.push(maxW);

  const results = {
    base,
    width: meta.width,
    height: meta.height,
    avif: [],
    webp: [],
    jpg: [],
  };

  for (const w of used) {
    const avifName = `${base}-${w}.avif`;
    const webpName = `${base}-${w}.webp`;
    const jpgName = `${base}-${w}.jpg`;

    const resized = sharp(originalBuffer).resize({
      width: w,
      withoutEnlargement: true,
    });

    await resized
      .clone()
      .avif({ quality: isProfile ? 55 : 50, effort: 6 })
      .toFile(path.join(avifDir, avifName));
    await resized
      .clone()
      .webp({ quality: isProfile ? 72 : 68, effort: 5 })
      .toFile(path.join(webpDir, webpName));
    await resized
      .clone()
      .jpeg({ quality: isProfile ? 72 : 68, mozjpeg: true })
      .toFile(path.join(imgDir, jpgName));

    results.avif.push({ file: `/img/avif/${avifName}`, w });
    results.webp.push({ file: `/img/webp/${webpName}`, w });
    results.jpg.push({ file: `/img/${jpgName}`, w });
  }

  // Canonical non-suffixed modern formats at largest generated width
  const largest = used[used.length - 1];
  await sharp(originalBuffer)
    .resize({ width: largest, withoutEnlargement: true })
    .avif({ quality: isProfile ? 55 : 50, effort: 6 })
    .toFile(path.join(avifDir, `${base}.avif`));
  await sharp(originalBuffer)
    .resize({ width: largest, withoutEnlargement: true })
    .webp({ quality: isProfile ? 72 : 68, effort: 5 })
    .toFile(path.join(webpDir, `${base}.webp`));

  // Replace original JPG with compressed version (keep original dimensions capped)
  const targetW = Math.min(maxW, isProfile ? 640 : 1024);
  const tmpJpg = path.join(imgDir, `${base}.jpg.tmp`);
  await sharp(originalBuffer)
    .resize({ width: targetW, withoutEnlargement: true })
    .jpeg({ quality: isProfile ? 72 : 68, mozjpeg: true })
    .toFile(tmpJpg);
  fs.renameSync(tmpJpg, path.join(imgDir, `${base}.jpg`));

  return results;
}

const summary = [];
for (const file of sources) {
  const isProfile = file.toLowerCase().startsWith('profile');
  const res = await writeVariants(file, isProfile ? profileWidths : projectWidths, {
    isProfile,
  });
  summary.push(res);
  console.log(
    'Processed',
    file,
    '-> widths',
    res.avif.map((x) => x.w).join(','),
  );
}

console.log('\n=== Output sizes ===');
for (const s of summary) {
  console.log(`${s.base} (${s.width}x${s.height})`);
  for (const a of s.avif) {
    console.log(`  AVIF ${a.w} ${sizeKB(`.${a.file}`)}KB ${a.file}`);
  }
  for (const w of s.webp) {
    console.log(`  WEBP ${w.w} ${sizeKB(`.${w.file}`)}KB ${w.file}`);
  }
  for (const j of s.jpg) {
    console.log(`  JPG  ${j.w} ${sizeKB(`.${j.file}`)}KB ${j.file}`);
  }
  console.log(`  base jpg ${sizeKB(path.join(imgDir, `${s.base}.jpg`))}KB`);
}
