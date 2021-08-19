import './App.css';
import $ from "jquery";
import React, { Component } from "react";
// import { useState } from "react";
import TabNav from './component/tabnav.js';
import Tab from './component/tab.js';
import './App.css';
// import './server.js';
import { BsFillPersonPlusFill } from "react-icons/bs";
import axios from 'axios';





var quality = 60;
var timeout = 10;
var uri = "https://localhost:8003/mfs100/"; //Secure
var KeyFlag = "";
var isGetSuccess = false;
let thrownError = "";




class App extends Component {

  state = {
    data: "This is data",
    num: 123,
    boolean: true,
  }

  // save data to localStorage 
  saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  // Fetch data from local storage 
  getStateFromLocalStorage = () => {
    let data = localStorage.getItem('state');
    if (data !== undefined) {
      this.setState(JSON.parse(data));
    }
  }

  componentDidMount() {
    // Fetch data from local storage 
    this.getStateFromLocalStorage();
    this.getBiometrics();
  }


  constructor(props) {
    super(props);
    this.state = {
      leftlittlefinger: "",
      leftlittletext: "",
      leftringfinger: "",
      leftringtext: "",
      leftmidfinger: "",
      leftmidtext: "",
      leftindexfinger: "",
      leftindextext: "",
      leftthumbfinger: "",
      leftthumbtext: "",
      leftlittleedge: "",
      leftlittleedgetext: "",
      leftringedge: "",
      leftringedgetext: "",
      leftmidedge: "",
      leftmidedgetext: "",
      leftindexedge: "",
      leftindexedgetext: "",
      leftthumbedge: "",
      leftthumbedgetext: "",
      // left fingers right edges
      leftlittlerightedge: "",
      leftlittlerightedgetext: "",
      leftindexrightedge: "",
      leftindexrightedgetext: "",
      leftmidrightedge: "",
      leftmidrightedgetext: "",
      leftringrightedge: "",
      leftringrightedgetext: "",
      leftthumbrightedge: "",
      leftthumbrightedgetext: "",
      //left description
      leftthumbfingerpreview: "",
      rightthumbfingerpreview: "",
      leftindexfingerpreview: "",
      rightindexfingerpreview: "",
      leftmidfingerpreview: "",
      rightmiddlefingerpreview: "",
      leftringfingerpreview: "",
      rightringfingerpreview: "",
      leftlittlefingerpreview: "",
      rightlittlefingerpreview: "",

      lefthumbleftedgepreview: "",
      rightthumbrightedgepreview: "",
      leftindexleftedgepreview: "",
      rightindexrightedgepreview: "",
      leftmiddleleftedgepreview: "",
      rightmiddlerightedgepreview: "",
      leftringleftedgepreview: "",
      rightringrightedgepreview: "",
      leftlittleleftedgepreview: "",
      rightlittlerightedgepreview: "",

      leftlittlerightedgepreview: "",
      rightlittleleftedgepreview: "",
      leftindexrightedgepreview: "",
      rightindexleftedgepreview: "",
      leftmidrightedgepreview: "",
      rightmidleftedgepreview: "",
      leftringrightedgepreview: "",
      rightringleftedgepreview: "",
      leftthumbrightedgepreview: "",
      rightthumbleftedgepreview: "",

      // right fingers and edges
      rightlittlefinger: "",
      rightlittletext: "",
      rightringfinger: "",
      rightringtext: "",
      rightmidfinger: "",
      rightmidtext: "",
      rightindexfinger: "",
      rightindextext: "",
      rightthumbfinger: "",
      rightthumbtext: "",
      rightlittleedge: "",
      rightlittleedgetext: "",
      rightringedge: "",
      rightringedgetext: "",
      rightmidedge: "",
      rightmidedgetext: "",
      rightindexedge: "",
      rightindexedgetext: "",
      rightthumbedge: "",
      rightthumbedgetext: "",
      previewname: "",
      previewage: "",
      previewgender: "",
      previewaddress: "",
      previewstate: "",
      previewGrowth: "",
      // Right fingers right edges
      rightlittleleftedge: "",
      rightlittleleftedgetext: "",
      rightindexleftedge: "",
      rightindexleftedgetext: "",
      rightmidleftedge: "",
      rightmidleftedgetext: "",
      rightringleftedge: "",
      rightringleftedgetext: "",
      rightthumbleftedge: "",
      rightthumbleftedgetext: "",
      selected: 'Home',
      biometrics: [],
    };
    // this.captureFile = this.captureFile.bind(this);

    // this.onSubmit = this.onSubmit.bind(this);
  }

  async getBiometrics() {
    console.log("getBiometrics");
    const response = await axios.get('http://localhost:5000/user/');
    console.log(response.data);
    this.setState({ biometrics: response.data });
  }

