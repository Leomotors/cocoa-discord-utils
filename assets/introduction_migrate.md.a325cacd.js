import{_ as e,c as a,o,a as i}from"./app.b9357a90.js";const _=JSON.parse('{"title":"Migration from Version 1","description":"","frontmatter":{},"headers":[{"level":2,"title":"Summary","slug":"summary"},{"level":2,"title":"Activity and Loader","slug":"activity-and-loader"}],"relativePath":"introduction/migrate.md","lastUpdated":1658192085000}'),d={name:"introduction/migrate.md"},t=i('<h1 id="migration-from-version-1" tabindex="-1">Migration from Version 1 <a class="header-anchor" href="#migration-from-version-1" aria-hidden="true">#</a></h1><p>Version 2 has many changes, it also upgraded to discord.js 14 so you can expect changes from discord.js too</p><div class="warning custom-block"><p class="custom-block-title">Note</p><p>Not all changes are noted here</p></div><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-hidden="true">#</a></h2><ul><li><p>Type Name and Builders Stuff changed in discord.js</p></li><li><p>Many Type Name has been renamed</p></li><li><p>Added many new mechanism</p></li><li><p>TypeScript should be able to tell you that this no longer works</p></li></ul><h2 id="activity-and-loader" tabindex="-1">Activity and Loader <a class="header-anchor" href="#activity-and-loader" aria-hidden="true">#</a></h2><ul><li><p><code>useActivity()</code> and <code>useActivityGroup()</code> is removed, use <code>ActivityManager</code> instead.</p></li><li><p>loader&#39;s <code>getRandom()</code> now returns <code>T | undefined</code></p></li><li><p><code>Loader</code> is renamed to <code>ArrayLoader</code></p></li><li><p><code>Loader</code> is added to handle Object (<code>{}</code>)</p></li></ul>',7),r=[t];function n(c,s,l,p,m,h){return o(),a("div",null,r)}var y=e(d,[["render",n]]);export{_ as __pageData,y as default};
