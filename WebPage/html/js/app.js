var app = angular.module('AngularApp', []);

app.controller('mainController', function ($http) {
    var vm = this;

    this.name = null;
    this.carne = null;
    this.studentsList = []

    this.getStudents = function () {
        $http({
            method: 'GET',
            url: `http://localhost:3000/estudiantes`
        }).then(function successCallback(response) {
            vm.studentsList = response.data.data
            vm.name = null
            vm.carne = null
            console.log(response)
        }, function errorCallback(error) {
            alert(error)
        });
    }

    this.insertStudent = function () {
        let data = {
            nombre: this.name,
            carnet: this.carne
        }
        $http({
            method: 'POST',
            url: `http://localhost:3000/estudiantes`,
            data: data
        }).then(function successCallback(response) {
            alert('Estudiante asignado exitosamente')            
        }, function errorCallback(error) {
            alert(error)
        });
    }

    this.restartVariables = function () {
        this.name = null,
            this.carne = null
    }
})


//$http.post('/someUrl', data, config).then(successCallback, errorCallback);