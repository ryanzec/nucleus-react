export default function removeExtension(fileName) {
  if (!fileName) {
    return fileName;
  }

  return fileName.replace(/\.[^/.]+$/, '');
}
