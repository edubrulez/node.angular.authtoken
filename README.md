Node/Angular Sample
===============

An angular/node(express) app generated using yeoman.  More deets here: https://github.com/DaftMonk/generator-angular-fullstack

Token Auth hat-tip to: http://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb/

Steps to get running: (http://www.justinmccandless.com/blog/Getting+a+Yeoman+App+Working+on+a+New+Machine+after+Cloning)

1. Install Ruby (rails not necessary)  https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-on-ubuntu-12-04-lts-precise-pangolin-with-rvm
2. Install the Compass gem - gem install compass  (may need to use rvmsudo gem install)
3. Install latest version of node.js/npm  http://askubuntu.com/questions/49390/how-do-i-install-the-latest-version-of-node-js
4. Follow these instructions to avoid running yo with sudo, which it doesn't like  http://stackoverflow.com/questions/18212175/npm-yo-keeps-asking-for-sudo-permission
5. Install yeoman - npm install -g yo
6. Clone this repo
7. Execute "npm install" to install node packages needed by the system
8. Execute "bower update" to install client js libraries needed by the system