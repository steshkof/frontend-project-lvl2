import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getAbsolutePath = (file) => path.resolve(process.cwd(), file);

export { getAbsolutePath, getFixturePath };
