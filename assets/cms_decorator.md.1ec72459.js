import{_ as s,c as a,o,a as n}from"./app.678139a5.js";const A=JSON.parse('{"title":"Class Cog V2","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview"}],"relativePath":"cms/decorator.md","lastUpdated":1658503555000}'),e={name:"cms/decorator.md"},l=n(`<h1 id="class-cog-v2" tabindex="-1">Class Cog V2 <a class="header-anchor" href="#class-cog-v2" aria-hidden="true">#</a></h1><p>Class Cog V2 is a new feature that is introduced along Cocoa Discord Utils V2</p><div class="info custom-block"><p class="custom-block-title">NOTE</p><p>Class Cog V2 is currently only available for Slash Command only</p></div><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>In Class Cog V1, I have not take use of decorators that much. In V2 I am redesigning the syntax of it. Yet, it will still eventually be compiled down to Object Cog for few main reasons</p><ul><li>Object Code is closest to Discord API Format. Also for compatibility with other type of commands.</li><li>For cases where the new syntax does not support some types of command, you can still use older syntax to accomplish that with zero conflict.</li><li>I&#39;m lazy to rewrite them</li></ul><p>The syntax now look something like this</p><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">SlashCommand</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">The command that say hi to specific person</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">async </span><span style="color:#82AAFF;">sayhi</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    ctx: SlashCommand</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    @Param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">String</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Message to say</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Choices</span><span style="color:#A6ACCD;">([</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Gay</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Bruh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">])</span></span>
<span class="line"><span style="color:#A6ACCD;">    msg: Param</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">String</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Type</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    @Param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">User</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">User to greet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    user: Param</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">User</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    @Param</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Integer</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Optional Parameter</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">required</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    opt: Param</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Integer</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Nullable</span></span>
<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// handle the interaction</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>required</code> is default to <code>true</code>, while <code>autocomplete</code> is default to <code>false</code></p><p>Use <code>Param.[Type].Nullable</code> if you have set <code>required</code> to <code>false</code></p></div><p>This can now help you get rids of calling multiple functions to get the parameters and avoid you from messing with <code>SlashCommandBuilder</code>, keep your code declarative, easy and fin to read.</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>Parameter Decorators are not type safe, meaning TypeScript will not complain if you put in the wrong type. Make sure to annotate it with the correct type!</p></div>`,11),p=[l];function t(c,r,i,y,D,C){return o(),a("div",null,p)}var F=s(e,[["render",t]]);export{A as __pageData,F as default};