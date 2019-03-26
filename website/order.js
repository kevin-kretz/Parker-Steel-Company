function getBestSolution() {
    let stockLength = document.getElementById("stock-length").value;
    let numberOfPurchaseLines = document.getElementById("number-of-lines").value;

    
};

function showNextForm() {
    let numberOfPurchaseLines = document.getElementById("number-of-lines").value;

    createPurchaseLinesForm(numberOfPurchaseLines);

    document.getElementById("basic-info").style.display = "none";
    document.getElementById("purchase-lines").style.display = "block";

  
};

function createHeader(i) {
    let header = document.createElement('h3');
    let headerText = document.createTextNode(`Line ${i}:`);
    header.appendChild(headerText);

    return header
};

function createLabel(text) {
    let label = document.createElement('label');
    let labelText = document.createTextNode(`${text}: `);
    label.appendChild(labelText);

    return label;
};

function createInput(idText) {
    let inputBox = document.createElement('input');
    inputBox.setAttribute('id', idText);
    inputBox.setAttribute('required', 'true');
    inputBox.setAttribute('type', 'number');

    return inputBox;
};

function createPurchaseLinesForm(numberOfPurchaseLines) {
    let form = document.getElementById('purchase-lines');

    for (let i = numberOfPurchaseLines; i > 0; i--) {
        let div = createPurchaseLineDiv(i);
        form.prepend(div)
    }
}

function createPurchaseLineDiv(i){
    let div = document.createElement('div')

    let header = createHeader(i);
    let lengthLabel = createLabel('Length');
    let lengthInput = createInput(`line-${i}-length`);
    let quantityLabel = createLabel('Quantity');
    let quantityInput = createInput(`line-${i}-quantity`);

    div.appendChild(header);
    div.appendChild(lengthLabel);
    div.appendChild(lengthInput);
    div.appendChild(quantityLabel);
    div.appendChild(quantityInput);

    return div;
}
