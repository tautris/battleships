import React from "react";
import classNames from "classnames";

import styles from "./Cell.module.scss";

interface Props {
  index: number;
  placementPhase: boolean;
  own: boolean;
  placed: boolean;
  shot: boolean;
  onClick: (index: number) => void;
}

export const Cell: React.FC<Props> = ({
  index,
  placementPhase,
  own,
  placed,
  shot,
  onClick,
}) => {
  const handleClick = () => {
    if ((placementPhase && !own) || (!placementPhase && own)) {
      return;
    }

    onClick(index);
  };

  return (
    <button
      className={classNames(
        styles.cell,
        shot && styles.shot,
        ((own && placed) || (!own && placed && shot)) && styles.placed
      )}
      onClick={handleClick}
    />
  );
};
