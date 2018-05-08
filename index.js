//Still haven't started yet. Just setting up my environment.
const Steem = require('steem');
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
        console.log(value);
      }
    });
  });