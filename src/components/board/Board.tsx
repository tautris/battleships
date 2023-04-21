import React from "react";
import { Cell } from "../cell/Cell";

import styles from "./Board.module.scss";

export const Board: React.FC = () => {
  return (
    <div className={styles.container}>
      {Array.from(Array(100)).map((_el, index) => (
        <Cell key={index} index={index} />
      ))}
    </div>
  );
};
