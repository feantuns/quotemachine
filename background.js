// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  fetch(
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
  )
    .then(response => response.json())
    .then(response => {
      chrome.storage.local.set({
        quotes: response,
        quoteIndex: Math.floor(
          Math.random(0) * Math.floor(response.quotes.length),
        ),
      });
      chrome.declarativeContent.onPageChanged.removeRules(
        undefined,
        function() {
          chrome.declarativeContent.onPageChanged.addRules([
            {
              conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                  pageUrl: { hostContains: '' },
                }),
              ],
              actions: [new chrome.declarativeContent.ShowPageAction()],
            },
          ]);
        },
      );
    });
});
