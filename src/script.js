const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';


async function getData() {
    const posts = await fetch(postsURL);
    const comments = await fetch(commentsURL);
    let postsData = posts.json();
    let commentsData = comments.json();
    createPosts();
}
