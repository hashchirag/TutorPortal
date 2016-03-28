'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('DetailsCtrl', function ($scope,$location,$route) {

 	$scope.addCheckbox = function(text,exam){
 		var container = $('#cb');
 		var inputs = container.find('input');
 		var id = inputs.length+1;

 		$('<input />', { type: 'checkbox', id: 'cb'+id, value: text, name : exam }).appendTo(container);
 		$('<label />', { 'for': 'cb'+id, text: text}).appendTo(container);
 	}

 	$scope.addOptionToDropDown = function(parent,text){
 		var x = document.getElementById(parent);
 		var option = document.createElement("option");
 		option.text = text;
 		x.add(option);
 	}

 	$scope.array1= ["first","second"];
 	$scope.graduationYears= ["1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"];


 	//POPULATING EXAM GROUPS CHECK BOXES

 	for(var i =0 ; i < $scope.array1.length ; i ++ ){
 		$scope.addCheckbox($scope.array1[i],"exam");
 	}


 	//POPULATING COLLEGE DROP DOWN

 	for(var i =0 ; i < $scope.array1.length ; i ++ ){
 		$scope.addOptionToDropDown("college", ($scope.array1[i]));
 	}

 	//POPULATING DEGREE DROP DOWN

 	for(var i =0 ; i < $scope.array1.length ; i ++ ){
 		$scope.addOptionToDropDown("degree", ($scope.array1[i]));
 	}

 	//POPULATING GRADUATION YEAR DROP DOWN

 	for(var i =0 ; i < $scope.graduationYears.length ; i ++ ){
 		$scope.addOptionToDropDown("year", ($scope.graduationYears[i]));
 	}




//FORM SUBMIT BUTTON
$("#submit").click(function(){

	var canSubmit=true;

	var selectedExamGroups = $scope.getListOfExamGroups();
	var selectedCollege = $scope.getCollegeName();
	var selectedDegree = $scope.getDegreeName();
	var selectedGraduationYear = $scope.getGraduationYear();

	// Validating Phone number and Email id
	if(!$scope.checkNumberField() || !$scope.checkEmailField()){
		canSubmit=false;		
	}

	if(selectedExamGroups.length == 0){
		alert('Choose atleast one exam');
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

	// if(selected.length == 0){
	// 	alert("Choose atleast one exam group");
	// 	return null;
	// }
	// else{

		return selected;
	}




});
