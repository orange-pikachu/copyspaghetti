let table = document.getElementById('pastas');
var texts;
function copy(i) {
	var copyTextarea = texts[i];
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = copyTextarea;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function setPastas()
{
	var defaultPastas = JSON.stringify(Object.assign({},new Array(10).fill("Edit me!")));
  chrome.storage.sync.set({"pastas": defaultPastas}, function() {
  console.log('Value is set to ' + defaultPastas);
});
}

chrome.storage.sync.get('pastas', function(result) {
  console.log('Value currently is ' + result.pastas);
  if (result.pastas != null) texts=JSON.parse(result.pastas);
  else {setPastas(); texts=Object.assign({},new Array(10).fill("Edit me!"));}
  for (i = 0; i < 10; i++)
  {
	var row = table.insertRow(i);
	var cell1 = row.insertCell(0);
	if (texts[i] == null) {
	  cell1.innerHTML = "empty";
    }
    else
    {
      var message = document.createTextNode(texts[i]);
      cell1.appendChild(message);
      cell1.setAttribute("contenteditable","true");
      cell1.setAttribute("data-id",i.toString());
      cell1.addEventListener("blur", function() {
      	texts[this.getAttribute("data-id")] = table.rows[this.getAttribute("data-id")].cells[0].textContent;
      	//console.log(table.rows[temp].cells[0].textContent);
      	var coded = JSON.stringify(texts);
    	chrome.storage.sync.set({"pastas": coded}, function() {
  			console.log('Value is set to ' + coded);
		});
  	  });
    }
    var cell2 = row.insertCell(1);
    var copyElement = document.createElement('p');
    var newContent = document.createTextNode("\uD83D\uDCCB");
    copyElement.appendChild(newContent);
    var btnElement = document.createElement('button');
    btnElement.appendChild(copyElement);

    btnElement.setAttribute("data-id",i.toString());
    btnElement.addEventListener('click', function(){
    	copy(parseInt(this.getAttribute("data-id")));
    	console.log(this.getAttribute("data-id"));
	});

    cell2.appendChild(btnElement);
  }
});

/*test.onclick = function(element) {
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode("Hi there and greetings!");
  newDiv.appendChild(newContent);
  const currentDiv = document.getElementById("test");
  document.body.insertBefore(newDiv, currentDiv);
};*/