import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import Input from '@material-ui/core/Input';
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: null,
      url: "",
      fetch: "",
      isLoading: false,
      data: null,
      query: null
    }
    this.post = this.post.bind(this)

  }

  

  post() {
    console.log("posting");
    fetch('https://api.netlify.com/build_hooks/5d08ec22acfd2ba4bc12fec6', {
      method: 'POST',
      body: {}
    })
 }


  render() {
    return (
      <div className="App" style={{ color: "white", overflow: "hidden" }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ padding: "50px 0px 50px 0px", minHeight: "100vh" }} >
          <Grid item xs={9} lg={4}>
            <h1
              style={{
                fontWeight: 900,
                lineHeight: 0.9,
                fontSize: 60,
                margin: 0
              }}
            ><span style={{ fontWeight: 300 }}>Out of Home</span><br />Instagram News</h1>
            <Button onClick={
              this.post
            }>
              Neu laden
            </Button>
          </Grid>
          {this.props.data != null ?
            <Grid item xs={9} style={{ color: "#003a5a" }}>
              <Paper>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  spacing={3}
                  style={{ marginTop: 40, paddingTop: 40 }} >
                  <Grid item xs={10}>
                    <Grid container spacing={3}>
                      {this.props.data.welt.feed.map((item, i) =>
                        <Grid item xs={12} md={6} lg={4} key={i}>
                          <h3>{item.article.welt.topic}</h3>
                          <h2 style={{ minHeight: 99 }}>{item.article.title}</h2>
                          <img
                            alt={item.title}
                            src={item.article.enclosure.url}
                            onClick={() => window.open(item.article.enclosure.url)}
                            style={{ width: "100%", cursor: "pointer" }}
                          />
                          <p>{item.article.content}</p>
                          <p>{item.article.welt.source}</p>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            : null}
        </Grid>

        <header >

        </header>
      </div>
    )
  }
}

export default Home;