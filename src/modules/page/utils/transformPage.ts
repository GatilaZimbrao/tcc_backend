import { Page } from "@prisma/client";

export const transformPage = (page: Page): Page => {
  if (page.additionalParams) {
    return {
      ...page,
      additionalParams: JSON.parse(page.additionalParams),
    };
  }
  return page;
};
