import React from 'react';
import axios from 'axios';

class InfiniteNTFNS extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            notifications: [],
            hasMore: true,
            offset: 0,
            limit: 5,
        };
        window.onscroll = () => {
            const {state: {error, loading, hasMore} } = this;
            if (error || loading || !hasMore) return;
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop ===
                document.documentElement.clientHeight
                )
        }

        loadNotifications = () => {
            this.setState({ loading: True}, () => {
                const { offset, limit} = this.state;
                axios.get(
                    `http://127.0.0.1:8000/infinite-api/?limit=${limit}&offset=${offset}`
                )
                .then(res => {
                    const newNotifications = res.data.notification;
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

export default InfiniteNTFNS;