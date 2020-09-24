import React from 'react';
import "../assets/home.css";

const ProfileSlider = ( {props} ) => (
    <div>
        <div className="slider-header">
            <span>Meeting Sessions</span>
        </div>
        <div className="main-slider-container">
            {
                props.map(el => {
                    console.log("CORSO", el.session_photo)
                    return(
                        <a className="profile-link" key={el.id} href={`sessions/${el.id}`}>
                            <span style={{backgroundImage:`url(${el.session_photo})` }} className="single-img img-fig-one">
                                <span className="img-text">
                                    <h4>{`${el.user_info.name}`}</h4>
                                    <p>{`${el.user_info.country}`}</p>
                                    <p>
                                        {`${el.user_info.university}`}
                                    </p>
                                </span>
                            </span>
                        </a>
                    )
                })
            }
        </div>
    </div>
)

export default ProfileSlider;