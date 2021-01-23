chrome.runtime.onInstalled.addListener(function() {
  console.log("installed!");
  var defaultPastas = JSON.stringify(Object.assign({},new Array(10).fill("Edit me!")));
  chrome.storage.sync.set({"pastas": defaultPastas}, function() {
  console.log('Value is set to ' + defaultPastas);
});

});

