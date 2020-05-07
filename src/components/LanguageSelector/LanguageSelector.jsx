import React from "react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div onChange={changeLanguage} style={{ fontFamily: "sans-serif" }}>
      Language:
      <input type="radio" value="es" name="language" defaultChecked />{" "}
      <Flag code="ES" height="20" />
      <input type="radio" value="en" name="language" />{" "}
      <Flag code="us" height="20" />
    </div>
  );
};

export default LanguageSelector;
