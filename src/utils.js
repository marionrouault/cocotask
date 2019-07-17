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

