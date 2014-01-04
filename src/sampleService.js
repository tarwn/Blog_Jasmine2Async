
var sample = sample || {};

sample.SampleService = (function(){

	function SampleService(){
		
	}

	SampleService.prototype.getStuff = function(expectSuccess){
		if(expectSuccess !== false) expectSuccess = true;
		
		var promise = pinkySwear();
		setTimeout(function(){
			if(expectSuccess){
				promise(true, ["some argument"]);
			}
			else{
				promise(false, ["THIS IS THE ERROR MESSAGE"]);
			}			
		}, 1);
		return promise;
	};
	
	return SampleService;
})();