import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load local development variables without overriding values already present
// in the process environment. `.env.local` takes precedence over `.env`.
const projectRoot = path.resolve(__dirname, '..');

for (const file of ['.env.local', '.env']) {
  const envPath = path.join(projectRoot, file);
  if (fs.existsSync(envPath)) {
    dotenv.config({path: envPath, override: false});
  }
}
