Application Setup Instructions
===========
1. Ensure node and phantomjs are installed
2. run 'npm install'
3. run 'grunt'

Note: Run tests with a timeout of at least 15000ms, ie: 'mocha spec/ --timeout 15000'


The Problem
===========
Create an HTML form that submits a URL from a text input to the server via AJAX. The server should then determine what version(s) of jQuery the site at that URL uses, if any. The client should then display the version(s) to the user, or a message saying "jQuery is not used at this site".

Guidelines
-----------
This should be implemented in a language with which you are familiar.
We would prefer that you use javascript, ruby or python(in that order), if you are comfortable doing so.
If none of these are comfortable, please choose a language that is both comfortable for you and suited to the task.

If you use other libraries installed by a common package manager (rubygems/bundler, npm, pip), it is not necessary to commit the installed packages.

We write automated tests and we would like you to do so as well.

We appreciate well factored, object-oriented or functional designs.

If there are any complicated setup steps necessary to run your solution, please document them.
