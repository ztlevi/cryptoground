import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { List, Avatar, Button } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userActions from '../actions/user';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      leaderBoard: [],
      length: 10,
    };
  }

  componentDidMount() {
    this.props.onLoadLeaderBoard();
    this.setState({
      loading: false,
    });
  }

  onLoadMore = () => {
    console.log(this.props.leaderBoard);
    console.log('loading more');
    this.setState(
      {
        loadingMore: true,
        length: this.state.length + 5,
        leaderBoard: this.props.leaderBoard.slice(
          0,
          Math.min(this.state.length + 5, this.props.leaderBoard.length)
        ),
      },
      () => {
        window.dispatchEvent(new Event('resize'));
      }
    );
  };

  render() {
    const { loading, loadingMore, showLoadingMore, leaderBoard } = this.state;
    const loadMore = showLoadingMore ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {/**{loadingMore && <Spin />}**/}
        {true && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return (
      <div
        style={{
          width: '85%',
          margin: '10px',
          boxAlign: 'center',
          position: 'relative',
          left: '5%',
        }}
      >
        <h4 style={{ textAlign: 'center' }}>Leading Board</h4>
        <p
          style={{
            fontSize: 20,
            fontStyle: 'bold',
            borderBottom: 'solid',
            borderWidth: 2,
            borderBottomColor: 'rgb(1,21,41)',
          }}
        >
          Rank
          <span style={{ marginLeft: '18%', marginRight: '10%' }}>
            Username
          </span>
          <span style={{ marginLeft: '1%', marginRight: '5%' }}>
            USD balance
          </span>
          <span style={{ marginLeft: '7%', marginRight: '5%' }}>
            BCT balance
          </span>
          <span style={{ marginLeft: '5%', marginRight: '3%' }}>
            Total balance
          </span>
        </p>
        <List
          style={{ width: '100%', margin: '10 10 10 10' }}
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={leaderBoard}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={item.userName} />
              <div
                style={{
                  fontSize: '20px',
                  marginLeft: '20%',
                  marginRight: '20%',
                }}
              >
                {item.userName}
              </div>
              <div
                style={{
                  fontSize: '20px',
                  marginLeft: '15%',
                  marginRight: '15%',
                }}
              >
                Content
              </div>
              <div
                style={{
                  fontSize: '20px',
                  marginLeft: '15%',
                  marginRight: '15%',
                }}
              >
                Content
              </div>
              <div
                style={{
                  fontSize: '20px',
                  marginLeft: '15%',
                  marginRight: '15%',
                }}
              >
                Content
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

LeaderBoard.propTypes = {
  leaderBoard: PropTypes.array,
  rank: PropTypes.number,
  onLoadLeaderBoard: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    leaderBoard: state.leaderBoard.leaderBoard,
    rank: state.leaderBoard.rank,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLeaderBoard: () => dispatch(userActions.sagaSyncLeaderBoard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
