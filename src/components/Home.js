import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
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
      title: null
    }
    this.fetch = this.fetch.bind(this)
    this.xmlToJson = this.xmlToJson.bind(this)
    this.handleChange = this.handleChange.bind(this)

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


  render() {
    //  "ci23x11-w1024" "ci2x3l-w1024" "ci102l-w1024" "ci16x9-w1024"
    var imagesize = "ci23x11-w1024";
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
              <option value="">Neuste</option>
              <option value="politik">Politik</option>
              <option value="panorama">Panorama</option>
              <option value="wirtschaft">Wirtschaft</option>
              <option value="sport">Sport</option>
              <option value="kultur">Kultur</option>
              <option value="wissen">Wissen</option>
              <option value="auto">Auto</option>
              <option value="karriere">Karriere</option>
              <option value="multimedia">Digital</option>
              <option value="reise">Reise</option>
              <option value="test">Test</option>
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
                        {this.state.data.rss.channel.item.map((item, i) =>
                          <Grid item xs={12} md={6} lg={4} key={i}>
                            <h3>{item["welt:topic"]}</h3>
                            <h2 style={{ minHeight: 99 }}>{item.title}</h2>
                            {console.log(item.enclosure.length !== undefined ?
                              item.enclosure[0]["@attributes"]
                              : item.enclosure["@attributes"].url)}
                            {item.enclosure.length !== undefined ?
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