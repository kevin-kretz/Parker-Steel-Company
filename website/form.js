let lineNumber = 3;

function createLabel(text) {
    const labelText = document.createTextNode(`${text}: `);
    const label = document.createElement('label');
    label.appendChild(labelText);

    return label;
}

function createInput(idText) {
    const inputBox = document.createElement('input');
    inputBox.setAttribute('id', idText);
    inputBox.setAttribute('name', idText);
    inputBox.setAttribute('required', 'true');
    inputBox.setAttribute('type', 'number');

    return inputBox;
}

function createRemoveButton() {
    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', `remove-line-${lineNumber}`);
    removeButton.setAttribute('name', `remove-line-${lineNumber}`);
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('onclick', `removePurchaseLine('line${lineNumber}')`);
    removeButton.setAttribute('tabindex', '-1');
    removeButton.innerHTML = 'Remove';

    return removeButton;
}

function addPurchaseLine() {
    const fieldSet = document.createElement('fieldSet');
    fieldSet.setAttribute('id', `line${lineNumber}`)
    const lengthLabel = createLabel('Length');
    fieldSet.appendChild(lengthLabel);
    const lengthInput = createInput(`line-${lineNumber}-length`);
    fieldSet.appendChild(lengthInput);
    const quantityLabel = createLabel('Quantity');
    fieldSet.appendChild(quantityLabel);
    const quantityInput = createInput(`line-${lineNumber}-quantity`);
    fieldSet.appendChild(quantityInput);
    const removeButton = createRemoveButton();
    fieldSet.appendChild(removeButton);
    const button = document.getElementById("add-purchase-line");
    
    button.before(fieldSet);
    lineNumber ++;
}

function removePurchaseLine(elementID) {
    fieldSet = document.getElementById(elementID).remove();
}
