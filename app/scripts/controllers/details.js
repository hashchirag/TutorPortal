'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('DetailsCtrl', function ($scope,$location,$route,$http) {


 	// See if logged into fb .If not, redirect to FB Login Page

 	if(typeof(Storage) !== "undefined") {
 		var isLoggedIn = sessionStorage.getItem("loggedIntoFB");
 		console.log(isLoggedIn);

 		if(isLoggedIn === null){
 			$location.path('/');
 			$route.reload();
 		}
 	}
 	else {
 		alert("Use an updated version of the browser to proceed");
 	}


 	$scope.listOfColleges = [];
 	$scope.listOfDegrees = [];
 	$scope.listOfExams = [];


	//HIDE
	$('#studentPics').hide();
	$('#graduatePics').hide();
	$('#customCollege').hide();
	$('#customDegree').hide();


 	//GETTING LIST OF COLLEGES
 	$http({
 		method: 'GET',
 		url: 'http://staging-now.hashlearn.com/api/users/collegeList'
 	}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var jsonString = JSON.stringify(response);

    var obj = JSON.parse(jsonString);
    var objData = obj.data;

    for (var i=0; i<objData.length; i++){;
    	$scope.listOfColleges[objData[i].name] = objData[i].id;
    }

    console.log($scope.listOfColleges);

     	//POPULATING COLLEGE DROP DOWN
     	$scope.addOptionToDropDown("college", "Other");

     	for(var nameOfCollege in $scope.listOfColleges){
     		$scope.addOptionToDropDown("college", nameOfCollege);
     	}
     }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("An error has occured. Please contact HashLearn Now");
});

 	//GETTING LIST OF EXAMS
 	$http({
 		method: 'GET',
 		url: 'http://staging-now.hashlearn.com/api/exams'
 	}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var jsonString = JSON.stringify(response);

    var obj = JSON.parse(jsonString);
    var objData = obj.data;

    for (var i=0; i<objData.length; i++){;
    	$scope.listOfExams[objData[i].name] = objData[i].id;
    }

    console.log($scope.listOfExams);

     	//POPULATING COLLEGE DROP DOWN

     	for(var nameOfCollege in $scope.listOfExams){
     		$scope.addCheckbox('#examGroups', nameOfCollege, "exam");
     	}
     }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("An error has occured. Please contact HashLearn Now");
});

 	//GETTING LIST OF DEGREES
 	$http({
 		method: 'GET',
 		url: 'http://staging-now.hashlearn.com/api/users/degreeList'
 	}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var jsonString = JSON.stringify(response);

    var obj = JSON.parse(jsonString);
    var objData = obj.data;

    for (var i=0; i<objData.length; i++){;
    	$scope.listOfDegrees[objData[i].name] = objData[i].id;
    }

    	//POPULATING COLLEGE DROP DOWN
    	$scope.addOptionToDropDown("degree", "Other");

    	for(var nameOfDegree in $scope.listOfDegrees){
    		$scope.addOptionToDropDown("degree", nameOfDegree);
    	}
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("An error has occured. Please contact HashLearn Now");
});

	// HELPER FUNCTIONS
	$scope.addCheckbox = function(container,text,name){
		var container = $(container);
		var inputs = container.find('input');
		var id = inputs.length+1;

		$('<input />', { type: 'checkbox', id: 'cb'+id, value: text, name : name ,class : 'material_checkbox'}).appendTo(container);
		$('<label />', { 'for': 'cb'+id, text: text}).appendTo(container);
	}

	$scope.addOptionToDropDown = function(parent,text){
		var x = document.getElementById(parent);
		var option = document.createElement("option");
		option.text = text;
		x.add(option);
	}
	//END OF HELPER FUNCTIONS


	$scope.array1= ["first","second","asd","first","second","asd"];
	$scope.graduationYears= ["1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"];


 	//POPULATING EXAM GROUPS CHECK BOXES

 	// for(var i =0 ; i < $scope.array1.length ; i ++ ){
 	// 	$scope.addCheckbox('#examGroups',$scope.array1[i],"exam");
 	// }

 	//POPULATING GRADUATION YEAR DROP DOWN

 	for(var i =0 ; i < $scope.graduationYears.length ; i ++ ){
 		$scope.addOptionToDropDown("year", ($scope.graduationYears[i]));
 	}

 	//POPULATING LANGUAGE CHECK BOXES
 	for(var i =0 ; i < $scope.array1.length ; i ++ ){
 		$scope.addCheckbox('#languages',$scope.array1[i],"language");
 	}

 	// HIDE AND DISPLAY PICTURE UPLOADING SECTIONS
 	$('#mForm input').on('change', function() {
 		if (($('input[name="studentOrGraduate"]:checked', '#mForm').val()) == 'student')
 		{
 			$('#graduatePics').hide();
 			$('#studentPics').show();
 		}
 		else{
 			$('#studentPics').hide();
 			$('#graduatePics').show();
 		}
 	});


