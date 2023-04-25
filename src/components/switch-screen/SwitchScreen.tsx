import React from "react";

import styles from "./SwitchScreen.module.scss";

interface Props {
  playerName: string;
  onChangePlayer: () => void;
}

export const SwitchScreen: React.FC<Props> = ({
  playerName,
  onChangePlayer,
}) => {
  return (
    <div className={styles.container}>
      <h3>{playerName}, are ye ready?</h3>
      <button onClick={onChangePlayer}>Yarp</button>
    </div>
  );
};
