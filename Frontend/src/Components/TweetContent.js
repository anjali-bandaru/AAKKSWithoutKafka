import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import FollowersTweets from "./FollowersTweets.js";
const settings = require("../config/settings.js");

var faker = require('faker');

export class TweetContent extends Component {
    state = {
        allTweets : []
    }
    constructor(props) {
        super(props);
    }
    /*componentDidMount() {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/getFollowersTweets";
        //TODO :get userId from local storage
        //TODO :or get followers list from local storage and send it
        let data = {userId : 123};
        axios.defaults.withCredentials = true;
       axios({
            method: 'post',
            url: postURL,        
            data: data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
            //headers: {"Authorization" : `Bearer ${token}`} 
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                if(responseData.status){
                    this.setState({
                        allTweets : responseData.message
                    });
                } else {
                    swal(responseData.message);
                }
                //swal(responseData.message); 
            }).catch(function (err) {
                console.log(err)
            });
    }*/

    /*generateFakeData = () => {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/writeATweet"; 
        for(let i=0; i< 1000; i++){
            let fakeNumber = faker.random.number({'min':1, 'max':10});
            let fakeUserId = faker.random.number({'min':1, 'max':10000});
            let fakeText = faker.random.words(fakeNumber);
            let data = {userId : fakeUserId, tweetText :fakeText};
            if(fakeText){
                //console.log(fakeText);
                axios({
                    method: 'post',
                    url: postURL,        
                    data: data,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } },
                    //headers: {"Authorization" : `Bearer ${token}`} 
                })
                    .then((response) => {
                        if (response.status >= 500) {
                            throw new Error("Bad response from server");
                        }
                        return response.data;
                    })
                    .then((responseData) => {
                        console.log(responseData.message);
                        
                    }).catch(function (err) {
                        console.log(err)
                    });
            }
                
        }
    };*/

    writeATweet = (tweetObj) =>{
        //TODO :get userId from local storage
        let data = {userId : 123, tweetText :tweetObj.tweetText};
        //let data = {userId : 123};
        let postURL = "http://"+settings.hostname+":"+settings.port+"/writeATweet";
        axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: postURL,        
            data: data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
            //headers: {"Authorization" : `Bearer ${token}`} 
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                swal(responseData.message);
                
            }).catch(function (err) {
                console.log(err)
            });
    }

    submitHandler = (evt) =>{
        debugger;
        evt.preventDefault();
        let target = evt.target;
        var formData = new FormData(evt.target);
        let tweetObj = { "tweetText": formData.get('tweetText') }
        
        this.writeATweet(tweetObj);
    }

    getUserTweets = () => {
        let data = {userId : 1000};
        //let data = {userId : 123};
        let postURL = "http://"+settings.hostname+":"+settings.port+"/getUserTweets";
        axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: postURL,        
            data: data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
            //headers: {"Authorization" : `Bearer ${token}`} 
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                swal(responseData.message);
                
            }).catch(function (err) {
                console.log(err)
            });
    }

    render(){
        let allTweetsComponent;
        if(this.state.allTweets && this.state.allTweets.length > 0){
            allTweetsComponent = <FollowersTweets allTweets = {this.state.allTweets} />;
        }
        return (
            <div>
                <form onSubmit = {this.submitHandler}>
                    <textarea name="tweetText" className = "form-control"></textarea>
                    <button className = "btn btn-success" type="submit">Submit</button>
                </form>
                <Button onClick = {this.getUserTweets}>Get Tweets</Button>
                <Button onClick = {this.generateFakeData}>generateFakeData</Button>
                {allTweetsComponent}
            </div>
        );
    }
}

export default TweetContent;