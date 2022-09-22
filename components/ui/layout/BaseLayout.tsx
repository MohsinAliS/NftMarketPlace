import React, { Fragment } from "react";

const BaseLayout = (props) => {
  return (
    <Fragment>
      <div className="py-2 px-2 sm:px-10 overflow-hidden min-h-screen">
        <div className="max-width-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};

export default BaseLayout;
