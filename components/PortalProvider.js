//@format
//@flow

import React from "react";

const PortalContext = React.createContext();

export const usePortal = () => {
  const context = React.useContext(PortalContext);
  return context;
};

const PortalProvider = ({ children }) => {
  const [state, setState] = React.useState({ Component: null });

  const value = React.useMemo(
    () => ({
      renderPortal: (Component) => setState({ Component }),
      closePortal: () => setState({ Component: null }),
    }),
    []
  );

  return (
    <>
      <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
      {state.Component || null}
    </>
  );
};

export default PortalProvider;
