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
    entry.appendChild(document.createTextNode("   " + inputBox));
	var list = document.getElementById('resultArray');
    list.appendChild(entry);
   }};
xhr.send(JSON.stringify({ "prompt": "This is a short maximum 200 word summary of the abstract of the following papers:\n\n1.) Xu, Hanyi, Laurent Bègue, and Rébecca Shankland. \"Guilt and guiltlessness: an integrative review.\" Social and Personality Psychology Compass 5, no. 7 (2011): 440-457.\nAbstract Summary:\n{The paper talks about guilt: individual and collective. Individual guilt motivates prosocial behaviour while collective guilt refers to acceptance and taking responsibility for one's group misdeeds. Feeling of guilt is painful thus, people sometimes try to avoid feeling guilty, namely, they feel guiltlessness. They are many strategies to feel guiltless. But guiltlessness is destrictive and detrimental. Reciprocity morality, ostracism, deservingness, empathy, and self-control are proposed as means of explaining the origins of guilt and their implications for guiltlessness.}\n\n2.)" + input.value + "\nAbstract Summary:\n{" , "stop":"}" , "max_tokens": 150 , "top_p": 1.0 , "frequency_penalty": 0.2 , "presence_penalty": 0.0 }));

};





function documentEvents() {    
document.getElementById('ok_btn').addEventListener('click', function() { myAction(document.getElementById('inputBox'));});
}