import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    category: 'sports',
    pageSize: 6
  }

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number
  }

  articles = [

  ];

  constructor(props) {   // CONSTRUCTOR RUNS WHEN AN OBJECT OF THIS CLASS(News) IS CREATED
    super(props);
    console.log("CONSTRUCTOR OF NEWS COMPONENT");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      Total_results: 0
    }
    document.title = `NEWS APP-${this.props.category}`
  }

  async update() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      Total_results: parsedData.totalResults,
      loading: false
    })

  }


  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      Total_results: parsedData.totalResults,
      page: nextPage,
    }));
  };






  async componentDidMount() {
    console.log("componentDidMount IS RUNNING");
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      Total_results: parsedData.totalResults,
      loading: false
    })
  }




  render() {

    console.log("RENDER COMPLETED");

    return (
      <>

        <h2 className="text-center" style={{ margin: "35px 0px" }}>NEWS APP - TOP {(this.props.category).toUpperCase()} HEADLINES</h2>
        {this.state.loading &&<div className="text-center"><Spinner/></div>}


        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.Total_results}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">

              {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem source={element.source} date={element.publishedAt} author={element.author ? element.author : "Unknown"} title={element.title ? element.title : "No Title"} description={element.description ? element.description : "No Description"} imageurl={element.urlToImage} newsurl={element.url} />
                </div>
              })}

            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News