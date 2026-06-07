// generate-robots.js
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const robotsTxt = `# ============================================
# ORBNIX ROBOTS.TXT
# Last updated: ${new Date().toISOString().split('T')[0]}
# ============================================

# ============================================
# ALLOW ALL MAJOR SEARCH ENGINES
# ============================================
User-agent: *
Allow: /

# Allow all important sections
Allow: /cities/
Allow: /blog/
Allow: /products/
Allow: /services/
Allow: /pricing/
Allow: /contact/
Allow: /about/
Allow: /work/
Allow: /assets/
Allow: /images/

# Disallow sensitive/admin paths
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /static/__next/
Disallow: /vercel/
Disallow: /.git/
Disallow: /config/

# Prevent crawling of query parameters (avoid duplicate content)
Disallow: /*?*
Disallow: /*&*

# Crawl delay to prevent server overload
Crawl-delay: 1

# ============================================
# GOOGLEBOT (Enhanced for better indexing)
# ============================================
User-agent: Googlebot
Allow: /
Allow: /cities/
Allow: /blog/
Allow: /products/
Allow: /services/
Allow: /work/
Allow: /pricing/

# No crawl delay for Google (they handle it well)
Crawl-delay: 0

# Enable JavaScript rendering
User-agent: Googlebot
JavaScript: true

# ============================================
# GOOGLE IMAGE BOT
# ============================================
User-agent: Googlebot-Image
Allow: /
Allow: /assets/
Allow: /images/

# ============================================
# BINGBOT
# ============================================
User-agent: Bingbot
Allow: /
Allow: /cities/
Allow: /blog/
Allow: /products/
Crawl-delay: 1

# ============================================
# DUCKDUCKGO BOT
# ============================================
User-agent: DuckDuckBot
Allow: /
Allow: /cities/
Allow: /blog/
Allow: /products/
Crawl-delay: 1

# ============================================
# YANDEX BOT
# ============================================
User-agent: Yandex
Allow: /
Allow: /cities/
Allow: /blog/
Crawl-delay: 2
Clean-param: utm_source&utm_medium&utm_campaign

# ============================================
# BAIDU SPIDER (Chinese search engine)
# ============================================
User-agent: Baiduspider
Allow: /
Allow: /cities/
Allow: /blog/
Crawl-delay: 2

# ============================================
# AI & DATA SCRAPER BLOCKING (Optional)
# ============================================
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: CCBot
Disallow: /

# ============================================
# SOCIAL MEDIA BOTS (Allow for sharing)
# ============================================
User-agent: Twitterbot
Allow: /
User-agent: FacebookExternalHit
Allow: /
User-agent: LinkedInBot
Allow: /
User-agent: Pinterestbot
Allow: /
User-agent: Slackbot
Allow: /

# ============================================
# SITEMAP LOCATIONS
# ============================================
Sitemap: https://www.orbnix.in/sitemap.xml
Sitemap: https://www.orbnix.in/sitemap-cities.xml

# ============================================
# HOST INFORMATION
# ============================================
Host: https://www.orbnix.in
`;

// Ensure public directory exists
const publicDir = resolve(__dirname, 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Write robots.txt
const robotsPath = resolve(publicDir, 'robots.txt');
writeFileSync(robotsPath, robotsTxt);

console.log(`✅ robots.txt generated successfully!`);
console.log(`   💾 Saved to: ${robotsPath}`);
console.log(`   📅 Last updated: ${new Date().toISOString().split('T')[0]}`);