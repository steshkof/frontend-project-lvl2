import path from 'path';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
export default getAbsolutePath;
