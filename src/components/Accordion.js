
import React, { useState, useRef, } from "react";
import {Text, TouchableOpacity, View} from 'react-native'
import {Expandir, TitleProject, ButtomProject, ButtomProjectDelete} from './styles'
import api from '../services/api'

/*import {Chevron} from './Chevron';*/
function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState('none');
  const [setRotate, setRotateState] = useState("accordion__icon");
  const [HeightInput, setHeightInput] = useState('none');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? 'none' : setHeightState('flex')
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  function toggleInput() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightInput(
      setActive === "active" ? 'none' :setHeightInput('flex')
    );
  }
 
  /* <Chevron className={`${setRotate}`} width={10} fill={"#777"} /> */

  return (
   <View className="accordion__section">
      <ButtomProject className={`accordion ${setActive}`} onPress={() => toggleAccordion()}>
        {props.excluir} 
        
      <TitleProject className="accordion__title">{props.title}</TitleProject>
      <TouchableOpacity onPress={() => toggleInput()}> 
          <Text>{props.add}</Text>
        </TouchableOpacity>
      </ButtomProject>
      <View  style={{display:setHeight, backgroundColor:'pink'}}> 
          {props.content}
      </View>
      <View style={{justifyContent:'space-between'}}
        ref={content} 
        className="accordion__content">
      </View>
      <View style={{display:HeightInput}}> 
       {props.input}
      </View>
    </View>
  );
}

export default Accordion;
