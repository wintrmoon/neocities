//ANCHOR - Side bar template
//TODO - add more or idk
class NavBoxSide extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <h2 style="margin-top: 10px;margin-left:-15px; text-align:center; padding:5px">
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
        <!--- <p>webrings</p>
        <p>mood</p>
        <a href="https://www.imood.com/users/wintrmoon"><img src="https://moods.imood.com/display/uname-wintrmoon/fg-fceac5/bg-dda0dd/imood.gif" alt="The current mood of wintrmoon at www.imood.com" border="0"></a>
        --->
        <div class="header__inner">
          <p>listening to:<br> <span id="song">&#8987;</span></p>
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

    //NOTE - the last fm thingy... Hi dj, I just stole this from your code
    let user = "Oatax";
    let url = "https://lastfm-last-played.biancarosa.com.br/" + user + "/latest-song";
    let song = document.querySelector("#song");

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        song.innerHTML = json["track"]["name"] + " by " + json["track"]["artist"]["#text"];
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
  }
}

customElements.define("footer-1", Footer);
customElements.define("nav-box-side", NavBoxSide);
