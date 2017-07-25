
import { fromJS } from 'immutable';

export default {
    count:1,
    async:fromJS({
        loading: false,
        error: false,
        currentUser: false,
        userData: {
            repositories: false,
        },
    })
};
