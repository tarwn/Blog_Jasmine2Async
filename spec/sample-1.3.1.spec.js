
jasmine.Matchers.prototype.toFail = function(){
	return false;
};

describe("sample 1.3.1", function () {

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

		it("will be detected. It uses the runs() and waitsFor latch to wait for the async result", function(){
			var service = new sample.SampleService();

			var done = false;
			runs(function(){
				var promise = service.getStuff(false);
				
				promise.then(function(message){
					expect(message).toBeDefined();
				}, function(error){
					expect("second test received error: " + error).toFail();
				})
				.always(function(){
					done = true;
				});
			});
			
			waitsFor(function(){
				return done;
			});
		});

		var async = new AsyncSpec(this);
		async.it("will be detected. It uses the jasmine.async library to wait for the result", function(done){
			var service = new sample.SampleService();
			
			var promise = service.getStuff(false);
			
			promise.then(function(message){
				expect(message).toBeDefined();
			}, function(error){
				expect("first test received error: " + error).toFail();
			})
			.always(done);
		});
	});
	
});