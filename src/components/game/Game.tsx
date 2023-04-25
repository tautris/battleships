import React, { useState, useEffect, useMemo } from "react";
import { Board } from "../board/Board";
import { SwitchScreen } from "../switch-screen/SwitchScreen";
import styles from "./Game.module.scss";

export const Game: React.FC = () => {
  const [player1Ships, setPlayer1Ships] = useState<number[]>([]);
  const [player2Ships, setPlayer2Ships] = useState<number[]>([]);
  const [player1Shots, setPlayer1Shots] = useState<number[]>([]);
  const [player2Shots, setPlayer2Shots] = useState<number[]>([]);
  const [player1Turn, setPlayer1Turn] = useState<boolean>(true);
  const [switchScreen, setSwitchScreen] = useState<boolean>(false);
  const [placementPhase, setPlacementPhase] = useState<boolean>(true);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const ownShots = useMemo(
    () => (player1Turn ? player1Shots : player2Shots),
    [player1Turn, player1Shots, player2Shots]
  );
  const ownShips = useMemo(
    () => (player1Turn ? player1Ships : player2Ships),
    [player1Turn, player1Ships, player2Ships]
  );
  const enemyShips = useMemo(
    () => (player1Turn ? player2Ships : player1Ships),
    [player1Turn, player1Ships, player2Ships]
  );

  useEffect(() => {
    if (placementPhase || gameWon) {
      return;
    }

    const allEnemyShipsHit = enemyShips.every((ship) =>
      ownShots.includes(ship)
    );

    if (allEnemyShipsHit) {
      setGameWon(true);
      setTimeout(() => {
        alert(
          "You have crushed your enemies, saw them driven before you and heard the lamentation of their women"
        );
      }, 100);
    }
  }, [ownShots, enemyShips, placementPhase, gameWon]);

  const handleNextPlayerClick = () => {
    if (placementPhase) {
      console.log("ownShips", ownShips);

      // do validation
      // const validationMessages = validateShipPlacement(ownShips);
      // console.log("validationMessages", validationMessages);
    }

    setSwitchScreen(true);
  };

  const handleChangePlayer = () => {
    if (placementPhase && !player1Turn) {
      setPlacementPhase(false);
    }

    setPlayer1Turn(!player1Turn);
    setSwitchScreen(false);
  };

  const handlePlacement = (index: number) => {
    const existingIndex = ownShips.indexOf(index);
    const setShips = player1Turn ? setPlayer1Ships : setPlayer2Ships;

    setShips(
      existingIndex > -1
        ? ownShips.filter((ship) => ship !== index)
        : [...ownShips, index]
    );
  };

  const handleShot = (index: number) => {
    const setShots = player1Turn ? setPlayer1Shots : setPlayer2Shots;
    const newShots = [...ownShots, index];

    setShots(newShots);
  };

  const handleNewGame = () => {
    setPlacementPhase(true);
    setGameWon(false);
    setPlayer1Ships([]);
    setPlayer2Ships([]);
    setPlayer1Shots([]);
    setPlayer2Shots([]);
  };

  return (
    <section className={styles.container}>
      {switchScreen ? (
        <SwitchScreen
          playerName={player1Turn ? "Player2" : "Player1"}
          onChangePlayer={handleChangePlayer}
        />
      ) : (
        <>
          <h3 className={styles.turn}>
            {player1Turn ? "Player1" : "Player2"} turn
          </h3>
          <Board
            placementPhase={placementPhase}
            own={true}
            ships={ownShips}
            shots={player1Turn ? player2Shots : player1Shots}
            onClick={placementPhase ? handlePlacement : handleShot}
          />
          <Board
            placementPhase={placementPhase}
            own={false}
            ships={enemyShips}
            shots={ownShots}
            onClick={placementPhase ? handlePlacement : handleShot}
          />
          <div className={styles.controls}>
            {gameWon ? (
              <button onClick={handleNewGame}>Another round?</button>
            ) : (
              <button onClick={handleNextPlayerClick}>End turn</button>
            )}
          </div>
        </>
      )}
    </section>
  );
};