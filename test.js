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
        </div>
      </>
    ))}
    <div class="col-md-4">
      <button type="button" class="btn btn-lg btn-block btn-primary">
        Button
      </button>
    </div>
    <div class="col-md-4">
      <button type="button" class="btn btn-lg btn-block btn-primary">
        Button
      </button>
    </div>
  </div>
</>;
