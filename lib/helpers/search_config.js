'use strict';

module.exports = function (hexoConfig) {
    return function () {
        var meilisearch = hexoConfig.meilisearch;

        return (
            '<meta property="meilisearch' +
            '" data-host="' +
            meilisearch.host +
            '" data-search-key="' +
            meilisearch.searchKey +
            '" data-index-name="' +
            meilisearch.indexName +
            '">'
        );
    };
};
