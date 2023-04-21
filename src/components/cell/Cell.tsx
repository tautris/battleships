import React from "react";
import classNames from "classnames";

import styles from "./Cell.module.scss";

interface Props {
  index: number;
}

export const Cell: React.FC<Props> = ({ index }) => {
  const [shot, setShot] = React.useState(false);

  const handleClick = () => {
    console.log("clicked on", index);

    setShot(true);
  };

  return (
    <div
      className={classNames(styles.cell, shot && styles.shot)}
      onClick={handleClick}
    />
  );
};
