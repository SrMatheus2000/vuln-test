function unique_name_710 (jQuery, window) {
    "use strict";
    /**
     * Indictaes whether we have already completed
     * the initialisation of the hash
     *
     * @access private
     */
    var ready = false;
    /**
     * Stores a hash that needed to be set when we were not ready
     *
     * @access private
     */
    var savedHash = "";
    /**
     * Flag to indicate if the change of hash was triggered
     * by a user pressing the back/forward button or if
     * the change was triggered internally
     *
     * @access private
     */
    var userChange = true;

    // Fix favicon disappearing in Firefox when setting location.hash
    function resetFavicon() {
        if (jQuery.browser.mozilla) {
            // Move the link tags for the favicon to the bottom
            // of the head element to force a reload of the favicon
            $('head > link[href=favicon\\.ico]').appendTo('head');
        }
    }

    /**
     * Sets the hash part of the URL
     *
     * @access public
     */
    function setUrlHash(index, hash) {
        /*
         * Known problem:
         * Setting hash leads to reload in webkit:
         * http://www.quirksmode.org/bugreports/archives/2005/05/Safari_13_visual_anomaly_with_windowlocationhref.html
         *
         * so we expect that users are not running an ancient Safari version
         */

        userChange = false;
        if (ready) {
            window.location.hash = "PMAURL-" + index + ":" + hash;
            resetFavicon();
        } else {
            savedHash = "PMAURL-" + index + ":" + hash;
        }
    }
    /**
     * Start initialisation
     */
    if (window.location.hash.substring(0, 8) == '#PMAURL-') {
        // We have a valid hash, let's redirect the user
        // to the page that it's pointing to
        window.location = window.location.hash.substring(
            window.location.hash.indexOf(':') + 1
        );
    } else {
        // We don't have a valid hash, so we'll set it up
        // when the page finishes loading
        jQuery(function () {
            /* Check if we should set URL */
            if (savedHash !== "") {
                window.location.hash = savedHash;
                savedHash = "";
                resetFavicon();
            }
            // Indicate that we're done initialising
            ready = true;
        });
    }
    /**
     * Register an event handler for when the url hash changes
     */
    jQuery(function () {
        jQuery(window).hashchange(function () {
            if (userChange === false) {
                // Ignore internally triggered hash changes
                userChange = true;
            } else if (/^#PMAURL-\d+:/.test(window.location.hash)) {
                // Change page if the hash changed was triggered by a user action
                var index = window.location.hash.substring(
                    8, window.location.hash.indexOf(':')
                );
                AJAX.cache.navigate(index);
            }
        });
    });
    /**
     * Publicly exposes a reference to the otherwise private setUrlHash function
     */
    return setUrlHash;
}