//FORM SUBMIT BUTTON
$("#submit").click(function(){

	var canSubmit=true;

	var selectedExamGroups = $scope.getListOfExamGroups();
	console.log(selectedExamGroups);

	var selectedLangs = $scope.getListOfLanguages();
	console.log(selectedLangs);

	var selectedCollege = $scope.listOfColleges[$scope.getCollegeName()];
	console.log(selectedCollege);

	var selectedDegree = $scope.listOfDegrees[$scope.getDegreeName()];
	console.log(selectedDegree);


	var selectedGraduationYear = $scope.getGraduationYear();

	// Validating Phone number and Email id
	if(!$scope.checkNumberField() || !$scope.checkEmailField()){
		canSubmit=false;		
	}

	if(selectedExamGroups.length == 0){
		alert('Choose atleast one exam');
		canSubmit = false;
	}

	if(selectedLangs.length == 0){
		alert('Choose atleast one language');
		canSubmit = false;
	}

	if(selectedCollege ==''){
		canSubmit=false;
		alert('Please select your college');
	}

	if(selectedDegree ==''){
		canSubmit=false;
		alert('Please select your Degree');
	}

	if(selectedGraduationYear ==''){
		canSubmit=false;
		alert('Please select your Graduation Year');
	}

	//SUBMITTING THE FORM
	if(canSubmit){
		alert("SUBMITTED");
	}



}); 

$scope.checkNumberField = function(){
	var phone = $('#phone').val(),
	intRegex = /[0-9 -()+]+$/;
	if((phone.length != 10) || (!intRegex.test(phone)))
	{
		alert('Please enter a valid phone number.');
		return false;
	}
	return true;

}

$scope.getCollegeName = function(){
	return $('#college :selected').text();
}

$scope.getDegreeName = function(){
	return $('#degree :selected').text();
}

$scope.getGraduationYear = function(){
	return $('#year :selected').text();
}

$scope.checkEmailField = function(){
	var email = $('#email').val();

	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(!regex.test(email) || email == '')
	{
		alert('Please enter a valid email address.');
		return false;
	}
	return true;

}

$scope.getListOfExamGroups = function(){
	var selected = [];
	$("input[name='exam']:checked").each(function() {
		selected.push($(this).val());
	});

	return selected;
}

$scope.getListOfLanguages = function(){
	var selectedLangs = [];
	$("input[name='language']:checked").each(function() {
		selectedLangs.push($(this).val());
	});

	return selectedLangs;
}


$("#college").change(function (){
	if(($(this).val() == 'Other')){
		$('#customCollege').show();
	}
	else{
		$('#customCollege').hide();
	}
});

$("#degree").change(function (){
	if(($(this).val() == 'Other')){
		$('#customDegree').show();
	}
	else{
		$('#customDegree').hide();
	}
});

});
