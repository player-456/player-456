import React from "react";
import Header from "../blocks/GamesHeader";
import GameTimer from "../blocks/GameTimer";
import SurvivalTable from "../blocks/SurvivalTable";

const PlayersPage = () => {
return (
  <main className="wrapper">
    <div className="content-container">
      <Header />
      <header className="section-header">
        <h1>
          Players
        </h1>

        <GameTimer parent="players" />

        <SurvivalTable />

      </header>
    </div>
  </main>
  )
}

export default PlayersPage;