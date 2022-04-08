document.addEventListener('DOMContentLoaded', () => {
    const clearListButton = document.getElementById('clear-list');
    const textArea = document.getElementById('text-area');
    const newItemButton = document.getElementById('new-item');

    clearListButton.addEventListener('click', clearList);
    textArea.addEventListener('keydown', onKeydown);
    newItemButton.addEventListener('click', newItem);
    
});

function newItem() {
    const textArea = document.getElementById('text-area');
    const value = textArea.value;

    if (value !== '') {
        const list = document.getElementById('list');
    
        if (list.querySelector('.placeholder')) {
            const placeholder = list.querySelector('.placeholder');
            list.removeChild(placeholder);
        }

        const listItem = createListItemElement(value);
        list.appendChild(listItem);
        
        textArea.value = '';
        listItem.scrollIntoView();
    }
}

function createListItemElement(value) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status');
    const statusIcon = document.createElement('div');
    statusIcon.classList.add('icon', 'ms-Icon', 'ms-Icon--Checkbox');
    statusIcon.addEventListener('click', onClick);
    statusContainer.appendChild(statusIcon);
    listItem.appendChild(statusContainer);

    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = value;
    listItem.appendChild(content);

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
    const content = listItem.querySelector('.content');

    if (this.classList.contains('ms-Icon--Checkbox')) {
        this.classList.remove('ms-Icon--Checkbox');
        this.classList.add('ms-Icon--CheckboxComposite');
        content.classList.toggle('complete');
    } else {
        this.classList.remove('ms-Icon--CheckboxComposite');
        this.classList.add('ms-Icon--Checkbox');
        content.classList.toggle('complete');
    }
    
}

function onKeydown(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        newItem(this);
    }
}

function onDelete() {
    const deleteContainer = this.parentElement;
    const listItem = deleteContainer.parentElement;
    const list = listItem.parentElement;

    listItem.remove();
    if (list.children.length == 0) {
        list.appendChild(createPlaceholderElement());
    }
}

function clearList() {
    const list = document.getElementById('list');
    const listItems = list.querySelectorAll('.list-item');

    if (listItems.length > 0) {
        for (const listItem of listItems) {
            list.removeChild(listItem);
        }
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