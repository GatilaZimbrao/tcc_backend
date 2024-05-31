export const processAdditionalParams = (
  additionalParams: any
): string | null => {
  if (additionalParams) {
    const { imageUrl, minutesLink, cepeLink } = additionalParams;

    const processedParams: { [key: string]: string } = {};

    if (imageUrl) {
      processedParams.imageUrl = imageUrl;
    }
    if (minutesLink) {
      processedParams.minutesLink = minutesLink;
    }
    if (cepeLink) {
      processedParams.cepeLink = cepeLink;
    }

    return JSON.stringify(processedParams);
  }
  return null;
};
