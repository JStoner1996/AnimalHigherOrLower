import React, { useCallback, useEffect, useState } from "react";

const lifespans = [];
export const names = [];

export default function RandomAnimal() {
  const [animals, setAnimal] = useState([]);
  const [score, setScore] = useState(0);

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

  // console.log(lifespan);

  if (animals) {
    return (
      <>
        <div class="container-fluid">
          <p>Score: {score}</p>
          {animals.map((animal, id) => (
            <>
              <div class="row">
                <div class="col-md-12"></div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="card">
                    <h5 class="card-header">{animal.name}</h5>
                    <div class="card-body">
                      <ul class="card-text">
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

                <div class="col-md-4">


                <img
                  alt={animal.name}
                  src={animal.image_link}
                  class="rounded align-self-center"
                  />
                  </div>
                <div class="col-md-4">
                  <button
                    type="button"
                    class="btn btn-lg btn-block btn-primary"
                  >
                    Button
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
  }
}
