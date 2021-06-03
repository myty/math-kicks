import React from "react";

const MathFactList: React.FC = ({ children }) => {
    return <ul className="flex flex-wrap">{children}</ul>;
};

export default MathFactList;
