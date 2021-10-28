import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Pages
import GamesPage from "./pages/GamesPage";
import HomePage from "./pages/HomePage";
import GameOne from "./SeasonOne/01.GameOne";
import Players from "./pages/PlayersPage";
import RulesPage from "./pages/RulesPage";
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