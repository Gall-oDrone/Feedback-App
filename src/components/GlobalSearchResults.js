import React from "react";
import "../assets/home.css";

const Result = ({ item }) => {
  return (
    <div className="main_container">
            <main className="main_1">
              <div>
                <div>
                  <div></div>
                  <div className="nested_large_con">
                    <div id="articles" className="nested_large_content">
                      <div>
                        <ul>
                          {item && item.map(el => {
                            return(
                          <li>  
                            <div className="item">
                              <a href={`articles/detailmenu/${el.id}`} className="link">
                                <div className="thumbnail">
                                  <span><img src={el.thumbnail}></img></span>
                                </div>
                                <div className="list_content">
                                  <h3>{el.title}</h3>
                                  {/* <p>{el.overview}</p> */}
                                  <div className="metaShadow"></div>
                                </div>
                                <div className="voteButtonWrap_4c515">
                                  <button className="button_30e5c smallSize_5216f simpleVariant_8a863 newVoteButton_dac5c" data-test="vote-button">
                                    <span className="font_9d927 xSmall_1a46e semiBold_e201b buttonContainer_b6eb3 lineHeight_042f1 underline_57d3c uppercase_a49b4">
                                      <div className="icon_f5f81 blackOrange_56e54"></div>
                                      <span className="font_9d927 small_231df semiBold_e201b lineHeight_042f1 underline_57d3c">1680</span>
                                    </span>
                                  </button>
                                </div>
                              </a>
                                <div className="meta_data">
                                  <div className="nested_large_actions">
                                    <a className="action_button">
                                      <span className="font_1">
                                        <span className="font_2"><svg></svg></span>
                                        61
                                      </span>
                                    </a>
                                  </div>
                                  {/* <div className="nested_large_actions_info">
                                    <a className="info_topic">
                                      <span className="info_font_1">
                                        {el.categories.map(el => {
                                          return(
                                                el
                                          )})
                                        }
                                      </span>
                                    </a>
                                  </div> */}
                                </div>
                            </div>
                          </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
        </div> 
  );
};

export default Result;