import { clear } from "@testing-library/user-event/dist/clear";
import React, { useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function RandomAnimal() {
  const lifespans = [];
  const names = [];

  const [animals, setAnimal] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useLocalStorage("highScore", 0);

  const checkGreaterTop = () => {
    if (lifespans[0] >= lifespans[1]) {
      win();
    } else {
      lose();
    }
  };

  const checkGreaterBottom = () => {
    if (lifespans[1] >= lifespans[0]) {
      win();
    } else {
      lose();
    }
  };

  const win = () => {
    alert(
      `You Win! ${names[0]}s live to ${lifespans[0]}, ${names[1]}s live to ${lifespans[1]}!`
    );
    setScore(score + 1);
    if (score + 1 > highScore) {
      setHighScore(score + 1);
    }
    fetchAnimals();
  };

  const lose = () => {
    alert(
      `You Lose! ${names[0]}s live to ${lifespans[0]}, ${names[1]}s live to ${lifespans[1]}. Your score was ${score}!`
    );
    setScore(0);
    fetchAnimals();
  };

  const fetchAnimals = useCallback(() => {
    fetch(`https://zoo-animal-api.herokuapp.com/animals/rand/2`)
      .then((response) => response.json())
      .then(setAnimal);
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  animals.map((animal, id) => (lifespans[id] = parseInt(animal.lifespan)));
  animals.map((animal, id) => (names[id] = animal.name));

  const bool = !(score === 0 && highScore !== 0);

  // console.log(lifespan);

  if (animals) {
    return (
      <div className="container-fluid justify-content-center" id="AnimalInfo">
        <div className="row d-flex flex-wrap text-center p-2">
          <div className="col-md-12">
            <h2 className="mx-auto"> Score: {score} </h2>
            <h4 className="mx-auto"> High Score: {highScore}</h4>
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={() => {
                setHighScore(0);
              }}
              disabled={bool}
            >
              Reset High Score
            </button>
          </div>
        </div>

        {animals.map((animal, id) => (
          <div key={id}>
            <div className="row m-2">
              <div className="col-md-12">
                <div className="card ">
                  <h5
                    className="card-header"
                    onClick={id === 0 ? checkGreaterTop : checkGreaterBottom}
                  >
                    {animal.name}
                  </h5>
                  <div className="card-body">
                    <div
                      className="row d-flex flex-wrap align-items-center"
                      id="AnimalInfo"
                    >
                      <div className="col-md-6">
                        <ul className="card-text">
                          <li>Type: {animal.animal_type}</li>
                          <li>Active Time: {animal.active_time}</li>
                          <li>
                            {" "}
                            Length Range: {animal.length_min}-
                            {animal.length_max}
                            feet{" "}
                          </li>
                          <li>
                            Weight Range: {animal.weight_min}-
                            {animal.weight_max}
                            lbs
                          </li>
                          {/* <li>Lifespan: {lifespan[id]} Years</li> */}
                          <li>Habitat: {animal.habitat}</li>
                          <li>Diet: {animal.diet}</li>
                          <li>Geological Range: {animal.geo_range}</li>
                        </ul>
                      </div>
                      <div className="col-md-6" id="AnimalImage">
                        <img
                          alt={animal.name}
                          src={animal.image_link}
                          className="rounded mx-auto d-block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="row"></div>
      </div>
    );
  }
}
