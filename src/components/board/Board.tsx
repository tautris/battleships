import React from "react";
import classNames from "classnames";

import { Cell } from "@/components/cell/Cell";

import styles from "./Board.module.scss";

interface Props {
  placementPhase: boolean;
  own: boolean;
  ships: number[];
  shots: number[];
  shotTaken?: boolean;
  onClick: (index: number) => void;
}

export const Board: React.FC<Props> = ({
  placementPhase,
  own,
  ships,
  shots,
  shotTaken,
  onClick,
}) => {
  return (
    <div>
      <h5 className={styles.name}>{own ? "Yer dudes" : "Baddies"}</h5>
      <div
        className={classNames(styles.container, shotTaken && styles.unallowed)}
      >
        {Array.from(Array(100)).map((_el, index) => (
          <Cell
            key={index}
            index={index}
            placementPhase={placementPhase}
            own={own}
            placed={ships.includes(index)}
            shot={shots.includes(index)}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};
