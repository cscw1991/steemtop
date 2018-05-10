//Still haven't started yet. Just setting up my environment.
const Steem = require('steem');
var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'steemtop';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'data',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'green',
    bg: 'black',
    border: {
      fg: 'green'
    },
    hover: {
      bg: 'green'
    }
  }
});

// Append our box to the screen.
screen.append(box);

// Add a png icon to the box
var icon = blessed.image({
  parent: box,
  top: 0,
  left: 0,
  type: 'overlay',
  width: 'shrink',
  height: 'shrink',
  file: __dirname + 'favicon.png',
  search: false
});

// If our box is clicked, change the content.
box.on('click', function(data) {
  box.setContent('Some different content');
  screen.render();
});


// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

Steem.api.streamBlock(function (err, block) {
  block.transactions.forEach(transaction => {
    if(transaction.operations[0][0]==='transfer'
) {
      const {timestamp, block_id} = block;
      const value = {
        trx_id: transaction.transaction_id,
        block: block_id,
        timestamp: timestamp,
        op: transaction.operations[0],
      }
      box.setText(value.trx_id);
      box.pushLine(value.block);
      box.pushLine(value.timestamp);
      // Render the screen.
      screen.render();
    }
  });
});
