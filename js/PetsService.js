var apiPrefix = "http://localhost:5000/api/";

petsApp
.factory("PetsService", function ($http) {
        var petsService = this;
        petsService.getPet = function(petId) {
            return $http
                .get(apiPrefix + "Pets/" + petId);
        };

        petsService.getPets = function () {
            return $http
                .get(apiPrefix + "Pets");
        };
        petsService.savePet = function (pet) {
            if (pet.id && pet.id !== "") {
                // Update
                return $http.put(apiPrefix + "Pets/" + pet.id, JSON.stringify(pet));
            } else {
                return $http.post(apiPrefix + "Pets", JSON.stringify(pet));
            }
        };
        return petsService;
    });