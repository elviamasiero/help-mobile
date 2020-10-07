
import React, { useState, useRef, } from "react";
import {Text, TouchableOpacity, View} from 'react-native'
import {Expandir, TitleProject, ButtomProject, ButtomProjectDelete} from './styles'
import api from '../services/api'

/*import {Chevron} from './Chevron';*/
function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState(0);
  const [setRotate, setRotateState] = useState("accordion__icon");
  

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? 0 : setHeightState(20)
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

 
  /* <Chevron className={`${setRotate}`} width={10} fill={"#777"} /> */

  return (
   <View className="accordion__section">
      <ButtomProject className={`accordion ${setActive}`} onPress={() => toggleAccordion()}>
        {props.excluir}
        <TitleProject className="accordion__title">{props.title}</TitleProject>
      </ButtomProject>
      <Text style={{maxHeight:setHeight, backgroundColor:'pink'}}> {props.content}</Text>
      <View style={{justifyContent:'space-between'}}
        ref={content} 
        className="accordion__content">
      </View>
    </View>
  );
}

export default Accordion;
