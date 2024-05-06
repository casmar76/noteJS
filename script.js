document.addEventListener('DOMContentLoaded', function () {
    (function () {
        // Extracting URL parameters
        var urlParams = new URLSearchParams(window.location.search);

        // Function to replace spaces with '_s_' and '-' with '_d_'
        function replaceSpacesAndDashes(inputString) {
            return inputString.replace(/ /g, '_s_').replace(/-/g, '_d_').replace(/\//g, '');
        }

        // Get values of 'gclid', 'msclkid', or 'fbclid'
        var adCampaignId = urlParams.get('gclid') || urlParams.get('msclkid') || urlParams.get('fbclid');

        // If there are URL parameters, update links on the page
        if (urlParams.toString()) {
            var pageLinks = document.getElementsByTagName('a');

            // Loop through all links on the page
            for (var linkIndex = 0; linkIndex < pageLinks.length; linkIndex++) {
                var currentLink = pageLinks[linkIndex];
                var anchorHash = currentLink.hash;
                var linkHref = currentLink.href.split('#')[0];
                var linkSearchParams = new URL(linkHref, document.location.href).searchParams;

                // Set 'campaignId' to 'adCampaignId' or obfuscated 'adCampaignId' if 'tid' exists
                var modifiedCampaignId = adCampaignId;

                if (linkSearchParams.has('tid') && adCampaignId) {
                    modifiedCampaignId = replaceSpacesAndDashes(adCampaignId);
                }

                // Replace placeholders with the value of 'modifiedCampaignId' in the link
                if (modifiedCampaignId) {
                    linkHref = linkHref.replace('[sclid]', modifiedCampaignId).replace('%5Bsclid%5D', modifiedCampaignId);
                }

                // Append or update URL parameters in the link
                var paramString = urlParams.toString();
                if (linkHref.indexOf('?') === -1) {
                    linkHref += '?' + paramString;
                } else {
                    linkHref += '&' + paramString;
                }

                // Update the href attribute of the link
                currentLink.href = linkHref + anchorHash;
            }
        }
    })();
});
