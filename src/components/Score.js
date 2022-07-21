import React from "react";
import RandomAnimal from "./RandomAnimal";

export const Score = () => {
  console.log(RandomAnimal.score);
  return (
    <>
      <h2 className="mx-auto text-center"> Score: {RandomAnimal.Score} </h2>

      <h4 className="mx-auto text-center">
        {" "}
        High Score: {RandomAnimal.setHighScore}
      </h4>

      <button
        onClick={() => {
          RandomAnimal.setHighScore(0);
        }}
      >
        Reset High Score
      </button>
    </>
  );
};
