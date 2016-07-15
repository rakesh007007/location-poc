testApp.service('TestService', function($http, $filter,localStorageService, $timeout) {
    var data = { lastUpdated: new Date(), calls: 0 };

            var updateTimer = function () {
                data.lastUpdated = new Date();
                data.calls += 1;
                console.log("updateTimer: " + data.lastUpdated);

                $timeout(updateTimer, 5000);
            };
            updateTimer();
    this.data = data;
    this.filterRawMaterialsByName = function(allRawMaterials) {
        return $filter('orderBy')(allRawMaterials, 'name')
    }
    this.checkLogin=function(data){
        return $http.post('http://localhost:3000/api/users/login',data);
    }
    this.loginTheUser = function(data){
        localStorageService.set("userdata",data);
    }
    this.getUserData = function(){
        return localStorageService.get('userdata');
    }
    this.fetchQuestions = function(){
        return $http.get('http://localhost:3000/api/question');
    }
    this.startTest = function(id){
        return $http.post('http://localhost:3000/api/user/'+id+'/test');
    }
    this.fetchOptions = function(id){
        return $http.get('http://localhost:3000/api/question/'+id+'/option');
    }
    this.submitAns = function(id1,id2,id3,data){
        return $http.post('http://localhost:3000/api/user/'+id1+'/test/'+id2+'/question/'+id3+'/answer',data);
    }
    this.fetchSuggestions = function(name){
        debugger
        return $http.get('http://52.76.74.231:3000/api/suggestion/'+name)
    }
    this.locationDetails = function(name){
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+name+'&key=AIzaSyAtEVuuYnBHGbcZcRVH-gf78foURLpq7jc')
    }
    this.getLocality1 = function(lat,lng){
        url = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location='+lat+','+lng+'&radius=2000&type=sublocality_level_1&key=AIzaSyAtEVuuYnBHGbcZcRVH-gf78foURLpq7jc'
        return $http.get(url)

    }
    this.getLocality2 = function(lat,lng,rd){
        var rd= rd*1000
        url = 'http://52.76.74.231:3000/api/local/'+lat+'/'+lng+'/'+rd
        return $http.get(url)

    }
    this.placeByPlaceId = function(id){
        url = 'http://52.76.74.231:3000/api/place/'+id
        return $http.get(url)
    }


});
