<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">
<link rel="stylesheet" type="text/css" href="popup.css">
<title>Whittle</title>

</head>
<body>
<div style="padding: 5px 5px 5px 5px;">
<img src = Logo.png style="float:left">
</div>
</body>
<h2 style="color:#092A44;"><u> Whittle; English to Formalized logic </u></h2> </br>
<form action="" method="post">
<input type ="text" id="inputBox" name="inputBox" placeholder="Please input a natural language statement..." style= "resize: none;hei><input type="submit" value="Submit">
</form>
</body>
</br>
Results:</br>

<?php
// Make the API call and get the results

$ch = curl_init();
$winput = $_POST["inputBox"] . '\nFunction:';
$prompt = 'Statement: Some cats are black.\nFunction: ∃x (Fx ∧ Gx\n Statement: ' . $winput;
curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/engines/davinci/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n  \"prompt\": \"$prompt\" ,\n  \"max_tokens\": 50 , \"stop\": \")\" \n}");

$headers = array();
$headers[] = 'Content-Type: application/json';
$headers[] = 'Authorization: Bearer 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';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);

$ARRAY = json_decode($result,true);
$inputLog= time() . ":" . htmlspecialchars($_SESSION["username"]) . ":" . $_POST["inputBox"] . ":" . $prompt . "\n" . "Result:" . $AR>fwrite($fp, "$inputLog");
echo $ARRAY[choices][0]["text"].")";
?>

</html>