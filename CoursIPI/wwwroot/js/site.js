const uri = 'api/BookItems';
let books = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addAuthorTextbox = document.getElementById('add-author');
    const addEditionTextbox = document.getElementById('add-edition');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addEANTextbox = document.getElementById('add-ean');

    const item = {
        read: false,
        name: addNameTextbox.value.trim(),
        author: addAuthorTextbox.value.trim(),
        edition: addEditionTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        ean: addEANTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    document.getElementById('editForm').style.display = 'block';
    const item = books.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-author').value = item.author;
    document.getElementById('edit-edition').value = item.edition;
    document.getElementById('edit-description').value = item.description;
    document.getElementById('edit-ean').value = item.ean;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isRead').read = item.isRead;
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isRead: document.getElementById('edit-isRead').checked,
        name: document.getElementById('edit-name').value.trim(),
        author: document.getElementById('edit-author').value.trim(),
        edition: document.getElementById('edit-edition').value.trim(),
        description: document.getElementById('edit-description').value.trim(),
        ean: document.getElementById('edit-ean').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'livre dans votre liste' : 'livres dans votre liste';

    document.getElementById('counter').innerText = `Vous avez ${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('books');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isReadCheckbox = document.createElement('input');
        isReadCheckbox.type = 'checkbox';
        isReadCheckbox.disabled = true;
        isReadCheckbox.checked = item.isRead;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isReadCheckbox);

        let td2 = tr.insertCell(1);
        td2.innerText = item.name;

        let td3 = tr.insertCell(2);
        td3.innerText = item.author;

        let td4 = tr.insertCell(3);
        td4.innerText = item.edition;

        let td5 = tr.insertCell(4);
        td5.innerText = item.description;

        let td6 = tr.insertCell(5);
        td6.innerText = item.ean;

        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);

        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);
    });

    books = data;
}