import React from "react";
import "../assets/purchasePageAndFooter.css";
class FooterPage extends React.PureComponent {
   render() {
      return (
               <footer className="Footer--AE">
                  <div className="Footer-textContainer Footer-textContainer--white">
                     <div className="Footer-copyrightMessage Footer-copyrightMessage--white">Copyright © 2020-2021 Mate Crunch. All rights reserved.</div>
                     <div className="Footer-linksContainer">
                        <a className="Footer-link Footer-link--white" href="/help">Contact Us</a>
                        <div className="Footer-bar Footer-bar--white"></div>
                        <a className="Footer-link Footer-link--white" href="/help">FAQ</a>
                        <div className="Footer-bar Footer-bar--white"></div>
                        <a className="Footer-link Footer-link--white" href="/reviews">Reviews</a>
                        <div className="Footer-bar Footer-bar--white"></div>
                        <a className="Footer-link Footer-link--white" href="/blog">Blog</a>
                        <div className="Footer-bar Footer-bar--white"></div>
                        {/* <a className="Footer-link Footer-link--white" href="/swe-project-contests">SWE Project Contests</a>
                        <div className="Footer-bar Footer-bar--white"></div> */}
                        <a className="Footer-link Footer-link--white" href="/legal">Legal Stuff</a>
                        <div className="Footer-bar Footer-bar--white"></div>
                        <a className="Footer-link Footer-link--white" href="/privacy">Privacy Policy</a>
                     </div>
                  </div>
               </footer>

);
  }
  }

export default (FooterPage);