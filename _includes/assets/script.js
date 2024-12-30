var vSearchRequest = "";

var tagForm = document.querySelector(".js-form");
tagForm.addEventListener("submit", doSearch);

var tagInput = document.querySelector(".js-input");
//tagInput.addEventListener('input', doSearch);

var tagResults = document.querySelector(".js-results");

const aArticles = [{% for article in site.notes %}
	{ "id": {{ forloop.index }}, "title": "{{ article.title }}", "author": "{{ article.author-key | replace: '-', '' }}", "quote": "{{ article.quote }}", "content": "{{ article.content | strip_newlines | remove: '<p>' | replace: '</p>', ' ' }}", "url": "{{ article.url }}" }{% if forloop.last %}{% else %},{% endif %}{% endfor %}
];

function getSentence(content, searchTerm) {
	const regex = new RegExp(`([^.!?]*?\\b${searchTerm}\\b[^.!?]*[.!?])`, 'i');
	const match = content.match(regex);
	return match ? match[0].trim() : '';
}
function getSentences(content, searchTerm) {
	const regex = new RegExp(`([^.!?]*?\\b${searchTerm}\\b[^.!?]*[.!?])`, 'gi');
	const matches = content.match(regex);
	if (matches) {
		return matches.map(sentence => 
			`<p>${sentence.replace(new RegExp(`\\b(${searchTerm})\\b`, 'gi'), '<span class="highlight">$1</span>')}</p>`
		).join(' ');
	}
	return '';
}

function doResults(aArticlesFound) {
	aArticlesFound.forEach(article => {
		var newtagUCard = document.createElement("div");
		newtagUCard.className = "search-results-card u-card";
		newtagUCard.innerHTML = `
			<footer class="u-card-footer">
				<img src="/assets/images/logo-icon_black_www-dot-intobinary-dot-org.png" class="u-card-footer-logo" />
				<span class="u-card-footer-author">${article.author}'s Notes</span>
			</footer>
			<header class="u-card-header">
				<h4 class="u-card-header-title">"${article.title}"</h4>
				<p class="u-card-header-quote">${article.quote}</p>
				<a href="${article.url}" class="u-card-header-link">Read Article</a>
			</header>
			<div class="u-card-results">
				${getSentences(article.content, vSearchRequest)} <!-- You can replace this with any other content you want -->
			</div>
		`;
		
		tagResults.appendChild(newtagUCard);
	});
}

function doSearch(e) {
	e.preventDefault();
	tagResults.innerHTML = "";

	vSearchRequest = tagInput.value.toLowerCase();
	const aArticlesFound = aArticles.filter(data => 
		data.title.toLowerCase().includes(vSearchRequest) || 
		data.quote.toLowerCase().includes(vSearchRequest) || 
		data.content.toLowerCase().includes(vSearchRequest)
	);
	if(aArticlesFound.length === 0) { alert("NOT FOUND!"); }
	else { doResults(aArticlesFound); }
}