  setSelected = (tab) => {
    this.setState({ selected: tab });
  }
  GetMFS100Info() {
    KeyFlag = "";
    return this.GetMFS100Client("info");
  }

  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var previeword = document.getElementById(previeword);
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

  }


  GetMFS100KeyInfo(key) {
    KeyFlag = key;
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var MFS100Request = {
      Key: key,
    };
    var jsondata = JSON.stringify(MFS100Request);
    return this.PostMFS100Client("keyinfo", jsondata);
  }

  CaptureFinger(quality, timeout) {
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var MFS100Request = {
      Quality: quality,
      TimeOut: timeout,
    };
    var jsondata = JSON.stringify(MFS100Request);
    return this.PostMFS100Client("capture", jsondata);
  }

  VerifyFinger(ProbFMR, GalleryFMR) {
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var MFS100Request = {
      ProbTemplate: ProbFMR,
      GalleryTemplate: GalleryFMR,
      BioType: "FMR", // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    var jsondata = JSON.stringify(MFS100Request);
    return this.PostMFS100Client("verify", jsondata);
  }

  MatchFinger(quality, timeout, GalleryFMR) {
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var MFS100Request = {
      Quality: quality,
      TimeOut: timeout,
      GalleryTemplate: GalleryFMR,
      BioType: "FMR", // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    var jsondata = JSON.stringify(MFS100Request);
    return this.PostMFS100Client("match", jsondata);
  }

  GetPidData(BiometricArray) {
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var req = new this.MFS100Request(BiometricArray);
    var jsondata = JSON.stringify(req);
    return this.PostMFS100Client("getpiddata", jsondata);
  }

  GetProtoPidData(BiometricArray) {
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var req = new this.MFS100Request(BiometricArray);
    var jsondata = JSON.stringify(req);
    return this.PostMFS100Client("getppiddata", jsondata);
  }

  GetRbdData(BiometricArray) {
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var req = new this.MFS100Request(BiometricArray);
    var jsondata = JSON.stringify(req);
    return this.PostMFS100Client("getrbddata", jsondata);
  }

  GetProtoRbdData(BiometricArray) {
    if (!this.PrepareScanner()) {
      return this.getFalseRes();
    }
    var req = new this.MFS100Request(BiometricArray);
    var jsondata = JSON.stringify(req);
    return this.PostMFS100Client("getprbddata", jsondata);
  }

  PostMFS100Client(method, jsonData) {
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: uri + method,
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      processData: false,
      success: function (data) {
        httpStaus = true;
        res = { httpStaus: httpStaus, data: data };
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        res = { httpStaus: httpStaus, err: this.getHttpError(jqXHR) };
      },
    });
    return res;
  }

  GetMFS100Client(method) {
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
      type: "GET",
      async: false,
      crossDomain: true,
      url: uri + method,
      contentType: "application/json; charset=utf-8",
      processData: false,
      success: function (data) {
        httpStaus = true;
        res = { httpStaus: httpStaus, data: data };
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        res = { httpStaus: httpStaus, err: this.getHttpError(jqXHR) };
      },
    });
    return res;
  }

  getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
      err = "Service Unavailable";
    } else if (jqXHR.status === 404) {
      err = "Requested page not found";
    } else if (jqXHR.status === 500) {
      err = "Internal Server Error";
    } else if (thrownError === "parsererror") {
      err = "Requested JSON parse failed";
    } else if (thrownError === "timeout") {
      err = "Time out error";
    } else if (thrownError === "abort") {
      err = "Ajax request aborted";
    } else {
      err = "Unhandled Error";
    }
    return err;
  }

  /////////// Classes

  Biometric(BioType, BiometricData, Pos, Nfiq, Na) {
    this.BioType = BioType;
    this.BiometricData = BiometricData;
    this.Pos = Pos;
    this.Nfiq = Nfiq;
    this.Na = Na;
  }

  MFS100Request(BiometricArray) {
    this.Biometrics = BiometricArray;
  }

  PrepareScanner() {
    try {
      if (!this.isGetSuccess) {
        var resInfo = this.GetMFS100Client("info");
        if (!resInfo.httpStaus) {
          //alert(resInfo.err);
          return false;
        } else {
          isGetSuccess = true;
        }

        if (KeyFlag !== null && KeyFlag !== "undefined" && KeyFlag.length > 0) {
          var MFS100Request = {
            Key: KeyFlag,
          };
          var jsondata = JSON.stringify(MFS100Request);
          this.PostMFS100Client("keyinfo", jsondata);
        }
      }
    } catch (e) { }
    return true;
  }

  getFalseRes() {
    var res;
    res = { httpStaus: false, err: "Error while calling service" };
    return res;
  }

  Capture(finger) {
    //Left Ring finger Capture
    if (finger === "leftringfinger") {
      console.log("Reading Left Ring Finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftringfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftringtext: this.state.leftringfinger });
            this.setState({ buffer: Buffer(this.state.leftringfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left Little Finger Capture
    else if (finger === "leftlittlefinger") {
      console.log("Reading Left Little finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftlittlefinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftlittletext: this.state.leftlittlefinger });
            this.setState({ buffer: Buffer(this.state.leftlittlefinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left Middle Finger Capture
    else if (finger === "leftmidfinger") {
      console.log("Reading Left middle finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftmidfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftmidtext: this.state.leftmidfinger });
            this.setState({ buffer: Buffer(this.state.leftmidfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left Index Finger Capture
    else if (finger === "leftindexfinger") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftindexfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftindextext: this.state.leftindexfinger });
            this.setState({ buffer: Buffer(this.state.leftindexfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left Thumb Finger Capture
    else if (finger === "leftthumbfinger") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftthumbfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftthumbtext: this.state.leftthumbfinger });
            this.setState({ buffer: Buffer(this.state.leftthumbfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left Edge Little Finger Capture
    else if (finger === "leftlittleedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftlittleedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftlittleedgetext: this.state.leftlittleedge });
            this.setState({ buffer: Buffer(this.state.leftlittleedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left ring edge Finger Capture
    else if (finger === "leftringedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftringedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftringedgetext: this.state.leftringedge });
            this.setState({ buffer: Buffer(this.state.leftringedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left middle edge Finger Capture
    else if (finger === "leftmidedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftmidedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftmidedgetext: this.state.leftmidedge });
            this.setState({ buffer: Buffer(this.state.leftmidedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left index edge Finger Capture
    else if (finger === "leftindexedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftindexedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftindexedgetext: this.state.leftindexedge });
            this.setState({ buffer: Buffer(this.state.leftindexedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left thumb edge Finger Capture
    else if (finger === "leftthumbedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftthumbedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftthumbedgetext: this.state.leftthumbedge });
            this.setState({ buffer: Buffer(this.state.leftthumbedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left little right edge
    else if (finger === "leftlittlerightedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftlittlerightedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftlittlerightedgetext: this.state.leftlittlerightedge });
            this.setState({ buffer: Buffer(this.state.leftlittlerightedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Left index right edge
    else if (finger === "leftindexrightedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftindexrightedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftthumleftindexrightedgetextbedgetext: this.state.leftindexrightedge });
            this.setState({ buffer: Buffer(this.state.leftindexrightedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }

    //Left middle right edges
    else if (finger === "leftmidrightedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftmidrightedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftmidrightedgetext: this.state.leftmidrightedge });
            this.setState({ buffer: Buffer(this.state.leftmidrightedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }

    //Left ring right edges
    else if (finger === "leftringrightedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftringrightedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftringrightedgetext: this.state.leftringrightedge });
            this.setState({ buffer: Buffer(this.state.leftringrightedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }

    //Left thumb right edges
    else if (finger === "leftthumbrightedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              leftthumbrightedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ leftthumbrightedgetext: this.state.leftthumbrightedge });
            this.setState({ buffer: Buffer(this.state.leftthumbrightedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }

    // **********Right finger capture**********
    //Right  little  Finger Capture
    else if (finger === "rightlittlefinger") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightlittlefinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightlittletext: this.state.rightlittlefinger });
            this.setState({ buffer: Buffer(this.state.rightlittlefinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  Ring  Finger Capture
    else if (finger === "rightringfinger") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightringfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightringtext: this.state.rightringfinger });
            this.setState({ buffer: Buffer(this.state.rightringfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  Middle  Finger Capture
    else if (finger === "rightmidfinger") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightmidfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightmidtext: this.state.rightmidfinger });
            this.setState({ buffer: Buffer(this.state.rightmidfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  Index  Finger Capture
    else if (finger === "rightindexfinger") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightindexfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightindextext: this.state.rightindexfinger });
            this.setState({ buffer: Buffer(this.state.rightindexfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  Thumb  Finger Capture
    else if (finger === "rightthumbfinger") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightthumbfinger: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightthumbtext: this.state.rightthumbfinger });
            this.setState({ buffer: Buffer(this.state.rightthumbfinger) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  little edge finger
    else if (finger === "rightlittleedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightlittleedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightlittleedgetext: this.state.rightlittleedge });
            this.setState({ buffer: Buffer(this.state.rightlittleedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  Ring edge finger
    else if (finger === "rightringedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightringedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightringedgetext: this.state.rightringedge });
            this.setState({ buffer: Buffer(this.state.rightringedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  middle edge finger
    else if (finger === "rightmidedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightmidedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightmidedgetext: this.state.rightmidedge });
            this.setState({ buffer: Buffer(this.state.rightmidedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  Index edge finger
    else if (finger === "rightindexedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightindexedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightindexedgetext: this.state.rightindexedge });
            this.setState({ buffer: Buffer(this.state.rightindexedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }
    //Right  Thumb edge finger
    else if (finger === "rightthumbedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightthumbedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightthumbedgetext: this.state.rightthumbedge });
            this.setState({ buffer: Buffer(this.state.rightthumbedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }


    //Right  Little Left edge finger
    else if (finger === "rightlittleleftedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightlittleleftedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightlittleleftedgetext: this.state.rightlittleleftedge });
            this.setState({ buffer: Buffer(this.state.rightlittleleftedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }

    //Right  index Left edge finger
    else if (finger === "rightindexleftedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightindexleftedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightindexleftedgetext: this.state.rightindexleftedge });
            this.setState({ buffer: Buffer(this.state.rightindexleftedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }

    //Right  Middle Left edge finger
    else if (finger === "rightmidleftedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightmidleftedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightmidleftedgetext: this.state.rightmidleftedge });
            this.setState({ buffer: Buffer(this.state.rightmidleftedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }


    //Right  Ring Left edge finger
    else if (finger === "rightringleftedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightringleftedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightringleftedgetext: this.state.rightringleftedge });
            this.setState({ buffer: Buffer(this.state.rightringleftedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }


    //Right  Thumb Left edge finger
    else if (finger === "rightthumbleftedge") {
      console.log("Reading Left Index finger");
      try {
        var res = this.CaptureFinger(quality, timeout);
        if (res.httpStaus) {
          if (res.data.ErrorCode === "0") {
            this.setState({
              rightthumbleftedge: "data:image/bmp;base64," + res.data.BitmapData,
            });
            this.setState({ rightthumbleftedgetext: this.state.rightthumbleftedge });
            this.setState({ buffer: Buffer(this.state.rightthumbleftedge) });
            console.log("buffer", this.state.buffer);

            return;
          }
        } else {
          alert(res.err);
        }
      } catch (e) {
        alert(e);
      }
      return false;
    }

  }


  detailsnext() {
    var name = document.getElementById("name").value;
    console.log(name);
    var age = document.getElementById("age").value;
    console.log(age);
    var gender = document.getElementById("gender").value;
    console.log(gender);
    var address = document.getElementById("address").value;
    console.log(address);
    var state = document.getElementById("state").value;
    console.log(state);


    this.state.previewname = name;
    this.state.previewage = age;
    this.state.previewgender = gender;
    this.state.previewaddress = address;
    this.state.previewstate = state;
  }

  detailsnext() {
    var name = document.getElementById("name").value;
    console.log(name);
    var age = document.getElementById("age").value;
    console.log(age);
    var gender = document.getElementById("gender").value;
    console.log(gender);
    var address = document.getElementById("address").value;
    console.log(address);
    var state = document.getElementById("state").value;
    console.log(state);


    this.state.previewname = name;
    this.state.previewage = age;
    this.state.previewgender = gender;
    this.state.previewaddress = address;
    this.state.previewstate = state;
  }

  saveleft() {
    var leftlittlefingerdesc = document.getElementById("leftlittlefingerdesc").value;
    console.log(leftlittlefingerdesc);
    var leftringfingerdesc = document.getElementById("leftringfingerdesc").value;
    console.log(leftringfingerdesc);
    var leftmiddlefingerdesc = document.getElementById("leftmiddlefingerdesc").value;
    console.log(leftmiddlefingerdesc);
    var leftindexfingerdesc = document.getElementById("leftindexfingerdesc").value;
    console.log(leftindexfingerdesc);
    var leftthumbfingerdesc = document.getElementById("leftthumbfingerdesc").value;
    console.log(leftthumbfingerdesc);

    var leftlittleleftedgedesc = document.getElementById("leftlittleleftedgedesc").value;
    console.log(leftlittleleftedgedesc);
    var leftringleftedgedesc = document.getElementById("leftringleftedgedesc").value;
    console.log(leftringleftedgedesc);
    var leftmiddleleftedgedesc = document.getElementById("leftmiddleleftedgedesc").value;
    console.log(leftmiddleleftedgedesc);
    var leftindexleftedgedesc = document.getElementById("leftindexleftedgedesc").value;
    console.log(leftindexleftedgedesc);
    var leftthumbleftedgedesc = document.getElementById("leftthumbleftedgedesc").value;
    console.log(leftthumbleftedgedesc);

    var leftlittlerightedgedesc = document.getElementById("leftlittlerightedgedesc").value;
    console.log(leftlittlerightedgedesc);
    var leftindexrightedgedesc = document.getElementById("leftindexrightedgedesc").value;
    console.log(leftindexrightedgedesc);
    var leftmiddlerightedgedesc = document.getElementById("leftmiddlerightedgedesc").value;
    console.log(leftmiddlerightedgedesc);
    var leftringrightedgedesc = document.getElementById("leftringrightedgedesc").value;
    console.log(leftringrightedgedesc);
    var leftthumbrightedgedesc = document.getElementById("leftthumbrightedgedesc").value;
    console.log(leftthumbrightedgedesc);

    this.state.leftthumbfingerpreview = leftthumbfingerdesc;
    this.state.leftindexfingerpreview = leftindexfingerdesc;
    this.state.leftmidfingerpreview = leftmiddlefingerdesc;
    this.state.leftringfingerpreview = leftringfingerdesc;
    this.state.leftlittlefingerpreview = leftlittlefingerdesc;



    this.state.lefthumbleftedgepreview = leftthumbleftedgedesc;
    this.state.leftindexleftedgepreview = leftindexleftedgedesc;
    this.state.leftmiddleleftedgepreview = leftmiddleleftedgedesc;
    this.state.leftringleftedgepreview = leftringleftedgedesc;
    this.state.leftlittleleftedgepreview = leftlittleleftedgedesc;

    this.state.leftlittlerightedgepreview = leftlittlerightedgedesc;
    this.state.leftindexrightedgepreview = leftindexrightedgedesc;
    this.state.leftmidrightedgepreview = leftmiddlerightedgedesc;
    this.state.leftringrightedgepreview = leftringrightedgedesc;
    this.state.leftthumbrightedgepreview = leftthumbrightedgedesc;


  }

  saveright() {
    var rightlittlefingerdesc = document.getElementById("rightlittlefingerdesc").value;
    console.log(rightlittlefingerdesc);
    var rightringfingerdesc = document.getElementById("rightringfingerdesc").value;
    console.log(rightringfingerdesc);
    var rightmidfingerdesc = document.getElementById("rightmidfingerdesc").value;
    console.log(rightmidfingerdesc);
    var rightindexfingerdesc = document.getElementById("rightindexfingerdesc").value;
    console.log(rightindexfingerdesc);
    var rightthumbfingerdesc = document.getElementById("rightthumbfingerdesc").value;
    console.log(rightthumbfingerdesc);


    var rightlittlrighteedgedesc = document.getElementById("rightlittlrighteedgedesc").value;
    console.log(rightlittlrighteedgedesc);
    var rightringrightedgedesc = document.getElementById("rightringrightedgedesc").value;
    console.log(rightringrightedgedesc);
    var rightmidrightedge = document.getElementById("rightmidrightedge").value;
    console.log(rightmidrightedge);
    var rightindexrightedges = document.getElementById("rightindexrightedges").value;
    console.log(rightindexrightedges);
    var rightthumbrightedge = document.getElementById("rightthumbrightedge").value;
    console.log(rightthumbrightedge);



    var rightlittleleftedgedesc = document.getElementById("rightlittleleftedgedesc").value;
    console.log(rightlittleleftedgedesc);
    var rightringleftedgedesc = document.getElementById("rightringleftedgedesc").value;
    console.log(rightringleftedgedesc);
    var rightmidleftedgedesc = document.getElementById("rightmidleftedgedesc").value;
    console.log(rightmidleftedgedesc);
    var rightindexleftedgedesc = document.getElementById("rightindexleftedgedesc").value;
    console.log(rightindexleftedgedesc);
    var rightthumbleftedgedesc = document.getElementById("rightthumbleftedgedesc").value;
    console.log(rightthumbleftedgedesc);

    this.state.rightthumbfingerpreview = rightthumbfingerdesc;
    this.state.rightindexfingerpreview = rightindexfingerdesc;
    this.state.rightmiddlefingerpreview = rightmidfingerdesc;
    this.state.rightringfingerpreview = rightringfingerdesc;
    this.state.rightlittlefingerpreview = rightlittlefingerdesc;

    this.state.rightthumbrightedgepreview = rightthumbrightedge;
    this.state.rightindexrightedgepreview = rightindexrightedges;
    this.state.rightmiddlerightedgepreview = rightmidrightedge;
    this.state.rightringrightedgepreview = rightringrightedgedesc;
    this.state.rightlittlerightedgepreview = rightlittlrighteedgedesc;

    this.state.rightlittleleftedgepreview = rightlittleleftedgedesc;
    this.state.rightindexleftedgepreview = rightindexleftedgedesc;
    this.state.rightmidleftedgepreview = rightmidleftedgedesc;
    this.state.rightringleftedgepreview = rightringleftedgedesc;
    this.state.rightthumbleftedgepreview = rightthumbleftedgedesc;
  }

  setTypeOfGrowth(value) {
    console.log(value);
    this.setState({
      previewGrowth: value
    });
  }

 async store() {
    console.log("boooo")
    const data = {
      name: this.state.previewname,
      age: this.state.previewage,
      gender: this.state.previewgender,
      address: this.state.previewaddress,
      state: this.state.previewstate,
      typeofgrowth: this.state.previewGrowth
    };
    console.log(data)
    const response = await axios.post('http://localhost:5000/user', data);
    console.log(response);
  }

  //sample
  // const response = await axios.get('http://localhost:5000/user');
  // setState({ user: response.data });

  render() {
    return (
      <div className="App">
        <div className="App mt-4">
          <h1 id="heading">BIOMETRIC PROJECT</h1><br></br>
          <TabNav tabs={['Home', 'Personal Information', 'Left Biometrics', 'Right Biometrics', 'Preview']} selected={this.state.selected} setSelected={this.setSelected}>
            <Tab isSelected={this.state.selected === 'Home'}>
              <br></br><br></br>
              <table class="search">
                <tr>
                  <td>
                    <label id="labeldes">Search </label>
                  </td>
                  <td>
                    <select id="searchbydetails" name="search">
                      <option value="none">Select</option>
                      <option value="name">Name</option>
                      <option value="age">Age</option>
                      <option value="sex">Sex</option>
                      <option value="state">State</option>
                      <option value="growth">Type of Growth Pattern</option>
                    </select>
                  </td>
                </tr>
              </table>


              <div id="table-wrapper">
                <div id="table-scroll">
                  <table bgcolor="white" border="0" cellpadding="5" cellspacing="0" id="header-fixed" width="100%" overflow="scroll" class="scrollTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <td>Gender</td>
                        <td>Address</td>
                        <th>State</th>
                        <th>Type of Growth Pattern</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.biometrics.map(user => {
                        return (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.address}</td>
                        <td>{user.state}</td>
                        <td>{user.typeofgrowth}</td>
                      </tr>
                        )
                      })}
                    </tbody>
                  </table>

                </div>
              </div>
              {/* <button id="addparticipant">Add Participant&nbsp;&nbsp;<BsFillPersonPlusFill /></button> */}
            </Tab>

            {/* *************************************************PERSONAL INFORMATION**************************************************************** */}

            <Tab isSelected={this.state.selected === 'Personal Information'}>

              <form>
                <br></br><br></br>
                <table bgcolor="white" border="0" cellpadding="10" cellspacing="0" id="header-fixed" width="100%" class="personaltable">
                  <tr>
                    <td>
                      <label id="infolabel" >Name </label>
                    </td>
                    <td>
                      <input type="text" id="name" placeholder="name" />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label id="infolabel">Age </label>
                    </td>
                    <td>
                      <input type="text" id="age" placeholder="age" />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label id="infolabel">Gender </label>
                    </td>
                    <td>
                      <select id="gender" name="gender">
                        <option value="none">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <br></br>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label id="infolabel">Address </label>
                    </td>
                    <td>
                      <input id="address" type="text" placeholder="address" />
                    </td>

                  </tr>
                  <br></br>
                  <tr>
                    <td>
                      <label id="infolabel">State </label>
                    </td>
                    <td>
                      <input type="text" id="state" placeholder="state" />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>  <input
                      type="button"
                      name="save"
                      onClick={() => this.detailsnext()}
                      value="save"
                    ></input>
                    </td>
                  </tr>
                </table>

              </form>

            </Tab>
            {/* ********************************************Left Biometrics********************************************************************************************            */}

            <Tab isSelected={this.state.selected === 'Left Biometrics'}>
              {/* Left Biometrics */}<br></br>
              <h2>LEFT FINGERPRINTS</h2><br></br>
              <table class="leftfintable" width="100%">

                <tr>
                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftlittlefinger}
                        id="fingerprint"
                        alt="Left Little Finger"
                      /></div>
                    &nbsp;
                    <center>  <input type="text" value={this.state.leftlittletext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftlittlefinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftlittlefingerdesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftringfinger}
                        id="fingerprint"
                        alt="Left Ring Finger"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.leftringtext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftringfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftringfingerdesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftmidfinger}
                        id="fingerprint"
                        alt="Left Middle Finger"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.leftmidtext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftmidfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftmiddlefingerdesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftindexfinger}
                        id="fingerprint"
                        alt="Left Index Finger"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.leftindextext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftindexfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftindexfingerdesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftthumbfinger}
                        id="fingerprint"
                        alt="Left Thumb Finger"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.leftthumbtext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftthumbfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftthumbfingerdesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>
                </tr>


              </table><br></br><br></br>
              <h2>LEFT FINGERPRINTS LEFT EDGES</h2>
              {/* *********************LEFT FINGER LEFT EDGES ************* */}
              <hr></hr>
              <br></br><br></br>
              <table class="leftfintable" width="100%">

                <tr>
                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftlittleedge}
                        id="fingerprint"
                        alt="Left Little Left Edges"
                      /></div>
                    &nbsp;
                    <center>  <input type="text" value={this.state.leftlittleedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftlittleedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftlittleleftedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftringedge}
                        id="fingerprint"
                        alt="Left Ring Left Edge"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.leftringedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftringedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftringleftedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftmidedge}
                        id="fingerprint"
                        alt="Left Middle Left Edge"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.leftmidedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftmidedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftmiddleleftedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftindexedge}
                        id="fingerprint"
                        alt="Left Index Left Edge"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.leftindexedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftindexedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftindexleftedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftthumbedge}
                        id="fingerprint"
                        alt="Left Thumb Left Edge"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.leftthumbedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftthumbedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftthumbleftedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>
                </tr>
              </table><br></br><br></br>


              {/* ************************RIGHT EDGES*************** */}
              <h2>LEFT FINGERPRINTS RIGHT EDGES</h2>
              <hr></hr>
              <br></br><br></br>
              <table class="leftfintable" width="100%">

                <tr>
                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftlittlerightedge}
                        id="fingerprint"
                        alt="Left Little Right Edges"
                      /></div>
                    &nbsp;
                    <center>  <input type="text" value={this.state.leftlittlerightedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftlittlerightedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftlittlerightedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftindexrightedge}
                        id="fingerprint"
                        alt="Left Index Right Edge"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.leftindexrightedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftindexrightedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftindexrightedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftmidrightedge}
                        id="fingerprint"
                        alt="Left Middle Right Edge"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.leftmidrightedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftmidrightedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftmiddlerightedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftringrightedge}
                        id="fingerprint"
                        alt="Left Ring Right Edge"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.leftringrightedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftringrightedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftringrightedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.leftthumbrightedge}
                        id="fingerprint"
                        alt="Left Thumb Right Edge"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.leftthumbrightedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("leftthumbrightedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input id="leftthumbrightedgedesc" class="fingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>
                </tr>
              </table><br></br>
              <br></br>
              <input
                type="button"
                name="save"
                onClick={() => this.saveleft()}
                value="Save Left Fingerprints"
              ></input><br></br>
              &nbsp;<br></br>
            </Tab>
            {/* **************************

                          Right FingerPrints

                        ************************** */}

            <Tab isSelected={this.state.selected === 'Right Biometrics'}>
              {/* Right Biometrics */}<br></br>
              <h2>RIGHT FINGERPRINTS</h2><br></br>
              <table class="leftfintable" width="100%">

                <tr>
                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightlittlefinger}
                        id="fingerprint"
                        alt="Right Little Finger"
                      /></div>
                    &nbsp;
                    <center>  <input type="text" value={this.state.rightlittletext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightlittlefinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightlittlefingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightringfinger}
                        id="fingerprint"
                        alt="Right Index Finger"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.rightringtext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightringfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightringfingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightmidfinger}
                        id="fingerprint"
                        alt="Right Mid Finger"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.rightmidtext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightmidfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightmidfingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightindexfinger}
                        id="fingerprint"
                        alt="Right Index Finger"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.rightindextext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightindexfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightindexfingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightthumbfinger}
                        id="fingerprint"
                        alt="Right Thumb Finger"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.rightthumbtext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightthumbfinger")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightthumbfingerdesc" type="text" placeholder="Description..."></input></center>
                  </td>
                </tr>


              </table>

              {/* ************************Right Fingers edges**************************** */}
              <br></br><br></br>
              <hr></hr>
              <h2>RIGHT FINGERPRINTS RIGHT EDGES</h2><br></br>
              <table class="leftfintable" width="100%">

                <tr>
                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightlittleedge}
                        id="fingerprint"
                        alt="Right Little Right Edges"
                      /></div>
                    &nbsp;
                    <center>  <input type="text" value={this.state.rightlittleedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightlittleedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightlittlrighteedgedesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightringedge}
                        id="fingerprint"
                        alt="Right Ring Right Edges"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.rightringedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightringedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" type="text" id="rightringrightedgedesc" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightmidedge}
                        id="fingerprint"
                        alt="Right Mid Right Edges"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.rightmidedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightmidedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" type="text" id="rightmidrightedge" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightindexedge}
                        id="fingerprint"
                        alt="Right Index Right Edges"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.rightindexedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightindexedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" type="text" id="rightindexrightedges" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightthumbedge}
                        id="fingerprint"
                        alt="Right Thumb Right Edges"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.rightthumbedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightthumbedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" type="text" id="rightthumbrightedge" placeholder="Description..."></input></center>
                  </td>
                </tr>


              </table>



              <br></br><br></br>
              <hr></hr>
              <h2>RIGHT FINGERPRINTS LEFT EDGES</h2><br></br>
              <table class="leftfintable" width="100%">

                <tr>
                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightlittleleftedge}
                        id="fingerprint"
                        alt="Right Little Left Edges"
                      /></div>
                    &nbsp;
                    <center>  <input type="text" value={this.state.rightlittleleftedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightlittleleftedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightlittleleftedgedesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightringleftedge}
                        id="fingerprint"
                        alt="Right Ring Left Edges"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.rightringleftedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightringleftedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightringleftedgedesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightmidleftedge}
                        id="fingerprint"
                        alt="Right Mid Left Edges"
                      /></div>
                    &nbsp;
                    <center><input type="text" value={this.state.rightmidleftedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightmidleftedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightmidleftedgedesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightindexleftedge}
                        id="fingerprint"
                        alt="Right Index Left Edges"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.rightindexleftedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightindexleftedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightindexleftedgedesc" type="text" placeholder="Description..."></input></center>
                  </td>

                  <td>
                    <div class="zoom">
                      <img
                        src={this.state.rightthumbleftedge}
                        id="fingerprint"
                        alt="Right Thumb Left Edges"
                      /></div>
                    &nbsp;
                    <center> <input type="text" value={this.state.rightthumbleftedgetext} /></center>
                    <br></br>
                    <input
                      type="button"
                      onClick={() => this.Capture("rightthumbleftedge")}
                      value="Capture"
                    /><br></br>
                    &nbsp;
                    <center> <input class="fingerdesc" id="rightthumbleftedgedesc" type="text" placeholder="Description..."></input></center>
                  </td>
                </tr>


              </table>
              <br></br><br></br>
              <input
                type="button"
                name="save"
                onClick={() => this.saveright()}
                value="Save Left Fingerprints"
              ></input><br></br><br></br><br></br>
            </Tab>

            {/* ********************** Preview ****************************** */}

            <Tab isSelected={this.state.selected === 'Preview'} >
              <div id='printMe'>
                <br></br>
                {/* <button onclick="printDiv('printMe')">Print </button> */}
                <button id="printpdf" onClick={() => this.printDiv('printMe')}>Print </button>

                <h2 id="previeword">PREVIEW</h2><br></br>
                <br></br>
                <center>
                  <table width="90%" >
                    <tr>
                      <td>

                        <label id="">Name </label>
                        <input type="text" name="previewname" value={this.state.previewname} class="previewtextfield" id="previewname" readonly />
                      </td>

                      <td>
                        <label id=" ">Age </label>
                        <input type="text" class="previewtextfield" value={this.state.previewage} id="previewage" />
                      </td>

                      <td>
                        <label id=" ">Gender </label>
                        <input type="text" class="previewtextfield" value={this.state.previewgender} id="previewgender" />
                      </td>

                      <td>
                        <label id=" ">Address </label>
                        <input type="text" class="previewtextfield" value={this.state.previewaddress} id="previewaddress" />
                      </td>


                      <td>
                        <label id=" ">State </label>
                        <input type="text" class="previewtextfield" value={this.state.previewstate} id="previewstate" />
                      </td>


                    </tr>
                    <tr>
                      <td>
                        <label id=" ">Type of Growth </label>
                        <select id="tfg" name="tfg" onChange={(e) => this.setTypeOfGrowth(e.target.value)}>
                          <option value="none">Select</option>
                          <option value="Average">Average</option>
                          <option value="Horizontal">Horizontal</option>
                          <option value="Vertical">Vertical</option>
                        </select>
                      </td>
                    </tr>
                  </table>
                </center>
                <input type="button" value="Submit" onClick={this.store()} ></input>
                 <br></br>
                <h3>LEFT FINGERPRINTS</h3> <br></br>
                <hr></hr>
                <table width="100%" border="0" >
                  <tr>
                    <th>LEFT FINGERS</th>
                    <th>RIGHT FINGERS</th>
                  </tr>
                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftthumbfinger}
                              id="fingerprint"
                              alt="Left Thumb Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT THUMB FINGER </label>
                              <input id="previewdesc" value={this.state.leftthumbfingerpreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightthumbfinger}
                              id="fingerprint"
                              alt="Right Thumb finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT THUMB FINGER </label>
                              <input id="previewdesc" value={this.state.rightthumbfingerpreview} type="text" placeholder="Description..."></input></center>

                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftindexfinger}
                              id="fingerprint"
                              alt="Left Index Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT INDEX FINGER </label>
                              <input id="previewdesc" value={this.state.leftindexfingerpreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightindexfinger}
                              id="fingerprint"
                              alt="Right Index Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT INDEX FINGER </label>
                              <input id="previewdesc" type="text" value={this.state.rightindexfingerpreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftmidfinger}
                              id="fingerprint"
                              alt="Left Mid Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT MIDDLE FINGER</label>
                              <input id="previewdesc" value={this.state.leftmidfingerpreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightmidfinger}
                              id="fingerprint"
                              alt="Right Mid Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT MIDDLE FINGER </label>
                              <input id="previewdesc" value={this.state.rightmiddlefingerpreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftringfinger}
                              id="fingerprint"
                              alt="Left Ring Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT RING FINGER </label>
                              <input id="previewdesc" value={this.state.leftringfingerpreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightringfinger}
                              id="fingerprint"
                              alt="Right Ring Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT RING FINGER </label>
                              <input id="previewdesc" value={this.state.rightringfingerpreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftlittlefinger}
                              id="fingerprint"
                              alt="Left Little Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT LITTLE FINGER </label>
                              <input id="previewdesc" value={this.state.leftlittlefingerpreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr height="150px">
                          <td>
                            <img
                              src={this.state.rightlittlefinger}
                              id="fingerprint"
                              alt="Right Little Finger"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT LITTLE FINGER </label>
                              <input id="previewdesc" type="text" value={this.state.rightlittlefingerpreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <hr></hr>
                  {/* ******FINGER LEFT EDGES****** */}
                  <tr>
                    <th>LEFT FINGER LEFT EDGES</th>
                    <th>RIGHT FINGER RIGHT EDGES</th>
                  </tr>
                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftthumbedge}
                              id="fingerprint"
                              alt="Left Thumb Left Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT THUMB LEFT EDGES </label>
                              <input id="previewdesc" value={this.state.lefthumbleftedgepreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightthumbedge}
                              id="fingerprint"
                              alt="Right Thumb Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT THUMB Right EDGES </label>
                              <input id="previewdesc" value={this.state.rightthumbrightedgepreview} type="text" placeholder="Description..."></input></center>

                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftindexedge}
                              id="fingerprint"
                              alt="Left Index Left Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT INDEX Left EDGES </label>
                              <input id="previewdesc" type="text" value={this.state.leftindexleftedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightindexedge}
                              id="fingerprint"
                              alt="Right Index Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT INDEX RIGHT EDGES </label>
                              <input id="previewdesc" value={this.state.rightindexrightedgepreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftmidedge}
                              id="fingerprint"
                              alt="Left Mid Left Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT MIDDLE LEFT EDGES</label>
                              <input id="previewdesc" value={this.state.leftmiddleleftedgepreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightmidedge}
                              id="fingerprint"
                              alt="Right Mid Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT MIDDLE RIGHT EDGES</label>
                              <input id="previewdesc" value={this.state.rightmiddlerightedgepreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftringedge}
                              id="fingerprint"
                              alt="Left Ring Left Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT RING LEFT EDGES</label>
                              <input id="previewdesc" value={this.state.leftringleftedgepreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.rightringedge}
                              id="fingerprint"
                              alt="Right Ring Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT RING Right EDGES</label>
                              <input id="previewdesc" value={this.state.rightringrightedgepreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>


                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftlittleedge}
                              id="fingerprint"
                              alt="Left Little Left Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT LITTLE LEFT EDGES</label>
                              <input id="previewdesc" value={this.state.leftlittleleftedgepreview} type="text" placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr height="150px">
                          <td>
                            <img
                              src={this.state.rightlittleedge}
                              id="fingerprint"
                              alt="Right Little Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT LITTLE RIGHT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.rightlittlerightedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>
                  {/* **************************FINGERS RIGHT EDGES*************************************** */}
                  <tr>
                    <th>LEFT FINGER RIGHT EDGES</th>
                    <th>RIGHT FINGER LEFT EDGES</th>
                  </tr>
                  <hr></hr>

                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftlittlerightedge}
                              id="fingerprint"
                              alt="Left Little Finger Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT LITTLE RIGHT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.leftlittlerightedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr height="150px">
                          <td>
                            <img
                              src={this.state.rightlittleleftedge}
                              id="fingerprint"
                              alt="Right Little Left Edge"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT LITTLE LEFT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.rightlittleleftedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>

                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftindexrightedge}
                              id="fingerprint"
                              alt="Left index Finger Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT INDEX RIGHT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.leftindexrightedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr height="150px">
                          <td>
                            <img
                              src={this.state.rightindexleftedge}
                              id="fingerprint"
                              alt="Right Index Left Edge"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT INDEX LEFT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.rightindexleftedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>

                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftmidrightedge}
                              id="fingerprint"
                              alt="Left mid Finger Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT MID RIGHT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.leftmidrightedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr height="150px">
                          <td>
                            <img
                              src={this.state.rightmidleftedge}
                              id="fingerprint"
                              alt="Right Middle Left Edge"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT MID LEFT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.rightmidleftedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>

                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftringrightedge}
                              id="fingerprint"
                              alt="Left Ring Finger Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT RING RIGHT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.leftringrightedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr height="150px">
                          <td>
                            <img
                              src={this.state.rightringleftedge}
                              id="fingerprint"
                              alt="Right Ring Left Edge"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT RING LEFT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.rightringleftedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>

                  <tr height="230px">
                    <td>
                      <table width="100%" >
                        <tr>
                          <td>
                            <img
                              src={this.state.leftthumbrightedge}
                              id="fingerprint"
                              alt="Left Thumb Finger Right Edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">LEFT THUMB RIGHT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.leftthumbrightedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>
                      </table>

                    </td>
                    <td>
                      <table width="100%" >
                        <tr height="150px">
                          <td>
                            <img
                              src={this.state.rightthumbleftedge}
                              id="fingerprint"
                              alt="Right thumb left edges"
                            />
                          </td>
                          <td>
                            <center> <label id=" ">RIGHT THUMB LEFT EDGES</label>
                              <input id="previewdesc" type="text" value={this.state.rightthumbleftedgepreview} placeholder="Description..."></input></center>
                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>


                </table>
              </div>
            </Tab>
          </TabNav>
        </div>



      </div>
    );
  }
}

export default App;

