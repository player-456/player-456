import React from "react";
import GamesHeader from "../../components/GamesHeader";
import GameTimer from "../../components/GameTimer";
import SurvivalTable from "../../components/SurvivalTable";

const PlayersPage = () => {
return (
  <main className="wrapper">
    <div className="content-container">
      <GamesHeader />
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