# PVS02 Capstone Project Documentation

All documentation for the project, ranging from project artifacts to guides for setup of dev tools, etc.

For full documentation visit [mkdocs.org](http://mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs help` - Print this help message.

## Tips 'n' tricks

* Inline code snippets with back-ticks  
    * \`npm install stuff\`  
    `npm install stuff`
* Multi-line code blocks with triple back-ticks
    * \`\`\`  
npm install stuff  
npm install morestuff  
\`\`\`
```
npm install stuff
npm install morestuff
```
* Forcing a new line, but not new paragraph, using two+ spaces at end of line (e.g. putting code snippet on its own line)  
    * Here's my code:[Enter]
`code`  
vs
    * Here's my code:[space][space][Enter]  
`code`  

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
		about.md  # The about section.
        setup.md  # Instructions for setting up a dev environment.
