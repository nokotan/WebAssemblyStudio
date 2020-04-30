// Auto-generated code by file_packager.py
var Module = typeof Module !== 'undefined' ? Module : {};
  
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
  var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'main.data';
    var REMOTE_PACKAGE_BASE = 'main.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
  
    var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
    var PACKAGE_UUID = metadata['package_uuid'];
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      fetch(packageName).then(
        response => response.arrayBuffer()
      ).then(
        buffer => callback(buffer)
      ).catch(
        e => { throw new Error("NetworkError for: " + packageName + " " + e); }
      )
    };

    function handleError(error) {
      console.error('package error:', error);
    };
    
    var fetchedCallback = null;
    var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

    if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
      
    function runWithFS() {
  
      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('/', 'resources', true, true);
      Module['FS_createPath']('/resources', 'engine', true, true);
      Module['FS_createPath']('/resources/engine', 'emoji', true, true);
      Module['FS_createPath']('/resources/engine', 'font', true, true);
      Module['FS_createPath']('/resources/engine/font', 'fontawesome', true, true);
      Module['FS_createPath']('/resources/engine/font', 'mplus', true, true);
      Module['FS_createPath']('/resources/engine/font', 'noto', true, true);
      Module['FS_createPath']('/resources/engine', 'lib', true, true);
      Module['FS_createPath']('/resources/engine/lib', 'mpg123', true, true);
      Module['FS_createPath']('/resources/engine', 'nlp', true, true);
      Module['FS_createPath']('/resources/engine/nlp', 'japanese', true, true);
      Module['FS_createPath']('/resources/engine/nlp/japanese', 'jumanpp', true, true);
      Module['FS_createPath']('/resources/engine', 'objdetect', true, true);
      Module['FS_createPath']('/resources/engine/objdetect', 'haarcascade', true, true);
      Module['FS_createPath']('/resources/engine', 'shader', true, true);
      Module['FS_createPath']('/resources/engine', 'soundfont', true, true);
      Module['FS_createPath']('/resources/engine', 'texture', true, true);
      Module['FS_createPath']('/resources/engine/texture', 'box-shadow', true, true);

      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;

          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['removeRunDependency']('fp ' + that.name);

          this.requests[this.name] = null;
        }
      };
  
      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio']).open('GET', files[i]['filename']);
      }
  
      function processPackageData(arrayBuffer) {
        Module.finishedDataFileDownloads++;
        assert(arrayBuffer, 'Loading data file failed.');
        // FIXME: fetched .data file in WebAssembly Studio is not recognized as ArrayBuffer
        // assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
  
        DataRequest.prototype.byteArray = byteArray;

        var files = metadata['files'];
        for (var i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_main.data');
      };

      Module['addRunDependency']('datafile_main.data');
      
      if (!Module.preloadResults) Module.preloadResults = {}; 
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }   
    }

    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    } 
  }
  loadPackage({"files": [{"start": 0, "audio": 0, "end": 26004, "filename": "/resources/engine/emoji/noto7_dictionary.dat"}, {"start": 26004, "audio": 0, "end": 27552, "filename": "/resources/engine/font/fontawesome/LICENSE.txt"}, {"start": 27552, "audio": 0, "end": 232053, "filename": "/resources/engine/font/fontawesome/fontawesome-brands.otf.zstdcmp"}, {"start": 232053, "audio": 0, "end": 443659, "filename": "/resources/engine/font/fontawesome/fontawesome-solid.otf.zstdcmp"}, {"start": 443659, "audio": 0, "end": 444006, "filename": "/resources/engine/font/mplus/LICENSE_E"}, {"start": 444006, "audio": 0, "end": 1305259, "filename": "/resources/engine/font/mplus/mplus-1p-black.ttf.zstdcmp"}, {"start": 1305259, "audio": 0, "end": 2222464, "filename": "/resources/engine/font/mplus/mplus-1p-bold.ttf.zstdcmp"}, {"start": 2222464, "audio": 0, "end": 3154493, "filename": "/resources/engine/font/mplus/mplus-1p-heavy.ttf.zstdcmp"}, {"start": 3154493, "audio": 0, "end": 4009845, "filename": "/resources/engine/font/mplus/mplus-1p-light.ttf.zstdcmp"}, {"start": 4009845, "audio": 0, "end": 4877617, "filename": "/resources/engine/font/mplus/mplus-1p-medium.ttf.zstdcmp"}, {"start": 4877617, "audio": 0, "end": 5746478, "filename": "/resources/engine/font/mplus/mplus-1p-regular.ttf.zstdcmp"}, {"start": 5746478, "audio": 0, "end": 6483831, "filename": "/resources/engine/font/mplus/mplus-1p-thin.ttf.zstdcmp"}, {"start": 6483831, "audio": 0, "end": 6488132, "filename": "/resources/engine/font/noto/LICENSE_OFL.txt"}, {"start": 6488132, "audio": 0, "end": 10800931, "filename": "/resources/engine/font/noto/NotoColorEmoji.ttf.zstdcmp"}, {"start": 10800931, "audio": 0, "end": 11084655, "filename": "/resources/engine/font/noto/NotoEmoji-Regular.ttf.zstdcmp"}, {"start": 11084655, "audio": 0, "end": 12485447, "filename": "/resources/engine/lib/mpg123/libmpg123.so.0.44.8"}, {"start": 12485447, "audio": 0, "end": 12486049, "filename": "/resources/engine/nlp/japanese/jumanpp/LICENSE"}, {"start": 12486049, "audio": 0, "end": 14403297, "filename": "/resources/engine/nlp/japanese/jumanpp/jumanpp_v2"}, {"start": 14403297, "audio": 0, "end": 14447220, "filename": "/resources/engine/objdetect/haarcascade/eye.xml.zstdcmp"}, {"start": 14447220, "audio": 0, "end": 14534178, "filename": "/resources/engine/objdetect/haarcascade/eye_eyeglasses.xml.zstdcmp"}, {"start": 14534178, "audio": 0, "end": 14586377, "filename": "/resources/engine/objdetect/haarcascade/face_anime.xml.zstdcmp"}, {"start": 14586377, "audio": 0, "end": 14636589, "filename": "/resources/engine/objdetect/haarcascade/frontal_catface.xml.zstdcmp"}, {"start": 14636589, "audio": 0, "end": 14707767, "filename": "/resources/engine/objdetect/haarcascade/frontal_face_alt2.xml.zstdcmp"}, {"start": 14707767, "audio": 0, "end": 14707997, "filename": "/resources/engine/shader/copy.frag"}, {"start": 14707997, "audio": 0, "end": 14708212, "filename": "/resources/engine/shader/fullscreen_triangle.frag"}, {"start": 14708212, "audio": 0, "end": 14708468, "filename": "/resources/engine/shader/fullscreen_triangle.vert"}, {"start": 14708468, "audio": 0, "end": 14709359, "filename": "/resources/engine/shader/gaussian_blur_9.frag"}, {"start": 14709359, "audio": 0, "end": 14709811, "filename": "/resources/engine/shader/round_dot.frag"}, {"start": 14709811, "audio": 0, "end": 14710566, "filename": "/resources/engine/shader/sdf.frag"}, {"start": 14710566, "audio": 0, "end": 14710851, "filename": "/resources/engine/shader/shape.frag"}, {"start": 14710851, "audio": 0, "end": 14711466, "filename": "/resources/engine/shader/sprite.vert"}, {"start": 14711466, "audio": 0, "end": 14711934, "filename": "/resources/engine/shader/square_dot.frag"}, {"start": 14711934, "audio": 0, "end": 14712315, "filename": "/resources/engine/shader/texture.frag"}, {"start": 14712315, "audio": 0, "end": 18583617, "filename": "/resources/engine/soundfont/GMGSx.sf2.zstdcmp"}, {"start": 18583617, "audio": 0, "end": 18586172, "filename": "/resources/engine/texture/box-shadow/128.png"}, {"start": 18586172, "audio": 0, "end": 18586435, "filename": "/resources/engine/texture/box-shadow/16.png"}, {"start": 18586435, "audio": 0, "end": 18592074, "filename": "/resources/engine/texture/box-shadow/256.png"}, {"start": 18592074, "audio": 0, "end": 18592691, "filename": "/resources/engine/texture/box-shadow/32.png"}, {"start": 18592691, "audio": 0, "end": 18594060, "filename": "/resources/engine/texture/box-shadow/64.png"}, {"start": 18594060, "audio": 0, "end": 18594200, "filename": "/resources/engine/texture/box-shadow/8.png"}], "remote_package_size": 18594200, "package_uuid": "de5dbe87-8a4f-4dad-ae11-e01cc721d082"});
})();
  