import React from "react";
import "../assets/landing.css";

class ProductPageVideoPlayer extends React.PureComponent {
  handleCloseModal = () => {
    this.props.showVideo("close")
  }
  render() {
    return (
        <div className="_1M0ijdL-CbKY690_1up2Yd">
          <div className="HI041TWNAx9wen9PAWcq4">
            <div className="
              PP9ArtWfvhDwwl47xaTXE 
              _3jK-495-V1VZOfQv4bm0YL
              _2mDTbtBLUe15qOCab2R8Ey">
              <div className="_2rE_lCfgv6vHsuZX7fghr" aria-label="Close" onClick={() => {this.handleCloseModal()}}></div>
              <div className="IK5nt9rSNxO43zFBfH8gR">
                <iframe allowfullscreen="" className="_1PTA15Pg66U0AWp8Rdt-bZ" src="https://matecrunchpev.s3.amazonaws.com/PEV_3.mp4" frameborder="0">
                  <body data-new-gr-c-s-check-loaded="8.869.0" data-gr-ext-installed="" className="vp-center">
                    <div id="player" className="player player-02750c07-366c-49f2-85ff-cbfc31267285 js-player-fullscreen with-fullscreen with-sticky-custom-logo player-md player-cardsCorner">
                        <div className="vp-video-wrapper transparent">
                          <div className="vp-video">
                            <div className="vp-telecine">
                              <video preload="none" tabindex="-1" src="https://matecrunchpev.s3.amazonaws.com/PEV_3.mp4">
                                <track kind="captions" src="/texttrack/7833658.vtt?token=600b4a26_0x6980e832c8c09197c823794e2423d945cc246f80" id="telecine-track-7833658" srclang="en" label="English"/>
                              </video>
                            </div>
                          </div>
                          {/* <div className="vp-preview vp-preview-invisible" data-thumb="https://i.vimeocdn.com/video/807153307.jpg?mw=2000&amp;mh=1125&amp;q=70" data-thumb-width="2000" style="background-image: url(&quot;https://i.vimeocdn.com/video/807153307.jpg?mw=2000&amp;mh=1125&amp;q=70&quot;);"></div>
                          <div className="vp-shade vp-shade-invisible"></div>
                          <div className="vp-nudge-shade vp-nudge-shade-left vp-nudge-shade-invisible"></div>
                          <div className="vp-nudge-shade vp-nudge-shade-right vp-nudge-shade-invisible"></div>
                          <div className="vp-spin vp-spin-invisible">
                            <svg className="vp-spin-trace" viewBox="0 0 50 50" focusable="false">
                              <circle cx="50%" cy="50%" r="20"></circle>
                            </svg>
                            <svg className="vp-spin-circle" viewBox="0 0 50 50" focusable="false">
                              <circle cx="50%" cy="50%" r="20"></circle>
                            </svg>
                          </div>
                        </div>
                        <div className="vp-text-alert-wrapper hidden">
                          <div className="vp-alert-text"></div>
                          <div className="vp-alert-time">
                            <div className="vp-live-start-time-title"></div>
                            <div className="vp-live-start-time-body"></div>
                            <div className="vp-live-start-time-footer"></div>
                          </div>
                        </div>
                        <div className="vp-target hidden" hidden=""></div>
                        <div className="vp-captions hidden with-controls" aria-live="assertive" style="font-size: 25px;" hidden=""></div>
                        <div className="vp-cards-wrapper">
                          <div className="vp-cards"></div>
                        </div>
                        <div className="vp-outro-wrapper hidden" hidden="">
                          <div className="vp-outro" role="dialog"></div>
                        </div>
                        <div className="vp-controls-wrapper">
                          <div className="vp-badge invisible"></div>
                          <div className="vp-title invisible hidden" hidden="">
                            <header className="vp-title-header">
                              <div className="headers">  </div>
                            </header>
                          </div>
                          <div className="vp-controls">
                            <button type="button" className="play rounded-box state-paused">
                              <div className="tiny-bars">
                                <svg width="100%" height="100%" viewBox="0 0 65 40" focusable="false">
                                  <defs>
                                    <clipPath id="rounded-border">
                                      <rect height="100%" width="100%" x="0" y="0" rx="5"></rect>
                                    </clipPath>
                                    <pattern id="tiny-buffer" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10" viewBox="0 0 10 10">
                                      <line x1="5" y1="-1" x2="-5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt"></line>
                                      <line x1="10" y1="-1" x2="0" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt"></line>
                                      <line x1="15" y1="-1" x2="5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt"></line>
                                    </pattern>
                                  </defs>
                                  <g clip-path="url(#rounded-border)">
                                    <rect className="buffer hidden" height="3" width="110%" x="0" y="37" fill="url(#tiny-buffer)"></rect>
                                    <rect className="loaded" height="3" width="0" x="0" y="37" fill="#666"></rect>
                                    <rect className="played fill" height="3" width="0%" x="0" y="37"></rect>
                                  </g>
                                </svg>
                              </div>
                              <div className="play-icon">
                                <svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" focusable="false" aria-labelledby="play-icon-title" role="img">
                                  <title id="play-icon-title">Reproducir</title>
                                  <polygon className="fill" points="1,0 20,10 1,20"></polygon>
                                </svg>
                              </div>
                              <div className="pause-icon">
                                <svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" focusable="false" aria-labelledby="pause-icon-title" role="img">
                                  <title id="pause-icon-title">Pausar</title>
                                  <rect className="fill" width="6" height="20" x="0" y="0"></rect>
                                  <rect className="fill" width="6" height="20" x="12" y="0"></rect>
                                </svg>
                              </div>
                              <div className="replay-icon">
                                <svg viewBox="-387 605 16 16" preserveAspectRatio="xMidYMid" aria-labelledby="replay-icon-title" role="img">
                                  <title id="replay-icon-title">Reproducir</title>
                                  <path className="fill" d="M-387 606v4c0 .6.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1.5c1.1-1.2 2.7-2 4.5-2 3.3 0 6 2.7 6 6s-2.7 6-6 6c-2.3 0-4.4-1.3-5.4-3.4-.2-.5-.8-.7-1.3-.5-.5.2-.7.8-.5 1.3 1.3 2.8 4.2 4.6 7.2 4.6 4.4 0 8-3.6 8-8s-3.6-8-8-8c-2.3 0-4.5 1-6 2.7V606c0-.6-.4-1-1-1s-1 .4-1 1z"></path>
                                </svg>
                              </div>
                            </button>
                            <div className="play-bar rounded-box">
                              <div className="vp-live-status">
                                <div className="vp-live-status-circle offline"></div>
                                <span>LIVE</span>
                              </div>
                              <div className="vp-live-viewer-count">
                                <div className="vp-live-viewer-count-person">
                                  <svg width="12" height="14" viewBox="0 0 12 14">
                                    <g transform="translate(-5 -4)" fill="#FFF" fill-rule="evenodd">
                                      <circle cx="11" cy="7" r="3"></circle>
                                      <path d="M9 12h4a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4z"></path>
                                    </g>
                                  </svg>
                                </div>
                                <span className="vp-live-viewer-count-value">0</span>
                              </div>
                              <div className="vp-progress">
                                <div className="focus-target" role="slider" aria-label="Progress Bar" aria-valuemin="0" aria-valuemax="228" aria-valuenow="0" tabindex="0" aria-valuetext="00:00 of 03:48"></div>
                                <div className="loaded"></div>
                                <div className="played" style="width: 0%;"></div>
                                <div className="cuepoints"></div>
                                <div className="chapters"></div>
                                <div className="thumb-preview invisible hidden" role="presentation" aria-hidden="true" style="left: 17.792%;">
                                  <div className="thumb"></div>
                                </div>
                                <div className="ghost-timecode invisible hidden" role="presentation" aria-hidden="true" style="left: 17.792%;">
                                  <div className="box">00:40</div>
                                </div>
                                <div className="timecode" role="presentation" aria-hidden="true" style="left: 0%; display: block;">
                                  <div className="box">00:00</div>
                                </div>
                              </div>
                              <div className="volume" role="slider" title="Volumen (usa las teclas de flechas arriba/abajo para cambiar)." aria-valuemin="0" aria-valuemax="1" tabindex="0" aria-valuenow="1.000" aria-valuetext="100%">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                              <button type="button" className="toggle cc off" aria-haspopup="true">
                                <svg viewBox="0 0 20 14" focusable="false" aria-labelledby="cc-icon-title" role="img">
                                  <title id="cc-icon-title">Elegir las leyendas</title>
                                  <path className="fill" fill-rule="evenodd" clip-rule="evenodd" d="M17 0h-14c-1.657 0-3 1.343-3 3v8c0 1.656 1.343 3 3 3h14c1.657 0 3-1.344 3-3v-8c0-1.657-1.343-3-3-3zm-7.271 8.282c-.145.923-.516 1.686-1.105 2.268-.597.591-1.369.89-2.294.89-1.138 0-2.049-.402-2.706-1.195-.647-.786-.975-1.866-.975-3.215 0-1.458.372-2.603 1.105-3.403.65-.708 1.487-1.067 2.487-1.067 1.33 0 2.321.482 2.947 1.435.34.53.526 1.072.553 1.611l.013.236h-1.984l-.044-.169c-.092-.355-.207-.622-.343-.793-.239-.298-.591-.443-1.076-.443-.483 0-.856.209-1.14.641-.298.455-.449 1.12-.449 1.977 0 .851.156 1.49.466 1.898.298.395.666.588 1.122.588.469 0 .814-.16 1.058-.491.138-.183.255-.472.351-.856l.042-.17h2.013l-.041.258zm7.582 0c-.145.923-.516 1.686-1.104 2.268-.598.591-1.369.89-2.294.89-1.139 0-2.049-.402-2.707-1.195-.646-.785-.975-1.865-.975-3.214 0-1.458.372-2.603 1.106-3.403.649-.708 1.485-1.067 2.486-1.067 1.33 0 2.32.482 2.946 1.435.34.53.526 1.072.554 1.611l.012.236h-1.9829999999999999l-.043-.169c-.092-.355-.208-.623-.344-.793-.238-.298-.591-.443-1.076-.443-.483 0-.856.209-1.139.641-.299.455-.45 1.12-.45 1.977 0 .851.157 1.49.467 1.898.299.395.666.588 1.121.588.469 0 .814-.16 1.058-.491.138-.183.256-.472.352-.856l.042-.17h2.012l-.041.257z"></path>
                                </svg>
                              </button>
                              <button type="button" className="vp-prefs js-prefs" aria-haspopup="true">
                                <svg className="icon-gear" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid" focusable="false" aria-labelledby="settings-icon-title" role="img">
                                  <title id="settings-icon-title">Configuración</title>
                                  <defs>
                                    <clipPath id="icon-gear-mask-hd">
                                      <polygon points="19 9.422 19 0 0 0 0 16 4.996 16 6 9.422 19 9.422"></polygon>
                                    </clipPath>
                                    <clipPath id="icon-gear-mask-4k">
                                      <polygon points="19 0 0 0 0 16 .656 16 7.641 9.422 19 9.422"></polygon>
                                    </clipPath>
                                  </defs>
                                  <g className="icon-gear-group">
                                    <path className="icon-gear-cog fill" d="M8.75,0 L7.25,0 C6.69771525,0 6.25,0.44771525 6.25,1 L6.25,1.71 C6.24203899,2.03670262 6.03616565,2.32571712 5.73,2.44 C5.22486505,2.64787629 4.75048268,2.92375823 4.32,3.26 C4.06726048,3.46530794 3.71530155,3.4969447 3.43,3.34 L2.81,3 C2.57947626,2.86645499 2.30519371,2.83041629 2.04799634,2.89987835 C1.79079898,2.96934041 1.57195122,3.13856029 1.44,3.37 L1.44,3.37 L0.69,4.67 C0.438460777,5.14101477 0.601355467,5.72655514 1.06,6 L1.06,6 L1.68,6.36 C1.95609578,6.53006064 2.1022252,6.84996558 2.05,7.17 C1.97585362,7.71080372 1.97585362,8.25919628 2.05,8.8 C2.1022252,9.12003442 1.95609578,9.43993936 1.68,9.61 L1.06,10 C0.828560291,10.1319512 0.65934041,10.350799 0.589878348,10.6079963 C0.520416285,10.8651937 0.556454987,11.1394763 0.69,11.37 L0.69,11.37 L1.44,12.67 C1.72842942,13.137733 2.34023095,13.2851012 2.81,13 L2.81,13 L3.43,12.64 C3.71530155,12.4830553 4.06726048,12.5146921 4.32,12.72 C4.75048268,13.0562418 5.22486505,13.3321237 5.73,13.54 C6.03616565,13.6542829 6.24203899,13.9432974 6.25,14.27 L6.25,15 C6.25,15.5522847 6.69771525,16 7.25,16 L8.75,16 C9.30228475,16 9.75,15.5522847 9.75,15 L9.75,14.29 C9.75796101,13.9632974 9.96383435,13.6742829 10.27,13.56 C10.7751349,13.3521237 11.2495173,13.0762418 11.68,12.74 C11.9327395,12.5346921 12.2846984,12.5030553 12.57,12.66 L13.19,13.02 C13.4205237,13.153545 13.6948063,13.1895837 13.9520037,13.1201217 C14.209201,13.0506596 14.4280488,12.8814397 14.56,12.65 L14.56,12.65 L15.31,11.35 C15.5746773,10.8743026 15.4102265,10.2742794 14.94,10 L14.94,10 L14.32,9.64 C14.0439042,9.46993936 13.8977748,9.15003442 13.95,8.83 C14.0241464,8.28919628 14.0241464,7.74080372 13.95,7.2 C13.8977748,6.87996558 14.0439042,6.56006064 14.32,6.39 L14.94,6.03 C15.1714397,5.89804878 15.3406596,5.67920102 15.4101217,5.42200366 C15.4795837,5.16480629 15.443545,4.89052374 15.31,4.66 L15.31,4.66 L14.56,3.36 C14.426372,3.13025585 14.2067828,2.96315821 13.9497298,2.89561144 C13.6926768,2.82806466 13.4193087,2.86562606 13.19,3 L13.19,3 L12.57,3.36 C12.2846984,3.5169447 11.9327395,3.48530794 11.68,3.28 C11.2495173,2.94375823 10.7751349,2.66787629 10.27,2.46 C9.96383435,2.34571712 9.75796101,2.05670262 9.75,1.73 L9.75,1 C9.75,0.73478351 9.64464316,0.480429597 9.45710678,0.292893219 C9.2695704,0.10535684 9.01521649,-8.8817842e-16 8.75,0 Z M10.5,8 C10.5,9.38071187 9.38071187,10.5 8,10.5 C6.61928813,10.5 5.5,9.38071187 5.5,8 C5.5,6.61928813 6.61928813,5.5 8,5.5 C9.38071187,5.5 10.5,6.61928813 10.5,8 Z"></path>
                                  </g>
                                  <g className="icon-gear-text icon-gear-text-hd">
                                    <polygon className="fill" points="10.17 12.38 10.46 10.43 12.22 10.43 11.36 16 9.6 16 9.95 13.76 8.09 13.76 7.77 16 6.01 16 6.85 10.43 8.61 10.43 8.32 12.38"></polygon>
                                    <path className="fill" d="M17.82,11.23 C17.65,10.98 17.32,10.43 15.93,10.43 L13.37,10.43 L12.51,16 L15.09,16 C16.1538092,16.0719871 17.159097,15.5065128 17.65,14.56 C18.1567595,13.5192032 18.2181336,12.3169925 17.82,11.23 Z M15.9,14.42 C15.6125419,14.6349311 15.2582986,14.7412041 14.9,14.72 L14.48,14.72 L14.9,11.72 L15.35,11.72 C15.6806309,11.6794538 16.0108877,11.7981978 16.24,12.04 C16.4818058,12.8447587 16.357466,13.7151373 15.9,14.42 Z"></path>
                                  </g>
                                  <g className="icon-gear-text icon-gear-text-4k">
                                    <polygon className="fill" points="11.82 10.29 13.58 10.29 13.19 12.17 13.19 12.17 15.19 10.27 17.48 10.27 14.75 12.62 16.36 16 14.36 16 13.36 13.78 12.76 14.32 12.39 16 10.63 16"></polygon>
                                    <path className="fill" d="M7.86,14.9 L5.31,14.9 L5.61,13.41 L8.78,10.41 L10.36,10.41 L9.72,13.51 L10.44,13.51 L10.18,14.87 L9.45,14.87 L9.22,16 L7.63,16 L7.86,14.9 Z M8.19,13.54 L8.54,12 L8.54,12 L6.94,13.58 L8.19,13.54 Z"></path>
                                  </g>
                                </svg>
                              </button>
                              <button type="button" className="pip hidden enter" title="Iniciar el modo de imagen dentro de la imagen (PIP)" data-title-enter="Iniciar el modo de imagen dentro de la imagen (PIP)" data-title-return="Salir del modo de imagen dentro de la imagen (PIP)" hidden="">
                                <svg className="pip-icon" viewBox="0 0 16 12">
                                  <polygon className="fill" points="6 8 1 8 1 1 14 1 14 6 15 6 15 0 0 0 0 9 6 9 6 8"></polygon>
                                  <rect className="fill" x="7" y="7" width="9" height="5"></rect>
                                  <polyline className="fill enter" transform="translate(4, 4) rotate(180) translate(-4, -4)" points="5.33 2 5.33 3 3.67 3 5.67 5 5 5.67 3 3.67 3 5.33 2 5.33 2 2"></polyline>
                                  <polyline className="fill return" points="5.33 2 5.33 3 3.67 3 5.67 5 5 5.67 3 3.67 3 5.33 2 5.33 2 2"></polyline>
                                </svg>
                              </button>
                              <button type="button" className="fullscreen">
                                <div className="fullscreen-icon">
                                  <svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid" focusable="false" aria-labelledby="fullscreen-icon-title" role="img">
                                    <title id="fullscreen-icon-title">Abrir el modo de pantalla completa</title>
                                    <polyline className="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6)"></polyline>
                                    <polyline className="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(90)"></polyline>
                                    <polyline className="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(180)"></polyline>
                                    <polyline className="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(270)"></polyline>
                                  </svg>
                                </div>
                                <div className="unfullscreen-icon">
                                  <svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid" focusable="false" aria-labelledby="unfullscreen-icon-title" role="img">
                                    <title id="unfullscreen-icon-title">Salir del modo de pantalla completa</title>
                                    <polyline className="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) "></polyline>
                                    <polyline className="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(90)"></polyline>
                                    <polyline className="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(180)"></polyline>
                                    <polyline className="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(270)"></polyline>
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>
                          <div className="vp-sidedock"></div>
                          <div className="vp-unmute hidden" hidden="">
                            <button type="button" className="vp-unmute-button">
                              <svg className="vp-icon-muted" viewBox="0 0 16 16">
                                <path className="fill" d="M15.988 9.491l-1.49 1.491-1.491-1.491-1.491 1.491-1.49-1.491 1.49-1.491-1.49-1.491 1.49-1.491 1.491 1.491 1.491-1.491 1.49 1.491-1.49 1.491 1.49 1.491zM8.008 15.996l-3.998-3.998h-2.998c-0.552 0-0.999-0.447-0.999-0.999v-5.997c0-0.552 0.447-0.999 0.999-0.999h2.998l3.998-3.998c0 0 0.999-0.125 0.999 0.999 0 5.423 0 13.304 0 13.993 0 1.124-0.999 0.999-0.999 0.999zM7.009 4.002l-1.999 1.999h-2.998v3.998h2.998l1.999 1.999v-7.996z"></path>
                              </svg>
                              <span className="vp-unmute-button-title">Haz clic para activar el sonido</span>
                            </button>
                          </div>
                        </div>
                        <div className="vp-overlay-wrapper hidden" role="dialog" aria-modal="true" aria-labelledby="vp-overlay-labelledby" hidden="">
                          <div className="vp-overlay-bg"></div>
                          <div className="vp-overlay-cell">
                            <div className="vp-overlay"></div>
                            <div className="vp-overlay-icon-wrapper hidden">
                              <div className="vp-overlay-icon"></div>
                            </div>
                            <div className="vp-overlay-logo logo"></div>
                          </div>
                          <nav>
                            <button type="button" className="vp-nav-prevButton js-back cloaked" aria-label="Atrás">
                              <svg className="icon-prev" viewBox="0 0 27 48" preserveAspectRatio="xMidYMid" focusable="false">
                                <path className="fill" d="M7.243,24L26.414,4.828c0.781-0.781,0.781-2.047,0-2.828L25,0.586 c-0.781-0.781-2.047-0.781-2.828,0L0.879,21.879c-1.172,1.172-1.172,3.071,0,4.243l21.293,21.293c0.781,0.781,2.047,0.781,2.828,0 L26.414,46c0.781-0.781,0.781-2.047,0-2.828L7.243,24z"></path>
                              </svg>
                            </button>
                            <button type="button" className="vp-nav-closeButton js-close" aria-label="Cerrar los anuncios superpuestos">
                              <svg className="icon-close-new" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid" focusable="false">
                                <path className="fill" d="M8.001 9.416l6.437 6.437a.497.497 0 0 0 .713-.001l.7-.7a.503.503 0 0 0 .002-.714L9.416 8.001l6.437-6.436a.497.497 0 0 0-.001-.713l-.7-.7a.503.503 0 0 0-.714-.002L8.001 6.587 1.565.15a.497.497 0 0 0-.713.001l-.7.7a.503.503 0 0 0-.002.714L6.587 8 .15 14.438a.497.497 0 0 0 .001.713l.7.7a.503.503 0 0 0 .714.002L8 9.416z"></path>
                              </svg>
                            </button>
                          </nav>
                        </div>
                        <div className="vp-notification-wrapper hidden" hidden="">
                          <div className="vp-notification-cell">
                            <div className="vp-notification" role="dialog" aria-live="assertive"></div>
                          </div>
                        </div>
                        <div className="vp-stats-debug rounded-box hidden" aria-hidden="true" hidden=""></div>
                        <div className="vp-nudge-wrapper hidden"></div>
                        <span id="new-window" hidden="">This opens in a new window.</span>
                        <div className="vp-alert hidden" role="alertdialog" aria-atomic="true" hidden="">
                          <button data-close="" aria-label="Close alert" className="close">
                            <svg className="icon-close" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid" focusable="false">
                              <path className="fill" d="M60 48.796l-16.812-16.796 16.812-16.796-11.204-11.204-16.796 16.804-16.804-16.804-11.196 11.204 16.796 16.796-16.796 16.796 11.196 11.204 16.804-16.804 16.796 16.804z"></path>
                            </svg>
                          </button> */}
                        </div>
                    </div>
                  </body>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ProductPageVideoPlayer;