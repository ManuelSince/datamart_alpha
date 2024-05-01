const rand = function () {
  return Math.random().toString(36).substr(2); // remove `0.`
};

const token = function (name: string) {
  return rand() + rand() + rand() + name; // to make it longer
};

//token(); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"

function generate_token(length) {
  //edit the token allowed characters
  var a =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  var b = [] as Array<Number>;
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
}

export { token, generate_token };
