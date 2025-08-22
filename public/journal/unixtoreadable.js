//NOTE - converts the unix to a readable time stamp
document.querySelectorAll("time.post-time").forEach((el) => {
  let timestamp = parseInt(el.getAttribute("datetime"), 10);
  let date = new Date(timestamp * 1000);

  //NOTE - change these variables if you want a different time format
  el.textContent = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  //NOTE - this is so that the unix time becomes machine readable, you can remove this line if you want but then the html gods wont like you
  el.setAttribute("datetime", date.toISOString());
});
