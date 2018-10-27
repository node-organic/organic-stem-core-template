const getCells = require('organic-dna-cells-info')
module.exports = async function (cellName) {
  let rootDNA = await require('./load-root-dna')
  let cells = getCells(rootDNA.cells)
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].name === cellName) return cells[i]
  }
}
