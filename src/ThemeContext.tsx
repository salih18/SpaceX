import React, { useState, useContext } from "react";

interface IState {
  launches: {
    id: string;
    mission_name: string;
    launch_date_local: string;
    launch_success: boolean;
    details: string;
    links: {
      article_link: string;
      flickr_images: string[];
    }[];
  }[];
}

const LaunchesContext = React.createContext({});
const LaunchesUpdateContext = React.createContext<any>([{}, () => null]);

export function useLaunchesUpdate() {
  return useContext(LaunchesUpdateContext);
}

export function useLaunches() {
  return useContext(LaunchesContext);
}

export function ThemeProvider({ children }: any) {
  const [selectedLaunches, setSelectedLaunches] = useState<IState["launches"]>(
    []
  );
  function updateLaunches(val: any) {
    setSelectedLaunches(val);
  }

  return (
    <LaunchesContext.Provider value={selectedLaunches}>
      <LaunchesUpdateContext.Provider value={updateLaunches}>
        {children}
      </LaunchesUpdateContext.Provider>
    </LaunchesContext.Provider>
  );
}
