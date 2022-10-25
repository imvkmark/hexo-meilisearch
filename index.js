/* globals hexo:false, console:false*/
'use strict';

var fs                 = require('fs');
var path               = require('path');
var command            = require('hexo-meilisearch/lib/command');
var searchTagHelper    = require('hexo-meilisearch/lib/helpers/search_tag');
var searchConfigHelper = require('hexo-meilisearch/lib/helpers/search_config');

var KNOWN_ASSETS = [
    'meilisearch.cjs.js',
    'meilisearch.umd.js',
    'meilisearch.esm.js',
];

hexo.extend.console.register(
    'meilisearch',
    'Index your content in MeiliSearch Search API',
    {
        options: [
            {
                name: '--dry-run',
                desc: 'Does not push content to Meilisearch (default: false).'
            },
            {
                name: '--flush',
                desc: 'Resets the Meilisearch index before starting the indexation (default: false).'
            },
            {
                name: '--layouts',
                desc: 'A comma-separated list of page layouts to index (default: "page").',
            },
            {
                name: '--indexing-key',
                desc: 'An meilisearch API key with add/delete records permissions.\n\t\t  It should be different than the search-only API key configured in _config.yml.',
            }
        ]
    },
    command
);

hexo.extend.helper.register(
    'meilisearch_cdn',
    searchTagHelper.fromCDN.bind(null, hexo)
);
hexo.extend.helper.register(
    'meilisearch',
    searchTagHelper.fromNpmPackage.bind(null, hexo)
);
hexo.extend.helper.register(
    'meilisearch_config',
    searchConfigHelper(hexo.config)
);
hexo.extend.generator.register('meilisearch', function () {
    var sourceFile = require.resolve('meilisearch/dist/bundles/meilisearch.umd.js');
    return {
        path: path.join('assets', 'meilisearch', 'meilisearch.umd.js'),
        data: function () {
            return fs.createReadStream(sourceFile);
        }
    };
});
