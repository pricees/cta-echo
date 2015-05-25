var DateHelper = {
  parse: function(str) {
    var dateParts = str.match(/(\d{4})(\d{2})(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
    dateParts = dateParts.splice(1);
    // I tried Date.apply(this, dateParts) alas it didn't work
    return new Date(dateParts[0],
        (+dateParts[1] - 1), // zero indexed months
        dateParts[2],
        dateParts[3],
        dateParts[4],
        dateParts[5]);
  },
  secondsTill: function(aTime, anotherTime) {
    if (!anotherTime) anotherTime = new Date();
    var timeDiff = (aTime.getTime() - anotherTime.getTime());
    return (timeDiff / 1000);
  },
  secondsToHuman: function(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);
    var str = ""
    if (minutes > 0) {
      str += minutes + " minutes and "
    }

    return  str + seconds + " seconds";
  }
}

module.exports = DateHelper;
