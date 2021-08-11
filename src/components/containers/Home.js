import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { fetchContent, fetchMoreContent } from '../../actions/index';
import { list, home, noMatches } from '../../styles/Home.module.css';
import Movie from '../Movie';

const Home = (props) => {
  const {
    currentFilter, fetchContent, content, fetchMoreContent, contentURL,
  } = props;
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  useEffect(() => {
    if (currentFilter)fetchContent(currentFilter);
  }, [currentFilter, fetchContent]);

  useEffect(() => () => {
    setPage(2);
    setHasMore(true);
  }, [contentURL]);

  const loadMoreContent = () => {
    fetchMoreContent(page, setHasMore, setPage);
  };

  return (
    <div className={home}>
      <InfiniteScroll
        loadMore={loadMoreContent}
        hasMore={hasMore}
        initialLoad={false}
      >
        <ul className={list}>

          {content
           && content.map((item) => <Movie key={item.id} value={item} />)}
        </ul>
      </InfiniteScroll>
      {content && content.length === 0 && <p className={noMatches}>No matches found</p>}
    </div>
  );
};

Home.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  fetchContent: PropTypes.func.isRequired,
  content: PropTypes.arrayOf(PropTypes.object),
  fetchMoreContent: PropTypes.func.isRequired,
  contentURL: PropTypes.string.isRequired,
};

Home.defaultProps = {
  content: null.Home,
};

const mapStateToProps = (state) => ({
  currentFilter: state.filter.current,
  content: state.filter.content,
  contentURL: state.filter.contentURL,
});

const mapDispatchToProps = (dispatch) => ({
  fetchContent: (filter) => { dispatch(fetchContent(filter)); },
  fetchMoreContent: (page, setHasMore, setPage) => {
    dispatch(fetchMoreContent(page, setHasMore, setPage));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
