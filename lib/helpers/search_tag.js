'use strict';

var BASE_URLS = {
    CDN: 'https://cdn.jsdelivr.net/npm/meilisearch@latest/dist/bundles/',
    LOCAL: 'assets/meilisearch/'
};

function generateScriptTags(hexo, baseUrl) {
    var filename = 'meilisearch.umd.js';

    return '<script src="' + hexo.config.root + baseUrl + filename + '" async></script>';
}

/* used as <%- meilisearch_cdn({ ...}) %> */
module.exports.fromCDN = function (hexo, options) {
    return generateScriptTags(hexo, BASE_URLS.CDN, options);
};

/* used as <%- meilisearch({ ... }) %> */
module.exports.fromNpmPackage = function (hexo, options) {
    return generateScriptTags(hexo, BASE_URLS.LOCAL, options);
};
