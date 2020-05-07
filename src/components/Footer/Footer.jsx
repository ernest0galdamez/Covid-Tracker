import React, { Component } from "react";
import style from "./Footer.module.css";
import Flag from "react-world-flags";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";

class Footer extends Component {
  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <a
            className={style.bmcButton}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.buymeacoffee.com/ernest0galdamez"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            />
            <span>Buy me a coffee</span>
          </a>
          {"\n"} {"\n"}
          <span className={style.text}>
            Made with <FavoriteIcon style={{ color: red[500] }} /> from
          </span>
          <span className={style.spacer}>
            <span>
              {"\n"} <Flag code="SV" height="40" />
            </span>
            {"\n"}
            &copy; All rights reserved 2020
            {"\n"} ErnestoGaldamez
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
