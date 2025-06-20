class NavBoxSide extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <h2 style="margin-top: 5px;margin-left:-15px; text-align:center; padding:5px">
          navigation
        </h2>
        <ul class="nav-list">
          <li><a href="./index.html"><img src="./asssets/icons/mono-house.png" class="icon"> home</a></li>
          <li><a href="./journal.html"><img src="./asssets/icons/mono-book.png" class="icon"> journal</a></li>
          <li><a href="./creations.html"><img src="./asssets/icons/mono-mail.png" class="icon"> my creations</a></li>
          <li><a href="./links.html"><img src="./asssets/icons/mono-star.png" class="icon"> links</a></li>
          <li><a href="./about.html"><img src="./asssets/icons/mono-pen.png" class="icon"> about</a></li>
        </ul>
      </nav>
      <br>
      <div class="divider"><img src="./asssets/divider_half.gif"></div>
      <div style="text-align: center;">
        <p>my button!</p>
        <img src="./wintr button ani.gif" alt="website button">
        <p>webrings</p>
      </div>
    `;

    // Normalize current path (strip trailing slash and .html)
    let currentPath = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
    if (currentPath === '') currentPath = '/index'; // handle home page

    // Loop through links and normalize them for comparison
    const links = this.querySelectorAll('a');
    links.forEach(link => {
      let href = link.getAttribute('href')
        .replace(/\/$/, '')
        .replace(/\.html$/, '');
      if (href === currentPath) {
        link.classList.add('activetab');
      }
    });
  }
}


class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer id="footer">
    <div style="margin: 5px;">
      <img src="./asssets/buttons/eevee.png">
      <img src="./asssets/buttons/tyg.gif">
      <img src="./asssets/buttons/hiro88.gif">
      <img src="./asssets/buttons/neocities_hosted.gif">
    </div>
    <img src="./asssets/zipcat.gif" style="margin-bottom: -6px;">
  </footer>
        `;
  };
}

customElements.define('footer-1', Footer)
customElements.define('nav-box-side', NavBoxSide);