import React from "react";
// import { db } from "../../util/db";

const SurvivalTable = () => {
return (
    <div className="section-content__narrow survival-table" id="survivalTable">
      <h3>Survival Table</h3>

      {/* <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {db.players.map((data, key) => {
            return (
              <tr>
                <td>{key+1}</td>
                <td>{data.playerID}</td>
                <td>{data.roundOneScore}</td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </div>
  )
}

export default SurvivalTable;