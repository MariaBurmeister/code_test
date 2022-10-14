import {useEffect, useState } from "react";
import {  useSearchParams, URLSearchParamsInit, NavigateOptions, useResolvedPath, useHref, useRoutes, useLocation } from "react-router-dom";

interface DeepLinking<T> {
    deepLink: string;
    searchParams: URLSearchParams;
    parsedSearchParams: T;
    setSearchParams: (nextInit?: T | URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit) | undefined, navigateOpts?: NavigateOptions | undefined) => void;
}

export const useDeepLink = ({initialSearchState} : {initialSearchState:any}): DeepLinking<typeof initialSearchState> => {
  const [searchParams, setSearchParams] = useSearchParams(initialSearchState);
  const {href} = window.location;

  const [parsedSearchParams, setParsedSearchParams] = useState<typeof initialSearchState>(initialSearchState);

    useEffect(() => {
        setSearchParams(searchParams);
    }, []);

    useEffect(() => {
        setParsedSearchParams(parseSearchParams(searchParams))
    }, [searchParams]);


    const parseSearchParams = (searchParams: URLSearchParams) => {
        const parsedSearchParams: typeof initialSearchState = {};
        searchParams.forEach((_, key) => {
            parsedSearchParams[key] = typeof initialSearchState[key] === 'object' ? searchParams.getAll(key) : searchParams.get(key);
        });
    return parsedSearchParams;
  };

  return {deepLink: href,searchParams, parsedSearchParams, setSearchParams };
}