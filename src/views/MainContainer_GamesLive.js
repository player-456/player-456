import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";

// Pages
import GamesPage from "./pages/Games/GamesPage";
import HomePage from "./pages/Home/HomePage";
import GameOne from "./pages/SeasonOne/01.GameOne";
import Players from "./pages/Players/PlayersPage";
import RulesPage from "./pages/Rules/RulesPage";
import { PlayerProvider } from "../util/PlayerContext";


const MainContainer = () => {

  // Return the UI
  return (
      <PlayerProvider>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/games" exact>
            <GamesPage />
          </Route>

          <Route path="/gameOne" exact>
            <GameOne />
          </Route>

          <Route path="/players" exact>
            <Players />
          </Route>

          <Route path="/rules" exact>
            <RulesPage />
          </Route>
        </Switch>
      </PlayerProvider>
    )
  }

export default MainContainer;