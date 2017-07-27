
import { fromJS } from 'immutable';

export default {
    currentPage:1,
    article:false,
    blog:fromJS({
        loading: false,
        error: false,
        data:{
            sum:false,
            bloglist:false
        }
    }),
    async:fromJS({
        loading: false,
        error: false,
        currentUser: false,
        userData: {
            repositories: false,
        },
    })
};
