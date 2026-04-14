function nav() {
	fetch('navbar.html')
		.then(response => response.text())
		.then(data => {
			document.getElementById('navbar-container').innerHTML = data;

			// Highlight current page (update href matches)
			const currentPage = window.location.hash ? window.location.hash : '#home';
			const links = document.querySelectorAll('.nav-link');

			links.forEach(link => {
				if (link.getAttribute('href') === currentPage) {
					link.classList.add('active');
				}
			});
		});
}

/**
 * 
 * @param {string} fileName 
 */
function navPage(fileName) {
	fetch(fileName)
		.then(response => response.text())
		.then(data => {
			document.getElementById('content').innerHTML = data;

			const currentPage = fileName.substring(0, fileName.indexOf('.')).toLowerCase();
			const links = document.querySelectorAll('.nav-link');

			// Highlight page
			for (const link of links) {
				if (link.id === currentPage) {
					link.classList.add('active');
				} else {
					link.classList.remove('active');
				}
			}
		});
}

function navPostFromFileName(fileName) {
	fetch('/posts.json')
		.then(r => r.json())
		.then(
			/** @param {Post[]} postData */
			postData => {
				const post = postData.find(x => x.fileName === fileName);

				if (post)
					navPost(post);
			});
}

/**
 * 
 * @param {Post} post
 */
function navPost(post) {
	fetch(`posts/${post.fileName}`)
		.then(response => response.text())
		.then(data => {
			const postText = `#### ${post.title}\n\n<span style="color:gray"><small>${formatDateLocale(new Date(post.date))}${post.author ? ` • ${post.author}` : ''}</small></span>\n\n---\n${data}`;
			const content = document.getElementById('content');

			content.innerHTML = marked.parse(postText);

			const moreLink = document.createElement('a');
			moreLink.innerText = "Back";
			moreLink.href = `#`;
			moreLink.onclick = () => history.back();
			content.appendChild(moreLink);

			const links = document.querySelectorAll('.nav-link');

			// Un-highlight pages
			for (const link of links) {
				link.classList.remove('active');
			}
		});
}

function home() {
	navPage('home.html');
	fetchPosts();
}