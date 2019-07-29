function zip(arrays) {
    return arrays[0].map(function(_, i) {
        return arrays.map(function(array) {
            return array[i];
        });
    });
}


function product() {
    var args = Array.prototype.slice.call(arguments); // makes array from arguments
    return args.reduce(function tl(accumulator, value) {
        var tmp = [];
        accumulator.forEach(function(a0) {
            value.forEach(function(a1) {
                tmp.push(a0.concat(a1));
            });
        });
        return tmp;
    }, [
        []
    ]);
}


function remove_cursor() {
    document.body.style.cursor = 'none';
    if (document.querySelector('.jspsych-content-wrapper') != null) {
        document.querySelector('.jspsych-content-wrapper').style.cursor = 'none';
    }
};

function show_cursor() {
    document.body.style.cursor = 'default';
    if (document.querySelector('.jspsych-content-wrapper') != null) {
        document.querySelector('.jspsych-content-wrapper').style.cursor = 'default';
    }
};

function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
};
