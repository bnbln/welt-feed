import React, { Component, useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/styles';

const StyledSelect = withStyles({
  icon: {
    color: "white"
  },
  root: {
    borderBottomColor: "white",
    color: '#fff',
    width: "200px",
    marginRight: 10,
    "& :before": {
      borderBottomColor: "white",
    }

  },
})(Select);

const StyledInput = withStyles({
  underline: {
    "& :after": {
      borderBottomColor: "orange"
    }
  }
})(Input);


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: null,
      category: "",
      title: null,
      imageSize: "1080",
      imageCrop: "23x11"
    }
    this.fetch = this.fetch.bind(this)
    this.xmlToJson = this.xmlToJson.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleButton = this.handleButton.bind(this)

  }

  async fetch() {
    this.setState({isLoading: true})
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://www.welt.de/feeds/ooh/out-of-home/" + this.state.category;

    let request = new Request(proxyurl + url);

    await fetch(request).then((results) => {
      results
        .text()
        .then((str) => {
          let responseDoc = new DOMParser().parseFromString(str, 'application/xml');
          this.setState({
            data: this.xmlToJson(responseDoc),
            isLoading: false
          })
        })
    })
  }

  xmlToJson(xml) {
    var obj = {};
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      obj = xml.nodeValue;
    }
    if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
      obj = xml.childNodes[0].nodeValue;
    }
    else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) === "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) === "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  handleButton(name, props) {
    this.setState({
      [name]: props
    })
  }


  render() {
    //  "ci23x11-w1024" "ci2x3l-w1024" "ci102l-w1024" "ci16x9-w1024"
    var imagesize = "ci"+this.state.imageCrop+"-w"+this.state.imageSize;
    // var imagesize = "ci23x11-w780";
    return (
      <div className="App" style={{ color: "white", overflow: "hidden" }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ padding: "50px 0px 50px 0px", minHeight: "100vh" }} >
          <Grid item xs={11} lg={4}>
            <h1
              style={{
                fontWeight: 900,
                lineHeight: 0.9,
                fontSize: 60,
                margin: 0
              }}
            ><span style={{ fontWeight: 300 }}>Out of Home</span><br />Instagram News</h1>
          </Grid>
          <Grid item xs={11} lg={3}>
            <StyledSelect
              color="primary"
              input={<StyledInput value={this.state.category} />}
              autoWidth={true}
              native
              value={this.state.category}
              onChange={this.handleChange('category')}
            >
              <option style={{backgroundColor: "gray"}} value="">Neuste</option>
              <option style={{backgroundColor: "gray"}} value="politik">Politik</option>
              <option style={{backgroundColor: "gray"}} value="panorama">Panorama</option>
              <option style={{backgroundColor: "gray"}} value="wirtschaft">Wirtschaft</option>
              <option style={{backgroundColor: "gray"}} value="sport">Sport</option>
              <option style={{backgroundColor: "gray"}} value="leute">Leute</option>
              <option style={{backgroundColor: "gray"}} value="kultur">Kultur</option>
              <option style={{backgroundColor: "gray"}} value="wissen">Wissen</option>
              <option style={{backgroundColor: "gray"}} value="auto">Auto</option>
              <option style={{backgroundColor: "gray"}} value="karriere">Karriere</option>
              <option style={{backgroundColor: "gray"}} value="multimedia">Digital</option>
              <option style={{backgroundColor: "gray"}} value="reise">Reise</option>
              <option style={{backgroundColor: "gray"}} value="test">Test</option>
            </StyledSelect>
            <Button color="primary" onClick={
              this.fetch
            }>
              Abrufen
            </Button>
          </Grid>
          {this.state.isLoading === true ?
            <Grid item xs={12} style={{
              textAlign: "center"
            }}>
              <CircularProgress />
            </Grid>
            :
            this.state.data !== null ?
              <Grid item xs={11} lg={9} style={{ color: "#003a5a" }}>
                <Paper>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={3}
                    style={{ marginTop: 40, paddingTop: 40 }} >
                    <Grid item xs={10}>
                      <h1 style={{
                        textTransform: "capitalize"
                      }}>Meldungen</h1>
                   
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <p><b>Bildgröße</b></p>
                          {/* <Tabs
                          value={this.state.imageSize}
                          onChange={this.handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth"
                          aria-label="action tabs example"
                        >
                          <Tab label="Klein" value="small" />
                          <Tab label="Groß" value="large" />
                        </Tabs> */}

                          <Button onClick={() => this.handleButton("imageSize", "780")} variant={this.state.imageSize === "780" ? "contained" : "outlined"}>
                            klein
                        </Button>
                          <Button onClick={() => this.handleButton("imageSize", "1080")} variant={this.state.imageSize === "1080" ? "contained" : "outlined"}>
                            groß
                        </Button>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <p><b>Bildausschnitt</b></p>

                          <Button onClick={() => this.handleButton("imageCrop", "23x11")}
                            variant={this.state.imageCrop === "23x11" ? "contained" : "outlined"}
                          >
                            23:11
                        </Button>
                          <Button onClick={() => this.handleButton("imageCrop", "16x9")}
                            variant={this.state.imageCrop === "16x9" ? "contained" : "outlined"}
                          >
                            16:9
                        </Button>
                          <Button onClick={() => this.handleButton("imageCrop", "1x2l")}
                            variant={this.state.imageCrop === "1x2l" ? "contained" : "outlined"}
                          >
                            1:2
                        </Button>
                          <Button onClick={() => this.handleButton("imageCrop", "2x3l")}
                            variant={this.state.imageCrop === "2x3l" ? "contained" : "outlined"}

                          >
                            2:3
                        </Button>
                          <Button onClick={() => this.handleButton("imageCrop", "192x251l")}
                            variant={this.state.imageCrop === "192x251l" ? "contained" : "outlined"}

                          >
                            192:251
                        </Button>
                          <Button onClick={() => this.handleButton("imageCrop", "102l")}
                            variant={this.state.imageCrop === "102l" ? "contained" : "outlined"}

                          >
                            1:1
                        </Button>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        {this.state.data.rss.channel.item.map((item, i) =>
                          <Grid item xs={12} md={6} lg={4} key={i}>
                            <h3>{item["welt:topic"]}</h3>
                            <h2 style={{ minHeight: 99 }}>{item.title}</h2>
                            {item.enclosure ?
                              item.enclosure.length !== undefined && item.enclosure.length !== 0 && item.enclosure.length !== null ?
                               item.enclosure[0]["@attributes"].type === "image/jpeg" ?
                                <img
                                  alt={item.title}
                                  src={item.enclosure[0]["@attributes"].url.replace("ci23x11-w780", imagesize)}
                                  onClick={() => window.open(item.enclosure[0]["@attributes"].url.replace("ci23x11-w780", imagesize))}
                                  style={{ width: "100%", cursor: "pointer" }}
                                />
                                :
                                null
                              :
                              <img
                                alt={item.title}
                                src={item.enclosure["@attributes"].url.replace("ci23x11-w780", imagesize)}
                                onClick={() => window.open(item.enclosure["@attributes"].url.replace("ci23x11-w780", imagesize))}
                                style={{ width: "100%", cursor: "pointer" }}
                                />
                              : 
                              <div style={{
                                width: "100%",
                                paddingTop: "48%",
                                background: "#b71336",
                                color: "#fff",
                                position: "relative"
                              }}>
                                <p style={{
                                  position: "absolute",
                                  top: "33%",
                                  left: 0,
                                  width: "100%",
                                  textAlign: "center",
                                  fontWeight: 800
                                }}>HD-Bild oder kein Bild</p>
                              </div>
              
                            }
                            <p>{item.description}</p>
                            <p>{item["welt:source"]}</p>
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
