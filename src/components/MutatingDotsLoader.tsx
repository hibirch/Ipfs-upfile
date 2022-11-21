import React from "react";
import { MutatingDots } from "react-loader-spinner";

const MutatingDotsLoader = () => {
  return (
    <div className="loader">
      <MutatingDots
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default MutatingDotsLoader;
