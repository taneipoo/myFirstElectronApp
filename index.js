require('cat-picture');
var picture = require('cat-picture');

//We actually just want the source data for the picture, so get it, then remove the image from the page.
var src = picture.src
picture.remove();

var image = require('lightning-image-poly');

//Then render the image data we stored above by creating a new image visualization.
var viz = new image('#visualization', null, [src], {hullAlgorithm: 'convex'});

var remote = require('electron').remote;
var fs = require('fs');

//Function that will save the current window to a PDF.
    function save () {
      remote.getCurrentWindow().webContents.printToPDF({
        portrait: true
      }, function (err, data) {
        fs.writeFile('annotation.pdf', data, function (err) {
          if (err) alert('error generating pdf! ' + err.message);
          else alert('pdf saved!');
        });
      });
    }

//Event listener that will call your save() function when you press Ctrl+P.

    window.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.keyCode == 80) {
      save();
    }
    });
