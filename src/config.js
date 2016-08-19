module.exports = {
	env: 'PRODUCTION',
    paths: {
        src: './',
    	mainStyle: 'scss/style.scss',
        sass: 'scss/**/*.scss',
        sassDirectory: 'scss',
        svg: 'images/svg/*.svg',
        dist: '../dist/',
        js: 'js/**/*',
        html: '*.html'
    },
    webpack: {
    	mainEntry: './js/app.js'
    }
};
