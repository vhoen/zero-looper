import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function buildSingleFile() {
  const root = process.cwd();
  const inputPath = resolve(root, 'index.html');
  const outputDir = resolve(root, 'dist');
  const outputPath = resolve(outputDir, 'zero-looper.single.html');

  const html = await readFile(inputPath, 'utf8');

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, html, 'utf8');

  const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(2);
  console.log(`Built single-file app: ${outputPath}`);
  console.log(`Output size: ${sizeKb} KB`);
}

buildSingleFile().catch((error) => {
  console.error('Build failed:', error.message);
  process.exitCode = 1;
});
