const title = document.getElementById('title')
const img = document.getElementById('img')
const tag = document.getElementById('tag')
const author = document.getElementById('author')
const textArea = document.getElementById('text-area')
const submitBtn = document.getElementById('submit')
const postsList = document.querySelector('ul')
const localStorageValue = localStorage.getItem('postLocalStorage');
const parsedLocalStorage = JSON.parse(localStorageValue);


if (localStorageValue) {
    var postStorage = [...parsedLocalStorage];
    parsedLocalStorage.forEach(createElement)
    var id = parsedLocalStorage.length;
} else {
    var postStorage = [];
    var id = 0;
}

function createElement(item) {
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'col-6')
    newDiv.setAttribute('id', `${item.id}`)
    newDiv.innerHTML = `<div class="card m-2">
    <header class=" card-header">
       <input type="text" disabled class='edit' value="${item.title}"> 
    </header>
    <div class="card-img">
        <img src="${item.img}" class="img-fluid" alt="${item.author}">
    </div>
    <div class="card-body">
   <input type="text" disabled class='edit' value="${item.text}"> 
    </div>
    <div class="card-footer">
        <ul class="list-unstyled d-flex justify-content-around">
            <li class="author-name"> Author : <input type="text" disabled class='edit' value="${item.author}"></li>
            <li class="tag-name"> Tag : <input type="text" disabled class='edit' value="${item.tag}"></li>
            <li class="likes-number">Likes:0 </li>
        </ul>
        <section class="d-flex justify-content-around">
            <button id='edit-btn' class="form-control w-25 m-1 bg-secondary">Edit</button>
            <button id='save-btn' class="form-control w-25 m-1 bg-success">Save</button>
            <button id='delete-btn-${item.id}'' class="form-control w-25 m-1 bg-danger">Delete</button>
        </section>
    </div>
</div>`;

    postsList.appendChild(newDiv);
    const deleteBtn = document.querySelector(`#delete-btn-${item.id}`)
    deleteBtn.addEventListener('click', () => {
        newDiv.setAttribute('class', 'd-none')
        newDiv.remove()
        const localStorageValue = localStorage.getItem('postLocalStorage');
        const divId = newDiv.getAttribute('id');
        console.log(divId)
        let array = JSON.parse(localStorageValue);
        console.log(array);
        const index = array.indexOf(array[divId]);
        console.log(index);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
            localStorage.setItem('postLocalStorage', JSON.stringify(array));

        }
        if (index == -1) {
            array = [];
            localStorage.setItem('postLocalStorage', JSON.stringify(array));
        }
    })
}

function clear() {
    title.value = img.value = author.value = tag.value = textArea.value = null;
}

function submitHandler() {
    const titleValue = title.value;
    const imgValue = img.value;
    if (imgValue !== '1.jpg') {
        alert('wrong img input')
        clear()
        return
    }
    const authorValue = author.value;
    const textAreaValue = textArea.value;
    const tagValue = tag.value;
    const post = {
        id: id++,
        title: titleValue,
        img: imgValue,
        tag: tagValue,
        author: authorValue,
        text: textAreaValue
    };
    createElement(post)
    postStorage.push(post);
    localStorage.setItem('postLocalStorage', JSON.stringify(postStorage));
    clear()
}
submitBtn.addEventListener('click', submitHandler);
document.querySelector