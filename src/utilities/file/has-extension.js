export default function hasExtension(fileName, validExtensions) {
  //NOTE: Windows systems does not populate the mime type for file inputs so can only check like this, backend needs to do deeper check for safety
  const fileNameParts = fileName.split('.');
  const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

  return validExtensions.filter((validExtension) => validExtension.toLowerCase() === fileExtension).length > 0;
}
