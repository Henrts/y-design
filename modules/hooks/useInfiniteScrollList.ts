import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

interface IOptions {
  dependencies?: unknown[];
  initialLimit?: number;
  intersectionOptions?: IntersectionObserverInit;
  limit?: number;
  wrappedRef?: boolean;
}

function useInfiniteScrollList(initialList: JSX.Element[], options?: IOptions) {
  const {
    dependencies = [],
    initialLimit = 10,
    intersectionOptions,
    limit = 10,
    wrappedRef = false
  } = useMemo(() => options ?? {}, [options]);
  const [fullList, setFullList] = useState(initialList);

  useEffect(() => {
    if (!initialList.length && !fullList.length) {
      return;
    }

    setFullList(initialList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialList]);

  const [list, setList] = useState(fullList.slice(0, initialLimit));
  useEffect(() => {
    setList(fullList.slice(0, initialLimit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullList, ...dependencies]);

  const ref = useRef<HTMLElement>();

  const incrementList = useCallback(() => {
    if (list.length === fullList.length) {
      return;
    }
    const newList = fullList.slice(0, list.length + limit);
    setList(newList);
  }, [list, fullList, limit]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries.pop();
      if (entry?.isIntersecting) {
        incrementList();
      }
    },
    [incrementList]
  );

  useIntersectionObserver(callback, ref.current, intersectionOptions);

  const memoList = useMemo(
    () =>
      list.map((item, index) => {
        if (index === list.length - 1 && list.length !== fullList.length) {
          const props = wrappedRef ? { wrappedRef: ref } : { ref };
          return React.cloneElement(item, props);
        }
        return item;
      }),
    [list, fullList, wrappedRef]
  );
  return memoList;
}

export default useInfiniteScrollList;
