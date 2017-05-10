import * as driver from 'js-bigchaindb-driver';

import { BDB_API_PATH } from '../constants/application_constants';

import VoteActions from '../actions/vote_actions';


const VoteSource = {
    lookupVoteList: {
        remote(state) {
            const {block_id} = state.voteMeta;
            // fetch votes for block
            return driver.Connection.listVotes(block_id, BDB_API_PATH);
        },

        success: VoteActions.successFetchVoteList,
        error: VoteActions.errorVoteList
    }
};

export default VoteSource;
