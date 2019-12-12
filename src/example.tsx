import * as React from "react";
import * as ReactDOM from "react-dom";
import { SvgTerm } from "./svg-term";
import { loadCast } from "./load-cast";
import { defaultTheme } from "./default-theme";

async function main(window: Window, document: Document) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const data = await fetch('/fixtures/example.json');
  const cast = loadCast(await data.text());

  ReactDOM.render(
    <SvgTerm
      cast={cast}
      theme={defaultTheme}
      decorations={false}
      paddingX={10}
      paddingY={10}
      cursor={true}
    />,
    container
  );
}

window.addEventListener("DOMContentLoaded", () => main(window, document));
