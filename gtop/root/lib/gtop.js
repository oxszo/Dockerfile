var blessed = require('blessed'),
  contrib = require('blessed-contrib'),
  monitor = require('./monitor');


var screen = blessed.screen()
var grid = new contrib.grid({
  rows: 12,
  cols: 12,
  screen: screen
})

var netSpark = grid.set(0, 0, 5, 5, contrib.sparkline, {
  label: 'Network History',
  tags: true,
  style: {
    fg: 'blue'
  }
})

var diskDonut = grid.set(5, 0, 7, 5, contrib.donut, {
  radius: 8,
  arcWidth: 3,
  yPadding: 2,
  remainColor: 'black',
  label: 'Disk usage',
})

var procTable = grid.set(0, 5, 12, 7, contrib.table, {
  keys: true,
  label: 'Processes',
  columnSpacing: 1,
  columnWidth: [7, 24, 7, 7]
})

procTable.focus()

screen.render();
screen.on('resize', function(a) {
  netSpark.emit('attach');
  diskDonut.emit('attach');
  procTable.emit('attach');
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

function init() {
  new monitor.Net(netSpark);
  new monitor.Disk(diskDonut);
  new monitor.Proc(procTable); // no Windows support
}


process.on('uncaughtException', function(err) {
  // avoid exiting due to unsupported system resources in Windows
});

module.exports = {
  init: init,
  monitor: monitor
};
