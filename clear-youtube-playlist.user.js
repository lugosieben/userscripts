// ==UserScript==
// @name         Clear YouTube Playlist
// @namespace    http://github.com/lugosieben
// @version      1.0
// @description  try to take over the world!
// @author       lugosieben
// @match        https://www.youtube.com/playlist?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(() => {
        'use strict';
    console.log("Scriptee")

    let descriptionElement = document.getElementsByClassName("description")[0]
    let descriptionSpan = descriptionElement.querySelector("#snippet").querySelector("#snippet-text").querySelector("#plain-snippet-text")

    let paragraph = document.createElement("p")
    paragraph.innerHTML = "<a><u>Clear this playlist</u></a>"
    paragraph.style = "cursor:pointer"
    paragraph.onclick = () => {
        setInterval(function () {
            let video = document.getElementsByTagName('ytd-playlist-video-renderer')[0];

            video.querySelector('#primary button[aria-label="Action menu"]').click();

            var things = document.evaluate(
                '//span[contains(text(),"Remove from")]',
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );

            for (var i = 0; i < things.snapshotLength; i++)
            {
                things.snapshotItem(i).click();
            }
        }, 250);
    }

    descriptionSpan.appendChild(paragraph)
    }, 3000)
})();