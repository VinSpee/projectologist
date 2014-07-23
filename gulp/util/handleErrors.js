var notify = require('gulp-notify');

module.exports = function(exit) {

  return function() {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    // 
    if(exit !== true) {
      this.emit('end');
    }

  }.bind(this);
  
};


