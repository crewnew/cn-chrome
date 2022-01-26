console.log('hehe')

 setTimeout(()=>{
     console.log('dasd')
 },10000)

 window.addEventListener('popstate', function (event) {
	// Log the state data to the console
	console.log(event.state);
    console.log('dsad')
});

Object.keys(window).forEach(key => {  
    if (/^on/.test(key)) {  
      window.addEventListener(key.slice(2), event => {  
        console.log(event);  
        console.log(click)
      });  
    }  
  });