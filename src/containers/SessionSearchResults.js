import React from 'react'
import Result from "../components/InquirySearchResult"


const Results = ({ journals}) => (
    <ul style= {{ listStyleType: 'none'}}>
        {journals.map(j => {
            return <Result journal={j} key={j.id} />;
            
        })}
    </ul>
);

export default Results;