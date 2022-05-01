import { createContext, useContext, useState, useEffect } from "react";

const BaseContext = createContext();

export const useBaseContext = () => useContext(BaseContext);

function debounceResize(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const baseStructure = {
  browserWidth: window.innerWidth,
  browserHeight: window.innerHeight - 120,
};

const BaseProvider = ({ children }) => {
  const [baseContext, updateBase] = useState(baseStructure);

  useEffect(() => {
    // handle resize browser
    const debouncedHandleResize = () =>
      debounceResize(
        updateBase((getBaseContext) => ({
          ...getBaseContext,
          browserHeight: window.innerHeight - 120,
          browserWidth: window.innerWidth,
        })),
        600
      );

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const baseStore = {
    ...baseContext,
  };

  return (
    <BaseContext.Provider value={baseStore}>{children}</BaseContext.Provider>
  );
};

export default BaseProvider;
