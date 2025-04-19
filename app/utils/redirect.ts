import { SEARCH_PARAMS } from "@/lib/constants/search.constants";

export const redirectDynamicUrls = (
  url: string,
  type: ToasterType,
  message: string
) => {
  return `${url}?${[SEARCH_PARAMS.TOASTER_TYPE]}=${type}&${[
    SEARCH_PARAMS.TOASTER_MSG,
  ]}=${message}`;
};
