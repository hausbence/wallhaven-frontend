import React from "react";
import ResolutionDropdown from "./ResolutionDropdown";
import ColorDropdown from "./ColorDropdown";

const Settingbar = () => {
    return (
        <div>
            <ResolutionDropdown />
            <ColorDropdown />
        </div>
    );
};

export default Settingbar;
