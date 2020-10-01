var app = angular.module('AngularApp', []);

app.controller('mainController', function ($http) {
    var vm = this;
    this.semesters = ['Primer Semestre', 'Segundo Semestre']
    this.semester = this.semesters[0]

   
    this.getGroup = function () {
        vm.groupStudents=[]
        $http({
            method: 'GET',
            url: 'http://54.237.12.119:3000/group?group=' + this.group
        }).then(function successCallback(response) {
            vm.groupStudents = response.data
            vm.restartVariables()
            console.log(response.data)
        }, function errorCallback(error) {
            alert(error)
        });
    }

    this.getStudent = function () {
        $http({
            method: 'GET',
            url: `http://54.237.12.119:3000/student?carne=${this.carne}&year=${this.year}&semester=${this.semester}`
        }).then(function successCallback(response) {
            vm.studentsList = response.data            
            vm.restartVariables()
            console.log(response.data)
        }, function errorCallback(error) {
            alert(error)
        });
    }

    this.insertStudent = function () {
        let data = {
            name: this.name,
            carne: this.carne,
            dpi: this.dpi,
            email: this.email,
            semester: this.semester,
            year: this.year,
            group: this.group
        }
        $http({
            method: 'POST',
            url: `http://54.237.12.119:3000/create`,
            data: data
        }).then(function successCallback(response) {
            console.log(response.data)
            alert('Estudiante asignado exitosamente a su privado')
            vm.restartVariables()
        }, function errorCallback(error) {
            alert(error)
        });
    }

    this.restartVariables = function(){
        this.name = null,
        this.carne = null,
        this.dpi = null,
        this.email = null,
        this.semester = this.semesters[0],
        this.year = null,
        this.group = null
    }
})


//$http.post('/someUrl', data, config).then(successCallback, errorCallback);