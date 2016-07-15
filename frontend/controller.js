testApp.controller('mainController', ['$scope', '$location', '$cookies', '$window', '$http', 'TestService',
    function($scope, $location, $cookies, $window, $http, TestService) {
        $scope.userData = TestService.getUserData();
        $scope.locations=[];
        $scope.ww={};
        $scope.ww.sublocalities={};
        $scope.output={};
        $scope.hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}
        /*ends*/
        localityFinder=function(data){
            _.filter(data.result.address_components,function(location){
                var t = 'none'
                if(location.types.indexOf('sublocality_level_1')!=-1){
                    t = location.long_name
                    if($scope.output[t]!=undefined){
                        $scope.output[t].push(data);
                    }
                    else{
                        $scope.output[t]=[];
                        $scope.output[t].push(data);
                    }
                }
            })
        }
        $scope.selected = undefined;
        $scope.watcher = TestService.data;
        var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
        $scope.states=states;
        $scope.locationDetails = function(){
            alert($scope.locationName)
            TestService.locationDetails($scope.locationName).success(function(response){
            console.log('result',response);
            $scope.locationDetail = response.results[0];
            //$scope.fetchLocalities();
            $scope.fetchSubLocalities2();
            ;
        }).error(function(response){
            console.log('error',response);
        })
        }
        $scope.fetchLocalities = function(){
            TestService.getLocality1($scope.locationDetail.geometry.location.lat,$scope.locationDetail.geometry.location.lng).success(function(response){
                $scope.localities = response.results;
            });
        }
        $scope.fetchSubLocalities = function(lat,lng,placeid){
            TestService.getLocality2(lat,lng).success(function(response){
                $scope.ww.sublocalities[placeid] = response.results;
            });
        }
        $scope.fetchSubLocalities2 = function(){
            TestService.getLocality2($scope.locationDetail.geometry.location.lat,$scope.locationDetail.geometry.location.lng,$scope.radius).success(function(response){
                //$scope.ww.sublocalities[placeid] = response.results;
                $scope.output={};
                debugger;
                _.filter(response.results,function(data){
                    TestService.placeByPlaceId(data.place_id).success(function(response){
                        debugger;
                        localityFinder(response);
                

            }).error(function(response){

            })
                })

            });
        }
        $scope.placeByPlaceId=function(id,isLocality){
            if(id==undefined){
                return
            }
            TestService.placeByPlaceId(id).success(function(response){
                console.log(response);
                debugger;
                $scope.ww[id] = response.result
                if(isLocality==true){
                $scope.fetchSubLocalities(response.result.geometry.location.lat,response.result.geometry.location.lng,id)
                }
                

            }).error(function(response){

            })

        }
        $scope.fetchSuggestions = function(){
            var data = $scope.locationName
            TestService.fetchSuggestions(data).success(function(response){
                debugger
            //console.log('result',response.found);
            var neww =  response.results;
            var dummy = neww.concat($scope.locations)
            var t = [];
            _.filter(neww,function(location){
                t.push(location.formatted_address);
            })
            $scope.locations = t;
            //$("#location-0").focus();
        }).error(function(response){
            debugger
            console.log('error',response);
        })
        }

    }

]);

