import React from "react";
import { Link } from "umi";
import styles from "./index.less";

export default () => {
  return (
    <div>
      index page
      <div className={styles.button}>
        <Link to={"/user"}>go user page</Link>
      </div>
    </div>
  );
};
