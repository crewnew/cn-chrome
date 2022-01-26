let url = window.location.href
setInterval(() => {
 if(url !== window.location.href){
     console.log('diff')
     url = window.location.href
 }
},500)