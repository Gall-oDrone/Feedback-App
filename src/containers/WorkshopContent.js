import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import {workshopDetailURL} from "../constants";
import { connect } from 'react-redux';
import { Menu, Tabs, Form } from "antd";
import { Link, withRouter } from "react-router-dom";
import { workshopDirectBuyURL, workshopRegisterURL, workshopContentURL } from "../constants";
import * as actions from "../store/actions/auth";
import {getWorkshopContent} from  "../store/actions/workshops";
import { authAxios } from '../utils';
import "../assets/workshopContent.css"
import moment from 'moment';

const { SubMenu } = Menu;
const { TabPane } = Tabs;
const format = 'HH';
class WorkshopContent extends React.Component {

    state = {
        article: {},
        date: null,
        loading: false,
        startTime: null,
        endTime: null,
        disable: false,
        visible: false,
        weekdays: null,
        months:null,
        dates: null,
        maxHrs: null,
        startTime: null,
        endTime: null,
        orderId: null,
        author: null,
        author_pic: null,
        lessons: null,
        lessons_topic: null,
        registered: false,
        wsh_content: null,
        open: null,
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      handleDateFormat(selectedDateTime, myDate){
        selectedDateTime.date(myDate.date());
        selectedDateTime.month(myDate.month());
        selectedDateTime.year(myDate.year());
        return selectedDateTime
      }

      handleRegisterForm() {
            const workshopId = this.props.match.params.workshopID
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.post(workshopRegisterURL(workshopId))
                .then(res => {
                    if (res.status === 201) {
                    this.setState({ registered: true})
                    }
                })
                .catch(error => console.error(error))
                console.log('Error');
        }
    handleOpenLessonDetail = (e, i) => {
        if(this.state.open){
            this.setState({
                open: null,
              });
        } else {
            this.setState({
                open: e.target.innerText,
              });
        } 
    }

    openList = (elements) => {
        console.log("DUCKMAN: ", elements)
        return (
            <div style={{display:"initial"}} className="pro-workshop-lesson-details show-on-open">
                <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                    <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">

                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
            <script async="" src="//fast.wistia.com/embed/medias/qm6lw06e9b.jsonp"></script>
            <div className="wistia_embed wistia_async_qm6lw06e9b wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-qm6lw06e9b-1">
                <div id="wistia_chrome_29" className="w-chrome" corso="display: inline-block; height: 510px; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 908px; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                    <div id="wistia_grid_53_wrapper" corso="display: block; width: 908px; height: 510px;">
                        <div id="wistia_grid_53_above" corso="height: 0px; font-size: 0px; line-height: 0px;"> </div>
                        <div id="wistia_grid_53_main" corso="width: 908px; left: 0px; height: 510px; margin-top: 0px;">
                        <div id="wistia_grid_53_behind"></div>
                        <div id="wistia_grid_53_center" corso="width: 100%; height: 100%;">
                            <div className="w-video-wrapper w-css-reset" corso="height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);">
                                <video id="wistia_simple_video_153" crossorigin="anonymous" corso="background: transparent none repeat scroll 0% 0%; display: block; height: 100%; max-height: none; max-width: none; position: static; visibility: visible; width: 100%; object-fit: contain;" poster="https://fast.wistia.com/assets/images/blank.gif" aria-label="Video" defaultplaybackrate="1" src="blob:https://www.hackster.io/668f190a-b7ab-db40-a3ba-49646bab16e1" controlslist="nodownload" playsinline="" preload="none" type="video/m3u8" x-webkit-airplay="allow">
                                    {/* <track kind="chapters" label="Spanish" srclang="es" src="data:text/vtt;base64,V0VCVlRUCgoxCjAwOjAwOjA4Ljk1OCAtLT4gMDA6MDA6NDQuNDQ2ClBhcnRpY2xlIDEwMSAtIEEgTGFwIEFyb3VuZCB0aGUgUGFydGljbGUgRWNvc3lzdGVtCgoyCjAwOjAwOjQ0LjQ0NyAtLT4gMDA6MDA6NDcuMzk4CldoeSBQYXJ0aWNsZT8KCjMKMDA6MDA6NDcuMzk5IC0tPiAwMDowMToyNS4zNjQKRnVsbC1TdGFjayBJb1QgRGV2aWNlIFBsYXRmb3JtCgo0CjAwOjAxOjI1LjM2NSAtLT4gMDA6MDI6MDYuNTc5CldvcmxkJ3MgTGFyZ2V0cyBJb1QgRGV2ZWxvcGVyIENvbW11bml0eQoKNQowMDowMjowNi41ODAgLS0+IDAwOjAyOjU5Ljk1NQpXaS1maSBGb3IgUHJvdG90eXBpbmcgYW5kIFByb2R1Y3Rpb24KCjYKMDA6MDI6NTkuOTU2IC0tPiAwMDowMzozMy4yNjkKQ2VsbHVsYXIgZm9yIFByb3RvdHlwaW5nIGFuZCBQcm9kdWN0aW9uCgo3CjAwOjAzOjMzLjI3MCAtLT4gMDA6MDQ6MTAuMDY4ClBhcnRpY2xlIDNyZCBHZW5lcmF0aW9uCgo4CjAwOjA0OjEwLjA2OSAtLT4gMDA6MDQ6MzguMTM5ClRoZSBQYXJ0aWNsZSBFY29zeXN0ZW0KCjkKMDA6MDQ6MzguMTQwIC0tPiAwMDowNTozMi42NzkKUGFydGljbGUgRGV2aWNlIE9TCgoxMAowMDowNTozMi42ODAgLS0+IDAwOjA2OjE5LjYxOQpBZHZhbnRhZ2VzIG9mIFVzaW5nIEZpcm13YXJlIExpYnJhcmllcwoKMTEKMDA6MDY6MTkuNjIwIC0tPiAwMDowNjozMS4wODQKRGV2aWNlIENsb3VkICZhbXA7IFNvZnR3YXJlIFRvb2xzCgoxMgowMDowNjozMS4wODUgLS0+IDAwOjA3OjI0LjYwNgpPdmVyIHRoZSBBaXIgKE9UQSkgRGV2aWNlIFVwZGF0ZXMKCjEzCjAwOjA3OjI0LjYwNyAtLT4gMDA6MDg6MjAuOTE0CklERVMgYW5kIERldmVsb3BlciBUb29saW5nCgoxNAowMDowODoyMC45MTUgLS0+IDAwOjA4OjM5LjQxMgpTREtzIGZvciBNb2JpbGUgYW5kIFdlYiBEZXZlbG9wbWVudCAKCjE1CjAwOjA4OjM5LjQxMyAtLT4gMDA6MDk6MDMuMzM5ClBhcnRpY2xlIERldmljZSBDbG91ZCAmYW1wOyBDb25zb2xlCgoxNgowMDowOTowMy4zNDAgLS0+IDAwOjA5OjI5LjM2MQpJbnRlZ3JhdGlvbnMgZm9yIEV4dGVuZGluZyBZb3VyIElvVCBTb2x1dGlvbnMgdG8gT3RoZXIgQ2xvdWRzCgoxNwowMDowOToyOS4zNjIgLS0+IDAwOjEwOjAxLjUyOQpDbGFpbWluZyBZb3VyIEZpcnN0IERldmljZQoKMTgKMDA6MTA6MDEuNTMwIC0tPiAwMDoxMDoyNC4yMzQKTGFiIFByZXJlcXVpc2l0ZXMK">
                                    <track kind="captions" label="English" srclang="eng" src="https://fast.wistia.net/embed/captions/qm6lw06e9b.vtt?language=eng"> */}
                                </video>
                            </div>
                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;">
                                <div className="w-vulcan-v2 w-css-reset" id="w-vulcan-v2-52" corso="box-sizing: border-box; cursor: default; height: 100%; left: 0px; position: absolute; visibility: visible; top: 0px; width: 100%;">
                                    <div className="w-vulcan--background w-css-reset" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;">
                                    <div className="w-css-reset" data-handle="statusBar"></div>
                                    <div className="w-css-reset" data-handle="backgroundFocus"><button aria-label="Reproducir" className="w-css-reset w-vulcan-v2-button" corso="width: 0px; height: 0px; pointer-events: none;" tabindex="0"></button></div>
                                    <div className="w-css-reset" data-handle="thumbnail">
                                        <div>
                                            <div corso="height: 100%; left: 0px; opacity: 1; position: absolute; top: 0px; width: 100%; display: none;" className="w-css-reset"><img className="w-css-reset" srcset="https://embedwistia-a.akamaihd.net/deliveries/e66ca77ad81d320164503bf25df40159.webp?image_crop_resized=640x360 320w, https://embedwistia-a.akamaihd.net/deliveries/e66ca77ad81d320164503bf25df40159.webp?image_crop_resized=640x360 640w, https://embedwistia-a.akamaihd.net/deliveries/e66ca77ad81d320164503bf25df40159.webp?image_crop_resized=960x540 960w, https://embedwistia-a.akamaihd.net/deliveries/e66ca77ad81d320164503bf25df40159.webp?image_crop_resized=1280x720 1280w, https://embedwistia-a.akamaihd.net/deliveries/e66ca77ad81d320164503bf25df40159.webp?image_crop_resized=1920x1080 1920w, https://embedwistia-a.akamaihd.net/deliveries/e66ca77ad81d320164503bf25df40159.webp?image_crop_resized=1920x1080 3840w" src="https://embedwistia-a.akamaihd.net/deliveries/e66ca77ad81d320164503bf25df40159.webp?image_crop_resized=1920x1080" corso="height: 510px; left: 0px; position: absolute; top: 0px; width: 908px; clip: rect(0px, 0px, 0px, 0px); display: none; box-sizing: content-box; border-color: rgb(0, 0, 0); border-corso: solid; border-width: 0px;" alt="Video Thumbnail"/></div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="w-vulcan-overlays-table w-css-reset" corso="display: table; pointer-events: none; position: absolute; width: 100%;">
                                    <div className="w-vulcan-overlays--left w-css-reset" corso="display: table-cell; vertical-align: top; position: relative; width: 0px;">
                                        <div corso="height: 476px;" className="w-css-reset"></div>
                                    </div>
                                    <div className="w-vulcan-overlays--center w-css-reset" corso="display: table-cell; vertical-align: top; position: relative; width: 100%;">
                                        <div corso="height: 476px;" className="w-css-reset">
                                            <div className="w-css-reset" corso="pointer-events: auto;" data-handle="bigPlayButton">
                                                <div className="w-bpb-wrapper w-css-reset w-css-reset-tree" corso="display: none; left: calc(50%); margin-left: -62.5px; margin-top: -40px; position: absolute; top: calc(50%);">
                                                <button className="w-big-play-button w-css-reset-button-important w-vulcan-v2-button" corso="cursor: pointer; height: 80px; box-shadow: none; width: 125px;" aria-label="Reproducir: Module 1 - A Lap Around the Particle Ecosystem">
                                                    <div corso="background: rgb(46, 159, 230) none repeat scroll 0% 0%; display: block; left: 0px; height: 80px; mix-blend-mode: darken; position: absolute; top: 0px; width: 125px;"></div>
                                                    <div corso="background-color: rgba(46, 159, 230, 0.7); height: 80px; left: 0px; position: absolute; top: 0px; transition: background-color 150ms ease 0s; width: 125px;"></div>
                                                    <svg x="0px" y="0px" viewBox="0 0 125 80" enable-background="new 0 0 125 80" corso="fill: rgb(255, 255, 255); height: 80px; left: 0px; stroke-width: 0px; top: 0px; width: 100%; position: absolute;" focusable="false" alt="">
                                                        <rect fill-rule="evenodd" clip-rule="evenodd" fill="none" width="125" height="80"></rect>
                                                        <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="53,22 53,58 79,40"></polygon>
                                                    </svg>
                                                </button>
                                                </div>
                                            </div>
                                            <div className="w-css-reset" corso="pointer-events: auto;" data-handle="clickForSoundButton">
                                                <div className="w-css-reset w-css-reset-tree" data-handle="click-for-sound-backdrop" corso="display: none; height: 100%; left: 0px; pointer-events: auto; position: absolute; top: 0px; width: 100%;">
                                                <button aria-label="Hacer clic para escuchar el sonido" corso="background: rgba(0, 0, 0, 0.8) none repeat scroll 0% 0%; border: 2px solid transparent; border-radius: 50%; cursor: pointer; height: 52.5px; width: 52.5px; line-height: 52.5px; outline: currentcolor none medium; pointer-events: auto; position: absolute; right: 20.5px; text-align: left; top: 20.5px;" className="w-vulcan-v2-button">
                                                    <svg viewBox="0 0 237 237">
                                                        <corso>
                                                            {/* @keyframes VOLUME_SMALL_WAVE_FLASH {
                                                            0% { opacity: 0; }
                                                            33% { opacity: 1; }
                                                            66% { opacity: 1; }
                                                            100% { opacity: 0; }
                                                            }
                                                            @keyframes VOLUME_LARGE_WAVE_FLASH {
                                                            0% { opacity: 0; }
                                                            33% { opacity: 1; }
                                                            66% { opacity: 1; }
                                                            100% { opacity: 0; }
                                                            }
                                                            .volume__small-wave {
                                                            animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;
                                                            opacity: 0;
                                                            }
                                                            .volume__large-wave {
                                                            animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;
                                                            opacity: 0;
                                                            } */}
                                                        </corso>
                                                        <polygon fill="white" points="88 107 65 107 65 131 89 131 112 154 112 84"></polygon>
                                                        <g fill="none" stroke="white" stroke-width="10" stroke-linecap="round">
                                                            <path className="volume__small-wave" d="M 142 86 C 151 107 151 130 142 151"></path>
                                                            <path className="volume__large-wave" d="M 165 74 C 178 97 178 140 165 163"></path>
                                                        </g>
                                                    </svg>
                                                </button>
                                                </div>
                                            </div>
                                            <div className="w-css-reset" corso="pointer-events: auto;" data-handle="playPauseNotifier">
                                                <div className="w-play-pause-notifier" corso="background: rgba(0, 0, 0, 0.6) none repeat scroll 0% 0%; border-radius: 50%; height: 140px; left: 50%; pointer-events: none; position: absolute; opacity: 0; top: 50%; transform: translate(-50%, -50%) scale(0.8); width: 140px; transition: opacity 0.8s ease 0s, transform 0.8s ease 0s;">
                                                <div corso="height: 80px; left: 50%; pointer-events: none; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 50px;">
                                                    <div corso="height: 100%; width: 100%;">
                                                        <div corso="display: block; height: 100%; width: 100%;">
                                                            <svg x="0px" y="0px" viewBox="0 0 10 12" enable-background="new 0 0 10 12" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false" className="w-css-reset w-css-reset-tree">
                                                            <g>
                                                                <rect x="0" y="0" width="3.5" height="12"></rect>
                                                                <rect x="6.5" y="0" width="3.5" height="12"></rect>
                                                            </g>
                                                            </svg>
                                                        </div>
                                                        <div corso="display: none; height: 100%; width: 100%;">
                                                            <svg x="0px" y="0px" viewBox="0 0 10 12" enable-background="new 0 0 10 12" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false" className="w-css-reset w-css-reset-tree">
                                                            <polygon points="11.556,7.5 0,15 0,0"></polygon>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="w-css-reset" corso="pointer-events: auto;" data-handle="captions">
                                                <nothing></nothing>
                                            </div>
                                            <div className="w-css-reset" corso="pointer-events: auto;" data-handle="playPauseLoading">
                                                <div className="w-css-reset w-css-reset-tree" corso="height: 100%; left: 0px; pointer-events: none; position: absolute; top: 0px; width: 100%;">
                                                <button aria-label="Reproducir" className="w-vulcan-v2-button" corso="background: rgba(0, 0, 0, 0.6) none repeat scroll 0% 0%; border: 0px none; border-radius: 50%; cursor: pointer; display: none; height: 140px; left: 50%; margin: 0px; padding: 0px; pointer-events: auto; position: absolute; opacity: 0; outline: currentcolor none medium; top: 50%; transform: translate(-50%, -50%) scale(0.8); transition: opacity 200ms ease 0s, transform 600ms ease 0s; width: 140px;">
                                                    <div aria-live="polite"></div>
                                                    <div corso="box-sizing: border-box; height: 100%; padding: 47.25px 47.25px 47.25px 57.75px;">
                                                        <div corso="height: 100%; width: 100%;">
                                                            <div corso="display: none; height: 100%; width: 100%;">
                                                            <svg x="0px" y="0px" viewBox="0 0 11.556 16" enable-background="new 0 0 11.556 16" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false" className="w-css-reset w-css-reset-tree">
                                                                <g>
                                                                    <rect x="0" y="0" width="3.5" height="12"></rect>
                                                                    <rect x="6.5" y="0" width="3.5" height="12"></rect>
                                                                </g>
                                                            </svg>
                                                            </div>
                                                            <div corso="display: block; height: 100%; width: 100%;">
                                                            <svg x="0px" y="0px" viewBox="0 0 11.556 16" enable-background="new 0 0 11.556 16" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false" className="w-css-reset w-css-reset-tree">
                                                                <polygon points="11.556,7.5 0,15 0,0"></polygon>
                                                            </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                                </div>
                                            </div>
                                            <div className="w-css-reset" corso="pointer-events: auto;" data-handle="annotationOverlay">
                                                <div>
                                                <div corso="position: absolute; display: flex; flex-direction: column; pointer-events: none; max-width: 50%; width: 100%; align-items: flex-start;"></div>
                                                <div corso="position: absolute; display: flex; flex-direction: column; pointer-events: none; max-width: 50%; width: 100%; right: 0px; align-items: flex-end; margin-top: 0px;"></div>
                                                </div>
                                            </div>
                                            <div className="w-css-reset" corso="pointer-events: auto;" data-handle="transcript">
                                                <div corso="position: absolute;" className="w-css-reset"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-vulcan-overlays--right w-css-reset" corso="display: table-cell; vertical-align: top; position: relative; width: 0px;">
                                        <div corso="height: 476px;" className="w-css-reset"></div>
                                    </div>
                                    </div>
                                    <div className="w-bottom-bar w-css-reset" corso="bottom: 0px; border-collapse: collapse; display: table; height: 34px; pointer-events: none; position: absolute; right: 0px; table-layout: auto; width: 100%;">
                                    <div className="w-bottom-bar-upper w-css-reset" corso="display: none; height: auto; pointer-events: none; position: relative;">
                                        <div corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;">
                                            <div corso="background: rgb(46, 159, 230) none repeat scroll 0% 0%; display: none; height: 100%; mix-blend-mode: darken; left: 0px; opacity: 0; position: absolute; top: 0px; transition: opacity 0.2s ease 0s; width: 100%;"></div>
                                            <div corso="background: rgba(46, 159, 230, 0.85) none repeat scroll 0% 0%; height: 100%; opacity: 0; left: 0px; position: absolute; top: 0px; transition: opacity 0.2s ease 0s; width: 100%;"></div>
                                        </div>
                                        <div corso="height: 100%; opacity: 0; position: relative; transition: opacity 0.2s ease 0s;">
                                            <div className="w-css-reset" corso="height: 100%; position: relative;" data-handle="upperPlaybar">
                                                <div className="w-playbar-wrapper w-css-reset w-css-reset-tree" corso="display: flex; height: 100%; width: 908px;">
                                                <div aria-label="Playbar" aria-orientation="horizontal" aria-valuemax="624.234" aria-valuemin="0" aria-valuenow="17.332698" aria-valuetext="0:17" role="slider" corso="cursor: pointer; flex: 1 1 0%; height: 16px; outline: currentcolor none medium; margin-left: 15px; margin-right: 10px; position: relative;" tabindex="-1">
                                                    <canvas height="32" corso="height: 16px; left: -15px; position: absolute; top: 0px; width: 908px;" width="1816"></canvas>
                                                    <div corso="border-radius: 50%; height: 11.2px; left: 18.9177px; opacity: 0; position: absolute; top: 2.4px; width: 11.2px;"></div>
                                                    <div className="w-playbar__chapter-markers w-css-reset w-css-reset-tree" corso="height: 100%; left: 0px; pointer-events: none; position: absolute; top: 0px; width: 100%;"><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 1.43498%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle 101 - A Lap Around the Particle Ecosystem" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 7.12025%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Why Particle?" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 7.59318%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Full-Stack IoT Device Platform" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 13.6751%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="World's Largets IoT Developer Community" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 20.2777%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Wi-fi For Prototyping and Production" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 28.8283%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Cellular for Prototyping and Production" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 34.1651%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle 3rd Generation" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 40.0601%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="The Particle Ecosystem" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 44.557%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle Device OS" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 53.2941%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Advantages of Using Firmware Libraries" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 60.8137%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Device Cloud &amp;amp; Software Tools" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 62.6504%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Over the Air (OTA) Device Updates" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 71.2245%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="IDES and Developer Tooling" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 80.2447%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="SDKs for Mobile and Web Development " tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 83.208%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle Device Cloud &amp;amp; Console" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 87.0411%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Integrations for Extending Your IoT Solutions to Other Clouds" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 91.2097%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Claiming Your First Device" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 96.363%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Lab Prerequisites" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button></div>
                                                    <div className="w-storyboard-anchor" corso="height: 0px; left: 0px; position: absolute; top: 0px; width: 100%;">
                                                        <div className="w-storyboard" corso="bottom: 24px; height: 84.6144px; left: -15px; opacity: 0; overflow: hidden; pointer-events: none; position: absolute; transition: opacity 150ms ease 0s, transform 1000ms cubic-bezier(0, 0.8, 0, 1) 0s; transform: scale(0.83); transform-origin: center bottom 0px; width: 149.76px;">
                                                            <img src="https://embedwistia-a.akamaihd.net/deliveries/3ac77ca9b1ca0a1388fb2ceca3bd10053177fc1c.bin" corso="height: 1692.29px; left: 0px; position: absolute; top: 0px; vertical-align: top; width: 1497.6px;" className="w-css-reset-max-width-none-important"></img>
                                                            <div className="w-storyboard-time" corso="bottom: 0.5em; color: rgb(255, 255, 255); display: inline-block; font-family: WistiaPlayerInterNumbersSemiBold, Helvetica, sans-serif; font-size: 13px; left: 0px; line-height: 34px; position: absolute; text-align: center; width: 100%;"><span corso="background: rgba(0, 0, 0, 0.7) none repeat scroll 0% 0%; border-radius: 3px; display: inline-block; line-height: 1em; padding: 6px;">0:00</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="w-playbar__chapter-titles" corso="height: 0px; left: 0px; pointer-events: none; position: absolute; top: 0px; width: 100%;">
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 12.6709px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Particle 101 - A Lap Around the Particle Ecosystem</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 62.8718px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Why Particle?</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 67.0477px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Full-Stack IoT Device Platform</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 120.751px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">World's Largets IoT Developer Community</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 179.052px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Wi-fi For Prototyping and Production</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 254.554px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Cellular for Prototyping and Production</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 301.678px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">Particle 3rd Generation</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 353.731px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">The Particle Ecosystem</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 393.438px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Particle Device OS</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 470.587px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Advantages of Using Firmware Libraries</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 536.985px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Device Cloud &amp; Software Tools</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 553.203px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Over the Air (OTA) Device Updates</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 628.912px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">IDES and Developer Tooling</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 708.561px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">SDKs for Mobile and Web Development </div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 734.727px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">Particle Device Cloud &amp; Console</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 768.573px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">Integrations for Extending Your IoT Solutions to Other Clouds</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 805.382px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Claiming Your First Device</div>
                                                        <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 850.885px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap;">Lab Prerequisites</div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-bottom-bar-lower w-css-reset" corso="position: relative;">
                                        <div corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;">
                                            <div corso="background: rgb(46, 159, 230) none repeat scroll 0% 0%; display: none; height: 100%; mix-blend-mode: darken; left: 0px; opacity: 0; position: absolute; top: 0px; transition: opacity 0.2s ease 0s; width: 100%;"></div>
                                            <div corso="background: rgba(46, 159, 230, 0.85) none repeat scroll 0% 0%; height: 100%; opacity: 0; left: 0px; position: absolute; top: 0px; transition: opacity 0.2s ease 0s; width: 100%;"></div>
                                        </div>
                                        <div corso="display: none;">
                                            <div corso="background: rgb(46, 159, 230) none repeat scroll 0% 0%; display: none; height: 100%; mix-blend-mode: darken; left: 0px; opacity: 0; position: absolute; top: 0px; transition: opacity 0.2s ease 0s; width: 100%;"></div>
                                            <div corso="background: rgba(46, 159, 230, 0.85) none repeat scroll 0% 0%; height: 100%; opacity: 0; left: 0px; position: absolute; top: 0px; transition: opacity 0.2s ease 0s; width: 100%;"></div>
                                        </div>
                                        <div className="w-bottom-bar-left w-css-reset" corso="display: table-cell; vertical-align: top; position: relative; width: 0px; opacity: 0; transition: opacity 0.2s ease 0s;">
                                            <div className="w-bottom-bar-left-inner w-css-reset" corso="height: 34px; position: relative; pointer-events: none; white-space: nowrap;">
                                                <div className="w-css-reset" corso="display: inline-block; vertical-align: top;" data-handle="smallPlayButton">
                                                <div className="w-vulcan-button-wrapper w-css-reset" corso="display: inline-block; height: 34px; position: relative; vertical-align: top; width: 40px;">
                                                    <button tagname="button" className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important" corso="background-color: rgba(0, 0, 0, 0); box-shadow: none; cursor: pointer; height: 100%; position: relative; transition: background-color 150ms ease 0s; width: 100%;" aria-label="Reproducir" title="Reproducir">
                                                        <div className="w-vulcan-icon-wrapper" corso="box-sizing: border-box; height: 100%; position: relative; transform: scale(1.001); transition: transform 200ms ease 0s;" data-handle="smallPlayButton">
                                                            <div corso="box-sizing: border-box; height: 100%; margin-left: 1px; padding: 10px 0px 9px; position: relative; width: 100%;">
                                                            <div corso="height: 100%; width: 100%;">
                                                                <div corso="display: none; height: 100%; width: 100%;">
                                                                    <svg x="0px" y="0px" viewBox="0 0 11.556 16" enable-background="new 0 0 11.556 16" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%; vertical-align: top;" focusable="false" className="w-css-reset w-css-reset-tree">
                                                                        <g>
                                                                        <rect x="0" y="0" width="3.5" height="12"></rect>
                                                                        <rect x="6.5" y="0" width="3.5" height="12"></rect>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                                <div corso="display: block; height: 100%; width: 100%;">
                                                                    <svg x="0px" y="0px" viewBox="0 0 11.556 16" enable-background="new 0 0 11.556 16" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%; vertical-align: top;" focusable="false" className="w-css-reset w-css-reset-tree">
                                                                        <polygon points="11.556,7.5 0,15 0,0"></polygon>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-bottom-bar-middle w-css-reset" corso="display: table-cell; vertical-align: top; position: relative; width: 100%; opacity: 0; transition: opacity 0.2s ease 0s;">
                                            <div className="w-bottom-bar-middle-inner w-css-reset" corso="height: 34px; position: relative; pointer-events: auto; white-space: nowrap; opacity: 1; transform: translateY(0px); transition: opacity 0ms ease 0s, transform 0ms ease 0s;">
                                                <div className="w-css-reset" corso="height: 100%; position: relative;" data-handle="lowerPlaybar">
                                                <div className="w-playbar-wrapper w-css-reset w-css-reset-tree" corso="display: flex; height: 100%; width: 100%;">
                                                    <div className="w-playbar__time" corso="box-sizing: content-box; color: white; font-family: WistiaPlayerInterNumbersSemiBold, Helvetica, sans-serif; font-size: 13px; letter-spacing: 0.5px; line-height: 34px; padding-left: 5px; pointer-events: none; position: relative; text-align: center; width: 35px;">0:17</div>
                                                    <div aria-label="Playbar" aria-orientation="horizontal" aria-valuemax="624.234" aria-valuemin="0" aria-valuenow="17.332698" aria-valuetext="0:17" role="slider" corso="cursor: pointer; flex: 1 1 0%; height: 34px; outline: currentcolor none medium; margin-left: 15px; margin-right: 10px; position: relative;" tabindex="-1">
                                                        <canvas height="68" corso="height: 34px; left: -15px; position: absolute; top: 0px; width: 628px;" width="1256"></canvas>
                                                        <div corso="border-radius: 50%; height: 11.2px; left: 11.1431px; opacity: 0; position: absolute; top: 11.4px; width: 11.2px;"></div>
                                                        <div className="w-playbar__chapter-markers w-css-reset w-css-reset-tree" corso="height: 100%; left: 0px; pointer-events: none; position: absolute; top: 0px; width: 100%;"><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 1.43498%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle 101 - A Lap Around the Particle Ecosystem" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 7.12025%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Why Particle?" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 7.59318%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Full-Stack IoT Device Platform" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 13.6751%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="World's Largets IoT Developer Community" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 20.2777%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Wi-fi For Prototyping and Production" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 28.8283%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Cellular for Prototyping and Production" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 34.1651%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle 3rd Generation" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 40.0601%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="The Particle Ecosystem" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 44.557%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle Device OS" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 53.2941%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Advantages of Using Firmware Libraries" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 60.8137%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Device Cloud &amp;amp; Software Tools" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 62.6504%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Over the Air (OTA) Device Updates" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 71.2245%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="IDES and Developer Tooling" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 80.2447%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="SDKs for Mobile and Web Development " tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 83.208%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Particle Device Cloud &amp;amp; Console" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 87.0411%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Integrations for Extending Your IoT Solutions to Other Clouds" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 91.2097%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Claiming Your First Device" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button><button className="w-chapter-marker w-css-reset-button-important w-vulcan-v2-button" corso="color: rgb(255, 255, 255); cursor: pointer; height: 100%; font-size: 11px; left: 96.363%; line-height: 1em; opacity: 0; pointer-events: none; position: absolute; text-align: center; top: 0px; transform: translateX(-50%); transition: opacity 170ms ease 0s, transform 170ms ease 0s; width: 16px;" aria-label="Lab Prerequisites" tabindex="-1"><span corso="background: rgb(255, 255, 255) none repeat scroll 0% 0%; border-radius: 50%; display: block; height: 5px; left: 50%; position: absolute; text-indent: -99999em; top: 50%; transform: translate(-50%, -50%); width: 5px;">●</span></button></div>
                                                        <div className="w-storyboard-anchor" corso="height: 0px; left: 0px; position: absolute; top: 0px; width: 100%;">
                                                            <div className="w-storyboard" corso="bottom: 24px; height: 84.6144px; left: -74.88px; opacity: 0; overflow: hidden; pointer-events: none; position: absolute; transition: opacity 150ms ease 0s, transform 1000ms cubic-bezier(0, 0.8, 0, 1) 0s; transform: scale(0.83); transform-origin: center bottom 0px; width: 149.76px;">
                                                            <img src="https://embedwistia-a.akamaihd.net/deliveries/3ac77ca9b1ca0a1388fb2ceca3bd10053177fc1c.bin" corso="height: 1692.29px; left: 0px; position: absolute; top: 0px; vertical-align: top; width: 1497.6px;" className="w-css-reset-max-width-none-important"/>
                                                            <div className="w-storyboard-time" corso="bottom: 0.5em; color: rgb(255, 255, 255); display: inline-block; font-family: WistiaPlayerInterNumbersSemiBold, Helvetica, sans-serif; font-size: 13px; left: 0px; line-height: 34px; position: absolute; text-align: center; width: 100%;"><span corso="background: rgba(0, 0, 0, 0.7) none repeat scroll 0% 0%; border-radius: 3px; display: inline-block; line-height: 1em; padding: 6px;">0:00</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="w-playbar__chapter-titles" corso="height: 0px; left: 0px; pointer-events: none; position: absolute; top: 0px; width: 100%;">
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: -95px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 330.167px;">Particle 101 - A Lap Around the Particle Ecosystem</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: -6.23991px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 98.35px;">Why Particle?</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: -54.7217px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 201.017px;">Full-Stack IoT Device Platform</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: -55.0556px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 275.033px;">World's Largets IoT Developer Community</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 3.47424px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 237.6px;">Wi-fi For Prototyping and Production</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 47.6259px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 252.417px;">Cellular for Prototyping and Production</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 206.015px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">Particle 3rd Generation</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 162.054px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 159.017px;">The Particle Ecosystem</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 203.945px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 129.467px;">Particle Device OS</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 190.88px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 260.967px;">Advantages of Using Firmware Libraries</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 264.615px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 204.183px;">Device Cloud &amp; Software Tools</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 262.624px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 230.317px;">Over the Air (OTA) Device Updates</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 429.484px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">IDES and Developer Tooling</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 354.301px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 259.15px;">SDKs for Mobile and Web Development </div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 501.744px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">Particle Device Cloud &amp; Console</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 524.858px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; transform: translateX(-50%); white-space: nowrap;">Integrations for Extending Your IoT Solutions to Other Clouds</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 461.769px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 176.45px;">Claiming Your First Device</div>
                                                            <div className="w-chapter-title" corso="background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%; bottom: 0px; box-sizing: border-box; color: rgb(255, 255, 255); display: none; font-family: WistiaPlayerInter, Helvetica, sans-serif; font-size: 14px; height: 24px; left: 520.602px; line-height: 24px; padding: 0px 6px; position: absolute; text-align: center; white-space: nowrap; width: 120.933px;">Lab Prerequisites</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-bottom-bar-right w-css-reset" corso="display: table-cell; vertical-align: top; position: relative; width: 0px; opacity: 0; transition: opacity 0.2s ease 0s; white-space: nowrap;">
                                            <div className="w-bottom-bar-right-inner-anchor w-css-reset" corso="height: 34px; position: relative; pointer-events: none; white-space: nowrap; display: inline-block; right: 0px; top: 0px; vertical-align: top;">
                                                <div className="w-bottom-bar-right-inner w-css-reset" corso="height: 34px; position: relative; pointer-events: auto; white-space: nowrap; display: inline-block; opacity: 1; right: 0px; top: 0px; transform: translateY(0px); transition: opacity 0ms ease 0s, transform 0ms ease 0s;">
                                                <div className="w-css-reset" corso="display: inline-block; vertical-align: top;" data-handle="captionsButton">
                                                    <div className="w-vulcan-button-wrapper w-css-reset" corso="display: inline-block; height: 34px; position: relative; vertical-align: top; width: 40px;">
                                                        <button tagname="button" className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important" corso="background-color: rgba(0, 0, 0, 0); box-shadow: none; cursor: pointer; height: 100%; position: relative; transition: background-color 150ms ease 0s; width: 100%;" aria-expanded="false" aria-label="Mostrar el menú de subtítulos" title="Mostrar el menú de subtítulos">
                                                            <div className="w-vulcan-icon-wrapper" corso="box-sizing: border-box; height: 100%; position: relative; transform: scale(1.001); transition: transform 200ms ease 0s;" data-handle="captionsButton">
                                                            <svg x="0px" y="0px" viewBox="0 0 40 34" enable-background="new 0 0 40 34" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false">
                                                                <g>
                                                                    <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.8" d="M18.4,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"></path>
                                                                </g>
                                                                <g>
                                                                    <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.8" d="M25.8,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"></path>
                                                                </g>
                                                                <g>
                                                                    <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31,21.9c0,1.6-1.4,3-3,3H12c-1.6,0-3-1.4-3-3V12c0-1.6,1.4-3,3-3h16c1.6,0,3,1.4,3,3V21.9z"></path>
                                                                </g>
                                                            </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-css-reset" corso="display: inline-block; vertical-align: top;" data-handle="volumeButton">
                                                    <div className="w-vulcan-button-wrapper w-css-reset" corso="display: inline-block; height: 34px; position: relative; vertical-align: top; width: 40px;">
                                                        <button tagname="button" className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important" corso="background-color: rgba(0, 0, 0, 0); box-shadow: none; cursor: pointer; height: 100%; position: relative; transition: background-color 150ms ease 0s; width: 100%;" aria-label="Silenciar" title="Silenciar">
                                                            <div className="w-vulcan-icon-wrapper" corso="box-sizing: border-box; height: 100%; position: relative; transform: scale(1.001); transition: transform 200ms ease 0s;" data-handle="volumeButton">
                                                            <svg x="0px" y="0px" viewBox="0 0 40 34" enable-background="new 0 0 40 34" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false">
                                                                <g corso="transform: translateX(1.25px); transition: transform 100ms ease 0s;">
                                                                    <g>
                                                                        <path d="M13.8,14.2c-0.5,0.5-1.4,0.8-2,0.8h-1.6C9.5,15,9,15.5,9,16.2v1.6c0,0.7,0.5,1.2,1.2,1.2h1.6c0.7,0,1.6,0.4,2,0.8l2.3,2.3c0.5,0.5,0.8,0.3,0.8-0.4v-9.6c0-0.7-0.4-0.8-0.8-0.4L13.8,14.2z"></path>
                                                                    </g>
                                                                    <g>
                                                                        <path fill="none" stroke="#ffffff" stroke-line-cap="round" stroke-miterlimit="10" stroke-width="2" d="M22,11.7c0,0,1.1,2.5,1.1,5s-1.1,5-1.1,5" corso="opacity: 1; transition: opacity 100ms ease 0s;"></path>
                                                                        <path fill="none" stroke="#ffffff" stroke-line-cap="round" stroke-miterlimit="10" stroke-width="2" d="M25.8,9.2c0,0,1.7,3.8,1.7,7.5c0,3.7-1.7,7.5-1.7,7.5" corso="opacity: 1; transition: opacity 100ms ease 0s;"></path>
                                                                    </g>
                                                                    <g corso="opacity: 0; transition: opacity 100ms ease 0s;">
                                                                        <line fill="none" stroke="#ffffff" stroke-line-cap="round" stroke-miterlimit="10" stroke-width="1.8102" x1="19.2" y1="15" x2="23.2" y2="19"></line>
                                                                        <line fill="none" stroke="#ffffff" stroke-line-cap="round" stroke-miterlimit="10" stroke-width="1.8102" x1="19.2" y1="19" x2="23.2" y2="15"></line>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-css-reset" corso="display: inline-block; vertical-align: top;" data-handle="settingsButton">
                                                    <div className="w-vulcan-button-wrapper w-css-reset" corso="display: inline-block; height: 34px; position: relative; vertical-align: top; width: 40px;">
                                                        <button tagname="button" className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important" corso="background-color: rgba(0, 0, 0, 0); box-shadow: none; cursor: pointer; height: 100%; position: relative; transition: background-color 150ms ease 0s; width: 100%;" aria-expanded="false" aria-label="Show settings menu" title="Show settings menu">
                                                            <div className="w-vulcan-icon-wrapper" corso="box-sizing: border-box; height: 100%; position: relative; transform: scale(1.001); transition: transform 200ms ease 0s;" data-handle="settingsButton">
                                                            <svg x="0px" y="0px" viewBox="0 0 40 34" enable-background="new 0 0 40 34" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false">
                                                                <g>
                                                                    <g>
                                                                        <path d="M28.3,16.4h-1.9c-0.4,0-0.8-0.3-0.9-0.7l-0.4-1.1c-0.2-0.3-0.1-0.8,0.2-1.1l1.3-1.3c0.3-0.3,0.3-0.7,0-1l-0.4-0.4c-0.3-0.3-0.7-0.3-1,0l-1.3,1.3c-0.3,0.3-0.8,0.3-1.1,0.1l-1.1-0.5c-0.4-0.1-0.7-0.5-0.7-0.9V9.1c0-0.4-0.3-0.7-0.7-0.7h-0.6c-0.4,0-0.7,0.3-0.7,0.7v1.7c0,0.4-0.3,0.8-0.7,0.9l-1.2,0.5c-0.3,0.2-0.8,0.1-1.1-0.2l-1.2-1.2c-0.3-0.3-0.7-0.3-1,0l-0.4,0.4c-0.3,0.3-0.3,0.7,0,1l1.2,1.2c0.3,0.3,0.3,0.8,0.1,1.1l-0.5,1.2c-0.1,0.4-0.5,0.7-0.9,0.7h-1.6c-0.4,0-0.7,0.3-0.7,0.7v0.6c0,0.4,0.3,0.7,0.7,0.7h1.6c0.4,0,0.8,0.3,0.9,0.7l0.5,1.2c0.2,0.3,0.1,0.8-0.1,1.1l-1.2,1.2c-0.3,0.3-0.3,0.7,0,1l0.4,0.4c0.3,0.3,0.7,0.3,1,0l1.2-1.2c0.3-0.3,0.8-0.3,1.1-0.2l1.2,0.5c0.4,0.1,0.7,0.5,0.7,0.9v1.7c0,0.4,0.3,0.7,0.7,0.7h0.6c0.4,0,0.7-0.3,0.7-0.7V24c0-0.4,0.3-0.8,0.7-0.9l1.1-0.5c0.3-0.2,0.8-0.1,1.1,0.1l1.3,1.3c0.3,0.3,0.7,0.3,1,0l0.4-0.4c0.3-0.3,0.3-0.7,0-1l-1.3-1.3C25,21,25,20.5,25.1,20.2l0.4-1.1c0.1-0.4,0.5-0.7,0.9-0.7h1.9c0.4,0,0.7-0.3,0.7-0.7v-0.6C29,16.7,28.7,16.4,28.3,16.4z M23.8,17.5c0,2.2-1.8,3.9-3.9,3.9c-2.2,0-3.9-1.8-3.9-3.9s1.7-3.9,3.9-3.9C22.1,13.6,23.8,15.3,23.8,17.5z"></path>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-css-reset" corso="display: inline-block; vertical-align: top;" data-handle="chapters">
                                                    <div className="w-vulcan-button-wrapper w-css-reset" corso="display: inline-block; height: 34px; position: relative; vertical-align: top; width: 40px;">
                                                        <button tagname="button" className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important" corso="background-color: rgba(0, 0, 0, 0); box-shadow: none; cursor: pointer; height: 100%; position: relative; transition: background-color 150ms ease 0s; width: 100%;" aria-expanded="false" aria-label="Abrir capítulos" title="Abrir capítulos">
                                                            <div className="w-vulcan-icon-wrapper" corso="box-sizing: border-box; height: 100%; position: relative; transform: scale(1.001); transition: transform 200ms ease 0s;" data-handle="chapters">
                                                            <div corso="height: 100%;">
                                                                <svg x="0px" y="0px" viewBox="0 0 40 34" enable-background="new 0 0 40 34" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false">
                                                                    <g>
                                                                        <g>
                                                                        <circle cx="10.6" cy="10.1" r="1.6"></circle>
                                                                        <path d="M29.5,10.1c0,0.6-0.5,1.1-1.1,1.1H15.7c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-0.6,0.5-1.1,1.1-1.1h12.7C29,9.1,29.5,9.5,29.5,10.1L29.5,10.1z"></path>
                                                                        </g>
                                                                        <g>
                                                                        <circle cx="10.6" cy="16.8" r="1.6"></circle>
                                                                        <path d="M29.5,16.8c0,0.6-0.5,1.1-1.1,1.1H15.7c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-0.6,0.5-1.1,1.1-1.1h12.7C29,15.7,29.5,16.2,29.5,16.8L29.5,16.8z"></path>
                                                                        </g>
                                                                        <g>
                                                                        <circle cx="10.6" cy="23.4" r="1.6"></circle>
                                                                        <path d="M29.5,23.4c0,0.6-0.5,1.1-1.1,1.1H15.7c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-0.6,0.5-1.1,1.1-1.1h12.7C29,22.4,29.5,22.9,29.5,23.4L29.5,23.4z"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-css-reset" corso="display: inline-block; vertical-align: top;" data-handle="fullscreenButton">
                                                    <div className="w-vulcan-button-wrapper w-css-reset" corso="display: inline-block; height: 34px; position: relative; vertical-align: top; width: 40px;">
                                                        <button tagname="button" className="w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important" corso="background-color: rgba(0, 0, 0, 0); box-shadow: none; cursor: pointer; height: 100%; position: relative; transition: background-color 150ms ease 0s; width: 100%;" aria-label="Pantalla completa" title="Pantalla completa">
                                                            <div className="w-vulcan-icon-wrapper" corso="box-sizing: border-box; height: 100%; position: relative; transform: scale(1.001); transition: transform 200ms ease 0s;" data-handle="fullscreenButton">
                                                            <svg x="0px" y="0px" viewBox="0 0 40 34" enable-background="new 0 0 40 34" corso="fill: rgb(255, 255, 255); height: 100%; left: 0px; stroke-width: 0px; top: 0px; width: 100%;" focusable="false">
                                                                <g>
                                                                    <g>
                                                                        <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="31.4,12.6 31.4,8.7 25.8,8.7"></polyline>
                                                                        <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="14.7,8.7 9.1,8.7 9.1,12.6"></polyline>
                                                                        <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="25.8,24.8 31.4,24.8 31.4,20.9"></polyline>
                                                                        <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="9.1,20.9 9.1,24.8 14.7,24.8"></polyline>
                                                                    </g>
                                                                    <rect x="13.7" y="12.3" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" enable-background="new" width="13.3" height="8.9"></rect>
                                                                </g>
                                                            </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="w-ellipsis w-css-reset" corso="height: 34px; position: relative; pointer-events: none; white-space: nowrap; display: none;"></div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="w-foreground w-css-reset" corso="height: 100%; left: 0px; pointer-events: none; position: absolute; top: 0px; width: 100%;">
                                    <div className="w-css-reset" corso="pointer-events: auto;" data-handle="contextMenu"></div>
                                    <div className="w-css-reset" corso="pointer-events: auto;" data-handle="loadingHourglass">
                                        <nothing></nothing>
                                    </div>
                                    <div className="w-css-reset" corso="pointer-events: auto;" data-handle="focusOutline">
                                        <div corso="box-shadow: rgb(255, 255, 255) 0px 0px 0px 2px inset; display: none; height: 100%; left: 0px; pointer-events: none; position: absolute; right: 0px; width: 100%;" className="w-focus-outline"></div>
                                    </div>
                                    <div className="w-css-reset" corso="pointer-events: auto;" data-handle="modalOverlay"></div>
                                    </div>
                                </div>
                                <corso id="wistia_118_corso" type="text/css" className="wistia_injected_corso">
                                    {/* #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset{font-size:14px;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper a.w-css-reset{border:0;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper p.w-css-reset{margin:1.4em 0;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper a.w-css-reset{display:inline;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper span.w-css-reset{display:inline;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper svg.w-css-reset{display:inline;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-corso-type:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-corso-type:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-corso-type:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper ul:before.w-css-reset{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper ol:before.w-css-reset{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper li:before.w-css-reset{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper ul:after.w-css-reset{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper ol:after.w-css-reset{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper li:after.w-css-reset{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree {font-size:14px;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree a{border:0;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree p{margin:1.4em 0;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree a{display:inline;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree span{display:inline;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree svg{display:inline;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-corso-type:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-corso-type:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-corso:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-corso-type:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree ul:before{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree ol:before{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree li:before{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree ul:after{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree ol:after{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree li:after{display:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
                                    #wistia_chrome_29 #wistia_grid_53_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;} */}
                                </corso>
                            </div>
                        </div>
                        <div id="wistia_grid_53_front"></div>
                        <div id="wistia_grid_53_top_inside">
                            <div id="wistia_grid_53_top" corso="height: 0px; font-size: 0px; line-height: 0px;"> </div>
                        </div>
                        <div id="wistia_grid_53_bottom_inside">
                            <div id="wistia_grid_53_bottom" corso="height: 0px; font-size: 0px; line-height: 0px;"> </div>
                        </div>
                        <div id="wistia_grid_53_left_inside">
                            <div id="wistia_grid_53_left" corso="height: 0px; font-size: 0px; line-height: 0px;"> </div>
                        </div>
                        <div id="wistia_grid_53_right_inside">
                            <div id="wistia_grid_53_right" corso="height: 0px; font-size: 0px; line-height: 0px;"> </div>
                        </div>
                        </div>
                        <div id="wistia_grid_53_below" corso="height: 0px; font-size: 0px; line-height: 0px;"> </div>
                        {/* <corso id="wistia_54_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_53_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;} */}
                        {/* #wistia_grid_53_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                        #wistia_grid_53_above{position:relative;}
                        #wistia_grid_53_main{display:block;height:100%;position:relative;}
                        #wistia_grid_53_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                        #wistia_grid_53_center{height:100%;overflow:hidden;position:relative;width:100%;}
                        #wistia_grid_53_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                        #wistia_grid_53_top_inside{position:absolute;left:0;top:0;width:100%;}
                        #wistia_grid_53_top{width:100%;position:absolute;bottom:0;left:0;}
                        #wistia_grid_53_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                        #wistia_grid_53_bottom{width:100%;position:absolute;top:0;left:0;}
                        #wistia_grid_53_left_inside{height:100%;position:absolute;left:0;top:0;}
                        #wistia_grid_53_left{height:100%;position:absolute;right:0;top:0;}
                        #wistia_grid_53_right_inside{height:100%;right:0;position:absolute;top:0;}
                        #wistia_grid_53_right{height:100%;left:0;position:absolute;top:0;}
                        #wistia_grid_53_below{position:relative;} */}
                        {/* </corso> */}
                    </div>
                </div>
            </div>
        </div>

                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                        <script async="" src="//fast.wistia.com/embed/medias/qm6lw06e9b.jsonp"></script>
                        <div className="wistia_embed wistia_async_qm6lw06e9b wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-qm6lw06e9b-1">
                            <div id="wistia_chrome_29" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                <div id="wistia_grid_57_wrapper" corso="display: block;">
                                <div id="wistia_grid_57_above"></div>
                                {/* <video style={{width:"220", height:"140"}}> */}
                                            {/* <source src={elements.lesson_topic[1].topic_video?elements.lesson_topic[1].topic_video.videofile:null} type="video/mp4"/> */}
                                            {/* <source src="http://127.0.0.1:8000/media/projectMedia/videos/Ads7_4z9vDEm.mp4" type="video/mp4"/> */}
                                        {/* </video> */}
                                <div id="wistia_grid_57_main">
                                    <div id="wistia_grid_57_behind"></div>
                                    <div id="wistia_grid_57_center">
                                        <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                        <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                    </div>
                                    <div id="wistia_grid_57_front"></div>
                                    <div id="wistia_grid_57_top_inside">
                                        <div id="wistia_grid_57_top"></div>
                                    </div>
                                    <div id="wistia_grid_57_bottom_inside">
                                        <div id="wistia_grid_57_bottom"></div>
                                    </div>
                                    <div id="wistia_grid_57_left_inside">
                                        <div id="wistia_grid_57_left"></div>
                                    </div>
                                    <div id="wistia_grid_57_right_inside">
                                        <div id="wistia_grid_57_right"></div>
                                    </div>
                                </div>
                                <div id="wistia_grid_57_below"></div>
                                {/* <corso id="wistia_58_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_57_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                    #wistia_grid_57_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                    #wistia_grid_57_above{position:relative;}
                                    #wistia_grid_57_main{display:block;height:100%;position:relative;}
                                    #wistia_grid_57_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                    #wistia_grid_57_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                    #wistia_grid_57_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                    #wistia_grid_57_top_inside{position:absolute;left:0;top:0;width:100%;}
                                    #wistia_grid_57_top{width:100%;position:absolute;bottom:0;left:0;}
                                    #wistia_grid_57_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                    #wistia_grid_57_bottom{width:100%;position:absolute;top:0;left:0;}
                                    #wistia_grid_57_left_inside{height:100%;position:absolute;left:0;top:0;}
                                    #wistia_grid_57_left{height:100%;position:absolute;right:0;top:0;}
                                    #wistia_grid_57_right_inside{height:100%;right:0;position:absolute;top:0;}
                                    #wistia_grid_57_right{height:100%;left:0;position:absolute;top:0;}
                                    #wistia_grid_57_below{position:relative;}
                                </corso> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="hckui__layout__marginTop30">
                    <h3 className="hckui__typography__h3">Lab 1 - Claiming Your Particle Argon</h3>
                    <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                    <p><strong>Project goal:</strong> To get your Particle Argon online and claimed to your account</p>
                    <p><strong>What you'll learn:</strong> How to claim a new Particle Argon using a browser and the Particle mobile app<br/>
                        <strong>Tools you'll need:</strong> A Particle Argon, USB cable, and the Particle mobile app for iOS or Android<br/>
                        <strong>Time needed to complete:</strong> 15 minutes
                    </p>
                    <p><em>To complete lab 1:</em><br/>
                        1. Open the <strong>Particle_101.zip</strong> folder that you downloaded during your workshop set-up.<br/>
                        2. Open the <strong>Lab1_ClaimDevice.pdf</strong> file<br/>
                        3, Follow the step-by-step instructions to complete the lab<br/>
                        4. Final code for the lab can be found <a href="https://build.particle.io/shared_apps/5bfefd038bf964af88000409" rel="noopener noreferrer" target="_blank">here</a> 
                    </p>
                    <p>If you haven’t downloaded the lab instruction folder for this workshop yet, you can download it here:</p>
                    <p><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Files</a></strong></p>
                    <hr/>
                    <p><strong>Watch the video below to follow-along with the lab!</strong></p>
                    <p></p>
                    </div>
                    <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                        <script async="" src="//fast.wistia.com/embed/medias/mx2f8322fv.jsonp"></script>
                        <div className="wistia_embed wistia_async_mx2f8322fv wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-mx2f8322fv-1">
                            <div id="wistia_chrome_32" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                <div id="wistia_grid_62_wrapper" corso="display: block;">
                                <div id="wistia_grid_62_above"></div>
                                <div id="wistia_grid_62_main">
                                    <div id="wistia_grid_62_behind"></div>
                                    <div id="wistia_grid_62_center">
                                        <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                        <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                    </div>
                                    <div id="wistia_grid_62_front"></div>
                                    <div id="wistia_grid_62_top_inside">
                                        <div id="wistia_grid_62_top"></div>
                                    </div>
                                    <div id="wistia_grid_62_bottom_inside">
                                        <div id="wistia_grid_62_bottom"></div>
                                    </div>
                                    <div id="wistia_grid_62_left_inside">
                                        <div id="wistia_grid_62_left"></div>
                                    </div>
                                    <div id="wistia_grid_62_right_inside">
                                        <div id="wistia_grid_62_right"></div>
                                    </div>
                                </div>
                                <div id="wistia_grid_62_below"></div>
                                {/* <corso id="wistia_63_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_62_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                    #wistia_grid_62_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                    #wistia_grid_62_above{position:relative;}
                                    #wistia_grid_62_main{display:block;height:100%;position:relative;}
                                    #wistia_grid_62_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                    #wistia_grid_62_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                    #wistia_grid_62_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                    #wistia_grid_62_top_inside{position:absolute;left:0;top:0;width:100%;}
                                    #wistia_grid_62_top{width:100%;position:absolute;bottom:0;left:0;}
                                    #wistia_grid_62_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                    #wistia_grid_62_bottom{width:100%;position:absolute;top:0;left:0;}
                                    #wistia_grid_62_left_inside{height:100%;position:absolute;left:0;top:0;}
                                    #wistia_grid_62_left{height:100%;position:absolute;right:0;top:0;}
                                    #wistia_grid_62_right_inside{height:100%;right:0;position:absolute;top:0;}
                                    #wistia_grid_62_right{height:100%;left:0;position:absolute;top:0;}
                                    #wistia_grid_62_below{position:relative;}
                                </corso> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            );
      }
    
    componentDidMount() {
        console.log("componentDidMount THIPROPS: " + JSON.stringify(this.props))
        const workshopID = this.props.match.params.workshopID;
        //const workshopID = 11
        // this.getWorkshopContent(this.props.token, workshopID, this.props.username)
        axios.get(workshopContentURL(11, this.props.username))
            .then(res => {
                console.log("res: " + JSON.stringify(res.data))
                // res.data.lesson.map((el, i) => {console.log("denge", el.lesson_topic)})
                // res.data.lesson.map((el, i) => {console.log("denge 2", el.lesson_title)})
                this.setState({
                    // article: res.data,
                    // weekdays: res.data.weekdays,
                    // months: res.data.months,
                    // dates: res.data.dates,
                    // maxHrs: res.data.max_hrs_per_workshop,
                    // startTime: res.data.start_time,
                    // endTime: res.data.end_time,
                    // author: res.data.user_name,
                    // author_pic: res.data.user_pic,
                    // lessons_topic: 
                    wsh_content: res.data
                });
                console.log("Article Detail res data: " + res.data);
            });
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({visible: true})
        this.props.form.validateFields((err, values) => {
        console.log("handleFormSubmit values: ", JSON.stringify(values));
        const hrs =
            values["hrs"] === undefined ? null : values["hrs"];
        const content =
            values["date_picker"] === undefined ? null : values["date_picker"];
        const topic =
            values["time_picker_start"] === undefined ? null : values["time_picker_start"];
        const inquiry =
            values["time_picker_end"] === undefined ? null : values["time_picker_end"];

        const postObj = {
            user: this.props.username,
            hrs: 1,
            workshop_id: this.props.match.params.workshopID,
            date: values.date_picker,
            start_time: this.handleDateFormat(topic, content),
            end_time: this.handleDateFormat(inquiry, content),  
        }
        console.log("handleFormSubmit postObj: ", postObj.start_time.month, postObj);
        if (!err) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.post(workshopDirectBuyURL, 
            postObj
            )
                .then(res => {
                    if (res.status === 200) {
                       this.setState({ orderId: res.data, loading: false, visible: true})
                     } else {
                       this.setState({ loading: false})
                     }
                })
                .catch(error => console.error(error))
                console.log('Error');
            
            console.log('Received values of form: ', values);
        } else{
            console.log('Received error: ', err);
        }
        });
    }
    
    onDateChange(date, dateString) {
        console.log(date, dateString);
        this.setState({ date: date})
    }

    onTimeChange(time, timeString) {
        console.log(time, timeString);
        // this.setState({ startTime: time, endTime:time})
      }
    
    onTimeChange2(time, timeString) {
        console.log(time, timeString);
        // this.setState({ startTime: time, endTime:time})
      }
    
    handleTimeDisable() {
        const { getFieldValue } = this.props.form;
        if( getFieldValue("time_picker_start") !== undefined &&
            getFieldValue("time_picker_start") !== null){
            return false
        } else {
            return true
        }
    }

    disableHour = value => {
        console.log(value)
        const { startTime, endTime} = this.state
        let disabled_hrs = []
        var end = parseInt((moment(endTime).format("HH")))
        
        for(var i=0; i<parseInt((moment(startTime).format("HH"))); i++){
          disabled_hrs.push(i)
        }
        for(var i=end; i<=24; i++){
            disabled_hrs.push(i)
          }
        
        // console.log("CHER: ",disabled_hrs, end )
        return disabled_hrs;
      }

      disableHour2 = value => {
        console.log(value)
        const { startTime, endTime, maxHrs} = this.state
        const { getFieldValue} = this.props.form
        let disabled_hrs2 = []
        var end2 = (moment(endTime).format("HH"))
        if(parseInt((moment(getFieldValue("time_picker_end")).format("HH"))) <= parseInt((moment(getFieldValue("time_picker_start")).format("HH")))){
            var minus = end2-parseInt((moment(getFieldValue("time_picker_start")).format("HH")))
        }
        
        for(var i=0; i<=parseInt((moment(getFieldValue("time_picker_start")).format("HH"))); i++){
          disabled_hrs2.push(i)
        }
        for(var i=end2; i<=24; i++){
            disabled_hrs2.push(i)
          }
        // console.log("CHER 2: ",disabled_hrs, end2, )
        return disabled_hrs2;
      }
    

    disabledDate = date => {
        const { weekdays, months, dates } = this.state;
    
        // if (months.indexOf(date.months()) === -1 ) {
        //   return true;
        // }
    
        if (weekdays.indexOf(date.days()) !== -1) {
          return true;
        }
        console.log("CHANGES: ", dates)
        let index = dates.findIndex(dateV => moment(dateV).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
          return index !== -1 || date < moment().endOf('day') || date.years() !==  moment().year()
      };

    render() {
        console.log('this.PROPS: ' + JSON.stringify(this.props))
        console.log("this.state: " + this.state, this.state.orderId, "this.state.lessons ==> ", this.state.lessons)
        const { wsh_content, author_pic, loading, lessons } = this.state
        const {user_name} = this.state.article
        return (
            <div>
                <div className="hckui__layout__wrapper960">
                <div className="hckui__layout__marginBottom45">
                    <div className="alert alert-info">
                        <p>
                            <i className="hckui__typography__iconWrapper">
                            <svg className="hckui__typography__icon hckui__typography__icon16">
                                {/* <use xlink:href="#svg-checkmark"></use> */}
                            </svg>
                            </i>
                            <span>You're enrolled in this workshop!</span>
                        </p>
                    </div>
                </div>
                <h1 className="hckui__typography__h1">Particle 101 Workshop</h1>
                <p className="hckui__typography__bodyL">In this workshop, you will learn the basics of connecting a Particle Argon device to the Internet, exploring essential features of the Particle Device OS and Cloud, leveraging cutting-edge features like BLE and on-device debugging, and integrating with 3rd party services. </p>
                <div className="hckui__layout__marginTop15" corso="height:0;padding-top:56%;position:relative">
                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%;background:no-repeat;background-image:url(https://hackster.imgix.net/uploads/attachments/1087214/_MNo5bE6Dtd.blob?auto=compress%2Cformat&amp;w=900&amp;h=675&amp;fit=min);background-size: cover;">
                        
                    </div>
                </div>
                <div className="hckui__layout__marginTop45" id="lessons">
                    <h2 className="hckui__typography__h2 hckui__layout__marginBottom10">Lessons</h2>
                    <div id="prerequisites">
                        <div className="pro-workshop-lesson">
                            <a className="toggle" href="javascript:void(0);">
                            <h3 className="hckui__typography__h3">
                                <span>Prerequisites</span>
                                <i className="hckui__typography__iconWrapper vertical-align-middle">
                                    <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                        {/* <use xlink:href="#svg-arrow-down"></use> */}
                                    </svg>
                                    <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                        {/* <use xlink:href="#svg-arrow-up"></use> */}
                                    </svg>
                                </i>
                            </h3>
                            </a>
                            <div className="pro-workshop-lesson-details show-on-open">
                            <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                <p><strong>Required Hardware</strong></p>
                                <ul>
                                    <li>
                                        <p><a href="https://store.particle.io/products/iot-starter-kit?_pos=3&amp;_sid=8e4180592&amp;_ss=r" rel="noopener noreferrer" target="_blank">IoT Starter Kit</a> ($99) </p>
                                        <p>Get an extra $20 off the price of the hardware by using the code <strong>HACKSTER$20OFF</strong> at checkout. Kit includes:</p>
                                        <ul>
                                        <li>Particle Argon</li>
                                        <li>Grove Starter Kit </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p>A computer running Windows, macOS or Linux with an available USB port</p>
                                    </li>
                                </ul>
                                <p><strong>You'll also need the following:</strong></p>
                                <p><em>Software:</em> </p>
                                <ul>
                                    <li>Particle <a href="https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&amp;mt=8" rel="noopener noreferrer" target="_blank">iOS</a> or <a href="https://play.google.com/store/apps/details?id=io.particle.android.app" rel="noopener noreferrer" target="_blank">Android</a> App</li>
                                    <li><a href="https://docs.particle.io/tutorials/developer-tools/cli/" rel="noopener noreferrer" target="_blank">Particle CLI</a></li>
                                    <li><a href="https://www.particle.io/workbench#installation" rel="noopener noreferrer" target="_blank">Particle Workbench</a></li>
                                </ul>
                                <p><em>Accounts:</em> </p>
                                <ul>
                                    <li><a href="https://login.particle.io/signup" rel="noopener noreferrer" target="_blank">Particle Account</a></li>
                                    <li><a href="https://ifttt.com/particle" rel="noopener noreferrer" target="_blank">IFTTT Account</a></li>
                                    <li><a href="https://azure.microsoft.com/en-us/get-started/" rel="noopener noreferrer" target="_blank">Azure IoT Account</a></li>
                                    <li><a href="https://accounts.google.com/signup" rel="noopener noreferrer" target="_blank">Google Account</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="pro-workshop-group-container">
                        <div className="pro-workshop-group">
                            <a className="pro-workshop-group-title toggle" href="javascript:void(0);">
                            <h3 className="hckui__typography__h3">
                                <span></span>
                                <i className="hckui__typography__iconWrapper vertical-align-middle">
                                    <svg className="hckui__typography__icon hckui__typography__icon16 group-hide-on-open">
                                        {/* <use xlink:href="#svg-arrow-down"></use> */}
                                    </svg>
                                    <svg className="hckui__typography__icon hckui__typography__icon16 group-show-on-open">
                                        {/* <use xlink:href="#svg-arrow-up"></use> */}
                                    </svg>
                                </i>
                            </h3>
                            </a>
                            {wsh_content?wsh_content.map((el, index) => {
                                return(
                                    <div className="pro-workshop-lesson">
                                        <a className="toggle" href="javascript:void(0);" onClick={(e)=>this.handleOpenLessonDetail(e, index)}>
                                            <h3 className="hckui__typography__h3">
                                                <span>{el.lesson_title}</span>
                                                <i className="hckui__typography__iconWrapper vertical-align-middle">
                                                <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                                    {/* <use xlink:href="#svg-arrow-down"></use> */}
                                                </svg>
                                                <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                                    {/* <use xlink:href="#svg-arrow-up"></use> */}
                                                </svg>
                                                </i>
                                            </h3>
                                        </a>
                                            { el.lesson_title === this.state.open ? this.openList(el) : null }
                                        </div>
                                )
                            }):null}
                            <div className="pro-workshop-lesson-details show-on-open">
                                <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                    <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                    <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                        <script async="" src="//fast.wistia.com/embed/medias/9sunhzsyee.jsonp"></script>
                                        <div className="wistia_embed wistia_async_9sunhzsyee wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-9sunhzsyee-1">
                                            <div id="wistia_chrome_26" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                <div id="wistia_grid_41_wrapper" corso="display: block;">
                                                <div id="wistia_grid_41_above"></div>
                                                <div id="wistia_grid_41_main">
                                                    <div id="wistia_grid_41_behind"></div>
                                                    <div id="wistia_grid_41_center">
                                                        <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                        <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_front"></div>
                                                    <div id="wistia_grid_41_top_inside">
                                                        <div id="wistia_grid_41_top"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_bottom_inside">
                                                        <div id="wistia_grid_41_bottom"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_left_inside">
                                                        <div id="wistia_grid_41_left"></div>
                                                    </div>
                                                    <div id="wistia_grid_41_right_inside">
                                                        <div id="wistia_grid_41_right"></div>
                                                    </div>
                                                </div>
                                                <div id="wistia_grid_41_below"></div>
                                                {/* <corso id="wistia_42_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_41_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                    #wistia_grid_41_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                    #wistia_grid_41_above{position:relative;}
                                                    #wistia_grid_41_main{display:block;height:100%;position:relative;}
                                                    #wistia_grid_41_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                    #wistia_grid_41_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                    #wistia_grid_41_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                    #wistia_grid_41_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                    #wistia_grid_41_top{width:100%;position:absolute;bottom:0;left:0;}
                                                    #wistia_grid_41_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                    #wistia_grid_41_bottom{width:100%;position:absolute;top:0;left:0;}
                                                    #wistia_grid_41_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                    #wistia_grid_41_left{height:100%;position:absolute;right:0;top:0;}
                                                    #wistia_grid_41_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                    #wistia_grid_41_right{height:100%;left:0;position:absolute;top:0;}
                                                    #wistia_grid_41_below{position:relative;}
                                                </corso> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="hckui__layout__marginTop30">
                                    <h3 className="hckui__typography__h3">Pre-lab Set Up</h3>
                                    <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                                    <p>Follow the steps below to complete the Lab Prerequisites required to participate in the labs for this course. </p>
                                    <p>1.  Download the Lab Documentation below. </p>
                                    <ul>
                                        <li><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Lab Documentation</a></strong> (11 MB)</li>
                                    </ul>
                                    <p>2.  Go to <a href="login.particle.io" rel="noopener noreferrer" target="_blank">login.particle.io</a> and create a Particle account.</p>
                                    <p>3.  Go to <a href="particle.io/workbench" rel="noopener noreferrer" target="_blank">particle.io/workbench</a>. Click "Install Now" to install the Particle Workbench.</p>
                                    <p>4. Go to the <a href="https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&amp;mt=8" rel="noopener noreferrer" target="_blank">App Store</a> for an iOS device or <a href="https://play.google.com/store/apps/details?id=io.particle.android.app" rel="noopener noreferrer" target="_blank">Google Play</a> for an Android device to download the Particle App. </p>
                                    <p>5.  Go to <a href="https://docs.particle.io/tutorials/developer-tools/cli/" rel="noopener noreferrer" target="_blank">https://docs.particle.io/tutorials/developer-tools/cli/</a> and follow the instructions for installing the Particle CLI on your operating system</p>
                                    <p><strong>Hardware Required to Complete Labs:</strong></p>
                                    <ul>
                                        <li>
                                            <p><a href="https://store.particle.io/products/iot-starter-kit?_pos=3&amp;_sid=8e4180592&amp;_ss=r" rel="noopener noreferrer" target="_blank">IoT Starter Kit</a> ($99) </p>
                                            <p>Get an extra $20 off the price of the hardware by using the code <strong>HACKSTER$20OFF</strong> at checkout. Kit includes:</p>
                                            <ul>
                                                <li>Particle Argon</li>
                                                <li>Grove Starter Kit </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <p>A computer running Windows, macOS or Linux with an available USB port</p>
                                        </li>
                                    </ul>
                                    <p></p>
                                    </div>
                                </div>
                            </div>
                            <div className="group-show-on-open">
                            <div className="hckui__layout__marginBottom15"></div>
                            <div className="pro-workshop-lesson">
                                <a className="toggle" href="javascript:void(0);">
                                    <h3 className="hckui__typography__h3">
                                        <span>Introduction to Particle 101 Workshop</span>
                                        <i className="hckui__typography__iconWrapper vertical-align-middle">
                                        <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                            {/* <use xlink:href="#svg-arrow-down"></use> */}
                                        </svg>
                                        <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                            {/* <use xlink:href="#svg-arrow-up"></use> */}
                                        </svg>
                                        </i>
                                    </h3>
                                </a>
                                <div className="pro-workshop-lesson-details show-on-open">
                                    <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/9sunhzsyee.jsonp"></script>
                                            <div className="wistia_embed wistia_async_9sunhzsyee wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-9sunhzsyee-1">
                                                <div id="wistia_chrome_26" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_41_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_41_above"></div>
                                                    <div id="wistia_grid_41_main">
                                                        <div id="wistia_grid_41_behind"></div>
                                                        <div id="wistia_grid_41_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_41_front"></div>
                                                        <div id="wistia_grid_41_top_inside">
                                                            <div id="wistia_grid_41_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_41_bottom_inside">
                                                            <div id="wistia_grid_41_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_41_left_inside">
                                                            <div id="wistia_grid_41_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_41_right_inside">
                                                            <div id="wistia_grid_41_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_41_below"></div>
                                                    {/* <corso id="wistia_42_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_41_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_41_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_41_above{position:relative;}
                                                        #wistia_grid_41_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_41_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_41_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_41_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_41_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_41_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_41_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_41_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_41_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_41_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_41_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_41_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_41_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="hckui__layout__marginTop30">
                                        <h3 className="hckui__typography__h3">Pre-lab Set Up</h3>
                                        <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                                        <p>Follow the steps below to complete the Lab Prerequisites required to participate in the labs for this course. </p>
                                        <p>1.  Download the Lab Documentation below. </p>
                                        <ul>
                                            <li><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Lab Documentation</a></strong> (11 MB)</li>
                                        </ul>
                                        <p>2.  Go to <a href="login.particle.io" rel="noopener noreferrer" target="_blank">login.particle.io</a> and create a Particle account.</p>
                                        <p>3.  Go to <a href="particle.io/workbench" rel="noopener noreferrer" target="_blank">particle.io/workbench</a>. Click "Install Now" to install the Particle Workbench.</p>
                                        <p>4. Go to the <a href="https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&amp;mt=8" rel="noopener noreferrer" target="_blank">App Store</a> for an iOS device or <a href="https://play.google.com/store/apps/details?id=io.particle.android.app" rel="noopener noreferrer" target="_blank">Google Play</a> for an Android device to download the Particle App. </p>
                                        <p>5.  Go to <a href="https://docs.particle.io/tutorials/developer-tools/cli/" rel="noopener noreferrer" target="_blank">https://docs.particle.io/tutorials/developer-tools/cli/</a> and follow the instructions for installing the Particle CLI on your operating system</p>
                                        <p><strong>Hardware Required to Complete Labs:</strong></p>
                                        <ul>
                                            <li>
                                                <p><a href="https://store.particle.io/products/iot-starter-kit?_pos=3&amp;_sid=8e4180592&amp;_ss=r" rel="noopener noreferrer" target="_blank">IoT Starter Kit</a> ($99) </p>
                                                <p>Get an extra $20 off the price of the hardware by using the code <strong>HACKSTER$20OFF</strong> at checkout. Kit includes:</p>
                                                <ul>
                                                    <li>Particle Argon</li>
                                                    <li>Grove Starter Kit </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <p>A computer running Windows, macOS or Linux with an available USB port</p>
                                            </li>
                                        </ul>
                                        <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pro-workshop-lesson">
                                <a className="toggle" href="javascript:void(0);">
                                    <h3 className="hckui__typography__h3">
                                        <span>Module 1: A Lap Around the Particle Ecosystem</span>
                                        <i className="hckui__typography__iconWrapper vertical-align-middle">
                                        <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                            {/* <use xlink:href="#svg-arrow-down"></use> */}
                                        </svg>
                                        <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                            {/* <use xlink:href="#svg-arrow-up"></use> */}
                                        </svg>
                                        </i>
                                    </h3>
                                </a>
                                <div className="pro-workshop-lesson-details show-on-open">
                                    <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/qm6lw06e9b.jsonp"></script>
                                            <div className="wistia_embed wistia_async_qm6lw06e9b wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-qm6lw06e9b-1">
                                                <div id="wistia_chrome_29" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_57_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_57_above"></div>
                                                    <div id="wistia_grid_57_main">
                                                        <div id="wistia_grid_57_behind"></div>
                                                        <div id="wistia_grid_57_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_57_front"></div>
                                                        <div id="wistia_grid_57_top_inside">
                                                            <div id="wistia_grid_57_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_57_bottom_inside">
                                                            <div id="wistia_grid_57_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_57_left_inside">
                                                            <div id="wistia_grid_57_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_57_right_inside">
                                                            <div id="wistia_grid_57_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_57_below"></div>
                                                    {/* <corso id="wistia_58_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_57_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_57_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_57_above{position:relative;}
                                                        #wistia_grid_57_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_57_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_57_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_57_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_57_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_57_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_57_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_57_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_57_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_57_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_57_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_57_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_57_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="hckui__layout__marginTop30">
                                        <h3 className="hckui__typography__h3">Lab 1 - Claiming Your Particle Argon</h3>
                                        <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                                        <p><strong>Project goal:</strong> To get your Particle Argon online and claimed to your account</p>
                                        <p><strong>What you'll learn:</strong> How to claim a new Particle Argon using a browser and the Particle mobile app<br/>
                                            <strong>Tools you'll need:</strong> A Particle Argon, USB cable, and the Particle mobile app for iOS or Android<br/>
                                            <strong>Time needed to complete:</strong> 15 minutes
                                        </p>
                                        <p><em>To complete lab 1:</em><br/>
                                            1. Open the <strong>Particle_101.zip</strong> folder that you downloaded during your workshop set-up.<br/>
                                            2. Open the <strong>Lab1_ClaimDevice.pdf</strong> file<br/>
                                            3, Follow the step-by-step instructions to complete the lab<br/>
                                            4. Final code for the lab can be found <a href="https://build.particle.io/shared_apps/5bfefd038bf964af88000409" rel="noopener noreferrer" target="_blank">here</a> 
                                        </p>
                                        <p>If you haven’t downloaded the lab instruction folder for this workshop yet, you can download it here:</p>
                                        <p><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Files</a></strong></p>
                                        <hr/>
                                        <p><strong>Watch the video below to follow-along with the lab!</strong></p>
                                        <p></p>
                                        </div>
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/mx2f8322fv.jsonp"></script>
                                            <div className="wistia_embed wistia_async_mx2f8322fv wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-mx2f8322fv-1">
                                                <div id="wistia_chrome_32" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_62_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_62_above"></div>
                                                    <div id="wistia_grid_62_main">
                                                        <div id="wistia_grid_62_behind"></div>
                                                        <div id="wistia_grid_62_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_62_front"></div>
                                                        <div id="wistia_grid_62_top_inside">
                                                            <div id="wistia_grid_62_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_62_bottom_inside">
                                                            <div id="wistia_grid_62_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_62_left_inside">
                                                            <div id="wistia_grid_62_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_62_right_inside">
                                                            <div id="wistia_grid_62_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_62_below"></div>
                                                    {/* <corso id="wistia_63_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_62_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_62_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_62_above{position:relative;}
                                                        #wistia_grid_62_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_62_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_62_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_62_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_62_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_62_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_62_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_62_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_62_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_62_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_62_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_62_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_62_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pro-workshop-lesson">
                                <a className="toggle" href="javascript:void(0);">
                                    <h3 className="hckui__typography__h3">
                                        <span>Module 2: Introducing the Particle Device Cloud</span>
                                        <i className="hckui__typography__iconWrapper vertical-align-middle">
                                        <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                            {/* <use xlink:href="#svg-arrow-down"></use> */}
                                        </svg>
                                        <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                            {/* <use xlink:href="#svg-arrow-up"></use> */}
                                        </svg>
                                        </i>
                                    </h3>
                                </a>
                                <div className="pro-workshop-lesson-details show-on-open">
                                    <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/jqfb48sqbf.jsonp"></script>
                                            <div className="wistia_embed wistia_async_jqfb48sqbf wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-jqfb48sqbf-1">
                                                <div id="wistia_chrome_35" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_49_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_49_above"></div>
                                                    <div id="wistia_grid_49_main">
                                                        <div id="wistia_grid_49_behind"></div>
                                                        <div id="wistia_grid_49_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_49_front"></div>
                                                        <div id="wistia_grid_49_top_inside">
                                                            <div id="wistia_grid_49_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_49_bottom_inside">
                                                            <div id="wistia_grid_49_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_49_left_inside">
                                                            <div id="wistia_grid_49_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_49_right_inside">
                                                            <div id="wistia_grid_49_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_49_below"></div>
                                                    {/* <corso id="wistia_50_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_49_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_49_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_49_above{position:relative;}
                                                        #wistia_grid_49_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_49_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_49_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_49_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_49_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_49_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_49_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_49_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_49_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_49_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_49_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_49_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_49_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="hckui__layout__marginTop30">
                                        <h3 className="hckui__typography__h3">Lab 2 - Working with Particle Primitives &amp; Grove Sensors</h3>
                                        <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                                        <p><strong>Project goal:</strong> Start programming your Argon, read sensor data, and leverage the device cloud</p>
                                        <p><strong>What you'll learn:</strong> How to interact with sensors, using Particle variables, cloud functions and publish/subscribe.<br/>
                                            <strong>Tools you'll need:</strong> Access to the internet for build.particle.io and console.particle.io. Plus the Particle CLI, Particle Workbench, a Particle Argon, and IoT Starter Kit<br/>
                                            <strong>Time needed to complete:</strong> 60 minutes
                                        </p>
                                        <p><em>To complete lab 2:</em><br/>
                                            1. Open the <strong>Particle_101.zip</strong> folder that you downloaded during your workshop set-up.<br/>
                                            2. Open the <strong>Lab2_Primitives.pdf</strong> file<br/>
                                            3, Follow the step-by-step instructions to complete the lab<br/>
                                            4. Final code for the lab can be found <a href="https://build.particle.io/shared_apps/5d7bb4fe1abb3a0016bd41279" rel="noopener noreferrer" target="_blank">here</a> 
                                        </p>
                                        <p>If you haven’t downloaded the lab instruction folder for this workshop yet, you can download it here:</p>
                                        <p><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Files</a></strong></p>
                                        <hr/>
                                        <p><strong>Watch the video below to follow-along with the lab!</strong></p>
                                        <p></p>
                                        </div>
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/id0f5al05n.jsonp"></script>
                                            <div className="wistia_embed wistia_async_id0f5al05n wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-id0f5al05n-1">
                                                <div id="wistia_chrome_43" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_80_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_80_above"></div>
                                                    <div id="wistia_grid_80_main">
                                                        <div id="wistia_grid_80_behind"></div>
                                                        <div id="wistia_grid_80_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_80_front"></div>
                                                        <div id="wistia_grid_80_top_inside">
                                                            <div id="wistia_grid_80_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_80_bottom_inside">
                                                            <div id="wistia_grid_80_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_80_left_inside">
                                                            <div id="wistia_grid_80_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_80_right_inside">
                                                            <div id="wistia_grid_80_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_80_below"></div>
                                                    {/* <corso id="wistia_81_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_80_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_80_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_80_above{position:relative;}
                                                        #wistia_grid_80_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_80_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_80_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_80_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_80_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_80_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_80_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_80_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_80_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_80_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_80_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_80_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_80_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pro-workshop-lesson">
                                <a className="toggle" href="javascript:void(0);">
                                    <h3 className="hckui__typography__h3">
                                        {/* <span>Module 3: Introducing BLE and NFC</span> */}
                                        <i className="hckui__typography__iconWrapper vertical-align-middle">
                                        <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                            {/* <use xlink:href="#svg-arrow-down"></use> */}
                                        </svg>
                                        <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                            {/* <use xlink:href="#svg-arrow-up"></use> */}
                                        </svg>
                                        </i>
                                    </h3>
                                </a>
                                <div className="pro-workshop-lesson-details show-on-open">
                                    <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/lghfhuttzz.jsonp"></script>
                                            <div className="wistia_embed wistia_async_lghfhuttzz wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-lghfhuttzz-1">
                                                <div id="wistia_chrome_51" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_67_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_67_above"></div>
                                                    <div id="wistia_grid_67_main">
                                                        <div id="wistia_grid_67_behind"></div>
                                                        <div id="wistia_grid_67_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_67_front"></div>
                                                        <div id="wistia_grid_67_top_inside">
                                                            <div id="wistia_grid_67_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_67_bottom_inside">
                                                            <div id="wistia_grid_67_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_67_left_inside">
                                                            <div id="wistia_grid_67_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_67_right_inside">
                                                            <div id="wistia_grid_67_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_67_below"></div>
                                                    {/* <corso id="wistia_68_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_67_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_67_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_67_above{position:relative;}
                                                        #wistia_grid_67_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_67_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_67_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_67_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_67_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_67_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_67_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_67_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_67_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_67_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_67_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_67_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_67_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="hckui__layout__marginTop30">
                                        <h3 className="hckui__typography__h3">Lab 3 - Working with BLE</h3>
                                        <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                                        <p><strong>Project goal:</strong> Learn How to use BLE features on Gen3 devices</p>
                                        <p><strong>What you'll learn:</strong> How to configure BLE for broadcasting device data; Using WebBLE to connect to and consume data from Particle devices<br/>
                                            <strong>Tools you'll need:</strong> An Argon, the Particle Mobile App, A Grove Shield, and A Grove Chainable LED<br/>
                                            <strong>Time needed to complete:</strong> 30 minutes
                                        </p>
                                        <p><em>To complete lab 3:</em><br/>
                                            1. Open the <strong>Particle_101.zip</strong> folder that you downloaded during your workshop set-up.<br/>
                                            2. Open the <strong>Lab3_BLE.pdf</strong> file<br/>
                                            3, Follow the step-by-step instructions to complete the lab
                                        </p>
                                        <p>If you haven’t downloaded the lab instruction folder for this workshop yet, you can download it here:</p>
                                        <p><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Files</a></strong></p>
                                        <hr/>
                                        <p><strong>Watch the video below to follow-along with the lab!</strong></p>
                                        <p></p>
                                        </div>
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/ma0fza314m.jsonp"></script>
                                            <div className="wistia_embed wistia_async_ma0fza314m wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-ma0fza314m-1">
                                                <div id="wistia_chrome_69" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_75_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_75_above"></div>
                                                    <div id="wistia_grid_75_main">
                                                        <div id="wistia_grid_75_behind"></div>
                                                        <div id="wistia_grid_75_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_75_front"></div>
                                                        <div id="wistia_grid_75_top_inside">
                                                            <div id="wistia_grid_75_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_75_bottom_inside">
                                                            <div id="wistia_grid_75_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_75_left_inside">
                                                            <div id="wistia_grid_75_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_75_right_inside">
                                                            <div id="wistia_grid_75_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_75_below"></div>
                                                    {/* <corso id="wistia_76_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_75_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_75_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_75_above{position:relative;}
                                                        #wistia_grid_75_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_75_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_75_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_75_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_75_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_75_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_75_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_75_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_75_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_75_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_75_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_75_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_75_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pro-workshop-lesson">
                                <a className="toggle" href="javascript:void(0);">
                                    <h3 className="hckui__typography__h3">
                                        <span>Module 4: The Particle CLI &amp; Integrations</span>
                                        <i className="hckui__typography__iconWrapper vertical-align-middle">
                                        <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                            {/* <use xlink:href="#svg-arrow-down"></use> */}
                                        </svg>
                                        <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                            {/* <use xlink:href="#svg-arrow-up"></use> */}
                                        </svg>
                                        </i>
                                    </h3>
                                </a>
                                <div className="pro-workshop-lesson-details show-on-open">
                                    <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/wwjbwrg6ie.jsonp"></script>
                                            <div className="wistia_embed wistia_async_wwjbwrg6ie wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-wwjbwrg6ie-1">
                                                <div id="wistia_chrome_82" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_88_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_88_above"></div>
                                                    <div id="wistia_grid_88_main">
                                                        <div id="wistia_grid_88_behind"></div>
                                                        <div id="wistia_grid_88_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_88_front"></div>
                                                        <div id="wistia_grid_88_top_inside">
                                                            <div id="wistia_grid_88_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_88_bottom_inside">
                                                            <div id="wistia_grid_88_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_88_left_inside">
                                                            <div id="wistia_grid_88_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_88_right_inside">
                                                            <div id="wistia_grid_88_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_88_below"></div>
                                                    {/* <corso id="wistia_89_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_88_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_88_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_88_above{position:relative;}
                                                        #wistia_grid_88_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_88_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_88_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_88_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_88_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_88_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_88_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_88_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_88_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_88_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_88_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_88_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_88_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="hckui__layout__marginTop30">
                                        <h3 className="hckui__typography__h3">Lab 4 - Introducing Particle Integrations &amp; IFTTT</h3>
                                        <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                                        <p><strong>Project goal:</strong> Use a Particle Webhook and IFTTT to push device data into Google Sheets</p>
                                        <p><strong>What you'll learn:</strong> How to configure Particle webhooks; Connecting Particle to other services via IFTTT; Building data visualizations in Google Sheets based on device datat<br/>
                                            <strong>Tools you'll need:</strong> A Particle Argon, and the IoT Starter Kit, an IFTTT account, and a Google account<br/>
                                            <strong>Time needed to complete:</strong> 40 minutes
                                        </p>
                                        <p><em>To complete lab 4:</em><br/>
                                            1. Open the <strong>Particle_101.zip</strong> folder that you downloaded during your workshop set-up.<br/>
                                            2. Open the <strong>Lab4_Integrations.pdf</strong> file<br/>
                                            3, Follow the step-by-step instructions to complete the lab
                                        </p>
                                        <p>If you haven’t downloaded the lab instruction folder for this workshop yet, you can download it here:</p>
                                        <p><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Files</a></strong></p>
                                        <hr/>
                                        <p><strong>Watch the video below to follow-along with the lab!</strong></p>
                                        <p></p>
                                        </div>
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/9s3b1qd196.jsonp"></script>
                                            <div className="wistia_embed wistia_async_9s3b1qd196 wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-9s3b1qd196-1">
                                                <div id="wistia_chrome_90" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_96_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_96_above"></div>
                                                    <div id="wistia_grid_96_main">
                                                        <div id="wistia_grid_96_behind"></div>
                                                        <div id="wistia_grid_96_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_96_front"></div>
                                                        <div id="wistia_grid_96_top_inside">
                                                            <div id="wistia_grid_96_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_96_bottom_inside">
                                                            <div id="wistia_grid_96_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_96_left_inside">
                                                            <div id="wistia_grid_96_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_96_right_inside">
                                                            <div id="wistia_grid_96_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_96_below"></div>
                                                    {/* <corso id="wistia_97_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_96_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_96_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_96_above{position:relative;}
                                                        #wistia_grid_96_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_96_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_96_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_96_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_96_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_96_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_96_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_96_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_96_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_96_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_96_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_96_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_96_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pro-workshop-lesson">
                                <a className="toggle" href="javascript:void(0);">
                                    <h3 className="hckui__typography__h3">
                                        <span>Module 5: Integrating Particle &amp; Azure IoT Central</span>
                                        <i className="hckui__typography__iconWrapper vertical-align-middle">
                                        <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                            {/* <use xlink:href="#svg-arrow-down"></use> */}
                                        </svg>
                                        <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                            {/* <use xlink:href="#svg-arrow-up"></use> */}
                                        </svg>
                                        </i>
                                    </h3>
                                </a>
                                <div className="pro-workshop-lesson-details show-on-open">
                                    <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/0lap3y1hy0.jsonp"></script>
                                            <div className="wistia_embed wistia_async_0lap3y1hy0 wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-0lap3y1hy0-1">
                                                <div id="wistia_chrome_98" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_104_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_104_above"></div>
                                                    <div id="wistia_grid_104_main">
                                                        <div id="wistia_grid_104_behind"></div>
                                                        <div id="wistia_grid_104_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_104_front"></div>
                                                        <div id="wistia_grid_104_top_inside">
                                                            <div id="wistia_grid_104_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_104_bottom_inside">
                                                            <div id="wistia_grid_104_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_104_left_inside">
                                                            <div id="wistia_grid_104_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_104_right_inside">
                                                            <div id="wistia_grid_104_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_104_below"></div>
                                                    {/* <corso id="wistia_105_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_104_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_104_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_104_above{position:relative;}
                                                        #wistia_grid_104_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_104_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_104_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_104_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_104_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_104_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_104_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_104_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_104_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_104_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_104_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_104_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_104_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="hckui__layout__marginTop30">
                                        <h3 className="hckui__typography__h3">Lab 5 - Using Particle Integrations and Azure IoT Central</h3>
                                        <p className="hckui__typography__bodyL hckui__layout__marginBottom15 hckui__layout__marginTop5"></p>
                                        <p><strong>Project goal:</strong> Use Particle Integrations to connect your app to Azure IoT Central</p>
                                        <p><strong>What you'll learn:</strong> Working with Particle Integrations, Integrating Particle projects with Azure IoT Central<br/>
                                            <strong>Tools you'll need:</strong> Particle Workbench, an Azure account, a Particle Argon, and the IoT Starter Kit<br/>
                                            <strong>Time needed to complete:</strong> 60 minutes
                                        </p>
                                        <p><em>To complete lab 5:</em><br/>
                                            1. Open the <strong>Particle_101.zip</strong> folder that you downloaded during your workshop set-up.<br/>
                                            2. Open the <strong>Lab5_Azure.pdf</strong> file<br/>
                                            3, Follow the step-by-step instructions to complete the lab<br/>
                                            4. Final code for the lab can be found <a href="https://github.com/bsatrom/particle-azure-workshop-2019/blob/master/labs/lab3/src/lab3.cpp" rel="noopener noreferrer" target="_blank">here</a>
                                        </p>
                                        <p>If you haven’t downloaded the lab instruction folder for this workshop yet, you can download it here:</p>
                                        <p><strong><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Files</a></strong></p>
                                        <hr/>
                                        <p><strong>Watch the video below to follow-along with the lab!</strong></p>
                                        <p></p>
                                        </div>
                                        <div className="hckui__layout__marginBottom5" corso="padding-top:56.25%;height:0;position:relative">
                                        <div corso="position:absolute;top:0;left:0;width:100%;height:100%">
                                            <script async="" src="//fast.wistia.com/embed/medias/8vvmmh8djt.jsonp"></script>
                                            <div className="wistia_embed wistia_async_8vvmmh8djt wistia_embed_initialized" corso="height:100%;width:100%" id="wistia-8vvmmh8djt-1">
                                                <div id="wistia_chrome_106" className="w-chrome" corso="display: inline-block; height: 100%; line-height: normal; margin: 0px; padding: 0px; position: relative; vertical-align: top; width: 100%; outline: currentcolor none medium; overflow: hidden; box-sizing: content-box;" tabindex="-1">
                                                    <div id="wistia_grid_112_wrapper" corso="display: block;">
                                                    <div id="wistia_grid_112_above"></div>
                                                    <div id="wistia_grid_112_main">
                                                        <div id="wistia_grid_112_behind"></div>
                                                        <div id="wistia_grid_112_center">
                                                            <div className="w-video-wrapper w-css-reset" corso="clip: rect(0px, 0px, 0px, 0px); height: 100%; position: absolute; top: 0px; width: 100%; opacity: 1; background-color: rgb(0, 0, 0);"></div>
                                                            <div className="w-ui-container" corso="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 1;"></div>
                                                        </div>
                                                        <div id="wistia_grid_112_front"></div>
                                                        <div id="wistia_grid_112_top_inside">
                                                            <div id="wistia_grid_112_top"></div>
                                                        </div>
                                                        <div id="wistia_grid_112_bottom_inside">
                                                            <div id="wistia_grid_112_bottom"></div>
                                                        </div>
                                                        <div id="wistia_grid_112_left_inside">
                                                            <div id="wistia_grid_112_left"></div>
                                                        </div>
                                                        <div id="wistia_grid_112_right_inside">
                                                            <div id="wistia_grid_112_right"></div>
                                                        </div>
                                                    </div>
                                                    <div id="wistia_grid_112_below"></div>
                                                    {/* <corso id="wistia_113_corso" type="text/css" className="wistia_injected_corso">#wistia_grid_112_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
                                                        #wistia_grid_112_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
                                                        #wistia_grid_112_above{position:relative;}
                                                        #wistia_grid_112_main{display:block;height:100%;position:relative;}
                                                        #wistia_grid_112_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_112_center{height:100%;overflow:hidden;position:relative;width:100%;}
                                                        #wistia_grid_112_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
                                                        #wistia_grid_112_top_inside{position:absolute;left:0;top:0;width:100%;}
                                                        #wistia_grid_112_top{width:100%;position:absolute;bottom:0;left:0;}
                                                        #wistia_grid_112_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
                                                        #wistia_grid_112_bottom{width:100%;position:absolute;top:0;left:0;}
                                                        #wistia_grid_112_left_inside{height:100%;position:absolute;left:0;top:0;}
                                                        #wistia_grid_112_left{height:100%;position:absolute;right:0;top:0;}
                                                        #wistia_grid_112_right_inside{height:100%;right:0;position:absolute;top:0;}
                                                        #wistia_grid_112_right{height:100%;left:0;position:absolute;top:0;}
                                                        #wistia_grid_112_below{position:relative;}
                                                    </corso> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hckui__layout__marginTop45" id="resources">
                    <h2 className="hckui__typography__h2 hckui__layout__marginBottom10">Resources</h2>
                </div>
                <div className="pro-workshop-lesson">
                    <a className="toggle" href="javascript:void(0);">
                        <h3 className="hckui__typography__h3">
                            <span>Required Hardware </span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                            <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                {/* <use xlink:href="#svg-arrow-down"></use> */}
                            </svg>
                            <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                {/* <use xlink:href="#svg-arrow-up"></use> */}
                            </svg>
                            </i>
                        </h3>
                    </a>
                    <div className="pro-workshop-lesson-details show-on-open">
                        <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <p><strong>To participate in the labs you will need the following hardware</strong></p>
                            <ul>
                            <li>
                                <p><a href="https://store.particle.io/products/iot-starter-kit?_pos=3&amp;_sid=8e4180592&amp;_ss=r" rel="noopener noreferrer" target="_blank">IoT Starter Kit</a> ($99) </p>
                                <p>Get an extra $20 off the price of the hardware by using the code <strong>HACKSTER$20OFF</strong> at checkout. Kit includes:</p>
                                <ul>
                                    <li>Particle Argon</li>
                                    <li>Grove Starter Kit </li>
                                </ul>
                            </li>
                            <li>
                                <p>A computer running Windows, macOS or Linux with an available USB port</p>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pro-workshop-lesson">
                    <a className="toggle" href="javascript:void(0);">
                        <h3 className="hckui__typography__h3">
                            <span>Lab Files</span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                            <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                {/* <use xlink:href="#svg-arrow-down"></use> */}
                            </svg>
                            <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                {/* <use xlink:href="#svg-arrow-up"></use> */}
                            </svg>
                            </i>
                        </h3>
                    </a>
                    <div className="pro-workshop-lesson-details show-on-open">
                        <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <ul>
                            <li><a href="https://www.hackster.io/workshops/download?&amp;d=swgtwesfaardmop&amp;workshop_id=particle-101-course" rel="noopener noreferrer" target="_blank">Download Lab Documentation</a>(11MB)
                                Includes step-by-step instructions for labs 1-5.<br/>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pro-workshop-lesson">
                    <a className="toggle" href="javascript:void(0);">
                        <h3 className="hckui__typography__h3">
                            <span>Technical Support</span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                            <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                {/* <use xlink:href="#svg-arrow-down"></use> */}
                            </svg>
                            <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                {/* <use xlink:href="#svg-arrow-up"></use> */}
                            </svg>
                            </i>
                        </h3>
                    </a>
                    <div className="pro-workshop-lesson-details show-on-open">
                        <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <ul>
                            <li>
                                <p>Workshop Support:</p>
                                <ul>
                                    <li>Particle 101 Hackster Forum - (<a href="https://forums.hackster.io" rel="noopener noreferrer" target="_blank">https://forums.hackster.io</a>)</li>
                                </ul>
                            </li>
                            <li>
                                <p>Additional support:</p>
                                <ul>
                                    <li>Particle Documentation - (<a href="https://docs.particle.io/" rel="noopener noreferrer" target="_blank">https://docs.particle.io/</a>) </li>
                                    <li>Particle Community Forum - (<a href="https://community.particle.io/" rel="noopener noreferrer" target="_blank">https://community.particle.io/</a>)</li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="certificate">
                    <div className="pro-workshop-lesson">
                        <a className="toggle" href="javascript:void(0);">
                            <h3 className="hckui__typography__h3">
                            <span>Completion Certificate</span>
                            <i className="hckui__typography__iconWrapper vertical-align-middle">
                                <svg className="hckui__typography__icon hckui__typography__icon16 hide-on-open">
                                    {/* <use xlink:href="#svg-arrow-down"></use> */}
                                </svg>
                                <svg className="hckui__typography__icon hckui__typography__icon16 show-on-open">
                                    {/* <use xlink:href="#svg-arrow-up"></use> */}
                                </svg>
                            </i>
                            </h3>
                        </a>
                        <div className="pro-workshop-lesson-details show-on-open">
                            <div className="hckui__typography__bodyL hckui__layout__marginTop15">
                            <p className="hckui__typography__bodyL hckui__layout__marginTop15">Click below to take the quiz and obtain your completion certificate:</p>
                            <p className="hckui__typography__bodyL"><a className="hckui__buttons__md" href="/workshops/particle-101-course/certificate">Get my completion certificate</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>


            </div>                  
        )
    }
}

const mapStateToProps = state => {
    console.log("mapStateToProps: " + JSON.stringify(state))
    return {
      token: state.auth.token,
      username: state.auth.username,
      wsp: state.profileWorkshop.currentWorkshop
    };
  };
  
  const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getWorkshopContent: (token, workshopID, userID) => dispatch(getWorkshopContent(token, workshopID, userID)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkshopContent);