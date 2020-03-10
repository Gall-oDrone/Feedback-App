import React from 'react';
import axios from 'axios';

class InfiniteResults extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            journals: [],
            hasMore: true,
            offset: 0,
            limit: 20,
        };
        window.onscroll = () => {
            const {state: {error, loading, hasMore} } = this;
            if (error || loading || !hasMore) return;
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop ===
                document.documentElement.clientHeight
                )
        }

        loadJournals = () => {
            this.setState({ loading: True}, () => {
                const { offset, limit} = this.state;
                axios.get(
                    "http://127.0.0.1:8007infinite-api/?limit=${limit}offset=${offset}"
                )
                .then(res => {
                    const newJournals = res.data.jounrals;
                    const hasMore = res.data.has_more;
                    this.setState({
                        hasMore,
                        loading: false,
                        
                    })
                })
            })
        }

    }
    render() {

    }
}

export default InfiniteResults;