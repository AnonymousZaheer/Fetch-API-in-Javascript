// By Default fetch function get method ko use krta hai.
// under the then method it is a call back
// async await
// jab eik function promise ko return krta hai to usko await aur async ma daal dete hain.
// Fake API ma newly created post ki id hamesha same rahe gi.

const endPoint = "https://jsonplaceholder.typicode.com/posts/"

const getButton = document.querySelector('#getPost');
const createButton = document.querySelector('#createPost');
const updateButton = document.querySelector('#updatePost');
const patchButton = document.querySelector('#patchPost');
const deleteButton = document.querySelector('#deletePost');


// GET METHOD
const getPosts = async () => {
    try{
        const response = await fetch(endPoint);
        if(response.status != 200){
            throw new Error(`Some Error, Status code : ${response.status}`);
        }
        const posts = await response.json();
        return posts;
    }
    catch(error){
        console.log(error);
    }
}

getButton.addEventListener("click", async () => {
    const posts = await getPosts();
    if (posts){
    const table = `<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
      </tr>
    </thead>
    <tbody>
    ${posts.map(
        (post) => ` <tr>
        <th scope="row">${post.id}</th>
        <td>${post.title}</td>
      </tr>`
    ).join("\n")}
     
    </tbody>
  </table>`;
  document.querySelector('#table').innerHTML = table;
}
});

// Create Method

const createPost = async (newpost) => {
    try {
        const response = await fetch(endPoint, {
            method: "POST",
            body: JSON.stringify(newpost),
            headers: {"Content-type":"application/json; charset=UTF-8"},
        });
        if (response.status != 201) {
            throw new Error(`Something went wrong, Status Code: ${response.status}`)
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error)
    }
};

createButton.addEventListener('click', async () => {
    const newPost = {
        title : "New post Title",
        body : "New Post Body",
        userId : 1,
    };
    const createdPost = await createPost(newPost);
    console.log(createdPost)
})

//Update Button

const updatePost = async (newpost, id) => {
    try {
        const response = await fetch(`${endPoint}/${id}`, {
            method: "PUT",
            body: JSON.stringify(newpost),
            headers: {"Content-type":"application/json; charset=UTF-8"},
        });
        if (response.status != 200) {
            throw new Error(`Something went wrong, Status Code: ${response.status}`)
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error)
    }
};

updateButton.addEventListener('click', async () => {
    const newPost = {
        title : "Update post Title",
        body : "Update Post Body",
        userId : 1,
    };
    const updatedPost = await updatePost(newPost,2);
    console.log(updatedPost)
})

// Patch Button

const patchPost = async (newpost, id) => {
    try {
        const response = await fetch(`${endPoint}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(newpost),
            headers: {"Content-type":"application/json; charset=UTF-8"},
        });
        if (response.status != 200) {
            throw new Error(`Something went wrong, Status Code: ${response.status}`)
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error)
    }
};

patchButton.addEventListener('click', async () => {
    const newPost = {
        title : "Update post Title",
    };
    const patchedPost = await patchPost(newPost,2);
    console.log(patchedPost)
})

// Delete Button

const deletePost = async (id) => {
    try {
        const response = await fetch(`${endPoint}/${id}`, {
            method: "DELETE",
        });
        if (response.status != 200) {
            throw new Error(`Something went wrong, Status Code: ${response.status}`)
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error)
    }
};

deleteButton.addEventListener('click', async () => {
    const deletedPost = await deletePost(2);
    console.log(deletedPost)
})

