//@format
//@flow

import React from "react";
import styled from "styled-native-components";

const BackgroundWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const BackgroundOverlay = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: $neutral1;
  opacity: 0.5;
`;

const ContentWrapper = styled.View`
  position: absolute;
  width: 80%;
  background-color: $background0;
  border-radius: 2rem;
  padding: 1.5rem;
`;

const PortalContext = React.createContext();

export const usePortal = () => {
  const context = React.useContext(PortalContext);
  return context;
};

const PortalProvider = ({ children }) => {
  const [components, setComponents] = React.useState([]);

  const value = React.useMemo(
    () => ({
      renderPortal: (Component) => setComponents((b) => [...b, Component]),
      closePortal: () => setComponents((b) => [...b.slice(0, b.length - 1)]),
    }),
    []
  );

  const handleClosePortal = React.useCallback(() => {
    setComponents((b) => [...b.slice(0, b.length - 1)]);
  }, []);

  return (
    <>
      <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
      {components.length
        ? components.map((Component, index) => (
            <BackgroundWrapper key={`Portal${index}`}>
              <BackgroundOverlay onPress={handleClosePortal} />
              <ContentWrapper>{Component}</ContentWrapper>
            </BackgroundWrapper>
          ))
        : null}
    </>
  );
};

export default PortalProvider;
