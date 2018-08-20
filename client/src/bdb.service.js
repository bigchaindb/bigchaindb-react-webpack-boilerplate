import * as driver from 'bigchaindb-driver';

let conn;

// Post transaction to BigchainDB
export async function postTransaction() {
  await _getConnection();

  const aliceKeypair = new driver.Ed25519Keypair()

  const condition = driver.Transaction.makeEd25519Condition(aliceKeypair.publicKey, true);

  const output = driver.Transaction.makeOutput(condition);
  output.public_keys = [aliceKeypair.publicKey];

  // define asset and metadata
  const asset = {
    'timestamp': new Date()
  };
  const metadata = {
    'random_data': Math.random(0, 1)
  };

  const transaction = driver.Transaction.makeCreateTransaction(
    asset,
    metadata,
    [output],
    aliceKeypair.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(transaction, aliceKeypair.privateKey);

  try {
    let tx = await conn.postTransaction(txSigned)
    alert("transaction hash: "+tx.id)
    return tx
  } catch (error) {
    console.error(error);
    return false
  }
}


// creates a connection to BDB server
export async function _getConnection() {
  if (!conn) {
    conn = new driver.Connection("http://localhost:9984/api/v1/");
  }
}