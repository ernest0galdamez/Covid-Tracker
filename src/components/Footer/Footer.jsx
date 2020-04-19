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
