function postToServer() {

  let req = new XMLHttpRequest();
  req.open('POST', 'http://localhost:8088/');
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      console.log('State: ' + req.readyState);
      if (req.status === 200) {
        let resJson = JSON.parse(req.responseText);
        console.log('what am i getting back? ', resJson);
        //document.getElementById("response").innerHTML = resJson.message + ", " + resJson.occupation;
      } else { // handle request failure
        //document.getElementById("response").innerHTML = "Error retrieving response from server";
      }
    }
  }
  req.send('{ \"\" : \"' + name + '\", \"occupation\" : \"' + occ + '\" }');
  return req;
}

function add() {
  const currCalcValue = document.getElementById('current-value').innerHTML;
  console.log('curr value:', typeof currCalcValue);
  const input = document.getElementById('input').value;
  console.log('input value: ', typeof input);
  let req = new XMLHttpRequest();
  req.open('POST', 'http://localhost:8088/add');
  req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      console.log('State: ' + req.readyState);
      if (req.status === 200) {
        let resJson = JSON.parse(req.responseText);
        console.log('what am i getting back? ', resJson);
        document.getElementById("current-value").innerHTML = resJson.value;
      } else { // handle request failure
        //document.getElementById("response").innerHTML = "Error retrieving response from server";
      }
    }
  }
  const obj = { num1: currCalcValue, num2: input };
  req.send(JSON.stringify(obj));
  return req;
}