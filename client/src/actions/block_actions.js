import alt from '../util/alt';


class BlockActions {
    constructor() {
        this.generateActions(
            'fetchBlockList',
            'successFetchBlockList',
            'flushBlockList',
            'flushBlock',
            'fetchBlock',
            'successFetchBlock'
        );
    }
}

export default alt.createActions(BlockActions);
