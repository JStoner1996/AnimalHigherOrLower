import React, { useCallback, useEffect, useState } from "react";

const lifespans = [];
export const names = [];

export default function RandomAnimal() {
  const [animals, setAnimal] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

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
    if (score > highScore) {
      setHighScore(score);
    }
    fetchAnimals();
  };

  const lose = () => {
    alert(
      `You Lose! ${names[0]}s live to ${lifespans[0]}, ${names[1]}s live to ${lifespans[1]}. Your score was ${score}!`
    );

    setScore(0);
    if (score > highScore) {
      setHighScore(score);
    }
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

  // console.log(lifespan);

  if (animals) {
    return (
      <div className="container-fluid">
        <p>
          Score: {score} High Score: {highScore}
        </p>
        {animals.map((animal, id) => (
          <div key={id}>
            <div className="row m-2">
              <div className="col-md-6">
                <div className="card">
                  <h5 className="card-header">{animal.name}</h5>
                  <div className="card-body">
                    <ul className="card-text">
                      <li>Type: {animal.animal_type}</li>
                      <li>Active Time: {animal.active_time}</li>
                      <li>
                        {" "}
                        Length Range: {animal.length_min}-{animal.length_max}
                        feet{" "}
                      </li>
                      <li>
                        Weight Range: {animal.weight_min}-{animal.weight_max}
                        lbs
                      </li>
                      {/* <li>Lifespan: {lifespan[id]} Years</li> */}
                      <li>Habitat: {animal.habitat}</li>
                      <li>Diet: {animal.diet}</li>
                      <li>Geological Range: {animal.geo_range}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  alt={animal.name}
                  src={animal.image_link}
                  className="rounded mx-auto"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-success btn-lg btn-block m-2"
              onClick={checkGreaterTop}
            >
              Top
            </button>

            <button
              type="button"
              className="btn btn-success btn-lg btn-block m-2"
              onClick={checkGreaterBottom}
            >
              Bottom
            </button>
          </div>
        </div>
      </div>
    );
  }
}
