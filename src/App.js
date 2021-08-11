import './App.css';
import $ from "jquery";
import React, { Component } from "react";
import { useState } from "react";
import TabNav from './component/tabnav.js';
import Tab from './component/tab.js';
import './App.css';
import { BsFillPersonPlusFill } from "react-icons/bs";


var quality = 60;
var timeout = 10;
var uri = "https://localhost:8003/mfs100/"; //Secure
var KeyFlag = "";
var isGetSuccess = false;
let thrownError = "";

class App extends Component {


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
      selected: 'Home'
    };
    // this.captureFile = this.captureFile.bind(this);

    // this.onSubmit = this.onSubmit.bind(this);
  }
  setSelected = (tab) => {
    this.setState({ selected: tab });
  }
  GetMFS100Info() {
    KeyFlag = "";
    return this.GetMFS100Client("info");
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
    if (finger == "leftringfinger") {
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
    else if (finger == "leftlittlefinger") {
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
    else if (finger == "leftmidfinger") {
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
    else if (finger == "leftindexfinger") {
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

  }

  render() {
    return (
      <div className="App">
        <div className="App mt-4">
          <TabNav tabs={['Home', 'Settings', 'Profile']} selected={this.state.selected} setSelected={this.setSelected}>
            <Tab isSelected={this.state.selected === 'Home'}>
              <br></br><br></br>
              <table class="search">
                <tr>
                  <td>
                    <label id="labeldes">Search </label>
                  </td>
                  <td>
                    <select id="searchbydetails" name="country">
                      <option value="australia">Name</option>
                      <option value="canada">Age</option>
                      <option value="usa">Sex</option>
                      <option value="usa">State</option>
                      <option value="usa">Type of Growth Pattern</option>
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
                        <th>State</th>
                        <th>Type of Growth Pattern</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                      </tr>
                      <tr>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                        <td>Data Not Available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button id="addparticipant">Add Participant&nbsp;&nbsp;<BsFillPersonPlusFill /></button>
            </Tab>
            <Tab isSelected={this.state.selected === 'Settings'}>
              <h1>More test text</h1>
            </Tab>
            <Tab isSelected={this.state.selected === 'Profile'}>
              <ul>
                <li>List test 1</li>
                <li>List test 2</li>
                <li>List test 3</li>
              </ul>


              <img
                src={this.state.leftlittlefinger}
                id="fingerprint"
                alt="Capture Fingerprint"
              />
              &nbsp;
              <input type="text" value={this.state.leftlittletext} />
              <input
                type="button"
                onClick={() => this.Capture("leftlittlefinger")}
                value="Capture"
              />
              <h2>Left little Finger</h2>
              <img
                src={this.state.leftringfinger}
                id="fingerprint"
                alt="Capture Fingerprint"
              />
              <input type="text" value={this.state.leftringtext} />
              <input
                type="button"
                onClick={() => this.Capture("leftringfinger")}
                value="Capture"
              />
              <h2>Left ring Finger</h2>

              <img
                src={this.state.leftmidfinger}
                id="fingerprint"
                alt="Capture Fingerprint"
              />
              <input type="text" value={this.state.leftmidtext} />
              <input
                type="button"
                onClick={() => this.Capture("leftmidfinger")}
                value="Capture"
              />
              <h2>Left Middle Finger</h2>

              <img
                src={this.state.leftindexfinger}
                id="fingerprint"
                alt="Capture Fingerprint"
              />
              <input type="text" value={this.state.leftindextext} />
              <input
                type="button"
                onClick={() => this.Capture("leftindexfinger")}
                value="Capture"
              />
              <h2>Left Index Finger</h2>
            </Tab>
          </TabNav>
        </div>



      </div>
    );
  }
}

export default App;

