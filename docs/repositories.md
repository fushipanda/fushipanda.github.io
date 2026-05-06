---
hide:
  - navigation
  - toc
---

# Repositories

<div class="repo-controls">
  <input type="text" id="repo-search" placeholder="Filter by name or description…" autocomplete="off" spellcheck="false">
  <select id="repo-sort">
    <option value="updated">Recently updated</option>
    <option value="stars">Most starred</option>
    <option value="name">A → Z</option>
  </select>
</div>

<div id="repo-grid" class="repo-grid"></div>

<script>
(function () {
  var grid = document.getElementById('repo-grid');
  var search = document.getElementById('repo-search');
  var sortSel = document.getElementById('repo-sort');
  var allRepos = [];

  function fmtDate(iso) {
    return new Date(iso).toLocaleDateString('en-AU', { year: 'numeric', month: 'short' });
  }

  function render(repos) {
    if (!repos.length) {
      grid.innerHTML = '<p class="repo-state">No repositories match.</p>';
      return;
    }
    grid.innerHTML = repos.map(function (r) {
      return '<a class="repo-card" href="' + r.html_url + '" target="_blank" rel="noopener">'
        + '<div class="repo-card-header">'
        + '<span class="repo-name">' + r.name + '</span>'
        + (r.stargazers_count > 0 ? '<span class="repo-stars">★ ' + r.stargazers_count + '</span>' : '')
        + '</div>'
        + (r.description ? '<p class="repo-desc">' + r.description + '</p>' : '')
        + '<div class="repo-meta">'
        + (r.language ? '<span class="repo-lang">' + r.language + '</span>' : '')
        + '<span class="repo-updated">Updated ' + fmtDate(r.updated_at) + '</span>'
        + '</div>'
        + '</a>';
    }).join('');
  }

  function applyFilters() {
    var q = search.value.toLowerCase();
    var sort = sortSel.value;
    var repos = allRepos.filter(function (r) {
      return !q || r.name.toLowerCase().indexOf(q) !== -1 || (r.description || '').toLowerCase().indexOf(q) !== -1;
    });
    if (sort === 'stars') {
      repos.sort(function (a, b) { return b.stargazers_count - a.stargazers_count; });
    } else if (sort === 'name') {
      repos.sort(function (a, b) { return a.name.localeCompare(b.name); });
    } else {
      repos.sort(function (a, b) { return new Date(b.updated_at) - new Date(a.updated_at); });
    }
    render(repos);
  }

  search.addEventListener('input', applyFilters);
  sortSel.addEventListener('change', applyFilters);

  grid.innerHTML = '<p class="repo-state">Loading…</p>';

  fetch('https://api.github.com/users/fushipanda/repos?sort=updated&per_page=100')
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (data) {
      var excluded = ['fushipanda', 'fushipanda.github.io'];
      allRepos = data.filter(function (r) { return !r.fork && excluded.indexOf(r.name) === -1; });
      applyFilters();
    })
    .catch(function () {
      grid.innerHTML = '<p class="repo-state">Could not load repositories. <a href="https://github.com/fushipanda" target="_blank" rel="noopener">View on GitHub →</a></p>';
    });
})();
</script>
