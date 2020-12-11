console.log('injection');

document.addEventListener('yourCustomEvent', function (e)
{
    var url=e.detail;
    console.log("received "+url);
});
