import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from 'reducks/posts/selectors';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PostCard } from 'components/Posts/index';
import { getUserId } from 'reducks/currentUser/selectors';
import { fetchPosts } from 'reducks/posts/operations';
import { PaginationButtons } from 'components/UIkit/index';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const NavTabs = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const postsAll = getPosts(selector);
  const uid = getUserId(selector);
  const posts = postsAll.filter((element) => element.user_id === uid)

  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const perPage = 12;

  const calculatePageCount = () => {
      return Math.ceil((posts.length / perPage) - 1)
     };

  useEffect(() => {
      dispatch(fetchPosts())
  },[])

  useEffect(() => {
      let pageNumber = page; //選択されたページ番号
      const position = pageNumber * perPage;
      setStart(position);  //スタート位置をページ番号 * 1ページあたりの数、とする(例えば2番を選ぶと12 * 1で12番が先頭になる、つまり13番目以降の書籍が表示される)
  },[page])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="center">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Nav-tabs" centered variant="fullWidth">
          <Tab label="投稿一覧" {...a11yProps(0)} />
          <Tab label="お気に入り" {...a11yProps(1)} />
          <Tab label="いいねした投稿" {...a11yProps(2)} />
          <Tab label="メモ" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <section className="c-section-wrapin">
          <div className="p-grid__row">
          {posts.length > 0 && (
              posts.slice(start, start + perPage).map(post => (
              <PostCard
                  id={post.id} key={post.id} title={post.title} category={post.category} subject={post.subject} 
                  contentEnglish={post.content_en} contentJapanese={post.content_ja}
                  tips={post.tips}
              />
          )))}
          </div>
        </section>
        <div className="module-spacer--medium" />
        <PaginationButtons
            pageCount={calculatePageCount()}
            page={page}
            setPage={setPage}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        開発中
      </TabPanel>
      <TabPanel value={value} index={2}>
        開発中
      </TabPanel>
      <TabPanel value={value} index={3}>
        開発中
      </TabPanel>
    </Box>
  );
};

export default NavTabs;