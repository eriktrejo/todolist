document.addEventListener('DOMContentLoaded', () => {
    const newItemButton = document.getElementById('new-item');
    const clearListButton = document.getElementById('clear-list');

    newItemButton.addEventListener('click', newItem);
    clearListButton.addEventListener('click', clearList);
});

function newItem() {
    const list = document.getElementById('list');
    
    if (list.querySelector('.placeholder')) {
        const placeholder = list.querySelector('.placeholder');
        list.removeChild(placeholder);
    }

    list.appendChild(createListItemElement());
}

function createListItemElement() {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status');
    const statusIcon = document.createElement('div');
    statusIcon.classList.add('icon', 'ms-Icon', 'ms-Icon--Checkbox');
    statusIcon.addEventListener('click', onClick);
    statusContainer.appendChild(statusIcon);
    listItem.appendChild(statusContainer);

    const textArea = document.createElement('textarea');
    textArea.addEventListener('input', onInput);
    listItem.appendChild(textArea);

    const deleteContainer = document.createElement('div');
    deleteContainer.classList.add('delete');
    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('icon', 'ms-Icon', 'ms-Icon--Delete');
    deleteIcon.addEventListener('click', onDelete)
    deleteContainer.appendChild(deleteIcon);
    listItem.appendChild(deleteContainer);

    return listItem;
}

function onClick() {
    const statusContainer = this.parentElement;
    const listItem = statusContainer.parentElement;
    const textArea = listItem.querySelector('textarea');

    if (this.classList.contains('ms-Icon--Checkbox')) {
        this.classList.remove('ms-Icon--Checkbox');
        this.classList.add('ms-Icon--CheckboxComposite');
        textArea.classList.toggle('complete');
    } else {
        this.classList.remove('ms-Icon--CheckboxComposite');
        this.classList.add('ms-Icon--Checkbox');
        textArea.classList.toggle('complete');
    }
    
}
function onInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

function onDelete() {
    const deleteContainer = this.parentElement;
    const listItem = deleteContainer.parentElement;
    const list = listItem.parentElement;

    list.removeChild(listItem);
    if (list.children.length == 0) {
        list.appendChild(createPlaceholderElement());
    }
}

function clearList() {
    const list = document.getElementById('list');
    const listItems = list.querySelectorAll('.list-item');

    for (const listItem of listItems) {
        list.removeChild(listItem);
    }

    if (!list.querySelector('.placeholder')) {
        list.appendChild(createPlaceholderElement());
    }
}

function createPlaceholderElement() {
    const placeholder = document.createElement('p');
    placeholder.classList.add('placeholder')
    placeholder.textContent = 'No Items';

    return placeholder;
}