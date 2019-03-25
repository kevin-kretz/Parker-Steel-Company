function createPurchaseLinesForm() {
  document.getElementById("basic-info").style.display = "none";
  document.getElementById("purchase-lines").style.display = "block";

  let stockLength = document.getElementById("stock-length").value;
  let numberOfPurchaseLines = document.getElementById("number-of-lines").value;

  let form = document.getElementById('purchase-lines');

  for (let i = 0; i < numberOfPurchaseLines; i++) {
    let label = document.createElement('label');
    let labelText = document.createTextNode(`Line ${i+1}:`);
    label.appendChild(labelText);

    let inputBox = document.createElement('input');
    
    form.append(label);
    form.append(inputBox);
  }

  let button = document.createElement('button');
  let buttonText = document.createTextNode('Previous');
  button.appendChild(buttonText);
  form.append(button);

  button = document.createElement('button');
  button.setAttribute('onclick', 'getBestCombination()');
  buttonText = document.createTextNode('Calculate');
  button.appendChild(buttonText);
  form.append(button);
};
