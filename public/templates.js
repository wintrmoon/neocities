//ANCHOR - Side bar template
//TODO - add more or idk
class NavBoxSide extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <h2 style="margin-top: 10px;margin-left:-15px; margin-bottom: 0px;text-align:center; padding:5px">
          navigation
        </h2>
        <ul class="nav-list">
          <li><a href="./index.html"><img src="./assets/icons/mono-house.png" class="icon"> home</a></li>
          <li><a href="./not_found.html"><img src="./assets/icons/mono-book.png" class="icon"> journal</a></li> <!--FIXME - add new page when done -->
          <li><a href="./creations.html"><img src="./assets/icons/mono-mail.png" class="icon"> my creations</a></li>
          <li><a href="./links.html"><img src="./assets/icons/mono-star.png" class="icon"> links</a></li>
          <li><a href="./about.html"><img src="./assets/icons/mono-pen.png" class="icon"> about</a></li>
        </ul>
      </nav>
      <br>
      <div class="divider"><img src="./assets/divider_half.gif"></div>
      <div style="text-align: center;">
        <p>my button!</p>
        <img src="./assets/buttons/wintr button ani.gif" alt="website button">
        <!-- <p>webrings</p> -->
        <div>
            <!--NOTE - the last fm thingy... Hi dj, thanks for the help! I was pulling my hair out-->
          <p>listening to:<br> <iframe src="https://petrapixel.neocities.org/widgets/lastfm?center=1&marquee=0&font=Courier New&fontSize=16px&color=FCEAC5&username=Oatax&swapPositions=0&delimiter=by&underline=0" width="170" frameborder="0" title="Last.Fm Status"></iframe></p>
        </div>
      </div>
    `;

    //NOTE - For the active tab highlighting
    const links = this.querySelectorAll("a");
    let current = window.location.pathname
      .split("/")
      .pop()
      .replace(/\.html$/, "");
    if (current === "" || current === "index") current = "index";

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      // Extract last part of the link href
      const hrefLastPart = href
        .split("/")
        .pop()
        .replace(/\.html$/, "")
        .replace(/^\.\//, "");

      if (hrefLastPart === current) {
        link.classList.add("activetab");
      }
    });
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    //TODO - needs more buttons
    this.innerHTML = ` 
    <footer>
      <div class="footer-row">
        <img src="./assets/buttons/eevee.png" alt="eevee" />
        <img src="./assets/buttons/tyg.gif" alt="tyg" />
        <p>est. 11*06*'24 | made by wintrmoon</p>
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
