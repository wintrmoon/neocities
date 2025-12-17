//ANCHOR - Side bar template
class NavBoxSide extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <h2 class="nav-header">
          navigation
        </h2>
        <ul class="nav-list">
          <li><a href="./index.html"><img src="./assets/icons/mono-house.png" class="icon"> home</a></li>
          <li><a href="./log/index.html"><img src="./assets/icons/mono-book.png" class="icon"> journal</a></li>
          <li><a href="./era.html"><img src="./assets/icons/mono-mail.png" class="icon"> era's</a></li>
          <li><a href="./links.html"><img src="./assets/icons/mono-star.png" class="icon"> links</a></li>
          <li><a href="./about.html"><img src="./assets/icons/mono-pen.png" class="icon"> about</a></li>
        </ul>
      </nav>
      <br>
      <div class="divider"><img src="./assets/divider_half.gif"></div>
      <div style="text-align: center;">
        <p>my button!</p>
        <img src="./assets/buttons/peachleaf.gif" alt="website button">
        <textarea rows="2" style="resize: none;"><a target="_blank" href="https://peachleaf.neocities.org/"><img src="https://peachleaf.neocities.org/assets/buttons/peachleaf.gif" alt="peachleaf's button"/></a></textarea>
        <div>
            <!--NOTE - the last fm thingy... Hi harv, thanks for the help! I was pulling my hair out-->
          <p>listening to:<br> <iframe src="https://petrapixel.neocities.org/widgets/lastfm?center=1&marquee=0&font=Courier New&fontSize=16px&color=FCEAC5&username=Oatax&swapPositions=0&delimiter=by&underline=0" width="170" frameborder="0" title="Last.Fm Status"></iframe></p>
        </div>
      </div>
    `;

    //NOTE - For the active tab highlighting,
    const links = this.querySelectorAll("a");

    function normalizePath(path) {
      return path
        .replace(/\/$/, "") // remove trailing slash
        .replace(/\.html$/, "") // remove .html
        .replace(/\/index$/, ""); // remove trailing /index
    }

    const currentDir = normalizePath(window.location.pathname);

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      // Resolve relative hrefs to an absolute pathname
      let resolvedPath;
      try {
        resolvedPath = new URL(href, window.location.href).pathname;
      } catch (e) {
        // fallback: use href as-is
        resolvedPath = href;
      }

      const linkDir = normalizePath(resolvedPath);

      // Add class to the <a> (so your dots/pseudo-element on the link still work)
      if (linkDir === currentDir) {
        link.classList.add("activetab");
      }
    });
  }
}

//NOTE - This is for the footer
class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
    <footer>
      <div class="footer-row">
        <img src="./assets/buttons/eevee.png" alt="eevee" />
        <img src="./assets/buttons/tyg.gif" alt="tyg" />
        <p>est. 11*06*'24 | made by peachleaf</p>
        <img src="./assets/buttons/hiro88.gif" alt="hiro88" />
        <img src="./assets/buttons/neocities_hosted.gif" alt="hosted" />
      </div>
      <div>
        <img src="./assets/zipcat.gif" style="margin-bottom: -10px" />
      </div>
    </footer>
        `;
  }
}

customElements.define("footer-1", Footer);
customElements.define("nav-box-side", NavBoxSide);
