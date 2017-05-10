import React from 'react';
import moment from 'moment';
import { safeInvoke, safeMerge } from 'js-utility-belt/es6';
import * as driver from 'js-bigchaindb-driver';

import TransactionActions from '../actions/transaction_actions';
import TransactionStore from '../stores/transaction_store';

import BaseComponent from './base_component';

import fetchAsset from '../util/transactions/fetch_asset';


class App extends BaseComponent {
    constructor() {
        super();
        this._bind(
            'onChange',
            'createNewAccount'
        );
        const transactionStore = TransactionStore.getState();

        this.state = safeMerge(
            {
                activeAccount: null
            },
            transactionStore
        )
    }

    componentDidMount() {
        TransactionStore.listen(this.onChange);
    }

    componentWillUnmount() {
        TransactionStore.unlisten(this.onChange)
    }

    onChange(state) {
        this.setState(state);
    }

    createNewAccount() {
        const account = new driver.Ed25519Keypair();
        // TIP: It's also possible to derive a keypair from a secret (not super-safe/prod-ready though)
        // const account = new driver.Ed25519Keypair(secret);
        account.name = 'Wrigley';
        this.setState({
            activeAccount: account
        });

        TransactionActions.fetchOutputList({
            public_key: account.publicKey,
            unspent: true
        });
    }

    createTransaction(account) {

        // define some random assets and metadata
        const asset = {
            'timestamp': moment().format('X')
        };

        const metadata = {
            'random_data': Math.random(0, 1)
        };

        // construct a CREATE transaction
        const transaction = driver.Transaction.makeCreateTransaction(
            asset,
            metadata,
            [
                driver.Transaction.makeOutput(
                    driver.Transaction.makeEd25519Condition(
                        account.publicKey
                    )
                )
            ],
            account.publicKey
        );

        // sign the transaction
        const signedTransaction = driver.Transaction.signTransaction(
            transaction,
            account.privateKey
        );

        // send the transaction to BigchainDB
        TransactionActions.postTransaction(signedTransaction);
        // poll the status, fetch and update the Alt Store (will trigger a re-render)
        fetchAsset(signedTransaction.id, account.publicKey);
    }

    render() {
        const {
            activeAccount,
            transactionMap,
            transactionList,
            unspentOutputs
        } = this.state;


        // filter the unspent outputs (UTXO) for this account that are fetched
        const unspentsForAccount = (
            unspentOutputs
            && activeAccount
            && unspentOutputs[activeAccount.publicKey]
        ) ? unspentOutputs[activeAccount.publicKey] : [];

        //
        const transactionsForAccount =
            unspentsForAccount
                .map((transactionId) => {
                    return transactionMap[transactionId];
                });

        return (
            <div className="app--container">
                {
                    activeAccount ?
                        <div>
                            Logged in as {activeAccount.name}: {activeAccount.publicKey}
                        </div> :
                        <button className="button button--secondary"
                            onClick={this.createNewAccount}>
                            Create Account
                        </button>
                }
                {
                    !!activeAccount &&
                        <div>
                            <button className="button button--secondary"
                                onClick={() => this.createTransaction(activeAccount)}>
                                Create Transaction
                            </button>
                            <div>
                                {
                                    transactionsForAccount.map((transaction) => {
                                        return (
                                            <div key={transaction.id}>
                                                { transaction.id }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                }

            </div>
        );
    }
}

export default App;
