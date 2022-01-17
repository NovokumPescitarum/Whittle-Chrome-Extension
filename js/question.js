document.addEventListener('DOMContentLoaded', documentEvents  , false);


function myAction(input, prompt) {
var url = "https://api.openai.com/v1/engines/davinci/completions";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer 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");

xhr.onreadystatechange = function () {
   var data= xhr.responseText;
   var jsonResponse = JSON.parse(data);
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(jsonResponse.choices[0].text);
	var inputBox = jsonResponse.choices[0].text;
	var entry = document.createElement('P');
    entry.appendChild(document.createTextNode(inputBox));
	var list = document.getElementById('resultArray');
    list.appendChild(entry);
   }};
xhr.send(JSON.stringify({ "prompt": "This is a list of 7 questions I will ask a professional on the topic of " + Topic.value + "\n\n7.)" + Citation1.value + "\n\n6.)", "stop":"1." , "max_tokens": 150 }));

};





function documentEvents() {    
document.getElementById('ok_btn').addEventListener('click', function() { myAction(document.getElementById('Topic'));});

}
