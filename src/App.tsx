import React from "react";
import styles from "./App.module.scss";
import { Board } from "./components/board/Board";

export const App: React.FC = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Battleships</h1>
      </header>

      <section className={styles.main}>
        <Board />
      </section>

      <footer className={styles.footer}>
        <a
          href="https://streetartutopia.com/2022/02/28/russian-warship-go-f-k-yourself-graffiti-on-the-main-bridge-of-vilnius-in-lithuania/"
          target="_blank"
          rel="noreferrer"
        >
          Russian warship, go fuck yourself
        </a>
      </footer>
    </main>
  );
};
