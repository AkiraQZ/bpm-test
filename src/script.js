const commentsURL = 'https://jsonplaceholder.typicode.com/comments';
const postsURL = 'https://jsonplaceholder.typicode.com/posts';

const mainContainer = document.querySelector('.main');



async function createPage() {
    const commentsResponse = await fetch(commentsURL);
    const comments = await commentsResponse.json();

    const postsResponse = await fetch(postsURL);
    const posts = await postsResponse.json();
    createPost(comments, posts);
  }


  async function createPost(comments, posts) {
    const postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');

    const mainPost = document.createElement('div');
    mainPost.classList.add('main__post');
    mainPost.setAttribute('id', 'post-1');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post__header');

    const headerTitle = document.createElement('h2');
    headerTitle.classList.add('header__title', 'heading2');
    headerTitle.textContent = `${posts[0].title}`;

    const headerUserId = document.createElement('span');
    headerUserId.classList.add('header__user-id', 'heading3');
    headerUserId.textContent = `Posted by ${posts[0].userId}`;

    postHeader.appendChild(headerTitle);
    postHeader.appendChild(headerUserId);

    const postBody = document.createElement('span');
    postBody.classList.add('post__body', 'body-medium-text');
    postBody.textContent = `${posts[0].body}`;

    const postButton = document.createElement('button');
    postButton.classList.add('post__button');
    postButton.setAttribute('type', 'button');

    const buttonText = document.createElement('span');
    buttonText.classList.add('button__text', 'body-medium-text');
    buttonText.textContent = 'Comments';

    postButton.appendChild(buttonText);

    mainPost.appendChild(postHeader);
    mainPost.appendChild(postBody);
    mainPost.appendChild(postButton);

    const postComments = document.createElement('div');
    postComments.classList.add('post__comments');

    comments.slice(0, 5).forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');

      const commentHeader = document.createElement('div');
      commentHeader.classList.add('comment__header');

      const headerUsername = document.createElement('h3');
      headerUsername.classList.add('header__username', 'heading3');
      headerUsername.textContent = `${comment.name}`;

      const headerEmail = document.createElement('a');
      headerEmail.classList.add('header__email', 'body-medium-text');
      headerEmail.textContent = `${comment.email}`;
      headerEmail.setAttribute('href', `mailto:${comment.email}`);

      commentHeader.appendChild(headerUsername);
      commentHeader.appendChild(headerEmail);

      const commentBody = document.createElement('span');
      commentBody.classList.add('comment__body', 'body-medium-text');
      commentBody.textContent = `${comment.body}`;

      commentDiv.appendChild(commentHeader);
      commentDiv.appendChild(commentBody);

      postComments.appendChild(commentDiv);
    });

    mainPost.appendChild(postComments);
    postWrapper.appendChild(mainPost);

    mainContainer.appendChild(postWrapper); // Изменено место возврата

    return postWrapper;
  }

  createPage();