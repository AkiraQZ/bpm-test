const commentsURL = 'https://jsonplaceholder.typicode.com/comments';
const postsURL = 'https://jsonplaceholder.typicode.com/posts';

const mainContainer = document.querySelector('.main');
const postsPerPage = 10;
let currentPage = 1;

async function createPage() {
  const commentsResponse = await fetch(commentsURL);
  const comments = await commentsResponse.json();

  const postsResponse = await fetch(postsURL);
  const posts = await postsResponse.json();

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  mainContainer.innerHTML = '';

  for (let i = 0; i < currentPosts.length; i++) {
    const post = currentPosts[i];
    const postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');

    const mainPost = document.createElement('div');
    mainPost.classList.add('main__post');
    mainPost.setAttribute('id', `post-${post.id}`);

    const postHeader = document.createElement('div');
    postHeader.classList.add('post__header');

    const headerTitle = document.createElement('h2');
    headerTitle.classList.add('header__title', 'heading2');
    headerTitle.textContent = `${post.title}`;

    const headerUserId = document.createElement('span');
    headerUserId.classList.add('header__user-id', 'heading3');
    headerUserId.textContent = `Posted by ${post.userId}`;

    postHeader.appendChild(headerTitle);
    postHeader.appendChild(headerUserId);

    const postBody = document.createElement('span');
    postBody.classList.add('post__body', 'body-medium-text');
    postBody.textContent = `${post.body}`;

    const postButton = document.createElement('button');
    postButton.classList.add('post__button');
    postButton.setAttribute('type', 'button');
    postButton.addEventListener('click', () => {
      postComments.classList.toggle('hidden');
    })

    const buttonText = document.createElement('span');
    buttonText.classList.add('button__text', 'body-medium-text');
    buttonText.textContent = 'Comments';

    postButton.appendChild(buttonText);

    mainPost.appendChild(postHeader);
    mainPost.appendChild(postBody);
    mainPost.appendChild(postButton);

    const postComments = document.createElement('div');
    postComments.classList.add('post__comments');
    postComments.classList.add('hidden');

    const postCommentsSlice = comments.filter(comment => comment.postId === post.id).slice(0, 5);
    postCommentsSlice.forEach(comment => {
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
    mainContainer.appendChild(postWrapper);
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination');

  const prevButton = document.createElement('button');
  prevButton.classList.add('pagination__button');
  prevButton.setAttribute('type', 'button');
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    currentPage--;
    createPage();
  });

  const prevButtonText = document.createElement('span');
  prevButtonText.classList.add('button__text', 'body-medium-text');
  prevButtonText.textContent = 'Prev';

  prevButton.appendChild(prevButtonText);

  const nextButton = document.createElement('button');
  nextButton.classList.add('pagination__button');
  nextButton.setAttribute('type', 'button');
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    currentPage++;
    createPage();
  });

  const nextButtonText = document.createElement('span');
  nextButtonText.classList.add('button__text', 'body-medium-text');
  nextButtonText.textContent = 'Next';

  nextButton.appendChild(nextButtonText);

  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.classList.add('pagination__button');
    pageButton.setAttribute('type', 'button');
    pageButton.disabled = i === currentPage;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      createPage();
    });

    const pageButtonText = document.createElement('span');
    pageButtonText.classList.add('button__text', 'body-medium-text');
    pageButtonText.textContent = i;

    pageButton.appendChild(pageButtonText);
    paginationContainer.appendChild(pageButton);
  }

  paginationContainer.appendChild(nextButton);
  mainContainer.appendChild(paginationContainer);
}

createPage();