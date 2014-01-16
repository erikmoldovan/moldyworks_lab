/**
 *	Erik Moldovan
 *  
 *  File iterates over an array of positive integers, finds runs of three consecutive numbers
 *  and returns the indices at which those runs began.
 *
 *	I decided to go with pure Javascript
 */

function generateNums(){
	var length = document.generate.length.value;
	var max = document.generate.max.value;

	var nums = [];

	for(i = 0; i < length; i++){
		nums.push(Math.floor(Math.random() * max));
	}

	findRuns(nums);
}

function parseInput(){
	var raw = document.parse.nums.value;
	var nums = raw.split(',');

	for(i = 0; i < nums.length; i++){
		nums[i] = Math.floor(parseInt(nums[i]));
	}

	findRuns(nums);
}

function findRuns(arr){
	// console.log(arr); // For debug purposes
	var pos = [];

	for(i = 0; i < arr.length; i++){
		if(arr[i+1] == arr[i] + 1){
			if(arr[i+2] == arr[i] + 2){
				pos.push(i);
			}
		}

		if(arr[i+1] == arr[i] - 1){
			if(arr[i+2] == arr[i] - 2){
				pos.push(i);
			}
		}
	}

	if(pos.length == 0) pos = 'Nada';
	document.getElementById('results').innerHTML=pos.toString();
}

// Debug/Control data set
window.onload=function(){
	var example = [1,2,3,5,10,9,8,9,10,11,7];
	findRuns(example); // This is the example set given with the problem
}