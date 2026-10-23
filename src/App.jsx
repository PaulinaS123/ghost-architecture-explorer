import { useMemo, useState } from "react";
import "./App.css";

const initialPosts = [
  {
    id: 1,
    title: "Designing for the Next Generation of the Web",
    category: "Design",
    status: "Published",
    date: "Oct 18, 2026",
    excerpt: "Exploring thoughtful interfaces and more human digital experiences.",
  },
  {
    id: 2,
    title: "The Art of Slow Publishing",
    category: "Culture",
    status: "Draft",
    date: "Oct 17, 2026",
    excerpt: "Why creating meaningful content matters more than publishing faster.",
  },
  {
    id: 3,
    title: "Building Better Digital Experiences",
    category: "Technology",
    status: "Published",
    date: "Oct 15, 2026",
    excerpt: "A practical approach to usability, accessibility, and product quality.",
  },
  {
    id: 4,
    title: "Notes on Creative Practice",
    category: "Culture",
    status: "Draft",
    date: "Oct 12, 2026",
    excerpt: "Small habits that help ideas grow into finished work.",
  },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const publishedCount = posts.filter(
    (post) => post.status === "Published"
  ).length;

  const draftCount = posts.filter(
    (post) => post.status === "Draft"
  ).length;

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || post.status === filter;

      const matchesPage =
        activePage === "Overview" ||
        activePage === "Architecture Explorer" ||
        (activePage === "Published" && post.status === "Published") ||
        (activePage === "Drafts" && post.status === "Draft");

      return matchesSearch && matchesFilter && matchesPage;
    });
  }, [posts, search, filter, activePage]);

  function createPost(event) {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Please enter an article title.");
      return;
    }

    if (!content.trim()) {
      setMessage("Please enter some article content.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      category,
      status: "Draft",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      excerpt: content.trim().slice(0, 110),
    };

    setPosts((current) => [newPost, ...current]);
    setTitle("");
    setContent("");
    setMessage("Draft saved successfully.");
    setActivePage("Drafts");
    setFilter("All");
    setSearch("");
  }

  function publishPost(id) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, status: "Published" }
          : post
      )
    );
    setMessage("Article published in this prototype.");
  }

  function deletePost(id) {
    setPosts((current) =>
      current.filter((post) => post.id !== id)
    );
    setMessage("Article removed.");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={() => setActivePage("Overview")}>
          <span className="brand-mark">g</span>
          <span>ghost<span className="brand-light"> explorer</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="navigation" aria-label="Main navigation">
          {[
            ["Overview", "◫"],
            ["Published", "▤"],
            ["Drafts", "▧"],
            ["Architecture Explorer", "⌘"],
          ].map(([page, icon]) => (
            <button
              key={page}
              className={`nav-item ${activePage === page ? "active" : ""}`}
              onClick={() => {
                setActivePage(page);
                setMessage("");
              }}
            >
              <span className="nav-icon" aria-hidden="true">{icon}</span>
              {page}
              {page === "Drafts" && (
                <span className="nav-count">{draftCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">PE</div>
          <div>
            <strong>Project Explorer</strong>
            <span>Local prototype</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>
          <div className="topbar-right">
            <span className="status-dot" />
            Prototype environment
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">YOUR PUBLICATION</p>
              <h1>
                {activePage === "Overview"
                  ? "Good things take time."
                  : activePage}
              </h1>
              <p className="subtitle">
                {activePage === "Architecture Explorer"
                  ? "Explore the architecture behind a modern publishing platform."
                  : "A little space for ideas worth sharing."}
              </p>
            </div>
            {activePage !== "Architecture Explorer" && (
              <button
                className="primary-button"
                onClick={() => {
                  setActivePage("Overview");
                  document.getElementById("article-title")?.focus();
                }}
              >
                <span aria-hidden="true">＋</span> New article
              </button>
            )}
          </section>

          {activePage === "Architecture Explorer" ? (
            <section className="panel architecture-panel" aria-labelledby="architecture-heading">
              <p className="eyebrow">ARCHITECTURE ANALYSIS</p>
              <h2 id="architecture-heading">How Ghost works</h2>
              <p className="subtitle">
                Ghost is an open-source publishing platform. Its core backend is
                commonly described as a modular monolith: related publishing
                capabilities are organized into modules within a shared Node.js
                application, rather than separate backend microservices.
              </p>
              <p className="architecture-style"><strong>Primary style:</strong> Modular monolith with a layered web architecture</p>

              <h3>Components and communication boundaries</h3>
              <div className="ghost-architecture-map" role="group" aria-label="Ghost architecture: Ghost Admin communicates with Ghost Core through the Admin API; readers request themed pages from Ghost Core; external clients can use the Content API; Ghost Core reads and writes MySQL data.">
                <div className="ghost-architecture-top">
                  <div className="architecture-node">
                    <span>01 · EDITORS</span>
                    <strong>Ghost Admin</strong>
                    <p>Content editing and publication management UI.</p>
                  </div>
                  <div className="architecture-node">
                    <span>02 · READERS</span>
                    <strong>Public website</strong>
                    <p>Readers request pages rendered using Ghost themes.</p>
                  </div>
                </div>
                <div className="ghost-architecture-links" aria-hidden="true">
                  <span>↓ Admin API requests</span>
                  <span>↓ Page requests / HTML responses</span>
                </div>
                <div className="architecture-node ghost-core-node">
                  <span>03 · APPLICATION SERVER</span>
                  <strong>Ghost Core · Node.js</strong>
                  <p>Admin API · Content API · publishing logic · theme rendering</p>
                  <p className="ghost-secondary-note">The Content API also exposes published content to external clients.</p>
                </div>
                <p className="ghost-data-link" aria-hidden="true">↕ Database queries and results</p>
                <div className="architecture-node ghost-database-node">
                  <span>04 · PERSISTENCE</span>
                  <strong>MySQL database</strong>
                  <p>Stores posts, users, settings, and publication metadata.</p>
                </div>
              </div>

              <h3>Why this architecture?</h3>
              <div className="ghost-insight-grid">
                <div className="ghost-insight">
                  <h4>Benefit</h4>
                  <p>One core backend can simplify development, deployment, and coordination between publishing features.</p>
                </div>
                <div className="ghost-insight">
                  <h4>Trade-off</h4>
                  <p>Core modules share a deployment boundary, so scaling and releasing one backend feature independently can be harder than with microservices.</p>
                </div>
              </div>

              <h3>Verification and prototype scope</h3>
              <p>
                This is a simplified logical diagram, not an exact deployment
                topology. Ghost Admin and the public website are different
                interfaces to Ghost Core; the database is not a required
                intermediate stop on every request. Reverse proxies, caches,
                storage adapters, and optional services vary by deployment.
              </p>
              <p>
                <strong>My companion prototype:</strong> This React/Vite app
                simulates drafting, publishing, searching, and deleting articles
                using in-memory React state. It does not call Ghost APIs or
                store data in MySQL. Changes reset on page refresh.
              </p>
              <p className="architecture-note">
                Sources to cite in the README: Ghost official documentation
                (docs.ghost.org) and Ghost source code (github.com/TryGhost/Ghost).
                Record any actual AI-generated inaccuracies and corrections in
                the README's AI audit; do not claim an error without evidence.
              </p>
            </section>
          ) : (
            <>
              <section className="stats-grid" aria-label="Publication statistics">
                <div className="stat-card">
                  <span>Total articles</span>
                  <strong>{posts.length}</strong>
                  <small>Across your publication</small>
                </div>
                <div className="stat-card">
                  <span>Published</span>
                  <strong>{publishedCount}</strong>
                  <small>Ready for readers</small>
                </div>
                <div className="stat-card">
                  <span>Drafts</span>
                  <strong>{draftCount}</strong>
                  <small>Work in progress</small>
                </div>
              </section>

              <section className="panel editor-panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">THE WRITING ROOM</p>
                    <h2>Create an article</h2>
                  </div>
                  <span className="subtle-tag">New draft</span>
                </div>

                <form onSubmit={createPost}>
                  <label htmlFor="article-title">Article title</label>
                  <input
                    id="article-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Give your idea a name..."
                    maxLength={160}
                  />

                  <label htmlFor="article-category">Category</label>
                  <select
                    id="article-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option>Design</option>
                    <option>Culture</option>
                    <option>Technology</option>
                  </select>

                  <label htmlFor="article-content">Article content</label>
                  <textarea
                    id="article-content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="Start writing your story..."
                    rows={4}
                  />

                  <div className="form-footer">
                    <span>{content.length} characters</span>
                    <button className="primary-button" type="submit">
                      Save draft
                    </button>
                  </div>
                </form>

                {message && (
                  <p className="feedback" role="status">{message}</p>
                )}
              </section>

              <section className="panel posts-panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">YOUR CONTENT</p>
                    <h2>Articles</h2>
                  </div>
                  <span className="subtle-tag">{visiblePosts.length} shown</span>
                </div>

                <div className="toolbar">
                  <label className="search-box">
                    <span aria-hidden="true">⌕</span>
                    <span className="visually-hidden">Search articles</span>
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search articles..."
                    />
                  </label>

                  <label className="filter-label">
                    <span className="visually-hidden">Filter by status</span>
                    <select
                      value={filter}
                      onChange={(event) => setFilter(event.target.value)}
                    >
                      <option>All</option>
                      <option>Published</option>
                      <option>Draft</option>
                    </select>
                  </label>
                </div>

                <div className="post-list">
                  {visiblePosts.map((post) => (
                    <article className="post-row" key={post.id}>
                      <div className="post-symbol" aria-hidden="true">✳</div>
                      <div className="post-info">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="post-meta">
                          <span>{post.category}</span>
                          <span>·</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="post-actions">
                        <span
                          className={`post-status ${
                            post.status === "Published" ? "published" : "draft"
                          }`}
                        >
                          {post.status}
                        </span>
                        {post.status === "Draft" && (
                          <button
                            className="text-button"
                            onClick={() => publishPost(post.id)}
                          >
                            Publish
                          </button>
                        )}
                        <button
                          className="text-button delete-button"
                          onClick={() => deletePost(post.id)}
                          aria-label={`Delete ${post.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}

                  {visiblePosts.length === 0 && (
                    <div className="empty-state">
                      <strong>No articles found</strong>
                      <p>Try another search or change your filters.</p>
                      <button
                        className="text-button"
                        onClick={() => {
                          setSearch("");
                          setFilter("All");
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}

          <footer className="page-footer">
            <span>Ghost Architecture Explorer</span>
            <span>Educational prototype · Not affiliated with Ghost</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
