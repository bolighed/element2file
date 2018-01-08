# Element2File

Element2File is a tool that allows you to generate (and save) pre-rendered content given an url a selector

## How to use it

The config file looks like

```js
// config.js
module.exports = config = {
    base_path: '../backend/home/templates/home',
    components: [{
        viewport: {width: 600, height: 900, scale: 1},
        url: 'http://localhost:18000/bolig/aarhus-c/8000/thorvaldsensgade/1/1/th/sundhed',
        selector: '.home__menu-wrap--mobile',
        file_path: './home_menu_mobile.html'
    },{
        viewport: {width: 1600, height: 900, scale: 1},
        url: 'http://localhost:18000/bolig/aarhus-c/8000/thorvaldsensgade/1/1/th/sundhed',
        selector: '.home__menu-wrap',
        file_path: './home_menu.html'
    }]   
}
```

Note that you can set the viewport so you can save pre-render content for different screensize (mobile and desktop for exmaple).

you can run with

```sh
element2file -c config.js
```