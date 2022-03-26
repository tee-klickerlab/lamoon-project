// external modules
import React, { Suspense } from "react";

// internal modules
import Loader from "./Loader";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
