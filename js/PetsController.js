var petsApp = angular.module('pan-pets', []);

petsApp.controller('PetsController', function (PetsService) {

    var petsClient = this;

    // In a production scenario, this would be loaded from the api within the
    // PetsService
    petsClient.pet_type_mapping = {
        Dog: 1,
        Cat: 2,
        Bird: 3,
        Pig: 4,
        Fish: 5,
        Horse: 6
    };
    petsClient.pet_list = [];
    petsClient.setClean = function () {
        petsClient.show_add_edit = false;
        petsClient.current_pet = {};
        petsClient.has_error = false;
        petsClient.error_messages = [];
    };

    petsClient.initPetList = function () {
        petsClient.setClean();
        PetsService
            .getPets()
            .then(function (response) {
                petsClient.pet_list = response.data;
            });
    };
    petsClient.initPetList();

    petsClient.editPet = function (petId) {
        petsClient.show_add_edit = false;
        petsClient.setClean();
        PetsService
            .getPet(petId)
            .then(function (response) {
                petsClient.current_pet = response.data;
                petsClient.show_add_edit = true;
            });
    };

    petsClient.addPet = function () {
        petsClient.show_add_edit = true;
        petsClient.current_pet = {};
    };

    petsClient.savePet = function () {
        PetsService
            .savePet(petsClient.current_pet)
            .then(function (response) {
                if (!response.data.isValid) {
                    petsClient.handleError(response.data);
                    return;
                }
                petsClient.current_pet = {};
                petsClient.show_add_edit = false;
                petsClient.initPetList();
            });
    };

    petsClient.handleError = function (validationResult) {
        petsClient.has_error = !validationResult.isValid;
        petsClient.error_messages = validationResult.messages;
    };
});