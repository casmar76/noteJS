document.addEventListener('DOMContentLoaded', () => {
    (function () {
        const urlParams = new URLSearchParams(window.location.search);

        // Function to replace spaces with '_s_', dashes with '_d_', and remove slashes
        const replaceSpacesAndDashes = (inputString) =>
            inputString.replace(/ /g, '_s_').replace(/-/g, '_d_').replace(/\//g, '');

        // If 'tid' parameter exists, replace its value and set it back
        if (urlParams.has('tid')) {
            const originalTid = urlParams.get('tid');
            const replacedTid = replaceSpacesAndDashes(originalTid);
            urlParams.set('tid', replacedTid);
        }

        // Get values of 'gclid', 'wbraid', 'msclkid', or 'fbclid' from the URL parameters
        const adCampaignId = urlParams.get('gclid') || urlParams.get('wbraid') || urlParams.get('msclkid') || urlParams.get('fbclid');
        let modifiedCampaignId = adCampaignId;

        if (adCampaignId && urlParams.has('tid')) {
            modifiedCampaignId = replaceSpacesAndDashes(adCampaignId);
        }

        // Create the updated URL parameters string once
        const updatedUrlParamsString = urlParams.toString();

        if (updatedUrlParamsString) {
            const pageLinks = document.querySelectorAll('a');

            pageLinks.forEach((link) => {
                const anchorHash = link.hash;
                let linkHref = link.href.split('#')[0];

                // Replace placeholders with the value of 'modifiedCampaignId' in the link
                if (modifiedCampaignId) {
                    linkHref = linkHref.replace('[sclid]', modifiedCampaignId).replace('%5Bsclid%5D', modifiedCampaignId);
                }

                // Append or update URL parameters in the link
                if (!linkHref.includes('?')) {
                    linkHref += '?' + updatedUrlParamsString;
                } else {
                    linkHref += '&' + updatedUrlParamsString;
                }

                // Update the href attribute of the link
                link.href = linkHref + anchorHash;
            });
        }
    })();
});
