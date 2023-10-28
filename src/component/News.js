import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
 
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    console.log(parseData);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);

  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} -  News Dose`;
    // eslint-disable-next-line
    updateNews();
    // eslint-disable-next-line
  }, [])



  // const handlePrevclick = async () => {
  //   console.log('previous');
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);

  //   // this.setState({
  //   //   page: page - 1,
  //   //   articles: parseData.articles,
  //   //   loading: false
  //   // })
  //   setPage(page-1);
  //    updateNews();
  // }

  // const handleNextclick = async () => {
  //   console.log('next');
  //   // if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {

  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();
  //   //   console.log(parseData);

  //   //   this.setState({
  //   //     page: page + 1,
  //   //     articles: parseData.articles,
  //   //     loading: false
  //   //   })
  //   //}
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
   
  }


  return (
    <>
      {/* <div className='container my-3 '> */}
      <h1 className='text-center' style={{ margin: "35px", marginTop: "90px" }}>News Dose - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Loader />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loader />}
      >

        <div className="container">

          <div className="row">
            {/* {!loading && articles.map((element) => { */}
            {articles.map((element) => {

              return <div className="col-md-4" key={element.url}>
                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>

      </InfiniteScroll>



      {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr; Previous</button>1
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}
      {/* </div > */}
    </>
  )

}

News.callerdefaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
