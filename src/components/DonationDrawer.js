import React, { useState, useEffect } from 'react';
import {Button, Icon, Card, Drawer } from 'antd';
import InjectedDonationCheckoutForm from "../containers/InjectedDonationCheckoutForm";
import "../assets/projectsGrid.css";

const { Meta } = Card;

function DonationDrawer(props){
    const [visible, setVisible] = useState(props.dDrawer);
    const [key, setCompKey] = useState(props.id);

    useEffect(() => {
        setVisible(props.dDrawer);
        setCompKey(props.id);
    }, [props]);

    console.log("props: "+ visible, key, props )
    
    function onClose(){
        setVisible(false)
      };
  
    return (
        <div>
            <Drawer
                placement="right"
                width="40%"
                closable={true}
                onClose={onClose}
                visible={visible}
                key={key}
            >
                <InjectedDonationCheckoutForm orderID={1}/>
            </Drawer>
      </div>
    );
  }



export default DonationDrawer;