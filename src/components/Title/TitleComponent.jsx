import React from "react";
import { Helmet } from "react-helmet";

const TitleComponent = ({ title }) => {
  var defaultTitle = "⚛️ COVID-19 REACT APP!";
  return (
    <Helmet>
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  );
};

export { TitleComponent };
