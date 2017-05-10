import alt from '../util/alt';


class VoteActions {
    constructor() {
        this.generateActions(
            'fetchVoteList',
            'successFetchVoteList',
            'flushVoteList'
        );
    }
}

export default alt.createActions(VoteActions);
