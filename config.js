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