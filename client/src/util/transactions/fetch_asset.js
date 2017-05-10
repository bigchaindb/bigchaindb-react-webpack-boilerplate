import * as driver from 'js-bigchaindb-driver';

import { BDB_API_PATH } from '../../constants/application_constants';
import TransactionActions from '../../actions/transaction_actions';


export default function fetchAsset(assetId, publicKey) {
    if (assetId) {
        setTimeout(() => {
            driver.Connection.pollStatusAndFetchTransaction(assetId, BDB_API_PATH)
                .then(() => {
                    if (publicKey)
                        TransactionActions.fetchOutputList({
                            public_key: publicKey,
                            unspent: true
                        });
                    if (assetId)
                        TransactionActions.fetchTransactionList({
                            assetId
                        });
                })
        }, 1000);
    }
}