import{_ as s,c as a,o as n,a as o}from"./app.40ff00ae.js";const A=JSON.parse('{"title":"Class Cog V2","description":"","frontmatter":{},"headers":[{"level":2,"title":"Table of Contents","slug":"table-of-contents"},{"level":2,"title":"Overview","slug":"overview"}],"relativePath":"cms/decorator.md","lastUpdated":1656184341000}'),e={name:"cms/decorator.md"},l=o(`<h1 id="class-cog-v2" tabindex="-1">Class Cog V2 <a class="header-anchor" href="#class-cog-v2" aria-hidden="true">#</a></h1><p><strong>Note</strong>: Class Cog V2 is currently only available for Slash Command Only</p><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-hidden="true">#</a></h2><nav class="table-of-contents"><ul><li><a href="#table-of-contents">Table of Contents</a></li><li><a href="#overview">Overview</a></li></ul></nav><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>In Class Cog V1, I have not take use of decorators that much. In V2 we are redesigning the syntax of it. Yet, it will still eventually be compiled down to Object Cog for few main reasons</p><ul><li>For compatibility with other type of commands.</li><li>For cases where the new syntax does not support some types of command, you can still use older syntax to accomplish that with zero conflict.</li><li>I&#39;m lazy to rewrite them</li></ul><p>The syntax now look something like this</p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">SlashCommand</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">The command that say hi to specific person</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">async </span><span style="color:#82AAFF;">sayhi</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    ctx: SlashCommand</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    @Param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">String</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Message to say</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Choices</span><span style="color:#A6ACCD;">([</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Gay</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Bruh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">])</span></span>
<span class="line"><span style="color:#A6ACCD;">    msg: Param</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">String</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Type</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    @Param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">User</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">User to greet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    user: Param</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">User</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Type</span></span>
<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// handle the interaction</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>This can now help you get rids of calling multiple functions to get the parameters and avoid you from messing with <code>SlashCommandBuilder</code></p>`,10),t=[l];function p(r,c,i,y,D,C){return n(),a("div",null,t)}var d=s(e,[["render",p]]);export{A as __pageData,d as default};
