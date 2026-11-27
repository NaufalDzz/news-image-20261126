/**
 * Deterministic entrypoint for news-image-20261126.
 * Copies the verified 1024x1024 Thursday 26 November 2026 world-news broadsheet
 * (`./entry.png`) to `$MAKEFUN_OUTPUT_DIR/entry.png` (or `/output/entry.png`).
 * Uses Node 22+ standard library only; runs offline with byte-identical output.
 */

import { copyFileSync, mkdirSync, openSync, readSync, closeSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1048576; // 1 MiB MakeFun limit
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_SIGNATURE = Buffer.from([0xff, 0xd8, 0xff]);

function assertValidImage(filePath: string): void {
  const { size } = statSync(filePath);
  if (size <= 0 || size > MAX_BYTES) {
    throw new Error(`Invalid entry.png size: ${size} bytes (limit ${MAX_BYTES})`);
  }
  const header = Buffer.alloc(8);
  const fd = openSync(filePath, 'r');
  try {
    readSync(fd, header, 0, 8, 0);
  } finally {
    closeSync(fd);
  }
  const isPng = header.subarray(0, 8).equals(PNG_SIGNATURE);
  const isJpeg = header.subarray(0, 3).equals(JPEG_SIGNATURE);
  if (!isPng && !isJpeg) {
    throw new Error('entry.png does not start with a valid PNG or JPEG signature');
  }
}

const sourcePath = fileURLToPath(new URL('./entry.png', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destPath = join(outputDir, 'entry.png');

assertValidImage(sourcePath);
mkdirSync(dirname(destPath), { recursive: true });
copyFileSync(sourcePath, destPath);
