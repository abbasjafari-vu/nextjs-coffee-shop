import useSWR from "swr";

/**
 * Fetcher function for the SWR hook.
 * Fetches data from the passed api server.
 * @param {string} uri
 * @returns {items:Object[], isLoading:boolean, isError:string | null}
 */
const fetcher = async (uri: string) => {
  const response = await fetch(uri);
  const responseData = await response.json();
  if (!response.ok) {
    // Make SWR catch the failed response.
    throw new Error(responseData.message);
  }
  return responseData;
};

type revalidateOptions = {
  revalidateOnFocus: boolean;
  revalidateIfStale: boolean;
  revalidateOnReconnect: boolean;
};

const FetchItems = <T>(uri: string, arr: T[], options: revalidateOptions) => {
  const { data, error } = useSWR<T[], Error>(uri, fetcher, options);

  arr = data ? data : arr;

  return {
    items: arr,
    isLoading: !error && !data, // There is no error and data is still being fetched.
    isError: error,
  };
};

export default FetchItems;
