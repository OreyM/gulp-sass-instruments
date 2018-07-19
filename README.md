Gulp engine for prototipe


Transformation SASS to CSS
HTML compression
JS compression
Images optimization
rem-to-px or px-to-rem function -> rem(10px)

Built-in packages
jquery#3.3.1
owl.carousel#2.3.4

Preparatory actions:

Check if you have installed:
- NODE
in console 'node -v'
- NPM
in console 'npm -v'
- BOWER
in console 'bower -v'

After clone, in gulp directory:
npm i

Compile dev:
gulp

Production compile
gulp build


Add new lib
bower i package name -> dir<lib-src>

include js files
in 'gulpfile.js' -> var 'config' -> object 'inputPath' -> object 'js'

inlude css\sass files
in '_lib.sass', from dir<sass> -> dir<sass-sr>
@import '../../lib-src/<lib-path>'

Remove lib
bower uninstall package name

Delete data in 'gulpfile.js' -> var 'config' -> object 'inputPath' -> object 'js'
Delete data in '_lib.sass', from dir<sass> -> dir<sass-sr>

Delete default lib

jQuery
bower uninstall jquery
delete 'dev/lib-src/jquery/dist/jquery.js' in 'gulpfile.js'

Owl Carousel
bower uninstall owl.carousel
delete
    @import "../../lib-src/owl.carousel/dist/assets/owl.carousel.css"
    @import "../../lib-src/owl.carousel/dist/assets/owl.theme.default.css"
    in '_lib.sass'

CLEAR INSTALL (for develop)
npm init   --> create  package.json

create gulpfile.js

npm i -g gulp   --- global install gulp

npm i --save-dev gulp gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-concat browser-sync gulp-uglifyjs gulp-cssnano gulp-rename