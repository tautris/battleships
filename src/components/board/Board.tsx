import React from "react";
import { Cell } from "../cell/Cell";

import styles from "./Board.module.scss";

interface Props {
  placementPhase: boolean;
  own: boolean;
  ships: number[];
  shots: number[];
  onClick: (index: number) => void;
}

export const Board: React.FC<Props> = ({
  placementPhase,
  own,
  ships,
  shots,
  onClick,
}) => {
  return (
    <div>
      <h5 className={styles.name}>{own ? "Yer dudes" : "Baddies"}</h5>
      <div className={styles.container}>
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
