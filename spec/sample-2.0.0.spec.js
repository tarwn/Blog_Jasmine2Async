

describe("sample 2.0.0", function () {

		
	beforeEach(function(){
		jasmine.addMatchers({
			toFail: function(){
					return {
						compare: function(a){ return { pass: false, message: "Forced failure: " + a}; },
					};
				}
		});
	});

	describe("broken asynchronous calls", function(){

		it("won't be detected. It's executed without waiting for the asynchronous result", function(){
			var service = new sample.SampleService();
			
			var promise = service.getStuff(false);
			
			promise.then(function(message){
				expect(message).toBeDefined();
			}, function(error){
				expect("first test received error: " + error).toFail();
			});
		});

		it("will be detected. It uses the new jasmine async syntax", function(done){
			var service = new sample.SampleService();
			
			var promise = service.getStuff(false);
			
			promise.then(function(message){
				expect(message).toBeDefined();
			}, function(error){
			console.log(expect());
				expect("second test received error: " + error).toFail();
			})
			.always(done);
		});
	});
	
});	