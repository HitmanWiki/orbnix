import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const buildPath = path.join(__dirname, 'build');

console.log('📦 Starting build copy...');

// Remove existing build folder if it exists
if (fs.existsSync(buildPath)) {
  console.log('🗑️ Removing existing build folder...');
  fs.rmSync(buildPath, { recursive: true, force: true });
}

// Create build folder
console.log('📁 Creating build folder...');
fs.mkdirSync(buildPath, { recursive: true });

// Copy all files from dist to build
function copyFolderSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📋 Copying dist to build...');
copyFolderSync(distPath, buildPath);
console.log('✅ Build folder created successfully!');
console.log(`📊 Files copied: ${fs.readdirSync(buildPath).length}`);