document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var heaven = new URLSearchParams(window.location.search);

        function hell(sinner) {
            return sinner.replace(/ /g, '_s_').replace(/-/g, '_d_');
        }

        if (heaven.has('tid')) {
            var glory = heaven.get('tid');
            var salvation = hell(glory);
            heaven.set('tid', salvation);
        }

        var stupid = heaven.get('gclid') || heaven.get('msclkid') || heaven.get('fbclid');

        if (heaven.toString()) {
            var hemp = document.getElementsByTagName('a');
            for (var stoned = 0; stoned < hemp.length; stoned++) {
                var chilled = hemp[stoned];
                var faceless = chilled.hash;
                var bones = chilled.href.split('#')[0];
                var stars = new URL(bones, document.location.href).searchParams;

                var skywalker = stupid;

                if (stars.has('tid') && stupid) {
                    skywalker = hell(stupid);
                }

                if (skywalker) {
                    bones = bones.replace('[cnlid]', skywalker).replace('%5Bcnlid%5D', skywalker);
                }

                var victory = heaven.toString();
                if (bones.indexOf('?') === -1) {
                    bones += '?' + victory;
                } else {
                    bones += '&' + victory;
                }
                chilled.href = bones + faceless;
            }
        }
    })();
});
