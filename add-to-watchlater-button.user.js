// ==UserScript==
// @name         Add to Watch Later
// @namespace    http://tampermonkey.net/
// @version      2024-06-25
// @description  Adds a button beneath most videos which allows you to add a video to watch later with one click, instead of 2.
// @author       lugosieben
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    var addedButtons = []
    function run() {
        var metadataElements = document.getElementsByTagName('ytd-video-meta-block')

        for (const span of addedButtons) {
             span.remove()
        }
        addedButtons = []

        for (const block of metadataElements) {
            let a = document.createElement('a')
            a.class = "inline-metadata-item style-scope ytd-video-meta-block"
            a.innerHTML = "Add to Watch Later"
            a.href = "javascript:null"
            a.style = "color:#606060;"
            a.onclick = () => {
                event.stopPropagation()
                var details = a.parentNode.parentNode.parentNode
                if (details.id != "meta") { details = details.parentNode.parentNode } // Handle Sidebar on Video Player
                var threeDotButton = details.querySelector('#button button[aria-label="Action menu"]')
                threeDotButton.click()
                setTimeout(() => { // Clicks the "Save to Watch Later" button after 300 ms
                    var xpath = '//yt-formatted-string[contains(@class, "ytd-menu-service-item-renderer") and contains(text(), "Save to Watch Later")]'
                    var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                    var addButton = result.singleNodeValue
                    addButton.click()
                }, 300)
                return true
            }
            block.appendChild(a)
            addedButtons.push(a)
        }
    }

    run()
    setInterval(run, 3000) // Refreshes the buttons every 3 seconds so that content in the infinite scroll has the button aswell.
})();
