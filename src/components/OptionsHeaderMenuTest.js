import React from 'react';
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { Link, withRouter } from "react-router-dom";
import {getProfileAccountDetail} from "../store/actions/profileAccountInfo"
import "../assets/mainDropDownCat.css"
import { Avatar, Popover, Icon, Menu, Dropdown, Button, Col, Row} from 'antd';

class CreateHeaderMenu extends React.Component {
  
  render() {
    const menu = () => {return(
       

<div className="mega-menu-overlay mega-menu-overlay--lazy-loading" aria-hidden="true">
   <nav className="mega-menu-container" corso="left: 175px;">
      <div className="rc-MegaMenuContent" data-e2e="megamenu-content">
         <div className="explore-Button-bottom-border-mask"></div>
         <div className="_1eb77806 mega-menu">
            <ul role="tree" className="mega-menu-items" corso="min-height: 80px;">
               <div className="catogories-in-megamenu">
                  <h5 className="goals-title">metas</h5>
               </div>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_launch_or_advance_your_career" data-e2e="megamenu-item~learning_paths" className="rc-MegaMenuItem menu-item isCareerLearningPaths" id="learning_paths~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Launch or advance your career" aria-describedby="learning_paths~description" role="treeitem" tabindex="0" aria-level="1" type="button">
                        <span>Launch or advance your career</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRightfe51f600-1ed0-4acf-bb04-572c94d2dfbc ChevronRightfe51f600-1ed0-4acf-bb04-572c94d2dfbcDesc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="catogories-in-megamenu">
                     <h5 className="subjects-title">temas</h5>
                  </div>
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_artes_y_humanidades" data-e2e="megamenu-item~arts-and-humanities" className="rc-MegaMenuItem menu-item" id="arts-and-humanities~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="artes y humanidades" aria-describedby="arts-and-humanities~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>artes y humanidades</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight337341e5-ab78-4df3-f503-2c4f3260b4dd ChevronRight337341e5-ab78-4df3-f503-2c4f3260b4ddDesc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_negocios" data-e2e="megamenu-item~business" className="rc-MegaMenuItem menu-item" id="business~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Negocios" aria-describedby="business~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Negocios</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight0c8ffb53-3f23-4b05-c951-05eae415c86a ChevronRight0c8ffb53-3f23-4b05-c951-05eae415c86aDesc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_ciencias_de_la_computacion" data-e2e="megamenu-item~computer-science" className="rc-MegaMenuItem menu-item" id="computer-science~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Ciencias de la Computación" aria-describedby="computer-science~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Ciencias de la Computación</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRighteb941cae-f35a-4aaa-97ff-1c11ed127319 ChevronRighteb941cae-f35a-4aaa-97ff-1c11ed127319Desc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_ciencia_de_datos" data-e2e="megamenu-item~data-science" className="rc-MegaMenuItem menu-item" id="data-science~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Ciencia de Datos" aria-describedby="data-science~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Ciencia de Datos</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight72ac4017-b636-4ab9-f51d-e4eceb41cdaf ChevronRight72ac4017-b636-4ab9-f51d-e4eceb41cdafDesc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_tecnologia_de_informacion" data-e2e="megamenu-item~information-technology" className="rc-MegaMenuItem menu-item" id="information-technology~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Tecnología de información" aria-describedby="information-technology~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Tecnología de información</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight5ffea9ff-f368-403c-adda-20c9afe9cd4d ChevronRight5ffea9ff-f368-403c-adda-20c9afe9cd4dDesc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_salud" data-e2e="megamenu-item~life-sciences" className="rc-MegaMenuItem menu-item" id="life-sciences~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="salud" aria-describedby="life-sciences~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>salud</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight591cd964-32cf-42ee-c848-49459a96b518 ChevronRight591cd964-32cf-42ee-c848-49459a96b518Desc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_matematicas_y_logica" data-e2e="megamenu-item~math-and-logic" className="rc-MegaMenuItem menu-item" id="math-and-logic~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Matemáticas y Lógica" aria-describedby="math-and-logic~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Matemáticas y Lógica</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight048df963-815a-4170-df5e-5512ea3b93dd ChevronRight048df963-815a-4170-df5e-5512ea3b93ddDesc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;"><button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_desarrollo_personal" data-e2e="megamenu-item~personal-development" className="rc-MegaMenuItem menu-item" id="personal-development~menu-item" aria-expanded="false" aria-haspopup="false" aria-label="Desarrollo Personal" aria-describedby="personal-development~description" role="treeitem" tabindex="-1" aria-level="1" type="button"><span>Desarrollo Personal</span></button></div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_ciencias_fisicas_e_ingenieria" data-e2e="megamenu-item~physical-science-and-engineering" className="rc-MegaMenuItem menu-item" id="physical-science-and-engineering~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Ciencias Físicas e Ingeniería" aria-describedby="physical-science-and-engineering~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Ciencias Físicas e Ingeniería</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight159c456d-2e2f-4661-d8d7-8353ea732038 ChevronRight159c456d-2e2f-4661-d8d7-8353ea732038Desc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_ciencias_sociales" data-e2e="megamenu-item~social-sciences" className="rc-MegaMenuItem menu-item" id="social-sciences~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Ciencias sociales" aria-describedby="social-sciences~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Ciencias sociales</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight489fc3fa-53ba-4386-cf3a-8275c016309d ChevronRight489fc3fa-53ba-4386-cf3a-8275c016309dDesc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_aprendizaje_de_un_idioma" data-e2e="megamenu-item~language-learning" className="rc-MegaMenuItem menu-item" id="language-learning~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Aprendizaje de un idioma" aria-describedby="language-learning~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Aprendizaje de un idioma</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight23722875-72b5-4cb0-f3a4-d84a86b488a4 ChevronRight23722875-72b5-4cb0-f3a4-d84a86b488a4Desc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="height: 0px;">
                     <div className="rc-MegaMenuItem, menu-item"></div>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_grados" data-e2e="megamenu-item~degrees" className="rc-MegaMenuItem menu-item isDegree" id="degrees~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Grados" aria-describedby="degrees~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Grados</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRightab9c81bb-25d0-405b-cf92-ae814aa157f0 ChevronRightab9c81bb-25d0-405b-cf92-ae814aa157f0Desc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <li className="_1kz8b6i" role="none">
                  <div className="_1eb77806" corso="min-height: 31px;">
                     <button data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="mega_menu_domain_certificados" data-e2e="megamenu-item~certificates" className="rc-MegaMenuItem menu-item" id="certificates~menu-item" aria-expanded="false" aria-haspopup="true" aria-label="Certificados" aria-describedby="certificates~description" role="treeitem" tabindex="-1" aria-level="1" type="button">
                        <span>Certificados</span>
                        <svg aria-hidden="true" className="_ufjrdd" focusable="false" corso="fill: rgb(0, 0, 0); height: 14px; width: 14px; position: absolute; right: 20px; top: 9px;" viewBox="0 0 48 48" role="img" aria-labelledby="ChevronRight1d4f6818-d932-456d-d132-d6a53de415e1 ChevronRight1d4f6818-d932-456d-d132-d6a53de415e1Desc" xmlns="http://www.w3.org/2000/svg">
                           {/* <polygon transform="translate(23.999500, 24.000000) scale(-1, 1) translate(-23.999500, -24.000000)" points="16 24 30.585 40 31.999 38.586 18.828 24 31.999 9.415 30.585 8" role="presentation"></polygon> */}
                        </svg>
                     </button>
                  </div>
               </li>
               <div>
                  <div corso="margin: 30px 24px 20px; width: 232px;">
                     <hr className="_1ixrep9" corso="margin-left: 0px; width: 100%;"/>
                  </div>
                  <li className="explore-all-button-wrapper"><a data-click-key="dashboard.main.click.explore_all_button" data-click-value="{&quot;href&quot;:&quot;/browse&quot;,&quot;namespace&quot;:{&quot;action&quot;:&quot;click&quot;,&quot;app&quot;:&quot;dashboard&quot;,&quot;component&quot;:&quot;explore_all_button&quot;,&quot;page&quot;:&quot;main&quot;},&quot;schema_type&quot;:&quot;FRONTEND&quot;}" data-track="true" data-track-app="dashboard" data-track-page="main" data-track-action="click" data-track-component="explore_all_button" data-track-href="/browse" href="/browse" to="/browse" className="link-button primary cozy" data-e2e="explore-all-button"><span className="explore-all-button">Explorar todo lo que Coursera tiene para ofrecer</span></a></li>
               </div>
            </ul>
         </div>
      </div>
   </nav>
</div>


    )}
        return (
          <Hoc>
            <div className="demo">
              <Popover placement="bottomRight" trigger="hover" content={menu()}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <span>TEST DM</span>
                  </a>
              </Popover>
            </div>
        </Hoc>
        )
    }
  }
  
    const mapStateToProps = state => {
      return {
        username: state.auth.username,
        token: state.auth.token,
        profileAI: state.profileAccountInfo
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        logout: () => dispatch(actions.logout()),
        getProfilAccountInfo: (token, userID) => dispatch(getProfileAccountDetail(token, userID)),
      };
    };
    
    export default withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(CreateHeaderMenu)
    );