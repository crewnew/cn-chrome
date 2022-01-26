console.log('hehe')

 setTimeout(()=>{
     console.log('dasd')
 },10000)

 window.addEventListener('popstate', function (event) {
	// Log the state data to the console
	console.log(event.state);
    console.log('dsad')
});