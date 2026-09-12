import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const PORT = 3000;

const MIME_TYPES: { [ext: string]: string } = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

export function handleStaticRequest(reqPath: string): { status: number; contentType: string; content: Buffer } {
  let pathname = decodeURIComponent(reqPath.split('?')[0]);

  let targetFile = path.join(distDir, pathname);

  // 1. 如果请求的是目录，或者存在 target/index.html
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).isDirectory()) {
    targetFile = path.join(targetFile, 'index.html');
  } else if (!fs.existsSync(targetFile)) {
    if (fs.existsSync(path.join(targetFile, 'index.html'))) {
      targetFile = path.join(targetFile, 'index.html');
    } else if (fs.existsSync(`${targetFile}.html`)) {
      targetFile = `${targetFile}.html`;
    }
  }

  // 2. 如果找到了有效文件
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
    const ext = path.extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(targetFile);
    return { status: 200, contentType, content };
  }

  // 3. 404 Fallback
  const notFoundFile = path.join(distDir, '404.html');
  if (fs.existsSync(notFoundFile)) {
    return {
      status: 404,
      contentType: 'text/html; charset=utf-8',
      content: fs.readFileSync(notFoundFile)
    };
  }

  return {
    status: 404,
    contentType: 'text/plain; charset=utf-8',
    content: Buffer.from('404 Not Found')
  };
}

async function runDev() {
  console.log('🔄 Performing initial build...');
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

  // 监听目录变化自动 rebuild
  const watchDirs = ['content', 'src', 'public'];
  let isBuilding = false;
  let rebuildTimeout: NodeJS.Timeout | null = null;

  function triggerRebuild(event: string, filename: string | null) {
    if (rebuildTimeout) clearTimeout(rebuildTimeout);
    rebuildTimeout = setTimeout(() => {
      if (isBuilding) return;
      isBuilding = true;
      console.log(`\n📝 Change detected (${event} in ${filename}). Rebuilding...`);
      try {
        execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
      } catch (e) {
        console.error('Rebuild failed:', e);
      } finally {
        isBuilding = false;
      }
    }, 200);
  }

  for (const dir of watchDirs) {
    const fullDir = path.resolve(rootDir, dir);
    if (fs.existsSync(fullDir)) {
      fs.watch(fullDir, { recursive: true }, triggerRebuild);
    }
  }

  const server = http.createServer((req, res) => {
    const { status, contentType, content } = handleStaticRequest(req.url || '/');
    res.writeHead(status, { 'Content-Type': contentType });
    res.end(content);
  });

  server.listen(PORT, () => {
    console.log(`\n🎉 Dev Server is running at http://localhost:${PORT}`);
    console.log(`   ➜ Local:   http://localhost:${PORT}/`);
    console.log(`   ➜ Post:    http://localhost:${PORT}/blog/verdaccio-offline`);
    console.log(`   ➜ About:   http://localhost:${PORT}/about`);
    console.log(`   ➜ Excerpt: http://localhost:${PORT}/excerpt\n`);
  });
}

// 仅在直接执行时启动 dev server
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runDev().catch(console.error);
}
