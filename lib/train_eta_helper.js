var TrainEtaHelper = {
  parseEtas: function(etas) {
 
    var adjustedEtas = [];

    for (var i = 0; i < etas.length; i++) {
      adjustedEtas.push([
        etas[i].rt[0],
        etas[i].staNm[0],
        etas[i].stpDe[0],
        etas[i].arrT[0],
      ]);
    }
    return adjustedEtas;
  }
}

module.exports = TrainEtaHelper;
