import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {

    let { title, description, imageurl, newsurl, author, date, source } = this.props;

    return (
      <div>

        <div className="card" >
          <img src={!imageurl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjg_w9adhihainB1QCPXV_D3iuJNdnd1SDg&usqp=CAU" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title.slice(0, 45)}....</h5>
            <p className="card-text">{description.slice(0, 60)}....</p>
            <p className="my-2" style={{ color: 'grey' }} >By {author} on {new Date(date).toGMTString()}</p>
            <span style={{ zIndex: "10", left: "85%" }} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
              {source.name}
              <span className="visually-hidden">unread messages</span>
            </span>
            <a href={newsurl}  rel="noopener noreferrer" target="_blank" className="btn btn-sm btn-dark my-2">Read More</a>
          </div>
        </div>


      </div>
    )
  }
}

export default NewsItem

